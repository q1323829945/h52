<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/loan/components/loanQueryDetail/loanQueryDetail.vue
 * @Date         : 2022-07-25 13:44:15
 * @LastEditTime : 2022-07-28 17:13:09
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div v-if="dialogObj.show">
    <!-- detail -->
    <div v-if="dialogObj.type == 'detail'">
      <public-table :table-head="tableDetailHead" v-loading="loading" :table-data="tableData">
        <template slot="disbursementAmount" slot-scope="slotProps">
          <div>{{ slotProps.data.disbursementAmount | amountFilter }}</div>
        </template>
        <template slot="currency" slot-scope="slotProps">
          <div>{{ slotProps.data.currency | transformCurrencyOpts }}</div>
        </template>
        <template slot="fromDate" slot-scope="slotProps">
          <div>{{ slotProps.data.fromDateTime | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
        <template slot="toDate" slot-scope="slotProps">
          <div>{{ slotProps.data.toDateTime | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
        <template slot="signedDate" slot-scope="slotProps">
          <div>{{ slotProps.data.signedDate | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
      </public-table>
    </div>

    <!-- history -->
    <div v-else-if="dialogObj.type == 'history'">
      <public-table :table-head="tableHistoryHead" v-loading="loading" :table-data="tableData">
        <template slot="eventDate" slot-scope="slotProps">
          <div>{{ slotProps.data.eventDate | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
        <template slot="loanAmount" slot-scope="slotProps">
          <div>{{ slotProps.data.loanAmount | amountFilter }}</div>
        </template>
        <template slot="disbursementAmount" slot-scope="slotProps">
          <div>{{ slotProps.data.disbursementAmount | amountFilter }}</div>
        </template>
        <!-- <template slot="signedDate" slot-scope="slotProps">
          <div>{{ slotProps.data.signedDate | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template> -->
      </public-table>
    </div>

    <!-- fee -->
    <div v-else>
      <public-table :table-head="tableFeeHead" v-loading="loading" :table-data="tableData">
        <template slot="loanFeeTypeName" slot-scope="slotProps">
          <div>{{ slotProps.data.loanFeeTypeName | transformFeeTypeOpts }}</div>
        </template>
        <template slot="currency" slot-scope="slotProps">
          <div>{{ slotProps.data.currency | transformCurrencyOpts }}</div>
        </template>
        <template slot="feeAmountOrRatio" slot-scope="slotProps">
          <div>{{ slotProps.data.feeAmountOrRatio | amountFilter }}</div>
        </template>
        <template slot="nonPaymentAmount" slot-scope="slotProps">
          <div>{{ slotProps.data.nonPaymentAmount | amountFilter }}</div>
        </template>
      </public-table>
    </div>
  </div>
</template>

<script>
import PublicTable from 'components/publicTable'
import api from '@/server/api'
// import utils from '@/utils'

export default {
  name: 'loanQueryDetail',
  components: {
    PublicTable
  },
  directives: {},
  filters: {},
  mixins: [],
  inheritAttrs: true,
  props: {
    dialogObj: {
      type: Object,
      default() {
        return {
          title: '放款信息',
          type: 'detail'
        }
      }
    }
  },
  data: () => ({
    loading: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
    tableData: [],
    // table
    tableDetailHead: [
      {
        label: 'loanProduct.disbursementAccount',
        value: 'disbursementAccount'
      },
      {
        label: 'loanProduct.disbursementAccountBank',
        value: 'disbursementAccountBank'
      },
      {
        label: 'loanProduct.disbursementAmount',
        type: 'slot',
        slotName: 'disbursementAmount'
      },
      {
        label: 'loanProduct.currency',
        type: 'slot',
        slotName: 'currency'
      },
      {
        label: 'loanProduct.fromDate',
        type: 'slot',
        slotName: 'fromDate'
      },
      {
        label: 'loanProduct.toDate',
        type: 'slot',
        slotName: 'toDate'
      },
      {
        label: 'loanProduct.signedDate',
        type: 'slot',
        slotName: 'signedDate'
      }
    ],
    tableHistoryHead: [
      {
        label: 'loanProduct.eventName',
        value: 'eventName'
      },
      {
        label: 'loanProduct.eventDate',
        type: 'slot',
        slotName: 'eventDate'
      },
      {
        label: 'loanProduct.loanAmount',
        type: 'slot',
        slotName: 'loanAmount'
      },
      {
        label: 'loanProduct.disbursementAmount',
        type: 'slot',
        slotName: 'disbursementAmount'
      }
      // {
      //   label: 'loanProduct.signedDate',
      //   type: 'slot',
      //   repaidAmount: 'repaidAmount'
      // }
    ],
    tableFeeHead: [
      {
        label: 'loanProduct.feeType',
        value: 'loanFeeType'
      },
      {
        label: 'loanProduct.feeNameType',
        type: 'slot',
        slotName: 'loanFeeTypeName'
      },
      {
        label: 'loanProduct.currency',
        type: 'slot',
        slotName: 'currency'
      },
      {
        label: 'loanProduct.feeAmountOrRatio',
        type: 'slot',
        slotName: 'feeAmountOrRatio'
      },
      {
        label: 'loanProduct.nonPaymentAmount',
        type: 'slot',
        repaidAmount: 'nonPaymentAmount'
      }
    ]
  }),
  computed: {},
  watch: {
    dialogObj: {
      handler(newVal) {
        if (newVal.show) {
          this.requetDetailData()
        }
      },
      deep: true
    }
  },
  created() {
    this.requetDetailData()
  },
  mounted() {},
  methods: {
    requetDetailData() {
      let url = `${api.admin.query_loan_business_disbursement}/${this.dialogObj.id}/retrieve`
      if (this.dialogObj.type == 'history') {
        url = `${api.admin.query_loan_business_history}/${this.dialogObj.id}/retrieve`
      } else if (this.dialogObj.type == 'fee') {
        url = `${api.admin.query_loan_business_fee}/${this.dialogObj.id}/retrieve`
      }
      // this.loading = false
      this.$api
        .fetch(
          url,
          {},
          {
            method: 'get',
            comm: {
              paramUrl: true,
              page: this.currentPage,
              size: this.pageSize
            }
          }
        )
        .then(res => {
          this.loading = false
          let data = JSON.parse(JSON.stringify(res.data))
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(msg => {
          this.loading = false
          this.$message.error(msg)
        })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requetDetailData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requetDetailData()
    }
  }
}
</script>
