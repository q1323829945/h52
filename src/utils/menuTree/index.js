/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/menuTree/index.js
 * @Date         : 2022-02-22 15:40:34
 * @LastEditTime : 2022-11-01 10:09:21
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from '../storage'

/**
 * @description: 菜单栏国际化
 * @return {*} menuTree
 */
const setLanguageMenuTree = () => {
  // name对应语言包里的对象  name：菜单名 parentName：父级菜单名
  let menuLangs = [
    // 首页
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.home', parentName: '', type: 'homeConfig' },

    // 系统配置
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.sys', parentName: '', type: 'sysConfig' },
    //二级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.role', parentName: 'menuTree.sys', type: 'roleConfig' },
    { name: 'menuTree.permission', parentName: 'menuTree.sys', type: 'permissionConfig' },
    { name: 'menuTree.users', parentName: 'menuTree.sys', type: 'userConfig' },
    { name: 'menuTree.positionTitle', parentName: 'menuTree.sys', type: 'positionConfig' },

    // 业务配置
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.business', parentName: '', type: 'businessConfig' },
    // 二级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.ratePlan', parentName: 'menuTree.business', type: 'ratePlanConfig' },
    { name: 'menuTree.questionnaire', parentName: 'menuTree.business', type: 'questionnairesConfig' },
    { name: 'menuTree.loanProduct', parentName: 'menuTree.business', type: 'loanProductConfig' },
    { name: 'menuTree.riskControl', parentName: 'menuTree.business', type: 'riskControlRuleConfig' },
    { name: 'menuTree.customer', parentName: 'menuTree.business', type: 'customerConfig' },
    { name: 'menuTree.pdpaConfig', parentName: 'menuTree.business', type: 'pdpaConfig' },
    { name: 'menuTree.workflowMenuTitle', parentName: 'menuTree.business', type: 'workflowConfig' },
    { name: 'menuTree.workflowQueryMenuTitle', parentName: 'menuTree.business', type: 'workflowQuery' },
    { name: 'menuTree.pdpaAuthorizationConfig', parentName: 'menuTree.business', type: 'pdpaAuthorityConfig' },
    { name: 'menuTree.underwriting', parentName: 'menuTree.business', type: 'underwritingConfig' },

    // 企业配置
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.enterpriseConfig', parentName: '', type: 'enterpriseConfig' },
    // 二级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.organisation', parentName: 'menuTree.enterpriseConfig', type: 'organisationConfig' },
    { name: 'menuTree.employee', parentName: 'menuTree.enterpriseConfig', type: 'employeeConfig' },

    // 业务办理
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.loanConfig', parentName: '', type: 'businessHandling' },
    // 二级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.customerOfferConfig', parentName: 'menuTree.loanConfig', type: 'loanApplySupplementConfig' },
    { name: 'menuTree.eventHandlingMenuTitle', parentName: 'menuTree.loanConfig', type: 'eventHandle' },
    { name: 'menuTree.loanAgreement', parentName: 'menuTree.loanConfig', type: 'loanAgreementManagementConfig' },
    { name: 'menuTree.invoiceInfo', parentName: 'menuTree.loanConfig', type: 'repaymentManagementConfig' },

    // 业务查询
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.businessQuery', parentName: '', type: 'businessQuery' },
    // 二级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.loanQuery', parentName: 'menuTree.businessQuery', type: 'loanApplyQueryConfig' },
    { name: 'menuTree.eventQueryMenuTitle', parentName: 'menuTree.businessQuery', type: 'eventHandleQuery' },

    // 数据统计
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.statisticsQuery', parentName: '', type: 'statisticsQuery' },
    // 二级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.commissionStatistical', parentName: 'menuTree.statisticsQuery', type: 'commissionStatisticsConfig' },
    { name: 'menuTree.loanStatistical', parentName: 'menuTree.statisticsQuery', type: 'loanApplicationStatisticsConfig' },

    // 渠道管理
    // 一级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.channelConfig', parentName: '', type: 'channelConfig' },
    // 二级菜单 ↓↓↓↓↓↓↓↓
    { name: 'menuTree.channel_MenuTree_Title', parentName: 'menuTree.channelConfig', type: 'channelQueryConfig' }
  ]

  // 读取缓存后端菜单
  let menuTree = utils.getStore('ASIDE-MENU-TREE', sessionStorage)
  // console.log('menuTree==>', menuTree)

  // 本地全量菜单与后端菜单比较，剔除不在后端内的子菜单
  let resultList = setCompareResult(menuTree, menuLangs)

  menuTree.forEach((item, index) => {
    item.name = getMenuTree(resultList)[index].name
    item.id = index
    menuTreeForEach(menuTree, getMenuTree(resultList))
  })
  return menuTree
}
/**
 * @description: 本地菜单与后端菜单比较，剔除不在后端内的子菜单
 * @param 本地缓存的后端菜单
 * @param 本地预先写好的全量菜单
 * @return nativeData
 */
const setCompareResult = (storageData, nativeData) => {
  let tempList = []
  var compareResultList = []
  storageData.forEach((item, index) => {
    tempList.push({ type: item.name })
    item.name = getMenuTree(nativeData)[index].name
    if (item.children != null) {
      item.children.forEach(citem => {
        tempList.push({ type: citem.name })
      })
    }
  })
  // 对象数组比较
  for (var i = 0; i < nativeData.length; i++) {
    var obj = nativeData[i]
    var type = obj.type
    var isExist = false
    for (var j = 0; j < tempList.length; j++) {
      var aj = tempList[j]
      var n = aj.type
      if (n == type) {
        isExist = true
        break
      }
    }
    if (!isExist) {
      compareResultList.push(obj)
    }
  }
  // console.log('compareResultList==>', compareResultList)

  // 删除不在后端内的子菜单
  if (compareResultList.length > 0) {
    let deleteIndexList = []
    for (let index = 0; index < compareResultList.length; index++) {
      const obj = compareResultList[index]
      let deleteIndex = nativeData.findIndex(element => element.name == obj.name)
      deleteIndexList.push(deleteIndex)
    }
    for (let i = deleteIndexList.length - 1; i >= 0; i--) {
      nativeData.splice(deleteIndexList[i], 1)
    }
  }
  // console.log('nativeData==>', nativeData)
  return nativeData
}

/**
 * @description:菜单添加国际化名称
 * @param 本地缓存的后端菜单
 * @param 本地预先写好的全量菜单
 * @return storageData
 */
const menuTreeForEach = (storageData, nativeData) => {
  storageData.forEach((item, index) => {
    item.name = nativeData[index].name

    if (item.children != null) {
      item.children.forEach((citem, cindex) => {
        citem.name = nativeData[index].children[cindex].name
      })
    }
  })
  return storageData
}

/**
 * @description: 侧边栏菜单数据规整
 * @param {*} data
 * @return {*} menuArray
 */
export const getMenuTree = data => {
  // 删除 所有 children,以防止多次调用
  data.forEach(item => {
    delete item.children
  })
  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {}
  data.forEach(item => {
    // 在该方法中可以给每个元素增加其他属性
    item.label = item.name
    item.value = item.name
    map[item.name] = item
    // item.value = item.id
    // map[item.id] = item
  })
  var val = []
  data.forEach(item => {
    // 以当前遍历项的parent_id,去map对象中找到索引的id
    // var parent = map[item.parent_id]
    var parent = map[item.parentName]
    if (parent) {
      // 可以给每个父节点添加属性
      parent.iconCls = 'i-folder'
      //  添加到父节点的子节点属性中
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item)
    }
  })
  return val
}

export default {
  setLanguageMenuTree,
  getMenuTree
}
