/*
 * @Author       : Nimo
 * @FilePath     : /saas-jsd-management/src/mixins/index.js
 * @Date         : 2022-02-10 16:01:13
 * @LastEditTime : 2022-03-11 16:52:30
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  methods: {
    /**
     * 路由跳转，支持push、replace，location
     * @param {*} to
     * @param {*} replace
     * @param {*} url
     */
    routerLink(to, replace, url) {
      const { $router } = this
      if (to && $router) {
        $router[replace ? 'replace' : 'push'](to)
      } else if (url) {
        replace ? location.replace(url) : (location.href = url)
      }
    },
    /**
     *  统一跳转到登陆页面
     */
    goToLogin(type = 'push') {
      this.$router[type]({
        path: `/login?redirect=${this.$route.fullPath}`
      })
    }
    // goToLogin(time = 1.0, type = 'push') {
    //   setTimeout(() => {
    //     this.$router[type]({
    //       path: `/login?redirect=${this.$route.fullPath}`
    //     })
    //   }, time * 1000)
    // }
  }
}
