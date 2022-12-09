/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/components/loanProductDetail/index.js
 * @Date         : 2022-04-21 11:06:58
 * @LastEditTime : 2022-08-12 13:52:43
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from '@/utils'
import loanConfig from '../../optsConfig/loanConfig'

export default {
  name: 'productDetail',
  props: {
    data: {
      type: Object,
      default() {}
    },
    detailModel: {
      type: Object,
      default() {
        return {
          name: '',
          productType: '', //枚举 NEW_CLIENT CLIENT TEACHER KABUHAYAN CORPORATE
          interestFeature: {
            //这个还是先用以前的
            interestType: '',
            ratePlanId: '',
            baseYearDays: '',
            adjustFrequency: '',
            overdueInterestRatePercentage: ''
          },
          questionnaires: []
        }
      }
    },
    ratePlanList: {
      type: Array,
      required: true,
      default: []
    },
    questionnaireList: {
      type: Array,
      required: true,
      default: []
    },
    labelWidth: {
      type: String,
      default: '60px'
    },
    optionList: {
      type: Array,
      required: false
    },
    // 是否有为插槽
    isSlot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validateQuestionnaires = (rule, value, callback) => {
      if (this.detailModelTemp.questionnaires.length == 0) {
        callback(new Error(this.$t('loanProduct.questionnairesConfigRules')))
      } else {
        callback()
      }
    }
    return {
      validateQuestionnaires,
      detailOpts: [],
      isEdit: false,
      checkFileAll: false,
      isFileIndeterminate: true,
      detailModelTemp: this.detailModel,
      tempQuestionnaireList: this.questionnaireList
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    rules() {
      const rules = {
        name: [{ required: true, message: this.$t('loanProduct.nameRules'), trigger: 'change' }],
        productType: [{ required: true, message: this.$t('loanProduct.typeRules'), trigger: 'change' }]
      }
      // 清空表单验证信息
      this.$nextTick(() => {
        this.$refs['loanProductDetail'].clearValidate()
      })
      return rules
    },
    setComputedWidth() {
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 80
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
    setElColSpan() {
      const span = this.$i18n.locale == 'en' ? 8 : 6
      return span
    }
  },
  watch: {
    // 利率计划
    detailModel: {
      handler(newVal) {
        this.detailModelTemp = newVal
        console.log('newVal detailModel==>', this.detailModelTemp)
      },
      deep: true
    },

    // 利率计划
    ratePlanList: {
      handler(newVal) {
        for (let i = 0; i < this.detailOpts.length; i++) {
          const opt = this.detailOpts[i]
          if (opt.section == 'interestFeature') {
            for (let j = 0; j < opt.widgets.length; j++) {
              const widget = opt.widgets[j]
              if (widget.key == 'ratePlanId') {
                widget.list = newVal
              }
            }
          }
        }
      },
      deep: true
    },

    // 文件配置
    questionnaireList: {
      handler(newVal) {
        console.log('watch detailModel==>', this.detailModel)
        this.detailOpts = JSON.parse(JSON.stringify(loanConfig.productWidgetOpts))

        this.tempQuestionnaireList = newVal
        for (let i = 0; i < this.detailOpts.length; i++) {
          const opt = this.detailOpts[i]
          if (opt.section == 'questionnairesConfig') {
            for (let j = 0; j < opt.widgets.length; j++) {
              const widget = opt.widgets[j]
              if (widget.key == 'questionnaires') {
                widget.list = this.tempQuestionnaireList
              }
            }
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.detailOpts = JSON.parse(JSON.stringify(loanConfig.productWidgetOpts))
    },
    /**
     * @description: checkbox 点击单个文件
     * @param {*} value
     */
    getFileCheckboxValue(value) {
      let checkedCount = value.length
      this.checkFileAll = checkedCount === this.tempQuestionnaireList.length
      this.isFileIndeterminate = checkedCount > 0 && checkedCount < this.questionnaireList
      this.$forceUpdate()
    },
    /**
     * @description:  checkbox 全选
     * @param {*} event
     * @param {*} item widget item
     */
    handleCheckBoxAllValue(event, item) {
      if (event) {
        this.detailModelTemp.questionnaires = []
        item.list.forEach(element => {
          this.detailModelTemp.questionnaires.push(element.value)
        })
      } else {
        this.detailModelTemp.questionnaires = []
      }
      this.isFileIndeterminate = false

      this.$forceUpdate()
    },
    /**
     * @description: 输入限制
     * @param {*} section
     * @param {*} val
     * @param {*} key
     * @param {*} index
     */
    formatNum(section, val, key, index) {
      // console.log('section', section)
      // console.log('val', val)
      // console.log('key', key)
      console.log('index', index)

      switch (section) {
        case 'interestFeature':
          {
            let temp = utils.formatInputNumber(val)
            this.detailModelTemp[section][`${key[0]}`] = temp
          }
          break
        default:
          break
      }
      this.$forceUpdate()
    },
    forceUpdate() {
      this.$forceUpdate()
    },
    // 取消编辑
    handleCancelEdit() {
      this.isEdit = !this.isEdit
      this.$emit('handleCancelEdit')
    },
    clearValidate() {
      // 清空表单验证信息
      this.$nextTick(() => {
        this.$refs['loanProductDetail'].clearValidate()
      })
    },
    /**
     * @description: 提交
     * @param {*} formName
     */
    commit() {
      // 为表单绑定验证功能
      this.$refs.loanProductDetail.validate(valid => {
        console.log('commit==>', this.detailModelTemp)

        if (valid) {
          if (this.detailModelTemp.questionnaires.length == 0) {
            this.$message.error(this.$t('loanProduct.questionnairesConfigRules'))
            return
          }
          let param = this.detailModelTemp
          let data = {
            formData: param
          }
          this.$emit('handleAdd', data)
        } else {
          this.$message.error(this.$t('commonDialog.productFormMessage'))
          return false
        }
      })
    }
  }
}
