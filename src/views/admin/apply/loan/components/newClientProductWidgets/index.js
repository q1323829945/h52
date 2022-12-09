/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/components/newClientProductWidgets/index.js
 * @Date         : 2022-08-12 16:06:28
 * @LastEditTime : 2022-09-20 16:32:26
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import { transformLoanTerm } from '@/plugin/filters'
import config from '../../optsConfig/newClientProductCongfig'
import utils from '@/utils'

export default {
  name: 'newClientProductWidgets',
  components: {},
  props: {
    widgetOpts: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    // 是否有为插槽
    isSlot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validatePurpose = (rule, value, callback) => {
      if (this.modelTemp.loanInformation.purpose == 0) {
        callback(new Error(''))
      } else {
        callback()
      }
    }
    return {
      validatePurpose,
      checkFileAll: false,
      isFileIndeterminate: true,
      modelTemp: this.model,
      widgetOptsTemp: this.widgetOpts
    }
  },
  computed: {
    setComputedWidth() {
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 120
        return `${width}px`
      }
    },
    setSysComputedWidth() {
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 120
        if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
          return `${width}px`
        } else {
          return `${width + 20}px`
        }
      }
    },
    setTermMaxValue() {
      return value => {
        return `${transformLoanTerm(value)}`
      }
    }
  },
  watch: {
    // 利率计划
    // model: {
    //   handler(newVal) {
    //     this.modelTemp = newVal
    //     console.log('this.detailModelTemp.loanInformation.purpose==>', this.modelTemp.loanInformation.purpose)
    //     this.widgetOptsTemp.purpose.widgets[0].list = this.modelTemp.loanInformation.purpose
    //   },
    //   deep: true
    // }
  },
  created() {},
  methods: {
    closeCustomerOfferSelect(e, refName) {
      this.$nextTick(() => {
        //不显示下拉框
        let component = this.$refs[refName]
        component.forEach(element => {
          element.blur()
        })
      })
    },
    setInputReg(value) {
      const self = this
      let val = value
      let reg = /^[0-9a-zA-Z]*$/g
      if (!reg.test(val)) {
        self.$message.error(`${self.$t('commonDialog.digitsAndEnglish')}`)
        self.remoteOptions = []
        val = ''
      } else {
        // eslint-disable-next-line no-self-assign
        val = val
      }
      return val
    },
    getBirthDate(date, key) {
      console.log('date==>', date)
      console.log('key==>', key)
      if (key == 'birthDay') {
        this.modelTemp.customerInformation.birthDay = utils.fomartDate(date, '{y}-{m}-{d}')
        console.log('utils==>', this.modelTemp.customerInformation.birthDay)
      } else {
        this.modelTemp.internal.openedDate = utils.fomartDate(date, '{y}-{m}-{d}')
        console.log('utils==>', this.modelTemp.internal.openedDate)
      }
    },
    /**
     * @description: checkbox 点击单个文件
     * @param {*} type 类型
     * @param {*} value
     */
    getFileCheckboxValue(event, type) {
      console.log('event==>', event)
      let checkedCount = event.length
      if (type == 'biometrics') {
        this.widgetOpts.internal.biometrics.checkFileAll = checkedCount === config.biometricsOpts.length
        this.widgetOpts.internal.biometrics.isFileIndeterminate = checkedCount > 0 && checkedCount < config.biometricsOpts
        this.$forceUpdate()
      } else if (type == 'fundsSource') {
        this.widgetOpts.financialInformation.fundsSource.checkFileAll = checkedCount === config.fundSourceOpts.length
        this.widgetOpts.financialInformation.fundsSource.isFileIndeterminate = checkedCount > 0 && checkedCount < config.fundSourceOpts
      } else if (type == 'natures') {
        this.widgetOpts.financialInformation.natures.checkFileAll = checkedCount === config.naturesOpts.length
        this.widgetOpts.financialInformation.natures.isFileIndeterminate = checkedCount > 0 && checkedCount < config.naturesOpts
      }
      this.$forceUpdate()
    },
    /**
     * @description:  checkbox 全选
     * @param {*} type 类型
     * @param {*} event
     * @param {*} item widget item
     */
    handleCheckBoxAllValue(event, type, item) {
      if (type == 'biometrics') {
        if (event) {
          this.modelTemp.internal.biometrics = []
          item.list.forEach(element => {
            this.modelTemp.internal.biometrics.push(element.value)
          })
        } else {
          this.modelTemp.internal.biometrics = []
        }
        this.widgetOpts.internal.biometrics.isFileIndeterminate = false
      } else if (type == 'fundsSource') {
        if (event) {
          this.modelTemp.financialInformation.fundsSource = []
          item.list.forEach(element => {
            this.modelTemp.financialInformation.fundsSource.push(element.value)
          })
        } else {
          this.modelTemp.financialInformation.fundsSource = []
        }
        this.widgetOpts.financialInformation.fundsSource.isFileIndeterminate = false
      } else if (type == 'natures') {
        if (event) {
          this.modelTemp.financialInformation.natures = []
          item.list.forEach(element => {
            this.modelTemp.financialInformation.natures.push(element.value)
          })
        } else {
          this.modelTemp.financialInformation.natures = []
        }
        this.widgetOpts.financialInformation.natures.isFileIndeterminate = false
      }
      this.$forceUpdate()
    },
    handleEdit() {
      // this.isEdit = !this.isEdit
      this.$emit('handleEdit')
    },
    /**
     * @description: 保存
     * @param {*}
     * @return {*}
     */
    handleSave() {
      this.$emit('handleSave', this.modelTemp)

      // this.$refs.customerOfferFormData.validate(valid => {
      //   if (valid) {
      //     this.$emit('handleSave', this.modelTemp)
      //   } else {
      //     this.$message.error(this.$t('commonDialog.personFormMessage'))
      //     return false
      //   }
      // })
    }
  }
}
