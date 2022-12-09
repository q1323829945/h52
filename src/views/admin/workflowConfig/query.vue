<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/query.vue
 * @Date         : 2022-10-26 09:39:27
 * @LastEditTime : 2022-11-14 14:26:55
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
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
      <public-table v-if="tableData.length > 0" style="margin-top: 20px" :table-head="tableHead" :table-data="tableData">
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

        <template slot="handle" slot-scope="slotProps">
          <el-button size="mini" type="text" @click="handlePush(slotProps.data)">
            {{ 'Activity' }}
          </el-button>
        </template>
      </public-table>
      <div v-else>
        <el-empty :description="$t('commonDialog.noData')"></el-empty>
      </div>
    </div>

    <!-- 页码 -->
    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import utils from '@/utils'
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from 'components/searceBar'
import workFlowConfig from '@/views/admin/workflowConfig/optsConfig/workFlowConfig'
// import api from '@/server/api'

export default {
  components: {
    PublicTable,
    Pagination,
    SearchBar
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      searchModel: {},
      // searchbar
      searchBarOpts: [
        {
          type: 'input',
          key: 'name',
          label: 'Name',
          placeholder: 'Please input'
        },
        {
          type: 'select',
          key: 'status',
          label: 'Status',
          list: workFlowConfig.stepOpts,
          placeholder: 'Please select'
        }
      ],
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
          width: '120px'
        }
      ]
    }
  },
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
      to.meta.menuPath = '/dashboard/workflowQuery'
      to.meta.breadcrumb.levelList[2] = { name: 'routerMeta.workflowQueryTitle', url: '/dashboard/workflowQuery' }
      utils.setStore(
        'ROUTRT-META',
        { menuPath: '/dashboard/workflowQuery', levelPath: { name: 'routerMeta.workflowQueryTitle', url: '/dashboard/workflowQuery' } },
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
  },
  methods: {
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
     * @description: 工作流数据
     */
    requstWorkFlowData() {
      let searchModel = this.removeProperty(this.searchModel)

      this.requstBaseData({
        url: 'query_step_process_jsons',
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
    handlePush(value) {
      value.isQuery = true
      var newString = JSON.stringify(value)
      this.routerLink(`/dashboard/workflow/activity?data=${newString}`)
    },
    /**
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      this.currentPage = 0
      this.pageSize = 10
      this.requstWorkFlowData()
    },
    /**
     * @description:重置
     */
    handleReset() {
      this.searchModel = { channelCode: '', channelName: '' }
      this.$refs['mySearchBar'].searchModel = this.searchModel
      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage
      this.requstWorkFlowData()
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
</style>
