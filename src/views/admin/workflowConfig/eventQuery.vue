<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/eventQuery.vue
 * @Date         : 2022-11-01 10:01:45
 * @LastEditTime : 2022-11-07 11:09:30
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 搜索 -->
    <search-bar
      ref="mySearchBar"
      :optionList="searchBarOpts"
      :isAdd="false"
      :is-export="false"
      :is-import="false"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></search-bar>

    <div v-loading="loading">
      <!-- 列表 -->
      <public-table v-if="tableData.length > 0" style="margin-top: 20px" :table-head="tableHead" v-loading="loading" :table-data="tableData">
        <!-- start -->
        <template slot="start" slot-scope="slotProps">
          <div>{{ slotProps.data.start | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
        <!-- end -->
        <template slot="end" slot-scope="slotProps">
          <div>{{ slotProps.data.end | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
        <!-- status -->
        <template slot="status" slot-scope="slotProps">
          <div>{{ setStatusLabel(slotProps.data.status) }}</div>
        </template>
        <!-- eventType -->
        <template slot="eventType" slot-scope="slotProps">
          <div>{{ setEventType(slotProps.data.eventType) }}</div>
        </template>

        <!-- 操作-->
        <template slot="handle" slot-scope="slotProps">
          <!-- Handler PASSED START-->
          <el-button :disabled="slotProps.data.status == 'START' ? false : true" size="mini" type="text" @click="handChange(slotProps.data)">
            {{ 'Modify Handler' }}
          </el-button>
          <!-- 详情 -->
          <el-button style="margin-left: 20px" size="mini" type="text" @click="handlePush(slotProps.data)">
            {{ 'Detail' }}
          </el-button>
        </template>
      </public-table>
      <div v-else>
        <el-empty :description="$t('commonDialog.noData')"></el-empty>
      </div>
    </div>

    <!-- 修改处理人 -->
    <popup-view v-if="changeForm.dialogVisible" :title="'Modify Handler'" @handle-close="changeForm.dialogVisible = false" :width="'380px'">
      <el-form ref="changeForm" :model="changeForm.data">
        <el-form-item
          v-for="(item, key) in changeForm.data"
          :key="key"
          :label="$t(`${changeForm.labels[key]}`)"
          :prop="`${key}`"
          :label-width="changeForm.labelWidth"
        >
          <!-- 录入员 -->
          <el-radio-group v-model="changeForm.data.user">
            <el-radio
              style="margin: 10px 10px 10px 10px"
              v-for="(radioItem, radioIndex) in handlerList"
              border
              size="medium"
              :label="radioItem.value"
              :key="radioIndex"
            >
              {{ $t(radioItem.label) }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="popup-footer">
        <el-button type="primary" @click="commit('changeForm')">{{ $t('button.confirm') }}</el-button>
      </div>
    </popup-view>

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from '@/components/searceBar'
import utils from '@/utils'
import api from '@/server/api'
import workFlowConfig from '@/views/admin/workflowConfig/optsConfig/workFlowConfig'
import PopupView from 'components/popupView'

export default {
  components: { SearchBar, PublicTable, Pagination, PopupView },
  data: () => ({
    eventType: '',
    eventId: '',
    loading: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
    tableData: [],
    tableHead: [
      {
        label: 'Process Name',
        value: 'processName'
      },
      {
        label: 'Activity Name',
        value: 'activityName'
      },
      {
        label: 'Handle',
        type: 'slot',
        slotName: 'eventType'
      },
      {
        label: 'Status',
        type: 'slot',
        slotName: 'status'
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
        slotName: 'handle',
        fixed: 'right',
        width: '180px'
      }
    ],
    searchModel: {},
    // searchbar
    searchBarOpts: [
      {
        type: 'select',
        key: 'status',
        list: workFlowConfig.stepOpts,
        label: 'Status',
        placeholder: 'Please select'
      }
    ],
    handlerList: [],
    changeForm: {
      id: '',
      formLabelWidth: '110px',
      dialogVisible: false,
      labels: {
        user: 'Users'
      },
      data: {
        user: ''
      }
    }
  }),
  computed: {
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
    },
    setEventType() {
      return value => {
        let label = ''
        for (let index = 0; index < workFlowConfig.eventTypes.length; index++) {
          const element = workFlowConfig.eventTypes[index]
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

    this.requstEventHandData()
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name == 'loan-agent' ||
      to.name == 'loanApply-teacherProduct' ||
      to.name == 'loanApply-corporateProduct' ||
      to.name == 'loanApply-newClientProduct' ||
      to.name == 'loanApply-clientProduct' ||
      to.name == 'loanApply-kabuhayanProduct' ||
      to.name == 'loanApply-Agent'
    ) {
      to.meta.menuPath = '/dashboard/eventHandleQuery'
      to.meta.breadcrumb.levelList[2] = { name: 'routerMeta.eventQueryTitle', url: '/dashboard/eventHandleQuery' }
      utils.setStore(
        'ROUTRT-META',
        { menuPath: '/dashboard/eventHandleQuery', levelPath: { name: 'routerMeta.eventQueryTitle', url: '/dashboard/eventHandleQuery' } },
        sessionStorage
      )
      utils.setStore('currentPageIndex', this.currentPage, sessionStorage)
    } else {
      utils.removeStore('currentPageIndex')
    }
    next()
  },
  created() {
    this.initPage()
    this.initData()
  },
  methods: {
    initData() {},
    initPage() {
      utils.removeStore('currentPageIndex')
      this.currentPage = 0
      this.pageSize = 10
      this.$nextTick(() => {
        this.$refs['myPagination'].currentPage = this.currentPage
        this.$refs['myPagination'].pageSize = this.pageSize
      })
    },
    /**
     * @description: 删除对象为空值的属性
     * @param {*} obj
     * @return {*} obj
     */
    removeProperty(obj) {
      Object.keys(obj).forEach(item => {
        if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
      })
      return obj
    },
    /**
     * @description: 获取所有贷款申请
     */
    requstEventHandData() {
      let searchModel = this.removeProperty(this.searchModel)
      this.requstBaseData({
        url: 'query_event_handle_jsons',
        param: { page: this.currentPage, size: this.pageSize, ...searchModel },
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
        url: 'query_event_handle_jsons',
        param: {},
        optionParam: {},
        isHaneld: false,
        isReload: false
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
            this.handleDetail({ applicationId: data.applicationId, productType: data.productType })
          } else if (body.isReload) {
            this.requstEventHandData()
          } else {
            this.tableData = data
            this.sumTotal = res.paged.total
          }
        })
        .catch(() => {
          this.loading = false
          if (body.isHaneld) {
            loading.close()
          }
        })
    },
    /**
     * @description: 分配录入人员
     * @param {*} data 贷款信息
     */
    handChange(data) {
      this.changeForm.id = data.id
      this.changeForm.data.user = ''
      console.log('data==>', data)
      var loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .fetch(
          `${api.admin.query_users_position_jsons}/${data.position}`,
          {},
          {
            method: 'get',
            comm: { paramUrl: true }
          }
        )
        .then(res => {
          loading.close()
          const data = JSON.parse(JSON.stringify(res.data))
          this.handlerList = []
          data.forEach(element => {
            let obj = { label: element.username, value: element.username }
            this.handlerList.push(obj)
          })
          this.changeForm.dialogVisible = true
        })
        .catch(msg => {
          loading.close()
          this.$message.error(msg)
        })
    },
    /**
     * @description:提交下一个操作员
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.changeForm.data.user == '') {
            this.$message.error('Please Select Handler')
            return
          }
          this.changeForm.dialogVisible = false
          let body = {
            isReload: true,
            loadText: this.$t('loading.change'),
            url: `${api.admin.query_event_handle_jsons}/user`,
            param: {
              id: this.changeForm.id,
              user: this.changeForm.data.user
            },
            optionParam: {
              method: 'put',
              comm: {
                showMessage: true
              }
            }
          }
          this.requstBaseData(body)
        } else {
          return false
        }
      })
    },
    /**
     * @description: 跳转页面
     * @param {*} value
     */
    handlePush(value) {
      this.eventType = value.eventType
      this.eventId = value.id
      let body = {
        isHaneld: true,
        url: `${api.admin.query_event_handle_jsons}/${value.id}`,
        param: {},
        optionParam: {
          method: 'get',
          comm: {
            showMessage: true,
            paramUrl: true
          }
        }
      }
      this.requstBaseData(body)
    },
    /**
     * @description: 跳转详情
     * @param {*} value
     */
    handleDetail(value) {
      value.isEvent = false
      value.eventId = this.eventId
      value.eventType = this.eventType
      if (value.productType) {
        value.isQuery = ['COLLECT_INFORMATION', 'PRE_APPROVAL'].includes(this.isQuery) ? false : true
        let newString = JSON.stringify(value)
        switch (value.productType) {
          case 'CORPORATE': // 企业贷
            {
              this.routerLink(`/dashboard/loanApply/corporateProduct?data=${newString}`)
            }
            break
          case 'TEACHER': // 教师贷
            {
              this.routerLink(`/dashboard/loanApply/teacherProduct?data=${newString}`)
            }
            break
          case 'NEW_CLIENT': //新用户贷
            {
              this.routerLink(`/dashboard/loanApply/newClientProduct?data=${newString}`)
            }
            break
          case 'CLIENT': //个人贷
            {
              this.routerLink(`/dashboard/loanApply/clientProduct?data=${newString}`)
            }
            break
          case 'KABUHAYAN': //KABUHAYAN贷
            {
              this.routerLink(`/dashboard/loanApply/kabuhayanProduct?data=${newString}`)
            }
            break
          default:
            {
              this.routerLink(`/dashboard/loanApply/teacherProduct?data=${newString}`)
            }
            break
        }
      } else {
        value.isQuery = ['CHECK_CUSTOMER', 'CHECK_DATA'].includes(this.isQuery) ? false : true
        let newString = JSON.stringify(value)
        this.routerLink(`/dashboard/loanApply/Agent?data=${newString}`)
      }
    },
    /**
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      console.log('data==>', data)
      this.currentPage = 0
      this.pageSize = 10
      this.loading = true
      this.requstEventHandData()
    },
    /**
     * @description:重置
     */
    handleReset() {
      this.searchModel = {}
      this.$refs['mySearchBar'].searchModel = this.searchModel
      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage
      this.requstEventHandData()
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstEventHandData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstEventHandData()
    }
  }
}
</script>

<style lang="less">
.el-popconfirm__main {
  justify-content: center;
}
.el-popconfirm__action {
  // 交换 确定 和 取消 按钮的位置
  .el-button:nth-child(1) {
    float: right;
    width: 60px;
    height: 32px;
    background: #999999;
    border-radius: 4px;
    font-size: 11px;
    color: #ffffff;
  }
  .el-button:nth-child(2) {
    float: left;
    padding: 10px 8px;
    height: 32px;
    background: #409eff;
    border-radius: 4px;
    font-size: 11px;
    color: #ffffff;
  }
}
</style>
