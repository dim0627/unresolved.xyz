import type { CodegenConfig } from "@graphql-codegen/cli";

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: process.env.SCHEMA_PATH,
  generates: {
    "src/gql/": {
      documents: "./**/*.tsx",
      preset: "client",
      plugins: [],
    },
  },
};

export default codegenConfig;
