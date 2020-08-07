const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const Moment = require('moment')
const models = require('./models')
models.sync({force: true})
const app = new Koa()

var cors = require('koa2-cors');
app.use(cors())

const KoaLogger = require('koa-logger')
const logger = KoaLogger((str) => {                // 使用日志中间件
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss')+str);
})
logger.error = (err) => {
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss ')+err)
}
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

const jwtKoa = require('koa-jwt')
const jwtverify = require('./middlewares/jwterror')
const secret = require('./config/secret')
app.use(jwtverify())
app.use(
  jwtKoa({secret: secret.sign}).unless({
    path: [/^\/signin/, /^\/signup/]
  })
)
app.use(async (ctx, next) => {
  await next()
})

// 注意这里的 bodyParser一定要在router之前
app.use(bodyParser())

app.use(router())

app.use(async (ctx, next) => {
  console.log(ctx)
  await next()
})


app.listen(3000, function() {
  console.log('app started at port 3000')
});