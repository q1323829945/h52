/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/loan/optsConfig/loanConfig.js
 * @Date         : 2022-08-11 14:21:59
 * @LastEditTime : 2022-12-02 16:28:01
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

// import utils from '@/utils'

const productTypeOpts = [
  { label: 'loanProduct.CARLOAN', value: 'CARLOAN' },
  { label: 'loanProduct.NEW_CLIENT', value: 'NEW_CLIENT' },
  { label: 'loanProduct.CLIENT', value: 'CLIENT' },
  { label: 'loanProduct.TEACHER', value: 'TEACHER' },
  { label: 'loanProduct.CORPORATE', value: 'CORPORATE' },
  { label: 'loanProduct.KABUHAYAN', value: 'KABUHAYAN' }
]

// 添加产品model
const productModel = {
  name: '',
  productType: '', //枚举 NEW_CLIENT CLIENT TEACHER KABUHAYAN CORPORATE
  ratePlanId: '',
  // interestFeature: {
  //   //这个还是先用以前的
  //   interestType: '',
  //   ratePlanId: '',
  //   baseYearDays: '',
  //   adjustFrequency: '',
  //   overdueInterestRatePercentage: ''
  // },
  questionnaires: []
}

// 修改产品组件配置
const productWidgetOpts = [
  //loanProductType 产品
  {
    title: 'loanProduct.product',
    section: 'loanProductType',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'loanProduct.name',
        placeholder: 'loanProduct.name'
      },
      {
        type: 'select',
        key: 'productType',
        label: 'loanProduct.type',
        placeholder: 'loanProduct.type',
        list: productTypeOpts
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
      // {
      //   type: 'select',
      //   key: 'interestType',
      //   label: 'loanProduct.interestType',
      //   placeholder: 'loanProduct.interestType',
      //   list: utils.loan.interestTypeOpts,
      //   rules: {
      //     message: 'loanProduct.interestTypeRules'
      //   }
      // },
      // {
      //   type: 'input',
      //   key: 'adjustFrequency',
      //   label: 'loanProduct.adjustFrequency',
      //   placeholder: 'loanProduct.adjustFrequency',
      //   rules: {
      //     message: 'loanProduct.adjustFrequencyRules'
      //   }
      // },
      // {
      //   type: 'input',
      //   key: 'overdueInterestRatePercentage',
      //   label: 'loanProduct.overdueInterest',
      //   placeholder: 'loanProduct.overdueInterest',
      //   rules: {
      //     message: 'loanProduct.overdueInterestRules'
      //   }
      // },
      // {
      //   type: 'select',
      //   key: 'baseYearDays',
      //   label: 'loanProduct.baseYearDays',
      //   placeholder: 'loanProduct.baseYearDays',
      //   list: utils.loan.baseYearDaysOpts,
      //   rules: {
      //     message: 'loanProduct.baseYearDays'
      //   }
      // },
      {
        type: 'select',
        key: 'ratePlanId',
        label: 'loanProduct.ratePlan',
        placeholder: 'loanProduct.ratePlan',
        list: [],
        options: [],
        rules: {
          message: 'loanProduct.ratePlan'
        }
      }
    ]
  },
  // 问卷配置
  {
    title: 'loanProduct.questionnairesConfig',
    section: 'questionnairesConfig',
    span: 4,
    widgets: [
      {
        type: 'checkbox',
        key: 'questionnaires',
        label: 'loanProduct.questionnairesConfig',
        placeholder: 'loanProduct.questionnairesConfig',
        list: [],
        rules: {
          message: 'loanProduct.questionnairesConfigRules',
          type: 'string'
        }
      }
    ]
  }
]

export default {
  productModel,
  productTypeOpts,
  productWidgetOpts
}
