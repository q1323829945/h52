/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/apply/loan/components/moblieApplyWidgets/index.js
 * @Date         : 2022-08-12 16:06:28
 * @LastEditTime : 2022-12-02 17:14:57
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from '@/utils'

export default {
  name: 'moblieApplyWidgets',
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
    isShowEdit: {
      type: Boolean,
      default: false
    },
    eventObj: {
      type: Object,
      required: false,
      default() {
        return {
          isEvent: false,
          eventType: '',
          status: ''
        }
      }
    },
    // 是否有为插槽
    isSlot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEditTemp: this.isEdit,
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
    }
  },
  watch: {},
  created() {
    this.isEditTemp = this.eventObj.status == 'PROCESSING' && this.eventObj.isEvent && this.eventObj.eventType == 'RECOMMEND_PRODUCT' ? false : true
    console.log('this.isEvent==>', this.eventObj)
  },
  methods: {
    getBirthDate(date) {
      this.modelTemp.personalInformation.birthDay = utils.fomartDate(date, '{y}-{m}-{d}')
    },
    handleEdit() {
      // this.isEdit = !this.isEdit
      this.$emit('handleEdit')
    },
    handleDownload(value) {
      this.$emit('handleDownload', value)
    },
    selectChangeProduct(event) {
      console.log('event==>', event)
      // if (!this.eventObj.isEvent) {
      //   this.$emit('handleSave', this.modelTemp)
      // }
      // this.$emit('handleSave', this.modelTemp)
    },
    /**
     * @description: 保存
     * @param {*}
     * @return {*}
     */
    handleSave() {
      // this.$emit('handleSave', this.modelTemp)
      this.$refs.moblieApplyFormData.validate(valid => {
        if (valid) {
          this.$emit('handleSave', this.modelTemp)
        } else {
          this.$message.error('Select Product')
          return false
        }
      })
    }
  }
}
