import Vue from 'vue'
import App from './App.vue'
import routers from '@/router'
import Layout from '@/layout'
// 将接口挂载vue上，全局使用
import * as serviceApi from '@/server'
import store from './store/store.js'
//ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 国际化 实例变量必须声明为i18n，不可更改更改报_t undefined的错误
import i18n from './utils/language/index'
// 加入公共的全局methods方法
import mixin from '@/mixins'
import * as filters from './plugin/filters'
import '@/assets/font/iconfont.css'
import '@/assets/styles/index.less'
import utils from '@/utils'

// 引导页
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

// //全局引入echarts
// import * as echarts from 'echarts'
// //需要挂载到Vue原型上
// Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(Layout)
Vue.mixin(mixin)

//插入过滤器名和对应方法
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const globalVue = new Vue({
  el: '#app',
  i18n, // i18n挂载
  store,
  router: routers,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$api = serviceApi
    // 左侧边栏折叠状态
    this.isCollapse = Boolean(utils.getStore('LEFT-MENU-COLLAPSE', localStorage))
    this.$store.commit('set_menuIsCollapse', this.isCollapse)

    // 引导页
    const driver = new Driver({
      opacity: 0, //背景不透明度（0表示只有弹出窗口，没有覆盖）
      animate: false, // 不使用动画效果,避免圈定内容未出现，显示空白
      // //初始化引导页
      overlayClickNext: false,
      doneBtnText: 'Done', // 结束按钮的文字
      allowClose: false, // 是否可以通过点击遮罩层关闭指引
      nextBtnText: 'Next', // 下一步按钮的文字
      prevBtnText: 'Prev', // 上一步按钮的文字
      closeBtnText: 'Close', // 关闭按钮的文字
      keyboardControl: false, // 是否允许键盘操控
      xCloseButton: false // 将关闭按钮作为X放在弹出
    })

    Vue.prototype.$driver = driver
  }
})

window.globalVue = globalVue
