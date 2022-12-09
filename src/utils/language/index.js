/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/utils/language/index.js
 * @Date         : 2022-02-21 17:04:19
 * @LastEditTime : 2022-08-17 10:29:45
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import Vue from 'vue'
import locale from 'element-ui/lib/locale' //elementUI的国际化
import VueI18n from 'vue-i18n'
import languagePack from './langs'
import utils from '../storage'
import base from '../base'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: process.env.VUE_APP_ENV == 'production' ? 'en' : utils.getStore('Language', localStorage) || base.getSystemLanguage(), //从localStorage中取，没有就默认浏览器语言
  messages: languagePack, //需要声明键名而不是直接使用
  silentTranslationWarn: true //此为删除控制台报警
})
locale.i18n((key, value) => i18n.t(key, value)) //elementui多语言切换

export default i18n
