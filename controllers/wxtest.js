const zhonghang_page = async (ctx, next) => {
  ctx.body = await ctx.render('zhonghang/commercial.html')
}

const wx_page = async (ctx, next) => {
  ctx.body = await render('zhonghang/commercial.html')
}

module.exports = {
  'GET /view/wxtest': wx_page,
  'GET /view/zhonghang1': zhonghang_page
}