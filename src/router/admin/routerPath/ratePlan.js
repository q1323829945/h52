/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/routerPath/ratePlan.js
 * @Date         : 2022-08-11 15:06:09
 * @LastEditTime : 2022-08-11 15:06:09
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'ratePlan',
      name: 'ratePlan-index',
      meta: {
        title: 'ratePlanTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.business', url: '' }, { name: 'routerMeta.ratePlanTitle' }]
        }
      },
      component: resolve => require(['@/views/admin/ratePlan/ratePlan'], resolve)
    }
  ]
}
