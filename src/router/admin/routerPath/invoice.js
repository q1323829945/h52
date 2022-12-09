/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/admin/routerPath/invoice.js
 * @Date         : 2022-06-22 13:18:58
 * @LastEditTime : 2022-06-27 10:50:24
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'repaymentManagementLoanConfig',
      name: 'repayment-index',
      meta: {
        title: 'invoiceTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.invoiceTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/invoice/index'], resolve)
    }
  ]
}
