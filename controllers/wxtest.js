const wx_page = async (ctx, next) => {
  ctx.body = await ctx.render('weixin_previewimg.html')
}

module.exports = {
  'GET /wxtest': wx_page
}