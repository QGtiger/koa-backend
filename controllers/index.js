const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const User = require('../models/utils/User')

var fn_index = async (ctx, next) => {
  ctx.response.body =  `
    <h1>首页233</h1>
    <form action="/signin" method="post">
      <p>name: <input name="name" type="text" value=""></p>
      <p>password: <input name="password" type="password"></p>
      <p><input type="submit" value="提交"></p>
    </form>
  `;
};

var fn_signin = async (ctx, next) => {
  var name = ctx.request.body.name || '',
  password = ctx.request.body.password || '';
  var user = await User.findAll({
    where: {
      name: name,
      passwd: password
    }
  })
  ctx.response.body = {
    code:0,
    data: user,
    isNewRecord: user[0]
  }
  if(user.length>0){
    ctx.response.body = {
      code:0,
      isNewRecord: user[0],
      data: {
        username: name,
        id: user[0].id,
        token: 'Bearer '+jwt.sign({name, id: user.id}, secret.sign, {expiresIn: '1m'})
      }
    }
  }else {
    ctx.response.body = {
      code: 1,
      msg: '账号或者密码错误'
    }
  }
}

var fn_signup = async (ctx, next) => {
  let data = ctx.request.body
  const user = await User.create({
    name: data.username,
    passwd: data.password,
    email: data.email,
    gender: data.gender
  })
  ctx.response.body = {
    code: 0,
    data: ctx.request.body,
    user
  }
}


module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin,
  'POST /signup': fn_signup
}