/*
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/pdpa/components/authWidget/index.js
 * @Date         : 2022-07-20 16:37:26
 * @LastEditTime : 2022-07-22 10:22:16
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  name: 'authWidget',
  components: {},
  props: {
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
    isNewAdd: {
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
      modelTemp: this.model
    }
  },
  watch: {
    model: {
      handler(newVal) {
        this.modelTemp = newVal
      },
      immediate: true
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
    setWidgetClass() {
      const className = this.$i18n.locale == 'en' ? 'datasource-widget' : 'datasource-widget widget-width '
      return className
    }
  },
  created() {},
  methods: {
    selectChange() {
      // this.forceUpdate()
      // console.log('modelTemp==>', this.modelTemp)
      let param = {
        isElectronicSignature: this.modelTemp.isElectronicSignature.value,
        isFaceRecognition: this.modelTemp.isFaceRecognition.value,
        isFingerprint: this.modelTemp.isFingerprint.value
      }
      this.$emit('handleSave', param)
    },
    forceUpdate() {
      this.$forceUpdate()
    }
  }
}
