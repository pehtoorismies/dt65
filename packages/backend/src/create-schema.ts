import { resolve } from 'path';
import { makeSchema } from 'nexus';
import * as allTypes from './resolvers';
import { NexusGraphQLSchema } from 'nexus/dist/core';

const createSchema = (saveFiles: boolean): NexusGraphQLSchema => {
  const schema = makeSchema({
    types: allTypes,
    shouldGenerateArtifacts: saveFiles,
    outputs: {
      schema: resolve('./src/generated/schema.graphql'),
      typegen: resolve('./src/generated/nexus.ts'),
    },
  });
  return schema;
};

export { createSchema };
