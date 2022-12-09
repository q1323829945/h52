/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/components/workFlowDialog/index.js
 * @Date         : 2022-10-25 16:32:45
 * @LastEditTime : 2022-11-08 16:16:30
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import PublicTable from 'components/publicTable'
import api from '@/server/api'
// import utils from '@/utils'
import Pagination from 'components/pagination'
import workFlowConfig from '../../optsConfig/workFlowConfig'

export default {
  name: 'workFlowDialog',
  components: {
    PublicTable,
    Pagination
  },
  props: {
    workFlowDialogObj: {
      type: Object,
      default() {
        return {
          title: '利率',
          addDialogVisible: false
        }
      }
    }
  },
  data() {
    return {
      showAdd: true,
      isQuery: false,
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      activityId: '',
      processId: '',
      eventId: '',
      eventTypeOpts: [],
      tableData: [],
      // table
      tableHead: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Description',
          value: 'description'
        },
        {
          label: 'Type',
          type: 'slot',
          slotName: 'type'
        },
        {
          label: 'Sort',
          value: 'sort'
        },
        {
          label: 'role.operation',
          type: 'slot',
          slotName: 'handle',
          fixed: 'right',
          width: '180px'
        }
      ],
      dialogType: 'Add', //弹窗类型  Fixed自定义固定利率/标准利率， Amount自定义金额分层利率， Term自定义期限分层利率
      // 新增表单验证
      addDialogVisible: false,
      addFormLabel: {
        type: 'workFlowConfig.type',
        sort: 'workFlowConfig.sort'
      },
      addFormData: {
        type: '',
        sort: ''
      }
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        type: [{ required: true, message: `${this.$t('workFlowConfig.typeRule')}`, trigger: 'change' }],
        sort: [{ required: true, message: `${this.$t('workFlowConfig.sortRule')}`, trigger: 'change' }]
      }
      return addRules
    },
    setTypeLabel() {
      return value => {
        let label = ''
        for (let index = 0; index < this.eventTypeOpts.length; index++) {
          const element = this.eventTypeOpts[index]
          if (value == element.value) {
            label = element.label
            break
          }
        }
        return label
      }
    },
    setStatusLabel() {
      return value => {
        let label = ''
        for (let index = 0; index < workFlowConfig.stepOpts.length; index++) {
          const element = workFlowConfig.stepOpts[index]
          if (value == element.value) {
            label = element.label
            break
          }
        }
        return label
      }
    }
  },
  watch: {
    workFlowDialogObj: {
      handler(newVal) {
        this.isQuery = newVal.isQuery
        this.activityId = newVal.id
        this.processId = newVal.processId
        this.dialogType = newVal.type
        this.addDialogVisible = newVal.addDialogVisible
        if (newVal.show) {
          this.requstWorkFlowEventData()
        }
      },
      deep: true
    }
  },
  created() {
    this.initData()
    this.requstWorkFlowEventData()
  },
  mounted() {},
  methods: {
    initData() {
      this.isQuery = this.workFlowDialogObj.isQuery
      this.dialogType = this.workFlowDialogObj.type
      this.activityId = this.workFlowDialogObj.id
      this.processId = this.workFlowDialogObj.processId
      this.addDialogVisible = this.workFlowDialogObj.addDialogVisible
      this.eventTypeOpts = workFlowConfig.eventTypes
      this.showAdd = this.isQuery ? false : this.workFlowDialogObj.status == 'READY' ? true : false

      if (this.isQuery) {
        // 查询页面
        this.tableHead = [
          {
            label: 'Name',
            value: 'name'
          },
          {
            label: 'Position',
            value: 'position'
          },
          {
            label: 'Description',
            value: 'description'
          },
          {
            label: 'Status',
            type: 'slot',
            slotName: 'status'
          },
          {
            label: 'Type',
            type: 'slot',
            slotName: 'type'
          },
          {
            label: 'Start Time',
            type: 'slot',
            slotName: 'start'
          },
          {
            label: 'End Time',
            type: 'slot',
            slotName: 'end'
          }
        ]
      } else {
        // 工作流
        this.tableHead = [
          {
            label: 'Name',
            value: 'name'
          },
          {
            label: 'Description',
            value: 'description'
          },
          {
            label: 'Type',
            type: 'slot',
            slotName: 'type'
          },
          {
            label: 'Sort',
            value: 'sort'
          },
          {
            label: 'role.operation',
            type: 'slot',
            slotName: 'handle',
            fixed: 'right',
            width: '150px'
          }
        ]
      }
    },
    resetFields() {
      this.addFormData = { type: '', sort: '' }
      this.addDialogVisible = false
    },
    /**
     * @description: 排序只能输入整数
     * @param {*} val
     */
    formatNumber(val) {
      let temp = val.toString()
      temp = temp.replace(/\D/g, '').replace(/^0{1,}/g, '')
      this.addFormData.sort = temp
    },
    /**
     * @description: 工作流事件数据
     */
    requstWorkFlowEventData() {
      let url = this.isQuery
        ? `${api.admin.query_step_event_jsons}/${this.activityId}`
        : `${api.admin.query_definition_event_jsons}/${this.activityId}`
      this.requstBaseData({
        url: url,
        param: { page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm: {
            paramUrl: true,
            showMessage: true
          }
        }
      })
    },
    /**
     * @description: 请求基础方法
     * @param {*} requestBody requestBody
     */
    requstBaseData(requestBody = {}) {
      let defaultBody = {
        url: 'query_definition_event_jsons',
        param: {},
        optionParam: {},
        isHaneld: false
      }
      let body = Object.assign(defaultBody, requestBody)
      if (body.isHaneld) {
        var loading = this.$loading({
          lock: true,
          text: requestBody.loadText,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      this.$api
        .fetch(body.url, body.param, body.optionParam)
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          if (data.length > 0) {
            data.forEach(item => {
              item.isDeleteVisible = false
            })
          }

          if (body.isHaneld) {
            loading.close()
            this.resetFields()
            this.requstWorkFlowEventData()
          } else {
            this.tableData = data
            this.sumTotal = res.paged.total
          }
        })
        .catch(msg => {
          this.loading = false
          if (body.isHaneld) {
            loading.close()
          }
          this.$message.error(msg)
        })
    },
    /**
     * @description:提交添加/修改的利率
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('ppppp==>', this.addFormData)
          this.addDialogVisible = false
          if (this.dialogType == 'add') {
            // 新增
            let body = {
              loadText: this.$t('loading.add'),
              url: 'query_definition_event_jsons',
              param: { processId: this.processId, activityId: this.activityId, ...this.addFormData },
              optionParam: {
                method: 'post',
                comm: {
                  showMessage: true
                }
              },
              isHaneld: true
            }
            this.requstBaseData(body)
          } else {
            // 修改
            let body = {
              loadText: this.$t('loading.change'),
              url: `${api.admin.query_definition_event_jsons}/${this.eventId}`,
              param: { processId: this.processId, activityId: this.activityId, ...this.addFormData },
              optionParam: {
                method: 'put',
                comm: {
                  showMessage: true
                }
              },
              isHaneld: true
            }
            this.requstBaseData(body)
          }
        } else {
          return false
        }
      })
    },
    /**
     * @description: 删除事件
     * @param {*} data 事件
     */
    handDelete(data) {
      data.isDeleteVisible = false
      let body = {
        loadText: this.$t('loading.delete'),
        url: `${api.admin.query_definition_event_jsons}/${data.id}`,
        param: {},
        optionParam: {
          method: 'delete',
          comm: {
            showMessage: true
          }
        },
        isHaneld: true
      }
      this.requstBaseData(body)
    },
    /**
     * @description: 新增事件弹窗
     * @param {*} type 弹窗类型
     * @param {*} value data
     */
    hanleShowDialog(type, value = null) {
      this.dialogType = type
      this.addDialogVisible = true
      if (value != null) {
        this.eventId = value.id
        this.addFormData = { type: value.type, sort: value.sort }
      }
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstWorkFlowEventData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstWorkFlowEventData()
    }
  }
}
