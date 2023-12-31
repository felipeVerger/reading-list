import { createClient,type ClientConfig, SanityImageAssetDocument } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { Avatar } from "./types/user.type";

const config: ClientConfig = {
    projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
    token: import.meta.env.VITE_APP_SANITY_TOKEN,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source:SanityImageAssetDocument | string | Avatar) => builder.image(source);