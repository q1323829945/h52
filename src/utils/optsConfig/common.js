/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/optsConfig/common.js
 * @Date         : 2022-04-07 14:03:53
 * @LastEditTime : 2022-09-15 10:39:19
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import { positionTypeOpts } from '@/views/admin/user/optsConfig/usersConfig'

// 协议类型
const agreementTypeOpts = [
  { label: 'configType.CUSTOMER', value: 'CUSTOMER' },
  { label: 'configType.SUPPLIER', value: 'SUPPLIER' },
  { label: 'configType.PRODUCT_BROKER', value: 'PRODUCT_BROKER' },
  { label: 'configType.PRODUCT_SALE', value: 'PRODUCT_SALE' },
  { label: 'configType.FIDUCIARY', value: 'FIDUCIARY' },
  { label: 'configType.COMMISSION_SALE', value: 'COMMISSION_SALE' },
  { label: 'configType.SERVICING_MANDATE', value: 'SERVICING_MANDATE' },
  { label: 'configType.CHANNEL_ACCESS', value: 'CHANNEL_ACCESS' }
]
// 协议状态
const loanAgreementStatus = [
  { label: 'configType.OFFERED', value: 'OFFERED' },
  { label: 'configType.SIGNED', value: 'SIGNED' },
  { label: 'configType.PAID', value: 'PAID' },
  { label: 'configType.COMPLETED', value: 'COMPLETED' },
  { label: 'configType.TERMINATED', value: 'TERMINATED' }
]
// 房屋所有权类型
const housingOwnershipTypeOpts = [
  { label: 'configType.OWNED', value: 'OWNED' },
  { label: 'configType.SERVICING_MORTAGE', value: 'SERVICING_MORTAGE' },
  { label: 'configType.RENTED', value: 'RENTED' }
]

// 货币类型
const currencyOpts = [
  { label: 'configType.CNY', value: 'CNY' },
  { label: 'configType.USD', value: 'USD' }
]

// 是否状态
const whetherOpts = [
  { label: 'configType.yes', value: 'Y' },
  { label: 'configType.no', value: 'N' }
]

// 贷款状态
const loanTypeStatusOpts = [
  { label: 'configType.record', value: 'RECORD' },
  { label: 'configType.submit', value: 'SUBMIT' },
  { label: 'configType.approvaled', value: 'APPROVALED' },
  { label: 'configType.loan', value: 'LOAN' },
  { label: 'configType.finish', value: 'FINISH' },
  { label: 'configType.rejected', value: 'REJECTED' },
  { label: 'configType.processing', value: 'PROCESSING' }
]

// 审批类型
const customerOfferStatusOpts = [
  { label: 'configType.pass', value: 'APPROVAL' },
  { label: 'configType.pending', value: 'PENDING' },
  { label: 'configType.reject', value: 'REJECT' }
]

// 语言类型类型
const languageTypeOpts = [
  { label: 'zh-CN', value: 'zh-CN' },
  { label: 'en-US', value: 'en-US' },
  { label: 'en-PH', value: 'en-PH' }
]

// 文档类型
const documentTypeOpts = [
  { label: 'configType.document_title', value: 'TITLE' },
  { label: 'configType.document_share', value: 'SHARE' },
  { label: 'configType.document_contract', value: 'CONTRACT' },
  { label: 'configType.document_certificate', value: 'CERTIFICATE' }
]

// 国家
const nationalityOpts = [
  { label: 'configType.CHN', value: 'CHN' },
  { label: 'configType.HKG', value: 'HKG' },
  { label: 'configType.MAC', value: 'MAC' },
  { label: 'configType.TWN', value: 'TWN' },
  { label: 'configType.SGP', value: 'SGP' },
  { label: 'configType.THA', value: 'THA' },
  { label: 'configType.IND', value: 'IND' },
  { label: 'configType.JPN', value: 'JPN' },
  { label: 'configType.KOR', value: 'KOR' },
  { label: 'configType.USA', value: 'USA' },
  { label: 'configType.GBR', value: 'GBR' },
  { label: 'configType.FRA', value: 'FRA' },
  { label: 'configType.DEU', value: 'DEU' },
  { label: 'configType.IDN', value: 'IDN' },
  { label: 'configType.MYS', value: 'MYS' }
]

// 组织识别码类型
const organisationIdOpts = [
  { label: 'configType.LEI', value: 'LEI' },
  { label: 'configType.ELF', value: 'ELF' },
  { label: 'configType.MIC', value: 'MIC' },
  { label: 'configType.BICFI', value: 'BICFI' },
  { label: 'configType.DUNS', value: 'DUNS' }
]

// 组织结构类型
const organizationInvolvementsOpts = [
  { label: 'configType.SHAREHOLDER', value: 'SHAREHOLDER' },
  { label: 'configType.EXECUTIVE_OFFICER', value: 'EXECUTIVE_OFFICER' },
  { label: 'configType.REGISTRATION_AUTHORITY', value: 'REGISTRATION_AUTHORITY' }
]

// 业务单元类型
const businessUnitsTypeOpts = [{ label: 'configType.MICRO_LOAN', value: 'MICRO_LOAN' }]

// 居民身份
const residentialStatusOpts = [
  { label: 'configType.non_permanent', value: 'NON_PERMANENT' },
  { label: 'configType.permanent', value: 'PERMANENT' }
]

// 证件类型
const personIdentificationTypeOpts = [
  { label: 'configType.social_security_number', value: 'SOCIAL_SECURITY_NUMBER' },
  { label: 'configType.drivers_license_number', value: 'DRIVERS_LICENSE_NUMBER' },
  { label: 'configType.passport_number', value: 'PASSPORT_NUMBER' },
  { label: 'configType.identity_card_number', value: 'IDENTITY_CARD_NUMBER' },
  { label: 'configType.employer_identification_number', value: 'EMPLOYER_IDENTIFICATION_NUMBER' }
]

// 个人角色
const personRoles = [
  { label: 'configType.personRolesInner', value: 'INNER' },
  { label: 'configType.personRolesOuter', value: 'OUTER' }
]

// 职务
const postOpts = [{ value: 'Manager', label: 'configType.occupation1' }]

//企业业务范围类型
const businessScopeOpts = [
  { label: 'configType.businessScope1', value: '1' },
  { label: 'configType.businessScope2', value: '2' },
  { label: 'configType.businessScope3', value: '3' },
  { label: 'configType.businessScope4', value: '4' },
  { label: 'configType.businessScope5', value: '5' },
  { label: 'configType.businessScope6', value: '6' },
  { label: 'configType.businessScope7', value: '7' },
  { label: 'configType.businessScope8', value: '8' },
  { label: 'configType.businessScope9', value: '9' },
  { label: 'configType.businessScope10', value: '10' },
  { label: 'configType.businessScope11', value: '11' },
  { label: 'configType.businessScope12', value: '12' },
  { label: 'configType.businessScope13', value: '13' },
  { label: 'configType.businessScope14', value: '14' }
]

// 个人信息组件配置
const personWidgetOpts = {
  // 姓名
  personNameWidgets: [
    {
      type: 'input',
      key: 'givenName',
      label: 'personInfo.givenName',
      placeholder: 'personInfo.givenName',
      rules: {
        required: true,
        message: 'personInfo.givenNameRules'
      }
    },
    {
      type: 'input',
      key: 'firstName',
      label: 'personInfo.firstName',
      placeholder: 'personInfo.firstName',
      rules: {
        required: true,
        message: 'personInfo.firstNameRules'
      }
    },
    {
      type: 'input',
      key: 'familyName',
      label: 'personInfo.familyName',
      placeholder: 'personInfo.familyName',
      rules: {
        message: 'personInfo.familyNameRules'
      }
    }
  ],
  // 身份信息
  presidentialWidgets: [
    {
      type: 'select',
      key: 'residentialStatus',
      label: 'personInfo.residentialStatus',
      placeholder: 'personInfo.residentialStatus',
      list: residentialStatusOpts,
      rules: {
        required: true,
        message: 'personInfo.residentialStatusRules'
      }
    },
    {
      type: 'date',
      key: 'birthDate',
      label: 'personInfo.birthDate',
      valueFormat: 'yyyy-MM-dd',
      placeholder: 'personInfo.birthDate',
      rules: {
        message: 'personInfo.birthDateRules'
      }
    },
    {
      type: 'select',
      key: 'nationality',
      label: 'personInfo.nationality',
      placeholder: 'personInfo.nationality',
      list: nationalityOpts,
      rules: {
        required: true,
        message: 'personInfo.nationalityRules'
      }
    },
    {
      type: 'input',
      key: 'ethnicity',
      label: 'personInfo.ethnicity',
      placeholder: 'personInfo.ethnicity',
      rules: {
        required: true,
        message: 'personInfo.ethnicityRules'
      }
    }
  ],
  // 证件信息
  personIdWidgets: [],
  personIdItemWidgets: [
    {
      type: 'select',
      key: 'personIdentificationType',
      label: 'personInfo.personIdentificationType',
      placeholder: 'personInfo.personIdentificationType',
      list: personIdentificationTypeOpts,
      rules: {
        required: true,
        message: 'personInfo.personIdentificationTypeRules'
      }
    },
    {
      type: 'input',
      key: 'personIdentification',
      label: 'personInfo.personIdentification',
      placeholder: 'personInfo.personIdentification',
      rules: {
        message: 'personInfo.personIdentificationRules'
      }
    }
  ],
  // 角色类型
  personRolesWidgets: [],
  personRolesItemWidgets: [
    {
      type: 'select',
      key: 'type',
      label: 'personInfo.personRolesType',
      placeholder: 'personInfo.personRolesType',
      list: personRoles,
      rules: {
        required: true,
        message: 'personInfo.personRolesTypeRules'
      }
    }
  ]
}

// 企业信息组件配置
const organisationWidgetOpts = {
  // 组织实体
  entityWidgets: [
    {
      type: 'input',
      key: 'legalEntityIndicator',
      label: 'organisationInfo.legalEntityIndicator',
      placeholder: 'organisationInfo.legalEntityIndicator',
      rules: {
        required: true,
        message: 'organisationInfo.legalEntityIndicatorRules'
      }
    },
    {
      type: 'input',
      key: 'organisationSector',
      label: 'organisationInfo.organisationSector',
      placeholder: 'organisationInfo.organisationSector',
      rules: {
        message: 'organisationInfo.organisationSectorRules'
      }
    },
    {
      type: 'input',
      key: 'placeOfRegistration',
      label: 'organisationInfo.placeOfRegistration',
      placeholder: 'organisationInfo.placeOfRegistration',
      rules: {
        required: true,
        message: 'organisationInfo.placeOfRegistrationRules'
      }
    },
    {
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      key: 'organisationRegistrationDate',
      label: 'organisationInfo.organisationRegistrationDate',
      placeholder: 'organisationInfo.organisationRegistrationDate',
      rules: {
        required: true,
        message: 'organisationInfo.organisationRegistrationDateRules'
      }
    },
    {
      type: 'input',
      key: 'parentOrganisationId',
      label: 'organisationInfo.parentOrganisationId',
      placeholder: 'organisationInfo.parentOrganisationId',
      rules: {
        required: true,
        message: 'organisationInfo.parentOrganisationIdRules'
      }
    }
  ],
  // 组织编码
  organizationIdWidgets: [],
  organisationIdItemWidgets: [
    {
      type: 'select',
      key: 'organisationIdentificationType',
      label: 'organisationInfo.organisationIdentificationType',
      placeholder: 'organisationInfo.organisationIdentificationType',
      list: organisationIdOpts,
      rules: {
        required: true,
        message: 'organisationInfo.organisationIdentificationTypeRules'
      }
    },
    {
      type: 'input',
      key: 'organisationIdentification',
      label: 'organisationInfo.organisationIdentification',
      placeholder: 'organisationInfo.organisationIdentification',
      rules: {
        message: 'organisationInfo.organisationIdentificationRules'
      }
    }
  ],
  // 组织结构
  organizationInvolvementsWidgets: [],
  organizationInvolvementsItemWidgets: [
    {
      type: 'select',
      key: 'organizationInvolvementType',
      label: 'organisationInfo.organizationInvolvementType',
      placeholder: 'organisationInfo.organizationInvolvementType',
      list: organizationInvolvementsOpts,
      rules: {
        required: true,
        message: 'organisationInfo.organizationInvolvementTypeRules'
      }
    },
    {
      type: 'input',
      key: 'partyId',
      label: 'organisationInfo.partyId',
      placeholder: 'organisationInfo.partyId',
      rules: {
        message: 'organisationInfo.partyIdRules'
      }
    }
  ],
  // 业务单元
  businessUnitsWidgets: [],
  businessUnitsItemWidgets: [
    {
      type: 'select',
      key: 'type',
      label: 'organisationInfo.businessUnitsType',
      placeholder: 'organisationInfo.businessUnitsType',
      list: businessUnitsTypeOpts,
      rules: {
        message: 'organisationInfo.businessUnitsTypeRules'
      }
    }
  ]
}

export default {
  agreementTypeOpts,
  loanAgreementStatus,
  housingOwnershipTypeOpts,
  currencyOpts,
  whetherOpts,
  loanTypeStatusOpts,
  customerOfferStatusOpts,
  languageTypeOpts,
  documentTypeOpts,
  nationalityOpts,
  organisationIdOpts,
  organizationInvolvementsOpts,
  businessUnitsTypeOpts,
  residentialStatusOpts,
  businessScopeOpts,
  personIdentificationTypeOpts,
  personRoles,
  personWidgetOpts,
  organisationWidgetOpts,
  postOpts,
  positionTypeOpts
}

//  const h = this.$createElement
// this.$confirm('', {
//   message: h('div', null, [
//     h('i', { class: 'el-icon-question', style: 'color:#f90;font-size:30px;' }),
//     h('span', { style: 'margin-left:10px;font-size:16px;line-height:30px;font-weight:600;vertical-align:top;' }, '提示'),
//     h('p', { style: 'margin:10px 0 0 40px;' }, `${this.$t('loanProduct.statusDialog')}, ${this.$t('document.continue')}？`)
//   ]),
//   confirmButtonText: '确定',
//   cancelButtonText: '取消',
//   customClass: 'del-model',
//   closeOnClickModal: false,
//   closeOnPressEscape: false
// })
