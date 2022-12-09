/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/apply/loan/components/carProductWidgets/index.js
 * @Date         : 2022-12-01 13:40:36
 * @LastEditTime : 2022-12-01 17:33:31
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import config from '../../optsConfig/teacherProductConfig'
import utils from '@/utils'

export default {
  name: 'carProductWidgets',
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
      widgetOptsTemp: this.widgetOpts,
      financialInformationModel: {
        sourceOfFunds: null,
        existingBDONetworkBankAccount: null,
        existingBDOAccount: null,
        otherBankAccount: null
      }
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
    }
  },
  watch: {},
  created() {},
  methods: {
    setIsOthersValue(value) {
      if (this.isEdit) {
        if (value.data == 'Others') {
          for (let index = 0; index < this.widgetOpts.financialInformation.widgets.length; index++) {
            const widget = this.widgetOpts.financialInformation.widgets[index]
            if (value.widget.key == widget.key) {
              value.widget.isEdit = true
            }
          }
        } else {
          for (let index = 0; index < this.widgetOpts.financialInformation.widgets.length; index++) {
            const widget = this.widgetOpts.financialInformation.widgets[index]
            if (value.widget.key == widget.key) {
              value.widget.isEdit = false
            }
          }
        }
      }
      return value.widget.isEdit
    },
    handleSelectChange(section, financialItem) {
      console.log('section==>', section)
      console.log('key==>', financialItem)
      console.log('this.modelTemp[`${section}`][`${key}`]==>', this.modelTemp[`${section}`][`${financialItem.key}`])

      this.setIsOthersValue({ data: this.modelTemp[`${section}`][`${financialItem.key}`], widget: financialItem })
      this.$forceUpdate()
      // this.modelTemp[`${section}`][`${key}`]
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
      this.modelTemp.personalInformation.birthDay = utils.fomartDate(date, '{y}-{m}-{d}')
      console.log('utils==>', this.modelTemp.personalInformation.birthDay)
      console.log('date==>', date)
    },
    /**
     * @description: checkbox 点击单个文件
     * @param {*} value
     */
    getFileCheckboxValue(value) {
      let checkedCount = value.length
      this.checkFileAll = checkedCount === config.purposeOpts.length
      this.isFileIndeterminate = checkedCount > 0 && checkedCount < config.purposeOpts
      this.$forceUpdate()
    },
    /**
     * @description:  checkbox 全选
     * @param {*} event
     * @param {*} item widget item
     */
    handleCheckBoxAllValue(event, item) {
      if (event) {
        this.modelTemp.loanInformation.purpose = []
        item.list.forEach(element => {
          this.modelTemp.loanInformation.purpose.push(element.value)
        })
      } else {
        this.modelTemp.loanInformation.purpose = []
      }
      this.isFileIndeterminate = false

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
