require('dotenv').config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post('/pay', async (req, res) => {
  try {
    const { name, amount } = req.body; 
    if (!name || amount <= 0) {
      return res.status(400).json({ message: 'Invalid request. Add items with valid prices to proceed.' });
    }

    // Calculate the amount in cents (assuming it's in dollars)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'USD',
      payment_method_types: ['card'],
      metadata: { name },
    });

   

    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment Initiated", clientSecret });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



