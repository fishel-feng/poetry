import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa';
import {controller, get, post} from 'koa-dec-router';
import rp from 'request-promise-native';

import schema from '../graphql'

@controller('/')
export default class Graphql {

  @post('graphql')
  async post(ctx, next) {
    console.log(1);
    await graphqlKoa({schema: schema})(ctx, next);
  }

  @get('graphql')
  async get(ctx, next) {
    console.log(2);
    await graphqlKoa({schema: schema})(ctx, next);
  }

  @get('graphiql')
  async graphiql(ctx, next) {
    console.log(3);
    await graphiqlKoa({endpointURL: '/graphql'})(ctx, next)
  }

  @get('image')
  async image(ctx, next) {
    const idx = ctx.query.idx;
    const options = {
      uri: `http://www.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=1&mkt=en-US`,
      json: true
    };
    const result = await rp(options);
    const url = 'http://www.bing.com' + result.images[0].url;
    ctx.body = {url};
  }
}