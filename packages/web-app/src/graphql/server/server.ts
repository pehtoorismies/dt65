import path, { resolve } from 'path'
import { makeSchema } from '@nexus/schema'
import { graphql } from 'graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import * as allTypes from './schema'

console.log('di', __dirname)

const schema = makeSchema({
  types: allTypes,
  shouldGenerateArtifacts: true,
  outputs: {
    schema: resolve('./src/graphql/server/generated/schema.graphql'),
    typegen: resolve('./src/graphql/server/generated/nexus.ts'),
  },
})

function onError(
  error: Error,
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) {
  res.status(500).end(error.toString())
  next()
}

const handler = nextConnect({ onError })

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.body.query
  const variables = req.body.variables
  const response = await graphql(schema, query, {}, {}, variables)

  return res.end(JSON.stringify(response))
})

export { handler }
