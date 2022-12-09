<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/questionnaire/index.vue
 * @Date         : 2022-08-10 17:20:06
 * @LastEditTime : 2022-10-25 16:28:44
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 搜索 -->
    <search-bar
      ref="mySearchBar"
      :optionList="[]"
      :isAdd="true"
      :is-export="false"
      :is-import="false"
      @handle-push="addDialogVisible = true"
    ></search-bar>

    <!-- 列表 -->
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
      <template slot="answerType" slot-scope="slotProps">
        <div>{{ $t(answerTypeValue(slotProps.data.answerType)) }}</div>
      </template>
      <template slot="handle" slot-scope="slotProps">
        <!-- <el-button style="margin-right: 20px" size="mini" type="text" @click="handChange(slotProps.data)">{{ $t('button.modification') }}</el-button> -->
        <el-button size="mini" type="text" @click="handChange(slotProps.data)">{{ $t('button.change') }}</el-button>
      </template>
    </public-table>

    <!-- 新增问题弹窗 -->
    <popup-view v-if="addDialogVisible" :title="$t('questionnaire.addTitle')" @handle-close="handleClose()" :width="'350px'">
      <el-form ref="addForm" :model="addFormData" :rules="addRules">
        <div v-for="(item, key) in addFormData" :key="key">
          <el-form-item :label="$t(addFormLabel[key])" :prop="`${key}`" :label-width="formLabelWidth">
            <el-input
              v-if="key == 'question'"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              v-model="addFormData.question"
              :placeholder="'Please input'"
            ></el-input>
            <div v-if="key == 'answerType'">
              <el-select :style="{ width: '100%' }" v-model="addFormData.answerType" :placeholder="$t('select.place')">
                <el-option v-for="item in answerTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
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
    <popup-view v-if="changeDialogVisible" :title="$t('questionnaire.changeTitle')" @handle-close="handleClose()" :width="'350px'">
      <el-form ref="changeForm" :model="changeFormData" :rules="addRules">
        <div v-for="(item, key) in changeFormData" :key="key">
          <el-form-item :label="$t(addFormLabel[key])" :prop="`${key}`" :label-width="formLabelWidth">
            <el-input
              v-if="key == 'question'"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              v-model="changeFormData.question"
              :placeholder="'Please input'"
            ></el-input>
            <div v-if="key == 'answerType'">
              <el-select :style="{ width: '100%' }" v-model="changeFormData.answerType" :placeholder="$t('select.place')">
                <el-option v-for="item in answerTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
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
import api from '@/server/api'
import PopupView from 'components/popupView'
import questionnaireConfig from './optsConfig/questionnaireConfig'

export default {
  components: {
    PublicTable,
    Pagination,
    SearchBar,
    PopupView
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      searchModel: {},
      answerTypeOpts: [], // 利率计划类型
      // table
      tableHead: [
        {
          label: 'questionnaire.question',
          value: 'question'
        },
        {
          label: 'questionnaire.answerType',
          value: 'answerType',
          type: 'slot',
          slotName: 'answerType'
        },
        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'handle',
          fixed: 'right'
        }
      ],
      // 新增表单验证
      addDialogVisible: false,
      addFormLabel: { question: 'questionnaire.question', answerType: 'questionnaire.answerType' },
      addFormData: {
        question: '',
        answerType: 'STRING'
      },
      // 修改表单验证
      changeDialogVisible: false,
      changeFormData: {
        question: '',
        answerType: ''
      },
      formLabelWidth: '110px'
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        question: [{ required: true, message: `${this.$t('questionnaire.questionRule')}`, trigger: 'blur' }],
        answerType: [{ required: true, message: `${this.$t('questionnaire.answerTypeRule')}`, trigger: 'blur' }]
      }
      return addRules
    },
    answerTypeValue() {
      return value => {
        return value == 'BOOLEAN' ? 'questionnaire.answerTypeOptBoolean' : 'questionnaire.answerTypeOptString'
      }
    }
  },
  created() {
    this.initData()
    this.requstQuestionnaireData()
  },
  methods: {
    initData() {
      this.answerTypeOpts = questionnaireConfig.answerTypeOpts
    },
    resetFields() {
      this.addDialogVisible = false
      this.changeDialogVisible = false
      this.addFormData = { question: '', answerType: '' }
      this.changeFormData = { question: '', answerType: '' }
    },
    handleClose() {
      this.resetFields()
      // if (type == 'addForm') {
      //   this.addDialogVisible = false
      //   this.addFormData = { question: '', answerType: '' }
      // } else {
      //   this.changeDialogVisible = false

      // }
    },
    /**
     * @description: 请求基础方法
     * @param {*} requestBody requestBody
     */
    requstBaseData(requestBody = {}) {
      let defaultBody = {
        url: 'query_questionnaire_json',
        param: {},
        optionParam: {},
        isHaneld: false,
        isDetail: false
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
            this.requstQuestionnaireData()
          } else {
            this.tableData = data
            this.sumTotal = res.paged.total
          }
        })
        .catch(() => {
          this.loading = false
          if (body.isHaneld) {
            loading.close()
          }
        })
    },
    /**
     * @description: 点击修改
     */
    handChange(data) {
      this.changeDialogVisible = true
      this.changeFormData.question = data.question
      this.changeFormData.id = data.id
      this.changeFormData.answerType = data.answerType
    },
    /**
     * @description: 获取所有问卷
     */
    requstQuestionnaireData() {
      this.requstBaseData({
        url: 'query_questionnaire_json',
        param: { page: this.currentPage, size: this.pageSize },
        optionParam: {
          method: 'get',
          comm: {
            showMessage: true
          }
        }
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
            // 修改
            let body = {
              loadText: this.$t('loading.change'),
              url: `${api.admin.query_questionnaire_json}`,
              param: this.changeFormData,
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
            this.addDialogVisible = false
            // 新增
            let body = {
              loadText: this.$t('loading.add'),
              url: 'query_questionnaire_json',
              param: this.addFormData,
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
        } else {
          return false
        }
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstQuestionnaireData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstQuestionnaireData()
    }
  }
}
</script>

<style lang="less" scoped>
.popup-footer {
  margin: 20px 0px 10px 0px;
  display: flex;
  justify-content: right;
  .el-button {
    width: 80px;
  }
}
</style>
