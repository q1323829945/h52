<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/pdpa/detail.vue
 * @Date         : 2022-07-19 15:14:44
 * @LastEditTime : 2022-09-09 16:56:46
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <div :class="isShowBreadcrumb == '1' ? 'jsd-edit-header' : 'jsd-edit-header jsd-edit-header-top'">
      <el-button v-if="isEdit" type="primary" @click="handleAdd">{{ `${$t('button.add')}` }}</el-button>
      <el-button type="primary" @click="handleEdit">
        {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
      </el-button>
      <el-button v-if="isEdit" type="primary" @click="handleHold">{{ `${$t('button.save')}` }}</el-button>
    </div>

    <div v-if="loading" class="jsd-loading-view" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.0)"></div>
    <div v-if="!loading" class="jsd-edit-detail-view" v-loading="loading">
      <Detail-Widget
        v-if="!loading"
        ref="pdpaDetailWidget"
        style="padding-bottom: 20px"
        :isEdit="isEdit"
        :isNewAdd="false"
        :model="detailObj"
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
      this.detailObj = { ...this.setObject(this.$route.query.data) }
      console.log('this.detailObj==>', this.detailObj)
      if (utils.objKey(this.detailObj, 'id')) {
        // ??????
        this.requstDetailData()
      }
    },
    /**
     * @description: ????????????
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
     * @description: ??????????????????
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
     * @description: ??????
     */
    handleHold() {
      this.$refs.pdpaDetailWidget.handleSave()
    },
    handleSave(value) {
      if (value.pdpaInformation.length <= 0) {
        this.$message.error(this.$t('pdpa.pdpaEmptyMessage'))
        return
      }
      // ??????
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
    // ??????????????????
    setObject(jsonString) {
      var text = jsonString
      // ??????
      var obj = JSON.parse(text)
      return obj
    }
  }
}
</script>
