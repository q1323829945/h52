/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/admin/routerPath/role.js
 * @Date         : 2022-02-15 10:25:04
 * @LastEditTime : 2022-06-10 15:31:22
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'role',
      name: 'role-index',
      meta: {
        title: 'roleTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.sys' }, { name: 'routerMeta.roleTitle' }]
        }
      },
      component: resolve => require(['@/views/admin/role/role'], resolve)
    }
  ]
}
