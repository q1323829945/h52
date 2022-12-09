<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/ratePlan/components/rateDialog.vue
 * @Date         : 2022-03-10 10:33:20
 * @LastEditTime : 2022-11-10 10:12:14
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div>
    <el-dialog
      :width="'70%'"
      v-if="rateDialogObj.show"
      :visible.sync="rateDialogObj.show"
      :close-on-click-modal="false"
      append-to-body
      @close="handleDialog"
    >
      <div slot="title" class="custom-dialog-header">
        <div class="custom-dialog-title">{{ $t(rateDialogObj.title) }}</div>
      </div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>
      <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
        <!-- 期限 -->
        <template slot="period" slot-scope="slotProps">
          <div>{{ slotProps.data.period | transformLoanTerm }}</div>
        </template>
        <!-- 利率 -->
        <template slot="rate" slot-scope="slotProps">
          <div>{{ slotProps.data.rate | fomartTwoDecimalPlaces }}</div>
        </template>
        <!-- 操作 -->
        <template slot="handle" slot-scope="slotProps">
          <!-- 修改 -->
          <el-button size="mini" style="margin-right: 20px" type="text" @click="handChange(slotProps.data)">{{ $t('button.change') }}</el-button>
          <!-- 删除提醒气泡 -->
          <el-popconfirm
            hide-icon
            :title="$t('ratePlan.deleteTips')"
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            @cancel="slotProps.data.isDeleteVisible = false"
            @confirm="handDelete(slotProps.data)"
          >
            <el-button slot="reference" type="text">
              {{ $t('button.delete') }}
            </el-button>
          </el-popconfirm>
        </template>
      </public-table>

      <!-- 新增利率弹窗 -->
      <el-dialog v-if="addDialogVisible" custom-class="append-dialog" :visible.sync="addDialogVisible" append-to-body @close="resetFields">
        <div slot="title" class="custom-dialog-header">
          <div class="custom-dialog-title">{{ $t('ratePlan.add') }}</div>
        </div>
        <el-form ref="addRateForm" :model="addFormData" :rules="addRules">
          <div style="margin-top: 30px" v-for="(item, key) in addFormData" :key="key">
            <el-form-item
              :label="key == 'rate' ? `${$t(addFormLabel[key])}（%)` : $t(addFormLabel[key])"
              :prop="`${key}`"
              :label-width="formLabelWidth"
            >
              <!-- 期限 -->
              <div v-if="key == 'period'">
                <el-select style="width: 180px" v-model="addFormData.period" :placeholder="$t('select.place')">
                  <el-option v-for="item in ratePlanTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
              </div>
              <!-- 利率 -->
              <el-input
                style="width: 182px"
                v-if="key == 'rate'"
                type="text"
                @input="formatNum(addFormData.rate, 'addRateForm')"
                v-model="addFormData.rate"
                :placeholder="'Please input'"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="commit('addRateForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </el-dialog>

      <!-- 修改利率弹窗 -->
      <el-dialog v-if="changeDialogVisible" custom-class="append-dialog" :visible.sync="changeDialogVisible" @close="resetFields" append-to-body>
        <div slot="title" class="custom-dialog-header">
          <div class="custom-dialog-title">{{ $t('ratePlan.change') }}</div>
        </div>
        <el-form ref="changeRateForm" :model="changeFormData" :rules="addRules">
          <div style="margin-top: 30px" v-for="(item, key) in changeFormData" :key="key">
            <el-form-item
              :label="key == 'rate' ? `${$t(addFormLabel[key])}（%)` : $t(addFormLabel[key])"
              :prop="`${key}`"
              :label-width="formLabelWidth"
            >
              <!-- 期限 -->
              <div v-if="key == 'period'">
                <el-select style="width: 180px" v-model="changeFormData.period" :placeholder="$t('select.place')">
                  <el-option v-for="item in ratePlanTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
              </div>
              <!-- 利率 -->
              <el-input
                style="width: 182px"
                v-if="key == 'rate'"
                type="text"
                @input="formatNum(changeFormData.rate, 'changeRateForm')"
                v-model="changeFormData.rate"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="commit('changeRateForm')">{{ $t('button.confirm') }}</el-button>
        </div>
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

export default {
  name: 'rateDialog',
  components: {
    PublicTable,
    Pagination
  },
  directives: {},
  filters: {},
  mixins: [],
  inheritAttrs: true,
  props: {
    rateDialogObj: {
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
    ratePlanID: '',
    ratePlanTypeOpts: [],
    tableData: [],
    // table
    tableHead: [
      {
        label: 'ratePlan.period',
        type: 'slot',
        slotName: 'period',
        width: '300px'
      },
      {
        label: 'ratePlan.rate',
        type: 'slot',
        slotName: 'rate',
        width: '300px'
      },
      {
        label: 'role.operation',
        type: 'slot',
        slotName: 'handle',
        fixed: 'right'
      }
    ],
    // 新增表单验证
    addDialogVisible: false,
    addFormLabel: { period: 'ratePlan.period', rate: 'ratePlan.rate' },
    addFormData: {
      period: '',
      rate: '',
      ratePlanId: ''
    },
    // 修改表单验证
    changeDialogVisible: false,
    changeFormData: {
      period: '',
      rate: '',
      id: '',
      ratePlanId: ''
    },
    formLabelWidth: '90px'
  }),
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        period: [{ required: true, message: `${this.$t('ratePlan.periodRule')}`, trigger: 'blur' }],
        rate: [{ required: true, message: `${this.$t('ratePlan.rateRule')}`, trigger: 'blur' }]
      }
      return addRules
    }
  },
  watch: {
    rateDialogObj: {
      handler(newVal) {
        this.ratePlanID = newVal.id
        this.addFormData.ratePlanId = newVal.id
        this.changeFormData.ratePlanId = newVal.id
        if (newVal.show) {
          this.requstRateData()
        }
      },
      deep: true
    }
  },
  created() {
    this.ratePlanTypeOpts = utils.loan.productTimeOpts
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
        this.addFormData.rate = temp
      } else {
        this.changeFormData.rate = temp
      }
      this.$forceUpdate()
    },
    /**
     * @description: 修改利率
     * @param {*} data 利率
     */
    handChange(data) {
      this.changeDialogVisible = true
      this.changeFormData.id = data.id
      this.changeFormData.period = data.period
      this.changeFormData.rate = utils.amountmoney(data.rate)
      this.changeFormData.ratePlanId = data.ratePlanId
    },
    /**
     * @description: 删除利率
     * @param {*} data 利率
     */
    handDelete(data) {
      data.isDeleteVisible = false
      this.requstHandleRateData(
        this.$t('loading.delete'),
        `${api.admin.query_interestRate_jsons}/${data.id}/${this.ratePlanID}`,
        this.changeFormData,
        {
          method: 'delete'
        }
      )
    },
    resetFields() {
      this.addDialogVisible = false
      this.changeDialogVisible = false
      this.addFormData.period = ''
      this.addFormData.rate = ''
      this.changeFormData = { period: '', rate: '', id: '' }
    },
    /**
     * @description: 获取所有利率
     */
    requstRateData() {
      this.$api
        .fetch(
          'query_interestRate_jsons',
          {
            ratePlanId: this.ratePlanID,
            page: this.currentPage,
            size: this.pageSize
          },
          {
            method: 'get'
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
        if (key == 'rate') {
          obj[key] = parseFloat(obj[key])
        }
      }
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
            this.setParamFloat(this.addFormData)
            this.requstHandleRateData(this.$t('loading.add'), 'query_interestRate_jsons', this.addFormData)
          }
        } else {
          return false
        }
      })
    },
    handleDialog() {
      this.$emit('handle-dialog')
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
  max-width: 320px;
  max-height: 250px;
  min-width: 320px;
  min-height: 250px;
  background: white;
}
</style>

<style lang="less">
.el-popconfirm__main {
  justify-content: center;
}
.el-popconfirm__action {
  // 交换 确定 和 取消 按钮的位置
  .el-button:nth-child(1) {
    float: right;
    width: 60px;
    height: 32px;
    background: #999999;
    border-radius: 4px;
    font-size: 11px;
    color: #ffffff;
  }
  .el-button:nth-child(2) {
    float: left;
    padding: 10px 8px;
    height: 32px;
    background: #409eff;
    border-radius: 4px;
    font-size: 11px;
    color: #ffffff;
  }
}
</style>
