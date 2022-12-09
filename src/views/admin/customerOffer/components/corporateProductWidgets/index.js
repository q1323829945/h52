/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/components/corporateProductWidgets/index.js
 * @Date         : 2022-08-12 16:06:28
 * @LastEditTime : 2022-08-17 14:37:30
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import { transformLoanTerm } from '@/plugin/filters'
import config from '@/views/admin/customerOffer/optsConfig/corporateProductConfig'

export default {
  name: 'corporateProductWidgets',
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
    return {
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
    /**
     * @description: checkbox 点击单个文件
     * @param {*} type 类型
     * @param {*} value
     */
    getFileCheckboxValue(event, type) {
      console.log('event==>', event)
      let checkedCount = event.length
      if (type == 'workingCapital') {
        this.widgetOpts.loanInformation.purpose.workingCapital.checkFileAll = checkedCount === config.workingCapitalOpts.length
        this.widgetOpts.loanInformation.purpose.workingCapital.isFileIndeterminate = checkedCount > 0 && checkedCount < config.biometricsOpts
      } else if (type == 'capex') {
        this.widgetOpts.loanInformation.purpose.capex.checkFileAll = checkedCount === config.capexOpts.length
        this.widgetOpts.loanInformation.purpose.capex.isFileIndeterminate = checkedCount > 0 && checkedCount < config.biometricsOpts
      } else if (type == 'investment') {
        this.widgetOpts.loanInformation.purpose.investment.checkFileAll = checkedCount === config.investmentOpts.length
        this.widgetOpts.loanInformation.purpose.investment.isFileIndeterminate = checkedCount > 0 && checkedCount < config.biometricsOpts
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
      if (type == 'workingCapital') {
        if (event) {
          this.modelTemp.loanInformation.purpose.workingCapital = []
          item.list.forEach(element => {
            this.modelTemp.loanInformation.purpose.workingCapital.push(element.value)
          })
        } else {
          this.modelTemp.loanInformation.purpose.workingCapital = []
        }
        this.widgetOpts.loanInformation.purpose.workingCapital.isFileIndeterminate = false
      } else if (type == 'capex') {
        if (event) {
          this.modelTemp.loanInformation.purpose.capex = []
          item.list.forEach(element => {
            this.modelTemp.loanInformation.purpose.capex.push(element.value)
          })
        } else {
          this.modelTemp.loanInformation.purpose.capex = []
        }
        this.widgetOpts.loanInformation.purpose.capex.isFileIndeterminate = false
      } else if (type == 'investment') {
        if (event) {
          this.modelTemp.loanInformation.purpose.investment = []
          item.list.forEach(element => {
            this.modelTemp.loanInformation.purpose.investment.push(element.value)
          })
        } else {
          this.modelTemp.loanInformation.purpose.investment = []
        }
        this.widgetOpts.loanInformation.purpose.investment.isFileIndeterminate = false
      }
      this.$forceUpdate()
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
    handleDownload(value) {
      this.$emit('handleDownload', value)
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
