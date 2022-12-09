/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/apply/loan/optsConfig/carProductConfig.js
 * @Date         : 2022-12-01 13:52:11
 * @LastEditTime : 2022-12-02 13:18:28
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import common from '@/utils/optsConfig/common'
import teacherProductConfig from '@/views/admin/apply/loan/optsConfig/teacherProductConfig'
import loan from '@/utils/optsConfig/loan'

const frequency = [
  { label: 'Day', value: 'D' },
  { label: 'Month', value: 'M' },
  { label: 'Year', value: 'Y' }
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
    title: 'Agent',
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
    section: 'signature',
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
        list: teacherProductConfig.gender,
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
        list: teacherProductConfig.civilStatusOpts,
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
        list: teacherProductConfig.educationalAttainmentOpts,
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
        list: teacherProductConfig.employmentStatusOpts,
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
      },
      {
        type: 'input',
        key: 'purpose',
        label: 'Purpose',
        placeholder: 'purpose',
        rules: {
          message: 'purpose'
        }
      }
    ]
    // purpose: {
    //   title: 'Purpose',
    //   key: 'purpose',
    //   widgets: [
    //     {
    //       type: 'checkbox',
    //       key: 'purpose',
    //       label: 'Purpose',
    //       placeholder: 'Purpose',
    //       list: teacherProductConfig.purposeOpts,
    //       rules: {
    //         message: 'Purpose',
    //         type: 'string'
    //       }
    //     }
    //   ]
    // }
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
          list: teacherProductConfig.incomeTypeOpts,
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
        list: teacherProductConfig.sourceOfFundsOpts,
        placeholder: 'Source Of Funds'
      },
      {
        type: 'input',
        key: 'sourceOfFunds',
        isEdit: false,
        label: 'Source Of Funds',
        list: teacherProductConfig.sourceOfFundsOpts,
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
        list: teacherProductConfig.networkBankAccountOpts,
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
        list: teacherProductConfig.networkBankAccountOpts,
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
        list: teacherProductConfig.networkBankAccountOpts,
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
  widgetsModel,
  frequency
}
