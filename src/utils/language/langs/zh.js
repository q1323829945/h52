/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/language/langs/zh.js
 * @Date         : 2022-02-21 17:00:15
 * @LastEditTime : 2022-11-10 11:24:05
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import cnLocale from 'element-ui/lib/locale/lang/zh-CN'
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

const zh = {
  // 页面title
  routerMeta: {
    resultTitle: '结果',
    ...loginI18n.login_title_zh,
    ...homeI18n.home_title_zh,
    ...invoiceI18n.invoice_title_zh,
    ...loani18n.loan_title_zh,
    ...usersI18n.users_title_zh,
    ...documentI18n.document_title_zh,
    ...loanAgreementI18n.loanAgreement_title_zh,
    ...customerOfferI18n.customerOffer_title_zh,
    ...questionnaireI18n.title_zh,
    ...ratePlanI18n.ratePlan_title_zh,
    ...channelI18n.channel_title_zh,
    ...permissionI18n.permission_title_zh,
    ...roleI18n.role_title_zh,
    ...applyI18n.apply_title_zh,
    ...positionI18n.position_title_zh,
    ...statisticsI18n.statistics_Title_zh,
    ...pdpaI18n.pdpa_title_zh,
    ...workflowI18n.workflow_title_zh
  },
  dashboard: { ...dashboardI18n.dashboard_zh },
  //菜单
  menuTree: {
    home: '首页',

    sys: '系统配置',
    permission: '权限管理',
    role: '角色管理',
    users: '用户管理',

    business: '业务配置',
    ratePlan: '利率计划',
    document: '文件管理',
    loanProduct: '贷款产品',
    loanFileUploadConfig: '申请贷款文件配置',

    riskControl: '决策规则',

    customer: '客户信息',

    organisation: '机构信息',
    employee: '员工信息',

    customerOfferConfig: '贷款申请',

    underwriting: '承销管理',

    loanAgreement: '贷款协议',

    enterpriseConfig: '企业配置',

    loanConfig: '业务办理',

    invoiceInfo: '还款信息',

    pdpaConfig: 'Pdpa配置',
    pdpaAuthorizationConfig: 'Pdpa权限',

    businessQuery: '业务查询',
    loanQuery: '贷款查询',

    questionnaire: '问卷调查',

    channelStatistical: '渠道统计',

    ...channelI18n.channel_MenuTree_zh,

    ...applyI18n.apply_menu_tree_zh,
    ...positionI18n.position_menu_tree_zh,
    ...statisticsI18n.statistics_Menu_Tree_zh,
    ...pdpaI18n.pdpa_menu_tree_title_zh,
    ...workflowI18n.workflow_menu_tree_title_zh
  },
  //登录
  login: { ...loginI18n.login_zh },
  // home
  home: { ...homeI18n.home_zh },
  // 还款
  repayment: { ...invoiceI18n.invoice_zh },
  // 贷款产品
  loanProduct: { ...loani18n.loan_zh },
  // 用户管理页
  users: { ...usersI18n.users_zh },
  loan: { addialogTitle: '新增配置' },
  // 文件管理页
  document: { ...documentI18n.document_zh },
  // 贷款协议
  loanAgreementConfig: { ...loanAgreementI18n.loanAgreement_zh },
  // 贷款申请
  customerOffer: { ...customerOfferI18n.customerOffer_zh },
  // 问卷调查
  questionnaire: { ...questionnaireI18n.content_zh },
  // 还款计划
  ratePlan: { ...ratePlanI18n.ratePlan_zh },
  // 渠道
  channel: { ...channelI18n.channel_zh },
  // 权限管理
  permission: { ...permissionI18n.permission_zh },
  // 角色管理
  role: { ...roleI18n.role_zh },
  // 岗位
  position: { ...positionI18n.position_zh },
  // 数据统计
  statisticsI18n: { ...statisticsI18n.statistics_zh },
  // pdpa
  pdpa: { ...pdpaI18n.pdpa_zh },
  // workFlowConfig
  workFlowConfig: { ...workflowI18n.event_zh },
  // 引导步骤
  guideStep: {
    guideTitle1: '第一步',
    guideDesc1: '添加渠道信息',

    guideTitle2: '第二步',
    guideDesc2: '保存渠道信息',

    guideTitle3: '第三步',
    guideDesc3: '添加利率计划',

    guideTitle4: '第四步',
    guideDesc4: '添加贷款产品',

    guideTitle5: '第五步',
    guideDesc5: '保存贷款产品'
  },
  // 按钮
  button: {
    reset: '重置',
    query: '查询',
    export: '导出',
    import: '导入',
    logout: '退出登录',
    modification: '修改',
    cancel: '取消',
    cancelNoBlank: '取消',
    sort: '排序',
    confirm: '确定',
    add: '新增',
    delete: '删除',
    change: '修改',
    download: '下载',
    look: '查看',
    save: '保存',
    edit: '编辑',
    rateMaintain: '利率维护',
    changeStatus: '修改状态',
    detail: '详情',
    selectFile: '选择文件',
    history: '历史版本',
    historyBill: '历史账单',
    checkAll: '全选',
    riskControlReport: '查看风控报告',
    changePaid: '修改为已支付',
    editUnderwriting: '编辑承销',
    changeUnderwritingStatus: '修改承销状态',
    changeLoanAgreementStatus: '修改协议状态',
    changeInvoiceStatus: '还款状态'
  },
  // 通用选择器
  select: {
    place: '请选择'
  },
  // 输入框
  input: {
    customerName: '客户姓名',
    mobileNumber: '手机号'
  },
  // 通用table
  common: { number: '序号' },
  // 通用弹窗
  commonDialog: {
    tips: '温馨提示',
    cancel: '取 消',
    confirm: '确 定',
    logAgain: '请重新登录',
    registerSucceed: '注册成功',
    registerFailed: '注册失败',
    deleteTips: '是否删除',
    returnConfirm: '确定删除',
    success: '成功',
    keepAtLeastOne: '最少保留一个',
    riskControlFormMessage: '风控信息未填写完整',
    productFormMessage: '产品信息未填写完整',
    loanConfigNotAddMessage: '未添加贷款文件配置',
    documentTemplateNotAddMessage: '未添加贷款模板配置',
    organizationFormMessage: '企业信息未填写完整',
    personFormMessage: '个人信息未填写完整',
    selectFileMessage: '请选择文件',
    noData: '暂无数据',
    digitsAndEnglish: '只能输入数字+英文组合',

    charactersLong: '个字符',
    mustBeAtLeast: '至少输入',

    selectAqueryRule: '请选择查询规则'
  },
  // 枚举配置
  configType: {
    // 贷款申请状态
    record: '记录',
    submit: '提交',
    pending: '待处理',
    approvaled: '批准',
    loan: '贷款',
    pass: '已审批',
    reject: '拒绝',
    rejected: '拒绝',
    finish: '完成',
    processing: '处理中',
    //利率计划类型
    standard: '标准利率',
    customer: '自定义利率',

    //贷款产品类型
    consumer_loan: '消费贷款',
    corporate_loan: '公司贷款 ',
    merchandising_loan: '商品贷款 ',
    mortgage_loan: '抵押贷款 ',
    syndicated_loan: '组合贷款',

    //贷款期限类型
    one_month: '一个月',
    three_months: '三个月',
    six_months: '六个月 ',
    one_year: '一年 ',
    two_year: '两年 ',
    three_year: '三年',

    //利息类型
    fixed: '固定利息',
    floating_rate_note: '浮动利息',

    //年基础计算天数
    account_year: '会计天数360',
    actual_year: '实际天数365',

    //还款方式类型
    equal_installment: '等额本息',
    equal_principal: '等额本金',
    one_off_repayment: ' 到期还本还息',
    pay_interest_schedule_principal_maturity: '按期付息到期还款',

    //还款频率
    repayment_one_month: '按月',
    repayment_three_months: '按三个月',
    repayment_six_months: '按六个月',
    repayment_twelve_months: '按年',

    //还款日类型
    base_loan_day: '放款日',
    MONTH_FIRST_DAY: '月初还款',
    MONTH_LAST_DAY: '月末还款',

    //提前还款类型
    partial_prepayment: '部分提前还款',
    full_redemption: '提前结清',
    not_allowed: '不允许提前还款',

    //费用方式类型
    fix_amount: '固定金额',
    fee_ratio: '按比例',

    //费用扣除类型
    immediate: '立即扣除',
    schedule: '按计划扣除',

    // 费用类型
    prepayment: '预付款费用',
    disbursement: '支付费用',
    overdue: '逾期费用',

    //贷款产品状态
    INITIATED: '已建立',
    ANNOUNCED: '已上架',
    SOLD: '已发布',
    OBSOLETE: '已下架',
    ACTIVE: '已激活',

    //语言类型（LanguageType）
    english: '英文',
    chinese: '中文',
    philippines: '菲律宾',

    //documentType
    document_title: '凭证',
    document_share: '股份',
    document_contract: '合同',
    document_certificate: '证书',

    //是否
    yes: '是',
    no: '否',

    //ruleTypeOpts
    personal: '个人',
    business: '企业',

    //dataitem
    credit_risk: '信贷风险',
    customer_credit_rate: '客户信用率',
    fraud_evaluation: '风险评估',
    regulatory_compliance: '执行标准',

    // 国籍
    CHN: '中国大陆',
    HKG: '中国香港',
    MAC: '中国澳门',
    TWN: '中国台湾',
    SGP: '新加坡',
    THA: '泰国',
    IND: '印度',
    JPN: '日本',
    KOR: '韩国',
    USA: '美国',
    GBR: '英国',
    FRA: '法国',
    DEU: '德国',
    IDN: '印度尼西亚',
    MYS: '马来西亚',

    // 证件类型
    social_security_number: '社保号码',
    drivers_license_number: '驾照号码',
    passport_number: '护照号码',
    identity_card_number: '身份证号码',
    employer_identification_number: '雇主身份识别号码',

    personRolesInner: '内部',
    personRolesOuter: '外部',

    // 居民身份
    non_permanent: '临时',
    permanent: '永久',

    //组织识别码类型
    LEI: '全球法人机构识别编码',
    ELF: 'ELF',
    MIC: 'MIC',
    BICFI: 'BICFI',
    DUNS: '邓白氏编码',

    // 组织结构
    SHAREHOLDER: '股份',
    EXECUTIVE_OFFICER: '执行官',
    REGISTRATION_AUTHORITY: '注册机构',

    // 贷款类型
    MICRO_LOAN: '小微贷款',
    // 货币
    CNY: '人民币',
    USD: '美元',

    // 房屋所有
    OWNED: '完全拥有',
    SERVICING_MORTAGE: '拥有抵押贷款中',
    RENTED: '租赁',

    occupation1: '管理者',

    // 企业业务范围类型
    businessScope1: '化学物质批发商',
    businessScope2: '国防相关业务',
    businessScope3: '大使馆、领事馆和高级专员公署客户',
    businessScope4: '能源和金属采掘业',
    businessScope5: '从事批发银行券业务的金融机构',
    businessScope6: '持牌赌场、博彩企业和持牌赌场中介',
    businessScope7: '持牌放债人',
    businessScope8: '货币兑换商和汇款代理商',
    businessScope9: '石油和天然气(包括加油)',
    businessScope10: '支付服务提供商',
    businessScope11: '商品的实物运输',
    businessScope12: '纯私人银行',
    businessScope13: '航运、海运或船舶租赁(包括加油)',
    businessScope14: '没有核心经营业务或基础业务交易的特殊目的实体',

    OFFERED: '已提供',
    SIGNED: '已签署',
    PAID: '已放款',
    COMPLETED: '已完成',
    TERMINATED: '已结束',

    INITIATE: '初始化',
    ACCOUNTED: '已出账单',
    FINISHED: '已结束账单',

    UNDO: '未还',
    OPEN: '还款中',
    CLEAR: '已还清',
    OVERDUE: '已逾期',

    PRINCIPAL: '本金',
    INTEREST: '利息',
    FEE: '费用',
    PENALTY_INTEREST: '罚息',

    LOAN: '贷款',

    repaymentFULFILLED: '完成',
    repaymentFAILED: '失败',
    repaymentIN_PROGRESS: '进行中',
    repaymentION_HOLD: '挂起',
    repaymentPREPARED: '初始化',
    repaymentREQUEST: '请求中',
    repaymentFinish: '已完成',
    repaymentCancel: '已取消'
  },
  //日期
  date: {
    year: '年',
    date: '日期',
    days: '天',
    to: '至',
    startPlaceholde: '开始日期',
    endPlaceholder: '结束日期',
    selectDate: '选择日期',
    startYear: '开始',
    endYear: '结束'
  },
  loading: {
    change: '正在修改...',
    add: '正在添加...',
    upload: '正在上传...',
    download: '正在下载...',
    delete: '正在删除...'
  },
  ...cnLocale
}
export default zh
