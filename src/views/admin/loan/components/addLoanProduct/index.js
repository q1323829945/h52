/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/components/addLoanProduct/index.js
 * @Date         : 2022-04-21 10:58:09
 * @LastEditTime : 2022-11-14 09:52:46
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import utils from '@/utils'
import loanConfig from '../../optsConfig/loanConfig'

export default {
  name: 'productDetail',
  props: {
    ratePlanList: {
      type: Array,
      required: true
    },
    questionnaireList: {
      type: Array,
      required: true
    },
    labelWidth: {
      type: String,
      default: '60px'
    },
    optionList: {
      type: Array,
      required: false
    },
    model: {
      type: Object,
      required: false
    },
    // 是否有为插槽
    isSlot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEdit: true,
      checkFileAll: false,
      isFileIndeterminate: true,
      tempQuestionnaireList: this.questionnaireList,
      detailOpts: [],
      // model
      detailModel: this.model
      // detailModel: {
      //   name: '',
      //   productType: '', //枚举 NEW_CLIENT CLIENT TEACHER KABUHAYAN CORPORATE
      //   ratePlanId: '',
      //   questionnaires: []
      // }
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
        this.$refs['addProductFormData'].clearValidate()
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
        console.log('list==>', this.detailOpts[1].widgets[0].list)
      },
      deep: true
    },

    // 问答配置
    questionnaireList: {
      handler(newVal) {
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
        this.$forceUpdate()
      },
      deep: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      console.log('model==>', this.detailModel)
      this.detailOpts = JSON.parse(JSON.stringify(loanConfig.productWidgetOpts))
      this.tempQuestionnaireList = this.questionnaireList

      // 利率计划
      for (let i = 0; i < this.detailOpts.length; i++) {
        const opt = this.detailOpts[i]
        if (opt.section == 'interestFeature') {
          for (let j = 0; j < opt.widgets.length; j++) {
            const widget = opt.widgets[j]
            if (widget.key == 'ratePlanId') {
              widget.list = this.ratePlanList
            }
          }
        }
      }

      // 问答配置
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
        this.detailModel.questionnaires = []
        item.list.forEach(element => {
          this.detailModel.questionnaires.push(element.value)
        })
      } else {
        this.detailModel.questionnaires = []
      }
      this.isFileIndeterminate = false

      this.$forceUpdate()
    },
    /**
     * @description: 产品业务单元级联选择
     * @param value
     */
    handleChangeCascader(value) {
      this.detailModel.businessUnit = value[1]
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
            this.detailModel[section][`${key[0]}`] = temp
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
    // 是否编辑
    handleCancelEdit() {
      this.isEdit = !this.isEdit
      this.forceUpdate()
    },
    clearValidate() {
      // 清空表单验证信息
      this.$nextTick(() => {
        this.$refs['addProductFormData'].clearValidate()
      })
    },
    /**
     * @description: 提交
     * @param {*} formName
     */
    commit() {
      // 为表单绑定验证功能
      this.$refs.addProductFormData.validate(valid => {
        if (valid) {
          if (this.detailModel.questionnaires.length == 0) {
            this.$message.error(this.$t('loanProduct.questionnairesConfigRules'))
            return
          }
          let param = this.detailModel
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
