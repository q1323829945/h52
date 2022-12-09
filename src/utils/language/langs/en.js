/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/utils/language/langs/en.js
 * @Date         : 2022-02-21 17:00:07
 * @LastEditTime : 2022-12-05 11:34:06
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import enLocale from 'element-ui/lib/locale/lang/en'
import loginI18n from '@/views/login/optsConfig/login-i18n'
import dashboardI18n from '@/views/admin/dashboard/optsConfig/dashboard-i18n'
import loani18n from '@/views/admin/loan/optsConfig/loan-i18n'
import homeI18n from '@/views/admin/home/optsConfig/home-i18n'
import invoiceI18n from '@/views/admin/invoice/optsConfig/invoice-i18n'
import usersI18n from '@/views/admin/user/optsConfig/users-i18n'
import documentI18n from '@/views/admin/document/optsConfig/document-i18n'
import loanAgreementI18n from '@/views/admin/loan/optsConfig/loanAgreement-i18n'
import customerOfferI18n from '@/views/admin/customerOffer/optsConfig/customerOffer-i18n'
import questionnaireI18n from '@/views/admin/questionnaire/optsConfig/questionnaire-i18n'
import ratePlanI18n from '@/views/admin/ratePlan/optsConfig/ratePlan-i18n'
import channelI18n from '@/views/admin/channel/optsConfig/channel-i18n'
import permissionI18n from '@/views/admin/permissions/optsConfig/permission-i18n'
import roleI18n from '@/views/admin/role/optsConfig/role-i18n'
import applyI18n from '@/views/admin/apply/loan/optsConfig/apply-i18n'
import positionI18n from '@/views/admin/position/optsConfig/position-i18n'
import statisticsI18n from '@/views/admin/statistics/optsConfig/statistics-i18n'
import pdpaI18n from '@/views/admin/pdpa/optsConfig/pdpa-i18n'
import workflowI18n from '@/views/admin/workflowConfig/optsConfig/workflow-i18n'

const en = {
  // 页面title
  routerMeta: {
    resultTitle: 'Result',
    ...loginI18n.login_title_en,
    ...homeI18n.home_title_en,
    ...invoiceI18n.invoice_title_en,
    ...loani18n.loan_title_en,
    ...usersI18n.users_title_en,
    ...documentI18n.document_title_en,
    ...loanAgreementI18n.loanAgreement_title_en,
    ...customerOfferI18n.customerOffer_title_en,
    ...questionnaireI18n.title_en,
    ...ratePlanI18n.ratePlan_title_en,
    ...channelI18n.channel_title_en,
    ...permissionI18n.permission_title_en,
    ...roleI18n.role_title_en,
    ...applyI18n.apply_title_en,
    ...positionI18n.position_title_en,
    ...statisticsI18n.statistics_Title_en,
    ...pdpaI18n.pdpa_title_en,
    ...workflowI18n.workflow_title_en
  },
  // 主页
  dashboard: { ...dashboardI18n.dashboard_en },
  //菜单
  menuTree: {
    home: 'Home',

    sys: 'Sys',
    permission: 'Permission',
    role: 'Role',
    users: 'Users',

    business: 'Business',
    ratePlan: 'Rate Plan',
    document: 'Document',
    loanProduct: 'Loan Product',
    loanFileUploadConfig: 'File Upload Config',

    riskControl: 'Risk Control Rule',

    customer: 'Customer Info',

    organisation: 'Organisation Info',
    employee: 'Employee',

    customerOfferConfig: 'Loan Application',

    underwriting: 'Underwriting',

    loanAgreement: 'Loan Agreement',

    enterpriseConfig: 'Enterprise',

    loanConfig: 'Business Handling',

    invoiceInfo: 'Repayment Info',

    // pdpaConfig: 'Pdpa Config',
    // pdpaAuthorizationConfig: 'Pdpa Authorization',

    businessQuery: 'Business Query',
    loanQuery: 'Loan Query',

    questionnaire: 'Questionnaire',

    channelStatistical: 'Channel Statistical',

    ...channelI18n.channel_MenuTree_en,

    ...applyI18n.apply_menu_tree_en,
    ...positionI18n.position_menu_tree_en,
    ...statisticsI18n.statistics_Menu_Tree_en,
    ...pdpaI18n.pdpa_menu_tree_title_en,
    ...workflowI18n.workflow_menu_tree_title_en
  },
  //登录
  login: { ...loginI18n.login_en },
  // home
  home: { ...homeI18n.home_en },
  // 还款
  repayment: { ...invoiceI18n.invoice_en },
  // 贷款产品
  loanProduct: { ...loani18n.loan_en },
  // 用户管理页
  users: { ...usersI18n.users_en },
  loan: {
    addialogTitle: 'New Config'
  },
  // 文件管理页
  document: { ...documentI18n.document_en },
  // 贷款协议
  loanAgreementConfig: { ...loanAgreementI18n.loanAgreement_en },
  // 贷款申请
  customerOffer: { ...customerOfferI18n.customerOffer_en },
  // 问卷调查
  questionnaire: { ...questionnaireI18n.content_en },
  // 还款计划
  ratePlan: { ...ratePlanI18n.ratePlan_en },
  // 渠道
  channel: { ...channelI18n.channel_en },
  // 权限管理
  permission: { ...permissionI18n.permission_en },
  // 角色管理
  role: { ...roleI18n.role_en },
  // 岗位
  position: { ...positionI18n.position_en },
  // 数据统计
  statisticsI18n: { ...statisticsI18n.statistics_en },
  // pdpa
  pdpa: { ...pdpaI18n.pdpa_en },
  // workFlowConfig
  workFlowConfig: { ...workflowI18n.event_en },
  // 引导步骤
  guideStep: {
    guideTitle1: 'First Step',
    guideDesc1: 'Adding Channel Information',

    guideTitle2: 'Second Step',
    guideDesc2: 'Save Channel Information',

    guideTitle3: 'Third Step',
    guideDesc3: 'Adding An Interest Rate Plan',

    guideTitle4: 'Fourth Step',
    guideDesc4: 'Adding Loan Produc',

    guideTitle5: 'Fifth step',
    guideDesc5: 'Save Loan Product'
  },
  // 按钮
  button: {
    add: 'Add',
    reset: 'Reset',
    query: 'Query',
    export: 'Export',
    import: 'Import',
    sort: 'Sort',
    logout: 'Logout',
    modification: 'Modify',
    cancel: 'Cancel',
    cancelNoBlank: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    change: 'Modify',
    download: 'Download',
    look: 'Look',
    save: 'Save',
    edit: 'Edit',
    rateMaintain: 'Rate Maintain',
    changeStatus: 'Modify Status',
    detail: 'Detail',
    selectFile: 'Select File',
    history: 'History',
    historyBill: 'History Bill',
    checkAll: 'Check All',
    riskControlReport: 'Risk Control Report',
    changePaid: 'Change to paid',
    editUnderwriting: 'Edit Underwriting',
    changeUnderwritingStatus: 'Change Underwriting Status',
    changeLoanAgreementStatus: 'Change Loan Agreement Status',
    changeInvoiceStatus: 'Invoice Register'
  },
  // 选择器
  select: { place: 'Please select' },
  // 输入框
  input: {
    customerName: 'Customer name',
    mobileNumber: 'Mobile number'
  },
  // 通用table
  common: { number: 'Number' },
  // 通用弹窗
  commonDialog: {
    tips: 'Tips',
    cancel: 'Cancel',
    confirm: 'Confirm',
    logAgain: 'Please log in again',
    registerSucceed: 'Register succeed',
    registerFailed: 'Register failed',
    deleteTips: 'IsDelete',
    returnConfirm: 'Return confirm',
    success: 'Success',
    keepAtLeastOne: 'Keep at least one',
    riskControlFormMessage: 'Risk control information is incomplete',
    productFormMessage: 'The product information is incomplete',
    loanConfigNotAddMessage: 'The loan file configuration is not added',
    documentTemplateNotAddMessage: 'The document template configuration is not added',
    organizationFormMessage: 'The organization information is incomplete',
    personFormMessage: 'The person information is incomplete',
    selectFileMessage: 'Please select file',
    noData: 'No Data',
    digitsAndEnglish: 'Only digits and English can be entered',

    charactersLong: 'characters long',
    mustBeAtLeast: 'Must be at least',

    selectAqueryRule: 'Select a query rule'
  },
  // 枚举配置
  configType: {
    // 贷款申请状态
    record: 'Record',
    submit: 'Submit',
    pending: 'Pending',
    approvaled: 'Approvaled',
    loan: 'Loan',
    pass: 'Approval',
    reject: 'Reject',
    rejected: 'Rejected',
    finish: 'Finish',
    processing: 'Processing',

    //利率计划类型
    standard: 'Standard',
    customer: 'Customer',

    //贷款产品类型
    consumer_loan: 'CONSUMER_LOAN',
    corporate_loan: 'CORPORATE_LOAN ',
    merchandising_loan: 'MERCHANDISING_LOAN ',
    mortgage_loan: 'MORTGAGE_LOAN ',
    syndicated_loan: 'SYNDICATED_LOAN',

    //贷款期限类型
    one_month: 'One Month',
    three_months: 'Three Months',
    six_months: 'Six Months',
    one_year: 'One Year',
    two_year: 'Two Year',
    three_year: 'Three Year',

    //利息类型
    fixed: 'Fixed',
    floating_rate_note: 'Floating Rate Note',

    //年基础计算天数
    account_year: 'ACCOUNT_YEAR',
    actual_year: 'ACTUAL_YEAR',

    //还款方式类型
    equal_installment: 'EQUAL_INSTALLMENT',
    equal_principal: 'EQUAL_PRINCIPAL',
    one_off_repayment: ' ONE_OFF_REPAYMENT',
    pay_interest_schedule_principal_maturity: 'PAY_INTEREST_SCHEDULE_PRINCIPAL_MATURITY',

    //还款频率
    repayment_one_month: 'One Month',
    repayment_three_months: 'Three Months',
    repayment_six_months: 'Six Months',
    repayment_twelve_months: 'Twelve Months',

    //还款日类型
    base_loan_day: 'BASE_LOAN_DAY',
    MONTH_FIRST_DAY: 'MONTH_FIRST_DAY',
    MONTH_LAST_DAY: 'MONTH_LAST_DAY',

    //提前还款类型
    partial_prepayment: 'PARTIAL_PREPAYMENT',
    full_redemption: 'FULL_REDEMPTION',
    not_allowed: 'NOT_ALLOWED',

    //费用方式类型
    fix_amount: 'FIX_AMOUNT',
    fee_ratio: 'FEE_RATIO',

    //费用扣除类型
    immediate: 'IMMEDIATE',
    schedule: 'SCHEDULE',

    // 费用类型
    prepayment: 'PREPAYMENT',
    disbursement: 'DISBURSEMENT',
    overdue: 'OVERDUE',

    //贷款产品状态
    INITIATED: 'INITIATED',
    ANNOUNCED: 'ANNOUNCED',
    SOLD: 'SOLD',
    OBSOLETE: 'OBSOLETE',
    ACTIVE: 'ACTIVE',

    //语言类型（LanguageType）
    english: 'English',
    chinese: 'Chinese',
    philippines: 'Philippines',

    //documentType
    document_title: 'title',
    document_share: 'SHARE',
    document_contract: 'CONTRACT',
    document_certificate: 'CERTIFICATE',

    //是否
    yes: 'Yes',
    no: 'No',

    //ruleTypeOpts
    personal: 'PERSONAL',
    business: 'BUSINESS',

    //dataitem
    credit_risk: 'CREDIT_RISK',
    customer_credit_rate: 'CUSTOMER_CREDIT_RATE',
    fraud_evaluation: 'FRAUD_EVALUATION',
    regulatory_compliance: 'REGULATORY_COMPLIANCE',

    // 国籍
    CHN: 'China Mainland',
    HKG: 'China Hong kong',
    MAC: 'China Macao',
    TWN: 'China Taiwan',
    SGP: 'Singapore',
    THA: 'Thailand',
    IND: 'India',
    JPN: 'Japan',
    KOR: 'Korea',
    USA: 'United States',
    GBR: 'Great Britain',
    FRA: 'France',
    DEU: 'Germany',
    IDN: 'Indonesia',
    MYS: 'Malaysia',

    // 证件类型
    social_security_number: 'SOCIAL_SECURITY_NUMBER',
    drivers_license_number: 'DRIVERS_LICENSE_NUMBER',
    passport_number: 'PASSPORT_NUMBER',
    identity_card_number: 'IDENTITY_CARD_NUMBER',
    employer_identification_number: 'EMPLOYER_IDENTIFICATION_NUMBER',

    personRolesInner: 'INNER',
    personRolesOuter: 'OUTER',

    // 居民身份
    non_permanent: 'NON_PERMANENT',
    permanent: 'PERMANENT',

    //组织识别码类型
    LEI: 'LEI',
    ELF: 'ELF',
    MIC: 'MIC',
    BICFI: 'BICFI',
    DUNS: 'DUNS',

    // 组织结构
    SHAREHOLDER: 'SHAREHOLDER',
    EXECUTIVE_OFFICER: 'EXECUTIVE_OFFICER',
    REGISTRATION_AUTHORITY: 'REGISTRATION_AUTHORITY',

    MICRO_LOAN: 'MICRO_LOAN',

    // 货币
    CNY: 'Chinese Yuan',
    USD: 'United States Dollar',

    // 房屋所有
    OWNED: 'OWNED',
    SERVICING_MORTAGE: 'SERVICING_MORTAGE',
    RENTED: 'RENTED',

    occupation1: 'Manager',

    // 企业业务范围类型
    businessScope1: 'Chemical wholesaler',
    businessScope2: 'Defense related business',
    businessScope3: 'Embassies, consulates and High Commission clients',
    businessScope4: 'Energy and metal extraction',
    businessScope5: 'A financial institution engaged in wholesale bank note business',
    businessScope6: 'Licensed casinos, gaming enterprises and licensed casino intermediaries',
    businessScope7: 'Licensed money lender',
    businessScope8: 'Money changers and money transfer agents',
    businessScope9: 'Oil and gas (including refueling)',
    businessScope10: 'Payment service provider',
    businessScope11: 'Physical transportation of goods',
    businessScope12: 'Pure private bank',
    businessScope13: 'Shipping, Marine or ship charter (including refuelling)',
    businessScope14: 'A special purpose entity that has no core business or underlying business transaction',

    // 协议状态
    OFFERED: 'OFFERED',
    SIGNED: 'SIGNED',
    PAID: 'PAID',
    COMPLETED: 'COMPLETED',
    TERMINATED: 'TERMINATED',

    // 协议类型
    CUSTOMER: 'CUSTOMER',
    SUPPLIER: 'SUPPLIER',
    PRODUCT_BROKER: 'PRODUCT_BROKER',
    PRODUCT_SALE: 'PRODUCT_SALE',
    FIDUCIARY: 'FIDUCIARY',
    COMMISSION_SALE: 'COMMISSION_SALE',
    SERVICING_MANDATE: 'SERVICING_MANDATE',
    CHANNEL_ACCESS: 'CHANNEL_ACCESS',

    INITIATE: 'INITIATE',
    ACCOUNTED: 'ACCOUNTED',
    FINISHED: 'FINISHED',

    UNDO: 'UNDO',
    OPEN: 'OPEN',
    CLEAR: 'CLEAR',
    OVERDUE: 'OVERDUE',

    PRINCIPAL: 'PRINCIPAL',
    INTEREST: 'INTEREST',
    FEE: 'FEE',
    PENALTY_INTEREST: 'PENALTY_INTEREST',

    LOAN: 'LOAN',

    repaymentFULFILLED: 'FULFILLED',
    repaymentFAILED: 'FAILED',
    repaymentIN_PROGRESS: 'IN_PROGRESS',
    repaymentION_HOLD: 'ION_HOLD',
    repaymentPREPARED: 'PREPARED',
    repaymentREQUEST: 'REQUEST',
    repaymentFinish: 'Finish',
    repaymentCancel: 'Cancel'
  },
  //日期
  date: {
    year: 'year',
    date: 'Date',
    days: 'days',
    to: 'to',
    startPlaceholde: 'Start date',
    endPlaceholder: 'end date',
    selectDate: 'Select date',
    startYear: 'Start',
    endYear: 'end'
  },
  loading: {
    change: 'Changing...',
    add: 'Adding...',
    upload: 'Uploading...',
    download: 'Downloading...',
    delete: 'Deleteing...'
  },
  ...enLocale
}
export default en
