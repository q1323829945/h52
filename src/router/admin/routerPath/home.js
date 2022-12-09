/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/admin/routerPath/home.js
 * @Date         : 2022-02-17 13:42:40
 * @LastEditTime : 2022-06-10 14:01:34
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'home',
      name: 'home-index',
      meta: {
        title: 'homeTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }]
        }
      },
      component: resolve => require(['@/views/admin/home/home'], resolve)
    }
  ]
}
