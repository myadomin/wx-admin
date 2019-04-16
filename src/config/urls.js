// npm run dev 进入webpack.dev.config, SERVER是localhost
// npm run build-test，通过--env=testserver传参 SERVER是testserver
// npm run build-www，通过--env=prodserver传参 SERVER是wwwserver
// eslint-disable-next-line no-undef
console.log(SERVER)
// eslint-disable-next-line no-undef
const server = SERVER
let ctx = ''
if (server === 'localhost') {
  ctx = ''
} else if (server === 'testserver') {
  ctx = ''
} else if (server === 'wwwserver') {
  ctx = ''
} else {
  ctx = ''
}

export default {
  getArticleList: `${ctx}/article/list`,
  getArticleContentById: (id) => `${ctx}/article/content/${id}`
}
