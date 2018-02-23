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

import {PoetType} from './poet'

const Poetry = mongoose.model('Poetry');

export const PoetryType = new GraphQLObjectType({
  name: 'Poetry',
  fields: {
    _id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    author: {
      type: PoetType,
    },
    authorName: {
      type: GraphQLString
    }
  }
});

export const poetries = {
  type: new GraphQLList(PoetryType),
  args: {},
  resolve(root, params, options) {
    return Poetry.find({}).populate({
      path: 'author',
      select: 'poetName imageId desc poetryCount'
    }).exec()
  }
};

export const poetry = {
  type: PoetryType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, options) {
    return Poetry.findOne({
      _id: params.id
    }).populate({
      path: 'author',
      select: 'poetName imageId desc poetryCount'
    }).exec()
  }
};
