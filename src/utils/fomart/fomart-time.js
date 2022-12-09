import utils from '@/utils'
/**
 * 日期数据根据类型自动转化new Date()、20180202、2018-02-02 10:20:35
 * += 2018-02-02、2018/02/02、2018.02.02
 * cFormat='{y}-{m}-{d} {h}:{i}:{s}'
 * cFormat='{y}年{m}月{d}日 {h}时{i}分{s}秒'
 * cFormat='{y}.{m}.{d}'
 */
export function fomartDate(time, cFormat) {
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

// 获取时间和当前时间对比：刚刚、分钟前、小时前、1天前
export function formatTime(time) {
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
}

// 判断是否闰年
export function isLeapYear(year) {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    // 是闰年
    return true
  } else {
    // 是平年
    return false
  }
}

/*
 * 获取下个月第一天时间
 */
export const nextMonthFirstDay = (split = '/') => {
  const time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth() + 2
  if (month > 12) {
    month = month - 12
    year = year + 1
  }
  if (month < 10) {
    month = `0${month}`
  }
  return `${year}${split}${month}${split}01`
}

/*
 * 获取下个月最后一天时间
 */
export const nextMonthLastDay = (split = '/') => {
  const time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth() + 2
  if (month > 12) {
    month = month - 12
    year = year + 1
  }
  var day = nextMonthDay(year, month)
  return `${year}${split}${month}${split}${day}`
}

/**
 * 判断每月天数
 */
const nextMonthDay = (year, month) => {
  const day31 = [1, 3, 5, 7, 8, 10, 12]
  const day30 = [4, 6, 9, 11]
  if (day31.indexOf(month) > -1) {
    return 31
  } else if (day30.indexOf(month) > -1) {
    return 30
  } else {
    if (isLeapYear(year)) {
      return 29
    }
    return 28
  }
}

/**
 * 获取当月多少天
 */
export const getCurMonthDays = (y, m) => {
  if (!y && !m) {
    ;[y, m] = fomartDate(new Date(), '{y}-{m}-{d}').split('-')
  }
  if (y.indexOf('-') !== -1) {
    ;[y, m] = y.split('-')
  }
  return new Date(y, m, 0).getDate()
}

/**
 * @description: 时间转换 秒转换成分秒
 * @param {*} value 秒
 * @return {*} 分秒
 */
export const transMinutes = value => {
  //计算分钟
  //算法：将秒数除以60，然后下舍入，既得到分钟数
  if (value <= 60) {
    return value + '秒'
  } else {
    var h
    h = Math.floor(value / 60)
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    value = value % 60
    //将变量转换为字符串
    h += ''
    value += ''
    //如果只有一位数，前面增加一个0
    // h = h.length == 1 ? '0' + h : h
    value = value.length == 1 ? '0' + value : value
    return h + '分' + value + '秒'
  }
}

export const getAge = strBirthday => {
  var returnAge
  // 根据生日计算年龄（"1995-09-25"）
  //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
  var strBirthdayArr = strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1
  var nowDay = d.getDate()

  if (nowYear == birthYear) {
    returnAge = 0 //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        var monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge //返回周岁年龄
}

/**
 * @description: 获取上一年时间
 * @param {*} value value当前时间
 * @return {*} 上一年时间
 */
export const oneYearBefore = value => {
  var date = new Date(Date.parse(value))
  date.setFullYear(date.getFullYear() - 1)
  return fomartDate(date, '{y}-{m}-{d}')
}

/**
 * @description: 获取上一个月时间
 * @param {*} value value当前时间
 * @return {*} 上一个月时间
 */
export const oneMonthBefore = value => {
  // var date = new Date()
  // var date = new Date(Date.parse(value.replace(/-/g, '/')))
  var date = new Date(Date.parse(value))
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  //   一月的时候年份要减一
  if (m == 1) {
    y--
    m = 12
  } else if (m == 3 && d > 28) {
    //三月要考虑是否为闰年
    m--
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
      d = 29
    } else {
      d - 28
    }
  } else if ((m != 12 || m != 8) && d == 31) {
    //31号的月份要考虑上个月是否有31号
    m--
    d = 30
  } else {
    m--
  }
  // 一个月前的日期
  let pastDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
  return pastDate
}

export const oneWeekBefore = value => {
  var date = new Date(Date.parse(value))
  date.setDate(date.getDate() - 7) //日期回到七天前
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  var dateTemp = year + '-' + month + '-' + day
  return dateTemp
}
