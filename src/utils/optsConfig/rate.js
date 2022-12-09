/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/utils/optsConfig/rate.js
 * @Date         : 2022-04-06 13:46:19
 * @LastEditTime : 2022-06-24 11:04:22
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
// 还款计划类型
const ratePlanTypeOpts = [
  {
    value: 'STANDARD',
    label: 'configType.standard'
  },
  {
    value: 'CUSTOMER',
    label: 'configType.customer'
  }
]

// invoiceStatus枚举 INITIATE--初始化,ACCOUNTED--已出账单, FINISHED--已结束账单
const invoiceStatusOpts = [
  { value: 'INITIATE', label: 'configType.INITIATE' },
  { value: 'ACCOUNTED', label: 'configType.ACCOUNTED' },
  { value: 'FINISHED', label: 'configType.FINISHED' }
]

// repaymentStatus枚举 UNDO--未还,OPEN--还款中,CLEAR--已还清,OVERDUE--已逾期
const repaymentStatusOpts = [
  { value: 'UNDO', label: 'configType.UNDO' },
  { value: 'OPEN', label: 'configType.OPEN' },
  { value: 'CLEAR', label: 'configType.CLEAR' },
  { value: 'OVERDUE', label: 'configType.OVERDUE' }
]

// invoiceAmountType枚举 PRINCIPAL--本金, INTEREST--利息, FEE--费用, PENALTY_INTEREST--罚息
const invoiceAmountTypeOpts = [
  { value: 'PRINCIPAL', label: 'configType.PRINCIPAL' },
  { value: 'INTEREST', label: 'configType.INTEREST' },
  { value: 'FEE', label: 'configType.FEE' },
  { value: 'PENALTY_INTEREST', label: 'configType.PENALTY_INTEREST' }
]

// invoiceType枚举 LOAN--贷款
const invoiceTypeOpts = [{ value: 'LOAN', label: 'configType.LOAN' }]

//- instructionLifecycleStatus枚举 FAILED--失败, FULFILLED--完成, IN_PROGRESS--进行中, ON_HOLD--挂起, PREPARED--初始化, REQUEST--请求中
const instructionLifecycleStatusOpts = [
  { value: 'FULFILLED', label: 'configType.repaymentFULFILLED' },
  { value: 'FAILED', label: 'configType.repaymentFAILED' },
  { value: 'IN_PROGRESS', label: 'configType.repaymentIN_PROGRESS' },
  { value: 'ION_HOLD', label: 'configType.repaymentION_HOLD' },
  { value: 'PREPARED', label: 'configType.repaymentPREPARED' },
  { value: 'REQUEST', label: 'configType.repaymentREQUEST' }
]

export default {
  ratePlanTypeOpts,
  invoiceStatusOpts,
  repaymentStatusOpts,
  invoiceAmountTypeOpts,
  invoiceTypeOpts,
  instructionLifecycleStatusOpts
}
