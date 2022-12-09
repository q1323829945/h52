/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/admin/routerPath/loanAgreementConfig.js
 * @Date         : 2022-05-19 14:46:02
 * @LastEditTime : 2022-06-10 15:09:26
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'loanAgreementManagementConfig',
      name: 'loanAgreement-index',
      meta: {
        title: 'loanAgreementTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.loanAgreementTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/loan/loanAgreementConfig'], resolve)
    }
  ]
}
