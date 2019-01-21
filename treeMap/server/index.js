const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const router_mock = require('./router_mock.js')

const app = new Koa()

app.use(bodyParser())

let router = new Router();
router.use('/api', router_mock.routes(), router_mock.allowedMethods());

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080)