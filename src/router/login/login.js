/*
 * @Author       : Nimo
 * @FilePath     : /saas-project-admin/src/router/login/login.js
 * @Date         : 2022-02-11 11:10:34
 * @LastEditTime : 2022-02-24 13:28:46
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import Layout from '@/layout/route-layout'

export default {
  path: '/',
  // name: 'login',
  component: Layout,
  redirect: '/login',
  children: [
    {
      path: 'login',
      name: 'login',
      meta: {
        title: 'loginTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: false
      },
      component: resolve => require(['@/views/login/index.vue'], resolve)
    },
    {
      path: 'register',
      name: 'register',
      meta: {
        title: 'registerTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: false
      },
      component: resolve => require(['@/views/login/register.vue'], resolve)
    }
  ]
}
