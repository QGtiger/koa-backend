const zhonghang_page = async (ctx, next) => {
  ctx.body = await ctx.render('zhonghang/commercial.html')
}

const wx_page = async (ctx, next) => {
  ctx.body = await ctx.render('weixin_previewimg.html')
}

const wx_pinglun_page = async (ctx, next) => {
  ctx.body = await ctx.render('weixin/pinglun.html')
}

module.exports = {
  'GET /view/zhonghang': zhonghang_page,
  'GET /view/wxtest': wx_page,
  'GET /view/pinglun': wx_pinglun_page
}