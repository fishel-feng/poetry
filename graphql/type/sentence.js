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

import {PoetryType} from './poetry'

const Sentence = mongoose.model('Sentence');

const SentenceType = new GraphQLObjectType({
  name: 'Sentence',
  fields: {
    _id: {
      type: GraphQLID
    },
    sentenceContent: {
      type: GraphQLString
    },
    sentencePoetryId: {
      type: PoetryType,
    },
    sentencePoetryName: {
      type: GraphQLString
    },
    sentenceAuthorName: {
      type: GraphQLString
    }
  }
});

export const sentences = {
  type: new GraphQLList(SentenceType),
  args: {},
  resolve(root, params, options) {
    return Sentence.find({}).populate({
      path: 'sentencePoetryId',
      select: 'title content authorId authorName'
    }).exec()
  }
};

export const sentence = {
  type: SentenceType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, options) {
    return Sentence.findOne({
      _id: params.id
    }).populate({
      path: 'sentencePoetryId',
      select: 'title content authorId authorName'
    }).exec()
  }
};
