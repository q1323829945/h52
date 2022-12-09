/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/routerPath/pdpa.js
 * @Date         : 2022-09-09 17:01:36
 * @LastEditTime : 2022-09-09 17:01:36
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'pdpaConfig',
      name: 'pdpaConfig',
      meta: {
        title: 'pdpaConfigTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.pdpaConfigTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/pdpa/index'], resolve)
    },
    {
      path: 'pdpaAuthorizationConfig',
      name: 'pdpaAuthorizationConfig',
      meta: {
        title: 'pdpaAuthorizationConfigTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.pdpaAuthorizationConfigTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/pdpa/authorization'], resolve)
    },
    {
      path: 'pdpaDetail',
      name: 'pdpaDetail',
      meta: {
        title: 'pdpaDetailTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/pdpaConfig', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.pdpaConfigTitle', url: '/dashboard/pdpaConfig' },
            { name: 'routerMeta.pdpaDetailTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/pdpa/detail'], resolve)
    },
    {
      path: 'pdpaAdd',
      name: 'pdpaAdd',
      meta: {
        title: 'pdpaAddTitle', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/pdpaConfig', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.business', url: '' },
            { name: 'routerMeta.pdpaConfigTitle', url: '/dashboard/pdpaConfig' },
            { name: 'routerMeta.pdpaAddTitle' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/pdpa/add'], resolve)
    }
  ]
}
