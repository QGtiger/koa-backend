const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const Moment = require('moment')
const models = require('./models')
var cors = require('koa2-cors');
models.sync()
const app = new Koa()
app.use(cors())

const KoaLogger = require('koa-logger')
const logger = KoaLogger((str) => {                // 使用日志中间件
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss')+str);
})
app.use(logger)

const Swig = require('koa-swig')
const co = require('co')
app.context.render = co.wrap(Swig({
  root: __dirname + '/views',
  autoescape: true,
  cache: false,
  ext: 'html'
}))

const {  accessLogger,systemLogger, } = require('./middlewares/log/index');
app.use(accessLogger()); //中间件
app.on('error', err => {logger.error(err); });

// app.use(async (ctx, next) => {
//   console.log(`${ctx.request.method} ${ctx.request.url}`)
//   await next()
// })


// app.use(async (ctx, next) => {
//   const start = new Date().getTime();
//   await next()
//   const ms = new Date().getTime() - start; //耗费时间
//   console.log(`Time: ${ms}ms`)
// })

// 注意这里的 bodyParser一定要在router之前
app.use(bodyParser())

app.use(router())

app.listen(3000, function() {
  console.log('app started at port 3000')
});