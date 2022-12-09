/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/customerOffer/components/customerOfferWidgets/index.js
 * @Date         : 2022-05-10 10:54:48
 * @LastEditTime : 2022-06-28 13:38:04
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import { transformLoanTerm } from '@/plugin/filters'

export default {
  name: 'customerOfferWidgets',
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
