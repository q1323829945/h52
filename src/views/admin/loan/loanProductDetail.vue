<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/loanProductDetail.vue
 * @Date         : 2022-03-19 16:47:45
 * @LastEditTime : 2022-10-09 16:51:03
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <div style="height: 300px" v-if="loading" v-loading="loading"></div>
    <Product-detail
      ref="productDetail"
      :data="popupObj.data"
      :detailModel="detailModel"
      :ratePlanList.sync="ratePlanList"
      :questionnaireList.sync="questionnaireList"
      @handleAdd="handleChange"
      @handleCancelEdit="handleCancelEdit"
    ></Product-detail>
  </app-main>
</template>

<script>
import ProductDetail from './components/loanProductDetail/index.vue'
import utils from '@/utils'
import api from '@/server/api'
// import { transformBusinessUnitsTypeOpts } from '@/plugin/filters'

export default {
  components: { ProductDetail },
  data() {
    return {
      loading: true,
      popupObj: {
        data: {},
        visible: false,
        width: '80%'
      },
      data: {},
      detailModel: {
        name: '',
        productType: '', //枚举 NEW_CLIENT CLIENT TEACHER KABUHAYAN CORPORATE
        interestFeature: {
          //这个还是先用以前的
          interestType: '',
          ratePlanId: '',
          baseYearDays: '',
          adjustFrequency: '',
          overdueInterestRatePercentage: ''
        }
      },
      ratePlanList: [],
      questionnaireList: []
    }
  },
  computed: {},
  beforeRouteLeave(to, from, next) {
    if (to.name != 'loanProductHistory' && to.name != 'loan-index') {
      utils.removeStore('currentPageIndex')
    }
    next()
    // 离开页面销毁ProductDetail组件，解决下次进入报错feeType报错
    this.$destroy('ProductDetail')
  },
  created() {
    // 添加这一行 可以保证组件不被keep-alive进行缓存
    // this.$destroy()
    this.initData()
    this.requstRatePlanData()
    this.requstConfigureData()
    this.requestLoanProductData({
      url: `${api.admin.query_product_json}/${this.popupObj.data.id}`,
      optionParam: {
        method: 'get',
        comm: {
          paramUrl: true
        }
      }
    })
  },
  mounted() {},
  methods: {
    initData() {
      this.popupObj.visible = true
      this.popupObj.data = this.setObject(this.$route.query.data)
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
          // this.loading = false
        })
        .catch(msg => {
          this.$message.error(msg)
        })
    },
    /**
     * @description: 获取所有文件配置
     */
    requstConfigureData() {
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
      this.loading = false
      // this.requstRatePlanData().catch(() => {
      //   this.loading = false
      // })
    },
    /**
     * @description: 贷款产品数据请求基础方法
     * @param {*} requestBody requestBody
     */
    requestLoanProductData(requestBody = {}) {
      let defaultBody = {
        url: 'query_product_json',
        param: {},
        optionParam: {},
        isHaneld: false
      }
      let body = Object.assign(defaultBody, requestBody)
      if (body.optionParam.method == 'put') {
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
          const data = JSON.parse(JSON.stringify(res.data))
          this.data = data
          this.setDetailModel(data)

          if (body.optionParam.method == 'put') {
            this.$refs.productDetail.isEdit = false
            if (loading) {
              loading.close()
            }
            this.$router.go(-1)
            this.$message.success(this.$t('commonDialog.success'))
          }
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.loading = false
          this.$message.error(msg)
        })
    },
    // model
    setDetailModel(data) {
      this.detailModel = data
      let questionnaireList = []
      data.questionnaires.forEach(element => {
        questionnaireList.push(element.id.toString())
      })
      this.detailModel.questionnaires = questionnaireList
    },
    /**
     * @description: 请求修改
     * @param {*} formData
     */
    handleChange(formData) {
      this.requestLoanProductData({
        url: `${api.admin.query_product_json}`,
        param: formData.formData,
        optionParam: {
          method: 'put'
        }
      })
    },
    /**
     * @description: 取消编辑
     */
    handleCancelEdit() {
      this.requestLoanProductData({
        url: `${api.admin.query_product_json}/${this.popupObj.data.id}`,
        optionParam: {
          method: 'get',
          comm: {
            paramUrl: true
          }
        }
      })
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
