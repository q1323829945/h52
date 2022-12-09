<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/pdpa/add.vue
 * @Date         : 2022-07-19 10:15:06
 * @LastEditTime : 2022-11-09 17:09:24
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <div :class="isShowBreadcrumb == '1' ? 'jsd-edit-header' : 'jsd-edit-header jsd-edit-header-top'">
      <el-button type="primary" @click="handleAdd">{{ `${$t('button.add')}` }}</el-button>
      <el-button type="primary" @click="handleEdit">
        {{ `${$t('button.cancel')}` }}
      </el-button>
      <el-button type="primary" @click="handleHold">{{ `${$t('button.save')}` }}</el-button>
    </div>

    <div class="jsd-edit-detail-view" v-loading="loading">
      <DetailWidget
        v-if="!loading"
        ref="pdpaDetailWidget"
        style="padding-bottom: 20px"
        :isEdit="true"
        :isNewAdd="true"
        :model="detailObj"
        @handleSave="handleSave"
      />
    </div>
  </app-main>
</template>

<script>
import utils from '@/utils'
import DetailWidget from './components/detailWidget/index.vue'

export default {
  components: { DetailWidget },
  data() {
    return {
      isShowBreadcrumb: utils.getStore('SHOW-BREADCRUMB', sessionStorage) || '0',
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
    this.loading = true
    next()
  },
  computed: {},
  activated() {
    this.initData()
  },
  methods: {
    initData() {
      this.loading = false
      let item = {
        item: '',
        information: [
          {
            label: '',
            name: ''
          }
        ]
      }
      this.detailObj.area = [
        { label: 'pdpa.country', value: '', rulesMsg: 'pdpa.countryRuleMessage', opts: utils.common.nationalityOpts },
        { label: 'pdpa.language', value: '', rulesMsg: 'pdpa.languageRuleMessage', opts: utils.common.languageTypeOpts }
      ]
      this.detailObj.pdpaInformation = [item]
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
      this.$router.go(-1)
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
      this.detailObj.pdpaInformation.push(item)
    },
    /**
     * @description: 保存
     */
    handleHold() {
      this.$refs.pdpaDetailWidget.handleSave()
    },
    handleSave(value) {
      console.log('value==>', value)
      if (value.pdpaInformation.length <= 0) {
        this.$message.error(this.$t('pdpa.pdpaEmptyMessage'))
        return
      }
      // 新增
      let body = {
        loadText: this.$t('loading.add'),
        url: 'query_pdpa_jsons',
        param: { country: value.area[0].value, language: value.area[1].value, pdpaInformation: value.pdpaInformation },
        optionParam: {
          method: 'post',
          comm: {
            showMessage: true
          }
        },
        isHaneld: true
      }
      this.requstBaseData(body)
    }
  }
}
</script>
