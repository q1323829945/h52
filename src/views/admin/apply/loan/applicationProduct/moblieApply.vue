<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/apply/loan/applicationProduct/moblieApply.vue
 * @Date         : 2022-08-29 17:21:47
 * @LastEditTime : 2022-12-02 17:12:13
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <div v-if="eventObj.isEvent" class="event-header">
      <!-- 事件下一步 -->
      <div v-if="eventObj.status == 'PROCESSING'" :class="isShowNext ? 'button' : 'button button-margin'">
        <el-button type="primary" @click="commmit('nextForm')">{{ 'Next' }}</el-button>
      </div>

      <!-- 四件form -->
      <div :class="isShowBreadcrumb == '1' ? 'jsd-edit-header' : 'jsd-edit-header jsd-edit-header-top'">
        <el-form style="margin: 10px 0px; width: 800px; height: 40px" ref="nextForm" :model="nextFormData" :rules="nextFormRules" :inline="true">
          <el-form-item
            style="margin-right: 30px"
            v-for="(item, key) in nextFormData"
            :key="key"
            :label="$t(nextFormLabel[key])"
            :prop="`.${key}`"
            :label-width="'110px'"
          >
            <!-- status -->
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

    <!-- 组件 -->
    <div v-if="!loading" :style="{ paddingTop: eventObj.isEvent ? '50px' : '0px' }">
      <Moblie-Apply-Widgets
        v-if="!loading"
        ref="MoblieApplyWidgets"
        :eventObj="{ isEvent: eventObj.isEvent, eventType: eventObj.eventType, status: eventObj.status }"
        :isShowEdit="!isQuery"
        :isEdit="isEdit"
        :widgetOpts="detailObj.widgetOpts"
        :model="detailObj.model"
        @handleEdit="handleEdit"
        @handleSave="handleHold"
      />
    </div>
  </app-main>
</template>

<script>
import api from '@/server/api'
import utils from '@/utils'
import MoblieApplyWidgets from '../components/moblieApplyWidgets/index.vue'
import config from '../optsConfig/moblieApplyConfig'
import workFlowConfig from '@/views/admin/workflowConfig/optsConfig/workFlowConfig'

export default {
  components: { MoblieApplyWidgets },
  data() {
    return {
      isShowNext: false,
      isQuery: false,
      isShowBreadcrumb: utils.getStore('SHOW-BREADCRUMB', sessionStorage) || '0',
      editStatus: '',
      productId: '',
      productName: '',
      isEdit: false,
      loading: true,
      datas: [],
      productList: [],
      nextFormLabel: {
        status: 'Event Status',
        user: 'Next Handler'
      },
      nextFormData: {
        status: 'PASSED',
        user: ''
      },
      detailObj: { model: {} }, //贷款详情流程进入
      eventObj: {
        eventId: '',
        eventType: '',
        isEvent: false,
        status: '',
        eventStatus: [],
        users: [],
        nextPosition: null
      } // 事件流程进入
    }
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    if (to.name != 'loanQuery' && to.name != 'loanApplySupplement-index' && to.name != 'eventHandling-index' && to.name != 'eventQuery-index') {
      utils.removeStore('currentPageIndex')
    }
    utils.removeStore('ROUTRT-META')

    next()
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
  created() {
    // 添加这一行 可以保证组件不被keep-alive进行缓存
    this.$destroy()
    this.detailObj = this.setObject(this.$route.query.data)
    this.isQuery = utils.objKey(this.detailObj, 'isQuery') ? this.detailObj.isQuery : false
    this.eventObj.isEvent = utils.objKey(this.detailObj, 'isEvent') ? this.detailObj.isEvent : false
    this.eventObj.eventType = utils.objKey(this.detailObj, 'isEvent') ? this.detailObj.eventType : ''
    this.eventObj.eventStatus = workFlowConfig.eventStatusOpts
    if (utils.objKey(this.detailObj, 'applicationId')) {
      this.editStatus = this.detailObj.status
      this.productId = this.detailObj.applicationId
      this.requstDetailData()
    }

    if (utils.objKey(this.detailObj, 'eventId')) {
      this.eventObj.eventId = this.detailObj.eventId
      this.requestEventData()
    }
  },
  methods: {
    /**
     * @description: 设置组件
     */
    setWidgets() {
      let widgetOpts = JSON.parse(JSON.stringify(config.widgetsOpts))
      // 追加产品类型widget
      var objArr = []
      for (let i in widgetOpts) {
        let o = {}
        o[i] = widgetOpts[i] //即添加了key值也赋了value值 o[i] 相当于o.name 此时i为变量
        objArr.push(o)
      }
      objArr.splice(0, 0, {
        productName: {
          title: 'Product',
          section: 'productName',
          span: 8,
          widgets: [
            {
              type: 'select',
              key: 'productName',
              label: 'Product Name',
              list: this.productList,
              placeholder: 'Product Name',
              rules: {
                required: true,
                message: 'Select Product'
              }
            }
          ]
        }
      })
      // 数组转对象
      var result = {}
      objArr.forEach(item => {
        result[Object.keys(item)[0]] = Object.values(item)[0]
      })
      widgetOpts = result
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
          console.log('requestUsersPositionData==>', data)
        })
        .catch(() => {})
    },
    /**
     * @description: 获取所有贷款产品
     */
    requestProductData() {
      this.$api
        .fetch(
          `${api.admin.query_product_json}/paged`,
          {},
          {
            method: 'get',
            comm: { paramUrl: true, showMessage: true }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.productList = []
          if (data.length > 0) {
            data.forEach(element => {
              if (element.productType != 'CARLOAN') {
                let obj = { label: element.name, value: element.id }
                this.productList.push(obj)
              }
            })
          }
          // 设置组件
          this.detailObj.widgetOpts = this.setWidgets(this.detailObj.model)
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 获取详情
     */
    requstDetailData() {
      let url = `${api.admin.query_loan_json}/agent/${this.productId}`
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
          const data = JSON.parse(JSON.stringify(res.data))
          data.editStatus = this.editStatus
          if (body.isHaneld) {
            this.loading = false
            loading.close()
            this.$router.go(-1)
          } else {
            if (data.agent.gps) {
              data.agent.gps.coord = `${data.agent.gps.latitude}，${data.agent.gps.longitude}`
            }
            if (data.loanInformation) {
              data.loanInformation.amount = utils.amountFilter(data.loanInformation.amount)
            }
            if (data.personalInformation) {
              let birthDay = utils.fomartDate(data.personalInformation.birthDay, '{y}-{m}-{d}')
              data.personalInformation.birthDay = birthDay == '--' ? '' : birthDay
            }

            this.detailObj.model = data
            // this.detailObj.model.productName = this.productName
            this.requestProductData()
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
      this.$refs.MoblieApplyWidgets.$refs.moblieApplyFormData.clearValidate()
      if (!this.isEdit && this.productId != '') {
        this.loading = true
        this.requstDetailData()
      }
    },
    /**
     * @description: 保存
     */
    handleHold() {
      console.log('this.detailObj.model.productName==>', this.detailObj.model.productName)
      if (!this.eventObj.isEvent) {
        let body = {
          isHaneld: true,
          loadText: this.$t('loading.change'),
          url: `${api.admin.query_loan_json}/product/set`,
          param: { applicationId: this.productId, productId: this.detailObj.model.productName },
          optionParam: {
            method: 'put',
            comm: {
              showMessage: true
            }
          }
        }
        this.requstBaseData(body)
      }
    },
    /**
     * @description:提交添加的活动
     */
    commmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.eventObj.eventType == 'RECOMMEND_PRODUCT' && !this.detailObj.model.productName) {
            this.$message.error('Please select product')
            return
          }
          let data =
            this.eventObj.eventType == 'RECOMMEND_PRODUCT'
              ? { applicationId: this.detailObj.applicationId, productId: this.detailObj.model.productName }
              : {}
          let param = { applicationId: this.detailObj.applicationId, data: data, ...this.nextFormData }
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
