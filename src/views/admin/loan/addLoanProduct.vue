<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/addLoanProduct.vue
 * @Date         : 2022-03-18 09:52:26
 * @LastEditTime : 2022-11-15 09:55:39
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 引导弹窗占位 -->
    <div class="guide-step5" id="guide-step5"></div>

    <div v-if="loading" class="jsd-loading-view" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.0)"></div>

    <Add-product
      v-if="!loading"
      ref="addProduct"
      :ratePlanList.sync="ratePlanList"
      :questionnaireList.sync="questionnaireList"
      :model.sync="model"
      @handleAdd="handleAdd"
    ></Add-product>
  </app-main>
</template>

<script>
import utils from '@/utils'
import AddProduct from './components/addLoanProduct/index.vue'
import guide from '@/utils/guide'
// import { transformBusinessUnitsTypeOpts } from '@/plugin/filters'
// import api from '@/server/api'

export default {
  components: { AddProduct },
  data: () => ({
    loading: true,
    ratePlanList: [],
    questionnaireList: [],
    businessUnitList: [],
    documentTemplateList: [],
    model: {
      name: '',
      productType: '', //枚举 NEW_CLIENT CLIENT TEACHER KABUHAYAN CORPORATE
      ratePlanId: '',
      questionnaires: []
    }
  }),
  computed: {},
  // deactivated() {
  //   // 清空表单验证信息
  //   this.$nextTick(() => {
  //     if (this.$refs.addProduct) {
  //       this.$refs.addProduct.clearValidate()
  //     }
  //   })
  // },
  // 添加这一行 可以保证组件不被keep-alive进行缓存
  // deactivated() {
  //   this.$destroy()
  // },
  activated() {
    // 添加用户引导
    this.setGuideConfig()
  },
  beforeRouteLeave(to, from, next) {
    this.$driver.reset()
    next()
  },
  created() {
    // 添加这一行 可以保证组件不被keep-alive进行缓存
    this.$destroy()
    this.requstRatePlanData()
    this.requstConfigureData()
  },
  mounted() {},
  methods: {
    setGuideConfig() {
      let guiHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP5', localStorage))
      if (!guiHidden) {
        this.requestTemplateData()

        let _that = this
        this.isShowGuide = true
        setTimeout(() => {
          _that.$driver.defineSteps(guide)
          _that.$driver.start()
        }, 300)
      }
    },
    /**
     * @description: 请求添加
     * @param {*} formData
     */
    handleAdd(formData) {
      this.requestLoanProductData({ url: 'query_product_json', param: formData.formData })
    },
    /**
     * @description: 获取模板数据
     */
    requestTemplateData() {
      this.$api
        .fetch('query_templateData_loanProduct_jsons', {}, { method: 'get' })
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.model = data
          if (this.isShowGuide) {
            this.loading = false
          }
          // this.loading = false
        })
        .catch(() => {})
    },
    /**
     * @description: 获取所有利率计划
     */
    requstRatePlanData() {
      this.$api
        .fetch(
          'query_ratePlan_all_jsons',
          { type: 'CUSTOMER' },
          {
            method: 'get'
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(element => {
            element.value = element.id
            element.label = element.name
          })
          this.ratePlanList = data
          if (!this.isShowGuide) {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 获取所有上传模板
     */
    requstConfigureData() {
      // `${api.admin.query_loanUploadConfigure_jsons}/all`,
      this.$api
        .fetch(
          'query_questionnaire_json',
          { page: 0, size: 20 },
          {
            method: 'get'
            // comm: { paramUrl: true }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.questionnaireList = []
          data.forEach(element => {
            let obj = {}
            obj.value = element.id
            obj.label = element.question
            this.questionnaireList.push(obj)
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 贷款产品数据基础请求
     * @param {*} requestBody requestBody
     */
    requestLoanProductData(requestBody = {}) {
      let defaultBody = {
        url: 'query_loanProduct_jsons',
        param: {},
        optionParam: {}
      }
      let body = Object.assign(defaultBody, requestBody)

      var loading = this.$loading({
        lock: true,
        text: this.$t('loading.add'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.$api
        .fetch(body.url, body.param, body.optionParam)
        .then(() => {
          if (loading) {
            loading.close()
          }
          this.$router.go(-1)
          this.$message.success(this.$t('commonDialog.success'))
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.$message.error(msg)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  position: absolute;
  background: red;
}
.add-button {
  z-index: 10;
  background: green;
  position: sticky; // float: left;
  width: 100%;
  height: 200px;
  top: 60px;
  left: 60px;
}
</style>
