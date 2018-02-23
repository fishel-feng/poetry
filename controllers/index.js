import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa';
import {controller, get, post} from 'koa-dec-router';

import schema from '../graphql'

@controller('/')
export default class Graphql {

  @post('graphql')
  async post(ctx, next) {
    await graphqlKoa({schema: schema})(ctx, next);
  }

  @get('graphql')
  async get(ctx, next) {
    await graphqlKoa({schema: schema})(ctx, next);
  }

  @get('graphiql')
  async graphiql(ctx, next) {
    await graphiqlKoa({endpointURL: '/graphql'})(ctx, next)
  }
}