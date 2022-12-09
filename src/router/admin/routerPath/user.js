/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/admin/routerPath/user.js
 * @Date         : 2022-02-17 09:58:30
 * @LastEditTime : 2022-06-10 15:31:32
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'user',
      name: 'user-index',
      meta: {
        title: 'usersTitle',
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.sys' }, { name: 'routerMeta.usersTitle' }]
        }
      },
      component: resolve => require(['@/views/admin/user/user'], resolve)
    }
  ]
}
