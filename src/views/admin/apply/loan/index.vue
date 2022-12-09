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
        <div>{{ slotProps.data.date | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- 操作-->
      <template slot="detail" slot-scope="slotProps">
        <!-- 审批状态 -->
        <el-popconfirm
          hide-icon
          :title="$t('loanAgreementConfig.changeTips')"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          @cancel="slotProps.data.isApprovalStatus = false"
          @confirm="handleChangeStatus('Approval', slotProps.data)"
        >
          <el-button :disabled="slotProps.data.status == 'SUBMIT' ? false : true" style="margin-left: 15px" slot="reference" size="mini" type="text">
            {{ 'Approval Status' }}
          </el-button>
        </el-popconfirm>
        <!-- 贷款状态 -->
        <el-popconfirm
          hide-icon
          :title="$t('loanAgreementConfig.changeTips')"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          @cancel="slotProps.data.isLoanStatus = false"
          @confirm="handleChangeStatus('Loan', slotProps.data)"
        >
          <el-button style="margin-left: 20px" :disabled="slotProps.data.status == 'RECORD' ? false : true" slot="reference" size="mini" type="text">
            {{ 'Loan Status' }}
          </el-button>
        </el-popconfirm>
        <!-- more -->
        <el-dropdown style="margin: 0px 20px" :disabled="slotProps.data.status == 'OBSOLETE' ? true : false" trigger="click" @command="handleDetail">
          <span style="font-size: 12px; font-weight: 500" class="el-dropdown-link">
            {{ 'More' }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in ['Agent Detail', 'Loan Detail']" :key="index">
              <el-dropdown-item
                :disabled="index == 1 ? (slotProps.data.productType != null ? false : true) : false"
                :style="{
                  fontSize: '12px',
                  color: index == 1 ? (slotProps.data.productType != null ? '#409eff' : '#c0c4cc') : '#409eff'
                }"
                :command="handleMore(item, slotProps.data)"
              >
                {{ item }}
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </public-table>

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from '@/components/searceBar'
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
        label: 'Channel Cast Type',
        value: 'channelCastType'
      },
      {
        label: 'Supplement',
        value: 'supplement'
      },
      {
        label: 'Product Name',
        value: 'productName'
      },
      {
        label: 'Product Type',
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
        placeholder: 'Please select'
      },
      {
        type: 'select',
        key: 'status',
        list: utils.common.loanTypeStatusOpts,
        label: 'Status',
        placeholder: 'Please select'
      }
    ]
  }),
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        this.tableHead[this.tableHead.length - 1].width = this.$i18n.locale == 'en' ? '300px' : '410px'
        return this.tableHead
      }
    }
  },
  activated() {
    let pageIndex = parseInt(utils.getStore('currentPageIndex', sessionStorage)) || 0
    console.log('ac==>', utils.getStore('currentPageIndex', sessionStorage))
    this.currentPage = !pageIndex ? 0 : pageIndex
    console.log('ac currentPage==>', this.currentPage)
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
    if (
      to.name == 'loan-agent' ||
      to.name == 'loanApply-teacherProduct' ||
      to.name == 'loanApply-corporateProduct' ||
      to.name == 'loanApply-newClientProduct' ||
      to.name == 'loanApply-clientProduct' ||
      to.name == 'loanApply-kabuhayanProduct' ||
      to.name == 'loanApply-Agent' ||
      to.name == 'loanApply-car' ||
      to.name == 'loanApply-carProduct'
    ) {
      to.meta.menuPath = '/dashboard/loanApplySupplement'
      to.meta.breadcrumb.levelList[2] = { name: 'routerMeta.customerOfferTitle', url: '/dashboard/loanApplySupplement' }
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
            data.forEach(element => {
              element.isApprovalStatus = false
              element.isLoanStatus = false
            })
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
     * @description: 点击状态dropdown
     * @param {*} type
     * @param {*} currentStatus
     * @param {*} id
     * @return {*} command obj
     */
    handleMore(type, data) {
      return {
        type: type,
        data: data
      }
    },
    /**
     * @description: 跳转详情
     * @param {*} value
     */
    handleDetail(command) {
      var newString = JSON.stringify(command.data)
      if (command.type == 'Loan Detail') {
        if (command.data.channelCastType == 'CAR_BROKER') {
          // 汽车
          this.routerLink(`/dashboard/loanApply/carProduct?data=${newString}`)
        } else {
          // 银行
          switch (command.data.productType) {
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
            case 'CARLOAN': //CARLOAN汽车贷
              {
                this.routerLink(`/dashboard/loanApply/carProduct?data=${newString}`)
              }
              break
            default:
              {
                this.routerLink(`/dashboard/loanApply/teacherProduct?data=${newString}`)
              }
              break
          }
        }
      } else {
        // 贷款申请 command.data.productType == 'CARLOAN'
        if (command.data.channelCastType == 'CAR_BROKER') {
          this.routerLink(`/dashboard/loanApply/car?data=${newString}`)
        } else {
          this.routerLink(`/dashboard/loanApply/Agent?data=${newString}`)
        }
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
      this.$refs['myPagination'].currentPage = this.currentPage
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
