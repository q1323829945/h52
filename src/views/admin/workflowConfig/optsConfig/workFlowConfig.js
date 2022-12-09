/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/optsConfig/workFlowConfig.js
 * @Date         : 2022-10-25 15:38:09
 * @LastEditTime : 2022-11-04 16:19:32
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

const statusOpts = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Ready', value: 'READY' }
]

const eventTypes = [
  { label: 'Check Customer', value: 'CHECK_CUSTOMER' },
  { label: 'Check Data', value: 'CHECK_DATA' },
  { label: 'Recommend Product', value: 'RECOMMEND_PRODUCT' },
  { label: 'Collect Information', value: 'COLLECT_INFORMATION' },
  { label: 'Customer Archive', value: 'CUSTOMER_ARCHIVE' },
  { label: 'Assets Archive', value: 'ASSETS_ARCHIVE' },
  { label: 'Pre Approval', value: 'PRE_APPROVAL' }
]

// 可选 START,WAITING,PROCESSING,PASSED,FAILED
const stepOpts = [
  { label: 'Start', value: 'START' },
  { label: 'Waiting', value: 'WAITING' },
  { label: 'Todo', value: 'PROCESSING' },
  { label: 'Passed', value: 'PASSED' },
  { label: 'Failed', value: 'FAILED' },
  { label: 'Rejected', value: 'REJECTED' }
]

const eventStatusOpts = [
  { label: 'Passed', value: 'PASSED' },
  { label: 'Rejected', value: 'REJECTED' }
]

export default {
  statusOpts,
  eventTypes,
  stepOpts,
  eventStatusOpts
}
