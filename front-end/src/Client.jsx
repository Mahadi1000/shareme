import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "cii0ezdj",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  ignoreBrowserTokenWarning: true,
  token: import.meta.env.VITE_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
