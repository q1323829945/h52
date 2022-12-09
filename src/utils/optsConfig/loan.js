/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/optsConfig/loan.js
 * @Date         : 2022-03-18 11:14:30
 * @LastEditTime : 2022-08-16 22:06:16
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import common from './common'

// 贷款产品类型
const productTypeOpts = [
  {
    value: 'CONSUMER_LOAN',
    label: 'configType.consumer_loan'
  },
  {
    value: 'CORPORATE_LOAN',
    label: 'configType.corporate_loan'
  },
  {
    value: 'MERCHANDISING_LOAN',
    label: 'configType.merchandising_loan'
  },
  {
    value: 'MORTGAGE_LOAN',
    label: 'configType.mortgage_loan'
  },
  {
    value: 'SYNDICATED_LOAN',
    label: 'configType.syndicated_loan'
  }
]

// 贷款产品状态
const productStatusOpts = [
  {
    // 已建立
    value: 'INITIATED',
    label: 'configType.INITIATED'
  },
  // {
  //   // 已上架
  //   value: 'ANNOUNCED',
  //   label: 'configType.ANNOUNCED'
  // },
  {
    // 已发布
    value: 'SOLD',
    label: 'configType.SOLD'
  },
  {
    // 已下架
    value: 'OBSOLETE',
    label: 'configType.OBSOLETE'
  }
  // {
  //   // 已激活
  //   value: 'ACTIVE',
  //   label: 'configType.ACTIVE'
  // }
]

// 贷款时间
const productTimeOpts = [
  {
    value: 'ONE_MONTH',
    label: 'configType.one_month'
  },
  {
    value: 'THREE_MONTHS',
    label: 'configType.three_months'
  },
  {
    value: 'SIX_MONTHS',
    label: 'configType.six_months'
  },
  {
    value: 'ONE_YEAR',
    label: 'configType.one_year'
  },
  {
    value: 'TWO_YEAR',
    label: 'configType.two_year'
  },
  {
    value: 'THREE_YEAR',
    label: 'configType.three_year'
  }
]

// 还款计划类型
const interestTypeOpts = [
  {
    value: 'FIXED',
    label: 'configType.fixed'
  },
  {
    value: 'FLOATING_RATE_NOTE',
    label: 'configType.floating_rate_note'
  }
]

// 年基础计算天数
const baseYearDaysOpts = [
  {
    value: 'ACCOUNT_YEAR',
    label: 'configType.account_year'
  },
  {
    value: 'ACTUAL_YEAR',
    label: 'configType.actual_year'
  }
]

// 提前还款方式
const paymentMethodOpts = [
  // {
  //   value: 'PARTIAL_PREPAYMENT',
  //   label: 'configType.partial_prepayment'
  // },
  {
    value: 'FULL_REDEMPTION',
    label: 'configType.full_redemption'
  },
  {
    value: 'NOT_ALLOWED',
    label: 'configType.not_allowed'
  }
]

// 费用方式类型
const feeMethodTypeOpts = [
  {
    value: 'FIX_AMOUNT',
    label: 'configType.fix_amount'
  },
  {
    value: 'FEE_RATIO',
    label: 'configType.fee_ratio'
  }
]

// 费用扣除类型
const feeDeductTypeOpts = [
  {
    value: 'IMMEDIATE',
    label: 'configType.immediate'
  },
  {
    value: 'SCHEDULE',
    label: 'configType.schedule'
  }
]

// 费用类型
const feeTypeOpts = [
  {
    value: 'PREPAYMENT',
    label: 'configType.prepayment'
  },
  {
    value: 'DISBURSEMENT',
    label: 'configType.disbursement'
  },
  {
    value: 'OVERDUE',
    label: 'configType.overdue'
  }
]

// 还款日类型类型
const repaymentDayTypeOpts = [
  {
    value: 'BASE_LOAN_DAY',
    label: 'configType.base_loan_day'
  },
  {
    value: 'MONTH_FIRST_DAY',
    label: 'configType.MONTH_FIRST_DAY'
  },
  {
    value: 'MONTH_LAST_DAY',
    label: 'configType.MONTH_LAST_DAY'
  }
]

// 还款方式
const termTypeOpts = [
  {
    value: 'EQUAL_INSTALLMENT',
    label: 'configType.equal_installment'
  },
  {
    value: 'EQUAL_PRINCIPAL',
    label: 'configType.equal_principal'
  },
  {
    value: 'ONE_OFF_REPAYMENT',
    label: 'configType.one_off_repayment'
  },
  {
    value: 'PAY_INTEREST_SCHEDULE_PRINCIPAL_MATURITY',
    label: 'configType.pay_interest_schedule_principal_maturity'
  }
]

// 还款时间
const frequencyTimeOpts = [
  {
    value: 'ONE_MONTH',
    label: 'configType.repayment_one_month'
  },
  {
    value: 'THREE_MONTHS',
    label: 'configType.repayment_three_months'
  },
  {
    value: 'SIX_MONTHS',
    label: 'configType.repayment_six_months'
  },
  {
    value: 'ONE_YEAR',
    label: 'configType.repayment_twelve_months'
  }
]

// 添加产品model
const addProductModel = {
  dentificationCode: '',
  name: '',
  version: '',
  description: '',
  loanProductType: '',
  loanPurpose: '',
  businessUnit: '',
  loanUploadConfigureFeatures: [],
  documentTemplateFeatures: [],
  amountConfiguration: {
    maxValueRange: '',
    minValueRange: ''
  },
  termConfiguration: {
    maxValueRange: '',
    minValueRange: ''
  },
  interestFeature: {
    interestType: '',
    ratePlanId: '',
    baseYearDays: '',
    adjustFrequency: '',
    overdueInterestRatePercentage: ''
  },
  repaymentFeature: {
    graceDays: '',
    paymentMethod: '',
    frequency: '',
    repaymentDayType: '',
    prepaymentFeatureModality: []
  },
  feeFeatures: []
}

// 添加产品组件配置
const addProductOpts = [
  //loanProductType 产品
  {
    title: 'loanProduct.product',
    section: 'loanProductType',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'loanProductType',
        label: 'loanProduct.type',
        placeholder: 'loanProduct.type',
        list: productTypeOpts
      },
      {
        type: 'input',
        key: 'name',
        label: 'loanProduct.name',
        placeholder: 'loanProduct.name'
      },
      {
        type: 'input',
        key: 'loanPurpose',
        label: 'loanProduct.loanPurpose',
        placeholder: 'loanProduct.loanPurpose'
      }
    ]
  },
  //identificationCode 版本
  {
    title: 'loanProduct.description',
    section: 'identificationCode',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'identificationCode',
        label: 'loanProduct.identification',
        placeholder: 'loanProduct.identification'
      },
      {
        type: 'input',
        key: 'version',
        label: 'loanProduct.version',
        placeholder: 'loanProduct.version'
      },
      {
        type: 'input',
        key: 'description',
        label: 'loanProduct.description',
        placeholder: 'loanProduct.description'
      },
      {
        type: 'cascader',
        key: 'businessUnit',
        label: 'loanProduct.businessUnit',
        placeholder: 'loanProduct.businessUnit'
      }
    ]
  },
  //amountConfiguration 金额
  {
    title: 'loanProduct.amount',
    section: 'amountConfiguration',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'maxValueRange',
        label: 'loanProduct.amountMax',
        placeholder: 'loanProduct.amountMax',
        rules: {
          message: 'loanProduct.amountMaxRules'
        }
      },
      {
        type: 'input',
        key: 'minValueRange',
        label: 'loanProduct.amountMin',
        placeholder: 'loanProduct.amountMin',
        rules: {
          message: 'loanProduct.amountMinRules'
        }
      }
    ]
  },
  //termConfiguration 期限
  {
    title: 'loanProduct.term',
    section: 'termConfiguration',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'maxValueRange',
        label: 'loanProduct.termMax',
        placeholder: 'loanProduct.termMax',
        list: productTimeOpts,
        rules: {
          message: 'loanProduct.termMaxRules'
        }
      },
      {
        type: 'select',
        key: 'minValueRange',
        label: 'loanProduct.termMin',
        placeholder: 'loanProduct.termMin',
        list: productTimeOpts,
        rules: {
          message: 'loanProduct.termMinRules'
        }
      }
    ]
  },
  //interestFeature 利息
  {
    title: 'loanProduct.interest',
    section: 'interestFeature',
    span: 8,
    width: 100,
    widgets: [
      {
        type: 'select',
        key: 'interestType',
        label: 'loanProduct.interestType',
        placeholder: 'loanProduct.interestType',
        list: interestTypeOpts,
        rules: {
          message: 'loanProduct.interestTypeRules'
        }
      },
      {
        type: 'input',
        key: 'adjustFrequency',
        label: 'loanProduct.adjustFrequency',
        placeholder: 'loanProduct.adjustFrequency',
        rules: {
          message: 'loanProduct.adjustFrequencyRules'
        }
      },
      {
        type: 'input',
        key: 'overdueInterestRatePercentage',
        label: 'loanProduct.overdueInterest',
        placeholder: 'loanProduct.overdueInterest',
        rules: {
          message: 'loanProduct.overdueInterestRules'
        }
      },
      {
        type: 'select',
        key: 'baseYearDays',
        label: 'loanProduct.baseYearDays',
        placeholder: 'loanProduct.baseYearDays',
        list: baseYearDaysOpts,
        rules: {
          message: 'loanProduct.baseYearDays'
        }
      },
      {
        type: 'select',
        key: 'ratePlanId',
        label: 'loanProduct.ratePlan',
        placeholder: 'loanProduct.ratePlan',
        list: [],
        rules: {
          message: 'loanProduct.ratePlan'
        }
      }
    ]
  },
  //repaymentFeature 还款
  {
    title: 'loanProduct.repaymentFeature',
    section: 'repaymentFeature',
    span: 8,
    width: 85,
    // 提前还款
    paymentWidgets: [
      {
        type: 'select',
        key: 'paymentMethod',
        label: 'loanProduct.paymentMethod',
        placeholder: 'loanProduct.paymentMethod',
        list: termTypeOpts,
        rules: {
          message: 'loanProduct.paymentMethodRules'
        }
      },
      {
        type: 'select',
        key: 'frequency',
        label: 'loanProduct.frequency',
        placeholder: 'loanProduct.frequency',
        list: frequencyTimeOpts,
        rules: {
          message: 'loanProduct.frequencyRules'
        }
      },
      {
        type: 'select',
        key: 'repaymentDayType',
        label: 'loanProduct.repaymentDayType',
        placeholder: 'loanProduct.repaymentDayType',
        list: repaymentDayTypeOpts,
        rules: {
          message: 'loanProduct.repaymentDayTypeRules'
        }
      },
      {
        type: 'input',
        key: 'graceDays',
        label: 'loanProduct.graceDays',
        placeholder: 'loanProduct.graceDays',
        rules: {
          message: 'loanProduct.graceDaysRules'
        }
      }
    ],
    // 还款
    widgets: [
      {
        type: 'select',
        key: 'term',
        label: 'loanProduct.term',
        placeholder: 'loanProduct.term',
        list: productTimeOpts,
        rules: {
          message: 'loanProduct.termRules'
        }
      },
      {
        type: 'select',
        key: 'type',
        label: 'loanProduct.repaymentType',
        placeholder: 'loanProduct.repaymentType',
        list: paymentMethodOpts,
        rules: {
          message: 'loanProduct.typeRules'
        }
      },
      {
        type: 'input',
        key: 'penaltyRatio',
        label: 'loanProduct.penaltyRatio',
        placeholder: 'loanProduct.penaltyRatio',
        rules: {
          message: 'loanProduct.penaltyRatioRules'
        }
      }
    ]
  },
  //feeFeatures 费用
  {
    title: 'loanProduct.feeFeatures',
    section: 'feeFeatures',
    span: 8,
    feeFeatures: [],
    widgets: [
      {
        type: 'select',
        key: 'feeType',
        label: 'loanProduct.feeType',
        placeholder: 'loanProduct.feeType',
        list: feeTypeOpts,
        rules: {
          message: 'loanProduct.feeTypeRules',
          type: 'string'
        }
      },
      {
        type: 'select',
        key: 'feeDeductType',
        label: 'loanProduct.feeDeductType',
        placeholder: 'loanProduct.feeDeductType',
        list: feeDeductTypeOpts,
        rules: {
          message: 'loanProduct.feeDeductTypeRules',
          type: 'string'
        }
      },
      {
        type: 'select',
        key: 'feeMethodType',
        label: 'loanProduct.feeMethodType',
        placeholder: 'loanProduct.feeMethodType',
        list: feeMethodTypeOpts,
        rules: {
          message: 'loanProduct.feeMethodTypeRules',
          type: 'string'
        }
      }
      // {
      //   type: 'input',
      //   key: 'feeAmount',
      //   label: 'loanProduct.feeAmount',
      //   placeholder: 'loanProduct.feeAmount',
      //   rules: {
      //     message: 'loanProduct.feeAmountRules',
      //     type: 'number'
      //   }
      // },
      // {
      //   type: 'input',
      //   key: 'feeRate',
      //   label: 'loanProduct.feeRate',
      //   placeholder: 'loanProduct.feeRate',
      //   rules: {
      //     message: 'loanProduct.feeRateRules',
      //     type: 'number'
      //   }
      // }
    ]
  },
  // loanFileConfig 产品文件配置
  {
    title: 'loanProduct.loanFileConfig',
    section: 'loanFileConfig',
    span: 4,
    widgets: [
      {
        type: 'checkbox',
        key: 'loanUploadConfigureFeatures',
        label: 'loanProduct.loanFileConfig',
        // checkAll: false,
        // isIndeterminate: false,
        placeholder: 'loanProduct.loanFileConfig',
        list: [],
        rules: {
          message: 'loanProduct.loanFileConfigRules',
          type: 'string'
        }
      }
    ]
  },
  // documentTemplateFeatures 文件模板配置
  {
    title: 'loanProduct.documentTemplateFeatures',
    section: 'documentTemplateFeatures',
    span: 4,
    widgets: [
      {
        type: 'checkbox',
        key: 'documentTemplateFeatures',
        label: 'loanProduct.documentTemplateFeatures',
        placeholder: 'loanProduct.documentTemplateFeatures',
        list: [],
        rules: {
          message: 'loanProduct.documentTemplateFeaturesRules',
          type: 'string'
        }
      }
    ]
  }
]

// 修改产品组件配置
const changeProductOpts = [
  //loanProductType 产品
  {
    title: 'loanProduct.product',
    section: 'loanProductType',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'loanProductType',
        label: 'loanProduct.type',
        placeholder: 'loanProduct.type',
        list: productTypeOpts
      },
      {
        type: 'input',
        key: 'name',
        label: 'loanProduct.name',
        placeholder: 'loanProduct.name'
      },
      {
        type: 'input',
        key: 'loanPurpose',
        label: 'loanProduct.loanPurpose',
        placeholder: 'loanProduct.loanPurpose'
      }
    ]
  },
  //identificationCode 版本
  {
    title: 'loanProduct.description',
    section: 'identificationCode',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'identificationCode',
        label: 'loanProduct.identification',
        placeholder: 'loanProduct.identification'
      },
      {
        type: 'input',
        key: 'version',
        label: 'loanProduct.version',
        placeholder: 'loanProduct.version'
      },
      {
        type: 'input',
        key: 'description',
        label: 'loanProduct.description',
        placeholder: 'loanProduct.description'
      },
      {
        type: 'cascader',
        key: 'businessUnit',
        label: 'loanProduct.businessUnit',
        placeholder: 'loanProduct.businessUnit'
      }
    ]
  },
  //amountConfiguration 金额
  {
    title: 'loanProduct.amount',
    section: 'amountConfiguration',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'maxValueRange',
        label: 'loanProduct.amountMax',
        placeholder: 'loanProduct.amountMax',
        rules: {
          message: 'loanProduct.amountMaxRules'
        }
      },
      {
        type: 'input',
        key: 'minValueRange',
        label: 'loanProduct.amountMin',
        placeholder: 'loanProduct.amountMin',
        rules: {
          message: 'loanProduct.amountMinRules'
        }
      }
    ]
  },
  //termConfiguration 期限
  {
    title: 'loanProduct.term',
    section: 'termConfiguration',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'maxValueRange',
        label: 'loanProduct.termMax',
        placeholder: 'loanProduct.termMax',
        list: productTimeOpts,
        rules: {
          message: 'loanProduct.termMaxRules'
        }
      },
      {
        type: 'select',
        key: 'minValueRange',
        label: 'loanProduct.termMin',
        placeholder: 'loanProduct.termMin',
        list: productTimeOpts,
        rules: {
          message: 'loanProduct.termMinRules'
        }
      }
    ]
  },
  //interestFeature 利息
  {
    title: 'loanProduct.interest',
    section: 'interestFeature',
    span: 8,
    width: 100,
    widgets: [
      {
        type: 'select',
        key: 'interestType',
        label: 'loanProduct.interestType',
        placeholder: 'loanProduct.interestType',
        list: interestTypeOpts,
        rules: {
          message: 'loanProduct.interestTypeRules'
        }
      },
      {
        type: 'input',
        key: 'adjustFrequency',
        label: 'loanProduct.adjustFrequency',
        placeholder: 'loanProduct.adjustFrequency',
        rules: {
          message: 'loanProduct.adjustFrequencyRules'
        }
      },
      {
        type: 'input',
        key: 'overdueInterestRatePercentage',
        label: 'loanProduct.overdueInterest',
        placeholder: 'loanProduct.overdueInterest',
        rules: {
          message: 'loanProduct.overdueInterestRules'
        }
      },
      {
        type: 'select',
        key: 'baseYearDays',
        label: 'loanProduct.baseYearDays',
        placeholder: 'loanProduct.baseYearDays',
        list: baseYearDaysOpts,
        rules: {
          message: 'loanProduct.baseYearDays'
        }
      },
      {
        type: 'select',
        key: 'ratePlanId',
        label: 'loanProduct.ratePlan',
        placeholder: 'loanProduct.ratePlan',
        list: [],
        rules: {
          message: 'loanProduct.ratePlan'
        }
      }
    ]
  },
  //repaymentFeature 还款
  {
    title: 'loanProduct.repaymentFeature',
    section: 'repaymentFeature',
    span: 7,
    width: 85,
    paymentWidgets: [
      {
        type: 'select',
        key: 'paymentMethod',
        label: 'loanProduct.paymentMethod',
        placeholder: 'loanProduct.paymentMethod',
        list: termTypeOpts,
        rules: {
          message: 'loanProduct.paymentMethodRules'
        }
      },
      {
        type: 'select',
        key: 'frequency',
        label: 'loanProduct.frequency',
        placeholder: 'loanProduct.frequency',
        list: frequencyTimeOpts,
        rules: {
          message: 'loanProduct.frequencyRules'
        }
      },
      {
        type: 'select',
        key: 'repaymentDayType',
        label: 'loanProduct.repaymentDayType',
        placeholder: 'loanProduct.repaymentDayType',
        list: repaymentDayTypeOpts,
        rules: {
          message: 'loanProduct.repaymentDayTypeRules'
        }
      },
      {
        type: 'input',
        key: 'graceDays',
        label: 'loanProduct.graceDays',
        placeholder: 'loanProduct.graceDays',
        rules: {
          message: 'loanProduct.graceDaysRules'
        }
      }
    ],
    widgets: [
      {
        type: 'select',
        key: 'term',
        label: 'loanProduct.term',
        placeholder: 'loanProduct.term',
        list: productTimeOpts,
        rules: {
          message: 'loanProduct.termRules'
        }
      },
      {
        type: 'select',
        key: 'type',
        label: 'loanProduct.repaymentType',
        placeholder: 'loanProduct.repaymentType',
        list: paymentMethodOpts,
        rules: {
          message: 'loanProduct.typeRules'
        }
      },
      {
        type: 'input',
        key: 'penaltyRatio',
        label: 'loanProduct.penaltyRatio',
        placeholder: 'loanProduct.penaltyRatio',
        rules: {
          message: 'loanProduct.penaltyRatioRules'
        }
      }
    ]
  },
  //feeFeatures 费用
  {
    title: 'loanProduct.feeFeatures',
    section: 'feeFeatures',
    span: 8,
    feeFeatures: [],
    widgets: [
      {
        type: 'select',
        key: 'feeType',
        label: 'loanProduct.feeType',
        placeholder: 'loanProduct.feeType',
        list: feeTypeOpts,
        rules: {
          message: 'loanProduct.feeTypeRules',
          type: 'string'
        }
      },
      {
        type: 'select',
        key: 'feeDeductType',
        label: 'loanProduct.feeDeductType',
        placeholder: 'loanProduct.feeDeductType',
        list: feeDeductTypeOpts,
        rules: {
          message: 'loanProduct.feeDeductTypeRules',
          type: 'string'
        }
      },
      {
        type: 'select',
        key: 'feeMethodType',
        label: 'loanProduct.feeMethodType',
        placeholder: 'loanProduct.feeMethodType',
        list: feeMethodTypeOpts,
        rules: {
          message: 'loanProduct.feeMethodTypeRules',
          type: 'string'
        }
      }
      // {
      //   type: 'input',
      //   key: 'feeAmount',
      //   label: 'loanProduct.feeAmount',
      //   placeholder: 'loanProduct.feeAmount',
      //   rules: {
      //     message: 'loanProduct.feeAmountRules',
      //     type: 'number'
      //   }
      // },
      // {
      //   type: 'input',
      //   key: 'feeRate',
      //   label: 'loanProduct.feeRate',
      //   placeholder: 'loanProduct.feeRate',
      //   rules: {
      //     message: 'loanProduct.feeRateRules',
      //     type: 'number'
      //   }
      // }
    ]
  },
  // loanFileConfig 产品文件配置
  {
    title: 'loanProduct.loanFileConfig',
    section: 'loanFileConfig',
    span: 4,
    widgets: [
      {
        type: 'checkbox',
        key: 'loanUploadConfigureFeatures',
        label: 'loanProduct.loanFileConfig',
        placeholder: 'loanProduct.loanFileConfig',
        list: [],
        rules: {
          message: 'loanProduct.loanFileConfigRules',
          type: 'string'
        }
      }
    ]
  },
  // documentTemplateFeatures 文件模板配置
  {
    title: 'loanProduct.documentTemplateFeatures',
    section: 'documentTemplateFeatures',
    span: 4,
    widgets: [
      {
        type: 'checkbox',
        key: 'documentTemplateFeatures',
        label: 'loanProduct.documentTemplateFeatures',
        placeholder: 'loanProduct.documentTemplateFeatures',
        list: [],
        rules: {
          message: 'loanProduct.documentTemplateFeaturesRules',
          type: 'string'
        }
      }
    ]
  }
]

// 贷款申请model
const loanApplicationModel = {
  pdpa: null,
  product: null,
  loan: {
    amount: '',
    currency: '',
    term: '',
    local: '',
    employ: ''
  },
  company: {
    registrationNo: ''
  },
  contact: {
    contactNRIC: '',
    mobileArea: '',
    mobileNumber: '',
    email: ''
  },
  detail: {
    name: '',
    registrationNo: '',
    address: '',
    businessType: '',
    contactAddress: '',
    businessPremiseType: '',
    businessFocused: ''
  },
  guarantor: {
    primaryGuarantor: '',
    guarantors: []
  },
  financial: {
    lastestYearRevenus: '',
    mainAccountWithOurBank: '',
    outLoanNotWithOutBank: ''
  },
  uploadDocument: [],
  kyc: {
    businessInBlackListArea: '',
    businessPlanInBlackListArea: '',
    businessOrPartnerSanctioned: '',
    relationInBlackListArea: '',
    repaymentSourceInBlackListArea: '',
    representsNeutrality: '',
    representsNeutralityShared: '',
    familiarWithBusiness: ''
  }
}

// 贷款申请组件配置
const loanApplicationWidgetOpts = {
  //loan 贷款
  loan: {
    title: 'customerOffer.loanTitle',
    section: 'loan',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'amount',
        label: 'customerOffer.amount',
        placeholder: 'customerOffer.amount'
      },
      {
        type: 'select',
        key: 'currency',
        label: 'customerOffer.currency',
        placeholder: 'customerOffer.currency',
        list: common.currencyOpts,
        rules: {
          message: 'customerOffer.currency'
        }
      },
      {
        type: 'select',
        key: 'term',
        label: 'customerOffer.term',
        placeholder: 'customerOffer.term',
        list: productTimeOpts,
        rules: {
          message: 'customerOffer.term'
        }
      },
      {
        type: 'select',
        key: 'local',
        label: 'customerOffer.local',
        placeholder: 'customerOffer.local',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.local'
        }
      },
      {
        type: 'input',
        key: 'employ',
        label: 'customerOffer.employ',
        placeholder: 'customerOffer.employ'
      }
    ]
  },
  //product 贷款产品
  product: {
    title: 'customerOffer.productTitle',
    section: 'product',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'loanProduct.name',
        placeholder: 'loanProduct.name'
      },
      {
        type: 'input',
        key: 'loanPurpose',
        label: 'loanProduct.loanPurpose',
        placeholder: 'loanProduct.loanPurpose'
      },
      {
        type: 'input',
        key: 'identificationCode',
        label: 'loanProduct.identification',
        placeholder: 'loanProduct.identification'
      },
      {
        type: 'input',
        key: 'version',
        label: 'loanProduct.version',
        placeholder: 'loanProduct.version'
      },
      {
        type: 'input',
        key: 'description',
        label: 'loanProduct.description',
        placeholder: 'loanProduct.description'
      },
      {
        type: 'amountSection',
        key: 'amountSection',
        label: 'customerOffer.amountSection',
        placeholder: 'customerOffer.amountSection'
      },
      {
        type: 'termSection',
        key: 'termSection',
        label: 'customerOffer.termSection',
        placeholder: 'customerOffer.termSection'
      }
    ]
  },
  // company 公司
  company: {
    title: 'customerOffer.companyTitle',
    section: 'company',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'registrationNo',
        label: 'customerOffer.registrationNo',
        placeholder: 'customerOffer.registrationNo'
      }
    ]
  },
  // referenceAccount 绑卡信息
  referenceAccount: {
    title: 'customerOffer.referenceAccountTitle',
    section: 'referenceAccount',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'account',
        label: 'customerOffer.account',
        placeholder: 'customerOffer.account'
      },
      {
        type: 'input',
        key: 'accountBank',
        label: 'customerOffer.accountBank',
        placeholder: 'customerOffer.accountBank'
      }
    ]
  },
  // underwriting 承销管理
  underwriting: {
    title: 'customerOffer.underwritingTitle',
    section: 'underwriting',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'creditRisk',
        label: 'underwriting.creditRisk',
        placeholder: 'underwriting.creditRisk',
        rules: {
          message: 'underwriting.creditRisk'
        }
      },
      {
        type: 'input',
        key: 'customerCreditRate',
        label: 'underwriting.customerCreditRate',
        placeholder: 'underwriting.customerCreditRate',
        rules: {
          message: 'underwriting.customerCreditRate'
        }
      },
      {
        type: 'input',
        key: 'fraudEvaluation',
        label: 'underwriting.fraudEvaluation',
        placeholder: 'underwriting.fraudEvaluation',
        rules: {
          message: 'underwriting.fraudEvaluation'
        }
      },
      {
        type: 'input',
        key: 'regulatoryCompliance',
        label: 'underwriting.regulatoryCompliance',
        placeholder: 'underwriting.regulatoryCompliance',
        rules: {
          message: 'underwriting.regulatoryCompliance'
        }
      }
    ]
  },
  //detail 详情
  detail: {
    title: 'customerOffer.detailTitle',
    section: 'detail',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'customerOffer.companyName',
        placeholder: 'customerOffer.companyName',
        rules: {
          message: 'customerOffer.companyName'
        }
      },
      {
        type: 'input',
        key: 'registrationNo',
        label: 'customerOffer.registrationNo',
        placeholder: 'customerOffer.registrationNo',
        rules: {
          message: 'customerOffer.registrationNo'
        }
      },
      {
        type: 'input',
        key: 'businessType',
        label: 'customerOffer.businessType',
        placeholder: 'customerOffer.businessType',
        rules: {
          message: 'customerOffer.businessType'
        }
      },
      {
        type: 'input',
        key: 'businessFocused',
        label: 'customerOffer.businessFocused',
        placeholder: 'customerOffer.businessFocused',
        rules: {
          message: 'customerOffer.businessFocused'
        }
      },
      {
        type: 'select',
        key: 'businessPremiseType',
        label: 'customerOffer.businessPremiseType',
        placeholder: 'customerOffer.businessPremiseType',
        list: common.housingOwnershipTypeOpts,
        rules: {
          message: 'customerOffer.businessPremiseType'
        }
      },
      {
        type: 'input',
        inputType: 'textarea',
        key: 'address',
        label: 'customerOffer.address',
        placeholder: 'customerOffer.address',
        rules: {
          message: 'customerOffer.address'
        }
      },
      {
        type: 'input',
        inputType: 'textarea',
        key: 'contactAddress',
        label: 'customerOffer.contactAddress',
        placeholder: 'customerOffer.contactAddress',
        rules: {
          message: 'customerOffer.contactAddress'
        }
      }
    ]
  },
  //contact 联系人
  contact: {
    title: 'customerOffer.contactTitle',
    section: 'contact',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'contacts',
        label: 'customerOffer.name',
        placeholder: 'customerOffer.name'
      },
      {
        type: 'input',
        key: 'contactNRIC',
        label: 'customerOffer.contactNRIC',
        placeholder: 'customerOffer.contactNRIC'
      },
      {
        type: 'input',
        key: 'email',
        label: 'customerOffer.email',
        placeholder: 'customerOffer.email'
      },
      {
        type: 'input',
        key: 'mobileNumber',
        label: 'customerOffer.mobileNumber',
        placeholder: 'customerOffer.mobileNumber'
      }
    ]
  },
  //guarantor 担保人
  guarantor: {
    title: 'customerOffer.guarantorTitle',
    section: 'guarantor',
    span: 8,
    guarantorWidgets: [],
    primaryGuarantorWidgets: [
      {
        type: 'input',
        key: 'primaryGuarantorName',
        label: 'customerOffer.primaryGuarantor',
        placeholder: 'customerOffer.primaryGuarantor',
        rules: {
          message: 'customerOffer.primaryGuarantor'
        }
      }
    ],
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'customerOffer.name',
        placeholder: 'customerOffer.name',
        rules: {
          message: 'customerOffer.name'
        }
      },
      {
        type: 'select',
        key: 'nationality',
        label: 'customerOffer.nationality',
        placeholder: 'customerOffer.nationality',
        list: common.nationalityOpts,
        rules: {
          message: 'customerOffer.nationality'
        }
      },
      {
        type: 'input',
        key: 'email',
        label: 'customerOffer.email',
        placeholder: 'customerOffer.email',
        rules: {
          message: 'customerOffer.email'
        }
      },
      {
        type: 'select',
        key: 'occupation',
        label: 'customerOffer.occupation',
        placeholder: 'customerOffer.occupation',
        list: common.postOpts,
        rules: {
          message: 'customerOffer.occupation'
        }
      },
      {
        type: 'input',
        key: 'industryExpYear',
        label: 'customerOffer.industryExpYear',
        placeholder: 'customerOffer.industryExpYear',
        rules: {
          message: 'customerOffer.industryExpYear'
        }
      },
      {
        type: 'input',
        key: 'manageExpYear',
        label: 'customerOffer.manageExpYear',
        placeholder: 'customerOffer.manageExpYear',
        rules: {
          message: 'customerOffer.manageExpYear'
        }
      },
      {
        type: 'input',
        key: 'residenceType',
        label: 'customerOffer.residenceType',
        placeholder: 'customerOffer.residenceType',
        rules: {
          message: 'customerOffer.residenceType'
        }
      },
      {
        type: 'select',
        key: 'residenceOwnership',
        label: 'customerOffer.residenceOwnership',
        placeholder: 'customerOffer.residenceOwnership',
        list: common.housingOwnershipTypeOpts,
        rules: {
          message: 'customerOffer.residenceOwnership'
        }
      },
      {
        type: 'input',
        key: 'nric',
        label: 'customerOffer.nric',
        placeholder: 'customerOffer.nric',
        rules: {
          message: 'customerOffer.nric'
        }
      },
      {
        type: 'input',
        key: 'mobileNumber',
        label: 'customerOffer.mobileNumber',
        placeholder: 'customerOffer.mobileNumber',
        rules: {
          message: 'customerOffer.mobileNumber'
        }
      }
    ]
  },
  //financial 财务
  financial: {
    title: 'customerOffer.financialTitle',
    section: 'financial',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'mainAccountWithOurBank',
        label: 'customerOffer.mainAccountWithOurBank',
        placeholder: 'customerOffer.mainAccountWithOurBank',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.mainAccountWithOurBank'
        }
      },
      {
        type: 'select',
        key: 'outLoanNotWithOutBank',
        label: 'customerOffer.outLoanNotWithOutBank',
        placeholder: 'customerOffer.outLoanNotWithOutBank',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.outLoanNotWithOutBank'
        }
      },
      {
        type: 'input',
        key: 'lastestYearRevenus',
        label: 'customerOffer.lastestYearRevenus',
        placeholder: 'customerOffer.lastestYearRevenus',
        rules: {
          message: 'customerOffer.lastestYearRevenus'
        }
      }
    ]
  },
  //uploadDocument 上传的文档
  uploadDocument: {
    title: 'customerOffer.uploadDocumentTitle',
    section: 'uploadDocument',
    span: 7,
    uploadDocumentWidgets: [],
    widgets: [
      {
        type: 'input',
        key: 'documentTemplateName',
        label: 'customerOffer.documentTemplateName',
        placeholder: 'customerOffer.documentTemplateName',
        rules: {
          message: 'customerOffer.documentTemplateName'
        }
      },
      {
        type: 'input',
        key: 'fileName',
        label: 'customerOffer.fileName',
        placeholder: 'customerOffer.fileName',
        rules: {
          message: 'customerOffer.fileName'
        }
      }
    ]
  },
  // kyc kyc
  kyc: {
    title: 'customerOffer.kycTitle',
    section: 'kyc',
    span: 4,
    widgets: [
      {
        type: 'select',
        key: 'businessInBlackListArea',
        label: 'customerOffer.businessInBlackListArea',
        placeholder: 'customerOffer.businessInBlackListArea',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.businessInBlackListArea'
        }
      },
      {
        type: 'select',
        key: 'businessPlanInBlackListArea',
        label: 'customerOffer.businessPlanInBlackListArea',
        placeholder: 'customerOffer.businessPlanInBlackListArea',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.businessPlanInBlackListArea'
        }
      },
      {
        type: 'select',
        key: 'businessOrPartnerSanctioned',
        label: 'customerOffer.businessOrPartnerSanctioned',
        placeholder: 'customerOffer.businessOrPartnerSanctioned',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.businessOrPartnerSanctioned'
        }
      },
      {
        type: 'select',
        key: 'relationInBlackListArea',
        label: 'customerOffer.relationInBlackListArea',
        placeholder: 'customerOffer.relationInBlackListArea',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.relationInBlackListArea'
        }
      },
      {
        type: 'select',
        key: 'repaymentSourceInBlackListArea',
        label: 'customerOffer.repaymentSourceInBlackListArea',
        placeholder: 'customerOffer.repaymentSourceInBlackListArea',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.repaymentSourceInBlackListArea'
        }
      },
      {
        type: 'select',
        key: 'representsNeutrality',
        label: 'customerOffer.representsNeutrality',
        placeholder: 'customerOffer.representsNeutrality',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.representsNeutrality'
        }
      },
      {
        type: 'select',
        key: 'representsNeutralityShared',
        label: 'customerOffer.representsNeutralityShared',
        placeholder: 'customerOffer.representsNeutralityShared',
        list: common.whetherOpts,
        rules: {
          message: 'customerOffer.representsNeutralityShared'
        }
      },
      {
        type: 'select',
        key: 'familiarWithBusiness',
        label: 'customerOffer.familiarWithBusiness',
        placeholder: 'customerOffer.familiarWithBusiness',
        list: common.businessScopeOpts,
        rules: {
          message: 'customerOffer.familiarWithBusiness'
        }
      }
    ]
  }
}

export default {
  productTypeOpts,
  productStatusOpts,
  productTimeOpts,
  interestTypeOpts,
  baseYearDaysOpts,
  paymentMethodOpts,
  feeMethodTypeOpts,
  feeDeductTypeOpts,
  feeTypeOpts,
  repaymentDayTypeOpts,
  termTypeOpts,
  frequencyTimeOpts,
  addProductOpts,
  addProductModel,
  changeProductOpts,
  loanApplicationModel,
  loanApplicationWidgetOpts
}
