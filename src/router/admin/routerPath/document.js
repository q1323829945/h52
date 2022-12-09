/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/admin/routerPath/document.js
 * @Date         : 2022-03-14 11:23:09
 * @LastEditTime : 2022-06-10 14:07:26
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'documentTemplate',
      name: 'documentTemplate-index',
      meta: {
        title: 'documentTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business' },
            { name: 'routerMeta.loanFileUploadConfigTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/document/document'], resolve)
    }
  ]
}
