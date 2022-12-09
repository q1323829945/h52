/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/routerPath/position.js
 * @Date         : 2022-08-30 17:15:15
 * @LastEditTime : 2022-08-31 10:24:33
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'positionConfig',
      name: 'position-index',
      meta: {
        title: 'positionTitle',
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.sys' }, { name: 'routerMeta.positionTitle' }]
        }
      },
      component: resolve => require(['@/views/admin/position/index'], resolve)
    }
  ]
}
