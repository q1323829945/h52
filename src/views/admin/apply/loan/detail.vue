<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/detail.vue
 * @Date         : 2022-05-09 16:30:03
 * @LastEditTime : 2022-09-23 16:27:20
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- <div v-if="editStatus == 'SUBMIT'" class="header">
      <el-button type="primary" @click="handleEdit">
        {{ !isEdit ? `${$t('button.editUnderwriting')}` : `${$t('button.cancelNoBlank')}` }}
      </el-button>
      <el-button v-if="isEdit" type="primary" @click="handleHold">{{ `${$t('button.save')}` }}</el-button>
    </div> -->
    <div class="base-view base-top" v-loading="loading">
      <CustomerOffer-Widget
        v-if="!loading"
        ref="CustomerOfferWidget"
        :isEdit="isEdit"
        :widgetOpts="detailObj.widgetOpts"
        :model="detailObj.model"
        @handleDownload="handleDownload"
        @handleSave="handleSave"
        @handleEdit="handleEdit"
      />
    </div>
  </app-main>
</template>

<script>
import api from '@/server/api'
import utils from '@/utils'
// import { transformLoanTerm } from '@/plugin/filters'
import CustomerOfferWidget from './components/customerOfferWidgets/index.vue'

export default {
  components: { CustomerOfferWidget },
  data() {
    return {
      editStatus: '',
      productId: '',
      isEdit: false,
      loading: true,
      datas: [],
      detailObj: { model: {} }
    }
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    if (to.name != 'customerOffer-index') {
      utils.removeStore('currentPageIndex')
    }
    next()
  },
  created() {
    // 添加这一行 可以保证组件不被keep-alive进行缓存
    this.$destroy()
    this.detailObj = this.setObject(this.$route.query.data)
    if (utils.objKey(this.detailObj, 'id')) {
      this.editStatus = this.detailObj.status
      this.productId = this.detailObj.id
      this.requstDetailData()
    }
  },
  methods: {
    initData() {},
    /**
     * @description: 设置组件
     */
    setWidgets(model) {
      let widgetOpts = JSON.parse(JSON.stringify(utils.loan.loanApplicationWidgetOpts))
      // guarantor担保人组件
      if (model.guarantor && model.guarantor.guarantors.length > 0) {
        widgetOpts.guarantor.guarantorWidgets = []
        model.guarantor.guarantors.forEach(() => {
          widgetOpts.guarantor.guarantorWidgets.push(widgetOpts.guarantor.widgets)
        })
      }
      // uploadDocument上传文件组件
      if (model.uploadDocument && model.uploadDocument.length > 0) {
        widgetOpts.uploadDocument.uploadDocumentWidgets = []
        model.uploadDocument.forEach(() => {
          widgetOpts.uploadDocument.uploadDocumentWidgets.push(widgetOpts.uploadDocument.widgets)
        })
      }
      return widgetOpts
    },
    /**
     * @description: 获取详情
     */
    requstDetailData() {
      let url = `${api.admin.query_customerOffer_jsons}/${this.productId}`
      this.requstBaseData({
        url: url,
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
        url: 'query_riskControlRule_jsons',
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
          data.editStatus = this.editStatus
          if (body.isHaneld) {
            loading.close()
            this.$router.go(-1)
          } else {
            // 贷款
            if (data.loan) {
              data.loan.amount = data.loan.amount ? utils.amountFilter(data.loan.amount) : ''
            }
            // 产品
            if (data.product) {
              if (data.product.amountConfiguration) {
                let max = data.product.amountConfiguration.maxValueRange ? utils.amountFilter(data.product.amountConfiguration.maxValueRange) : ''
                let min = data.product.amountConfiguration.minValueRange ? utils.amountFilter(data.product.amountConfiguration.minValueRangemax) : ''
                data.product.amountConfiguration.maxValueRange = max
                data.product.amountConfiguration.minValueRange = min
              }
            }
            // 担保人
            if (data.guarantor) {
              if (data.guarantor.guarantors.length > 0) {
                for (let index = 0; index < data.guarantor.guarantors.length; index++) {
                  const element = data.guarantor.guarantors[index]
                  if (element.primaryGuarantor) {
                    data.guarantor.primaryGuarantorName = element.name
                    break
                  }
                }
              }
            }
            this.detailObj = { model: data, widgetOpts: this.setWidgets(data) }
          }
        })
        .catch(msg => {
          this.loading = false
          if (body.isHaneld) {
            loading.close()
          } else {
            this.$message.error(msg)
          }
          this.detailObj = { model: utils.loan.loanApplicationModel, widgetOpts: this.setWidgets(utils.loan.loanApplicationModel) }
        })
    },
    handleEdit() {
      this.isEdit = !this.isEdit

      if (!this.isEdit && this.productId != '') {
        this.loading = true
        this.requstDetailData()
      }
    },
    handleHold() {
      this.$refs.CustomerOfferWidget.handleSave()
    },
    // 修改承销信息
    handleSave(value) {
      let body = {
        loadText: this.$t('loading.change'),
        url: `${api.admin.query_underwritingManagement_jsons}/${value.underwriting.id}`,
        param: value.underwriting,
        isHaneld: true,
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
     * @description: 下载文件
     * @param {*} url
     * @param {*} param
     * @param {*} optionParam
     */
    requstHandleDocumentTemplateData(loadingText, url, param, optionParam = {}) {
      const loading = this.$loading({
        lock: true,
        text: loadingText,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .fetchDocument(url, param, optionParam)
        .then(res => {
          if (loading) {
            loading.close()
          }
          utils.convertRes2Blob(res)
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.$message.error(msg)
        })
    },
    handleDownload(value) {
      // 下载文件
      this.requstHandleDocumentTemplateData(
        this.$t('loading.download'),
        `${api.admin.query_customerOffer_jsons}/download?path=${value.file}`,
        {},
        {
          encrypt: 'download',
          method: 'get',
          responseType: 'arraybuffer'
        }
      )
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
.header {
  background: #fff;
  position: fixed;
  margin: -50px 0px 0px -18px;
  width: 80%;
  padding: 15px 15px;
  z-index: 100;
  // background: transparent;
  // margin: 0px 0px 0px 20px;
}
.base-view {
  margin-top: 30px;
}
.base-top {
  margin-top: -25px;
}
</style>
