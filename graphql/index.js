import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import {poet, poets} from './type/poet';
import {poetry, poetries} from './type/poetry';
import {sentence, sentences} from './type/sentence';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      poet,
      poets,
      poetry,
      poetries,
      sentence,
      sentences
    }
  })
});
