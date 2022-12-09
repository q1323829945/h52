/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/routerPath/customerOffer.js
 * @Date         : 2022-08-10 17:05:40
 * @LastEditTime : 2022-09-05 13:49:37
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/router/admin/routerPath/customerOffer.js
 * @Date         : 2022-05-09 15:12:56
 * @LastEditTime : 2022-08-02 17:22:01
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'loanApplySupplement',
      name: 'customerOffer-index',
      meta: {
        title: 'customerOfferTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.customerOfferTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/customerOffer/index'], resolve)
    },
    {
      path: 'customerOffer/detail',
      name: 'customerOffer-detail',
      meta: {
        title: 'customerOfferDetailTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/customerOfferConfig', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.customerOfferTitle', url: '/dashboard/customerOfferConfig' },
            { name: 'routerMeta.customerOfferDetailTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/customerOffer/detail'], resolve)
    },
    // 教师贷
    {
      path: 'customerOffer/teacherProduct',
      name: 'customerOffer-teacherProduct',
      meta: {
        title: 'teacherProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.customerOfferTitle', url: '/dashboard/loanApplySupplement' },
            { name: 'routerMeta.teacherProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/customerOffer/applicationProduct/teacherProduct'], resolve)
    },
    // 企业贷
    {
      path: 'customerOffer/corporateProduct',
      name: 'customerOffer-corporateProduct',
      meta: {
        title: 'corporateProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.customerOfferTitle', url: '/dashboard/loanApplySupplement' },
            { name: 'routerMeta.corporateProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/customerOffer/applicationProduct/corporateProduct'], resolve)
    },
    // 新用户贷
    {
      path: 'customerOffer/newClientProduct',
      name: 'customerOffer-newClientProduct',
      meta: {
        title: 'newClientProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.customerOfferTitle', url: '/dashboard/loanApplySupplement' },
            { name: 'routerMeta.newClientProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/customerOffer/applicationProduct/newClientProduct'], resolve)
    },
    // 个人贷
    {
      path: 'customerOffer/clientProduct',
      name: 'customerOffer-clientProduct',
      meta: {
        title: 'clientProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.customerOfferTitle', url: '/dashboard/loanApplySupplement' },
            { name: 'routerMeta.clientProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/customerOffer/applicationProduct/clientProduct'], resolve)
    },
    // KABUHAYAN贷
    {
      path: 'customerOffer/kabuhayanProduct',
      name: 'customerOffer-kabuhayanProduct',
      meta: {
        title: 'kabuhayanProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.customerOfferTitle', url: '/dashboard/loanApplySupplement' },
            { name: 'routerMeta.kabuhayanProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/customerOffer/applicationProduct/kabuhayanProduct'], resolve)
    }
  ]
}
