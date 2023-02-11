import { object, string } from "yup";

const schema = object({
  schemaPath: string().required(),
  graphcmsBearerToken: string().required(),
});

export const config = schema.cast({
  schemaPath: process.env.SCHEMA_PATH,
  graphcmsBearerToken: process.env.GRAPHCMS_BEARER_TOKEN,
});
