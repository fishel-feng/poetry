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

export const PoetType = new GraphQLObjectType({
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

export const poets = {
  type: new GraphQLList(PoetType),
  args: {},
  resolve(root, params, options) {
    return Poet.find({}).exec()
  }
};

export const poet = {
  type: PoetType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, options) {
    return Poet.findOne({
      _id: params.id
    }).exec()
  }
};
