<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/loan/loanQuery.vue
 * @Date         : 2022-07-21 15:45:31
 * @LastEditTime : 2022-12-05 14:50:29
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
        <!-- supplement -->
        <el-button :disabled="slotProps.data.productType == null ? false : true" size="mini" type="text" @click="handChange(slotProps.data)">
          {{ 'Modify Supplement' }}
        </el-button>
        <!-- 详情 -->
        <el-button style="margin-left: 20px" size="mini" type="text" @click="handleDetail('mobile', slotProps.data)">{{ 'Agent Detail' }}</el-button>
        <el-button
          style="margin-left: 20px"
          :disabled="slotProps.data.productType != null ? false : true"
          size="mini"
          type="text"
          @click="handleDetail('product', slotProps.data)"
        >
          {{ 'Loan Detail' }}
        </el-button>
      </template>
    </public-table>

    <!-- 修改岗位 -->
    <popup-view v-if="changeForm.dialogVisible" :title="'Modify Supplement'" @handle-close="changeForm.dialogVisible = false" :width="'380px'">
      <el-form ref="changeForm" :model="changeForm.data">
        <el-form-item
          v-for="(item, key) in changeForm.data"
          :key="key"
          :label="$t(`${changeForm.labels[key]}`)"
          :prop="`${key}`"
          :label-width="changeForm.labelWidth"
        >
          <!-- 录入员 -->
          <el-radio-group v-model="changeForm.data.username">
            <el-radio
              style="margin: 10px 10px 10px 10px"
              v-for="(radioItem, radioIndex) in positionList"
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
import loanConfig from '@/views/admin/loan/optsConfig/loanConfig'
import PopupView from 'components/popupView'

export default {
  components: { SearchBar, PublicTable, Pagination, PopupView },
  data: () => ({
    loading: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
    tableData: [],
    positionList: [],
    tableHead: [
      {
        label: 'Channel',
        value: 'channelName'
      },
      {
        label: 'Channel Cast Type',
        value: 'channelCastType'
      },

      {
        label: 'loanProduct.name',
        value: 'name'
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
        placeholder: 'Please select'
      },
      {
        type: 'select',
        key: 'status',
        list: utils.common.loanTypeStatusOpts,
        label: 'Status',
        placeholder: 'Please select'
      }
    ],
    changeForm: {
      applicationId: '',
      formLabelWidth: '110px',
      dialogVisible: false,
      labels: {
        username: 'Users'
      },
      data: {
        username: ''
      }
    }
  }),
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        this.tableHead[this.tableHead.length - 1].width = this.$i18n.locale == 'en' ? '310px' : '310px'
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
        url: 'query_loan_json',
        param: { productType: this.searchModel.productType, status: this.searchModel.status, page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm: {
            showMessage: true
          }
        }
      })
    } else {
      // 全部
      this.requstCustomerOfferData()
    }
    this.requstPositionData()
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name == 'loan-agent' ||
      to.name == 'loan-teacherProduct' ||
      to.name == 'loan-corporateProduct' ||
      to.name == 'loan-newClientProduct' ||
      to.name == 'loan-clientProduct' ||
      to.name == 'loan-kabuhayanProduct' ||
      to.name == 'loan-agentCar' ||
      to.name == 'loan-carProduct'
    ) {
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
     * @description: 录入员岗位信息
     */
    requstPositionData() {
      this.$api
        .fetch(
          `${api.admin.query_user_manger_jsons}/all`,
          { position: 'SUPPLEMENT' },
          {
            method: 'get',
            comm: { paramUrl: true, showMessage: true }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.positionList = []
          data.forEach(element => {
            let obj = { label: element.username, value: element.username }
            this.positionList.push(obj)
          })
        })
        .catch(() => {})
    },
    /**
     * @description: 获取所有贷款申请
     */
    requstCustomerOfferData() {
      this.requstBaseData({
        url: 'query_loan_json',
        param: { page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm: {
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
     * @description: 分配录入人员
     * @param {*} data 贷款信息
     */
    handChange(data) {
      this.changeForm.applicationId = data.applicationId
      this.changeForm.data.username = data.supplement
      this.changeForm.dialogVisible = true
    },
    /**
     * @description: 跳转详情
     * @param {*} value
     */
    handleDetail(type, value) {
      value.isQuery = true
      var newString = JSON.stringify(value)

      if (type == 'product') {
        if (value.channelCastType == 'CAR_BROKER') {
          // 汽车
          this.routerLink(`/dashboard/loan/carProduct?data=${newString}`)
        } else {
          // 银行
          switch (value.productType) {
            case 'CORPORATE': // 企业贷
              {
                this.routerLink(`/dashboard/loan/corporateProduct?data=${newString}`)
              }
              break
            case 'TEACHER': // 教师贷
              {
                this.routerLink(`/dashboard/loan/teacherProduct?data=${newString}`)
              }
              break
            case 'NEW_CLIENT': //新用户贷
              {
                this.routerLink(`/dashboard/loan/newClientProduct?data=${newString}`)
              }
              break
            case 'CLIENT': //个人贷
              {
                this.routerLink(`/dashboard/loan/clientProduct?data=${newString}`)
              }
              break
            case 'KABUHAYAN': //KABUHAYAN贷
              {
                this.routerLink(`/dashboard/loan/kabuhayanProduct?data=${newString}`)
              }
              break
            case 'CARLOAN': //KABUHAYAN贷
              {
                this.routerLink(`/dashboard/loan/carProduct?data=${newString}`)
              }
              break
            default:
              {
                this.routerLink(`/dashboard/loan/teacherProduct?data=${newString}`)
              }
              break
          }
        }
      } else {
        // 贷款申请 value.productType == 'CARLOAN'
        if (value.channelCastType == 'CAR_BROKER') {
          this.routerLink(`/dashboard/loan/agentCar?data=${newString}`)
        } else {
          this.routerLink(`/dashboard/loan/Agent?data=${newString}`)
        }
      }
    },
    /**
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      this.currentPage = 0
      this.pageSize = 10
      let comm = {
        showMessage: true
      }
      this.loading = true
      this.requstBaseData({
        url: 'query_loan_json',
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
          url: 'query_loan_json',
          param: { productType: this.searchModel.productType, status: this.searchModel.status, page: this.currentPage, size: this.pageSize },
          optionParam: {
            method: 'get',
            comm: {
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
          url: 'query_loan_json',
          param: { productType: this.searchModel.productType, status: this.searchModel.status, page: this.currentPage, size: this.pageSize },
          optionParam: {
            method: 'get',
            comm: {
              showMessage: true
            }
          }
        })
      } else {
        // 全部
        this.requstCustomerOfferData()
      }
    },
    /**
     * @description:提交添加的角色
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改
          this.changeForm.dialogVisible = false
          let body = {
            isHaneld: true,
            loadText: this.$t('loading.change'),
            url: `${api.admin.query_loan_json}/supplement`,
            param: {
              applicationId: this.changeForm.applicationId,
              username: this.changeForm.data.username
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
