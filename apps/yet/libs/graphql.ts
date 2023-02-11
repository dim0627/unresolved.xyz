import { GraphQLClient } from "graphql-request";
import { config } from "@libs";

export const graphqlClient = new GraphQLClient(config.schemaPath, {
  headers: {
    authorization: `Bearer ${config.graphcmsBearerToken}`,
  },
});
