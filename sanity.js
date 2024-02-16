import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { getAuth } from "firebase/auth";

const client = createClient({
  projectId: "nvhyfaqn",
  dataset: "production",
  apiVersion: "2024-02-10",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const updateStock = async (productId, quantity) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No logged-in user found. Cannot update stock.");
      return;
    }

    // Fetch current product quantity using groq query
    const currentProduct = await client.fetch(`*[_id == "${productId}"] { stock }`);

    // Check if the product document exists
    if (!currentProduct.length) {
      console.error(`Product document with ID ${productId} not found.`);
      return;
    }

    const existingStock = currentProduct[0].stock; // Extract stock from the fetched data

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
      console.error("Invalid quantity:", quantity);
      return;
    }

    // Calculate updated stock (ensure it never goes negative)
    const updatedStock = Math.max(0, existingStock - quantity);

    // Update the product document with the new stock value
    await client.patch(productId)
      .set({ stock: updatedStock })
      .commit({
        mutations: [
          {
            update: {
              _id: productId,
              stock: updatedStock,
            },
            allow: {
              id: currentUser.uid,
              permissions: ["update"],
              fields: ["stock"],
            },
          },
        ],
      });

    console.log(`Stock for product ${productId} updated successfully. New stock: ${updatedStock}`);
  } catch (error) {
    console.error("Error updating stock:", error);
  }
};





const builder = imageUrlBuilder(client);

const urlFor = source => {
    if (Array.isArray(source) && source.length > 0 && source[0]._type === 'image' && source[0].asset?._ref) {
      // Handle reference to an image asset
      return builder.image(source[0].asset._ref);
    } else {
      // Default case for regular image sources
      return builder.image(source);
    }
  };
  
  export { urlFor, updateStock };
export default client;


