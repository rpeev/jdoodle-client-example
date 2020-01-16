#!/usr/bin/env node
'use strict';

const dotenv = require('dotenv');
const apivis = require('apivis');
const peek42 = require('peek42').use(apivis);
  const {p, pp, cp, cpp} = peek42;
const Koa = require('koa');
const Router = require('koa-router');
const withWebSocket = require('koa-websocket');
const bodyParser = require('koa-bodyparser');
const staticFiles = require('koa-static');
const Pug = require('koa-pug');
const jdoodle = require('jdoodle-client');

dotenv.config();

let app = withWebSocket(new Koa());
let httpRouter = new Router();
let wsRouter = new Router();
let viewEngine = new Pug({
  viewPath: '.',
  locals: {
    title: 'JDoodle API Client'
  },
  app
});

httpRouter.get('*', async (ctx, next) => {
  peek42.cable.init0();

  await next();
});

httpRouter.get('/', async ctx => {
  await ctx.render('index');
});

httpRouter.post(jdoodle.defaultExecutePath, async ctx => {
  ctx.body = await jdoodle.execute(ctx.request.body);
});

httpRouter.post(jdoodle.defaultCreditSpentPath, async ctx => {
  ctx.body = await jdoodle.creditSpent();
});

wsRouter.get('/peek42', ctx => {
  peek42.cable.init(ctx.websocket);
});

app.use(staticFiles('./public'));
app.use(bodyParser());
app.use(httpRouter.routes());
app.ws.use(wsRouter.routes());

let host = process.env.HOST;
let port = process.env.PORT;

app.listen(port, host, () => {
  let msg = `jdoodle-client-example (http://${host}:${port})`;

  console.log(msg);
  cp(msg, 'server (re)started', {level: 'info'});
});
