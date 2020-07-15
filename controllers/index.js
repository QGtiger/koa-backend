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
  console.log(`signin with name: ${name}, password: ${password}`)
  if(name==='koaGood' && password === 'qwer123qg'){
    ctx.response.body = `<h1>welcome ${name}</h1>`
  }else {
    ctx.response.body = `<h1>LOGIN FAILED !</h1>
    <p><a href="/">首页</a></p>
    `
  }
}


module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
}