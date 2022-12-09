/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/optsConfig/workflowGuide.js
 * @Date         : 2022-11-14 13:29:36
 * @LastEditTime : 2022-11-14 13:50:03
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import language from '@/utils/language'

// 自定义popover description事件
export const test = function () {
  console.log('guide test==>')
}

export default [
  //1、添加渠道
  {
    element: '#workflow-guide-step1',
    stageBackground: 'transparent',
    popover: {
      className: 'only-one-line',
      title: language.t('guideStep.guideTitle1'),
      // 自定义description html
      // description: `<div class="test-decs" onclick="test()">插入的html</div>`
      description: language.t('guideStep.guideDesc1')
    },
    onNext: () => {
      // 从当前步骤移动到下一步时调用
    },
    onPrevious: () => {}
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
    onNext: () => {},
    onPrevious: () => {}
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
    onNext: () => {},
    onPrevious: () => {}
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
    onNext: () => {},
    onPrevious: () => {}
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
    onPrevious: () => {}
  }
]
