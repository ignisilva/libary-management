const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { errorHandlerMiddleware } = require('./middlewares');
const router = require('./routers');

const app = new Koa();

app.use(bodyParser());
app.use(errorHandlerMiddleware());
app.use(router.routes());

module.exports = app;
