/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/optsConfig/kabuhayanProductConfig.js
 * @Date         : 2022-08-16 21:47:40
 * @LastEditTime : 2022-08-19 16:58:58
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from '@/utils'
import newClientProductCongfig from '@/views/admin/customerOffer/optsConfig/newClientProductCongfig'

const widgetsOpts = {
  // editStatus & signature
  editStatus: {
    title: 'Edit Status',
    section: 'editStatus',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'signature',
        label: 'Signature',
        placeholder: 'Signature'
      }
    ]
  },
  // personalInformation
  personalInformation: {
    title: 'Personal Information',
    section: 'personalInformation',
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
        type: 'input',
        key: 'mobile',
        label: 'Mobile No.',
        placeholder: 'Mobile No.',
        rules: {
          message: 'Mobile No.'
        }
      },
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email',
        rules: {
          message: 'Email'
        }
      }
    ]
  },
  //companyInformation
  companyInformation: {
    title: 'Company Information',
    section: 'companyInformation',
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'name',
        placeholder: 'Name',
        rules: {
          message: 'Name'
        }
      },
      {
        type: 'input',
        key: 'nature',
        label: 'Nature',
        placeholder: 'Nature',
        rules: {
          message: 'Nature'
        }
      },
      {
        type: 'input',
        key: 'services',
        label: 'Services',
        placeholder: 'Services',
        rules: {
          message: 'Services'
        }
      },
      {
        type: 'input',
        key: 'operatingYears',
        label: 'Years in Operation',
        placeholder: 'Years in Operation',
        rules: {
          message: 'Years in Operation'
        }
      }
    ],
    address: {
      title: 'Address',
      key: 'address',
      widgets: [
        {
          type: 'input',
          inputType: 'textarea',
          key: 'unit',
          label: 'House / Unit / Block / Lot / Floor / Phase No',
          placeholder: 'House / Unit / Block / Lot / Floor / Phase No'
        },
        {
          type: 'input',
          inputType: 'textarea',
          key: 'street',
          label: 'Building Name / Street Name',
          placeholder: 'Building Name / Street Name'
        },
        {
          type: 'input',
          inputType: 'textarea',
          key: 'village',
          label: 'Brgy. / Subdivision / Village',
          placeholder: 'Brgy. / Subdivision / Village'
        },
        {
          type: 'input',
          key: 'city',
          label: 'Municipality / City',
          placeholder: 'Municipality / City'
        },
        {
          type: 'input',
          key: 'province',
          label: 'Province',
          placeholder: 'Province'
        },
        {
          type: 'input',
          key: 'country',
          label: 'Country',
          placeholder: 'Country'
        },
        {
          type: 'input',
          key: 'zip',
          label: 'Postal Code',
          placeholder: 'Postal Code'
        },
        {
          type: 'select',
          key: 'ownership',
          label: 'Type of Ownership',
          list: utils.common.housingOwnershipTypeOpts,
          placeholder: 'Type of Ownership'
        }
      ],

      stay: {
        title: 'Stay',
        key: 'stay',
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
      contact: {
        title: 'Contact',
        key: 'contact',
        widgets: [
          {
            type: 'input',
            key: 'countryCode',
            label: 'Country Code',
            placeholder: 'Country Code'
          },
          {
            type: 'input',
            key: 'areaCode',
            label: 'Area Code',
            placeholder: 'Area Code'
          },
          {
            type: 'input',
            key: 'number',
            label: 'Number',
            placeholder: 'Number'
          },
          {
            type: 'input',
            key: 'local',
            label: 'Local',
            placeholder: 'Local'
          }
        ]
      }
    }
  },
  // loanInformation
  loanInformation: {
    title: 'Loan Information',
    section: 'loanInformation',
    span: 8,
    purpose: {
      title: 'Purpose',
      key: 'purpose',
      checkFileAll: false,
      isFileIndeterminate: true,
      widgets: [
        {
          type: 'checkbox',
          key: 'purpose',
          label: 'Purpose',
          placeholder: 'Purpose',
          list: newClientProductCongfig.purposeOpts,
          rules: {
            message: 'fundsSource',
            type: 'string'
          }
        }
      ]
    },
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
        placeholder: 'Term'
      }
      // {
      //   type: 'select',
      //   key: 'purpose',
      //   label: 'Purpose',
      //   list: newClientProductCongfig.purposeOpts,
      //   placeholder: 'Purpose'
      // }
    ]
  },
  // questionnaires
  questionnaires: {
    title: 'Questionnaires',
    section: 'questionnaire',
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
  }
}

export default {
  widgetsOpts
}
