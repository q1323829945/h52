<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/apply/loan/applicationProduct/carProduct.vue
 * @Date         : 2022-12-01 13:17:47
 * @LastEditTime : 2022-12-02 09:52:34
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 事件处理 -->
    <div v-if="eventObj.isEvent" class="event-header">
      <!-- 事件下一步 -->
      <div v-if="eventObj.status == 'PROCESSING'" :class="isShowNext ? 'button' : 'button button-margin'">
        <el-button v-if="!editHidden" type="primary" @click="handleEdit">
          {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
        </el-button>
        <el-button v-if="isEdit" type="primary" @click="isEdit = false">{{ `${$t('button.save')}` }}</el-button>
        <el-button type="primary" @click="commmit('nextForm')">{{ 'Next' }}</el-button>
      </div>

      <!-- 事件下一步form -->
      <div :class="isShowBreadcrumb == '1' ? 'jsd-edit-header' : 'jsd-edit-header jsd-edit-header-top'">
        <el-form style="margin: 10px 0px; width: 800px; height: 40px" ref="nextForm" :model="nextFormData" :rules="nextFormRules" :inline="true">
          <el-form-item
            style="margin-right: 30px"
            v-for="(item, key) in nextFormData"
            :key="key"
            :label="$t(nextFormLabel[key])"
            :prop="`${key}`"
            :label-width="'110px'"
          >
            <!-- 状态 -->
            <el-select
              v-if="key == 'status'"
              v-model="nextFormData[key]"
              :placeholder="$t('select.place')"
              :disabled="eventObj.status == 'PROCESSING' ? false : true"
              clearable
            >
              <el-option v-for="item in eventObj.eventStatus" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
            <!-- 下一步处理人 -->
            <el-select
              v-if="isShowNext && key == 'user'"
              v-model="nextFormData[key]"
              :placeholder="$t('select.place')"
              :disabled="eventObj.status == 'PROCESSING' ? false : true"
              clearable
            >
              <el-option v-for="item in eventObj.users" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="line"></div>
    </div>
    <div v-if="loading" class="jsd-loading-view" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.0)"></div>

    <!-- <Car-Product -->
    <div
      v-if="!loading"
      :style="{ paddingTop: eventObj.isEvent ? '60px' : '0px' }"
      :class="!this.isQuery ? 'jsd-edit-detail-view' : 'temp-base-view'"
    >
      <Car-Product-Widgets
        v-if="!loading && detailObj.widgetOpts"
        ref="CarProductWidgets"
        :isEdit="isEdit"
        :widgetOpts="detailObj.widgetOpts"
        :model="detailObj.model"
      />
      <el-result v-else icon="info" style="margin-top: 80px" title="Tips" subTitle="Page data error">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="handleBack">Back</el-button>
        </template>
      </el-result>
    </div>
  </app-main>
</template>

<script>
import api from '@/server/api'
import utils from '@/utils'
import CarProductWidgets from '../components/carProductWidgets/index.vue'
import config from '../optsConfig/carProductConfig'
import workFlowConfig from '@/views/admin/workflowConfig/optsConfig/workFlowConfig'

export default {
  components: { CarProductWidgets },
  data() {
    return {
      isShowNext: false,
      isQuery: false,
      isShowBreadcrumb: utils.getStore('SHOW-BREADCRUMB', sessionStorage) || '0',
      editStatus: '',
      productId: '',
      productType: '',
      isEdit: false,
      editHidden: true,
      loading: true,
      datas: [],
      detailObj: { model: {} },
      // 事件下一步
      nextFormLabel: {
        status: 'Event Status',
        user: 'Next Handler'
      },
      nextFormData: {
        status: 'PASSED',
        user: ''
      },
      //事件流程进入
      eventObj: {
        eventId: '',
        eventType: '',
        isEvent: false,
        status: '',
        eventStatus: [],
        users: [],
        nextPosition: null
      }
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    nextFormRules() {
      const addRules = {
        status: [{ required: true, message: 'Status can not be empty', trigger: 'change' }]
      }
      return addRules
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != 'loanQuery' && to.name != 'loanApplySupplement-index' && to.name != 'eventHandling-index' && to.name != 'eventQuery-index') {
      utils.removeStore('currentPageIndex')
    }
    utils.removeStore('ROUTRT-META')
    next()
  },
  created() {
    // 添加这一行 可以保证组件不被keep-alive进行缓存
    this.$destroy()
    this.initData()
  },
  methods: {
    initData() {
      // 老版本申请流程
      this.detailObj = this.setObject(this.$route.query.data)
      this.isQuery = utils.objKey(this.detailObj, 'isQuery') ? this.detailObj.isQuery : false
      if (utils.objKey(this.detailObj, 'applicationId')) {
        this.editStatus = this.detailObj.status
        this.productId = this.detailObj.applicationId
        this.productType = this.detailObj.productType
        this.requstDetailData()
      }
      // 事件流程
      this.eventObj.isEvent = utils.objKey(this.detailObj, 'isEvent') ? this.detailObj.isEvent : false
      this.eventObj.eventType = utils.objKey(this.detailObj, 'isEvent') ? this.detailObj.eventType : ''
      this.eventObj.eventStatus = workFlowConfig.eventStatusOpts
      this.editHidden = this.eventObj.eventType == 'COLLECT_INFORMATION' ? false : true
      if (utils.objKey(this.detailObj, 'eventId')) {
        this.eventObj.eventId = this.detailObj.eventId
        this.requestEventData()
      }
    },
    /**
     * @description: 设置组件
     */
    setWidgets(model) {
      console.log('model==>', model)
      let widgetOpts = JSON.parse(JSON.stringify(config.widgetsOpts))
      //characterReferences
      if (model.characterReferences && model.characterReferences.length > 0) {
        widgetOpts.characterReferences.characterReferencesWidgets = []
        model.characterReferences.forEach(() => {
          widgetOpts.characterReferences.characterReferencesWidgets.push(widgetOpts.characterReferences.widgets)
        })
      }

      //financialInformation
      if (model.financialInformation) {
        let widgets = []
        // sourceOfFunds
        if (model.financialInformation.sourceOfFunds != 'Others') {
          widgets.push(widgetOpts.financialInformation.widgets[1])
        } else {
          widgets.push(widgetOpts.financialInformation.widgets[0])
        }

        // existingBDONetworkBankAccount
        if (model.financialInformation.existingBDONetworkBankAccount != 'Others') {
          widgets.push(widgetOpts.financialInformation.widgets[3])
        } else {
          widgets.push(widgetOpts.financialInformation.widgets[2])
        }

        // existingBDOAccount
        if (model.financialInformation.existingBDOAccount != 'Others') {
          widgets.push(widgetOpts.financialInformation.widgets[5])
        } else {
          widgets.push(widgetOpts.financialInformation.widgets[4])
        }

        // otherBankAccount
        if (model.financialInformation.otherBankAccount != 'Others') {
          widgets.push(widgetOpts.financialInformation.widgets[7])
        } else {
          widgets.push(widgetOpts.financialInformation.widgets[6])
        }
        widgetOpts.financialInformation.widgets = widgets

        // sourceOfIncome
        let sourceOfIncome = model.financialInformation.revenueDetails.sourceOfIncome
        if (sourceOfIncome != null && sourceOfIncome.length > 0) {
          widgetOpts.financialInformation.revenueDetails.sourceOfIncome.widgets = []
          sourceOfIncome.forEach(() => {
            widgetOpts.financialInformation.revenueDetails.sourceOfIncome.widgets.push(widgetOpts.financialInformation.revenueDetails.widgets)
          })
        }
      }
      return widgetOpts
    },
    /**
     * @description: 获取事件信息
     */
    requestEventData() {
      this.$api
        .fetch(
          `${api.admin.query_event_handle_jsons}/${this.eventObj.eventId}`,
          {},
          {
            method: 'get',
            comm: { paramUrl: true }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.nextFormData.status = data.status == 'PROCESSING' ? 'PASSED' : data.status
          this.eventObj.status = data.status
          this.nextFormData.user = data.user || ''
          this.nextFormLabel.user = this.eventObj.status == 'PROCESSING' ? (data.next == null ? 'Next Handler' : '') : 'Next Handler'
          this.isShowNext = this.eventObj.status == 'PROCESSING' ? (data.next == null ? true : false) : true
          console.log('requestEventData==>', data)
          if (data.nextPosition) {
            this.requestUsersPositionData(data.nextPosition)
          }
        })
        .catch(() => {})
    },
    // 获取下一操作者岗位
    requestUsersPositionData(nextPosition) {
      this.$api
        .fetch(
          `${api.admin.query_users_position_jsons}/${nextPosition}`,
          {},
          {
            method: 'get',
            comm: { paramUrl: true }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.eventObj.users = []
          data.forEach(element => {
            this.eventObj.users.push({ value: element.username, label: element.username })
          })
        })
        .catch(() => {})
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
            if (data.loanInformation.purpose == null) {
              data.loanInformation.purpose = []
            }
            if (data.personalInformation) {
              let birthDay = utils.fomartDate(data.personalInformation.birthDay, '{y}-{m}-{d}')
              data.personalInformation.birthDay = birthDay == '--' ? '' : birthDay
            }
            this.detailObj = { model: data, widgetOpts: this.setWidgets(data) }
          }
        })
        .catch(msg => {
          this.loading = false
          if (body.isHaneld) {
            loading.close()
          } else {
            if (!body.optionParam.comm.showMessage) {
              this.$message.error(msg)
            }
          }
        })
    },
    handleEdit() {
      this.isEdit = !this.isEdit
      this.$refs.CarProductWidgets.$refs.teacherProductFormData.clearValidate()
      if (!this.isEdit && this.productId != '') {
        this.loading = true
        this.requstDetailData()
      }
    },
    /**
     * @description: 保存
     */
    handleHold() {
      let model = this.$refs.CarProductWidgets.financialInformationModel
      //sourceOfFunds
      if (
        this.detailObj.model.financialInformation.sourceOfFunds != 'Business' ||
        this.detailObj.model.financialInformation.sourceOfFunds != 'Pension'
      ) {
        this.detailObj.model.financialInformation.sourceOfFunds = model.sourceOfFunds
      }
      //existingBDONetworkBankAccount
      if (
        this.detailObj.model.financialInformation.existingBDONetworkBankAccount != 'Current Account' ||
        this.detailObj.model.financialInformation.existingBDONetworkBankAccount != 'Savings Account'
      ) {
        this.detailObj.model.existingBDONetworkBankAccount = model.existingBDONetworkBankAccount
      }
      //existingBDOAccount
      if (
        this.detailObj.model.financialInformation.existingBDOAccount != 'Current Account' ||
        this.detailObj.model.financialInformation.existingBDOAccount != 'Savings Account'
      ) {
        this.detailObj.model.existingBDOAccount = model.existingBDOAccount
      }
      //otherBankAccount
      if (
        this.detailObj.model.financialInformation.otherBankAccount != 'Current Account' ||
        this.detailObj.model.financialInformation.otherBankAccount != 'Savings Account'
      ) {
        this.detailObj.model.otherBankAccount = model.otherBankAccount
      }

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
    /**
     * @description:提交添加的活动
     */
    commmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('ppppp==>', this.nextFormData)
          // this.eventObj.eventType = 'CUSTOMER_ARCHIVE'
          console.log('eventtype==>', this.eventObj.eventType)
          console.log('applicationId==>', this.productId)
          console.log('this.detailObj.model.productName==>', this.detailObj.model)
          let data = {}
          switch (this.eventObj.eventType) {
            case 'ASSETS_ARCHIVE':
            case 'CUSTOMER_ARCHIVE':
              {
                data = {}
              }
              break
            case 'PRE_APPROVAL':
              {
                data = { applicationId: this.productId }
              }
              break
            default:
              {
                data = { productType: this.productType, data: this.detailObj.model }
              }
              break
          }
          let param = { applicationId: this.productId, data: data, ...this.nextFormData }
          console.log('param==>', param)
          let body = {
            loadText: this.$t('loading.change'),
            url: `${api.admin.query_event_handle_jsons}/${this.eventObj.eventId}`,
            param: param,
            optionParam: {
              method: 'put',
              comm: {
                showMessage: true
              }
            },
            isHaneld: true
          }
          this.requstBaseData(body)
        } else {
          return false
        }
      })
    },
    handleBack() {
      this.$router.go(-1)
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
.event-header {
  margin: 20px 0px 0px 0px;
  .button {
    position: fixed;
    z-index: 101;
    margin: 5px 0px 0px 660px;
  }
  .button-margin {
    margin: 5px 0px 0px 330px;
  }
  .line {
    position: fixed;
    z-index: 101;
    margin: 65px 0px 0px 0px;
    background-color: #dcdfe6;
    width: 81.5%;
    height: 1px;
  }
}
.temp-base-view {
  margin-top: -20px;
}
</style>
