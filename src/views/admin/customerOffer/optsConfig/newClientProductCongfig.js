/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/optsConfig/newClientProductCongfig.js
 * @Date         : 2022-08-16 10:36:35
 * @LastEditTime : 2022-08-22 16:03:08
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import common from '@/utils/optsConfig/common'
import loan from '@/utils/optsConfig/loan'
import teacherProductConfig from '@/views/admin/customerOffer/optsConfig/teacherProductConfig'

// 是否状态
const bdocustomerOpts = [
  { label: 'configType.yes', value: true },
  { label: 'configType.no', value: false }
]

// ### cif type
// | 字段名                               | 字段中文名                 | 值             |
// | ------------------------------------ | -------------------------- | -------------- |
// | Account Owner                        | 账户所有者                 | ACCOUNT_OWNER  |
// | Business Owner / Officer / Signatory | 企业所有者/高级职员/签字人 | BUSINESS_OWNER |
const cifTypeOpts = [
  { label: 'Account Owner', value: 'ACCOUNT_OWNER' },
  { label: 'Business Owner / Officer / Signatory', value: 'BUSINESS_OWNER' }
]

// ### bdo product type
// | 字段名            | 字段中文名 | 值                |
// | ----------------- | ---------- | ----------------- |
// | Deposits          | 存款       | DEPOSITS          |
// | Cards             | 信用卡     | CARDS             |
// | Loans             | 贷款       | LOANS             |
// | Wealth Management | 理财       | WEALTH_MANAGEMENT |
// | Insurance         | 保险       | INSURANCE         |
const bdoProductTypeOpts = [
  { label: 'Deposits', value: 'DEPOSITS' },
  { label: 'Cards', value: 'CARDS' },
  { label: 'Loans', value: 'LOANS' },
  { label: 'Wealth Management', value: 'WEALTH_MANAGEMENT' },
  { label: 'Insurance  ', value: 'INSURANCE' }
]

// ### esidency
// | 字段名       | 字段中文名 | 值           |
// | ------------ | ---------- | ------------ |
// | Resident     | 居民       | RESIDENT     |
// | Non-resident | 非居民     | NON_RESIDENT |
const esidencyOpts = [
  { label: 'Resident', value: 'RESIDENT' },
  { label: 'Non-resident', value: 'NON_RESIDENT' }
]

// ### biometrics
// | 字段名 | 字段中文名 | 值     |
// | ------ | ---------- | ------ |
// | Face   | 人脸       | FACE   |
// | Finger | 指纹       | FINGER |
const biometricsOpts = [
  { label: 'Face', value: 'FACE' },
  { label: 'Finger', value: 'FINGER' }
]

// 用途
// ### purpose
// | 字段名                                           | 字段中文名                        |
// | ------------------------------------------------ | --------------------------------- |
// | Home Improvement                                 | 家居装修                          |
// | Appliance / Furniture / Electronics              | 电器/家具/电子产品                |
// | Medical Expenses                                 | 医疗费用                          |
// | Debt Consolidation                               | 债务合并                          |
// | Education / Tuition Fee                          | 教育/学费                         |
// | Travel                                           | 旅行                              |
// | Purchase of Luxury Items                         | 购买奢侈品                        |
// | Purchase of Auto Accessories                     | 购买汽车配件                      |
// | Secured (Home/Auto) Product Purchase(for equity) | 担保（家庭/汽车）产品购买（股权） |
// | Others                                           | 其他（可输入）                    |
const purposeOpts = [
  { label: 'Travel', value: 'Travel' },
  { label: 'Home Improvement ', value: 'Home Improvement ' },
  { label: 'Appliance / Furniture / Electronics ', value: 'Appliance / Furniture / Electronics ' },
  { label: 'Medical Expenses', value: 'Medical Expenses' },
  { label: 'Debt Consolidation ', value: 'Debt Consolidation ' },
  { label: 'Education / Tuition Fee ', value: 'Education / Tuition Fee ' },
  { label: 'Purchase of Luxury Items ', value: 'Purchase of Luxury Items ' },
  { label: 'Purchase of Auto Accessories ', value: 'Purchase of Auto Accessories ' },
  { label: 'Secured (Home/Auto) Product Purchase(for equity)', value: 'Secured (Home/Auto) Product Purchase(for equity)' },
  { label: 'Others', value: 'Others' }
]

// 信用卡类型
// ### credit card type
// | 字段名           | 字段中文名 | 值               |
// | ---------------- | ---------- | ---------------- |
// | Mastercard       | 万事达卡   | MASTERCARD       |
// | VISA             | VISA信用卡 | VISA             |
// | UnionPay         | 银联       | UNIONPAY         |
// | JCB              | JCB卡      | JCB              |
// | Diners Club      | 大来卡     | DINERS_CLUB      |
// | American Express | 美国运通   | AMERICAN_EXPRESS |
const creditCardTypeOpts = [
  { label: 'Mastercard', value: 'MASTERCARD' },
  { label: 'VISA', value: 'VISA' },
  { label: 'UnionPay', value: 'UNIONPAY' },
  { label: 'JCB', value: 'JCB' },
  { label: 'Diners Club', value: 'DINERS_CLUB' },
  { label: 'American Express', value: 'AMERICAN_EXPRESS' }
]

// 信用卡子类
// ### credit card sub type
// | 字段名           | 字段中文名 | 值               | 备注                                    |
// | ---------------- | ---------- | ---------------- | --------------------------------------- |
// | ShopMore         |            | SHOPMORE         | Mastercard                              |
// | Standard         |            | STANDARD         | Mastercard                              |
// | Bench            |            | BENCH            | Mastercard                              |
// | Gold             |            | GOLD             | Mastercard、VISA、UnionPay、JCB         |
// | Titanium         |            | TIANIUM          | Mastercard                              |
// | Platinum         |            | PLATINUM         | Mastercard、VISA、JCB、American Express |
// | Installment Card |            | INSTALLMENT_CARD | Mastercard                              |
// | Classic          |            | CLASSIC          | VISA                                    |
// | Diamond          |            | DIAMOND          | UnionPay                                |
// | Lucky Cat        |            | LUCKY_CAT        | JCB                                     |
// | International    |            | INTERNATIONAL    | Diners Club                             |
// | Premiere         |            | PREMIERE         | Diners Club                             |
// | Blue             |            | BULE             | American Express                        |
// | Cashback         |            | CASHBACK         | American Express                        |
const creditCardSubTypeOpts = [
  { label: 'ShopMore', value: 'SHOPMORE' },
  { label: 'Standard', value: 'STANDARD' },
  { label: 'Bench', value: 'BENCH' },
  { label: 'Gold', value: 'GOLD' },
  { label: 'Titanium', value: 'TIANIUM' },
  { label: 'Installment Card', value: 'INSTALLMENT_CARD' },
  { label: 'Platinum', value: 'PLATINUM' },
  { label: 'Classic', value: 'CLASSIC' },
  { label: 'Lucky Cat', value: 'LUCKY_CAT' },
  { label: 'Diamond', value: 'DIAMOND' },
  { label: 'International', value: 'INTERNATIONAL' },
  { label: 'Premiere', value: 'PREMIERE' },
  { label: 'Blue', value: 'BULE' },
  { label: 'Cashback', value: 'CASHBACK' }
]

// 信用卡邮寄至
// ### deliver address
// | 字段名                  | 字段中文名 | 值   |
// | ----------------------- | ---------- | ---- |
// | Home Address            | 家庭地址   | HOME |
// | Work / Business Address | 公司地址   | WORK |
const deliverAddressOpts = [
  { label: 'Home Address', value: 'HOME' },
  { label: 'Work / Business Address', value: 'WORK' }
]

// 信用卡邮寄至
// ### deliver email
// | 字段名                        | 字段中文名 | 值       |
// | ----------------------------- | ---------- | -------- |
// | Personal Email Address        | 个人邮箱   | PERSONAL |
// | Work / Business Email Address | 企业邮箱   | WORK     |
const deliverEmailOpts = [
  { label: 'Personal Email Address', value: 'PERSONAL' },
  { label: 'Work / Business Email Address', value: 'WORK' }
]

// ### funds source
// | 字段名                                                       | 字段中文名      | 值                         |
// | ------------------------------------------------------------ | --------------- | -------------------------- |
// | Employed - Fixed Income                                      | 雇佣-固定收入   | FIXED_INCOME     |
// | Employed - Variable Income                                   | 雇佣-可变收入   | VARIABLE_INCOME |
// | Self-Employed - Business Income                              | 自营-营业收入   | BUSINESS_INCOME  |
// | Remittances                                                  | 汇款            | REMITTANCES     |
// | Pension                                                      | 退休金          | Pension         |
// | Personal Savings / Retirement Proceeds                       | 个人储蓄/退休金 | PERSONAL_SAVINGS |
// | Allowance                                                    | 津贴            | ALLOWANCE        |
// | Inheritance                                                  | 遗产            | INHERITANCE    |
// | Investment / Dividend Income                                 | 投资/股息收入   | INVESTMENT      |
// | Rental Income                                                | 租金收入        | RENTAL_INCOME    |
// | Sale of Asset / Property                                     | 出售资产/财产   | SALE_OF_ASSET    |
// | Other Sources (Lottery, Donations, Tax Refunds, and Insurance/Legal Claims) | 其他            | OTHERS           |
const fundSourceOpts = [
  { label: 'Employed - Fixed Income', value: 'FIXED_INCOME' },
  { label: 'Employed - Variable Income', value: 'VARIABLE_INCOME' },
  { label: 'Self-Employed - Business Income', value: 'BUSINESS_INCOME' },
  { label: 'Remittances', value: 'REMITTANCES' },
  { label: 'Pension', value: 'PENSION' },
  { label: 'Personal Savings / Retirement Proceeds', value: 'PERSONAL_SAVINGS' },
  { label: 'Allowance', value: 'ALLOWANCE' },
  { label: 'Investment / Dividend Income', value: 'INVESTMENT' },
  { label: 'Inheritance', value: 'INHERITANCE' },
  { label: 'Rental Income', value: 'RENTAL_INCOME' },
  { label: 'Sale of Asset / Property', value: 'SALE_OF_ASSET' },
  { label: 'Other Sources (Lottery, Donations, Tax Refunds, and Insurance/Legal Claims)', value: 'OTHERS' }
]

// ### employment sub type
// | 字段名                        | 字段中文名     | 值                          | 备注     |
// | ----------------------------- | -------------- | --------------------------- | -------- |
// | Private                       | 私营           | PRIVATE                     | EMPLOYED |
// | Government                    | 国企           | GOVERNMENT                  | EMPLOYED |
// | Bangko Sentral ng Pilipinas   | 菲律宾中央银行 | BANGKO_SENTRAL_NG_PILIPINAS | EMPLOYED |
// | Non-Governmental Organization | 非政府组织     | NON_GOVERNMENTAL            | EMPLOYED |
// | Overseas Filipino Worker      | 海外菲律宾工人 | OVERSEAS_FILIPINO_WORKER    | EMPLOYED |
// | Professional                  | 专业技术人员   | PROFESSIONAL                | SELF     |
// | Sole-Proprietor               | 独资经营者     | SOLE_PROPRIETOR             | OWNERS   |
// | Partner                       | 合伙人         | PARTNER                     | OWNERS   |
// | Stockholder                   | 股东           | STOCKHOLDER                 | OWNERS   |
const employmentSubTypeOpts = [
  { label: 'Private', value: 'PRIVATE' },
  { label: 'Government', value: 'GOVERNMENT' },
  { label: 'Bangko Sentral ng Pilipinas', value: 'BANGKO_SENTRAL_NG_PILIPINAS' },
  { label: 'Non-Governmental Organization', value: 'NON_GOVERNMENTAL' },
  { label: 'Overseas Filipino Worker', value: 'OVERSEAS_FILIPINO_WORKER' },
  { label: 'Professional', value: 'PROFESSIONAL' },
  { label: 'Sole-Proprietor', value: 'SOLE_PROPRIETOR' },
  { label: 'Partner', value: 'PARTNER' },
  { label: 'Stockholder', value: 'STOCKHOLDER' }
]

// ### employment type
// | 字段名              | 字段中文名 | 值       |
// | ------------------- | ---------- | -------- |
// | For Employed        | 雇员       | EMPLOYED |
// | For Self-Employed   | 自营       | SELF     |
// | For Business Owners | 企业所有者 | OWNERS   |
const employmentTypeOpts = [
  { label: 'For Employed', value: 'EMPLOYED' },
  { label: 'For Self-Employed  ', value: 'SELF' },
  { label: 'For Business Owners', value: 'OWNERS' }
]

// ### natures

// | 字段名                                                       | 字段中文名 | 值   |
// | ------------------------------------------------------------ | ---------- | ---- |
// | Accounting / Auditing / Tax Practice Services                |            | ACT  |
// | Legal Services                                               |            | LEG  |
// | Architecture / Engineering                                   |            | ANE  |
// | Advertising / Marketing                                      |            | ADV  |
// | Other Professional Services / Consultancy / Coaching         |            | SVC  |
// | Pawnshop                                                     |            | PWN  |
// | Lending                                                      |            | LDG  |
// | Money Service Business - Electronic Money Issuer             |            | MSE  |
// | Money Service Business - Virtual Currency Exchange           |            | MSV  |
// | Money Service Business - Remittance Transfer Company         |            | MSR  |
// | Money Service Business - Foreign Exchange Dealer / Money Changer |            | MSF  |
// | Banking                                                      |            | BAN  |
// | Insurance                                                    |            | INS  |
// | Securities Broker / Dealer                                   |            | SBD  |
// | Construction and Civil Engineering                           |            | CON  |
// | Real Estate Brokerage and Sales                              |            | REL  |
// | Media                                                        |            | MED  |
// | Arts / Entertainment / Recreation                            |            | ENT  |
// | Sports / eSports                                             |            | SPO  |
// | Gambling / Casino / eGames                                   |            | GAM  |
// | Healthcare (Doctor, Dentist, Nurse, Psychiatrist and others) |            | HEA  |
// | Social Work / Non-Government and Non-Profit Organizations    |            | SOC  |
// | Education / Online Education                                 |            | EDU  |
// | Hotel / Accomodation / Restaurant / Food Services            |            | AFS  |
// | Travel / Travel Agencies                                     |            | TRA  |
// | Employment Agency / Human Resources                          |            | AGY  |
// | Business Process Outsourcing                                 |            | BPO  |
// | Security Agency / Services                                   |            | SEC  |
// | Private Household / Household Employee / Household Staff     |            | HOU  |
// | Information / Comunication / Telecommunication               |            | COM  |
// | Publishing / Printing                                        |            | PUB  |
// | Robotics / AI / Cloud / Data Engineering / Software Development / Cybersecurity |            | ICT  |
// | Manufacturing / Packaging                                    |            | MFG  |
// | Manufacturing / Trading of Firearms and Ammunition           |            | MFF  |
// | Art / Antiques Dealership                                    |            | ART  |
// | Car / Boat / Plane Dealership                                |            | CAR  |
// | Jewelry / Precious Metals / Precious Stones Dealership       |            | JEW  |
// | Wholesale / Retail Trade (Distribution & Sales) / E-Commerce / Online Selling |            | WRT  |
// | Repair Services                                              |            | REP  |
// | Transportation (Land, Sea and Air)                           |            | TRN  |
// | Shipping / Cargo / Storage                                   |            | SHI  |
// | Seaman / Seafarer                                            |            | SEA  |
// | Agriculture / Fishing                                        |            | AGR  |
// | Forestry                                                     |            | FOR  |
// | Mining / Quarrying                                           |            | MIN  |
// | Electric Utilities                                           |            | UTL  |
// | Oil / Gasoline                                               |            | OIL  |
// | Water Supply / Sewerage / Waste Management                   |            | WAT  |
// | Peace and Order (Military, Police, Fireman, Jail Warden and Others) |            | MIL  |
// | Public Administration / Government                           |            | PAD  |
// | Embassies / Diplomatic Services                              |            | EMB  |
// | Other Service Activities (Hairdresser, Manicurist, Masseuse and others) |            | OTS  |
// | Religious Organization                                       |            | RLG  |
// | Designated Non Financial Business And Professions (DNFBP)1   |            | DFP  |
// | Direct OGB / POGO Licensee and Authorized Gaming Agent2      |            | OGB  |
// | Indirect OGB / POGO Allied Service Provider                  |            | OGI  |
const naturesOpts = [
  { label: 'Accounting / Auditing / Tax Practice Services', value: 'ACT' },
  { label: 'Legal Services', value: 'LEG' },
  { label: 'Architecture / Engineering', value: 'ANE' },
  { label: 'Advertising / Marketing', value: 'ADV' },
  { label: 'Other Professional Services / Consultancy / Coaching', value: 'SVC' },
  { label: 'Pawnshop', value: 'PWN' },
  { label: 'Lending', value: 'LDG' },
  { label: 'Money Service Business - Electronic Money Issuer', value: 'MSE' },
  { label: 'Money Service Business - Virtual Currency Exchange', value: 'MSV' },
  { label: 'Money Service Business - Remittance Transfer Company', value: 'MSR' },
  { label: 'Money Service Business - Foreign Exchange Dealer / Money Changer', value: 'MSF' },
  { label: 'Banking', value: 'BAN' },
  { label: 'Insurance', value: 'INS' },
  { label: 'Securities Broker / Dealer', value: 'SBD' },
  { label: 'Construction and Civil Engineering', value: 'CON' },
  { label: 'Real Estate Brokerage and Sales', value: 'REL' },
  { label: 'Media', value: 'MED' },
  { label: 'Arts / Entertainment / Recreation', value: 'ENT' },
  { label: 'Sports / eSports', value: 'SPO' },
  { label: 'Gambling / Casino / eGames', value: 'GAM' },
  { label: 'Healthcare (Doctor, Dentist, Nurse, Psychiatrist and others)', value: 'HEA' },
  { label: 'Social Work / Non-Government and Non-Profit Organizations', value: 'SOC' },
  { label: 'Education / Online Education', value: 'EDU' },
  { label: 'Hotel / Accomodation / Restaurant / Food Services', value: 'AFS' },
  { label: 'Travel / Travel Agencies', value: 'TRA' },
  { label: 'Employment Agency / Human Resources', value: 'AGY' },
  { label: 'Business Process Outsourcing', value: 'BPO' },
  { label: 'Security Agency / Services', value: 'SEC' },
  { label: 'Private Household / Household Employee / Household Staff', value: 'HOU' },
  { label: 'Information / Comunication / Telecommunication', value: 'COM' },
  { label: 'Publishing / Printing', value: 'PUB' },
  { label: 'Robotics / AI / Cloud / Data Engineering / Software Development / Cybersecurity', value: 'ICT' },
  { label: 'Manufacturing / Packaging', value: 'MFG' },
  { label: 'Manufacturing / Trading of Firearms and Ammunition', value: 'MFF' },
  { label: 'Art / Antiques Dealership', value: 'ART' },
  { label: 'Car / Boat / Plane Dealership', value: 'CAR' },
  { label: 'Jewelry / Precious Metals / Precious Stones Dealership', value: 'JEW' },
  { label: 'Wholesale / Retail Trade (Distribution & Sales) / E-Commerce / Online Selling', value: 'WRT' },
  { label: 'Repair Services', value: 'REP' },
  { label: 'Transportation (Land, Sea and Air)', value: 'TRN' },
  { label: 'Shipping / Cargo / Storage', value: 'SHI' },
  { label: 'Seaman / Seafarer', value: 'SEA' },
  { label: 'Agriculture / Fishing', value: 'AGR' },
  { label: 'Forestry', value: 'FOR' },
  { label: 'Mining / Quarrying', value: 'MIN' },
  { label: 'Electric Utilities', value: 'UTL' },
  { label: 'Oil / Gasoline', value: 'OIL' },
  { label: 'Water Supply / Sewerage / Waste Management', value: 'WAT' },
  { label: 'Peace and Order (Military, Police, Fireman, Jail Warden and Others)', value: 'MIL' },
  { label: 'Public Administration / Government', value: 'PAD' },
  { label: 'Embassies / Diplomatic Services', value: 'EMB' },
  { label: 'Other Service Activities (Hairdresser, Manicurist, Masseuse and others)', value: 'OTS' },
  { label: 'Religious Organization', value: 'RLG' },
  { label: 'Designated Non Financial Business And Professions (DNFBP)1', value: 'DFP' },
  { label: 'Direct OGB / POGO Licensee and Authorized Gaming Agent2', value: 'OGB' },
  { label: 'Indirect OGB / POGO Allied Service Provider', value: 'OGI' }
]

// ### position type

// | 字段名                      | 字段中文名 | 值         |
// | --------------------------- | ---------- | ---------- |
// | For Private / Self-Employed | 私营       | SELF       |
// | For Government Employed     | 国企       | GOVERNMENT |
const positionTypeOpts = [
  { label: 'For Private / Self-Employed', value: 'SELF' },
  { label: 'For Government Employed ', value: 'GOVERNMENT' }
]

// ### position sub type
// | 字段名                     | 字段中文名           | 值          | 备注             |
// | -------------------------- | -------------------- | ----------- | ---------------- |
// | Owner / Director / Officer | 所有者/董事/高级职员 | OWNER       | SELF             |
// | Non Officer / Employee     | 非高级职员/员工      | NON_OFFICER | SELF             |
// | Elected / Appointee        | 当选/任命人          | ELECTED     | GOVERNMENT       |
// | Employee                   | 受雇者               | EMPLOYEE    | GOVERNMENT       |
// | Contractual / Part Time    | 合同/兼职            | CONTRACTUAL | SELF、GOVERNMENT |
const positionSubTypeOpts = [
  { label: 'Owner / Director / Officer', value: 'OWNER' },
  { label: 'Non Officer / Employee', value: 'NON_OFFICER' },
  { label: 'Elected / Appointee ', value: 'ELECTED' },
  { label: 'Employee', value: 'EMPLOYEE' },
  { label: 'Contractual / Part Time', value: 'CONTRACTUAL' }
]
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
        type: 'input',
        key: 'signature',
        label: 'Signature',
        placeholder: 'Signature'
      }
    ]
  },
  // cif
  cif: {
    title: 'Cif',
    section: 'cif',
    widgets: [
      {
        type: 'select',
        key: 'type',
        label: 'Type',
        list: cifTypeOpts,
        placeholder: 'Type'
      },
      {
        type: 'input',
        key: 'number',
        label: 'Number',
        placeholder: 'Number'
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
        list: bdoProductTypeOpts,
        placeholder: 'BDO Product Type'
      },
      {
        type: 'select',
        key: 'bdocustomer',
        label: 'BDO Customer',
        list: bdocustomerOpts,
        placeholder: 'BDO Customer'
      },
      {
        type: 'date',
        key: 'birthDay',
        label: 'BirthDay',
        valueFormat: 'yyyy-MM-dd',
        placeholder: 'BirthDay',
        rules: {
          message: 'BirthDay'
        }
      }
    ]
  },
  // contactInformation
  contactInformation: {
    title: 'Contact Information',
    section: 'contactInformation',
    mobileInformation: {
      title: 'Mobile Information',
      key: 'mobileInformation',
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
          key: 'areaCode',
          label: 'Local',
          placeholder: 'Local'
        }
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
        },
        {
          type: 'input',
          key: 'areaCode',
          label: 'Local',
          placeholder: 'Local'
        }
      ]
    },
    homeAddress: {
      title: 'Home Address',
      key: 'homeAddress',
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
    },
    alternateAddress: {
      title: 'Alternate Address',
      key: 'alternateAddress',
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
    },
    workLandline: {
      title: 'WorkLand line',
      key: 'workLandline',
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
          key: 'areaCode',
          label: 'Local',
          placeholder: 'Local'
        }
      ]
    },
    workAddress: {
      title: 'Work Address',
      key: 'workAddress',
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
    },
    widgets: [
      {
        type: 'input',
        key: 'personalEmail',
        label: 'Personal Email',
        placeholder: 'Personal Email'
      },
      {
        type: 'input',
        key: 'workEmail',
        label: 'Work Email',
        placeholder: 'Work Email'
      }
    ]
  },
  // personalInformation
  personalInformation: {
    title: 'Personal Information',
    section: 'personalInformation',
    widgets: [
      {
        type: 'input',
        key: 'birthCountry',
        label: 'Birth Country',
        placeholder: 'Birth Country'
      },
      {
        type: 'select',
        key: 'gender',
        label: 'Gender',
        list: teacherProductConfig.gender,
        placeholder: 'Gender'
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
      }
    ]
  },
  // signatureStatus
  signatureStatus: {
    title: 'Signature Status',
    section: 'signatureStatus',
    widgets: [
      {
        type: 'input',
        key: 'signature',
        valueKey: 'dataPrivacyConsent',
        label: 'Data Privacy Consent',
        placeholder: 'Data Privacy Consent'
      },
      {
        type: 'input',
        key: 'signature',
        valueKey: 'consentForTheIssuance',
        label: 'Consent For The Issuance',
        placeholder: 'Consent For The Issuance'
      },
      {
        type: 'input',
        key: 'signature',
        valueKey: 'customerUndertaking',
        label: 'Customer Undertaking',
        placeholder: 'Customer Undertaking'
      }
    ]
  },
  // internal
  internal: {
    title: 'Internal',
    section: 'internal',
    id1: {
      title: 'ID 1',
      key: 'id1',
      widgets: [
        {
          type: 'input',
          key: 'type',
          label: 'Type',
          placeholder: 'Type'
        },
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
      ]
    },
    id2: {
      title: 'ID 2',
      key: 'id2',
      widgets: [
        {
          type: 'input',
          key: 'type',
          label: 'Type',
          placeholder: 'Type'
        },
        {
          type: 'input',
          key: 'number',
          label: 'Number',
          placeholder: 'Number'
        }
      ]
    },
    biometrics: {
      title: 'Biometrics',
      key: 'biometrics',
      checkFileAll: false,
      isFileIndeterminate: true,
      widgets: [
        {
          type: 'checkbox',
          key: 'purpose',
          label: 'Purpose',
          placeholder: 'Purpose',
          list: biometricsOpts,
          rules: {
            message: 'Purpose',
            type: 'string'
          }
        }
      ]
    },
    widgets: [
      {
        type: 'input',
        key: 'account',
        label: 'Account',
        placeholder: 'Account'
      },
      {
        type: 'date',
        key: 'openedDate',
        label: 'Opened Date',
        valueFormat: 'yyyy-MM-dd',
        placeholder: 'Birth Day',
        rules: {
          message: 'Birth Day'
        }
      },
      {
        type: 'select',
        key: 'residency',
        label: 'Residency',
        list: esidencyOpts,
        placeholder: 'Residency'
      },
      {
        type: 'input',
        key: 'referred',
        label: 'Referred',
        placeholder: 'Referred'
      },
      {
        type: 'input',
        key: 'verified',
        label: 'Verified',
        placeholder: 'Verified'
      },
      {
        type: 'input',
        key: 'approved',
        label: 'Approved',
        placeholder: 'Approved'
      },
      {
        type: 'input',
        key: 'remark',
        label: 'Remark',
        placeholder: 'Remark'
      },
      {
        type: 'select',
        key: 'rc',
        label: 'RC',
        list: common.whetherOpts,
        placeholder: 'RC'
      },
      {
        type: 'select',
        key: 'nlds',
        label: 'NLDS',
        list: bdocustomerOpts,
        placeholder: 'NLDS'
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
          list: loan.productTimeOpts,
          placeholder: 'term'
        },
        {
          type: 'select',
          key: 'purpose',
          label: 'Purpose',
          list: purposeOpts,
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
          list: creditCardTypeOpts,
          placeholder: 'Credit Card Type'
        },
        {
          type: 'select',
          key: 'creditCardSubType',
          label: 'Credit Card Sub Type',
          list: creditCardSubTypeOpts,
          placeholder: 'Credit Card Sub Type'
        },
        {
          type: 'select',
          key: 'virtualCard',
          label: 'Virtual Card',
          list: bdocustomerOpts,
          placeholder: 'Virtual Card'
        }
      ]
    },
    widgets: [
      {
        type: 'select',
        key: 'productType',
        label: 'Product Type',
        list: bdoProductTypeOpts,
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
        list: deliverAddressOpts,
        placeholder: 'Deliver Address'
      },
      {
        type: 'select',
        key: 'deliverEmail',
        label: 'Deliver Email',
        list: deliverEmailOpts,
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
        list: bdocustomerOpts,
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
        list: bdocustomerOpts,
        placeholder: 'Answer'
      }
    ]
  },
  //financialInformation
  financialInformation: {
    title: 'Financial Information',
    section: 'financialInformation',
    position: {
      title: 'Position',
      key: 'position',
      widgets: [
        {
          type: 'select',
          key: 'positionType',
          label: 'Position Type',
          list: positionTypeOpts,
          placeholder: 'Position Type'
        },
        {
          type: 'select',
          key: 'positionType',
          label: 'Position Sub Type',
          list: positionSubTypeOpts,
          placeholder: 'Position Sub Type'
        }
      ]
    },
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
    fundsSource: {
      title: 'Funds Source',
      key: 'fundsSource',
      checkFileAll: false,
      isFileIndeterminate: true,
      widgets: [
        {
          type: 'checkbox',
          key: 'purpose',
          label: 'Purpose',
          placeholder: 'Purpose',
          list: fundSourceOpts,
          rules: {
            message: 'fundsSource',
            type: 'string'
          }
        }
      ]
    },
    natures: {
      title: 'Natures',
      key: 'natures',
      checkFileAll: false,
      isFileIndeterminate: true,
      widgets: [
        {
          type: 'checkbox',
          key: 'natures',
          label: 'Natures',
          placeholder: 'Natures',
          list: naturesOpts,
          rules: {
            message: 'natures',
            type: 'string'
          }
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
        list: common.housingOwnershipTypeOpts,
        placeholder: 'Ownership'
      },
      {
        type: 'select',
        key: 'employmentType',
        label: 'Employment Type',
        list: employmentTypeOpts,
        placeholder: 'Employment Type'
      },
      {
        type: 'select',
        key: 'employmentSubType',
        label: 'Employment Sub Type',
        list: employmentSubTypeOpts,
        placeholder: 'Employment Sub Type'
      }
    ]
  }
}

export default {
  widgetsOpts,
  bdocustomerOpts,
  cifTypeOpts,
  bdoProductTypeOpts,
  esidencyOpts,
  biometricsOpts,
  creditCardTypeOpts,
  creditCardSubTypeOpts,
  fundSourceOpts,
  naturesOpts,
  positionTypeOpts,
  positionSubTypeOpts,
  purposeOpts,
  deliverAddressOpts,
  deliverEmailOpts,
  employmentSubTypeOpts,
  employmentTypeOpts
}
