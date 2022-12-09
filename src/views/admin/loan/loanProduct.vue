<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/loanProduct.vue
 * @Date         : 2022-03-18 09:47:21
 * @LastEditTime : 2022-11-10 10:42:38
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
      :is-query="false"
      :is-reset="false"
      @handle-push="handleAdd"
    ></search-bar>

    <!-- 引导弹窗占位 -->
    <div class="guide-step4" id="guide-step4"></div>

    <!-- 列表 -->
    <public-table :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <!-- 贷款产品类型 -->
      <template slot="productType" slot-scope="slotProps">
        <div>{{ slotProps.data.productType | transformLoanType }}</div>
      </template>
      <!-- 操作 -->
      <template slot="delete" slot-scope="slotProps">
        <!-- 详情 -->
        <el-button size="mini" type="text" @click="handleDetail(slotProps.data)">{{ $t('button.detail') }}</el-button>
      </template>
    </public-table>

    <Pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import SearchBar from '@/components/searceBar'
import PublicTable from '@/components/publicTable'
import Pagination from '@/components/pagination'
import utils from '@/utils'
import api from '@/server/api'
import guide from '@/utils/guide'

export default {
  components: { SearchBar, PublicTable, Pagination },
  data() {
    return {
      isShowGuide: false,
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      productTypeOpts: [], //贷款产品类型
      productStatusOpts: [], //贷款产品状态
      tableData: [],
      tableHead: [
        {
          label: 'loanProduct.name',
          value: 'name'
        },
        {
          label: 'loanProduct.type',
          type: 'slot',
          slotName: 'productType'
        },
        {
          label: 'loanProduct.description',
          value: 'description'
        },
        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'delete',
          width: '200px',
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    //计算tableHead宽度
    setTableHead() {
      return function () {
        // this.tableHead[this.tableHead.length - 2].width = this.$i18n.locale == 'en' ? '140px' : '110px'
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
    this.requestData()
    this.setGuideConfig()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'loanProductDetail' || to.name == 'loanProductHistory') {
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
  mounted() {},
  methods: {
    initData() {
      this.productStatusOpts = utils.loan.productStatusOpts
      this.productTypeOpts = utils.loan.productTypeOpts
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
    setGuideConfig() {
      let guiHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP4', localStorage))
      if (!guiHidden) {
        let _that = this
        this.isShowGuide = true
        setTimeout(() => {
          _that.$driver.defineSteps(guide)
          _that.$driver.start()
        }, 300)
      } else {
        this.isShowGuide = false
      }
    },
    /**
     * @description: 获取所有产品
     * @param {*}
     */
    requestData() {
      this.requestLoanProductData({
        url: `${api.admin.query_product_json}/paged`,
        param: { page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm: {
            paramUrl: true
          }
        }
      })
    },
    /**
     * @description: 产品请求基础方法
     * @param {*} requestBody requestBody
     */
    requestLoanProductData(requestBody = {}) {
      let defaultBody = {
        url: 'query_product_json',
        param: {},
        optionParam: {},
        isHaneld: false
      }
      let body = Object.assign(defaultBody, requestBody)

      this.$api
        .fetch(body.url, body.param, body.optionParam)
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          if (body.isHaneld) {
            this.requestData()
          } else {
            this.tableData = data
            this.sumTotal = res.paged.total
          }
        })
        .catch(msg => {
          this.loading = false
          this.$message.error(msg)
        })
    },
    handleAdd() {
      if (this.isShowGuide) {
        utils.setStore('GUIDE-SAVE-SETP5', '', localStorage)
      }
      this.$router.push('/dashboard/loanProduct/add')
    },
    /**
     * @description: 查看详情
     * @param {*} data
     */
    handleDetail(data) {
      data.isEdit = true
      var newString = JSON.stringify(data)
      this.routerLink(`/dashboard/loanProduct/detail?data=${newString}`)
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requestData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requestData()
    }
  }
}
</script>
