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

import {PoetryType} from './poetry';

const Single = mongoose.model('Single');

export const SingleType = new GraphQLObjectType({
  name: 'Single',
  fields: {
    _id: {
      type: GraphQLID
    },
    poetName: {
      type: GraphQLString
    },
    poetryName: {
      type: GraphQLString
    },
    poetry: {
      type: PoetryType,
    },
    content: {
      type: GraphQLString
    }
  }
});

export const singles = {
  type: new GraphQLList(SingleType),
  args: {},
  resolve(root, params, options) {
    return Single.find({}).populate({
      path: 'poetry',
      select: 'title content authorId authorName'
    }).exec()
  }
};

export const single = {
  type: SingleType,
  args: {
    content: {
      name: 'content',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, options) {
    return Single.findOne({
      content: params.content
    }).populate({
      path: 'poetry',
      select: 'title content authorId authorName'
    }).exec()
  }
};
