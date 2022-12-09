/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/optsConfig/customerOffer-i18n.js
 * @Date         : 2022-07-21 14:32:19
 * @LastEditTime : 2022-09-08 09:41:42
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import { teacherProduct_zh, teacherProduct_en } from './teacherProductConfig'

const customerOffer_title_zh = {
  customerOfferTitle: '贷款申请',
  customerOfferDetailTitle: '贷款申请详情',
  loanStatisticalTitle: '贷款申请统计',
  commissionStatisticalTitle: '佣金',

  teacherProductTitle: '教师贷款',
  newClientProductTitle: '新用户贷款',
  clientProductTitle: '个人贷款',
  kabuhayanProductTitle: 'KABUHAYAN贷款',
  corporateProductTitle: '企业贷款'
}
const customerOffer_title_en = {
  customerOfferTitle: 'Loan Application',
  customerOfferDetailTitle: 'Loan Application Detail',
  loanStatisticalTitle: 'Loan Statistical',
  commissionStatisticalTitle: 'Commission',

  teacherProductTitle: 'Teacher Loan',
  newClientProductTitle: 'New Individual Loan',
  clientProductTitle: 'Individual Loan',
  kabuhayanProductTitle: 'KABUHAYAN Loan',
  corporateProductTitle: 'Corporate Loan'
}
const customerOffer_zh = {
  loanTitle: '贷款信息',
  productTitle: '贷款产品',
  companyTitle: '公司',
  referenceAccountTitle: '绑卡信息',
  contactTitle: '联系人信息',
  underwritingTitle: '承销配置',
  detailTitle: '公司详情',
  guarantorTitle: '担保人信息',
  financialTitle: '财务信息',
  uploadDocumentTitle: '上传的文档',
  kycTitle: 'KYC',

  amountSection: '金额最大值-最小值',
  termSection: '期限最大值-最小值',

  underwritingStatus: '承销状态',
  loanStatus: '贷款状态',
  loanAgreementStatus: '贷款协议状态',

  amount: '金额',
  currency: '货币',
  term: '期限',
  local: '本地',
  employ: '用途',

  account: '银行卡号',
  accountBank: '银行名称',

  registrationNo: '注册号',

  contactNRIC: '身份证号',
  mobileArea: '移动区号',
  mobileNumber: '移动号码',
  email: '邮箱',

  name: '姓名',
  companyName: '公司名称',
  address: '地址',
  businessType: '业务类型',
  contactAddress: '联系地址',
  businessPremiseType: '经营场所类型',
  businessFocused: '主要业务',

  primaryGuarantor: '主要担保人',
  nric: '身份证',
  nationality: '国籍',
  occupation: '职业',
  industryExpYear: '行业经验',
  manageExpYear: '管理经验',
  residenceType: '住宅类型',
  residenceOwnership: '住宅所有权',

  lastestYearRevenus: '去年收入',
  mainAccountWithOurBank: '公司的主要营业账户是否在我行',
  outLoanNotWithOutBank: '在我行是否有未偿还的公司贷款',

  documentTemplateName: '文档名称',
  fileName: '文件名称',

  businessInBlackListArea: '业务是否在司法管辖区的黑名单内',
  businessPlanInBlackListArea: '业务计划是否在司法管辖区的黑名单内',
  businessOrPartnerSanctioned: '业务或合作伙伴是否受到制裁',
  relationInBlackListArea: '企业关联方是否在司法管辖区的黑名单内',
  repaymentSourceInBlackListArea: '还款来源是否在司法管辖区的黑名单内',
  representsNeutrality: '企业是否代表无关的第三方处理、发送或接收付款',
  representsNeutralityShared: '企业是否与无关的第三方共享相同的企业信息',
  familiarWithBusiness: '企业业务范围类型',

  queryDate: '查询日期',
  channel: '渠道',
  applyCount: '贷款申请数',
  approvalCount: '贷款审批通过数',

  ratio: '佣金比例',
  camount: ' 佣金金额',
  loanApprovedAmount: '贷款审批通过金额',

  applyAmount: '申请金额',

  ...teacherProduct_zh
}
const customerOffer_en = {
  loanTitle: 'Loan',
  productTitle: 'Product',
  companyTitle: 'Company',
  contactTitle: 'Contact',
  referenceAccountTitle: 'Bind Bank',
  detailTitle: 'Company Detail',
  underwritingTitle: 'Underwriting',
  guarantorTitle: 'Guarantor',
  financialTitle: 'Financial',
  uploadDocumentTitle: 'Upload Document',
  kycTitle: 'KYC',

  amountSection: 'Maximum amount value - Minimum amount value',
  termSection: 'Maximum term value - Minimum term value',

  underwritingStatus: 'Underwriting Status',
  loanStatus: 'Loan Status',
  loanAgreementStatus: 'Loan Agreement Status',

  amount: 'Amount',
  currency: 'Currency',
  term: 'Term',
  local: 'Local',
  employ: 'Employ',

  account: 'Account',
  accountBank: 'Account Bank',

  registrationNo: 'Registration No',

  contactNRIC: 'Contact NRIC',
  mobileArea: 'Mobile Area',
  mobileNumber: 'Mobile Number',
  email: 'Email',

  name: 'Name',
  companyName: 'Company Name',
  address: 'Address',
  businessType: 'Business Type',
  contactAddress: 'Contact Address',
  businessPremiseType: 'Business Premise Type',
  businessFocused: 'Business Focused',

  primaryGuarantor: 'Primary Guarantor',
  nric: 'NRIC',
  nationality: 'Nationality',
  occupation: 'Occupation',
  industryExpYear: 'industry Exp',
  manageExpYear: 'Manage Exp',
  residenceType: 'Residence Type',
  residenceOwnership: 'Residence Ownership',

  lastestYearRevenus: 'Last Year Revenus',
  mainAccountWithOurBank: 'Main account with our bank',
  outLoanNotWithOutBank: 'Out loan not with out bank',

  documentTemplateName: 'Document Name',
  fileName: 'File Name',

  businessInBlackListArea: 'Business in blacklist area',
  businessPlanInBlackListArea: 'Business plan in blacklist area',
  businessOrPartnerSanctioned: 'BusinessO or partner sanctioned',
  relationInBlackListArea: 'Relation in blacklist area',
  repaymentSourceInBlackListArea: 'RepaymentSource in blacklist area',
  representsNeutrality: 'Represents neutrality',
  representsNeutralityShared: 'Represents neutrality shared',
  familiarWithBusiness: 'Familiar with business',

  queryDate: 'Query Date',
  channel: 'Channel',
  applyCount: 'Apply Count',
  approvalCount: 'Approval Count',

  ratio: 'Commission Ratio',
  camount: 'Commission Amount',
  loanApprovedAmount: 'Loan Approved Amount',

  applyAmount: 'Apply Amount',

  ...teacherProduct_en
}

export default {
  customerOffer_title_zh,
  customerOffer_title_en,
  customerOffer_zh,
  customerOffer_en
}
