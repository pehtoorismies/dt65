import { objectType } from '@nexus/schema'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('hero', {
      type: 'String',

      resolve: () => 'Hero',
    })
    t.field('human', {
      type: 'String',
      resolve: () => 'human',
    })
  },
})
