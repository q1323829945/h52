/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/components/kabuhayanProductWidgets/index.js
 * @Date         : 2022-08-12 16:06:28
 * @LastEditTime : 2022-08-19 17:03:30
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import { transformLoanTerm } from '@/plugin/filters'
import config from '@/views/admin/customerOffer/optsConfig/newClientProductCongfig'

export default {
  name: 'kabuhayanProductWidgets',
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
  watch: {},
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
    getBirthDate(date) {
      console.log('date==>', date)
    },
    /**
     * @description: checkbox 点击单个文件
     * @param {*} type 类型
     * @param {*} value
     */
    getFileCheckboxValue(event, type) {
      console.log('event==>', event)
      let checkedCount = event.length
      if (type == 'purpose') {
        this.widgetOpts.loanInformation.purpose.checkFileAll = checkedCount === config.purposeOpts.length
        this.widgetOpts.loanInformation.purpose.isFileIndeterminate = checkedCount > 0 && checkedCount < config.purposeOpts
        this.$forceUpdate()
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
      if (type == 'purpose') {
        if (event) {
          this.modelTemp.loanInformation.purpose = []
          item.list.forEach(element => {
            this.modelTemp.loanInformation.purpose.push(element.value)
          })
        } else {
          this.modelTemp.loanInformation.purpose = []
        }
        this.widgetOpts.loanInformation.purpose.isFileIndeterminate = false
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
