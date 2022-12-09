/*
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/channel/components/channelInfoWidget/index.js
 * @Date         : 2022-05-05 10:32:49
 * @LastEditTime : 2022-12-05 14:44:15
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
export default {
  name: 'channelInfoWidget',
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
    castTypeList: {
      type: Array,
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
      modelTemp: this.model,
      widgetOptsTemp: this.widgetOpts,
      // 使用Cascader 级联选择器后台返回的数据和要求的不一致时，做出相应改变
      optionProps: {
        value: 'name',
        label: 'name',
        children: 'children'
      },
      cascaderData: []
    }
  },
  watch: {
    model: {
      handler(newVal) {
        this.modelTemp = newVal
      },
      deep: true
    },
    widgetOpts: {
      handler(newVal) {
        this.widgetOptsTemp = newVal
      },
      deep: true
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    rules() {
      const rules = {
        legalEntityIndicator: [{ required: true, message: this.$t('organisationInfo.legalEntityIndicatorRules'), trigger: 'change' }],
        organisationSector: [{ required: true, message: this.$t('organisationInfo.organisationSectorRules'), trigger: 'change' }],
        placeOfRegistration: [{ required: true, message: this.$t('organisationInfo.placeOfRegistrationRules'), trigger: 'change' }],
        parentOrganisationId: [{ required: false, message: this.$t('organisationInfo.parentOrganisationIdRules'), trigger: 'change' }],
        organisationRegistrationDate: [{ required: true, message: this.$t('organisationInfo.organisationRegistrationDateRules'), trigger: 'change' }]
      }
      // 清空表单验证信息
      this.$nextTick(() => {
        this.$refs['channelInfoFormData'].clearValidate()
      })
      return rules
    },
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
  created() {
    for (let i = 0; i < this.castTypeList.length; i++) {
      const element = this.castTypeList[i]
      for (let j = 0; j < element.children.length; j++) {
        const obj = element.children[j]
        if (this.modelTemp.channelCast.channelCastType == obj.name) {
          this.cascaderData = [element.name, obj.name]
          break
        }
      }
    }
    // this.test = ['Bro', this.modelTemp[`${this.widgetOptsTemp.channelCast.section}`]['channelCastType']]
    console.log('this.cascaderData==>', this.cascaderData)
  },
  methods: {
    /**
     * @description: 输入限制
     * @param {*} section
     * @param {*} val
     * @param {*} key
     * @param {*} index
     */
    getInputValue(section, val, key, index) {
      // console.log('section', section)
      // console.log('val', val)
      // console.log('key', key)
      // console.log('index', index)
      switch (section) {
        case 'organizationalEntity':
          {
            if (index == 4) {
              this.modelTemp[`${key}`] = this.setInputReg(val)
            }
          }
          break
        case 'organisationIdentifications':
          {
            if (key == 'organisationIdentification') {
              this.modelTemp[`${section}`][index][`${key}`] = this.setInputReg(val)
            }
          }
          break
        default:
          break
      }
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
    /**
     * @description: 产品业务单元级联选择
     * @param value
     */
    handleChangeCascader(value) {
      this.modelTemp.channelCast.channelCastType = value ? value[1] : ''
      this.cascaderData = value
      this.$forceUpdate()
    },
    handlePush(obj = { section: '' }) {
      switch (obj.section) {
        case 'channelIdentification': {
          this.modelTemp.channelIdentification.push({
            channelIdentificationType: '', //枚举
            channelIdentification: ''
          })
          this.widgetOptsTemp.channelIdentification.channelIdentificationWidgets.push(this.widgetOptsTemp.channelIdentification.widgets)
          break
        }
        default:
          break
      }
    },
    /**
     * @description: 点击删除
     * @param {*} sectionIndex sectionIndex
     * @param {*} itemIndex itemIndex
     */
    handleDeleteDatasource(obj = { section: '', sectionIndex: -1 }) {
      // 新增
      if (obj.sectionIndex >= 0) {
        switch (obj.section) {
          case 'channelIdentification': {
            if (this.modelTemp.channelIdentification.length == 1) {
              this.$message(this.$t('commonDialog.keepAtLeastOne'))
              return
            }
            this.modelTemp.channelIdentification.splice(obj.sectionIndex, 1)
            this.widgetOptsTemp.channelIdentification.channelIdentificationWidgets.splice(obj.sectionIndex, 1)
            break
          }
          default:
            break
        }
      }
      this.$refs['channelInfoFormData'].clearValidate()
    },
    /**
     * @description: 保存
     * @param {*}
     * @return {*}
     */
    handleSave() {
      this.$refs.channelInfoFormData.validate(valid => {
        if (valid) {
          if (!this.isNewAdd) {
            delete this.modelTemp.channelCast
            delete this.modelTemp.channelCode
          }
          console.log('this.modelTemp==>', this.modelTemp)
          this.$emit('handleSave', this.modelTemp)
        } else {
          this.$message.error('The channel information is incomplete')
          return false
        }
      })
    }
  }
}
