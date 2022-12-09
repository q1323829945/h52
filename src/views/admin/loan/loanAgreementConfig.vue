<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/loanAgreementConfig.vue
 * @Date         : 2022-05-19 16:40:53
 * @LastEditTime : 2022-09-19 09:47:32
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 列表 -->
    <public-table :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <!-- currency -->
      <template slot="currency" slot-scope="slotProps">
        <div>{{ slotProps.data.currency | transformCurrencyOpts }}</div>
      </template>
      <!-- agreementType -->
      <template slot="agreementType" slot-scope="slotProps">
        <div>{{ slotProps.data.agreementType | transformAgreementTypeOpts }}</div>
      </template>
      <!-- signedDate -->
      <template slot="signedDate" slot-scope="slotProps">
        <div>{{ slotProps.data.signedDate | utcToBeijing }}</div>
      </template>
      <!-- fromDateTime -->
      <template slot="fromDateTime" slot-scope="slotProps">
        <div>{{ slotProps.data.fromDateTime | utcToBeijing }}</div>
      </template>
      <!-- toDateTime -->
      <template slot="toDateTime" slot-scope="slotProps">
        <div>{{ slotProps.data.toDateTime | utcToBeijing }}</div>
      </template>
      <!-- term -->
      <template slot="term" slot-scope="slotProps">
        <div>{{ slotProps.data.term | transformLoanTerm }}</div>
      </template>
      <!-- status -->
      <template slot="status" slot-scope="slotProps">
        <div>{{ slotProps.data.status | transformLoanAgreementStatus }}</div>
      </template>
      <!-- 操作-->
      <template slot="detail" slot-scope="slotProps">
        <!--  修改状态 -->
        <el-popconfirm
          hide-icon
          :title="$t('loanAgreementConfig.changeTips') + '？'"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          @cancel="slotProps.data.isDeleteVisible = false"
          @confirm="handleStatus(slotProps.data)"
        >
          <el-button :disabled="slotProps.data.status == 'PAID' ? true : false" slot="reference" type="text">
            {{ $t('button.changePaid') }}
          </el-button>
        </el-popconfirm>
      </template>
    </public-table>

    <!-- 页码 -->
    <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import utils from '@/utils'
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import api from '@/server/api'

export default {
  components: { PublicTable, Pagination },
  data: () => ({
    statusOpts: [],
    loading: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
    tableData: [],
    tableHead: [
      {
        label: 'loanAgreementConfig.currency',
        type: 'slot',
        slotName: 'currency'
      },
      {
        label: 'loanAgreementConfig.amount',
        value: 'amount'
      },
      {
        label: 'loanAgreementConfig.status',
        type: 'slot',
        slotName: 'status'
      },
      {
        label: 'loanAgreementConfig.agreementType',
        type: 'slot',
        slotName: 'agreementType'
      },
      {
        label: 'loanAgreementConfig.signedDate',
        type: 'slot',
        slotName: 'signedDate'
      },
      {
        label: 'loanAgreementConfig.fromDateTime',
        type: 'slot',
        slotName: 'fromDateTime'
      },
      {
        label: 'loanAgreementConfig.toDateTime',
        type: 'slot',
        slotName: 'toDateTime'
      },
      {
        label: 'loanAgreementConfig.term',
        type: 'slot',
        slotName: 'term'
      },
      {
        label: 'users.operation',
        type: 'slot',
        slotName: 'detail',
        width: '200',
        fixed: 'right'
      }
    ]
  }),
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        return this.tableHead
      }
    }
  },
  activated() {
    this.statusOpts = utils.common.loanAgreementStatus
    this.requstLoanAgreementData()
  },
  methods: {
    /**
     * @description: 获取所有承销信息
     */
    requstLoanAgreementData() {
      this.requstBaseData({
        url: 'query_loanAgreement_jsons',
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
        url: 'query_person_jsons',
        param: {},
        optionParam: {},
        isHaneld: false,
        isDetail: false
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
          this.isEdit = false
          const data = JSON.parse(JSON.stringify(res.data))
          if (body.isHaneld) {
            loading.close()
            this.requstLoanAgreementData()
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
     * @description: 点击状态dropdown
     * @param {*} value
     */
    handleStatus(value) {
      let body = {
        loadText: this.$t('loading.change'),
        url: `${api.admin.query_loanAgreement_jsons}/status/${value.id}`,
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
    handlePageSize(val) {
      this.pageSize = val
      this.requstLoanAgreementData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstLoanAgreementData()
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
