import utils from '@/utils'
// 新版利率名称转化：procla-产品类型，newProcla-新版利率名称，corpno-银行法人号
export const ProclaNameFilter = (procla, newProcla = '', corpno = '') => {
  if (newProcla) {
    return newProcla
  }
  if (corpno === '000016') {
    return '综合年化收益率'
  }
  let result = '年化利率'
  let formatName = [
    {
      name: '七日年化',
      value: ',J402,'
    },
    {
      name: '最高可达利率',
      value: ',J10201,14,'
    },
    {
      name: '年化利率',
      value: ',J10202,J10203,J30203,'
    },
    {
      name: '支取执行利率',
      value: ',J10204,11,'
    },
    {
      name: '预计年化收益',
      value: ',J30201,J30202,'
    },
    {
      name: '业绩比较基准',
      value: ',J30101,'
    }
  ]
  for (let i = 0; i < formatName.length; i++) {
    if (formatName[i].value.indexOf(',' + procla + ',') > -1) {
      result = formatName[i].name
      break
    }
  }
  return result
}
// 格式化产品列表 -期限
export const depttmFilterSyr = depttm => {
  if (utils.isNull(depttm)) {
    return '0天'
  }
  const timeTemp = depttm.slice(-1)
  if (timeTemp === 'Y') {
    return depttm.substring(0, depttm.length - 1) + '年'
  } else if (timeTemp === 'M') {
    return depttm.substring(0, depttm.length - 1) + '个月'
  } else if (timeTemp === 'D') {
    return depttm.substring(0, depttm.length - 1) + '日'
  } else {
    if (depttm === 'M03') {
      return '3个月'
    } else if (depttm === 'M06') {
      return '6个月'
    } else if (depttm === 'Y01') {
      return '1年'
    } else if (depttm === 'Y02') {
      return '2年'
    } else if (depttm === 'Y03') {
      return '3年'
    } else if (depttm === 'Y05') {
      return '5年'
    } else {
      return depttm
    }
  }
}
// 格式化产品列表 -期限 方法2
export const timeFilterSyr = (value, productList) => {
  if (productList['CP-101-017']) {
    return depttmFilterSyr(productList['CP-101-017'])
  }
  switch (value) {
    case '000':
      return '活期'
    case '101':
      return '1天'
    case '107':
      return '7天'
    case '108':
      return '8天'
    case '1100':
      return '100天'
    case '1366':
      return '366天'
    case '1731':
      return '731天'
    case '11096':
      return '1096天'
    case '11112':
      return '1112天'
    case '11825':
      return '1825天'
    case '201':
      return '1月'
    case '203':
      return '3月'
    case '206':
      return '6月'
    case '209':
      return '9月'
    case '218':
      return '18月'
    case '301':
      return '1年'
    case '302':
      return '2年'
    case '303':
      return '3年'
    case '304':
      return '4年'
    case '305':
      return '5年'
    case '306':
      return '6年'
    case '3035':
      return '3-5年'
    case '901':
      return productList['CP-101-006'] + '天'
    case '902':
      return productList['CP-101-007'] + '天'
    case '903':
      return productList['CP-101-008'] + '天'
    case '904':
      return productList['CP-101-009'] + '天'
    default:
      return value + '天'
  }
}
// 格式化产品类型
export const sprdtpFilter = sprdtp => {
  let result = ''
  const formatName = [
    {
      name: '存款',
      value: 'J1'
    },
    {
      name: '贷款',
      value: 'J2'
    },
    {
      name: '理财',
      value: 'J3'
    },
    {
      name: '基金',
      value: 'J4'
    },
    {
      name: '信用卡',
      value: 'J8'
    },
    {
      name: '电子账户余额',
      value: 'YE'
    }
  ]
  for (let i = 0; i < formatName.length; i++) {
    if (formatName[i].value.indexOf(sprdtp) > -1) {
      result = formatName[i].name
      break
    }
  }
  return result
}
// 新版产品列表期限显示
export const timeFilter = (value, item, type) => {
  if (!utils.isNull(value)) {
    return depttmFilterSyr(value, type)
  }
  if (utils.objKey(item, 'pdterm')) {
    return depttmFilterSyr(item.pdterm, type)
  }
  if (utils.objKey(item, 'procla')) {
    // 产品子类
    let dptype = item.procla
    if (dptype === 'J10201' || dptype === 'J10204' || dptype === '11') {
      return '活期'
    } else if (dptype === 'J30202') {
      if (value) {
        return value + '月'
      } else {
        return '活期'
      }
    }
  }
  if (utils.objKey(item, 'sprdtp')) {
    // 产品大类
    let sprdtp = item.sprdtp
    if (sprdtp === 'J2') {
      let begin = item.enterm
      let end = item.depttm
      if (begin && begin !== end) {
        end = begin + '-' + end
      }
      return end + '月'
    } else if (sprdtp === 'J4') {
      if (value) {
        return value + '月'
      } else {
        return '活期'
      }
    }
  }
  if (utils.objKey(item, 'procla') && utils.objKey(item, 'sprdtp')) {
    let sprdtp = item.sprdtp
    let dptype = item.procla
    if (sprdtp === 'J3' && dptype === 'J30101') {
      return '开放日可赎'
    }
  }
  if (utils.objKey(item, 'depttm')) {
    return depttmFilterSyr(item.depttm, type)
  }
}
