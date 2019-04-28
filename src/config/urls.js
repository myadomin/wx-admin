// npm run dev 进入webpack.dev.config, SERVER是localhost
// npm run build-test，通过--env=testserver传参 SERVER是testserver
// npm run build-www，通过--env=prodserver传参 SERVER是wwwserver
// eslint-disable-next-line no-undef
console.log(SERVER)
// eslint-disable-next-line no-undef
const server = SERVER
let ctx = ''
if (server === 'localhost') {
  // 本地开发npm run dev后 走webpack devServer proxy跨域
  ctx = ''
} else if (server === 'testserver') {
  ctx = 'https://www.b1026.com/api'
} else if (server === 'wwwserver') {
  // 线上环境npm run build-www后 前后端都部署在同域下 暂不做cors跨域
  ctx = 'https://www.b1026.com/api'
} else {
  ctx = ''
}

export default {
  getArticleList: `${ctx}/admin/article/list`,
  deleteArticleList: `${ctx}/admin/article/delete`,
  getArticleContentById: `${ctx}/admin/article/content`,
  getBizList: `${ctx}/admin/biz/list`,
  login: `${ctx}/admin/admin/login`,
  logout: `${ctx}/admin/admin/logout`
}
