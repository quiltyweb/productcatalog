import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/index.ts",
  generates: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "./src/graphql/generated/types.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
