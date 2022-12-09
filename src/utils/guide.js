/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/guide.js
 * @Date         : 2022-11-09 15:34:41
 * @LastEditTime : 2022-11-14 13:10:11
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import routers from '@/router'
import utils from '@/utils'
import language from '@/utils/language'
import channelConfig from '@/views/admin/channel/optsConfig/channelConfig'

// 自定义popover description事件
export const test = function () {
  console.log('guide test==>')
}

export default [
  //1、添加渠道
  {
    element: '#guide-step1',
    popover: {
      className: 'only-one-line',
      title: language.t('guideStep.guideTitle1'),
      // 自定义description html
      // description: `<div class="test-decs" onclick="test()">插入的html</div>`
      description: language.t('guideStep.guideDesc1')
    },
    onNext: () => {
      // 从当前步骤移动到下一步时调用
      utils.setStore('GUIDE-SAVE-SETP2', '', localStorage)
      let widgetOpts = JSON.parse(JSON.stringify(channelConfig.widgets))
      let model = {
        legalEntityIndicator: '', //负责人
        organisationSector: '', //所属部门
        organisationRegistrationDate: utils.fomartDate(new Date(), '{y}-{m}-{d}'), //注册时间
        placeOfRegistration: '', //注册地
        channelIdentification: [
          {
            channelIdentificationType: '', //枚举
            channelIdentification: ''
          }
        ],
        channelCast: {
          channelCode: '',
          channelName: '',
          channelCastType: '' //枚举
        }
      }
      // channelIdentification
      if (model.channelIdentification.length > 0) {
        widgetOpts.channelIdentification.channelIdentificationWidgets = []
        model.channelIdentification.forEach(() => {
          widgetOpts.channelIdentification.channelIdentificationWidgets.push(widgetOpts.channelIdentification.widgets)
        })
      }
      var newString = JSON.stringify({ isNewAdd: true, model: model, widgetOpts: widgetOpts })
      routers.push(`/dashboard/channel/detail?data=${newString}`)
    },
    onHighlightStarted: () => {
      console.log('保存第一步添加渠道引导==>')
      // window添加自定义事件
      // window.test = test
      utils.setStore('GUIDE-SAVE-SETP1', 'true', localStorage)
    },
    onPrevious: () => {
      utils.setStore('GUIDE-SAVE-SETP1', '', localStorage)
      routers.push(`/dashboard/channelQueryConfig`)
    }
  },
  //2、保存渠道信息
  {
    element: '#guide-step2',
    stageBackground: 'transparent', // 这将覆盖驱动程序中设置的
    popover: {
      className: 'right-bottom-default-line',
      title: language.t('guideStep.guideTitle2'),
      description: language.t('guideStep.guideDesc2'),
      position: 'right-bottom'
    },
    onNext: () => {
      utils.setStore('GUIDE-SAVE-SETP3', '', localStorage)
      console.log('跳转利率计划==>')
      routers.push(`/dashboard/ratePlan`)
    },
    onHighlightStarted: () => {
      console.log('保存第二步保存渠道信息引导==>')
      utils.setStore('GUIDE-SAVE-SETP2', 'true', localStorage)
    },
    onPrevious: () => {
      // 返回上一步。打开上一步引导
      utils.setStore('GUIDE-SAVE-SETP1', '', localStorage)
      routers.push(`/dashboard/channelQueryConfig`)
    }
  },
  //3、添加利率计划
  {
    element: '#guide-step3',
    stageBackground: 'transparent', // 这将覆盖驱动程序中设置的
    popover: {
      className: 'default-line',
      title: language.t('guideStep.guideTitle3'),
      description: language.t('guideStep.guideDesc3')
    },
    onNext: () => {
      // 从当前步骤移动到下一步时调用
      utils.setStore('GUIDE-SAVE-SETP4', '', localStorage)
      routers.push(`/dashboard/loanProduct`)
    },
    onHighlightStarted: () => {
      console.log('保存第三步添加利率计划引导==>')
      utils.setStore('GUIDE-SAVE-SETP3', 'true', localStorage)
    },
    onPrevious: () => {
      // 返回上一步。打开上一步引导
      utils.setStore('GUIDE-SAVE-SETP2', '', localStorage)
      let widgetOpts = JSON.parse(JSON.stringify(channelConfig.widgets))
      let model = {
        legalEntityIndicator: '', //负责人
        organisationSector: '', //所属部门
        organisationRegistrationDate: utils.fomartDate(new Date(), '{y}-{m}-{d}'), //注册时间
        placeOfRegistration: '', //注册地
        channelIdentification: [
          {
            channelIdentificationType: '', //枚举
            channelIdentification: ''
          }
        ],
        channelCast: {
          channelCode: '',
          channelName: '',
          channelCastType: '' //枚举
        }
      }
      // channelIdentification
      if (model.channelIdentification.length > 0) {
        widgetOpts.channelIdentification.channelIdentificationWidgets = []
        model.channelIdentification.forEach(() => {
          widgetOpts.channelIdentification.channelIdentificationWidgets.push(widgetOpts.channelIdentification.widgets)
        })
      }
      var newString = JSON.stringify({ isNewAdd: true, model: model, widgetOpts: widgetOpts })
      routers.push(`/dashboard/channel/detail?data=${newString}`)
    }
  },
  //4、贷款产品页
  {
    element: '#guide-step4',
    stageBackground: 'transparent', // 这将覆盖驱动程序中设置的
    popover: {
      className: 'default-line',
      title: language.t('guideStep.guideTitle4'),
      description: language.t('guideStep.guideDesc4')
    },
    onNext: () => {
      // 从当前步骤移动到下一步时调用
      utils.setStore('GUIDE-SAVE-SETP5', '', localStorage)
      routers.push(`/dashboard/loanProduct/add`)
    },
    onHighlightStarted: () => {
      console.log('保存第四步贷款产品页引导==>')
      utils.setStore('GUIDE-SAVE-SETP4', 'true', localStorage)
    },
    onPrevious: () => {
      // 从当前步骤移动到上一步时调用
      utils.setStore('GUIDE-SAVE-SETP3', '', localStorage)
      routers.push(`/dashboard/ratePlan`)
    }
  },
  //5、贷款产品详情页
  {
    element: '#guide-step5',
    stageBackground: 'transparent', // 这将覆盖驱动程序中设置的
    popover: {
      className: 'right-bottom-default-line',
      title: language.t('guideStep.guideTitle5'),
      description: language.t('guideStep.guideDesc5'),
      position: 'right-bottom'
    },
    onNext: () => {},
    onHighlightStarted: () => {
      console.log('保存第五步贷款产品详情引导==>')
      utils.setStore('GUIDE-SAVE-SETP5', 'true', localStorage)
    },
    onPrevious: () => {
      utils.setStore('GUIDE-SAVE-SETP4', '', localStorage)
      routers.push(`/dashboard/loanProduct`)
    }
  }
]
