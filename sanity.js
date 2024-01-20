// sanity.js

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'nvhyfaqn',
  dataset: 'production',
  apiVersion: '2024-01-19',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

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
  
  export { urlFor };
export default client;

