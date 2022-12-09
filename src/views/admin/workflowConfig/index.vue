<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/index.vue
 * @Date         : 2022-10-25 14:22:27
 * @LastEditTime : 2022-11-14 14:07:30
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <search-bar
      ref="mySearchBar"
      :optionList="[]"
      :isAdd="true"
      :is-export="false"
      :is-import="false"
      @handle-push="hanleShowDialog('add')"
    ></search-bar>

    <!-- 列表 -->
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
      <!-- 状态 -->
      <template slot="status" slot-scope="slotProps">
        <div>{{ setStatusLabel(slotProps.data.status) }}</div>
      </template>
      <!-- 操作 -->
      <template slot="handle" slot-scope="slotProps">
        <!--  修改状态 -->
        <el-dropdown trigger="click" @command="commandStatus">
          <span style="font-size: 12px; font-weight: 500" class="el-dropdown-link">
            {{ $t('button.changeStatus') }}
            <i style="margin-left: 3px" class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in workFlowOpts" :key="index">
              <el-dropdown-item
                :command="handleStatus(slotProps.data.status, item.value, slotProps.data.id)"
                :style="{
                  color: slotProps.data.status == item.value ? '#409eff' : '#303133'
                }"
              >
                {{ $t(item.label) }}
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 修改内容 -->
        <el-button
          :disabled="slotProps.data.status == 'READY' ? false : true"
          style="margin-left: 20px"
          size="mini"
          type="text"
          @click="hanleShowDialog('change', slotProps.data)"
        >
          {{ 'Modify' }}
        </el-button>
        <!-- 跳转活动 -->
        <el-button style="margin-left: 20px" size="mini" type="text" @click="handlePush(slotProps.data)">
          {{ 'Activity' }}
        </el-button>
      </template>
    </public-table>

    <!-- 编辑工作流弹窗 -->
    <popup-view v-if="showEditDialog" :title="dialogType == 'add' ? 'Add Workflow' : 'Modify Workflow'" @handle-close="handleClose" :width="'360px'">
      <div>
        <el-form style="margin: 10px 5px 10px 0px" ref="addForm" :model="addFormData" :rules="addRules">
          <div v-for="(item, key) in addFormData" :key="key">
            <el-form-item :label="$t(addFormLabel[key])" :prop="`${key}`" :label-width="'100px'">
              <el-input type="text" v-model="addFormData[key]" :placeholder="'Please input'" clearable=""></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="popup-footer">
          <el-button type="primary" @click="commmit('addForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </div>
    </popup-view>

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
import workFlowConfig from '@/views/admin/workflowConfig/optsConfig/workFlowConfig'

export default {
  components: {
    PublicTable,
    Pagination,
    SearchBar,
    PopupView
  },
  data() {
    return {
      workDriver: null,
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      // searchbar
      searchBarToolbarObj: {
        addClassId: 'workflow-guide-step1'
      },
      // table
      tableHead: [
        {
          label: 'workFlowConfig.name',
          value: 'name'
        },
        {
          label: 'workFlowConfig.description',
          value: 'description'
        },
        {
          label: 'status',
          type: 'slot',
          slotName: 'status'
        },
        {
          label: 'role.operation',
          type: 'slot',
          slotName: 'handle',
          fixed: 'right',
          width: '260px'
        }
      ],
      // 新增表单验证
      dialogType: 'add',
      showEditDialog: false,
      workFlowId: '',
      addFormLabel: { name: 'workFlowConfig.name', description: 'workFlowConfig.description' },
      addFormData: {
        name: '',
        description: '' //可选
      },
      workFlowOpts: []
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        code: [{ required: true, message: `${this.$t('workFlowConfig.codeRule')}`, trigger: 'change' }],
        name: [{ required: true, message: `${this.$t('workFlowConfig.nameRule')}`, trigger: 'change' }]
        // description: [{ required: true, message: `${this.$t('role.newRoleNameRule')}`, trigger: 'change' }]
      }
      return addRules
    },
    // 状态
    setStatusLabel() {
      return value => {
        let label = ''
        for (let index = 0; index < workFlowConfig.statusOpts.length; index++) {
          const element = workFlowConfig.statusOpts[index]
          if (value == element.value) {
            label = element.label
            break
          }
        }
        return label
      }
    },
    // 协议菜单Disabled
    setDropdownMenuDisabled() {
      return value => {
        let index = 0

        for (var i = 0; i < this.workFlowOpts.length; i++) {
          let obj = this.workFlowOpts[i]
          // 状态与后台结果一样不可点击
          if (value.value == obj.value) {
            index = i
            break
          }
        }
        return value.index >= index ? false : true
      }
    }
  },
  activated() {
    let pageIndex = parseInt(utils.getStore('currentPageIndex', sessionStorage)) || 0
    this.currentPage = !pageIndex ? 0 : pageIndex
    this.$nextTick(() => {
      this.$refs['myPagination'].currentPage = this.currentPage > 0 ? this.currentPage + 1 : 1
    })
    this.requstWorkFlowData()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'workflow-activity') {
      to.meta.menuPath = '/dashboard/workflowConfig'
      to.meta.breadcrumb.levelList[2] = { name: 'routerMeta.workflowTitle', url: '/dashboard/workflowConfig' }
      utils.setStore('currentPageIndex', this.currentPage, sessionStorage)
    } else {
      utils.removeStore('currentPageIndex')
    }
    this.$driver.reset()
    next()
  },
  created() {
    this.initData()
    this.initPage()
  },
  methods: {
    initData() {
      this.workFlowOpts = [workFlowConfig.statusOpts[0], workFlowConfig.statusOpts[1]]
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
        description: ''
      }
    },
    /**
     * @description: 工作流数据
     */
    requstWorkFlowData() {
      this.requstBaseData({
        url: 'query_definition_process_jsons',
        param: { page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get'
        }
      })
    },
    /**
     * @description: 请求基础方法
     * @param {*} requestBody requestBody
     */
    requstBaseData(requestBody = {}) {
      let defaultBody = {
        url: 'query_definition_process_jsons',
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
          if (body.isHaneld) {
            loading.close()
            this.resetFields()
            this.requstWorkFlowData()
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
     * @description: 新增
     */
    addWorkFlowData() {
      let body = {
        loadText: this.$t('loading.add'),
        url: 'query_definition_process_jsons',
        param: this.addFormData,
        optionParam: {
          method: 'post',
          comm: {
            showMessage: true
          }
        },
        isHaneld: true
      }
      this.requstBaseData(body)
    },
    /**
     * @description:提交添加的角色
     */
    commmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showEditDialog = false
          if (this.dialogType == 'add') {
            this.addWorkFlowData()
          } else {
            let body = {
              loadText: this.$t('loading.change'),
              url: `${api.admin.query_definition_process_jsons}/${this.workFlowId}`,
              param: this.addFormData,
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
     * @description: 新增弹窗
     * @param {*} type 弹窗类型
     * @param {*} value data
     */
    hanleShowDialog(type, value = null) {
      this.dialogType = type
      this.showEditDialog = true
      if (value != null) {
        this.workFlowId = value.id
        this.addFormData = { name: value.name, description: value.description }
      }
    },
    /**
     * @description: 跳转活动
     * @param {*} value
     */
    handlePush(value) {
      var newString = JSON.stringify(value)
      this.routerLink(`/dashboard/workflow/activity?data=${newString}`)
    },
    /**
     * @description: 点击状态dropdown
     * @param {*} currentType 当前状态
     * @param {*} value 选择的状态
     * @param {*} id
     * @return {*} command obj
     */
    handleStatus(currentType, value, id) {
      return {
        currentType: currentType,
        status: value,
        id: id
      }
    },
    /**
     * @description: 修改状态
     * @param {*} command composeValue里面的值
     */
    commandStatus(command) {
      if (command.currentType == command.status) {
        return
      }
      let body = {
        loadText: this.$t('loading.change'),
        url: `${api.admin.query_definition_process_jsons}/${command.status}/${command.id}`,
        param: {},
        optionParam: {
          method: 'put',
          comm: {
            showMessage: true
          }
        },
        isHaneld: true
      }
      this.requstBaseData(body)
    },
    /**
     * @description: 编辑弹窗
     */
    handleClose() {
      this.showEditDialog = false
      this.resetFields()
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstWorkFlowData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstWorkFlowData()
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

div#driver-highlighted-element-stage {
  border-radius: 15px;
  border: 1px solid #409eff;
}
div#driver-highlighted-element-stage,
div#driver-page-overlay {
  background: transparent;
  // outline: 5000px solid transparent;
  outline: 5000px solid rgba(0, 0, 0, 0.55);
}
</style>
