const jwt = require('jsonwebtoken');
const util = require('util')

const verify = util.promisify(jwt.verify)
const secret = require('../../config/secret')

// 判断token 是否可以使用
module.exports = function() {
  return async function(ctx, next) {
    try {
      const token = ctx.header.authorization
      if (token) {
        let payload
        try {
          payload = await verify(token.split(' ')[1], secret.sign)
          console.log(payload)
          ctx.payload = payload
        } catch (err) {
          // console.log('token verify failed', err)
        }
      }
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.body = {
          status: 401,
          message: 'token is required'
        }
      } else {
        err.status = 404
        ctx.body = {
          status: 404,
          message: err.errors[0].message,
          code: 202001
        }
      }
    }
  }
}