<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/invoice/components/invoiceDetail.vue
 * @Date         : 2022-06-24 09:52:35
 * @LastEditTime : 2022-06-28 17:41:30
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div v-if="dialogObj.show">
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
      <!-- invoiceAmount -->
      <template slot="invoiceAmount" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceAmount | amountFilter }}</div>
      </template>
      <!-- invoiceType -->
      <template slot="repaymentAmount" slot-scope="slotProps">
        <div>{{ slotProps.data.repaymentAmount | amountFilter }}</div>
      </template>
      <!-- invoiceType -->
      <template slot="invoiceAmountType" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceAmountType | transformInvoiceAmountTypeOpts }}</div>
      </template>
      <!-- repaymentStatus -->
      <template slot="repaymentStatus" slot-scope="slotProps">
        <div>{{ slotProps.data.repaymentStatus | transformRepaymentStatusOpts }}</div>
      </template>
    </public-table>
  </div>
</template>

<script>
import PublicTable from 'components/publicTable'
import api from '@/server/api'
// import utils from '@/utils'

export default {
  name: 'invoiceDetail',
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
        label: 'repayment.invoiceAmountType',
        type: 'slot',
        slotName: 'invoiceAmountType'
      },
      {
        label: 'repayment.invoiceAmount',
        type: 'slot',
        slotName: 'invoiceAmount'
      },
      {
        label: 'repayment.repaymentAmount',
        type: 'slot',
        slotName: 'repaymentAmount'
      },
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
    this.requetDetailData()
  },
  mounted() {},
  methods: {
    requetDetailData() {
      this.$api
        .fetch(
          `${api.admin.query_consumerLoan_invoice_detail_jsons}/detail/${this.dialogObj.id}/retrieve`,
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
