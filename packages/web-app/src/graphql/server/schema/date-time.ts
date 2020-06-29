import { GraphQLDateTime } from 'graphql-iso-date'
import { scalarType } from '@nexus/schema'

// export const GQLDate = asNexusMethod(GraphQLDateTime, 'date')
// export const GQLDate = scalarType({
//   ...GraphQLDateTime,
//   name: 'Date',
//   asNexusMethod: 'date',
// })

export const DateTime = scalarType({
  ...GraphQLDateTime,
  name: 'Date',
  asNexusMethod: 'date',
})

// export const DateScalar = scalarType({
//   name: 'Date',
//   serialize: value => value.getTime(),
//   parseValue: value => new Date(value),
//   parseLiteral: ast => (ast.kind === 'IntValue' ? new Date(ast.value) : null),
//   asNexusMethod: 'date',
//   rootTyping: 'Date',
// })
