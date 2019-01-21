const Koa = require('koa')
const static = require('koa-static')
const proxy = require('koa-proxy')
const path = require('path')

const app = new Koa()

app.use(static(path.join(__dirname, 'dist')))

app.use(proxy({
    host:  'http://127.0.0.1:8080',
    match: /^\/api\//
}));

app.listen(3456)