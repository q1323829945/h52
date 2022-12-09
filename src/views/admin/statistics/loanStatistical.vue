<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/statistics/loanStatistical.vue
 * @Date         : 2022-08-01 16:45:23
 * @LastEditTime : 2022-11-02 13:24:52
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
        <!-- applyAmount -->
        <template slot="applyAmount" slot-scope="slotProps">
          <div>{{ slotProps.data.applyAmount | amountFilter }}</div>
        </template>
        <!-- approvalAmount -->
        <template slot="approvalAmount" slot-scope="slotProps">
          <div>{{ slotProps.data.approvalAmount | amountFilter }}</div>
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
import api from '@/server/api'
import utils from '@/utils'

export default {
  components: { SearchBar, PublicTable, Pagination },
  data: () => ({
    loading: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
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
        label: 'Apply Amount',
        type: 'slot',
        slotName: 'applyAmount'
      },
      {
        label: 'Approval Amount',
        type: 'slot',
        slotName: 'approvalAmount'
      },
      {
        label: 'customerOffer.productTitle',
        value: 'productName'
      },
      {
        label: 'customerOffer.applyCount',
        value: 'applyCount'
      },
      {
        label: 'customerOffer.approvalCount',
        value: 'approvalCount'
      }
    ],
    searchModel: { date: [], channelCode: '', productId: '' },
    // searchbar
    searchBarOpts: [
      {
        type: 'input',
        key: 'channelCode',
        label: 'Channel Code',
        placeholder: 'Please input'
      },
      {
        type: 'select',
        key: 'productId',
        list: [],
        label: 'Product',
        placeholder: 'Please select'
      },
      {
        type: 'date',
        key: 'date',
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
    this.initData()
    // requstApplicationStatisticsData
    this.$refs['mySearchBar'].searchModel = this.searchModel
    this.requstApplicationStatisticsData({
      page: this.currentPage,
      size: this.pageSize,
      startDate: this.searchModel.date[0],
      endDate: this.searchModel.date[1],
      frequency: 'D'
    })
    this.requestProductData()
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
  },
  methods: {
    initData() {
      let pageIndex = parseInt(utils.getStore('currentPageIndex', sessionStorage)) || 0
      this.currentPage = !pageIndex ? 0 : pageIndex
      this.$nextTick(() => {
        this.$refs['myPagination'].currentPage = this.currentPage > 0 ? this.currentPage + 1 : 1
      })

      let dates = []
      dates.push(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      let oneWeekBefore = utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      dates.unshift(utils.fomartDate(oneWeekBefore, '{y}-{m}-{d}'))
      console.log('dates==>', dates)
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
     * @description: 获取所有贷款申请统计
     */
    requstApplicationStatisticsData(param) {
      this.$api
        .fetch('query_loanApplicationStatistics_jsons', param, {
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
     * @description: 获取所有贷款产品
     */
    requestProductData() {
      this.$api
        .fetch(
          `${api.admin.query_product_json}/paged`,
          {},
          {
            method: 'get',
            comm: { paramUrl: true, showMessage: true }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          let list = []
          data.forEach(element => {
            let obj = { label: element.name, value: element.id }
            list.push(obj)
          })

          this.searchBarOpts.forEach(element => {
            if (element.type == 'select') {
              element.list = list
            }
          })
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
      console.log('data==>', data)
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
      this.requstApplicationStatisticsData({
        page: this.currentPage,
        size: this.pageSize,
        channelCode: this.searchModel.channelCode,
        productId: this.searchModel.productId,
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
      this.searchModel.productId = ''
      this.$refs['mySearchBar'].searchModel = this.searchModel

      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage

      this.requstApplicationStatisticsData({
        page: this.currentPage,
        size: this.pageSize,
        channelCode: this.searchModel.channelCode,
        productId: this.searchModel.productId,
        startDate: this.searchModel.date[0],
        endDate: this.searchModel.date[1],
        frequency: 'D'
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstApplicationStatisticsData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstApplicationStatisticsData()
    }
  }
}
</script>
