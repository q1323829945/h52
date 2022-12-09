/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/router/admin/routerPath/channel.js
 * @Date         : 2022-08-22 13:45:09
 * @LastEditTime : 2022-11-28 11:11:53
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  children: [
    {
      path: 'channelQueryConfig',
      name: 'channel-index',
      meta: {
        title: 'channnel_Title', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        breadcrumb: {
          isShow: true,
          levelList: [{ name: 'menuTree.home', url: '/dashboard/home' }, { name: 'menuTree.channelConfig' }, { name: 'routerMeta.channnel_Title' }]
        }
      },
      component: resolve => require(['@/views/admin/channel/index'], resolve)
    },
    {
      path: 'channel/detail',
      name: 'channel-Detail',
      meta: {
        title: 'channnel_Detail_Title', // 国际化title要和i18n配置中的相对应
        keepAlive: false,
        requireAuth: true,
        menuPath: '/dashboard/channelQueryConfig', // 左侧菜单栏的路径
        breadcrumb: {
          isShow: true,
          levelList: [
            { name: 'menuTree.home', url: '/dashboard/home' },
            { name: 'menuTree.channelConfig', url: '' },
            { name: 'routerMeta.channnel_Title', url: '/dashboard/channelQueryConfig' },
            { name: 'routerMeta.channnel_Detail_Title' }
          ]
        }
      },
      component: resolve => require(['@/views/admin/channel/detail'], resolve)
    }
  ]
}
