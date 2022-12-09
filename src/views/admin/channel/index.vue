<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/channel/index.vue
 * @Date         : 2022-08-22 13:33:55
 * @LastEditTime : 2022-11-28 09:57:33
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
      :isAdd="true"
      :is-export="false"
      :is-import="false"
      @handle-push="handleAdd"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></search-bar>

    <!-- 引导弹窗占位 -->
    <div class="guide-step1" id="guide-step1"></div>

    <!-- 列表 -->
    <public-table :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <!-- organisationRegistrationDate-->
      <template slot="channelCastType" slot-scope="slotProps">
        <div>{{ slotProps.data.channelCastType | transformChannelCastTypeType }}</div>
      </template>
      <!-- enable -->
      <template slot="enable" slot-scope="slotProps">
        <div>{{ slotProps.data.enable == 'Y' ? 'No' : 'Yes' }}</div>
      </template>
      <!-- 删除、修改信息 -->
      <template slot="operation" slot-scope="slotProps">
        <!-- 渠道禁用 -->
        <!-- <el-popconfirm
          hide-icon
          :title="$t('loanAgreementConfig.changeTips')"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          @confirm="handDisabled(slotProps.data)"
        >
          <el-button slot="reference" size="mini" type="text">
            {{ 'Disabled Status' }}
          </el-button>
        </el-popconfirm> -->
        <!-- 渠道协议 -->
        <!-- <el-button style="margin-left: 20px" size="mini" type="text" @click="handLook('Channel', slotProps.data)">
          {{ 'Channel  Agreement' }}
        </el-button> -->
        <!-- 详情按钮 style="margin-left: 20px"-->
        <el-button size="mini" type="text" @click="handleDetail(slotProps.data)">{{ $t('button.detail') }}</el-button>
      </template>
    </public-table>

    <!-- 查看渠道协议弹窗 -->
    <Channel-Agreement-Dialog ref="channelDialog" :dialogObj="dialogObj.channel" />

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import utils from '@/utils'
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import channelConfig from '@/views/admin/channel/optsConfig/channelConfig'
import api from '@/server/api'
import SearchBar from 'components/searceBar'
import ChannelAgreementDialog from '@/views/admin/channel/components/channelDialog/index.vue'
import guide from '@/utils/guide'
import language from '@/utils/language'

export default {
  components: {
    SearchBar,
    ChannelAgreementDialog,
    PublicTable,
    Pagination
  },
  data() {
    return {
      isShowGuide: false,
      i18n: language,
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      tableHead: [
        {
          label: 'Agent Code',
          value: 'channelCode'
        },
        {
          label: 'Agent Name',
          value: 'channelName'
        },
        {
          label: 'Agent Cast Type',
          type: 'slot',
          slotName: 'channelCastType'
        },
        {
          label: 'Disabled Status',
          type: 'slot',
          slotName: 'enable'
        },
        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'operation',
          width: '120px',
          fixed: 'right'
        }
      ],
      searchModel: {},
      // searchbar
      searchBarOpts: [
        {
          type: 'input',
          key: 'channelCode',
          label: 'Agent Code',
          placeholder: 'Please input'
        },
        {
          type: 'input',
          key: 'channelName',
          label: 'Agent Name',
          placeholder: 'Please input'
        }
      ],
      addForm: {
        refName: 'addForm',
        model: {},
        widgetOpts: []
      },
      dialogObj: {
        commission: {
          show: false,
          title: 'Commission Agreement'
        },
        channel: {
          show: false,
          title: 'Channel Agreement'
        }
      } //弹窗
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
  watch: {
    // 语言切换监听
    'i18n.locale': {
      handler() {
        // if (this.isShowGuide) {
        //   window.location.reload()
        //   utils.setStore('GUIDE-SAVE-SETP1', '', localStorage)
        //   this.setGuideConfig()
        // }
      }
    }
  },
  activated() {
    let pageIndex = parseInt(utils.getStore('currentPageIndex', sessionStorage)) || 0
    this.currentPage = !pageIndex ? 0 : pageIndex
    this.$nextTick(() => {
      this.$refs['myPagination'].currentPage = this.currentPage > 0 ? this.currentPage + 1 : 1
    })
    this.requstChannelData()
    this.setGuideConfig()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'channel-Detail') {
      utils.setStore('currentPageIndex', this.currentPage, sessionStorage)
    } else {
      utils.removeStore('currentPageIndex')
    }
    this.dialogObj.channel.show = false
    this.$refs['channelDialog'].addDialogVisible = false
    this.$refs['channelDialog'].addFormData = {
      agreementType: '',
      commissionMethodType: '',
      channelId: '',
      date: [],
      channelCommissionArrangement: [{ commissionCountRange: '', commissionAmount: '' }]
    }
    this.$refs['channelDialog'].changeDialogVisible = false
    this.$driver.reset()
    this.isShowGuide = false

    next()
  },
  created() {
    // window.test = this.test

    this.initPage()
  },
  methods: {
    // test() {
    //   console.log('test test test test')
    // },
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
     * @description: 页面指引
     */
    setGuideConfig() {
      let guideHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP1', localStorage))
      console.log('GUIDE-SAVE-SETP1==>', utils.getStore('GUIDE-SAVE-SETP1', localStorage))
      console.log('guideHidden==>', guideHidden)

      if (!guideHidden) {
        let _that = this
        this.isShowGuide = true
        setTimeout(() => {
          _that.$driver.defineSteps(guide)
          _that.$driver.start()
          // 保存第一步引导
          utils.setStore('GUIDE-SAVE-SETP1', 'true', localStorage)
        }, 300)
      }
    },
    /**
     * @description: 删除对象为空值的属性
     * @param {*} obj
     * @return {*} obj
     */
    removeProperty(obj) {
      Object.keys(obj).forEach(item => {
        if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
      })
      return obj
    },
    /**
     * @description: 新增规则组件配置
     */
    setNewWidgets() {
      let widgetOpts = JSON.parse(JSON.stringify(channelConfig.widgets))
      this.addForm.model = {
        legalEntityIndicator: '', //负责人
        organisationSector: '', //所属部门
        organisationRegistrationDate: utils.fomartDate(new Date(), '{y}-{m}-{d}'), //注册时间
        placeOfRegistration: '', //注册地
        channelIdentification: [
          {
            channelIdentificationType: '', //枚举
            channelIdentification: ''
          }
        ],
        channelCast: {
          channelCode: '',
          channelName: '',
          channelCastType: '' //枚举
        }
      }
      // channelIdentification
      if (this.addForm.model.channelIdentification.length > 0) {
        widgetOpts.channelIdentification.channelIdentificationWidgets = []
        this.addForm.model.channelIdentification.forEach(() => {
          widgetOpts.channelIdentification.channelIdentificationWidgets.push(widgetOpts.channelIdentification.widgets)
        })
      }
      this.addForm.widgetOpts = widgetOpts
    },
    /**
     * @description: 获取所有渠道信息
     */
    requstChannelData() {
      let searchModel = this.removeProperty(this.searchModel)

      this.requstBaseData({
        url: 'query_channel_jsons',
        param: { page: this.currentPage, size: this.pageSize, ...searchModel },
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
        url: 'query_organisation_jsons',
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
            this.requstChannelData()
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
     * @description: 点击查看
     */
    handLook(type, data) {
      if (type == 'Commission') {
        // 佣金
        this.dialogObj.commission.show = true
        this.dialogObj.commission.id = data.id
      } else {
        // 渠道
        this.dialogObj.channel.show = true
        this.dialogObj.channel.id = data.id
      }
    },
    /**
     * @description: 修改渠道禁用状态
     * @param {*} value
     */
    handDisabled(value) {
      let body = {
        isHaneld: true,
        loadText: this.$t('loading.change'),
        url: `${api.admin.query_channel_jsons}/enable/${value.id}`,
        param: {},
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
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      console.log('data==>', data)
      this.currentPage = 0
      this.pageSize = 10
      this.requstChannelData()
    },
    /**
     * @description:重置
     */
    handleReset() {
      this.searchModel = { channelCode: '', channelName: '' }
      this.$refs['mySearchBar'].searchModel = this.searchModel
      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage
      this.requstChannelData()
    },
    /**
     * @description: 点击新增
     */
    handleAdd() {
      this.setNewWidgets()
      var newString = JSON.stringify({ isNewAdd: true, model: this.addForm.model, widgetOpts: this.addForm.widgetOpts })
      this.routerLink(`/dashboard/channel/detail?data=${newString}`)
    },
    /**
     * @description: 点击详情
     */
    handleDetail(value) {
      var newString = JSON.stringify({ id: value.id, model: this.addForm.model })
      this.routerLink(`/dashboard/channel/detail?data=${newString}`)
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstChannelData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstChannelData()
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
