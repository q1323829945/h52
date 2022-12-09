/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/routerPath/statistics.js
 * @Date         : 2022-09-05 13:37:50
 * @LastEditTime : 2022-09-05 13:41:47
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'loanApplicationStatisticsConfig',
      name: 'loanStatisticalConfig',
      meta: {
        title: 'loanStatisticalTitle',
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.statisticsQuery', url: '' },
            { name: 'routerMeta.loanStatisticalTitle', url: '/dashboard/loanApplicationStatisticsConfig' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/statistics/loanStatistical'], resolve)
    },
    {
      path: 'commissionStatisticsConfig',
      name: 'commissionStatisticalConfig',
      meta: {
        title: 'commissionStatisticalTitle',
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.statisticsQuery', url: '' },
            { name: 'routerMeta.commissionStatisticalTitle', url: '/dashboard/commissionStatisticsConfig' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/statistics/commissionStatistical'], resolve)
    }
  ]
}
