<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/statistics/commissionStatistical.vue
 * @Date         : 2022-08-02 11:31:23
 * @LastEditTime : 2022-11-02 13:24:23
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 搜索 -->
    <search-bar
      ref="mySearchBar"
      :model="searchModel"
      :optionList="searchBarOpts"
      :isSearch="true"
      :isAdd="false"
      :is-export="false"
      :is-import="false"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></search-bar>

    <!-- 列表 -->
    <div v-loading="loading">
      <public-table v-if="tableData.length > 0" style="margin-top: 20px" :table-head="setTableHead()" :table-data="tableData">
        <!-- amount -->
        <template slot="amount" slot-scope="slotProps">
          <div>{{ slotProps.data.amount | amountFilter }}</div>
        </template>
        <!-- statisticsAmount -->
        <template slot="statisticsAmount" slot-scope="slotProps">
          <div>{{ slotProps.data.statisticsAmount | amountFilter }}</div>
        </template>
        <!-- datetime -->
        <template slot="dateTime" slot-scope="slotProps">
          <div>{{ slotProps.data.dateTime | fomartDate('{y}-{m}-{d}') }}</div>
        </template>
      </public-table>
      <div v-else>
        <el-empty :description="$t('commonDialog.noData')"></el-empty>
      </div>
    </div>

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from '@/components/searceBar'

import utils from '@/utils'

export default {
  components: { SearchBar, PublicTable, Pagination },
  data: () => ({
    loading: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
    statusOpts: [], //承销状态
    loanAgreementOpts: [], //协议状态
    tableData: [],
    tableHead: [
      {
        label: 'customerOffer.channel',
        value: 'channelName'
      },
      {
        label: 'date.date',
        type: 'slot',
        slotName: 'dateTime'
      },
      {
        label: 'customerOffer.camount',
        type: 'slot',
        slotName: 'amount'
      },
      {
        label: 'customerOffer.ratio',
        value: 'ratio'
      },
      {
        label: 'customerOffer.loanApprovedAmount',
        type: 'slot',
        slotName: 'statisticsAmount'
      }
    ],
    searchModel: { date: [] },
    // searchbar
    searchBarOpts: [
      {
        type: 'input',
        key: 'channelCode',
        label: 'Channel Code',
        placeholder: 'Please input'
      },
      {
        type: 'date',
        key: 'date',
        width: '80px',
        label: 'customerOffer.queryDate',
        placeholder: 'customerOffer.queryDate',
        valueFormat: 'MM-dd-yyyy'
      }
    ]
  }),
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        this.tableHead[this.tableHead.length - 1].width = this.$i18n.locale == 'en' ? '320px' : '230px'
        return this.tableHead
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
    this.$refs['mySearchBar'].searchModel = this.searchModel
    // requstCommissionStatisticalData
    this.requstCommissionStatisticalData({
      page: this.currentPage,
      size: this.pageSize,
      startDate: this.searchModel.date[0],
      endDate: this.searchModel.date[1],
      frequency: 'D'
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'loanStatisticalConfig') {
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
    initData() {
      let dates = []
      dates.push(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      let oneWeekBefore = utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      dates.unshift(utils.fomartDate(oneWeekBefore, '{y}-{m}-{d}'))
      this.searchModel.date = dates
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
    /**
     * @description: 获取所有贷款申请
     */
    requstCommissionStatisticalData(param) {
      this.$api
        .fetch('query_commissionStatistics_jsons', param, {
          method: 'get',
          comm: { showMessage: true }
        })
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 选中日期
     * @param {*} data
     */
    handleDate(data) {
      this.searchModel = data
    },
    /**
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      this.loading = true
      this.currentPage = 0
      this.pageSize = 10
      this.requstCommissionStatisticalData({
        page: this.currentPage,
        size: this.pageSize,
        channelCode: this.searchModel.channelCode,
        startDate: this.searchModel.date[0],
        endDate: this.searchModel.date[1],
        frequency: 'D'
      })
    },
    /**
     * @description:重置
     */
    handleReset() {
      let dates = []
      dates.push(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      let oneWeekBefore = utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      dates.unshift(utils.fomartDate(oneWeekBefore, '{y}-{m}-{d}'))
      this.searchModel.channelCode = ''
      this.$refs['mySearchBar'].searchModel = this.searchModel

      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage

      this.requstCommissionStatisticalData({
        page: this.currentPage,
        size: this.pageSize,
        channelCode: this.searchModel.channelCode,
        startDate: this.searchModel.date[0],
        endDate: this.searchModel.date[1],
        frequency: 'D'
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstCommissionStatisticalData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstCommissionStatisticalData()
    }
  }
}
</script>
