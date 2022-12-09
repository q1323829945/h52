<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/channel/components/channelDialog/channelAgreementDialog.vue
 * @Date         : 2022-08-25 16:17:04
 * @LastEditTime : 2022-11-04 09:27:48
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div class="append-dialog">
    <el-dialog :width="'70%'" v-if="dialogObj.show" :visible.sync="dialogObj.show" :close-on-click-modal="false" append-to-body>
      <div slot="title" class="custom-dialog-header">
        <div class="custom-dialog-title">{{ $t(dialogObj.title) }}</div>
      </div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>

      <!-- 协议列表 -->
      <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
        <!-- agreementType -->
        <template slot="agreementType" slot-scope="slotProps">
          <div>{{ setAgreementType(slotProps.data.agreementType) }}</div>
        </template>
        <!-- fromDateTime -->
        <template slot="fromDateTime" slot-scope="slotProps">
          <div>{{ slotProps.data.fromDateTime | utcToBeijing }}</div>
        </template>
        <!-- toDateTime -->
        <template slot="toDateTime" slot-scope="slotProps">
          <div>{{ slotProps.data.toDateTime | utcToBeijing }}</div>
        </template>
        <!-- signedDate -->
        <template slot="signedDate" slot-scope="slotProps">
          <div>{{ slotProps.data.signedDate | utcToBeijing }}</div>
        </template>
        <!-- 操作 -->
        <template slot="operation" slot-scope="slotProps">
          <!-- 佣金协议 -->
          <el-button size="mini" type="text" @click="handLook(slotProps.data)">
            {{ 'Commission Agreement' }}
          </el-button>
        </template>
      </public-table>

      <!-- 新增协议弹窗 -->
      <el-dialog v-if="addDialogVisible" custom-class="append-dialog" :visible.sync="addDialogVisible" append-to-body @close="resetFields">
        <div slot="title" class="custom-dialog-header">
          <div class="custom-dialog-title">{{ 'Add Agreement' }}</div>
        </div>
        <el-form style="margin-top: 10px" :inline="true" ref="addRateForm" :model="addFormData" :rules="addRules">
          <el-form-item
            style="margin-top: 10px"
            v-for="(item, key) in addFormData"
            :key="key"
            :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}（%)` : $t(addFormLabel[key])"
            :prop="`${key}`"
            :label-width="formLabelWidth"
          >
            <!-- 类型 -->
            <div v-if="key == 'agreementType'">
              <el-select style="width: 180px" v-model="addFormData.agreementType" :placeholder="$t('select.place')">
                <el-option v-for="item in agreementTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
              </el-select>
            </div>
            <!-- 利率 -->
            <el-input
              style="width: 182px"
              v-if="key == 'commissionRatio'"
              type="text"
              @input="formatNum(addFormData.commissionRatio, 'addRateForm')"
              v-model="addFormData.commissionRatio"
              :placeholder="'Please input'"
            ></el-input>
            <!-- 日期 -->
            <el-date-picker
              v-if="key == 'date'"
              v-model="addFormData.date"
              type="daterange"
              :range-separator="$t('date.to')"
              :start-placeholder="$t('date.startPlaceholde')"
              :end-placeholder="$t('date.endPlaceholder')"
              @change="hanldDateChange"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="commit('addRateForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </el-dialog>

      <!-- 修改协议弹窗 -->
      <el-dialog v-if="changeDialogVisible" custom-class="append-dialog" :visible.sync="changeDialogVisible" @close="resetFields" append-to-body>
        <div slot="title" class="custom-dialog-header">
          <div class="custom-dialog-title">{{ 'Commission Agreement' }}</div>
        </div>
        <el-form style="margin-top: 10px" :inline="true" ref="changeRateForm" :model="changeFormData" :rules="addRules">
          <el-form-item
            style="margin-top: 10px"
            v-for="(item, key) in changeFormData"
            :key="key"
            :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}（%)` : $t(addFormLabel[key])"
            :prop="`${key}`"
            :label-width="formLabelWidth"
          >
            <!-- 类型 -->
            <div v-if="key == 'agreementType'">
              <el-select style="width: 180px" v-model="changeFormData.agreementType" :placeholder="$t('select.place')" :disabled="true">
                <el-option v-for="item in agreementTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
              </el-select>
            </div>
            <!-- 利率 -->
            <el-input
              style="width: 182px"
              v-if="key == 'commissionRatio'"
              type="text"
              @input="formatNum(changeFormData.commissionRatio, 'addRateForm')"
              v-model="changeFormData.commissionRatio"
              :disabled="true"
            ></el-input>
            <!-- 日期 -->
            <el-date-picker
              v-if="key == 'date'"
              v-model="changeFormData.date"
              type="daterange"
              :range-separator="$t('date.to')"
              :start-placeholder="$t('date.startPlaceholde')"
              :end-placeholder="$t('date.endPlaceholder')"
              :disabled="true"
              @change="hanldDateChange"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="commit('changeRateForm')">{{ $t('button.confirm') }}</el-button>
        </div> -->
      </el-dialog>
    </el-dialog>

    <!-- 翻页 -->
    <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </div>
</template>

<script>
import PublicTable from 'components/publicTable'
import api from '@/server/api'
import utils from '@/utils'
import Pagination from 'components/pagination'
import channelConfig from '@/views/admin/channel/optsConfig/channelConfig'
import { utcToBeijing } from '@/plugin/filters'

export default {
  name: 'channelAgreementDialog',
  components: {
    PublicTable,
    Pagination
  },
  directives: {},
  filters: {},
  mixins: [],
  inheritAttrs: true,
  props: {
    dialogObj: {
      type: Object,
      default() {
        return {
          title: '利率'
        }
      }
    }
  },
  data: () => ({
    loading: true,
    sumTotal: 0,
    currentPage: 0,
    pageSize: 10,
    channelID: '',
    agreementTypeOpts: [],
    tableData: [],
    // table
    tableHead: [
      {
        label: 'Channel ID',
        value: 'channelId'
      },
      {
        label: 'Agreement Type',
        type: 'slot',
        slotName: 'agreementType'
      },
      {
        label: 'From Date',
        type: 'slot',
        slotName: 'fromDateTime'
      },
      {
        label: 'To Date',
        type: 'slot',
        slotName: 'toDateTime'
      },
      {
        label: 'Signed Date',
        type: 'slot',
        slotName: 'signedDate'
      },
      {
        label: 'users.operation',
        type: 'slot',
        slotName: 'operation',
        width: '180px',
        fixed: 'right'
      }
    ],
    // 新增表单验证
    addDialogVisible: false,
    addFormLabel: {
      agreementType: 'Agreement Type',
      commissionMethodType: 'Method Type',
      commissionRatio: 'Commission Ratio',
      date: 'Date'
    },
    addFormData: {
      commissionMethodType: '',
      agreementType: '',
      commissionRatio: '',
      channelId: '',
      date: []
    },
    // 修改表单验证
    changeDialogVisible: false,
    changeFormData: {
      agreementType: '',
      commissionRatio: '',
      channelId: '',
      date: []
    },
    formLabelWidth: '175px'
  }),
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        commissionRatio: [{ required: true, message: 'Commission ratio can not be empty', trigger: 'change' }],
        agreementType: [{ required: true, message: 'Agreement type can not be empty', trigger: 'change' }]
      }
      return addRules
    },
    setAgreementType() {
      return value => {
        let label = '--'
        let opts = channelConfig.agreementTypeOpts
        for (let index = 0; index < opts.length; index++) {
          let element = opts[index]
          if (value == element.value) {
            label = element.label
            break
          }
        }
        return label

        // const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 120
        // if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
        //   return `${width}px`
        // } else {
        //   return `${width + 20}px`
        // }
      }
    }
  },
  watch: {
    dialogObj: {
      handler(newVal) {
        this.channelID = newVal.id
        this.addFormData.channelId = newVal.id
        this.changeFormData.channelId = newVal.id
        if (newVal.show) {
          this.requstRateData()
        }
      },
      deep: true
    }
  },
  created() {
    this.agreementTypeOpts = channelConfig.agreementTypeOpts
  },
  mounted() {},
  methods: {
    /**
     * @description: 输入限制
     * @param {*} val
     * @param {*} formName
     */
    formatNum(val, formName) {
      // let temp = val.toString()
      // temp = temp.replace(/^0{1,}/g, '') // 第一位不能为0
      // temp = temp.replace(/。/g, '.')
      // temp = temp.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
      // temp = temp.replace(/^\./g, '') //验证第一个字符是数字
      // temp = temp.replace(/\.{2,}/g, '') //只保留第一个, 清除多余的
      // temp = temp.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      // temp = temp.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
      let temp = utils.formatInputNumber(val)
      if (formName == 'addRateForm') {
        this.addFormData.commissionRatio = temp
      } else {
        this.changeFormData.commissionRatio = temp
      }
      this.$forceUpdate()
    },
    /**
     * @description: 修改利率
     * @param {*} data 利率
     */
    handLook(data) {
      this.loading = true
      this.$api
        .fetch(
          `${api.admin.query_channel_jsons}/agreement/commission/${data.id}`,
          {
            page: this.currentPage,
            size: this.pageSize
          },
          {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        )
        .then(res => {
          this.loading = false
          this.changeDialogVisible = true
          const data = JSON.parse(JSON.stringify(res.data))
          this.changeFormData.agreementType = data.agreementType
          this.changeFormData.commissionRatio = utils.amountmoney(data.commissionRatio)
          this.changeFormData.date = [utcToBeijing(data.fromDateTime), utcToBeijing(data.toDateTime)]
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 删除利率
     * @param {*} data 利率
     */
    handDelete(data) {
      data.isDeleteVisible = false
      this.requstHandleRateData(
        this.$t('loading.delete'),
        `${api.admin.query_interestRate_jsons}/${data.id}/${this.channelID}`,
        this.changeFormData,
        {
          method: 'delete'
        }
      )
    },
    resetFields() {
      this.addDialogVisible = false
      this.changeDialogVisible = false
      this.addFormData.agreementType = ''
      this.addFormData.commissionRatio = ''
      this.addFormData.date = []
      this.changeFormData = { agreementType: '', commissionRatio: '', channelId: '', date: [] }
    },
    /**
     * @description: 获取渠道协议列表
     */
    requstRateData() {
      this.$api
        .fetch(
          `${api.admin.query_channel_jsons}/agreement/${this.channelID}`,
          {
            page: this.currentPage,
            size: this.pageSize
          },
          {
            method: 'get',
            comm: {
              paramUrl: true,
              showMessage: true
            }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(item => {
            item.isDeleteVisible = false
          })
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 利率，增改
     * @param {*} loadingText load文字
     * @param {*} url url
     * @param {*} param param
     * @param {*} optionParam optionParam
     */
    requstHandleRateData(loadingText, url, param, optionParam = {}) {
      const loading = this.$loading({
        lock: true,
        text: loadingText,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .fetch(url, param, optionParam)
        .then(() => {
          if (loading) {
            loading.close()
          }
          this.resetFields()
          this.requstRateData()
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.resetFields()
          this.$message.error(msg)
        })
    },
    setParamFloat(obj) {
      for (const key in obj) {
        if (key == 'commissionRatio') {
          obj[key] = parseFloat(obj[key])
        }
      }
    },
    /**
     * @description: click date picker
     */
    hanldDateChange() {
      let dateParam = {
        fromDateTime: utils.fomartDate(this.addFormData.date[0], '{y}-{m}-{d}'),
        toDateTime: utils.fomartDate(this.addFormData.date[1], '{y}-{m}-{d}')
      }
      this.addFormData = { ...this.addFormData, ...dateParam }
    },
    /**
     * @description:提交添加/修改的利率
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == 'changeRateForm') {
            this.changeDialogVisible = false
            this.setParamFloat(this.changeFormData)
            // 修改
            this.requstHandleRateData(
              this.$t('loading.change'),
              `${api.admin.query_interestRate_jsons}/${this.changeFormData.id}`,
              this.changeFormData,
              {
                method: 'put'
              }
            )
          } else {
            // 新增
            this.addDialogVisible = false
            let param = JSON.parse(JSON.stringify(this.addFormData))
            delete param.date
            this.setParamFloat(this.addFormData)

            this.requstHandleRateData(this.$t('loading.add'), `${api.admin.query_channel_jsons}/agreement/commission`, param, {
              method: 'post',
              comm: {
                paramUrl: true,
                showMessage: true
              }
            })
          }
        } else {
          return false
        }
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstRateData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstRateData()
    }
  }
}
</script>

<style lang="less">
.custom-dialog-header {
  background: #fff;
  min-height: 28px;
  line-height: 28px;
  border-bottom: 1px solid #e4e7ed;
  background: #368ee0;
  padding: 2px 20px;
}
.custom-dialog-header .custom-dialog-title {
  color: #fff;
  font-size: 13px;
  line-height: 24px;
}
.el-dialog {
  display: flex;
  z-index: 3200;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 200px);
  max-width: calc(100% - 30px);
  background: white;
}

.el-dialog__header {
  padding: 5px 0px 0px 0px;
  background: #368ee0;

  .el-dialog__headerbtn {
    top: 10px;
  }
  .el-dialog__close {
    color: #ffffff;
  }
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 10px 20px 20px 20px;
}
</style>

<style lang="less" scoped>
.el-popover {
  padding-bottom: 0px;
}
/deep/ .el-dialog.append-dialog {
  max-width: 800px;
  max-height: 330px;
  min-width: 800px;
  min-height: 330px;
  background: white;
}
</style>

<style scoped>
.append-dialog >>> .el-cascader,
.el-date-picker {
  width: 100% !important;
}

.append-dialog >>> .el-select,
.el-input {
  width: 100%;
}
.append-dialog >>> .el-form-item {
  margin: 0px 30px 16px 0px;
  min-width: 200px;
  /* display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center; */
  background: blue;
}
.append-dialog >>> .el-form-item .el-form-item__label {
  float: left;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-width: 50px;
  width: 110px;
  word-break: break-word;
  font-size: 13px;
  height: 34px;
  justify-content: flex-end;
  align-items: center;
  background: gold;
}
.append-dialog >>> .el-form-item .el-form-item__content {
  margin-left: 0;
  min-width: 80px;
  flex: 1;
}
.append-dialog >>> .el-range-separator {
  padding: 0;
  width: 15px;
}

.append-dialog >>> .el-divider {
  margin: 0;
}
.append-dialog >>> .toolbar-section .el-form-item {
  margin-bottom: 0;
}
</style>
