import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  GraphQLInt
} from 'graphql';

import mongoose from 'mongoose';

const Poet = mongoose.model('Poet');

const PoetType = new GraphQLObjectType({
  name: 'Poet',
  fields: {
    _id: {
      type: GraphQLID
    },
    poetName: {
      type: GraphQLString
    },
    imageId: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    },
    poetryCount: {
      type: GraphQLInt
    }
  }
});

export const student = {
  type: new GraphQLList(PoetType),
  args: {},
  resolve(root, params, options) {
    return Poet.find({}).exec()
  }
};
