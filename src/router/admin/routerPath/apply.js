/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/router/admin/routerPath/apply.js
 * @Date         : 2022-08-29 13:23:30
 * @LastEditTime : 2022-12-01 14:41:33
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import utils from '@/utils'

export default {
  children: [
    {
      path: 'loanApplySupplement',
      name: 'loanApplySupplement-index',
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
      component: resolve => require(['@/views/admin/apply/loan/index'], resolve)
    },
    {
      path: 'eventHandle',
      name: 'eventHandling-index',
      meta: {
        title: 'eventHandlingTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.eventHandlingTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/workflowConfig/eventHandling'], resolve)
    },
    {
      path: 'eventHandleQuery',
      name: 'eventQuery-index',
      meta: {
        title: 'eventQueryTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            { name: 'routerMeta.eventQueryTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/workflowConfig/eventQuery'], resolve)
    },
    {
      path: 'loanApply/detail',
      name: 'loanApply-detail',
      meta: {
        title: 'customerOfferDetailTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
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
      component: resolve => require(['@/views/admin/apply/loan/detail'], resolve)
    },
    // 教师贷
    {
      path: 'loanApply/teacherProduct',
      name: 'loanApply-teacherProduct',
      meta: {
        title: 'teacherProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'menuPath')
          ? utils.getStore('ROUTRT-META', sessionStorage).menuPath
          : '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.name
                : 'routerMeta.customerOfferTitle',
              url: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.url
                : '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.teacherProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/teacherProduct'], resolve)
    },
    // 企业贷
    {
      path: 'loanApply/corporateProduct',
      name: 'loanApply-corporateProduct',
      meta: {
        title: 'corporateProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'menuPath')
          ? utils.getStore('ROUTRT-META', sessionStorage).menuPath
          : '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.name
                : 'routerMeta.customerOfferTitle',
              url: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.url
                : '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.corporateProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/corporateProduct'], resolve)
    },
    // 新用户贷
    {
      path: 'loanApply/newClientProduct',
      name: 'loanApply-newClientProduct',
      meta: {
        title: 'newClientProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'menuPath')
          ? utils.getStore('ROUTRT-META', sessionStorage).menuPath
          : '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.name
                : 'routerMeta.customerOfferTitle',
              url: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.url
                : '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.newClientProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/newClientProduct'], resolve)
    },
    // 个人贷
    {
      path: 'loanApply/clientProduct',
      name: 'loanApply-clientProduct',
      meta: {
        title: 'clientProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'menuPath')
          ? utils.getStore('ROUTRT-META', sessionStorage).menuPath
          : '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.name
                : 'routerMeta.customerOfferTitle',
              url: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.url
                : '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.clientProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/clientProduct'], resolve)
    },
    // KABUHAYAN贷
    {
      path: 'loanApply/kabuhayanProduct',
      name: 'loanApply-kabuhayanProduct',
      meta: {
        title: 'kabuhayanProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'menuPath')
          ? utils.getStore('ROUTRT-META', sessionStorage).menuPath
          : '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.name
                : 'routerMeta.customerOfferTitle',
              url: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.url
                : '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.kabuhayanProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/kabuhayanProduct'], resolve)
    },
    // 申请
    {
      path: 'loanApply/Agent',
      name: 'loanApply-Agent',
      meta: {
        title: 'moblieClientTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'menuPath')
          ? utils.getStore('ROUTRT-META', sessionStorage).menuPath
          : '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.name
                : 'routerMeta.customerOfferTitle',
              url: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.url
                : '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.moblieClientTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/moblieApply'], resolve)
    },
    // 汽车贷申请
    {
      path: 'loanApply/car',
      name: 'loanApply-car',
      meta: {
        title: 'carProductApplyTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: 'routerMeta.customerOfferTitle',
              url: '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.carProductApplyTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/carLoanApply'], resolve)
    },
    // 汽车贷
    {
      path: 'loanApply/carProduct',
      name: 'loanApply-carProduct',
      meta: {
        title: 'carProductTitle',
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/loanApplySupplement', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.loanConfig', url: '' },
            {
              name: 'routerMeta.customerOfferTitle',
              url: '/dashboard/loanApplySupplement'
            },
            { name: 'routerMeta.carProductTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/apply/loan/applicationProduct/carProduct'], resolve)
    }
  ]
}
