const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const models = require('./models')
var cors = require('koa2-cors');
models.sync()
const app = new Koa()
app.use(cors())

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
})


app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next()
  const ms = new Date().getTime() - start; //耗费时间
  console.log(`Time: ${ms}ms`)
})

// 注意这里的 bodyParser一定要在router之前
app.use(bodyParser())

app.use(router())

app.listen(3000, function() {
  console.log('app started at port 3000')
});