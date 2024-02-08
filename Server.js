require('dotenv').config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = 8082;

app.use("/stripe", express.raw({ type: "*/*" }));
app.use(express.json());
app.use(cors());

app.post('/pay', async (req, res) => {
  try {
    const { name, amount, address, phone, email, lineItems } = req.body;

    if (!name || amount <= 0) {
      return res.status(400).json({ message: 'Invalid request. Add items with valid prices to proceed.' });
    }

    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        products: JSON.stringify(lineItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price_data.unit_amount / 100,
        }))),
        name,
        address,
        phone,
        email,
      },
    });

    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment Initiated", clientSecret });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initiated payment!`);
  }

  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }

  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



