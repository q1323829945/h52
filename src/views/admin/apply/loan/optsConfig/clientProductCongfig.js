/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/optsConfig/clientProductCongfig.js
 * @Date         : 2022-08-16 20:55:44
 * @LastEditTime : 2022-09-20 16:14:01
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import utils from '@/utils'
import newClientProductCongfig from './newClientProductCongfig'

const widgetsOpts = {
  // channel
  channel: {
    title: 'Channel',
    section: 'channel',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'code',
        label: 'Code',
        placeholder: 'Code'
      },
      {
        type: 'input',
        key: 'name',
        label: 'Name',
        placeholder: 'Name'
      }
    ]
  },
  // editStatus & signature
  editStatus: {
    title: 'Edit Status',
    section: 'editStatus',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'editStatus',
        label: 'Edit Status',
        list: utils.common.loanTypeStatusOpts,
        placeholder: 'Edit Status'
      },
      {
        type: 'input',
        key: 'signature',
        label: 'Signature',
        placeholder: 'Signature'
      },
      {
        type: 'input',
        key: 'cifNumber',
        label: 'Cif Number',
        placeholder: 'Cif Number'
      }
    ]
  },
  // customerInformation
  customerInformation: {
    title: 'Customer Information',
    section: 'customerInformation',
    name: {
      title: 'Name',
      key: 'name',
      widgets: [
        {
          type: 'input',
          key: 'lastName',
          label: 'Last Name',
          placeholder: 'Last Name',
          rules: {
            message: 'Last Name'
          }
        },
        {
          type: 'input',
          key: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          rules: {
            message: 'First Name'
          }
        },
        {
          type: 'input',
          key: 'middleName',
          label: 'Middle Name',
          placeholder: 'Middle Name',
          rules: {
            message: 'Middle Name'
          }
        },
        {
          type: 'input',
          key: 'suffix',
          label: 'Suffix',
          placeholder: 'Suffix',
          rules: {
            message: 'Suffix'
          }
        }
      ]
    },
    widgets: [
      {
        type: 'select',
        key: 'bdoProductType',
        label: 'BDO Product Type',
        list: newClientProductCongfig.bdoProductTypeOpts,
        placeholder: 'BDO Product Type'
      },
      {
        type: 'select',
        key: 'bdocustomer',
        label: 'BDO Customer',
        list: newClientProductCongfig.bdocustomerOpts,
        placeholder: 'BDO Customer'
      },
      {
        type: 'date',
        key: 'birthDay',
        label: 'Birthday',
        valueFormat: 'MM-dd-yyyy',
        placeholder: 'Birthday',
        rules: {
          message: 'Birthday'
        }
      }
    ]
  },
  // productInformation
  productInformation: {
    title: 'Product Information',
    section: 'productInformation',
    details: {
      title: 'Details',
      key: 'details',
      widgets: [
        {
          type: 'input',
          key: 'amount',
          label: 'Amount',
          placeholder: 'Amount'
        },
        {
          type: 'select',
          key: 'term',
          label: 'Term',
          list: utils.loan.productTimeOpts,
          placeholder: 'term'
        },
        {
          type: 'select',
          key: 'purpose',
          label: 'Purpose',
          list: newClientProductCongfig.purposeOpts,
          placeholder: 'Purpose'
        }
      ]
    },
    creditCardDetails: {
      title: 'Credit Card Details',
      key: 'creditCardDetails',
      widgets: [
        {
          type: 'select',
          key: 'creditCardType',
          label: 'Credit Card Type',
          list: newClientProductCongfig.creditCardTypeOpts,
          placeholder: 'Credit Card Type'
        },
        {
          type: 'select',
          key: 'creditCardSubType',
          label: 'Credit Card Sub Type',
          list: newClientProductCongfig.creditCardSubTypeOpts,
          placeholder: 'Credit Card Sub Type'
        },
        {
          type: 'select',
          key: 'virtualCard',
          label: 'Virtual Card',
          list: newClientProductCongfig.bdocustomerOpts,
          placeholder: 'Virtual Card'
        }
      ]
    },
    widgets: [
      {
        type: 'select',
        key: 'productType',
        label: 'Product Type',
        list: newClientProductCongfig.newProductTypeOpts,
        placeholder: 'Product Type'
      }
    ]
  },
  // deliverInformation
  deliverInformation: {
    title: 'Deliver Information',
    section: 'deliverInformation',
    widgets: [
      {
        type: 'select',
        key: 'deliverAddress',
        label: 'Deliver Address',
        list: newClientProductCongfig.deliverAddressOpts,
        placeholder: 'Deliver Address'
      },
      {
        type: 'select',
        key: 'deliverEmail',
        label: 'Deliver Email',
        list: newClientProductCongfig.deliverEmailOpts,
        placeholder: 'Deliver Email'
      }
    ]
  },
  // adaInformation
  adaInformation: {
    title: 'Ada Information',
    section: 'adaInformation',
    accountInformation: {
      title: 'Account Information',
      key: 'accountInformation',
      widgets: [
        {
          type: 'input',
          key: 'bdoAccount',
          label: 'BDO Account',
          placeholder: 'BDO Account'
        },
        {
          type: 'input',
          key: 'primarySignatory',
          label: 'Primary Signatory',
          placeholder: 'Primary Signatory'
        },
        {
          type: 'input',
          key: 'secondarySignatory',
          label: 'Secondary Signatory',
          placeholder: 'Secondary Signatory'
        }
      ]
    },
    widgets: [
      {
        type: 'select',
        key: 'newAccount',
        label: 'New Account',
        list: newClientProductCongfig.bdocustomerOpts,
        placeholder: 'New Account'
      }
    ]
  },
  // questionnaires
  questionnaires: {
    title: 'Questionnaires',
    section: 'questionnaires',
    questionnairesWidgets: [],
    widgets: [
      {
        type: 'input',
        inputType: 'textarea',
        key: 'question',
        label: 'Question',
        placeholder: 'Question'
      },
      {
        type: 'select',
        key: 'answer',
        label: 'Answer',
        list: newClientProductCongfig.bdocustomerOpts,
        placeholder: 'Answer'
      }
    ]
  },
  //financialInformation
  financialInformation: {
    title: 'Financial Information',
    section: 'financialInformation',
    creditCards: {
      title: 'Credit Cards',
      key: 'creditCards',
      creditCardsWidgets: [],
      widgets: [
        {
          type: 'input',
          key: 'bank',
          label: 'Bank',
          placeholder: 'Bank'
        },
        {
          type: 'input',
          key: 'lastSixDigits',
          label: 'Last Six Digits',
          placeholder: 'Last Six Digits'
        },
        {
          type: 'input',
          key: 'year',
          label: 'Year',
          placeholder: 'Year'
        }
      ]
    },
    stayAtCurrentHome: {
      title: 'Stay At CurrentHome',
      key: 'stayAtCurrentHome',
      widgets: [
        {
          type: 'input',
          key: 'year',
          label: 'Year',
          placeholder: 'Year'
        },
        {
          type: 'input',
          key: 'month',
          label: 'Month',
          placeholder: 'Month'
        }
      ]
    },
    stayWithPreviousBusiness: {
      title: 'Stay With Business',
      key: 'stayWithPreviousBusiness',
      widgets: [
        {
          type: 'input',
          key: 'year',
          label: 'Year',
          placeholder: 'Year'
        },
        {
          type: 'input',
          key: 'month',
          label: 'Month',
          placeholder: 'Month'
        }
      ]
    },
    stayWithCurrentBusiness: {
      title: 'Stay With Current Business',
      key: 'stayWithCurrentBusiness',
      widgets: [
        {
          type: 'input',
          key: 'year',
          label: 'Year',
          placeholder: 'Year'
        },
        {
          type: 'input',
          key: 'month',
          label: 'Month',
          placeholder: 'Month'
        }
      ]
    },
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'Name',
        placeholder: 'Name'
      },
      {
        type: 'input',
        key: 'remittanceCountry',
        label: 'Remittance Country',
        placeholder: 'Remittance Country'
      },
      {
        type: 'input',
        key: 'primarilyUse',
        label: 'Primarily Use',
        placeholder: 'Primarily Use'
      },
      {
        type: 'input',
        key: 'grossMonthlyIncome',
        label: 'Gross Monthly Income',
        placeholder: 'Gross Monthly Income'
      },
      {
        type: 'select',
        key: 'ownership',
        label: 'Ownership',
        list: utils.common.housingOwnershipTypeOpts,
        placeholder: 'Ownership'
      },
      {
        type: 'select',
        key: 'employmentType',
        label: 'Employment Type',
        list: newClientProductCongfig.employmentTypeOpts,
        placeholder: 'Employment Type'
      },
      {
        type: 'select',
        key: 'employmentSubType',
        label: 'Employment Sub Type',
        list: newClientProductCongfig.employmentSubTypeOpts,
        placeholder: 'Employment Sub Type'
      }
    ]
  }
}

export default {
  widgetsOpts
}
