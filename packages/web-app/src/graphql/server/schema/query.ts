import { objectType, idArg, intArg } from '@nexus/schema'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    // t.list.field('findManyEvents', {
    //   type: 'Event',
    //   args: {
    //     limit: intArg({ default: 0 }),
    //   },
    //   async resolve(_, { limit = 0 }, {}) {
    //     // TODO
    //     return []
    //   },
    // })
    // t.list.field('findOldEvents', {
    //   type: 'Event',
    //   args: {
    //     limit: intArg({ default: 0 }),
    //   },
    //   async resolve(_, { limit = 0 }) {
    //     // TODO
    //     return []
    //   },
    // })
    // t.field('findEvent', {
    //   type: 'Event',
    //   args: {
    //     id: idArg({ required: true }),
    //   },
    //   async resolve(_, { id }) {
    //     // TODO
    //     return {}
    //   },
    // })
  },
})
