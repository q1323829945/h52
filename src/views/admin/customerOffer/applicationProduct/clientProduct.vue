<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/applicationProduct/clientProduct.vue
 * @Date         : 2022-08-12 14:48:23
 * @LastEditTime : 2022-09-23 16:31:14
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <div :class="isShowBreadcrumb == '1' ? 'jsd-edit-header' : 'jsd-edit-header jsd-edit-header-top'">
      <el-button type="primary" @click="handleEdit">
        {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
      </el-button>
      <el-button v-if="isEdit" type="primary" @click="handleHold">{{ `${$t('button.save')}` }}</el-button>
    </div>

    <div class="jsd-edit-detail-view" v-loading="loading">
      <Client-Product-Widgets
        v-if="!loading"
        ref="ClientProductWidgets"
        :isEdit="isEdit"
        :widgetOpts="detailObj.widgetOpts"
        :model="detailObj.model"
      />
    </div>
  </app-main>
</template>

<script>
import api from '@/server/api'
import utils from '@/utils'
import ClientProductWidgets from '../components/clientProductWidgets/index.vue'
import config from '@/views/admin/customerOffer/optsConfig/clientProductCongfig'

export default {
  components: { ClientProductWidgets },
  data() {
    return {
      isShowBreadcrumb: utils.getStore('SHOW-BREADCRUMB', sessionStorage) || '0',
      editStatus: '',
      productId: '',
      productType: '',
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
    if (utils.objKey(this.detailObj, 'applicationId')) {
      this.editStatus = this.detailObj.status
      this.productId = this.detailObj.applicationId
      this.productType = this.detailObj.productType
      this.requstDetailData()
    }
  },
  methods: {
    initData() {},
    /**
     * @description: 设置组件
     */
    setWidgets(model) {
      console.log('model==>', model)
      let widgetOpts = JSON.parse(JSON.stringify(config.widgetsOpts))
      if (model.questionnaires && model.questionnaires.length > 0) {
        model.questionnaires.forEach(() => {
          widgetOpts.questionnaires.questionnairesWidgets.push(widgetOpts.questionnaires.widgets)
        })
      }

      if (model.financialInformation.creditCards && model.financialInformation.creditCards.length > 0) {
        widgetOpts.financialInformation.creditCards.creditCardsWidgets = []
        model.financialInformation.creditCards.forEach(() => {
          widgetOpts.financialInformation.creditCards.creditCardsWidgets.push(widgetOpts.financialInformation.creditCards.widgets)
        })
      }
      return widgetOpts
    },
    /**
     * @description: 获取详情
     */
    requstDetailData() {
      let url = `${api.admin.query_loan_json}/${this.productId}`
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
        url: 'query_loan_json',
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
            if (data.customerInformation) {
              let birthDay = utils.fomartDate(new Date(data.customerInformation.birthDay), '{y}-{m}-{d}')
              data.customerInformation.birthDay = birthDay
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
        })
    },
    handleEdit() {
      this.isEdit = !this.isEdit
      this.$refs.ClientProductWidgets.$refs.clientProductFormData.clearValidate()
      if (!this.isEdit && this.productId != '') {
        this.loading = true
        this.requstDetailData()
      }
    },
    /**
     * @description: 保存
     */
    handleHold() {
      let body = {
        isHaneld: true,
        loadText: this.$t('loading.change'),
        url: `${api.admin.query_loan_json}/update`,
        param: { productType: this.productType, data: this.detailObj.model },
        optionParam: {
          method: 'put',
          comm: {
            showMessage: true
          }
        }
      }
      this.requstBaseData(body)
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
