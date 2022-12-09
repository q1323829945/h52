<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/channel/detail.vue
 * @Date         : 2022-08-22 14:04:07
 * @LastEditTime : 2022-12-05 14:30:55
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <div :class="isShowBreadcrumb == '1' ? 'jsd-edit-header' : 'jsd-edit-header jsd-edit-header-top'">
      <el-button v-if="!isNewAdd && !loading" type="primary" @click="handleEdit">
        {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
      </el-button>
      <el-button v-if="isEdit" type="primary" @click="handleHold">{{ `${$t('button.save')}` }}</el-button>
    </div>

    <!-- 引导弹窗占位 -->
    <div class="guide-step2" id="guide-step2"></div>

    <div class="jsd-edit-detail-view" v-loading="loading">
      <ChannelInfo-Widget
        v-if="!loading"
        ref="ChannelInfoWidget"
        :isNewAdd="isNewAdd"
        :isEdit="isEdit"
        :widgetOpts="detailObj.widgetOpts"
        :model="detailObj.model"
        :castTypeList.sync="castTypeList"
        @handleSave="handleSave"
      />
    </div>
  </app-main>
</template>

<script>
import api from '@/server/api'
import utils from '@/utils'
import ChannelInfoWidget from './components/channelInfoWidget/index.vue'
import channelConfig from '@/views/admin/channel/optsConfig/channelConfig'
import guide from '@/utils/guide'

export default {
  components: {
    ChannelInfoWidget
  },
  data() {
    return {
      isShowGuide: false,

      isShowBreadcrumb: utils.getStore('SHOW-BREADCRUMB', sessionStorage) || '0',
      isNewAdd: false,
      isEdit: false,
      loading: true,
      infoObj: '',
      datas: [],
      castTypeList: [],
      detailObj: {}
    }
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    if (to.name != 'channel-index') {
      utils.removeStore('currentPageIndex')
    }
    this.loading = true
    this.$driver.reset()

    next()
  },
  activated() {
    this.infoObj = this.setObject(this.$route.query.data)

    this.requstCastTypeData()
    if (utils.objKey(this.infoObj, 'id')) {
      //修改详情
      this.requstDetailData()
    } else if (utils.objKey(this.infoObj, 'isNewAdd')) {
      //新增
      this.isNewAdd = this.infoObj.isNewAdd
      this.isEdit = true
      this.detailObj = {
        model: this.infoObj.model,
        widgetOpts: this.infoObj.widgetOpts
      }
      this.loading = false
      this.setGuideConfig()
    }
  },
  methods: {
    initData() {},
    /**
     * @description: 页面指引
     */
    setGuideConfig() {
      let guideHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP2', localStorage))
      if (!guideHidden) {
        this.requestTemplateData()

        let _that = this
        this.isShowGuide = true
        // 重写guide配置方法
        let onNext = function () {
          utils.setStore('GUIDE-SAVE-SETP3', '', localStorage)
          // 跳转利率计划
          if (_that.isShowGuide) {
            utils.setStore('GUIDE-SAVE-SETP3', '', localStorage)
          }
          let guideHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP3', localStorage))
          if (!guideHidden) {
            _that.$router.push(`/dashboard/ratePlan`)
          } else {
            _that.$router.go(-1)
          }
          // 上传信息
          // _that.$refs.ChannelInfoWidget.handleSave()
          console.log('引导从当前步骤移动到下一步')
        }
        guide[1].onNext = eval(onNext)

        setTimeout(() => {
          _that.$driver.defineSteps(guide)
          _that.$driver.start()
        }, 300)
      }
    },
    /**
     * @description: 设置组件
     */
    setWidgets(model) {
      let widgetOpts = JSON.parse(JSON.stringify(channelConfig.widgets))
      // channelIdentification
      if (model.channelIdentification.length > 0) {
        widgetOpts.channelIdentification.channelIdentificationWidgets = []
        model.channelIdentification.forEach(() => {
          widgetOpts.channelIdentification.channelIdentificationWidgets.push(widgetOpts.channelIdentification.widgets)
        })
      }
      return widgetOpts
    },
    /**
     * @description: 模板数据
     */
    requestTemplateData() {
      this.requstBaseData({
        url: 'query_templateData_channel_jsons',
        optionParam: {
          method: 'get',
          comm: {
            showMessage: true
          }
        }
      })
    },
    /**
     * @description: 获取渠道类别列表
     */
    requstCastTypeData() {
      this.$api
        .fetch(
          `${api.admin.query_channel_jsons}/channelCastType`,
          {},
          {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.castTypeList = data
        })
        .catch(msg => {
          this.$message.error(msg)
        })
    },
    /**
     * @description: 获取详情
     */
    requstDetailData() {
      let url = `${api.admin.query_channel_jsons}/${this.infoObj.id}`
      this.requstBaseData({
        url: url,
        optionParam: {
          method: 'get',
          comm: {
            paramUrl: true
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
        url: 'query_channel_jsons',
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
            // 跳转利率计划
            if (this.isShowGuide) {
              utils.setStore('GUIDE-SAVE-SETP3', '', localStorage)
            }
            let guideHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP3', localStorage))
            if (!guideHidden) {
              this.$router.push(`/dashboard/ratePlan`)
            } else {
              this.$router.go(-1)
            }
            // this.$router.go(-1)
          } else {
            if (body.url == 'query_templateData_channel_jsons') {
              let date = utils.fomartDate(data.organisationRegistrationDate, '{y}-{m}-{d}')
              data.organisationRegistrationDate = date
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
    /**
     * @description: 点击编辑
     */
    handleEdit() {
      this.isEdit = !this.isEdit
      if (!this.isEdit && utils.objKey(this.infoObj, 'id')) {
        this.requstDetailData()
      }
    },
    /**
     * @description: 保存
     */
    handleHold() {
      this.$refs.ChannelInfoWidget.handleSave()
    },
    handleSave(value) {
      if (this.isNewAdd) {
        // 新增
        let body = {
          loadText: this.$t('loading.add'),
          url: 'query_channel_jsons',
          param: value,
          optionParam: {
            method: 'post',
            comm: {
              showMessage: true
            }
          },
          isHaneld: true
        }
        this.requstBaseData(body)
      } else {
        console.log('修改==>', value)
        // 修改
        let body = {
          loadText: this.$t('loading.change'),
          url: `${api.admin.query_channel_jsons}/${value.id}`,
          param: value,
          optionParam: {
            method: 'put',
            comm: {
              showMessage: true
            }
          },
          isHaneld: true
        }
        this.requstBaseData(body)
      }
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
