/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/apply/loan/optsConfig/moblieApplyConfig.js
 * @Date         : 2022-08-29 16:38:52
 * @LastEditTime : 2022-12-02 17:28:00
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from '@/utils'
import newClientProductCongfig from './newClientProductCongfig'
import teacherProductConfig from '@/views/admin/apply/loan/optsConfig/teacherProductConfig'

// ### paid type
// | 字段名   | 字段中文名 | 值       |
// | -------- | ---------- | -------- |
// | Partnership  | 伙伴     | PARTNERSHIP  |
// | Corporation | 公司     | CORPORATION |
const businessTypeOpts = [
  { label: 'Partnership', value: 'PARTNERSHIP' },
  { label: 'Corporation', value: 'CORPORATION' }
]

const LoanTypeOpts = [
  { label: 'Individual', value: 'INDIVIDUAL' },
  { label: 'Corporate', value: 'CORPORATE' }
]

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
    // name
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
    // spouseInformation
    spouseInformation: {
      title: 'Spouse Information',
      key: 'spouseInformation',
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
      }
    },
    // educationalBackground
    educationalBackground: {
      title: 'Educational Background',
      key: 'educationalBackground',
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
    widgets: [
      {
        type: 'select',
        key: 'gender',
        label: 'Gender',
        list: teacherProductConfig.gender,
        placeholder: 'Gender'
      },
      {
        type: 'date',
        key: 'birthDay',
        label: 'BirthDay',
        valueFormat: 'MM-dd-yyyy',
        placeholder: 'BirthDay',
        rules: {
          message: 'BirthDay'
        }
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
    widgets: [
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email'
      }
    ],
    mobile: {
      title: 'Mobile',
      key: 'mobile',
      widgets: [
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
        // {
        //   type: 'input',
        //   key: 'countryCode',
        //   label: 'Country Code',
        //   placeholder: 'Country Code'
        // }
      ]
    },
    homeLandLine: {
      title: 'HomeLand Line',
      key: 'homeLandLine',
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
        }
      ]
    },
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
      ]
    },
    billingContact: {
      title: 'Billing Contact',
      key: 'billingContact',
      widgets: [
        {
          type: 'input',
          key: 'email',
          label: 'Email',
          placeholder: 'Email'
        }
      ],
      mobile: {
        title: 'Mobile',
        key: 'mobile',
        widgets: [
          {
            type: 'input',
            key: 'number',
            label: 'Number',
            placeholder: 'Number'
          }
          // {
          //   type: 'input',
          //   key: 'countryCode',
          //   label: 'Country Code',
          //   placeholder: 'Country Code'
          // }
        ]
      },
      homeLandLine: {
        title: 'HomeLand Line',
        key: 'homeLandLine',
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
          }
        ]
      },
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
        ]
      }
    }
  },
  // employeeInformation
  employeeInformation: {
    title: 'Employee Information',
    section: 'employeeInformation',
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'Name',
        placeholder: 'Name'
      },
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email'
      },
      {
        type: 'select',
        key: 'employmentType',
        label: 'Employment Type',
        list: newClientProductCongfig.employmentTypeOpts,
        placeholder: 'Employment Type'
      }
    ],
    mobile: {
      title: 'Mobile',
      key: 'mobile',
      widgets: [
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
        // {
        //   type: 'input',
        //   key: 'countryCode',
        //   label: 'Country Code',
        //   placeholder: 'Country Code'
        // }
      ]
    },
    homeLandLine: {
      title: 'HomeLand Line',
      key: 'homeLandLine',
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
        }
      ]
    },
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
      ]
    },
    billingContact: {
      title: 'Billing Contact',
      key: 'billingContact',
      widgets: [
        {
          type: 'input',
          key: 'email',
          label: 'Email',
          placeholder: 'Email'
        }
      ],
      mobile: {
        title: 'Mobile',
        key: 'mobile',
        widgets: [
          {
            type: 'input',
            key: 'number',
            label: 'Number',
            placeholder: 'Number'
          }
          // {
          //   type: 'input',
          //   key: 'countryCode',
          //   label: 'Country Code',
          //   placeholder: 'Country Code'
          // }
        ]
      },
      homeLandline: {
        title: 'HomeLand Line',
        key: 'homeLandline',
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
          }
        ]
      },
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
        ]
      }
    }
  },
  // corporateInformation
  corporateInformation: {
    title: 'Corporate Information',
    section: 'corporateInformation',
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'Name',
        placeholder: 'Name'
      },
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email'
      },
      {
        type: 'select',
        key: 'businessType',
        label: 'Business Type',
        list: businessTypeOpts,
        placeholder: 'Business Type'
      },
      {
        type: 'select',
        key: 'nature',
        label: 'Nature',
        list: newClientProductCongfig.naturesOpts,
        placeholder: 'Nature'
      },
      {
        type: 'input',
        key: 'tin',
        label: 'Tin',
        placeholder: 'Tin'
      },
      {
        type: 'input',
        key: 'sss',
        label: 'sss',
        placeholder: 'sss'
      }
    ],
    mobile: {
      title: 'Mobile',
      key: 'mobile',
      widgets: [
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
        // {
        //   type: 'input',
        //   key: 'countryCode',
        //   label: 'Country Code',
        //   placeholder: 'Country Code'
        // }
      ]
    },
    homeLandLine: {
      title: 'HomeLand Line',
      key: 'homeLandLine',
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
        }
      ]
    },
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
      ]
    }
  },
  loanInformation: {
    title: 'Loan Information',
    section: 'loanInformation',
    widgets: [
      {
        type: 'input',
        key: 'amount',
        label: 'Amount',
        placeholder: 'Amount'
      },
      {
        type: 'input',
        key: 'purpose',
        label: 'Purpose',
        placeholder: 'Purpose'
      },
      {
        type: 'select',
        key: 'term',
        label: 'Term',
        list: utils.loan.productTimeOpts,
        placeholder: 'Term'
      },
      {
        type: 'select',
        key: 'currency',
        label: 'Currency',
        list: utils.common.currencyOpts,
        placeholder: 'Currency'
      }
    ]
  },
  //fileInformation 上传的文档
  fileInformation: {
    title: 'File Information',
    section: 'fileInformation',
    span: 7,
    fileInformationWidgets: [],
    widgets: [
      {
        type: 'input',
        key: 'key',
        label: 'Name',
        placeholder: 'Name'
      }
    ]
  },
  // internal
  agent: {
    title: 'Agent',
    section: 'agent',
    // gps
    gps: {
      title: 'GPS',
      key: 'gps',
      widgets: [
        // {
        //   type: 'input',
        //   key: 'longitude',
        //   label: 'Longitude',
        //   placeholder: 'Longitude',
        //   rules: {
        //     message: 'Longitude'
        //   }
        // },
        // {
        //   type: 'input',
        //   key: 'latitude',
        //   label: 'Latitude',
        //   placeholder: 'Latitude',
        //   rules: {
        //     message: 'Latitude'
        //   }
        // },
        {
          type: 'input',
          key: 'address',
          label: 'Address',
          placeholder: 'Address',
          rules: {
            message: 'Address'
          }
        },
        {
          type: 'input',
          key: 'coord',
          label: 'Coord',
          placeholder: 'Coord',
          rules: {
            message: 'Coord'
          }
        },
        {
          type: 'input',
          key: 'accuracy',
          label: 'Accuracy (m)',
          placeholder: 'Accuracy',
          rules: {
            message: 'Accuracy'
          }
        }
      ]
    },
    // channel
    channel: {
      title: 'Channel',
      key: 'channel',
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
    // teller
    teller: {
      title: 'Teller',
      key: 'teller',
      widgets: [
        {
          type: 'input',
          key: 'name',
          label: 'Name',
          placeholder: 'Name'
        }
      ]
    }
  }
}

const carWidgetOpts = {
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
    // name
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
    // spouseInformation
    spouseInformation: {
      title: 'Spouse Information',
      key: 'spouseInformation',
      name: {
        title: 'Name',
        key: 'name',
        widgets: [
          {
            type: 'input',
            key: 'lastName',
            label: 'Last Name1',
            placeholder: 'Last Name',
            rules: {
              message: 'Last Name'
            }
          },
          {
            type: 'input',
            key: 'firstName',
            label: 'First Name2',
            placeholder: 'First Name',
            rules: {
              message: 'First Name'
            }
          },
          {
            type: 'input',
            key: 'middleName',
            label: 'Middle Name3',
            placeholder: 'Middle Name',
            rules: {
              message: 'Middle Name'
            }
          },
          {
            type: 'input',
            key: 'suffix',
            label: 'Suffix4',
            placeholder: 'Suffix',
            rules: {
              message: 'Suffix'
            }
          }
        ]
      }
    },
    // educationalBackground
    educationalBackground: {
      title: 'Educational Background',
      key: 'educationalBackground',
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
    widgets: [
      {
        type: 'select',
        key: 'gender',
        label: 'Gender',
        list: teacherProductConfig.gender,
        placeholder: 'Gender'
      },
      {
        type: 'date',
        key: 'birthDay',
        label: 'BirthDay',
        valueFormat: 'MM-dd-yyyy',
        placeholder: 'BirthDay',
        rules: {
          message: 'BirthDay'
        }
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
    widgets: [
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email'
      }
    ],
    mobile: {
      title: 'Mobile',
      key: 'mobile',
      widgets: [
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
        // {
        //   type: 'input',
        //   key: 'countryCode',
        //   label: 'Country Code',
        //   placeholder: 'Country Code'
        // }
      ]
    },
    homeLandLine: {
      title: 'HomeLand Line',
      key: 'homeLandLine',
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
        }
      ]
    },
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
      ]
    },
    billingContact: {
      title: 'Billing Contact',
      key: 'billingContact',
      widgets: [
        {
          type: 'input',
          key: 'email',
          label: 'Email',
          placeholder: 'Email'
        }
      ],
      mobile: {
        title: 'Mobile',
        key: 'mobile',
        widgets: [
          {
            type: 'input',
            key: 'number',
            label: 'Number',
            placeholder: 'Number'
          }
          // {
          //   type: 'input',
          //   key: 'countryCode',
          //   label: 'Country Code',
          //   placeholder: 'Country Code'
          // }
        ]
      },
      homeLandLine: {
        title: 'HomeLand Line',
        key: 'homeLandLine',
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
          }
        ]
      },
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
        ]
      }
    }
  },
  // employeeInformation
  employeeInformation: {
    title: 'Employee Information',
    section: 'employeeInformation',
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'Name',
        placeholder: 'Name'
      },
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email'
      },
      {
        type: 'select',
        key: 'employmentType',
        label: 'Employment Type',
        list: newClientProductCongfig.employmentTypeOpts,
        placeholder: 'Employment Type'
      }
    ],
    mobile: {
      title: 'Mobile',
      key: 'mobile',
      widgets: [
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
        // {
        //   type: 'input',
        //   key: 'countryCode',
        //   label: 'Country Code',
        //   placeholder: 'Country Code'
        // }
      ]
    },
    homeLandLine: {
      title: 'HomeLand Line',
      key: 'homeLandLine',
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
        }
      ]
    },
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
      ]
    },
    billingContact: {
      title: 'Billing Contact',
      key: 'billingContact',
      widgets: [
        {
          type: 'input',
          key: 'email',
          label: 'Email',
          placeholder: 'Email'
        }
      ],
      mobile: {
        title: 'Mobile',
        key: 'mobile',
        widgets: [
          {
            type: 'input',
            key: 'number',
            label: 'Number',
            placeholder: 'Number'
          }
          // {
          //   type: 'input',
          //   key: 'countryCode',
          //   label: 'Country Code',
          //   placeholder: 'Country Code'
          // }
        ]
      },
      homeLandline: {
        title: 'HomeLand Line',
        key: 'homeLandline',
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
          }
        ]
      },
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
        ]
      }
    }
  },
  // corporateInformation
  corporateInformation: {
    title: 'Corporate Information',
    section: 'corporateInformation',
    widgets: [
      {
        type: 'input',
        key: 'name',
        label: 'Name',
        placeholder: 'Name'
      },
      {
        type: 'input',
        key: 'email',
        label: 'Email',
        placeholder: 'Email'
      },
      {
        type: 'select',
        key: 'businessType',
        label: 'Business Type',
        list: businessTypeOpts,
        placeholder: 'Business Type'
      },
      {
        type: 'select',
        key: 'nature',
        label: 'Nature',
        list: newClientProductCongfig.naturesOpts,
        placeholder: 'Nature'
      },
      {
        type: 'input',
        key: 'tin',
        label: 'Tin',
        placeholder: 'Tin'
      },
      {
        type: 'input',
        key: 'sss',
        label: 'sss',
        placeholder: 'sss'
      }
    ],
    mobile: {
      title: 'Mobile',
      key: 'mobile',
      widgets: [
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
        // {
        //   type: 'input',
        //   key: 'countryCode',
        //   label: 'Country Code',
        //   placeholder: 'Country Code'
        // }
      ]
    },
    homeLandLine: {
      title: 'HomeLand Line',
      key: 'homeLandLine',
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
        }
      ]
    },
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
      ]
    }
  },
  //
  loanInformation: {
    title: 'Loan Information',
    section: 'loanInformation',
    widgets: [
      {
        type: 'input',
        key: 'amount',
        label: 'Amount',
        placeholder: 'Amount'
      },
      {
        type: 'input',
        key: 'purpose',
        label: 'Purpose',
        placeholder: 'Purpose'
      },
      {
        type: 'select',
        key: 'term',
        label: 'Term',
        list: utils.loan.productTimeOpts,
        placeholder: 'Term'
      },
      {
        type: 'select',
        key: 'currency',
        label: 'Currency',
        list: utils.common.currencyOpts,
        placeholder: 'Currency'
      }
    ]
  },
  // carPurchaseInformation
  carPurchaseInformation: {
    title: 'Car Purchase Information',
    section: 'carPurchaseInformation',
    widgets: [
      {
        type: 'input',
        key: 'poNumber',
        label: 'PO Number',
        placeholder: 'poNumber'
      },
      {
        type: 'input',
        key: 'carNumber',
        label: 'Car Number',
        placeholder: 'carNumber'
      },
      {
        type: 'input',
        key: 'purchasePriceIncludeVat',
        label: 'Purchase Price（Include Vat）',
        placeholder: 'purchasePriceIncludeVat'
      },
      {
        type: 'input',
        key: 'downPaymentIncludeVat',
        label: 'Down Payment(Include Vat)',
        placeholder: 'downPaymentIncludeVat'
      },
      {
        type: 'input',
        key: 'dealerNo',
        label: 'Dealer No',
        placeholder: 'dealerNo'
      },
      {
        type: 'input',
        key: 'dealerName',
        label: 'Dealer Name',
        placeholder: 'dealerName'
      }
    ],
    carInformation: {
      title: 'Car Information',
      key: 'carInformation',
      widgets: [
        {
          type: 'input',
          key: 'carNumber',
          label: 'Car Number',
          placeholder: 'carNumber'
        },
        {
          type: 'input',
          key: 'carType',
          label: 'Car Type',
          placeholder: 'carType'
        },
        {
          type: 'input',
          key: 'carModel',
          label: 'Car Model',
          placeholder: 'carModel'
        },
        {
          type: 'input',
          key: 'downPaymentIncludeVat',
          label: 'Down Payment(Include Vat)',
          placeholder: 'downPaymentIncludeVat'
        },
        {
          type: 'input',
          key: 'carBrand',
          label: 'Car Brand',
          placeholder: 'carBrand'
        },
        {
          type: 'input',
          key: 'carValue',
          label: 'Car Value',
          placeholder: 'carValue'
        }
      ]
    },
    carDrivingLicenseInformation: {
      title: 'Car Driving License Information',
      key: 'carDrivingLicenseInformation',
      widgets: [
        {
          type: 'input',
          key: 'licenseNo',
          label: 'License No',
          placeholder: 'licenseNo'
        }
      ]
    },
    carRegistrationCertificateInformation: {
      title: 'Car Registration Certificate Information',
      key: 'carRegistrationCertificateInformation',
      widgets: [
        {
          type: 'input',
          key: 'carRegisterNo',
          label: 'Car Register No',
          placeholder: 'carRegisterNo'
        }
      ]
    }
  },
  //fileInformation 上传的文档
  fileInformation: {
    title: 'File Information',
    section: 'fileInformation',
    span: 7,
    fileInformationWidgets: [],
    widgets: [
      {
        type: 'input',
        key: 'key',
        label: 'Name',
        placeholder: 'Name'
      }
    ]
  },
  // internal
  agent: {
    title: 'Agent',
    section: 'agent',
    // gps
    gps: {
      title: 'GPS',
      key: 'gps',
      widgets: [
        // {
        //   type: 'input',
        //   key: 'longitude',
        //   label: 'Longitude',
        //   placeholder: 'Longitude',
        //   rules: {
        //     message: 'Longitude'
        //   }
        // },
        // {
        //   type: 'input',
        //   key: 'latitude',
        //   label: 'Latitude',
        //   placeholder: 'Latitude',
        //   rules: {
        //     message: 'Latitude'
        //   }
        // },
        {
          type: 'input',
          key: 'address',
          label: 'Address',
          placeholder: 'Address',
          rules: {
            message: 'Address'
          }
        },
        {
          type: 'input',
          key: 'coord',
          label: 'Coord',
          placeholder: 'Coord',
          rules: {
            message: 'Coord'
          }
        },
        {
          type: 'input',
          key: 'accuracy',
          label: 'Accuracy (m)',
          placeholder: 'Accuracy',
          rules: {
            message: 'Accuracy'
          }
        }
      ]
    },
    // channel
    channel: {
      title: 'Channel',
      key: 'channel',
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
    // teller
    teller: {
      title: 'Teller',
      key: 'teller',
      widgets: [
        {
          type: 'input',
          key: 'name',
          label: 'Name',
          placeholder: 'Name'
        }
      ]
    }
  }
}

export default {
  widgetsOpts,
  carWidgetOpts,
  businessTypeOpts,
  LoanTypeOpts
}
