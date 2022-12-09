<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/loan/loanProductHistory.vue
 * @Date         : 2022-04-08 15:16:46
 * @LastEditTime : 2022-06-28 13:29:00
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 列表 -->
    <public-table :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <!-- 贷款产品状态 -->
      <template slot="status" slot-scope="slotProps">
        <div>{{ slotProps.data.status | transformLoanStatus }}</div>
      </template>
      <!-- 贷款产品类型 -->
      <template slot="loanProductType" slot-scope="slotProps">
        <div>{{ slotProps.data.loanProductType | transformLoanType }}</div>
      </template>
      <!-- 操作 -->
      <template slot="operation" slot-scope="slotProps">
        <!-- 详情 -->
        <el-button style="margin-left: 20px" size="mini" type="text" @click="handleDetail(slotProps.data)">{{ $t('button.detail') }}</el-button>
      </template>
    </public-table>

    <Pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from '@/components/publicTable'
import Pagination from '@/components/pagination'
import utils from '@/utils'
import api from '@/server/api'

export default {
  components: { PublicTable, Pagination },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      productData: {},
      productTypeOpts: [], //贷款产品类型
      productStatusOpts: [], //贷款产品状态
      tableData: [],
      tableHead: [
        {
          label: 'loanProduct.identificationCode',
          value: 'identificationCode',
          width: '180px'
        },
        {
          label: 'loanProduct.version',
          value: 'version',
          width: '80px'
        },
        {
          label: 'loanProduct.name',
          value: 'name',
          width: '240px'
        },
        {
          label: 'loanProduct.loanProductType',
          type: 'slot',
          slotName: 'loanProductType',
          width: '320px'
        },
        {
          label: 'loanProduct.status',
          type: 'slot',
          slotName: 'status',
          width: '240px'
        },
        {
          label: 'loanProduct.description',
          value: 'description',
          width: '240px'
        },
        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'operation',
          width: '270px',
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
  beforeRouteLeave(to, from, next) {
    if (to.name != 'loanProductDetail' && to.name != 'loan-index') {
      utils.removeStore('currentPageIndex')
    }

    next()
  },
  created() {
    this.initData()
    this.requestData()
  },
  mounted() {},
  methods: {
    initData() {
      this.productStatusOpts = utils.loan.productStatusOpts
      this.productTypeOpts = utils.loan.productTypeOpts

      this.productData = this.setObject(this.$route.query.data)
    },
    /**
     * @description: 获取所有产品
     * @param {*}
     */
    requestData() {
      this.$api
        .fetch(
          `${api.admin.query_loanProduct_jsons}/${this.productData.identificationCode}/history`,
          {},
          {
            method: 'get',
            comm: {
              paramUrl: false,
              page: this.currentPage,
              size: this.pageSize
            }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.tableData = data
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 查看详情
     * @param {*} data
     */
    handleDetail(data) {
      data.isEdit = false
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
    },
    // 上页传值对象
    setObject(jsonString) {
      var text = jsonString
      // 对象
      var obj = JSON.parse(text)
      return obj
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  background: red;
}
</style>
