<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/pdpa/authorization.vue
 * @Date         : 2022-07-18 17:28:13
 * @LastEditTime : 2022-09-23 16:32:47
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- <div :class="isShowBreadcrumb == '1' ? 'jsd-edit-header' : 'jsd-edit-header jsd-edit-header-top'">
      <el-button v-if="isEdit" type="primary" @click="handleAdd">{{ `${$t('button.add')}` }}</el-button>
      <el-button type="primary" @click="handleEdit">
        {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
      </el-button>
      <el-button v-if="isEdit" type="primary" @click="handleHold">{{ `${$t('button.save')}` }}</el-button>
    </div> -->

    <div v-loading="loading">
      <Detail-Widget
        v-if="!loading"
        ref="pdpaDetailWidget"
        style="padding-bottom: 20px"
        :model="detailObj"
        :onlyRead="true"
        @handleSave="handleSave"
      />
    </div>
  </app-main>
</template>

<script>
import api from '@/server/api'
import utils from '@/utils'
import DetailWidget from './components/detailWidget/index.vue'

export default {
  components: { DetailWidget },
  data() {
    return {
      isShowBreadcrumb: utils.getStore('SHOW-BREADCRUMB', sessionStorage) || '0',
      isEdit: false,
      loading: true,
      datas: [],
      detailObj: { area: [], pdpaInformation: [] }
    }
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    if (to.name != 'pdpaConfig') {
      utils.removeStore('currentPageIndex')
    }
    this.isEdit = false
    this.loading = true
    next()
  },
  computed: {},
  activated() {
    this.initData()
  },
  methods: {
    initData() {
      // this.detailObj = { ...this.setObject(this.$route.query.data) }
      // console.log('this.detailObj==>', this.detailObj)
      this.detailObj = { id: '53989761805991936' }
      if (utils.objKey(this.detailObj, 'id')) {
        // 详情
        this.requstDetailData()
      }
    },
    /**
     * @description: 获取详情
     */
    requstDetailData() {
      this.requstBaseData({
        url: `${api.admin.query_pdpa_jsons}/${this.detailObj.id}`,
        param: {},
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
            this.$router.go(-1)
          } else {
            console.log('data==>', data)
            this.detailObj.area = [
              { label: 'pdpa.country', value: data.country, rulesMsg: 'pdpa.countryRuleMessage', opts: utils.common.nationalityOpts },
              { label: 'pdpa.language', value: data.language, rulesMsg: 'pdpa.languageRuleMessage', opts: utils.common.languageTypeOpts }
            ]
            this.detailObj.pdpaInformation = data.pdpaInformation
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
      this.$refs.pdpaDetailWidget.$refs.pdpaDetailWidgetFormData.clearValidate()
      if (!this.isEdit && utils.objKey(this.detailObj, 'id')) {
        this.$refs.pdpaDetailWidget.selectIndex = -1
        this.requstDetailData()
      }
    },
    handleAdd() {
      console.log('handleAdd')
      let item = {
        item: '',
        information: [
          {
            label: '',
            name: ''
          }
        ]
      }
      this.detailObj.pdpaInformation.unshift(item)
    },
    /**
     * @description: 保存
     */
    handleHold() {
      this.$refs.pdpaDetailWidget.handleSave()
    },
    handleSave(value) {
      if (value.pdpaInformation.length <= 0) {
        this.$message.error(this.$t('pdpa.pdpaEmptyMessage'))
        return
      }
      // 修改
      let body = {
        isHaneld: true,
        loadText: this.$t('loading.change'),
        url: `${api.admin.query_pdpa_jsons}/${value.id}`,
        param: { pdpaInformation: value.pdpaInformation },
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
