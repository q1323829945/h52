<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/ratePlan/ratePlan.vue
 * @Date         : 2022-03-10 09:24:46
 * @LastEditTime : 2022-11-14 13:05:06
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 搜索 -->
    <search-bar ref="mySearchBar" :optionList="[]" :isAdd="true" :is-export="false" :is-import="false" @handle-push="handleAdd"></search-bar>

    <!-- 引导弹窗占位 -->
    <div class="guide-step3" id="guide-step3"></div>

    <!-- 列表 -->
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
      <template slot="typeName" slot-scope="slotProps">
        <div>{{ $t(slotProps.data.typeName) }}</div>
      </template>
      <template slot="handle" slot-scope="slotProps">
        <!-- <el-button style="margin-right: 20px" size="mini" type="text" @click="handChange(slotProps.data)">{{ $t('button.modification') }}</el-button> -->
        <el-button size="mini" type="text" @click="handLook(slotProps.data)">{{ $t('button.rateMaintain') }}</el-button>
      </template>
    </public-table>

    <!-- 利率维护弹窗 -->
    <Rate-Dialog :rateDialogObj="rateDialogObj" @handle-dialog="handleClose" />

    <!-- 新增计划弹窗 -->
    <popup-view v-if="addDialogVisible" :title="$t('ratePlan.addRatePlanTitle')" @handle-close="handleClose" :width="'320px'">
      <el-form ref="addForm" :model="addFormData" :rules="addRules">
        <div v-for="(item, key) in addFormData" :key="key">
          <el-form-item :label="$t(addFormLabel[key])" :prop="`${key}`" :label-width="formLabelWidth">
            <el-input v-if="key == 'name'" type="text" v-model="addFormData.name" :placeholder="'Please input'"></el-input>
            <div v-if="key == 'type'">
              <el-select style="width: 100%" v-model="addFormData.type" :placeholder="$t('select.place')">
                <el-option v-for="item in ratePlanTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="popup-footer">
        <el-button type="primary" @click="commit('addForm')">{{ $t('button.confirm') }}</el-button>
      </div>
    </popup-view>

    <!-- 修改计划弹窗 -->
    <popup-view v-if="changeDialogVisible" :title="$t('ratePlan.changeRatePlanTitle')" @handle-close="handleClose" :width="'500px'">
      <el-form ref="changeForm" :model="changeFormData" :rules="addRules">
        <div v-for="(item, key) in changeFormData" :key="key">
          <el-form-item :label="$t(addFormLabel[key])" :prop="`${key}`" :label-width="formLabelWidth">
            <el-input v-if="key == 'name'" type="text" v-model="changeFormData.name"></el-input>
            <div v-if="key == 'type'">
              <el-select v-model="changeFormData.type" :placeholder="$t('select.place')">
                <el-option v-for="item in ratePlanTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="popup-footer">
        <el-button type="primary" @click="commit('changeForm')">{{ $t('button.confirm') }}</el-button>
      </div>
    </popup-view>

    <!-- 翻页 -->
    <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from 'components/searceBar'
import RateDialog from './components/rateDialog.vue'
import api from '@/server/api'
import utils from '@/utils'
import PopupView from 'components/popupView'
import guide from '@/utils/guide'

export default {
  components: {
    PublicTable,
    Pagination,
    SearchBar,
    PopupView,
    RateDialog
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      searchModel: {},
      ratePlanTypeOpts: [], // 利率计划类型
      rateDialogObj: {
        show: false,
        title: 'ratePlan.rate'
      }, // rateDialogObj 利率弹窗
      // searchbar
      optionList: [
        {
          label: 'role.organizational',
          type: 'cascader',
          key: 'branno',
          showAllLevels: false,
          props: { checkStrictly: true },
          options: this.brannoList,
          placeholder: 'select.place'
        },
        {
          type: 'input',
          key: 'userna',
          label: 'input.customerName',
          placeholder: 'input.customerName'
        },
        {
          type: 'input',
          key: 'phonno',
          label: 'input.mobileNumber',
          placeholder: 'input.mobileNumber'
        },
        {
          type: 'select',
          key: 'rotpcd',
          label: 'role.customerType',
          placeholder: 'select.place',
          list: this.customerType
        },
        {
          type: 'date',
          key: 'date',
          label: 'date.date'
        }
      ],
      // table
      tableHead: [
        {
          label: 'ratePlan.name',
          value: 'name',
          width: '340px'
        },
        {
          label: 'ratePlan.type',
          value: 'typeName',
          type: 'slot',
          slotName: 'typeName',
          width: '340px'
        },
        {
          label: 'users.operation',
          type: 'slot',
          // width: '200px',
          slotName: 'handle',
          fixed: 'right'
        }
      ],
      // 新增表单验证
      isClickAdd: false,
      addDialogVisible: false,
      addFormLabel: { name: 'ratePlan.name', type: 'ratePlan.type' },
      addFormData: {
        name: '',
        type: 'STANDARD'
      },
      // 修改表单验证
      changeDialogVisible: false,
      changeFormData: {
        name: '',
        type: ''
      },
      formLabelWidth: '60px'
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        name: [{ required: true, message: `${this.$t('ratePlan.nameRule')}`, trigger: 'blur' }],
        type: [{ required: true, message: `${this.$t('ratePlan.typeRule')}`, trigger: 'blur' }]
      }
      return addRules
    }
  },
  activated() {
    // 添加用户引导
    this.setGuideConfig()
  },
  beforeRouteLeave(to, from, next) {
    this.addDialogVisible = false
    this.isClickAdd = false
    if (this.rateDialogObj.show) {
      this.rateDialogObj.show = false
      this.rateDialogObj.addDialogVisible = false
      this.$refs['RateDialog'].addDialogVisible = false
    }
    this.$driver.reset()
    next()
  },
  created() {
    this.initData()
    this.requstRatePlanData()
  },
  methods: {
    initData() {
      this.ratePlanTypeOpts = utils.rate.ratePlanTypeOpts
    },
    setGuideConfig() {
      let guideHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP3', localStorage))
      if (!guideHidden) {
        this.requestTemplateData()

        let _that = this
        this.isShowGuide = true
        // 重写guide配置方法
        let onNext = function () {
          utils.setStore('GUIDE-SAVE-SETP4', '', localStorage)
          _that.handleAdd()
          console.log('引导从当前步骤移动到下一步')
        }
        guide[2].onNext = eval(onNext)
        setTimeout(() => {
          _that.$driver.defineSteps(guide)
          _that.$driver.start()
        }, 300)
      }
    },
    resetFields() {
      this.addDialogVisible = false
      this.changeDialogVisible = false
      this.addFormData = { name: '', type: '' }
      this.changeFormData = { name: '', type: '' }
    },
    handleClose() {
      this.isClickAdd = false
      this.resetFields()
      if (this.isShowGuide) {
        // 跳转产品
        utils.setStore('GUIDE-SAVE-SETP4', '', localStorage)
        this.$router.push(`/dashboard/loanProduct`)
      }
    },
    /**
     * @description: 点击修改
     */
    handChange(data) {
      this.changeDialogVisible = true
      this.changeFormData.name = data.name
      this.changeFormData.id = data.id
      this.changeFormData.type = data.type
    },
    /**
     * @description: 点击查看
     */
    handLook(data) {
      this.rateDialogObj.show = true
      this.setRateDialogObj(data)
    },
    /**
     * @description: 利率维护弹窗类型
     * @param {*} data
     */
    setRateDialogObj(data) {
      this.rateDialogObj.id = data.id
    },
    handleAdd() {
      this.$driver.reset()
      this.addDialogVisible = true
    },
    /**
     * @description: 模板数据
     */
    requestTemplateData() {
      this.$api
        .fetch(
          'query_templateData_ratePlan_jsons',
          {},
          {
            method: 'get'
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.addFormData = { name: data.name, type: data.type }
          console.log('requestTemplateData data==>', data)
        })
        .catch(() => {})
    },
    /**
     * @description: 获取所有利率计划
     */
    requstRatePlanData() {
      this.$api
        .fetch(
          'query_ratePlan_jsons',
          {},
          {
            method: 'get',
            comm: {
              page: this.currentPage,
              size: this.pageSize
            }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(element => {
            element.typeName = element.type == 'STANDARD' ? 'configType.standard' : 'configType.customer'
          })
          this.tableData = data
          this.sumTotal = res.paged.total

          if (this.isClickAdd) {
            let obj = data[data.length - 1]
            this.isClickAdd = false
            this.rateDialogObj.show = true
            this.setRateDialogObj(obj)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 利率计划，增改
     * @param {*} loadingText load文字
     * @param {*} url url
     * @param {*} param param
     * @param {*} optionParam optionParam
     */
    requstHandleRatePlanData(loadingText, url, param, optionParam = {}) {
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
          this.requstRatePlanData()
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.resetFields()
          this.$message.error(msg)
        })
    },
    /**
     * @description:提交添加的角色
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == 'changeForm') {
            this.changeDialogVisible = false
            this.requstHandleRatePlanData(
              this.$t('loading.change'),
              `${api.admin.query_ratePlan_jsons}/${this.changeFormData.id}`,
              {
                id: this.changeFormData.id,
                name: this.changeFormData.name,
                type: this.changeFormData.type
              },
              {
                method: 'put'
              }
            )
          } else {
            this.addDialogVisible = false
            this.isClickAdd = true
            this.requstHandleRatePlanData(this.$t('loading.add'), 'query_ratePlan_jsons', {
              name: this.addFormData.name,
              type: this.addFormData.type
            })
          }
        } else {
          return false
        }
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstRatePlanData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstRatePlanData()
    }
  }
}
</script>

<style lang="less" scoped>
.popup-footer {
  display: flex;
  justify-content: right;
  .el-button {
    width: 80px;
  }
}
</style>
