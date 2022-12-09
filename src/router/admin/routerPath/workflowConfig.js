/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/routerPath/workflowConfig.js
 * @Date         : 2022-10-25 14:26:45
 * @LastEditTime : 2022-11-02 15:20:10
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import utils from '@/utils'

export default {
  children: [
    {
      path: 'workflowConfig',
      name: 'workflow-index',
      meta: {
        title: 'workflowTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.business' }, { name: 'routerMeta.workflowTitle' }]
        }
      },
      component: resolve => require(['@/views/admin/workflowConfig/index'], resolve)
    },
    {
      path: 'workflow/activity',
      name: 'workflow-activity',
      meta: {
        title: 'workflowActivityTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        menuPath: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'menuPath')
          ? utils.getStore('ROUTRT-META', sessionStorage).menuPath
          : '/dashboard/workflowConfig', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            {
              name: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.name
                : 'routerMeta.workflowTitle',
              url: utils.objKey(utils.getStore('ROUTRT-META', sessionStorage), 'levelPath')
                ? utils.getStore('ROUTRT-META', sessionStorage).levelPath.url
                : '/dashboard/workflowConfig'
            },
            { name: 'routerMeta.workflowActivityTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/workflowConfig/activity'], resolve)
    },
    {
      path: 'workflowQuery',
      name: 'workflow-query',
      meta: {
        title: 'workflowQueryTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.business' }, { name: 'routerMeta.workflowQueryTitle' }]
        }
      },
      component: resolve => require(['@/views/admin/workflowConfig/query'], resolve)
    }
  ]
}
