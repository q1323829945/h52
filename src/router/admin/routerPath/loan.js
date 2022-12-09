/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/router/admin/routerPath/loan.js
 * @Date         : 2022-03-18 09:50:24
 * @LastEditTime : 2022-12-01 14:42:35
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

export default {
  children: [
    {
      path: 'loanProduct',
      name: 'loan-index',
      meta: {
        title: 'loanProductTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.loanProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/loan/loanProduct'], resolve)
    },
    {
      path: 'loanApplyQuery',
      name: 'loanQuery',
      meta: {
        title: 'loanQueryTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.businessQuery', url: '' },
            { name: 'routerMeta.loanQueryTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/loan/loanQuery'], resolve)
    },
    {
      path: 'loanProduct/add',
      name: 'addLoanProduct',
      meta: {
        title: 'addLoanProductTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanProduct', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.loanProductTitle', url: '/dashboard/loanProduct' },
            { name: 'routerMeta.addLoanProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/loan/addLoanProduct'], resolve)
    },
    {
      path: 'loanProduct/detail',
      name: 'loanProductDetail',
      meta: {
        title: 'detailLoanProductTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanProduct', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.loanProductTitle', url: '/dashboard/loanProduct' },
            { name: 'routerMeta.detailLoanProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/loan/loanProductDetail'], resolve)
    },
    {
      path: 'loanProduct/history',
      name: 'loanProductHistory',
      meta: {
        title: 'historyLoanProductTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanProduct', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.loanProductTitle', url: '/dashboard/loanProduct' },
            { name: 'routerMeta.historyLoanProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/loan/loanProductHistory'], resolve)
    },
    {
      path: 'loanFileUploadConfig',
      name: 'loanFileUploadConfig',
      meta: {
        title: 'loanFileUploadConfigTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.loanFileUploadConfigTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/loan/loanFileUploadConfig'], resolve)
    },
    {
      path: 'questionnaires',
      name: 'questionnaireConfig',
      meta: {
        title: 'questionnaireConfigTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.questionnaireConfigTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/questionnaire/index'], resolve)
    },
    // 教师贷
    {
      path: 'loan/teacherProduct',
      name: 'loan-teacherProduct',
      meta: {
        title: 'teacherProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.businessQuery', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.teacherProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/teacherProduct'], resolve)
    },
    // 企业贷
    {
      path: 'loan/corporateProduct',
      name: 'loan-corporateProduct',
      meta: {
        title: 'corporateProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.businessQuery', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.corporateProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/corporateProduct'], resolve)
    },
    // 新用户贷
    {
      path: 'loan/newClientProduct',
      name: 'loan-newClientProduct',
      meta: {
        title: 'newClientProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.businessQuery', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.newClientProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/newClientProduct'], resolve)
    },
    // 个人贷
    {
      path: 'loan/clientProduct',
      name: 'loan-clientProduct',
      meta: {
        title: 'clientProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.businessQuery', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.clientProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/clientProduct'], resolve)
    },
    // KABUHAYAN贷
    {
      path: 'loan/kabuhayanProduct',
      name: 'loan-kabuhayanProduct',
      meta: {
        title: 'kabuhayanProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.businessQuery', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.kabuhayanProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/kabuhayanProduct'], resolve)
    },
    // 申请
    {
      path: 'loan/agent',
      name: 'loan-agent',
      meta: {
        title: 'moblieClientTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.moblieClientTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/moblieApply'], resolve)
    },
    // 汽车贷申请
    {
      path: 'loan/agentCar',
      name: 'loan-agentCar',
      meta: {
        title: 'carProductApplyTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.carProductApplyTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/carLoanApply'], resolve)
    },
    // 汽车贷
    {
      path: 'loan/carProduct',
      name: 'loan-carProduct',
      meta: {
        title: 'carProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplyQuery', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.loanQueryTitle', url: '/dashboard/loanApplyQuery' },
            { name: 'routerMeta.carProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/carProduct'], resolve)
    }
  ]
}
