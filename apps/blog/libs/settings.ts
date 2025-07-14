import { boolean, object, string } from 'yup';

const schema = object({
  contentfulSpace: string().required().url(),
  contentfulAccessToken: string().required().url(),
  contentfulPreviewEnabled: boolean().default(false),
});

export const settings = schema.cast({
  contentfulSpace: process.env.CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  contentfulPreviewEnabled: !!process.env.CONTENTFUL_PREVIEW_ENABLED || false,
});
