<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/invoice/index.vue
 * @Date         : 2022-06-22 13:16:22
 * @LastEditTime : 2022-08-30 17:04:28
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 搜索 -->
    <!-- <search-bar
      ref="mySearchBar"
      :optionList="[]"
      :toolbarObj="searchBarToolbarObj"
      :isAdd="true"
      :is-export="false"
      :is-import="false"
      @handle-push="dialogObj.show = true"
    ></search-bar> -->

    <!-- 列表 -->
    <public-table :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <!-- invoiceTotalAmount -->
      <template slot="invoiceTotalAmount" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceTotalAmount | amountFilter }}</div>
      </template>
      <!-- invoiceRepaymentDate -->
      <template slot="invoiceRepaymentDate" slot-scope="slotProps">
        <div>{{ slotProps.data.invoiceRepaymentDate | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- startDateTime -->
      <template slot="startDateTime" slot-scope="slotProps">
        <div>{{ slotProps.data.startDateTime | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- endDateTime -->
      <template slot="endDateTime" slot-scope="slotProps">
        <div>{{ slotProps.data.endDateTime | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
      </template>
      <!-- executeDateTime -->
      <template slot="executeDateTime" slot-scope="slotProps">
        <div>{{ slotProps.data.executeDateTime | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
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
      <template slot="instructionLifecycleStatus" slot-scope="slotProps">
        <div>{{ slotProps.data.instructionLifecycleStatus | transformInstructionLifecycleStatus }}</div>
      </template>

      <!-- 操作-->
      <template slot="detail" slot-scope="slotProps">
        <!--  修改账单状态 -->
        <el-dropdown :disabled="slotProps.data.instructionLifecycleStatus != 'PREPARED' ? true : false" trigger="click" @command="commandStatus">
          <span style="font-size: 12px; font-weight: 500" class="el-dropdown-link">
            {{ $t('button.changeInvoiceStatus') }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in repaymentStatusOpts" :key="index">
              <el-dropdown-item
                :disabled="setDropdownMenuDisabled({ index: index, value: slotProps.data.instructionLifecycleStatus })"
                :style="{
                  color:
                    slotProps.data.repaymentStatus == item.type
                      ? '#409eff'
                      : setDropdownMenuDisabled({ index: index, value: slotProps.data.instructionLifecycleStatus })
                      ? '#bbb'
                      : '#303133'
                }"
                :command="handleStatus(slotProps.data.instructionLifecycleStatus, item.value, slotProps.data.id)"
              >
                {{ $t(item.label) }}
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 详情 -->
        <el-button style="margin-left: 25px" size="mini" type="text" @click="handleDetail(slotProps.data.invoiceId)">
          {{ $t('button.detail') }}
        </el-button>
      </template>
    </public-table>

    <!-- 历史账单弹窗 -->
    <Popup-view v-if="dialogObj.show" :title="$t(dialogObj.title)" @handle-close="dialogObj.show = false" :width="setPopupWidth()">
      <Invoice-history :dialogObj="dialogObj" />
    </Popup-view>

    <!-- 详情弹窗 -->
    <Popup-view
      v-if="detailDialogObj.show"
      :title="$t('repayment.invoiceDetail')"
      @handle-close="detailDialogObj.show = false"
      :width="setPopupWidth()"
    >
      <Invoice-detail :dialogObj="detailDialogObj" />
    </Popup-view>

    <!-- 翻页 -->
    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
// import SearchBar from 'components/searceBar'
import InvoiceHistory from './components/invoiceHistory.vue'
import InvoiceDetail from './components/invoiceDetail.vue'
import PopupView from 'components/popupView'
import api from '@/server/api'

export default {
  components: {
    PublicTable,
    Pagination,
    // SearchBar,
    InvoiceHistory,
    InvoiceDetail,
    PopupView
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      repaymentStatusOpts: [],
      dialogObj: {
        show: false,
        title: 'button.historyBill'
      }, // dialogObj 历史账单弹窗
      detailDialogObj: {
        show: false,
        id: ''
      }, // 详情弹窗
      // searchbar
      searchBarToolbarObj: {
        add: 'button.historyBill',
        slot: {
          slotName: 'operation'
        }
      },
      // table
      tableHead: [
        {
          label: 'repayment.invoiceTotalAmount',
          type: 'slot',
          slotName: 'invoiceTotalAmount'
        },
        {
          label: 'repayment.invoiceRepaymentDate',
          type: 'slot',
          slotName: 'invoiceRepaymentDate'
        },
        {
          label: 'repayment.startDateTime',
          type: 'slot',
          slotName: 'startDateTime'
        },
        {
          label: 'repayment.endDateTime',
          type: 'slot',
          slotName: 'endDateTime'
        },
        {
          label: 'repayment.executeDateTime',
          type: 'slot',
          slotName: 'executeDateTime'
        },
        {
          label: 'repayment.invoiceCurrency',
          type: 'slot',
          slotName: 'invoiceCurrency'
        },
        {
          label: 'repayment.instructionLifecycleStatus',
          type: 'slot',
          slotName: 'instructionLifecycleStatus'
        },
        {
          label: 'repayment.operator',
          value: 'operator'
        },
        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'detail',
          width: '200px',
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        this.tableHead[this.tableHead.length - 1].width = this.$i18n.locale == 'en' ? '230px' : '200px'
        return this.tableHead
      }
    },
    // 菜单Disabled
    setDropdownMenuDisabled() {
      return value => {
        let index = 0
        for (var i = 0; i < this.repaymentStatusOpts.length; i++) {
          let obj = this.repaymentStatusOpts[i]
          if (value.value == obj.type) {
            index = i
            break
          }
        }
        return value.index >= index ? false : true
      }
    },
    // 弹窗宽度
    setPopupWidth() {
      return function () {
        const width = this.$i18n.locale == 'en' ? 980 : 980
        if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
          return `${width}`
        } else {
          return `${width + 40}`
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.dialogObj.show = false
    this.detailDialogObj.show = false
    next()
  },
  created() {
    this.initData()
    this.requetRepaymentData()
  },
  methods: {
    initData() {
      this.repaymentStatusOpts = [
        { value: 'FULFILLED', label: 'configType.repaymentFULFILLED', type: 'FULFILLED' },
        { value: 'FAILED', label: 'configType.repaymentFAILED', type: 'FAILED' }
      ]
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
      return new Promise(resolve => {
        this.$api
          .fetch(body.url, body.param, body.optionParam)
          .then(res => {
            this.loading = false
            const data = JSON.parse(JSON.stringify(res.data))
            if (body.isHaneld) {
              resolve({ loading: loading, data: res })
              // loading.close()
              // this.requetRepaymentData()
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
      })
    },
    /**
     * @description: 请求还款列表
     */
    requetRepaymentData(isHaneld = false) {
      this.requstBaseData({
        url: 'query_consumerLoan_invoice_jsons',
        param: { page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm: {
            showMessage: true
          }
        },
        isHaneld: isHaneld
      }).then(res => {
        if (res) {
          res.loading.close()
          this.tableData = res.data.data
          this.sumTotal = res.data.paged.total
        }
      })
    },
    /**
     * @description: 详情
     * @param {*} id
     */
    handleDetail(id) {
      this.detailDialogObj.id = id
      this.detailDialogObj.show = true
    },
    /**
     * @description: 点击状态dropdown
     * @param {*} value
     * @param {*} id
     * @return {*} command obj
     */
    handleStatus(currentStatus, value, id) {
      return {
        currentStatus: currentStatus,
        status: value,
        id: id
      }
    },
    /**
     * @description: 修改状态
     * @param {*} command composeValue里面的值
     */
    commandStatus(command) {
      let body = {
        loadText: this.$t('loading.change'),
        url: `${api.admin.query_consumerLoan_invoice_jsons}/${command.status}/${command.id}`,
        param: {},
        optionParam: {
          method: 'put',
          comm: {
            showMessage: true
          }
        },
        isHaneld: true
      }
      // this.requstBaseData(body)
      this.requstBaseData(body).then(res => {
        if (res) {
          var _that = this
          setTimeout(function () {
            _that.requetRepaymentData(true)
          }, 1 * 1000)
        }
      })
    },

    handlePageSize(val) {
      this.pageSize = val
      this.requetRepaymentData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requetRepaymentData()
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
