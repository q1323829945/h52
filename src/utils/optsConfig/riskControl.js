/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/utils/optsConfig/riskControl.js
 * @Date         : 2022-04-24 13:21:12
 * @LastEditTime : 2022-04-27 16:28:47
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

// 规则类型
const ruleTypeOpts = [
  {
    value: 'PERSONAL',
    label: 'configType.personal'
  },
  {
    value: 'BUSINESS',
    label: 'configType.business'
  }
]

// 来源类型
const dataItemOpts = [
  {
    value: 'CREDIT_RISK',
    label: 'configType.credit_risk'
  },
  {
    value: 'CUSTOMER_CREDIT_RATE',
    label: 'configType.customer_credit_rate'
  },
  {
    value: 'FRAUD_EVALUATION',
    label: 'configType.fraud_evaluation'
  },
  {
    value: 'REGULATORY_COMPLIANCE',
    label: 'configType.regulatory_compliance'
  }
]

// 关系类型
const relationalOperatorTypeOpts = [
  {
    value: 'LT',
    label: '<'
  },
  {
    value: 'LE',
    label: '<='
  },
  {
    value: 'EQ',
    label: '=='
  },
  {
    value: 'NE',
    label: '!='
  },
  {
    value: 'GT',
    label: '>'
  },
  {
    value: 'GE',
    label: '>='
  }
]

const logicalOperationTypeOpts = [
  {
    value: 'AND',
    label: 'AND'
  },
  {
    value: 'OR',
    label: 'OR'
  }
]

// 风控组件规则配置
const riskControlWidgetOpts = {
  // 规则
  ruleTypeWidgets: [
    {
      type: 'input',
      key: 'name',
      label: 'riskControl.name',
      placeholder: 'riskControl.name',
      rules: {
        message: 'riskControl.nameRules'
      }
    },
    {
      type: 'select',
      key: 'ruleType',
      label: 'riskControl.rule',
      placeholder: 'riskControl.rule',
      list: ruleTypeOpts,
      rules: {
        message: 'riskControl.ruleRules'
      }
    },
    {
      type: 'input',
      key: 'remark',
      label: 'riskControl.remark',
      placeholder: 'riskControl.remark',
      rules: {
        message: 'riskControl.remarkRules'
      }
    },
    {
      type: 'input',
      key: 'description',
      label: 'riskControl.description',
      placeholder: 'riskControl.description',
      rules: {
        message: 'riskControl.thresholdRules'
      }
    }
  ],
  // 来源
  dataSourceWidgets: [],
  dataSourceItemwidgets: [
    {
      type: 'select',
      key: 'dataItem',
      label: 'riskControl.dataSource',
      placeholder: 'riskControl.dataSource',
      list: dataItemOpts,
      rules: {
        message: 'riskControl.dataSourceRules'
      }
    },
    {
      type: 'select',
      key: 'logicalOperationType',
      label: 'riskControl.logicalOperationType',
      placeholder: 'riskControl.logicalOperationType',
      list: logicalOperationTypeOpts,
      rules: {
        message: 'riskControl.logicalOperationTypeRules'
      }
    },
    {
      type: 'select',
      key: 'relationalOperatorType',
      label: 'riskControl.relationalOperator',
      placeholder: 'riskControl.relationalOperator',
      list: relationalOperatorTypeOpts,
      rules: {
        message: 'riskControl.relationalOperatorRules'
      }
    },
    {
      type: 'input',
      key: 'threshold',
      label: 'riskControl.threshold',
      placeholder: 'riskControl.threshold',
      rules: {
        message: 'riskControl.thresholdRules'
      }
    }
  ]
}

export default {
  ruleTypeOpts,
  dataItemOpts,
  relationalOperatorTypeOpts,
  riskControlWidgetOpts,
  logicalOperationTypeOpts
}
