import { config } from '@libs';
import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient(config.schemaPath, {
  headers: {
    authorization: `Bearer ${config.graphcmsBearerToken}`,
  },
});
