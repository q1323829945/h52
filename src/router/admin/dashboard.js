/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/router/admin/dashboard.js
 * @Date         : 2022-02-10 14:49:52
 * @LastEditTime : 2022-10-26 09:13:43
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import home from './routerPath/home'
import user from './routerPath/user'
import document from './routerPath/document'
import loan from './routerPath/loan'
import loanAgreementConfig from './routerPath/loanAgreementConfig'
import invoice from './routerPath/invoice'
// import customerOffer from './routerPath/customerOffer'
import ratePlan from './routerPath/ratePlan'
import channel from '@/router/admin/routerPath/channel'
import permissions from '@/router/admin/routerPath/permissions'
import role from '@/router/admin/routerPath/role'
import apply from '@/router/admin/routerPath/apply'
import position from '@/router/admin/routerPath/position'
import statistics from '@/router/admin/routerPath/statistics'
import pdpa from '@/router/admin/routerPath/pdpa'
import workflowConfig from './routerPath/workflowConfig'

export default {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard/home',
  meta: {
    keepAlive: false,
    requireAuth: true
  },
  component: () => import('@/views/admin/dashboard/index.vue'),
  children: [
    ...home.children,
    ...user.children,
    ...document.children,
    ...loan.children,
    ...loanAgreementConfig.children,
    ...invoice.children,
    // ...customerOffer.children,
    ...ratePlan.children,
    ...channel.children,
    ...permissions.children,
    ...role.children,
    ...apply.children,
    ...position.children,
    ...statistics.children,
    ...pdpa.children,
    ...workflowConfig.children
  ]
}
