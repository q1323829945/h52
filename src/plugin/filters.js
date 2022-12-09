/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/plugin/filters.js
 * @Date         : 2022-03-01 09:28:57
 * @LastEditTime : 2022-10-08 13:53:08
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from '@/utils'
import language from '@/utils/language'
import loanConfig from '@/views/admin/loan/optsConfig/loanConfig'
import { channelCastTypeOpts } from '@/views/admin/channel/optsConfig/channelConfig'

// export const formatDateFilter = launchStartTimeStamp => {
//   var offset = new Date() + '' //将时间格式转为字符串
//   console.log(offset) //  Mon Nov 02 2020 20:57:20 GMT-0600 (北美中部标准时间)
//   let asderf = offset.indexOf('GMT')
//   let fghdfgd = offset.substring(asderf + 3, asderf + 8)
//   console.log(fghdfgd) //-0600    //拿到这个-0600也就是当前所在时区，然后转时间戳的
//   let current_time = fghdfgd //给了你定义的一个字段，在拿到数据后使用
//   let time = moment(launchStartTimeStamp).utcOffset(current_time).format('YYYY-MM-DD HH:mm:ss')

//   return time
// }

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

/**
 * @description: 月份必须用英文简写
 * @param {*} timeString 原始时间 ex: 10-01-2022 14:22:18
 * @param {*} formatString 时间格式
 * @return {*}
 */
const setEnglishFomartDate = (timeString, formatString) => {
  // 时间分割为数组
  let format = formatString.substring(1, 2)
  let monthStrArr = timeString.split(format)
  // 取出阿拉伯数字月份替换为英文简写
  let index = parseInt(monthStrArr[1]) - 1
  let monthValue = months[index]
  monthStrArr.splice(1, 1, monthValue)
  // 添加日月年间隔
  // monthStrArr.splice(1, 0, ' ')
  // monthStrArr.splice(3, 0, ', ')
  return monthStrArr.join(' ')
}

/**
 *  方法名：
 *    formatMoney 将数字转千分符显示 格式化金额
 *    如：1000.23 => 1,000.23
 *  参数：
 *    m  小数
 */
export const amountFilter = (s, n = 2) => {
  if (utils.isNull(s)) return '0.00'
  n = n >= 0 && n <= 20 ? n : 2 // n大于0或等于小于等于20时，值为n，否则默认为2
  // 将要格式化的数字转换成字符串，并去掉其中匹配的其他字符后返回一个浮点数。
  // 把 Number 四舍五入为指定位数的数字后，最终在转换成字符串。
  s = parseFloat((s + '').replace(/[^\d\\.-]/g, '')).toFixed(n) + ''
  var numArry = s.split('.') // 分隔字符串 0 -> 小数点前面数值 1 -> 小数点后面的尾数
  var l = numArry[0].split('').reverse() // 将前面数值再分隔，并反转顺序
  var t = ''
  for (var i = 0; i < l.length; i++) {
    // 每隔三位小数分始开隔
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  if (n === 0) {
    return t.split('').reverse().join('')
  } else {
    // 将顺序反转回来，并返回一个字符串
    return t.split('').reverse().join('') + '.' + numArry[1]
  }
}

/**
 * @description: 时间戳转换
 * @param {*} time
 * @param {*} cFormat 时间格式数组'[y-m-d h:i:s]' 'y年m月d日 h时i分s秒'
 * @return {*} 时间
 */
export const fomartDate = (time, cFormat = '{y}-{m}-{d}') => {
  if (utils.isNull(time)) {
    return '--'
  } else if (utils.isNull(cFormat)) {
    return time
  } else if (String(time).indexOf('-') > -1 && String(time).indexOf(':') > -1) {
    time = String(time)
    time = utils.strTrimNull(time)
    time = utils.strTrim(time, '-')
    time = utils.strTrim(time, ':')
  } else if (String(time).indexOf('-') > -1) {
    time = String(time)
    time = utils.strTrimNull(time)
    time = utils.strTrim(time, '-')
  } else if (String(time).indexOf('/') > -1) {
    time = String(time)
    time = utils.strTrimNull(time)
    time = utils.strTrim(time, '/')
  } else if (String(time).indexOf('.') > -1) {
    time = String(time)
    time = utils.strTrimNull(time)
    time = utils.strTrim(time, '.')
  }
  let formatObj
  if (typeof time === 'object') {
    formatObj = {
      y: time.getFullYear(),
      m: time.getMonth() + 1,
      d: time.getDate(),
      h: time.getHours(),
      i: time.getMinutes(),
      s: time.getSeconds(),
      a: time.getDay()
    }
  } else if (Number(time) > 0) {
    formatObj = {
      y: String(time).slice(0, 4),
      m: String(time).slice(4, 6),
      d: String(time).slice(6, 8),
      h: String(time).slice(8, 10),
      i: String(time).slice(10, 12),
      s: String(time).slice(12, 14)
    }
  }
  const timeStr = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (typeof time === 'object') {
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
    }
    return value || 0
  })

  return timeStr
}

/**
 * @description: utc转北京时间
 * @param utc_datetime
 * @param cFormat
 * @return {*}
 */
export const utcToBeijing = (utc_datetime, cFormat = ['y-m-d']) => {
  if (utils.isNull(utc_datetime)) {
    return '--'
  } else if (utils.isNull(cFormat)) {
    return utc_datetime
  }
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T')
  var Z_pos = utc_datetime.indexOf('+')
  var year_month_day = utc_datetime.substr(0, T_pos)
  var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1)
  var new_datetime = year_month_day + ' ' + hour_minute_second // 2017-03-31 08:02:06

  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime))
  timestamp = timestamp.getTime()
  timestamp = timestamp / 1000

  // 增加8个小时，北京时间比utc时间多八个时区
  // var timestamp = timestamp + 8 * 60 * 60
  var timestamp = timestamp

  // 时间戳转为时间
  var beijing_datetime = new Date(parseInt(timestamp) * 1000)

  let formatObj
  formatObj = {
    y: beijing_datetime.getFullYear(),
    m: beijing_datetime.getMonth() + 1,
    d: beijing_datetime.getDate(),
    h: beijing_datetime.getHours() <= 9 ? `0${beijing_datetime.getHours()}` : beijing_datetime.getHours(),
    i: beijing_datetime.getMinutes() <= 9 ? `0${beijing_datetime.getMinutes()}` : beijing_datetime.getMinutes(),
    s: beijing_datetime.getSeconds() <= 9 ? `0${beijing_datetime.getSeconds()}` : beijing_datetime.getSeconds(),
    a: beijing_datetime.getDay()
  }
  // 设置英文时间格式
  cFormat[0] = cFormat[0].split('').reverse().join('')
  let cFormatString = cFormat.join('\xa0\xa0\xa0\xa0')

  // 时间格式化
  const timeStr = cFormatString.replace(/(y|m|d|h|i|s|a)+/g, (result, key) => {
    let value = formatObj[key]
    if (typeof time === 'object') {
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
    }
    return value || 0
  })
  return setEnglishFomartDate(timeStr, cFormatString)
  // return timeStr
}

export const transTimestamp = (datetime, cFormat = ['y-m-d']) => {
  if (datetime) {
    const date = new Date(datetime)
    const year = `${date.getUTCFullYear()}`
    let month = `${date.getUTCMonth() + 1}`
    let day = `${date.getUTCDate()}`
    let hour = `${date.getUTCHours()}`
    let minute = `${date.getUTCMinutes()}`
    let second = `${date.getUTCSeconds()}`
    if (month.length === 1) {
      month = `0${month}`
    }
    if (day.length === 1) {
      day = `0${day}`
    }
    if (day.length === 1) {
      day = `0${day}`
    }
    if (hour.length === 1) {
      hour = `0${hour}`
    }
    if (minute.length === 1) {
      minute = `0${minute}`
    }
    if (second.length === 1) {
      second = `0${second}`
    }

    let formatObj
    formatObj = {
      y: year,
      m: month,
      d: day,
      h: hour,
      i: minute,
      s: second
    }

    // 设置国外时间格式
    var dateOffset = new Date() + '' //将时间格式转为字符串
    // console.log('dateOffset==>', dateOffset) //  Sat Apr 02 2022 15:20:03 GMT+0800 (中国标准时间)
    let gmt = dateOffset.indexOf('GMT')
    let timezone = dateOffset.substring(gmt + 3, gmt + 8)
    // console.log(timezone) //+0800   //拿到这个+0800也就是当前所在时区，然后转时间戳的
    if (timezone != '+0800') {
      cFormat[0] = cFormat[0].split('').reverse().join('')
      if (cFormat.length > 1) {
        cFormat.reverse()
      }
    }
    let cFormatString = cFormat.join('  ')

    const timeStr = cFormatString.replace(/(y|m|d|h|i|s|a)+/g, (result, key) => {
      let value = formatObj[key]
      if (typeof time === 'object') {
        if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
      }
      return value || 0
    })
    return timeStr
  }
}

/**
 * @description: 格式化金额（整数或保留小数点后两位）
 * @param {*} item
 * @return {*}
 */
export const amountmoney = item => {
  var reg = /^[-\\+]?\d+(\.\d+)?$/
  item = item + ''
  if (!reg.test(item)) {
    return item
  }
  if (Number(item) === 0) {
    return '0.00'
  } else {
    let point = ''
    let num = item
    if (item.indexOf('.') !== -1) {
      num = item.split('.')[0]
      const temp = item.split('.')[1]
      point = '.' + (temp.length === 1 ? temp + '0' : temp)
      return Number(num + point).toFixed(2)
    } else {
      return Number(item) + '.00'
    }
  }
}

/**
 * @description: 格式化数字（整数或保留小数点后两位）
 * @param {*} item
 * @return {*}
 */
export const fomartTwoDecimalPlaces = item => {
  var reg = /^[-\\+]?\d+(\.\d+)?$/
  item = item + ''
  if (!reg.test(item)) {
    return item
  }
  if (Number(item) === 0) {
    return '0.00'
  } else {
    let point = ''
    let num = item
    if (item.indexOf('.') !== -1) {
      num = item.split('.')[0]
      const temp = item.split('.')[1]
      point = '.' + (temp.length === 1 ? temp + '0' : temp)
      return Number(num + point).toFixed(2)
    } else {
      return Number(item) + '.00'
    }
  }
}

/**
 * @description: 货币
 * @param 货币枚举值
 * @return {*} 货币名称
 */
export const transformCurrencyOpts = value => {
  let label = '--'
  let opts = utils.common.currencyOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 贷款期限类型
 * @param {*} value 期限枚举值
 * @return {*} 期限名称
 */
export const transformLoanTerm = value => {
  let label = '--'
  let opts = utils.loan.productTimeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 贷款产品状态
 * @param {*} value 状态枚举值
 * @return {*} 状态名称
 */
export const transformLoanStatus = value => {
  let label = '--'
  let opts = utils.loan.productStatusOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 风控规则类型
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformRiskControlRuleType = value => {
  let label = '--'
  let opts = utils.riskControl.ruleTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 贷款产品类型
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformLoanType = value => {
  let label = '--'
  let opts = loanConfig.productTypeOpts
  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 费用类型
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformFeeTypeOpts = value => {
  let label = '--'
  let opts = utils.loan.feeTypeOpts
  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description:国籍
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformNationalityType = value => {
  let label = '--'
  let opts = utils.common.nationalityOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 语言
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformLanguageType = value => {
  let label = '--'
  let opts = utils.common.languageTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description:证件类型
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformPersonIdentificationType = value => {
  let label = '--'
  let opts = utils.common.personIdentificationTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description:贷款状态
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformLoanTypeStatus = value => {
  let label = '--'
  let opts = utils.common.loanTypeStatusOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description:审批状态
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformCustomerOfferStatus = value => {
  let label = '--'
  let opts = utils.common.customerOfferStatusOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 业务单元
 * @param {*} value 类型枚举值
 * @return {*} 类型名称
 */
export const transformBusinessUnitsTypeOpts = value => {
  let label = '--'
  let opts = utils.common.businessUnitsTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 协议状态
 * @param 状态枚举值
 * @return {*} 状态名称
 */
export const transformLoanAgreementStatus = value => {
  let label = '--'
  let opts = utils.common.loanAgreementStatus

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 协议类型
 * @param 类型枚举值
 * @return {*} 类型名称
 */
export const transformAgreementTypeOpts = value => {
  let label = '--'
  let opts = utils.common.agreementTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: invoiceStatus枚举
 * @param 类型枚举值
 * @return {*} 类型名称
 */
export const transformInvoiceStatusOpts = value => {
  let label = '--'
  let opts = utils.rate.invoiceStatusOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: invoiceStatus枚举
 * @param 类型枚举值
 * @return {*} 类型名称
 */
export const transformInvoiceTypeOpts = value => {
  let label = '--'
  let opts = utils.rate.invoiceTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: repaymentStatusOpts枚举
 * @param 类型枚举值
 * @return {*} 类型名称
 */
export const transformRepaymentStatusOpts = value => {
  let label = '--'
  let opts = utils.rate.repaymentStatusOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: invoiceAmountTypeOpts枚举
 * @param 类型枚举值
 * @return {*} 类型名称
 */
export const transformInvoiceAmountTypeOpts = value => {
  let label = '--'
  let opts = utils.rate.invoiceAmountTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: instructionLifecycleStatus枚举枚举
 * @param 类型枚举值
 * @return {*} 类型名称
 */
export const transformInstructionLifecycleStatus = value => {
  let label = '--'
  let opts = utils.rate.instructionLifecycleStatusOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

/**
 * @description: 后缀为年
 * @return {*} 年
 */
export const languageYear = () => {
  let label = '--'
  label = language.t('date.year') //i18n使用过滤器
  return label
}

/**
 * @description: 后缀为天数
 * @return {*} 天数
 */
export const languageDays = () => {
  let label = '--'
  label = language.t('date.days') //i18n使用过滤器
  return label
}

/**
 * @description: 是否状态
 * @param 状态枚举值
 * @return {*} 状态名称
 */
export const transformWhetherStatus = value => {
  let label = '--'
  let opts = utils.common.whetherOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

export const transformPositionType = value => {
  let label = '--'
  let opts = utils.common.positionTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}

export const transformChannelCastTypeType = value => {
  let label = '--'
  let opts = channelCastTypeOpts

  for (let index = 0; index < opts.length; index++) {
    let element = opts[index]
    if (value == element.value) {
      label = language.t(element.label) //i18n使用过滤器
      break
    }
  }
  return label
}
