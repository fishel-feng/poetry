import Koa from 'koa';
import KoaStatic from 'koa-static';
import DecRouter from 'koa-dec-router';
import {database} from './database';

database();

const app = new Koa();

const decRouter = DecRouter({
  controllersDir: `${__dirname}/controllers`,
  before: null, // global middleware
  after: null, // global middleware
});

app.use(KoaStatic(__dirname + '/public'));

app.use(decRouter.router.routes());
app.use(decRouter.router.allowedMethods());


const port = 9008;

app.listen(port);
