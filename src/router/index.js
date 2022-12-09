/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/index.js
 * @Date         : 2022-02-10 14:45:39
 * @LastEditTime : 2022-06-10 10:04:40
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from 'utils'
import store from '../store/store'
import Vue from 'vue'
import login from './login'
import client from './client'
import admin from './admin'
import notFound from './notFound'

import VueRouter from 'vue-router'
import language from '@/utils/language'

Vue.use(VueRouter)
// 解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new VueRouter({
  routes: [...Object.values(login), ...Object.values(client), ...Object.values(admin), ...Object.values(notFound)],
  mode: process.env.VUE_APP_ROUTEMODEL,
  base: process.env.VUE_APP_BASEURLPATH,
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    // 异步滚动操作+页面返回出现空白屏问题
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 })
      }, 0)
    })
  }
})
router.beforeEach((to, from, next) => {
  console.log({
    '目标页面to==': to,
    '当前页面from==': from
  })
  // 清除网络请求错误弹窗记录
  store.dispatch('setOnceNetworkAlert', false)
  if (to.meta.title) {
    // document.title = to.meta.title
    // 页面标题国际化
    document.title = utils.getPageTitleLanguage(language, to.meta.title)
  }
  if (to.meta && to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (utils.getStore('USER-TOKEN', sessionStorage)) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: from.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
