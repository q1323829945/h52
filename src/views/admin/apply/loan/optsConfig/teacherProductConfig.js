/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/optsConfig/teacherProductConfig.js
 * @Date         : 2022-08-15 17:42:41
 * @LastEditTime : 2022-09-20 16:05:02
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import common from '@/utils/optsConfig/common'
import loan from '@/utils/optsConfig/loan'

const gender = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' }
]

const frequency = [
  { label: 'Day', value: 'D' },
  { label: 'Month', value: 'M' },
  { label: 'Year', value: 'Y' }
]

// | Single    | 未婚 | SINGLE    |
// | --------- | ---- | --------- |
// | Married   | 已婚 | MARRIED   |
// | Separated | 分居 | SEPARATED |
// | Annulled  | 废弃 | ANNULLED  |
// | Divorced  | 离异 | DIVORCED  |
// | Widow/er  | 丧偶 | WIDOW     |
const civilStatusOpts = [
  { label: 'Married', value: 'MARRIED' },
  { label: 'Separated', value: 'SEPARATED' },
  { label: 'Annulled', value: 'ANNULLED' },
  { label: 'Divorced', value: 'DIVORCED' },
  { label: 'Widower ', value: 'WIDOW' },
  { label: 'Single', value: 'SINGLE' }
]

// | 字段名       | 字段中文名 | 值           |
// | ------------ | ---------- | ------------ |
// | Regular      | 正规       | REGULAR      |
// | Probationary | 试用       | PROBATIONARY |
// | Contractual  | 合同制     | CONTRACTUAL  |
const employmentStatusOpts = [
  { label: 'Regular', value: 'REGULAR' },
  { label: 'Probationary', value: 'PROBATIONARY' },
  { label: 'Contractual', value: 'CONTRACTUAL' }
]

// | Salary   | 工资           | Salary   |
// | -------- | -------------- | -------- |
// | Business | 生意           | Business |
// | Pension  | 退休金         | Pension  |
// | Others   | 其他（可输入） |          |
const sourceOfFundsOpts = [
  { label: 'Business', value: 'Business' },
  { label: 'Pension', value: 'Pension' },
  { label: 'Others', value: 'Others' }
]

// ### income type

// | 字段名                 | 字段中文名   | 值                     |
// | ---------------------- | ------------ | ---------------------- |
// | Borrower’s Salary      | 借款人工资   | BORROWER_SALARY        |
// | Spouse Income          | 配偶收入     | SPOUSE_INCOME          |
// | Other Source of Income | 其他收入来源 | OTHER_SOURCE_OF_INCOME |
const incomeTypeOpts = [
  { label: 'Borrower’s Salary', value: 'BORROWER_SALARY' },
  { label: 'Spouse Income  ', value: 'SPOUSE_INCOME' },
  { label: 'Other Source of Income', value: 'OTHER_SOURCE_OF_INCOME' }
]

// | 字段名          | 字段中文名     | 值              |
// | --------------- | -------------- | --------------- |
// | Current Account | 活期存款账户   | Current Account |
// | Savings Account | 储蓄帐户       | Savings Account |
// | Others          | 其他（可输入） |                 |
const networkBankAccountOpts = [
  { label: 'Current Account', value: 'Current Account' },
  { label: 'Savings Account', value: 'Savings Account' },
  { label: 'Others', value: 'Others' }
]

// | 字段名                     | 字段中文名   | 值                         |
// | -------------------------- | ------------ | -------------------------- |
// | Education                  | 教育         | EDUCATION                  |
// | Hospitalization            | 住院治疗     | HOSPITALIZATION            |
// | Emergency                  | 突发事件     | EMERGENCY                  |
// | Travel                     | 旅行         | TRAVEL                     |
// | Household                  | 家庭         | HOUSEHOLD                  |
// | Other Personal Consumption | 其他个人消费 | OTHER_PERSONAL_COMSUMPTION |
const purposeOpts = [
  { label: 'Education', value: 'EDUCATION' },
  { label: 'Hospitalization', value: 'HOSPITALIZATION' },
  { label: 'Emergency', value: 'EMERGENCY' },
  { label: 'Travel', value: 'TRAVEL' },
  { label: 'Household', value: 'HOUSEHOLD' },
  { label: 'Other Personal Consumption', value: 'OTHER_PERSONAL_COMSUMPTION' }
]

//小学，初中，高中，大专，本科及以上
//PRIMARY_SCHOOL,JUNIOR_HIGH_SCHOOL,HIGH_SCHOOL,SPECIALTY,BACHELOR_DEGREE_OR_ABOVE
const educationalAttainmentOpts = [
  { label: 'Primary School', value: 'PRIMARY_SCHOOL' },
  { label: 'Junior High School', value: 'JUNIOR_HIGH_SCHOOL' },
  { label: 'High School', value: 'EMERGEHIGH_SCHOOLNCY' },
  { label: 'Specialty', value: 'SPECIALTY' },
  { label: 'Bachelor Degree Or Above', value: 'BACHELOR_DEGREE_OR_ABOVE' }
]

const widgetsModel = {
  stay: {
    year: '',
    month: ''
  },
  contact: {
    areaCode: '',
    number: ''
  },
  sourceOfIncome: { incomeType: '', source: '', grossAmount: '', netAmount: '', frequency: '' }
}

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
        label: 'customerOffer.Code',
        placeholder: 'Code'
      },
      {
        type: 'input',
        key: 'name',
        label: 'customerOffer.Name',
        placeholder: 'customerOffer.Name'
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
        type: 'input',
        key: 'signature',
        label: 'customerOffer.Signature',
        placeholder: 'customerOffer.Signature'
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
    motherMaidenName: {
      title: 'Mother’s Maiden Name',
      key: 'motherMaidenName',
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
    widgets: [
      {
        type: 'select',
        key: 'gender',
        label: 'Gender',
        list: gender,
        placeholder: 'Gender'
      },
      {
        type: 'input',
        key: 'citizenship',
        label: 'Citizenship',
        placeholder: 'Citizenship'
      },
      {
        type: 'select',
        key: 'civilStatus',
        label: 'Civil Status',
        list: civilStatusOpts,
        placeholder: 'Civil Status'
      },
      {
        type: 'input',
        key: 'age',
        label: 'Age',
        placeholder: 'Age'
      },
      {
        type: 'input',
        key: 'birthPlace',
        label: 'Place of Birth',
        placeholder: 'Place of Birth'
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
      },
      {
        type: 'input',
        key: 'numberOfDependents',
        label: 'No. of Dependent/s',
        placeholder: 'No. of Dependent/s'
      }
    ]
  },
  // contactInformation
  contactInformation: {
    title: 'Contact Information',
    section: 'contactInformation',
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
        title: 'Length of Stay',
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
        title: 'Length of Stay',
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
    widgets: [
      {
        type: 'input',
        key: 'mobile',
        label: 'Mobile No.',
        placeholder: 'Mobile No.'
      },
      {
        type: 'input',
        key: 'residenceNo',
        label: 'Residence No.',
        placeholder: 'Residence No.'
      },
      {
        type: 'input',
        key: 'officeNo',
        label: 'Office No.',
        placeholder: 'Office No.'
      },
      {
        type: 'input',
        key: 'email',
        label: 'E-mail',
        placeholder: 'E-mail'
      },
      {
        type: 'input',
        key: 'gsis',
        label: 'GSIS',
        placeholder: 'GSIS'
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
        label: 'Mobile No.',
        placeholder: 'Mobile No.'
      },
      {
        type: 'input',
        key: 'employee',
        label: 'Employee No.',
        placeholder: 'Employee No.'
      }
    ]
  },
  // educationalBackground
  educationalBackground: {
    title: 'Educational Background',
    section: 'educationalBackground',
    span: 8,
    widgets: [
      {
        type: 'select',
        key: 'educationalAttainment',
        label: 'Educational Attainment',
        list: educationalAttainmentOpts,
        placeholder: 'Educational Attainment'
      },
      {
        type: 'input',
        key: 'lastSchoolAttended',
        label: 'Attended Last School',
        placeholder: 'Attended Last School'
      }
    ]
  },
  // employmentInformation
  employmentInformation: {
    title: 'Employment Information',
    section: 'employmentInformation',
    span: 8,
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
          list: common.housingOwnershipTypeOpts,
          placeholder: 'Type of Ownership'
        }
      ],
      stay: {
        title: 'Length of Stay',
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
    widgets: [
      {
        type: 'input',
        key: 'employer',
        label: 'Employer',
        placeholder: 'Employer'
      },
      {
        type: 'input',
        key: 'designation',
        label: 'Rank / Designation',
        placeholder: 'Rank / Designation'
      },
      {
        type: 'input',
        key: 'industryExpYear',
        label: 'Length of Service',
        placeholder: 'Length of Service'
      },
      {
        type: 'input',
        key: 'depEdRegion',
        label: 'DepEd Region',
        placeholder: 'DepEd Region'
      },
      {
        type: 'input',
        key: 'depEdDivision',
        label: 'DepEd Division',
        placeholder: 'DepEd Division'
      },
      {
        type: 'input',
        key: 'depEdStation',
        label: 'DepEd Station',
        placeholder: 'DepEd Station'
      },
      {
        type: 'select',
        key: 'employmentStatus',
        label: 'Employment Status',
        list: employmentStatusOpts,
        placeholder: 'Employment Status'
      },
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email'
      }
    ]
  },
  // spouseInformation
  spouseInformation: {
    title: 'Spouse Information',
    section: 'spouseInformation',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'birthDay',
        label: 'Birthday',
        placeholder: 'Birthday'
      },
      {
        type: 'input',
        key: 'birthPlace',
        label: 'Place of Birth',
        placeholder: 'Place of Birth'
      },
      {
        type: 'input',
        key: 'mobile',
        label: 'Mobile No.',
        placeholder: 'Mobile No.'
      },
      {
        type: 'input',
        key: 'employer',
        label: 'Employer',
        placeholder: 'Employer'
      },
      {
        type: 'input',
        key: 'employerTel',
        label: 'Employer Tel',
        placeholder: 'Employer Tel'
      },
      {
        type: 'input',
        key: 'grossIncome',
        label: 'Gross Income',
        placeholder: 'Gross Income'
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
    employerAddress: {
      title: 'Employer Address',
      key: 'employerAddress',
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
        title: 'Length of Stay',
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
      widgets: [
        {
          type: 'checkbox',
          key: 'purpose',
          label: 'Purpose',
          placeholder: 'Purpose',
          list: purposeOpts,
          rules: {
            message: 'Purpose',
            type: 'string'
          }
        }
      ]
    }
  },
  // disbursalMode
  disbursalMode: {
    title: 'Disbursal Mode',
    section: 'disbursalMode',
    span: 8,
    widgets: [
      {
        type: 'input',
        key: 'networkBankCASA',
        label: 'BDO Network Bank CASA',
        placeholder: 'BDO Network Bank CASA'
      },
      {
        type: 'input',
        key: 'casa',
        label: 'BDO CASA',
        placeholder: 'BDO CASA'
      },
      {
        type: 'input',
        key: 'payrollAccount',
        label: 'Payroll Account',
        placeholder: 'Payroll Account'
      },
      {
        type: 'input',
        key: 'others',
        label: 'Others',
        placeholder: 'Others'
      }
    ]
  },
  //characterReferences
  characterReferences: {
    title: 'Character References',
    section: 'characterReferences',
    span: 8,
    characterReferencesWidgets: [],
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
        key: 'contact',
        label: 'Contact',
        placeholder: 'Contact',
        rules: {
          message: 'Contact'
        }
      },
      {
        type: 'input',
        isObj: false,
        key: 'relationship',
        label: 'Relationship',
        placeholder: 'Relationship',
        rules: {
          message: 'Relationship'
        }
      }
    ]
  },
  // financialInformation
  financialInformation: {
    title: 'Financial Information',
    section: 'financialInformation',
    span: 8,
    revenueDetails: {
      title: 'Revenue Details',
      key: 'revenueDetails',
      revenueDetailsWidgets: [],
      sourceOfIncome: {
        title: 'Source Of Income',
        key: 'sourceOfIncome',
        widgets: []
      },
      totalIncome: {
        title: 'Total Income',
        key: 'totalIncome',
        widgets: [
          {
            type: 'input',
            key: 'grossAmount',
            label: 'Gross Amount',
            placeholder: 'Gross Amoun'
          },
          {
            type: 'input',
            key: 'netAmount',
            label: 'Net Amount',
            placeholder: 'Net Amount'
          }
        ]
      },
      widgets: [
        {
          type: 'select',
          key: 'incomeType',
          label: 'Income Type',
          list: incomeTypeOpts,
          placeholder: 'incomeType'
        },
        {
          type: 'input',
          key: 'source',
          label: 'Source',
          placeholder: 'Source',
          rules: {
            message: 'Source'
          }
        },
        {
          type: 'input',
          key: 'grossAmount',
          label: 'Gross Amount',
          placeholder: 'Gross Amount',
          rules: {
            message: 'Gross Amount'
          }
        },
        {
          type: 'input',
          key: 'netAmount',
          label: 'Net Amount',
          placeholder: 'Net Amount',
          rules: {
            message: 'Net Amount'
          }
        },
        {
          type: 'select',
          key: 'frequency',
          label: 'Frequency',
          list: frequency,
          placeholder: 'Frequency'
        }
      ]
    },
    creditCardInformation: {
      title: 'CreditCard Information',
      key: 'creditCardInformation',
      widgets: [
        {
          type: 'input',
          key: 'creditCard',
          label: 'Credit Card',
          placeholder: 'Credit Card',
          rules: {
            message: 'Credit Card'
          }
        },
        {
          type: 'input',
          isObj: true,
          key: 'creditLimit',
          label: 'Credit Limit',
          placeholder: 'Credit Limit',
          rules: {
            message: 'Credit Limit'
          }
        }
      ]
    },
    widgets: [
      {
        type: 'select',
        key: 'sourceOfFunds',
        label: 'Source Of Funds',
        list: sourceOfFundsOpts,
        placeholder: 'Source Of Funds'
      },
      {
        type: 'input',
        key: 'sourceOfFunds',
        isEdit: false,
        label: 'Source Of Funds',
        list: sourceOfFundsOpts,
        placeholder: 'Source Of Funds',
        rules: {
          message: 'Source Of Funds'
        }
      },
      {
        type: 'input',
        key: 'existingBDONetworkBankAccount',
        isEdit: false,
        label: 'Existing BDO Network Bank Account',
        placeholder: 'Existing BDO Network Bank Account',
        rules: {
          message: 'Existing BDO Network Bank Account'
        }
      },
      {
        type: 'select',
        key: 'existingBDONetworkBankAccount',
        label: 'Existing BDO Network Bank Account',
        list: networkBankAccountOpts,
        placeholder: 'Existing BDO Network Bank Account'
      },
      {
        type: 'input',
        key: 'existingBDOAccount',
        isEdit: false,
        label: 'Existing BDO Account',
        placeholder: 'Existing BDO  Account',
        rules: {
          message: 'Existing BDO Account'
        }
      },
      {
        type: 'select',
        key: 'existingBDOAccount',
        label: 'Existing BDO Account',
        list: networkBankAccountOpts,
        placeholder: 'Existing BDO Account'
      },
      {
        type: 'input',
        key: 'otherBankAccount',
        isEdit: false,
        label: 'Other Bank Account',
        placeholder: 'Other Bank Account',
        rules: {
          message: 'Other Bank Account'
        }
      },
      {
        type: 'select',
        key: 'otherBankAccount',
        label: 'Other Bank Account',
        list: networkBankAccountOpts,
        placeholder: 'Other Bank Account'
      }
    ]
  }
}

export const teacherProduct_zh = {
  Channel: '渠道',
  Code: '渠道代码',
  Name: '渠道名称',
  EditStatus: '编辑状态',
  Signature: '签名状态',
  Gender: '性别',
  Citizenship: '国籍',
  CivilStatus: '婚姻状态',
  Age: '年龄',
  BirthPlace: '出生地',
  BirthDay: '生日',
  NumberOfDependent: '抚养人数'
}

export const teacherProduct_en = {
  Channel: 'Channel',
  Code: 'Code',
  Name: 'Name',
  EditStatus: 'Edit Status',
  Signature: 'Signature Status',
  Gender: 'Gender',
  Citizenship: 'Citizenship',
  CivilStatus: 'Civil Status',
  Age: 'Age',
  BirthPlace: 'Place of Birth',
  BirthDay: 'Birth Day',
  NumberOfDependent: 'No. of Dependent/s'
}

export default {
  widgetsOpts,
  gender,
  civilStatusOpts,
  employmentStatusOpts,
  widgetsModel,
  sourceOfFundsOpts,
  networkBankAccountOpts,
  purposeOpts,
  incomeTypeOpts,
  frequency,
  educationalAttainmentOpts
}
