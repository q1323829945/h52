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

    <!-- 列表 -->
    <public-table style="margin-top: 20px" :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <!-- productType -->
      <template slot="productType" slot-scope="slotProps">
        <div>{{ slotProps.data.productType | transformLoanType }}</div>
      </template>
      <!-- amount -->
      <template slot="amount" slot-scope="slotProps">
        <div>{{ slotProps.data.amount | amountFilter }}</div>
      </template>
      <!-- term -->
      <template slot="term" slot-scope="slotProps">
        <div>{{ slotProps.data.term | transformLoanTerm }}</div>
      </template>
      <!-- status -->
      <template slot="status" slot-scope="slotProps">
        <div>{{ slotProps.data.status | transformLoanTypeStatus }}</div>
      </template>
      <!-- date-->
      <template slot="date" slot-scope="slotProps">
        <div>{{ slotProps.data.date | fomartDate('{y}-{m}-{d} {h}:{i}:{s}') }}</div>
      </template>
      <!-- 操作-->
      <template slot="detail" slot-scope="slotProps">
        <!-- 审批状态 -->
        <el-button
          :disabled="slotProps.data.status == 'SUBMIT' ? false : true"
          size="mini"
          type="text"
          @click="handleChangeStatus('Approval', slotProps.data)"
        >
          {{ 'Modify Approval Status' }}
        </el-button>
        <!-- 贷款状态 -->
        <el-button
          style="margin-left: 25px"
          :disabled="slotProps.data.status == 'RECORD' ? false : true"
          size="mini"
          type="text"
          @click="handleChangeStatus('Loan', slotProps.data)"
        >
          {{ 'Modify Loan Status' }}
        </el-button>
        <!-- 详情 -->
        <el-button style="margin-left: 25px" size="mini" type="text" @click="handleDetail(slotProps.data)">{{ $t('button.detail') }}</el-button>
      </template>
    </public-table>

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from '@/components/searceBar'
// import CustomerOfferChart from './components/customerOfferChart/customerOfferChart.vue'
import utils from '@/utils'
import api from '@/server/api'
import loanConfig from '@/views/admin/loan/optsConfig/loanConfig'

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
        label: 'loanProduct.name',
        value: 'name'
      },
      {
        label: 'Supplement',
        value: 'supplement'
      },
      {
        label: 'loanProduct.type',
        type: 'slot',
        slotName: 'productType'
      },
      {
        label: 'loanAgreementConfig.amount',
        type: 'slot',
        slotName: 'amount'
      },
      {
        label: 'loanAgreementConfig.term',
        type: 'slot',
        slotName: 'term'
      },
      {
        label: 'date.date',
        type: 'slot',
        slotName: 'date'
      },
      {
        label: 'customerOffer.loanStatus',
        type: 'slot',
        slotName: 'status'
      },
      {
        label: 'users.operation',
        type: 'slot',
        slotName: 'detail',
        width: '200px',
        fixed: 'right'
      }
    ],
    searchModel: {},
    // searchbar
    searchBarOpts: [
      {
        type: 'select',
        key: 'productType',
        list: loanConfig.productTypeOpts,
        label: 'Product Type',
        placeholder: 'Product Type'
      },
      {
        type: 'select',
        key: 'status',
        list: utils.common.loanTypeStatusOpts,
        label: 'Status',
        placeholder: 'Status'
      }
    ]
  }),
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        this.tableHead[this.tableHead.length - 1].width = this.$i18n.locale == 'en' ? '400px' : '400px'
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
    if (utils.objKey(this.searchModel, 'productType') || utils.objKey(this.searchModel, 'status')) {
      // 查询
      this.requstBaseData({
        url: `${api.admin.query_loan_json}/supplement`,
        param: { productType: this.searchModel.productType, status: this.searchModel.status, page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm: {
            paramUrl: true,
            showMessage: true
          }
        }
      })
    } else {
      // 全部
      this.requstCustomerOfferData()
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'customerOffer-detail') {
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
     * @description: 获取所有贷款申请
     */
    requstCustomerOfferData() {
      this.requstBaseData({
        url: `${api.admin.query_loan_json}/supplement`,
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
        url: 'query_customerOffer_jsons',
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
            this.requstCustomerOfferData()
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
     * @description: 点击修改状态
     * @param {*} value
     */
    handleChangeStatus(type, value) {
      let url = type == 'Loan' ? `${api.admin.query_loan_json}/submit` : `${api.admin.query_loan_json}/approval`

      let body = {
        isHaneld: true,
        loadText: this.$t('loading.change'),
        url: url,
        param: { applicationId: value.applicationId },
        optionParam: {
          method: 'put',
          comm: {
            showMessage: true
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
      var newString = JSON.stringify(value)

      switch (value.productType) {
        case 'CORPORATE': // 企业贷
          {
            this.routerLink(`/dashboard/customerOffer/corporateProduct?data=${newString}`)
          }
          break
        case 'TEACHER': // 教师贷
          {
            this.routerLink(`/dashboard/customerOffer/teacherProduct?data=${newString}`)
          }
          break
        case 'NEW_CLIENT': //新用户贷
          {
            this.routerLink(`/dashboard/customerOffer/newClientProduct?data=${newString}`)
          }
          break
        case 'CLIENT': //个人贷
          {
            this.routerLink(`/dashboard/customerOffer/clientProduct?data=${newString}`)
          }
          break
        case 'KABUHAYAN': //KABUHAYAN贷
          {
            this.routerLink(`/dashboard/customerOffer/kabuhayanProduct?data=${newString}`)
          }
          break
        default:
          {
            this.routerLink(`/dashboard/customerOffer/teacherProduct?data=${newString}`)
          }
          break
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
      let comm = {
        paramUrl: true,
        showMessage: true
      }
      this.loading = true
      this.requstBaseData({
        url: `${api.admin.query_loan_json}/supplement`,
        param: { productType: data.productType, status: data.status, page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm
        }
      })
    },
    /**
     * @description:重置
     */
    handleReset() {
      this.searchModel = {}
      this.$refs['mySearchBar'].searchModel = {}
      this.currentPage = 0
      this.pageSize = 10
      if (utils.objKey(this.searchModel, 'productType') || utils.objKey(this.searchModel, 'status')) {
        // 查询
        this.requstBaseData({
          url: `${api.admin.query_loan_json}/supplement`,
          param: { productType: this.searchModel.productType, status: this.searchModel.status, page: this.currentPage, size: this.pageSize },
          optionParam: {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        })
      } else {
        // 全部
        this.requstCustomerOfferData()
      }
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstCustomerOfferData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      if (utils.objKey(this.searchModel, 'productType') || utils.objKey(this.searchModel, 'status')) {
        // 查询
        this.requstBaseData({
          url: `${api.admin.query_loan_json}/supplement`,
          param: { productType: this.searchModel.productType, status: this.searchModel.status, page: this.currentPage, size: this.pageSize },
          optionParam: {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        })
      } else {
        // 全部
        this.requstCustomerOfferData()
      }
    }
  }
}
</script>
