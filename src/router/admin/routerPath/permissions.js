/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/routerPath/permissions.js
 * @Date         : 2022-02-15 10:48:38
 * @LastEditTime : 2022-08-22 14:24:22
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'permissions',
      name: 'permissions-index',
      meta: {
        title: 'permissionTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.sys' }, { name: 'routerMeta.permissionTitle' }]
        }
      },
      component: resolve => require(['@/views/admin/permissions/permissions'], resolve)
    }
  ]
}
