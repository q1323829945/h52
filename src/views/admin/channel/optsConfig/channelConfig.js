/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/channel/optsConfig/channelConfig.js
 * @Date         : 2022-08-25 14:54:07
 * @LastEditTime : 2022-12-05 14:41:55
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import common from '@/utils/optsConfig/common'
const agreementTypeOpts = [{ label: 'Commission Sale', value: 'COMMISSION_SALE' }]

export const channelCastTypeOpts = [
  { label: 'Agent', value: 'AGENT' },
  { label: 'Dealer', value: 'DEALER' },
  { label: 'Car Broker', value: 'CAR_BROKER' },
  { label: 'Automobile 4s', value: 'SALES_SERVICE_SHOP_4S' },
  { label: 'Real Estate', value: 'REAL_ESTATE ' }
]

// CommissionMethodType佣金计算方式
// APPLY_COUNT_FIX_AMOUNT       | 申请进件固定金额   |
// APPROVAL_COUNT_FIX_AMOUNT    | 审批进件固定金额   |
// APPLY_AMOUNT_RATIO           | 申请进件金额按比例 |
// APPROVAL_AMOUNT_RATIO        | 审批进件金额按比例 |

// COUNT_FIX_AMOUNT 按数量（数量固定金额）
// AMOUNT_RATIO    按金额（金额百分比）
const commissionMethodTypeOpts = [
  { label: 'Count', value: 'COUNT_FIX_AMOUNT' },
  { label: 'Ratio', value: 'AMOUNT_RATIO' }
]

// commissionAmountRangeType 固定金额区间
// DEFAULT                      | 默认               |
// LESS_THAN_ONE_MILLION        | 100万以下          |
// ONE_MILLION_TO_TEN_MILLION   | 100万到1000万      |
// MORE_THAN_TEN_MILLION        | 1000万以上         |
const commissionAmountRangeTypeOpts = [
  { label: 'Default', value: 'DEFAULT' },
  { label: 'Less Than One Million', value: 'LESS_THAN_ONE_MILLION' },
  { label: 'One Million To Ten Million', value: 'ONE_MILLION_TO_TEN_MILLION' },
  { label: 'More Than Ten Million', value: 'MORE_THAN_TEN_MILLION' }
]

// commissionCountRangeType  固定进件数区间
// DEFAULT                      | 默认               |
// LESS_THAN_ONE_THOUSAND       | 一千以下           |
// ONE_THOUSAND_TO_TEN_THOUSAND | 一千到一万         |
// MORE_THAN_TEN_THOUSAND       | 一万以上           |
const commissionCountRangeTypeOpts = [
  { label: 'Default', value: 'DEFAULT' },
  { label: 'Less Than One Thousandn', value: 'LESS_THAN_ONE_THOUSAND' },
  { label: 'One Thousand To Ten Thousand', value: 'ONE_THOUSAND_TO_TEN_THOUSAND' },
  { label: 'More Than Ten Thousand', value: 'MORE_THAN_TEN_THOUSAND' }
]

const commissionApplyStatus = [
  { label: 'Record', value: 'RECORD' },
  { label: 'Approvaled', value: 'APPROVALED' }
]

const widgets = {
  information: {
    title: 'Agent Information',
    section: 'information',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'legalEntityIndicator',
        label: 'Legal Entity Indicator',
        placeholder: 'Legal Entity Indicator',
        rules: {
          required: true,
          message: 'Enter Legal Entity Indicator'
        }
      },
      {
        type: 'input',
        key: 'organisationSector',
        label: 'Organisation Sector',
        placeholder: 'Organisation Sector',
        rules: {
          required: true,
          message: 'Enter Organisation Sector'
        }
      },
      {
        type: 'date',
        key: 'organisationRegistrationDate',
        label: 'Organisation Registration Date',
        valueFormat: 'yyyy-MM-dd',
        placeholder: 'Organisation Registration Date',
        rules: {
          required: true,
          message: 'Organisation Registration Date'
        }
      },
      {
        type: 'input',
        key: 'placeOfRegistration',
        label: 'Place Of Registration',
        placeholder: 'Place Of Registration',
        rules: {
          required: true,
          message: 'Enter Place Of Registration'
        }
      }
    ]
  },
  channelIdentification: {
    title: 'Agent Identification',
    section: 'channelIdentification',
    channelIdentificationWidgets: [],
    widgets: [
      {
        type: 'select',
        key: 'channelIdentificationType',
        label: 'Identification Type',
        list: common.organisationIdOpts,
        placeholder: 'Identification Type',
        rules: {
          required: true,
          message: 'Select Identification Type'
        }
      },
      {
        type: 'input',
        key: 'channelIdentification',
        label: 'Identification',
        placeholder: 'Identification',
        rules: {
          required: true,
          message: 'Enter Identification'
        }
      }
    ]
  },
  channelCast: {
    title: 'Agent Cast',
    section: 'channelCast',
    widgets: [
      {
        type: 'input',
        key: 'channelCode',
        label: 'Channel Code',
        placeholder: 'Channel Code',
        rules: {
          required: true,
          message: 'Enter Channel Code'
        }
      },
      {
        type: 'input',
        key: 'channelName',
        label: 'Channel Name',
        placeholder: 'Channel Name',
        rules: {
          required: true,
          message: 'Enter Channel Name'
        }
      },
      {
        type: 'cascader',
        key: 'channelCastType',
        label: 'Cast Type',
        placeholder: 'Cast Type',
        rules: {
          required: true,
          message: 'Select Cast Type'
        }
      }
    ]
  }
}

export default {
  widgets,
  agreementTypeOpts,
  commissionMethodTypeOpts,
  commissionAmountRangeTypeOpts,
  commissionCountRangeTypeOpts,
  commissionApplyStatus
}
