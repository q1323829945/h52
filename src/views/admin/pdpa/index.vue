<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/pdpa/index.vue
 * @Date         : 2022-07-18 17:28:03
 * @LastEditTime : 2022-11-11 15:27:17
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <AuthWidget :model="dataObj" @handleSave="handleSave" />
    <el-divider class="divider"></el-divider>
    <search-bar ref="mySearchBar" :optionList="[]" :isAdd="true" :is-export="false" :is-import="false" @handle-push="handleAdd"></search-bar>

    <!-- 列表 -->
    <public-table style="margin-top: 10px" :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <!-- country -->
      <template slot="country" slot-scope="slotProps">
        <div>{{ slotProps.data.country | transformNationalityType }}</div>
      </template>
      <!-- language -->
      <template slot="language" slot-scope="slotProps">
        <div>{{ slotProps.data.language | transformLanguageType }}</div>
      </template>
      <!-- 操作-->
      <template slot="detail" slot-scope="slotProps">
        <el-button size="mini" type="text" @click="handleDetail(slotProps.data)">{{ $t('button.detail') }}</el-button>
      </template>
    </public-table>

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import utils from '@/utils'
import api from '@/server/api'
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from 'components/searceBar'
import AuthWidget from './components/authWidget/index.vue'

export default {
  components: {
    PublicTable,
    Pagination,
    SearchBar,
    AuthWidget
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      tableHead: [
        {
          label: 'pdpa.country',
          type: 'slot',
          slotName: 'country'
        },
        {
          label: 'pdpa.language',
          type: 'slot',
          slotName: 'language'
        },
        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'detail',
          fixed: 'right'
        }
      ],
      dataObj: {
        isElectronicSignature: {
          label: 'pdpa.isElectronicSignature',
          value: false,
          selectList: [
            { label: 'configType.yes', value: true },
            { label: 'configType.no', value: false }
          ]
        },
        isFaceRecognition: {
          label: 'pdpa.isFaceRecognition',
          value: false,
          selectList: [
            { label: 'configType.yes', value: true },
            { label: 'configType.no', value: false }
          ]
        },
        isFingerprint: {
          label: 'pdpa.isFingerprint',
          value: false,
          selectList: [
            { label: 'configType.yes', value: true },
            { label: 'configType.no', value: false }
          ]
        }
      }
    }
  },
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
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
    this.requstPdpaData()
    this.requstAuthorizationData()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'pdpaDetail' || to.name == 'pdpaAdd') {
      utils.setStore('currentPageIndex', this.currentPage, sessionStorage)
    } else {
      utils.removeStore('currentPageIndex')
    }
    next()
  },
  created() {
    this.initPage()
  },
  methods: {
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
     * @description: 获取所有pdpa
     */
    requstPdpaData() {
      this.requstBaseData({
        url: 'query_pdpa_jsons',
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
     * @description: 获取所有pdpa
     */
    requstAuthorizationData() {
      this.$api
        .fetch(
          'query_pdpa_authority_jsons',
          {},
          {
            method: 'get',
            comm: {
              showMessage: true
            }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.dataObj.isElectronicSignature.value = data.isElectronicSignature
          this.dataObj.isFaceRecognition.value = data.isFaceRecognition
          this.dataObj.isFingerprint.value = data.isFingerprint
          console.log('this.dataObj==>', this.dataObj)
        })
        .catch(() => {
          this.loading = false
        })
      // this.requstBaseData({
      //   url: 'query_pdpa_authority_jsons',
      //   param: {},
      //   optionParam: {
      //     method: 'get',
      //     comm: {
      //       showMessage: true
      //     }
      //   }
      // })
    },
    /**
     * @description: 请求基础方法
     * @param {*} requestBody requestBody
     */
    requstBaseData(requestBody = {}) {
      let defaultBody = {
        url: 'query_pdpa_jsons',
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
            this.requstPdpaData()
            this.requstAuthorizationData()
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
    handleAdd() {
      this.routerLink(`/dashboard/pdpaAdd`)
    },
    handleDetail(data) {
      var newString = JSON.stringify(data)
      this.routerLink(`/dashboard/pdpaDetail?data=${newString}`)
    },
    handleSave(value) {
      console.log('value==>', value)
      this.requstBaseData({
        loadText: this.$t('loading.change'),
        isHaneld: true,
        url: `${api.admin.query_pdpa_authority_jsons}`,
        param: value,
        optionParam: {
          method: 'put',
          comm: {
            showMessage: true
          }
        }
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstPdpaData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstPdpaData()
    }
  }
}
</script>

<style lang="less" scoped>
.divider {
  margin: 0px 0px 10px 0px;
  width: 99%;
}
</style>
