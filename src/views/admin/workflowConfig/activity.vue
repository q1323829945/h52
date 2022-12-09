<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/activity.vue
 * @Date         : 2022-10-26 09:28:05
 * @LastEditTime : 2022-11-08 16:16:25
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <search-bar
      v-if="showAdd"
      ref="mySearchBar"
      :optionList="[]"
      :isAdd="true"
      :is-export="false"
      :is-import="false"
      @handle-push="hanleShowActivityDialog('add')"
    ></search-bar>
    <!-- 列表 -->
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
      <!-- status -->
      <template slot="status" slot-scope="slotProps">
        <div>{{ setStatusLabel(slotProps.data.status) }}</div>
      </template>
      <!-- start -->
      <template slot="start" slot-scope="slotProps">
        <div>{{ slotProps.data.start | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- end -->
      <template slot="end" slot-scope="slotProps">
        <div>{{ slotProps.data.end | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>

      <!-- handle -->
      <template slot="handle" slot-scope="slotProps">
        <!-- 修改 -->
        <el-button :disabled="!showAdd" size="mini" type="text" @click="hanleShowActivityDialog('change', slotProps.data)">
          {{ 'Modify' }}
        </el-button>
        <!-- 删除提醒气泡 -->
        <el-popconfirm
          hide-icon
          :title="'Delete this activity?'"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          @cancel="slotProps.data.isDeleteVisible = false"
          @confirm="handDelete(slotProps.data)"
        >
          <el-button :disabled="!showAdd" style="margin-left: 20px" slot="reference" type="text">
            {{ $t('button.delete') }}
          </el-button>
        </el-popconfirm>
        <!-- 打开事件 -->
        <el-button style="margin-left: 20px" size="mini" type="text" @click="handleShoweEventDialog(slotProps.data)">
          {{ 'Event' }}
        </el-button>
      </template>

      <!-- query-handle -->
      <template slot="query-handle" slot-scope="slotProps">
        <el-button size="mini" type="text" @click="handleShoweEventDialog(slotProps.data)">
          {{ 'Event' }}
        </el-button>
      </template>
    </public-table>

    <!-- 新增工作流活动弹窗 -->
    <popup-view
      v-if="showActivityDialog"
      :title="activityDialogType == 'add' ? 'Add Workflow Activity' : 'Modify Workflow Activity'"
      @handle-close="handleCloseActivityDialog"
      :width="'640px'"
    >
      <div>
        <el-form style="margin: 10px 5px 10px 0px" ref="addForm" :model="addFormData" :rules="addRules" :inline="true">
          <el-form-item v-for="(item, key) in addFormData" :key="key" :label="$t(addFormLabel[key])" :prop="`${key}`" :label-width="'100px'">
            <el-input
              v-if="key != 'position' && key != 'sort'"
              type="text"
              v-model="addFormData[key]"
              :placeholder="'Please input'"
              clearable
            ></el-input>
            <el-input
              v-if="key == 'sort'"
              type="text"
              @input="formatNumber(addFormData[key])"
              v-model="addFormData[key]"
              :placeholder="'Please input'"
              clearable
            ></el-input>
            <el-select v-if="key == 'position'" v-model="addFormData[key]" :placeholder="$t('select.place')" clearable>
              <el-option v-for="item in positionDatas" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="popup-footer">
          <el-button type="primary" @click="commmit('addForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </div>
    </popup-view>

    <!-- 工作流活动事件弹窗 -->
    <WorkFlowEventDialog v-if="workFlowEventDialogObj.show" ref="WorkFlowEventDialog" :workFlowDialogObj="workFlowEventDialogObj" />

    <!-- 页码 -->
    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from 'components/searceBar'
import api from '@/server/api'
import PopupView from 'components/popupView'
import utils from '@/utils'
import WorkFlowEventDialog from './components/workFlowDialog/index.vue'
import workFlowConfig from '@/views/admin/workflowConfig/optsConfig/workFlowConfig'

export default {
  components: {
    PublicTable,
    Pagination,
    SearchBar,
    PopupView,
    WorkFlowEventDialog
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      showAdd: true,
      isQuery: false,
      tableData: [],
      positionDatas: [],
      workFlowObj: {},
      // table
      tableHead: [
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
          label: 'Sort',
          value: 'sort'
        },
        {
          label: 'role.operation',
          type: 'slot',
          slotName: 'handle',
          fixed: 'right',
          width: '200px'
        }
      ],
      // 新增表单验证
      activityDialogType: 'add',
      showActivityDialog: false,
      addFormLabel: {
        name: 'workFlowConfig.name',
        position: 'workFlowConfig.position',
        description: 'workFlowConfig.description',
        sort: 'workFlowConfig.sort'
      },
      addFormData: {
        name: '',
        position: '', //选择岗位，可选,
        description: '', //可选
        sort: ''
      },
      workFlowEventDialogObj: {
        show: false,
        title: 'Workflow Activity Event',
        addDialogVisible: false
      } // workFlowDialog 弹窗
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        name: [{ required: true, message: `${this.$t('workFlowConfig.nameRule')}`, trigger: 'change' }],
        sort: [{ required: true, message: `${this.$t('workFlowConfig.sortRule')}`, trigger: 'change' }]
      }
      return addRules
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
  activated() {
    let pageIndex = parseInt(utils.getStore('currentPageIndex', sessionStorage)) || 0
    this.currentPage = !pageIndex ? 0 : pageIndex
    this.$nextTick(() => {
      this.$refs['myPagination'].currentPage = this.currentPage > 0 ? this.currentPage + 1 : 1
    })
    this.initData()
    this.requstPositionData()
    this.requstWorkFlowActicityData()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'workflow-event') {
      utils.setStore('currentPageIndex', this.currentPage, sessionStorage)
    } else {
      utils.removeStore('currentPageIndex')
    }
    this.showActivityDialog = false
    this.workFlowEventDialogObj.show = false
    utils.removeStore('ROUTRT-META')
    next()
  },
  created() {
    this.initPage()
  },
  methods: {
    initData() {
      if (this.$route.query.data) {
        this.workFlowObj = this.setObject(this.$route.query.data)
        this.isQuery = this.workFlowObj.isQuery ? true : false
        console.log('this.workFlowObj==>', this.workFlowObj)
        this.showAdd = this.isQuery ? false : this.workFlowObj.status == 'READY' ? true : false

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
              label: 'User',
              value: 'user'
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
            },
            {
              label: 'role.operation',
              type: 'slot',
              slotName: 'query-handle',
              fixed: 'right',
              width: '120px'
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
              label: 'Position',
              value: 'position'
            },
            {
              label: 'Description',
              value: 'description'
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
              width: '200px'
            }
          ]
        }
      }
    },
    initPage() {
      utils.removeStore('currentPageIndex')
      this.currentPage = 0
      this.pageSize = 10
      this.$nextTick(() => {
        this.$refs['myPagination'].currentPage = this.currentPage
        this.$refs['myPagination'].pageSize = this.pageSize
      })
    },
    resetFields() {
      this.addFormData = {
        name: '',
        position: '', //选择岗位，可选,
        description: '', //可选
        sort: ''
      }
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
     * @description: 获取所有岗位
     */
    requstPositionData() {
      this.$api
        .fetch(
          `${api.admin.query_position_jsons}/all`,
          {},
          {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(item => {
            item.value = item.id
            item.label = item.name
          })
          this.positionDatas = data
        })
        .catch(msg => {
          this.$message.error(msg)
        })
    },
    /**
     * @description: 工作流活动数据
     */
    requstWorkFlowActicityData() {
      let url = this.isQuery
        ? `${api.admin.query_step_activity_jsons}/${this.workFlowObj.id}`
        : `${api.admin.query_definition_activity_jsons}/${this.workFlowObj.id}`
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
        url: 'query_definition_activity_jsons',
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
            this.requstWorkFlowActicityData()
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
     * @description:提交添加的活动
     */
    commmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('ppppp==>', this.addFormData)
          this.showActivityDialog = false
          if (this.activityDialogType == 'add') {
            // 新增
            let body = {
              loadText: this.$t('loading.add'),
              url: 'query_definition_activity_jsons',
              param: { processId: this.workFlowObj.id, ...this.addFormData },
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
              url: `${api.admin.query_definition_activity_jsons}/${this.workFlowId}`,
              param: { processId: this.workFlowObj.id, ...this.addFormData },
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
     * @description: 删除利活动
     * @param {*} data 活动
     */
    handDelete(data) {
      console.log('handDelete==>', data)
      data.isDeleteVisible = false

      let body = {
        loadText: this.$t('loading.delete'),
        url: `${api.admin.query_definition_activity_jsons}/${data.id}`,
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
     * @description: 新增活动弹窗
     * @param {*} type 弹窗类型
     * @param {*} value data
     */
    hanleShowActivityDialog(type, value = null) {
      this.activityDialogType = type
      this.showActivityDialog = true
      if (value != null) {
        this.workFlowId = value.id
        this.addFormData = { name: value.name, position: value.position, description: value.description, sort: value.sort }
      }
    },
    /**
     * @description: 事件弹窗
     * @param {*} value
     */
    handleShoweEventDialog(value) {
      this.workFlowEventDialogObj.show = true
      this.workFlowEventDialogObj.isQuery = this.isQuery
      this.workFlowEventDialogObj.id = value.id
      this.workFlowEventDialogObj.processId = value.processId
      this.workFlowEventDialogObj.status = this.workFlowObj.status
    },
    /**
     * @description: 关闭弹窗
     */
    handleCloseActivityDialog() {
      this.showActivityDialog = false
      this.resetFields()
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstWorkFlowActicityData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstWorkFlowActicityData()
    },
    // 上页传值对象
    setObject(jsonString) {
      var text = jsonString
      // 对象
      var obj = JSON.parse(text)
      return obj
    }
  }
}
</script>

<style lang="less" scoped>
.popup-footer {
  display: flex;
  justify-content: right;
  .el-button {
    width: 80px;
  }
}
</style>
