/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/channel/components/channelDialog/index.js
 * @Date         : 2022-09-15 16:41:48
 * @LastEditTime : 2022-11-08 11:06:24
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import PublicTable from 'components/publicTable'
import api from '@/server/api'
import utils from '@/utils'
import Pagination from 'components/pagination'
import channelConfig from '@/views/admin/channel/optsConfig/channelConfig'
import { utcToBeijing } from '@/plugin/filters'

export default {
  name: 'channelAgreementDialog',
  components: {
    PublicTable,
    Pagination
  },
  directives: {},
  filters: {},
  mixins: [],
  inheritAttrs: true,
  props: {
    dialogObj: {
      type: Object,
      default() {
        return {
          title: '利率'
        }
      }
    }
  },
  data: () => ({
    loading: true,
    widgetRefresh: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
    channelID: '',
    agreementTypeOpts: [],
    tableData: [],
    // table
    tableHead: [
      {
        label: 'Channel ID',
        value: 'channelId'
      },
      {
        label: 'Agreement Type',
        type: 'slot',
        slotName: 'agreementType'
      },
      {
        label: 'From Date',
        type: 'slot',
        slotName: 'fromDateTime'
      },
      {
        label: 'To Date',
        type: 'slot',
        slotName: 'toDateTime'
      },
      {
        label: 'Signed Date',
        type: 'slot',
        slotName: 'signedDate'
      },
      {
        label: 'users.operation',
        type: 'slot',
        slotName: 'operation',
        width: '180px',
        fixed: 'right'
      }
    ],
    commissionMethodTypeOpts: [],
    // commissionAmountRangeOpts: [],
    // commissionCountRangeOpts: [],
    // commissionApplyStatusOpts: [],
    // 新增表单验证
    addDialogVisible: false,
    addFormLabel: {
      agreementType: 'Agreement Type',
      commissionRatio: 'Commission Ratio',
      date: 'Date',
      commissionMethodType: 'Statistical Type',
      commissionAmountRange: 'Amount Range',
      commissionCountRange: 'Count Range',
      commissionAmount: 'Amount'
      // applyStatus: 'Apply Status'
    },
    addFormData: {
      agreementType: '',
      commissionMethodType: '',
      channelId: '',
      date: [],
      recordList: [{ commissionCountRange: '', commissionAmount: '' }],
      approvaledList: [{ commissionCountRange: '', commissionAmount: '' }]
    },
    addFormDataCommissionWidgets: {},
    // 修改表单验证
    changeDialogVisible: false,
    changeFormData: {
      agreementType: '',
      commissionMethodType: '',
      channelId: '',
      date: [],
      recordList: [{ commissionCountRange: '', commissionAmount: '' }],
      approvaledList: [{ commissionCountRange: '', commissionAmount: '' }]
    },
    formLabelWidth: '175px'
  }),
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        commissionRatio: [{ required: true, message: 'Can not be empty', trigger: 'change' }],
        agreementType: [{ required: true, message: 'Can not be empty', trigger: 'change' }],
        commissionMethodType: [{ required: true, message: 'Can not be empty', trigger: 'change' }],
        date: [
          {
            type: 'array',
            required: true,
            message: 'Please select date',
            fields: {
              //tpye类型试情况而定,所以如果返回的是date就改成date
              0: { type: 'string', required: true, message: '请选择开始日期' },
              1: { type: 'string', required: true, message: '请选择结束日期' }
            }
          }
        ]
      }
      return addRules
    },
    setAgreementType() {
      return value => {
        let label = '--'
        let opts = channelConfig.agreementTypeOpts
        for (let index = 0; index < opts.length; index++) {
          let element = opts[index]
          if (value == element.value) {
            label = element.label
            break
          }
        }
        return label
      }
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
    setLineWidth() {
      return function () {
        let length =
          this.addFormData.approvaledList.length - this.addFormData.recordList.length > 1
            ? this.addFormData.approvaledList.length
            : this.addFormData.recordList.length > this.addFormData.approvaledList.length
            ? this.addFormData.recordList.length
            : this.addFormData.approvaledList.length
        let padding = (length - 1) * 5
        let width = length > 1 ? 400 * length - padding + 'px' : '795px'
        return width
      }
    }
  },
  watch: {
    dialogObj: {
      handler(newVal) {
        this.channelID = newVal.id
        this.changeFormData.channelId = newVal.id
        this.addFormData = {
          agreementType: '',
          commissionMethodType: '',
          channelId: newVal.id,
          date: [],
          recordList: [{ commissionCountRange: '', commissionAmount: '' }],
          approvaledList: [{ commissionCountRange: '', commissionAmount: '' }]
        }
        if (newVal.show) {
          this.requstRateData()
        }
      },
      deep: true
    }
  },
  created() {
    this.agreementTypeOpts = channelConfig.agreementTypeOpts
    this.commissionMethodTypeOpts = channelConfig.commissionMethodTypeOpts
  },
  mounted() {},
  methods: {
    forceUpdate() {
      this.$forceUpdate()
    },
    // 删除
    handleDeleteCommission(type, itemIndex) {
      if (this.addFormData.recordList.length + this.addFormData.approvaledList.length <= 1) {
        this.$message.error('Keep at least one')
        return
      }
      if (type == 'Record') {
        if (this.addFormData.recordList.length > 0) {
          this.addFormData.recordList.splice(itemIndex, 1)
        }
      } else {
        if (this.addFormData.approvaledList.length > 0) {
          this.addFormData.approvaledList.splice(itemIndex, 1)
        }
      }
    },

    // 新增
    handlePush(type) {
      if (type == 'Record') {
        if (this.addFormData.commissionMethodType == '' || this.addFormData.commissionMethodType == 'COUNT_FIX_AMOUNT') {
          // 固定金额
          this.addFormData.recordList.push({
            commissionCountRange: '',
            commissionAmount: ''
          })
        } else {
          // 比例
          this.addFormData.recordList.push({
            commissionAmountRange: '',
            commissionRatio: ''
          })
        }
      } else {
        if (this.addFormData.commissionMethodType == '' || this.addFormData.commissionMethodType == 'COUNT_FIX_AMOUNT') {
          // 固定金额
          this.addFormData.approvaledList.push({
            commissionCountRange: '',
            commissionAmount: ''
          })
        } else {
          // 比例
          this.addFormData.approvaledList.push({
            commissionAmountRange: '',
            commissionRatio: ''
          })
        }
      }

      this.$forceUpdate()
    },
    /**
     * @description: select选择
     * @param {*} index index
     */
    handleSelectChange(event, index, key) {
      console.log('key==>', key)
      if (key == 'commissionMethodType') {
        if (event == 'COUNT_FIX_AMOUNT') {
          // 固定金额组件
          if (this.addFormData.recordList.length > 0) {
            this.addFormData.recordList = [
              {
                commissionCountRange: '',
                commissionAmount: ''
              }
            ]
          }

          if (this.addFormData.approvaledList.length > 0) {
            this.addFormData.approvaledList = [
              {
                commissionCountRange: '',
                commissionAmount: ''
              }
            ]
          }
        } else {
          // 比例组件
          if (this.addFormData.recordList.length > 0) {
            this.addFormData.recordList = [
              {
                commissionAmountRange: '',
                commissionRatio: ''
              }
            ]
          }

          if (this.addFormData.approvaledList.length > 0) {
            this.addFormData.approvaledList = [
              {
                commissionAmountRange: '',
                commissionRatio: ''
              }
            ]
          }
        }
      }
      this.$forceUpdate()
    },
    /**
     * @description: 输入限制
     * @param {*} val
     * @param {*} formName
     */
    formatNum(val, key, index, type) {
      console.log('type==>', type)
      let temp = utils.formatInputNumber(val)
      if (index > -1) {
        if (type == 'Record') {
          this.addFormData.recordList[index][`${key}`] = temp
        } else {
          this.addFormData.approvaledList[index][`${key}`] = temp
        }
      }
      this.$forceUpdate()
    },
    /**
     * @description: 查看、修改利率
     * @param {*} data 利率
     */
    handLook(data) {
      this.loading = true
      this.$api
        .fetch(
          `${api.admin.query_channel_jsons}/agreement/commission/${data.id}`,
          {
            page: this.currentPage,
            size: this.pageSize
          },
          {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        )
        .then(res => {
          this.loading = false
          this.changeDialogVisible = true
          const data = JSON.parse(JSON.stringify(res.data))
          console.log('data==>', data)
          this.changeFormData.recordList = []
          this.changeFormData.approvaledList = []
          this.changeFormData.agreementType = data.agreementType
          this.changeFormData.commissionMethodType = data.channelArrangement.commissionMethodType
          this.changeFormData.date = [utcToBeijing(data.fromDateTime), utcToBeijing(data.toDateTime)]

          data.channelArrangement.commissionItems.forEach(element => {
            if (element.applyStatus == 'APPROVALED') {
              Object.keys(element).forEach(item => {
                delete element.applyStatus
                delete element.channelArrangementId
                delete element.channelAgreementId
                delete element.id
                delete element.commissionType
                delete element.commissionMethodType
                if (element[item] === '' || element[item] === undefined || element[item] === null || element[item] === 'null') delete element[item]
              })
              this.changeFormData.approvaledList.push(element)
            } else {
              Object.keys(element).forEach(item => {
                delete element.applyStatus
                delete element.channelArrangementId
                delete element.channelAgreementId
                delete element.id
                delete element.commissionType
                delete element.commissionMethodType
                if (element[item] === '' || element[item] === undefined || element[item] === null || element[item] === 'null') delete element[item]
              })
              this.changeFormData.recordList.push(element)
            }
          })
          console.log('this.changeFormData==>', this.changeFormData)
        })
        .catch(() => {
          this.loading = false
        })
    },
    resetFields() {
      this.addDialogVisible = false
      this.changeDialogVisible = false

      this.addFormData.agreementType = ''
      this.addFormData.commissionMethodType = ''
      this.addFormData.date = []
      this.addFormData.recordList = [{ commissionCountRange: '', commissionAmount: '' }]
      this.addFormData.approvaledList = [{ commissionCountRange: '', commissionAmount: '' }]
      this.changeFormData = {}
    },
    /**
     * @description: 获取渠道协议列表
     */
    requstRateData() {
      this.$api
        .fetch(
          `${api.admin.query_channel_jsons}/agreement/${this.channelID}`,
          {
            page: this.currentPage,
            size: this.pageSize
          },
          {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(item => {
            item.isDeleteVisible = false
          })
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 利率，增改
     * @param {*} loadingText load文字
     * @param {*} url url
     * @param {*} param param
     * @param {*} optionParam optionParam
     */
    requstHandleRateData(loadingText, url, param, optionParam = {}) {
      const loading = this.$loading({
        lock: true,
        text: loadingText,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .fetch(url, param, optionParam)
        .then(() => {
          if (loading) {
            loading.close()
          }
          this.resetFields()
          this.requstRateData()
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.resetFields()
          this.$message.error(msg)
        })
    },
    setParamFloat(obj) {
      for (const key in obj) {
        if (key == 'commissionRatio') {
          obj[key] = parseFloat(obj[key])
        }
      }
    },
    /**
     * @description: click date picker
     */
    hanldDateChange() {
      if (this.addFormData.date != null) {
        this.addFormData.date = [utils.fomartDate(this.addFormData.date[0], '{y}-{m}-{d}'), utils.fomartDate(this.addFormData.date[1], '{y}-{m}-{d}')]
      }
    },
    setCommitParam() {
      console.log('data==>', this.addFormData)
      let tempApprovaledList = []
      let tempRecordList = []
      let channelCommissionArrangement = { commissionMethodType: this.addFormData.commissionMethodType, commissionItems: [] }
      if (this.addFormData.approvaledList.length > 0) {
        this.addFormData.approvaledList.forEach(element => {
          tempApprovaledList.push({ applyStatus: 'APPROVALED', ...element })
        })
      }

      if (this.addFormData.recordList.length > 0) {
        this.addFormData.recordList.forEach(element => {
          tempRecordList.push({ applyStatus: 'RECORD', ...element })
        })
      }

      channelCommissionArrangement.commissionItems = [...tempApprovaledList, ...tempRecordList]
      let param = {
        channelId: this.addFormData.channelId,
        agreementType: this.addFormData.agreementType,
        toDateTime: this.addFormData.date[1],
        fromDateTime: this.addFormData.date[0],
        channelCommissionArrangement: channelCommissionArrangement
      }
      console.log('param==>', param)

      return param
    },
    /**
     * @description:提交添加/修改的利率
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == 'changeRateForm') {
            this.changeDialogVisible = false
            this.setParamFloat(this.changeFormData)
            // 修改
            this.requstHandleRateData(
              this.$t('loading.change'),
              `${api.admin.query_interestRate_jsons}/${this.changeFormData.id}`,
              this.changeFormData,
              {
                method: 'put'
              }
            )
          } else {
            this.requstHandleRateData(this.$t('loading.add'), `${api.admin.query_channel_jsons}/agreement/commission`, this.setCommitParam(), {
              method: 'post',
              comm: {
                paramUrl: true,
                showMessage: true
              }
            })
          }
        } else {
          return false
        }
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstRateData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstRateData()
    }
  }
}
