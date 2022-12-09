<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/invoice/components/invoiceHistory.vue
 * @Date         : 2022-06-22 13:30:04
 * @LastEditTime : 2022-06-28 13:27:31
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div v-if="dialogObj.show">
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
      <!-- invoiceTotalAmount -->
      <template slot="invoiceTotalAmount" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceTotalAmount | amountFilter }}</div>
      </template>
      <!-- invoiceRepaymentDate -->
      <template slot="invoiceRepaymentDate" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceRepaymentDate | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- invoicePeriodFromDate -->
      <template slot="invoicePeriodFromDate" slot-scope="slotProps">
        <div>{{ slotProps.data.invoicePeriodFromDate | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- invoicePeriodToDate -->
      <template slot="invoicePeriodToDate" slot-scope="slotProps">
        <div>{{ slotProps.data.invoicePeriodToDate | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- invoiceStatus -->
      <template slot="invoiceStatus" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceStatus | transformInvoiceStatusOpts }}</div>
      </template>
      <!-- invoiceType -->
      <template slot="invoiceType" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceType | transformInvoiceTypeOpts }}</div>
      </template>
      <!-- repaymentStatus -->
      <template slot="repaymentStatus" slot-scope="slotProps">
        <div>{{ slotProps.data.repaymentStatus | transformRepaymentStatusOpts }}</div>
      </template>
      <!-- currency -->
      <template slot="invoiceCurrency" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceCurrency | transformCurrencyOpts }}</div>
      </template>
      <!-- instructionLifecycleStatus -->
      <!-- <template slot="instructionLifecycleStatus" slot-scope="slotProps">
        <div>{{ slotProps.data.instructionLifecycleStatus | transformInstructionLifecycleStatus }}</div>
      </template> -->
    </public-table>

    <!-- 翻页 -->
    <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </div>
</template>

<script>
import PublicTable from 'components/publicTable'
import api from '@/server/api'
import Pagination from 'components/pagination'

export default {
  name: 'invoiceHistory',
  components: {
    PublicTable,
    Pagination
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
          title: '历史账单'
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
    tableHead: [
      {
        label: 'repayment.invoiceTotalAmount',
        type: 'slot',
        slotName: 'invoiceTotalAmount'
      },
      // {
      //   label: 'repayment.invoiceRepaymentDate',
      //   type: 'slot',
      //   slotName: 'invoiceRepaymentDate'
      // },
      // {
      //   label: 'repayment.invoicePeriodFromDate',
      //   type: 'slot',
      //   slotName: 'invoicePeriodFromDate'
      // },
      {
        label: 'repayment.invoicePeriodToDate',
        type: 'slot',
        slotName: 'invoicePeriodToDate'
      },
      {
        label: 'repayment.invoiceCurrency',
        type: 'slot',
        slotName: 'invoiceCurrency'
      },
      // {
      //   label: 'repayment.invoiceStatus',
      //   type: 'slot',
      //   slotName: 'invoiceStatus'
      // },
      // {
      //   label: 'repayment.invoiceType',
      //   type: 'slot',
      //   slotName: 'invoiceType'
      // },
      // {
      //   label: 'repayment.instructionLifecycleStatus',
      //   type: 'slot',
      //   slotName: 'instructionLifecycleStatus'
      // },
      {
        label: 'repayment.repaymentStatus',
        type: 'slot',
        slotName: 'repaymentStatus'
      }
    ]
  }),
  computed: {},
  watch: {
    dialogObj: {
      handler(newVal) {
        if (newVal.show) {
          this.requetHistoryData()
        }
      },
      deep: true
    }
  },
  created() {
    this.requetHistoryData()
  },
  mounted() {},
  methods: {
    requetHistoryData() {
      let customerId = 2
      this.$api
        .fetch(
          `${api.admin.query_consumerLoan_invoice_jsons}/${customerId}/history`,
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
      this.requetHistoryData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requetHistoryData()
    }
  }
}
</script>
