/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/optsConfig/corporateProductConfig.js
 * @Date         : 2022-08-15 09:21:23
 * @LastEditTime : 2022-09-20 17:18:38
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import common from '@/utils/optsConfig/common'
import loan from '@/utils/optsConfig/loan'

// ### borrower type
// | 字段名      | 字段中文名 | 值          |
// | ----------- | ---------- | ----------- |
// | Principal   | 委托人     | PRINCIPAL   |
// | Co-Borrower | 共同借款人 | CO_BORROWER |
const borrowerTypeOpts = [
  { label: 'Principal', value: 'Principal' },
  { label: 'Co-Borrower', value: 'CO_BORROWER' }
]

// ### paid type
// | 字段名   | 字段中文名 | 值       |
// | -------- | ---------- | -------- |
// | Prepaid  | 预付款     | PREPAID  |
// | Postpaid | 后付费     | POSTPAID |
const paidTypeOpts = [
  { label: 'Prepaid', value: 'PREPAID' },
  { label: 'Postpaid', value: 'POSTPAID' }
]

// ### working capital
// | 字段名                                                  | 字段中文名   | 值                 |
// | ------------------------------------------------------- | ------------ | ------------------ |
// | Inventory Build Up                                      | 库存增加     | INVENTORY_BUILD_UP |
// | Funding Gap                                             | 资金缺口     | FUNDING_GAP        |
// | Loan Take-out (Original Purpose is for Working Capital) | 贷款提取     | LOAN_TAKE_OUT      |
// | Salaries for Additional Human Assets / Talents          | 额外人力资产 | TALENTS            |
// | Other Funds for Operating Activities of the Business    | 其他         | OTHERS             |
const workingCapitalOpts = [
  { label: 'Inventory Build Up', value: 'INVENTORY_BUILD_UP' },
  { label: 'Funding Gap', value: 'FUNDING_GAP' },
  { label: 'Loan Take-out (Original Purpose is for Working Capital)', value: 'LOAN_TAKE_OUT' },
  { label: 'Salaries for Additional Human Assets / Talents', value: 'TALENTS' },
  { label: 'Other Funds for Operating Activities of the Business', value: 'OTHERS' }
]

// ### capex
// | 字段名                                                  | 字段中文名                             | 值            |
// | ------------------------------------------------------- | -------------------------------------- | ------------- |
// | Acquisition of Property, Plant & Equipment              | 收购物业、厂房和设备                   | ACQUISITON    |
// | Construction of property for business use               | 建设商业用房地产                       | CONSTRUCTION  |
// | Renovation of Office/ Plant Improvements                | 办公室/工厂改造                        | RENOVATION    |
// | Major Repairs, Upgrades & Maintenance (CAPEX)           | 大修、升级和维护（资本支出）           | CAPEX         |
// | Loan Take-out (Original Purpose is CAPEX)               | 贷款提取                               | LOAN_TAKE_OUT |
// | Business expansion (additional branches, office, plant) | 业务拓展（新增分支机构、办公室、工厂） |         BUSINESS_EXPANSION      |
const capexOpts = [
  { label: 'Acquisition of Property, Plant & Equipment', value: 'ACQUISITON' },
  { label: 'Construction of property for business use', value: 'CONSTRUCTION' },
  { label: 'Renovation of Office/ Plant Improvements', value: 'RENOVATION' },
  { label: 'Major Repairs, Upgrades & Maintenance (CAPEX)', value: 'CAPEX' },
  { label: 'Loan Take-out (Original Purpose is CAPEX)', value: 'LOAN_TAKE_OUT' },
  { label: 'Business expansion (additional branches, office, plant)', value: 'BUSINESS_EXPANSION' }
]

// ### investment
// | 字段名                                              | 字段中文名                | 值            |
// | --------------------------------------------------- | ------------------------- | ------------- |
// | Acquisition of Non-Core Assets                      | 收购非核心资产            | ACQUISITION   |
// | Loan Take-out (Original Purpose is Investment)      | 贷款提取（原用途为投资）  | LOAN_TAKE_OUT |
// | Construction of property (Non-Core)                 | 房地产建设（非核心）      | CONSTRUCTION  |
// | Renovation of Office/ Plant Improvements (Non-Core) | 办公室/工厂改造（非核心） | RENOVATION    |
const investmentOpts = [
  { label: 'Acquisition of Non-Core Assets', value: 'ACQUISITION' },
  { label: 'Loan Take-out (Original Purpose is Investment)', value: 'LOAN_TAKE_OUT' },
  { label: 'Construction of property (Non-Core)', value: 'CONSTRUCTION' },
  { label: 'Renovation of Office/ Plant Improvements (Non-Core)', value: 'RENOVATION' }
]

const gender = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' }
]

const corporateWidgetOpts = {
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
  // editStatus
  editStatus: {
    title: 'Edit Status',
    section: 'editStatus',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'borrowerType',
        label: 'Borrower Type',
        list: borrowerTypeOpts,
        placeholder: 'Borrower Type'
      }
    ]
  },
  // undertaking
  undertaking: {
    title: 'Undertaking',
    section: 'undertaking',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'signature',
        label: 'Authorized Signatory',
        placeholder: 'Authorized Signatory'
      },
      {
        type: 'input',
        key: 'appraisalFees',
        label: 'Appraisal Fees',
        placeholder: 'Appraisal Fees'
      },
      {
        type: 'input',
        key: 'Account',
        label: 'Account',
        placeholder: 'Account'
      }
    ]
  },
  //推荐信息
  referralInformation: {
    title: 'Referral Information',
    section: 'referralInformation',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'branch',
        label: 'Unit / Branch',
        placeholder: 'Unit / Branch'
      },
      {
        type: 'input',
        key: 'developer',
        label: 'Developer',
        placeholder: 'Developer'
      },
      {
        type: 'input',
        key: 'referrer',
        label: 'Broker / Referrer',
        placeholder: 'Broker / Referrer'
      },
      {
        type: 'input',
        key: 'accountOfficer',
        label: 'Account Officer',
        placeholder: 'Account Officer'
      },
      {
        type: 'input',
        key: 'others',
        label: 'Others',
        placeholder: 'Others'
      }
    ]
  },
  // 借款人信息
  borrowerInformation: {
    title: 'Borrower Information',
    section: 'borrowerInformation',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'Name of Business',
        placeholder: 'Name of Business'
      },
      {
        type: 'input',
        key: 'nature',
        label: 'Nature of Business',
        placeholder: 'Nature of Business'
      },
      {
        type: 'input',
        key: 'operatingYears',
        label: 'Years in Operation',
        placeholder: 'Years in Operation'
      },
      {
        type: 'input',
        key: 'businessType',
        label: 'Business Type',
        placeholder: 'Business Type'
      },
      {
        type: 'input',
        key: 'registration',
        label: 'SEC Registration No.',
        placeholder: 'SEC Registration No.'
      },
      {
        type: 'input',
        key: 'tin',
        label: 'TIN',
        placeholder: 'TIN'
      },
      {
        type: 'input',
        key: 'sss',
        label: 'SSS',
        placeholder: 'SSS'
      }
    ],
    businessAddress: {
      title: 'Business Address',
      key: 'businessAddress',
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
          list: common.housingOwnershipTypeOpts,
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
            label: 'Year/s',
            placeholder: 'Year/s'
          },
          {
            type: 'input',
            key: 'month',
            label: 'Month/s',
            placeholder: 'Month/s'
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
    },
    factoryAddress: {
      title: 'Factory / Branch Address',
      key: 'factoryAddress',
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
          list: common.housingOwnershipTypeOpts,
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
            label: 'Year/s',
            placeholder: 'Year/s'
          },
          {
            type: 'input',
            key: 'month',
            label: 'Month/s',
            placeholder: 'Month/s'
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
  //partnersInformation 大股东/合伙人和高管信息
  partnersInformation: {
    title: 'Partners Informatione',
    section: 'partnersInformation',
    span: 8,
    partnersWidgets: [],
    widgets: [
      {
        type: 'input',
        isObj: true,
        key: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
        rules: {
          message: 'Last Nam'
        }
      },
      {
        type: 'input',
        isObj: true,
        key: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
        rules: {
          message: 'First Name'
        }
      },
      {
        type: 'input',
        isObj: true,
        key: 'middleName',
        label: 'Middle Name',
        placeholder: 'Middle Name',
        rules: {
          message: 'Middle Name'
        }
      },
      {
        type: 'input',
        isObj: true,
        key: 'suffix',
        label: 'Suffix',
        placeholder: 'Suffix',
        rules: {
          message: 'Suffix'
        }
      },
      {
        type: 'input',
        isObj: false,
        key: 'position',
        label: 'Position in the Company',
        placeholder: 'Position in the Company',
        rules: {
          message: 'Position in the Company'
        }
      },
      {
        type: 'input',
        isObj: false,
        key: 'stockRight',
        label: 'Stock Right(%)',
        placeholder: 'Stock Right(%)',
        rules: {
          message: 'Stock Right'
        }
      },
      {
        type: 'date',
        key: 'birthDay',
        label: 'BirthDay',
        valueFormat: 'MM-dd-yyyy',
        placeholder: 'Date of Birth',
        rules: {
          message: 'Birthday'
        }
      }
    ]
  },
  // mortgagorInformation
  mortgagorInformation: {
    title: 'Mortgagor Information',
    section: 'mortgagorInformation',
    span: 8,
    widgets: [
      {
        type: 'date',
        key: 'birthDay',
        label: 'BirthDay',
        valueFormat: 'MM-dd-yyyy',
        placeholder: 'Date of Birth',
        rules: {
          message: 'Birthday'
        }
      },
      {
        type: 'input',
        key: 'birthPlace',
        label: 'Place of Birth',
        placeholder: 'Place of Birth'
      },
      {
        type: 'select',
        key: 'gender',
        label: 'Gender',
        list: gender,
        placeholder: 'gender'
      },
      {
        type: 'input',
        key: 'civilStatus',
        label: 'Civil Status',
        placeholder: 'Civil Status'
      },
      {
        type: 'input',
        key: 'citizenship',
        label: 'Citizenship',
        placeholder: 'Citizenship'
      },
      {
        type: 'input',
        key: 'tin',
        label: 'TIN',
        placeholder: 'TIN'
      },
      {
        type: 'input',
        key: 'sss',
        label: 'SSS',
        placeholder: 'SSS'
      },
      {
        type: 'input',
        key: 'mobile',
        label: 'Mobile',
        placeholder: 'Mobile'
      },
      {
        type: 'select',
        key: 'paidType',
        label: 'Paid Type',
        list: paidTypeOpts,
        placeholder: 'Paid Type'
      }
    ],
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
          isObj: true,
          key: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          rules: {
            message: 'First Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'middleName',
          label: 'Middle Name',
          placeholder: 'Middle Name',
          rules: {
            message: 'Middle Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'suffix',
          label: 'Suffix',
          placeholder: 'Suffix',
          rules: {
            message: 'Suffix'
          }
        }
      ]
    },
    motherName: {
      title: 'Mother’s Maiden Name',
      key: 'motherName',
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
          isObj: true,
          key: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          rules: {
            message: 'First Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'middleName',
          label: 'Middle Name',
          placeholder: 'Middle Name',
          rules: {
            message: 'Middle Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'suffix',
          label: 'Suffix',
          placeholder: 'Suffix',
          rules: {
            message: 'Suffix'
          }
        }
      ]
    },
    fatherName: {
      title: 'Father’s Name',
      key: 'fatherName',
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
          isObj: true,
          key: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          rules: {
            message: 'First Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'middleName',
          label: 'Middle Name',
          placeholder: 'Middle Name',
          rules: {
            message: 'Middle Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'suffix',
          label: 'Suffix',
          placeholder: 'Suffix',
          rules: {
            message: 'Suffix'
          }
        }
      ]
    },
    residencePhone: {
      title: 'Residence Phone No.',
      key: 'residencePhone',
      widgets: [
        {
          type: 'input',
          key: 'countryCode',
          label: 'Country Code',
          placeholder: 'Country Code',
          rules: {
            message: 'Country Code'
          }
        },
        {
          type: 'input',
          key: 'areaCode',
          label: 'Area Code',
          placeholder: 'Area Code',
          rules: {
            message: 'Area Code'
          }
        },
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number',
          rules: {
            message: 'Number'
          }
        },
        {
          type: 'input',
          key: 'local',
          label: 'Local',
          placeholder: 'Local',
          rules: {
            message: 'Local'
          }
        }
      ]
    },
    officePhone: {
      title: 'Office Phone No.',
      key: 'officePhone',
      widgets: [
        {
          type: 'input',
          key: 'countryCode',
          label: 'Country Code',
          placeholder: 'Country Code',
          rules: {
            message: 'Country Code'
          }
        },
        {
          type: 'input',
          key: 'areaCode',
          label: 'Area Code',
          placeholder: 'Area Code',
          rules: {
            message: 'Area Code'
          }
        },
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number',
          rules: {
            message: 'Number'
          }
        },
        {
          type: 'input',
          key: 'local',
          label: 'Local',
          placeholder: 'Local',
          rules: {
            message: 'Local'
          }
        }
      ]
    },
    fax: {
      title: 'Fax No.',
      key: 'fax',
      widgets: [
        {
          type: 'input',
          key: 'countryCode',
          label: 'Country Code',
          placeholder: 'Country Code',
          rules: {
            message: 'Country Code'
          }
        },
        {
          type: 'input',
          key: 'areaCode',
          label: 'Area Code',
          placeholder: 'Area Code',
          rules: {
            message: 'Area Code'
          }
        },
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number',
          rules: {
            message: 'Number'
          }
        },
        {
          type: 'input',
          key: 'local',
          label: 'Local',
          placeholder: 'Local',
          rules: {
            message: 'Local'
          }
        }
      ]
    },
    presentAddress: {
      title: 'Present Address',
      key: 'presentAddress',
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
          list: common.housingOwnershipTypeOpts,
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
            label: 'Year/s',
            placeholder: 'Year/s'
          },
          {
            type: 'input',
            key: 'month',
            label: 'Month/s',
            placeholder: 'Month/s'
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
    },
    permanentAddress: {
      title: 'Permanent Address',
      key: 'permanentAddress',
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
          list: common.housingOwnershipTypeOpts,
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
            label: 'Year/s',
            placeholder: 'Year/s'
          },
          {
            type: 'input',
            key: 'month',
            label: 'Month/s',
            placeholder: 'Month/s'
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
  // spouseInformation
  spouseInformation: {
    title: 'Spouse Information',
    section: 'spouseInformation',
    span: 8,
    widgets: [
      {
        type: 'date',
        key: 'birthDay',
        label: 'BirthDay',
        valueFormat: 'MM-dd-yyyy',
        placeholder: 'Date of Birth',
        rules: {
          message: 'Birthday'
        }
      },
      {
        type: 'input',
        key: 'birthPlace',
        label: 'Place of Birth',
        placeholder: 'Place of Birth'
      },
      {
        type: 'input',
        key: 'citizenship',
        label: 'Citizenship',
        placeholder: 'Citizenship'
      },
      {
        type: 'input',
        key: 'tin',
        label: 'TIN',
        placeholder: 'TIN'
      },
      {
        type: 'input',
        key: 'mobile',
        label: 'Mobile',
        placeholder: 'Mobile'
      },
      {
        type: 'select',
        key: 'paidType',
        label: 'Paid Type',
        list: paidTypeOpts,
        placeholder: 'Paid Type'
      },
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'email'
      }
    ],
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
          isObj: true,
          key: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          rules: {
            message: 'First Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'middleName',
          label: 'Middle Name',
          placeholder: 'Middle Name',
          rules: {
            message: 'Middle Name'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'suffix',
          label: 'Suffix',
          placeholder: 'Suffix',
          rules: {
            message: 'Suffix'
          }
        }
      ]
    },
    sssOrGsis: {
      title: 'SSS Or Gsis',
      key: 'sssOrGsis',
      widgets: [
        {
          type: 'input',
          key: 'type',
          label: 'Type',
          placeholder: 'Type',
          rules: {
            message: 'Type'
          }
        },
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number',
          rules: {
            message: 'Number'
          }
        }
      ]
    },
    officePhone: {
      title: 'Office Phone No.',
      key: 'officePhone',
      widgets: [
        {
          type: 'input',
          key: 'countryCode',
          label: 'Country Code',
          placeholder: 'Country Code',
          rules: {
            message: 'Country Code'
          }
        },
        {
          type: 'input',
          key: 'areaCode',
          label: 'Area Code',
          placeholder: 'Area Code',
          rules: {
            message: 'Area Code'
          }
        },
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number',
          rules: {
            message: 'Number'
          }
        },
        {
          type: 'input',
          key: 'local',
          label: 'Local',
          placeholder: 'Local',
          rules: {
            message: 'Local'
          }
        }
      ]
    }
  },
  // collateralInformation
  collateralInformation: {
    title: 'Collateral Information',
    section: 'collateralInformation',
    widgets: [
      {
        type: 'input',
        key: 'presentRegisteredOwner',
        label: 'Present Registered Owner',
        placeholder: 'Present Registered Owner',
        rules: {
          message: 'Present Registered Owner'
        }
      },
      {
        type: 'input',
        key: 'cct',
        label: 'CCT',
        placeholder: 'CCT',
        rules: {
          message: 'CCT'
        }
      },
      {
        type: 'input',
        key: 'contactPerson',
        label: 'Contact Person',
        placeholder: 'Contact Person',
        rules: {
          message: 'Contact Person'
        }
      },
      {
        type: 'input',
        key: 'contactNumber',
        label: 'Contact Number',
        placeholder: 'Contact Number',
        rules: {
          message: 'Contact Number'
        }
      },
      {
        type: 'input',
        key: 'collateralType',
        label: 'Collateral Type',
        placeholder: 'Collateral Type',
        rules: {
          message: 'Collateral Type'
        }
      },
      {
        type: 'input',
        key: 'collateralUse',
        label: 'Collateral Use',
        placeholder: 'Collateral Use',
        rules: {
          message: 'Collateral Use'
        }
      }
    ],
    propertyAddress: {
      title: 'Property Address',
      key: 'propertyAddress',
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
          list: common.housingOwnershipTypeOpts,
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
            label: 'Year/s',
            placeholder: 'Year/s'
          },
          {
            type: 'input',
            key: 'month',
            label: 'Month/s',
            placeholder: 'Month/s'
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
    widgets: [
      {
        type: 'input',
        key: 'amount',
        label: 'Amount',
        placeholder: 'Amount',
        rules: {
          message: 'Amount'
        }
      },
      {
        type: 'select',
        key: 'term',
        label: 'Term',
        list: loan.productTimeOpts,
        placeholder: 'Term'
      },
      {
        type: 'select',
        key: 'fixingPeriod',
        label: 'Fixing Period',
        list: loan.productTimeOpts,
        placeholder: 'Fixing Period'
      }
    ],
    purpose: {
      title: 'Purpose',
      key: 'purpose',
      workingCapital: {
        title: 'Working Capital',
        key: 'workingCapital',
        checkFileAll: false,
        isFileIndeterminate: true,
        widgets: [
          {
            type: 'checkbox',
            key: 'workingCapital',
            label: 'Working Capital',
            placeholder: 'Working Capital',
            list: workingCapitalOpts,
            rules: {
              message: 'Working Capital',
              type: 'string'
            }
          }
        ]
      },
      capex: {
        title: 'Capex',
        key: 'capex',
        checkFileAll: false,
        isFileIndeterminate: true,
        widgets: [
          {
            type: 'checkbox',
            key: 'capex',
            label: 'Capex',
            placeholder: 'Capex',
            list: capexOpts,
            rules: {
              message: 'Capex',
              type: 'string'
            }
          }
        ]
      },
      investment: {
        title: 'Investment',
        key: 'investment',
        checkFileAll: false,
        isFileIndeterminate: true,
        widgets: [
          {
            type: 'checkbox',
            key: 'capex',
            label: 'Capex',
            placeholder: 'Capex',
            list: investmentOpts,
            rules: {
              message: 'Capex',
              type: 'string'
            }
          }
        ]
      }
    }
  },
  // financialInformation
  financialInformation: {
    title: 'Financial Information',
    section: 'financialInformation',
    span: 8,
    deposits: {
      title: 'Deposits',
      key: 'deposits',
      depositsWidgets: [],
      widgets: [
        {
          type: 'input',
          key: 'account',
          label: 'Account',
          placeholder: 'Account',
          rules: {
            message: 'Account'
          }
        },
        {
          type: 'input',
          key: 'outstandingBalance',
          label: 'Outstanding Balance',
          placeholder: 'Outstanding Balance',
          rules: {
            message: 'Outstanding Balance'
          }
        },
        {
          type: 'input',
          key: 'bank',
          label: 'Bank',
          placeholder: 'Bank',
          rules: {
            message: 'Bank'
          }
        },
        {
          type: 'input',
          key: 'type',
          label: 'Type',
          placeholder: 'Type',
          rules: {
            message: 'type'
          }
        },
        {
          type: 'input',
          key: 'depositor',
          label: 'Depositor',
          placeholder: 'Depositor',
          rules: {
            message: 'Depositor'
          }
        },
        {
          type: 'date',
          key: 'openedDate',
          label: 'Opened Date',
          valueFormat: 'MM-dd-yyyy',
          placeholder: 'openedDate',
          rules: {
            message: 'openedDate'
          }
        }
      ]
    },
    loans: {
      title: 'Loans',
      key: 'loans',
      loansWidgets: [],
      widgets: [
        {
          type: 'input',
          key: 'bank',
          label: 'Bank',
          placeholder: 'Bank',
          rules: {
            message: 'Bank'
          }
        },
        {
          type: 'input',
          key: 'type',
          label: 'Type',
          placeholder: 'Type',
          rules: {
            message: 'type'
          }
        },
        {
          type: 'input',
          key: 'amount',
          label: 'Amount',
          placeholder: 'Amount',
          rules: {
            message: 'Amount'
          }
        },
        {
          type: 'input',
          key: 'monthlyPayment',
          label: 'Monthly Payment',
          placeholder: 'Monthly Payment',
          rules: {
            message: 'Monthly Payment'
          }
        },
        {
          type: 'date',
          key: 'grantedDate',
          label: 'Granted Date',
          valueFormat: 'MM-dd-yyyy',
          placeholder: 'Granted Date',
          rules: {
            message: 'Granted Date'
          }
        },
        {
          type: 'date',
          key: 'maturityDate',
          label: 'Maturity Date',
          valueFormat: 'MM-dd-yyyy',
          placeholder: 'Maturity Date',
          rules: {
            message: 'Maturity Date'
          }
        }
      ]
    }
  },
  // financialInformation
  tradeReferences: {
    title: 'Trade References',
    section: 'tradeReferences',
    span: 8,
    majorCustomers: {
      title: 'Major Customers',
      key: 'majorCustomers',
      widgets: []
    },
    majorSuppliers: {
      title: 'Major Suppliers',
      key: 'majorSuppliers',
      widgets: []
    },
    widgets: [
      {
        type: 'input',
        key: 'companyName',
        label: 'Company Name',
        placeholder: 'Company Name',
        rules: {
          message: 'Company Name'
        }
      },
      {
        type: 'input',
        key: 'contactName',
        label: 'Contact Person / Position',
        placeholder: 'Contact Person / Position',
        rules: {
          message: 'ContactContact Person / Position'
        }
      },
      {
        type: 'input',
        key: 'contactNumber',
        label: 'Contact No.',
        placeholder: 'Contact No.',
        rules: {
          message: 'Contact No.'
        }
      }
    ]
  }
}

export default {
  corporateWidgetOpts,
  gender,
  borrowerTypeOpts,
  paidTypeOpts,
  workingCapitalOpts,
  capexOpts,
  investmentOpts
}
