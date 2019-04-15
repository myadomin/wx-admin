export default {
  // 获取cookie
  getCookie (name) {
    var strCookie = document.cookie
    var arrCookie = strCookie.split('; ')
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split('=')
      if (arr[0] === name) {
        return arr[1]
      }
    }
    return ''
  },
  // time秒 默认30天
  setCookie (name, value, time) {
    time = time || 30 * 24 * 3600
    var exp = new Date()
    exp.setTime(exp.getTime() + time * 1000)
    // 注意 这里一定要写path=/ 让cookie写在根路径/下面(也就是域名下)
    // 如果不指定path，由于测试服的访问地址是https://test.qtrade.com.cn/xx_admin
    // 在setCookie 'xx_user'的时path默认是xx_admin
    // 之后clearCookieByKey 'xx_key'就只能清除xx_admin下的xx_key，而cookie xx_key是后端写到前端的，path是 /
    document.cookie = name + '=' + value + ';expires=' + exp.toGMTString() + ';path=/'
  },
  // 清除cookie
  clearCookieByKey (name) {
    this.setCookie(name, '', -1)
  }
}
