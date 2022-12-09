<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/loanFileUploadConfig.vue
 * @Date         : 2022-03-28 09:36:32
 * @LastEditTime : 2022-09-19 09:47:17
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <el-button style="margin: 10px" type="primary" icon="el-icon-circle-plus-outline" @click="addForm.dialogVisible = true">
      {{ $t('button.add') }}
    </el-button>

    <!-- 列表 -->
    <public-table :table-head="setTableHead()" v-loading="loading" :table-data="setTableData()">
      <!-- 删除 -->
      <template slot="delete" slot-scope="slotProps">
        <!-- 删除提醒气泡 -->
        <el-popconfirm
          hide-icon
          :title="$t('commonDialog.deleteTips') + '？'"
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

    <!-- 新增配置弹窗 -->
    <popup-view v-if="addForm.dialogVisible" :title="$t('loan.addialogTitle')" @handle-close="handleClose" :width="'400px'">
      <div>
        <el-form :ref="addForm.refName" :model="addForm.data" :rules="rules">
          <div v-for="(item, key) in addForm.data" :key="key">
            <el-form-item :label="$t(addForm.labels[key])" :prop="`${key}`" :label-width="formLabelWidth">
              <!-- 配置产品 -->
              <!-- <div v-if="key == 'productId'">
                <el-select style="width: 200px" v-model="addForm.data.productId" :placeholder="$t('select.place')" clearable>
                  <el-option v-for="option in productList" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </div> -->
              <!-- 配置名称 -->
              <el-input v-if="key == 'name'" type="text" v-model="addForm.data.name"></el-input>
              <!-- 配置是否必选-->
              <div v-if="key == 'required'">
                <el-radio v-model="addForm.data.required" :label="true">{{ $t('configType.yes') }}</el-radio>
                <el-radio v-model="addForm.data.required" :label="false">{{ $t('configType.no') }}</el-radio>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <div class="popup-footer">
          <el-button type="primary" @click="commit('addForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </div>
    </popup-view>

    <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import api from '@/server/api'
import PopupView from 'components/popupView'

export default {
  components: {
    PublicTable,
    Pagination,
    PopupView
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      tableHead: [
        {
          label: 'permission.name',
          value: 'name',
          width: '440px'
        },
        {
          label: 'permission.required',
          value: 'requiredStatus',
          width: '440px'
        },
        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'delete',
          fixed: 'right'
        }
      ],
      addForm: {
        refName: 'addForm',
        dialogVisible: false,
        labels: {
          // productId: '产品',
          name: 'permission.name',
          required: 'permission.required'
        },
        data: {
          // productId: '',
          name: '',
          required: true
        }
      },
      formLabelWidth: '160px',
      productList: []
    }
  },
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        // this.tableHead[this.tableHead.length - 2].width = this.$i18n.locale == 'en' ? '140px' : '110px'
        return this.tableHead
      }
    },
    setTableData() {
      return function () {
        this.tableData.forEach(item => {
          item.requiredStatus = item.required ? this.$t('configType.yes') : this.$t('configType.no')
        })
        return this.tableData
      }
    },
    rules() {
      // 表单验证
      const rules = {
        // productId: [{ required: true, message: this.$t('loanProduct.uploadConfigProductRule'), trigger: 'blur' }],
        name: [{ required: true, message: this.$t('ratePlan.nameRule'), trigger: 'blur' }],
        required: [{ required: true, message: this.$t('login.passwordRule'), trigger: 'blur' }]
      }
      return rules
    }
  },
  created() {
    this.requstProdutList()
    this.requstConfigureData()
  },
  methods: {
    /**
     * @description: 获取所有贷款产品
     */
    requstProdutList() {
      this.$api
        .fetch(
          `${api.admin.query_loanProduct_jsons}/allByStatus`,
          {},
          {
            method: 'get',
            comm: {
              paramUrl: true
            }
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(element => {
            element.value = element.id
            element.label = element.name
          })
          this.productList = data
        })
        .catch(() => {})
    },
    /**
     * @description: 删除配置
     * @param {*} data 配置信息
     */
    handDelete(data) {
      const loading = this.$loading({
        lock: true,
        text: this.$t('loading.delete'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.$api
        .fetch(
          `${api.admin.query_loanUploadConfigure_jsons}/${data.id}`,
          {},
          {
            method: 'delete'
          }
        )
        .then(() => {
          if (loading) {
            loading.close()
          }
          this.requstConfigureData()
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.$message.error(msg)
        })
    },
    /**
     * @description: 获取所有模板
     */
    requstConfigureData() {
      this.$api
        .fetch(
          'query_loanUploadConfigure_jsons',
          { page: this.currentPage, size: this.pageSize },
          {
            method: 'get'
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.addForm.data = { productId: '', name: '', required: true }
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(msg => {
          this.loading = false
          this.$message.error(msg)
        })
    },
    /**
     * @description:提交添加
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新增
          this.addForm.dialogVisible = false
          const loading = this.$loading({
            lock: true,
            text: this.$t('loading.add'),
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$api
            .fetch('query_loanUploadConfigure_jsons', this.addForm.data)
            .then(() => {
              this.requstConfigureData()
              if (loading) {
                loading.close()
              }
            })
            .catch(msg => {
              if (loading) {
                loading.close()
              }
              this.$message.error(msg)
            })
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.addForm.dialogVisible = false
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstConfigureData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstConfigureData()
    }
  }
}
</script>

<style scoped>
.inputDeep >>> .el-input__inner {
  border: 0;
  padding-left: 20px;
  background: transparent;
}
</style>

<style lang="less">
.el-input {
  width: 90%;
}

.el-dialog__body {
  padding: 30px 20px 0px 20px;
  // color: #606266;
  // font-size: 14px;
  // word-break: break-all;
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

<style lang="less" scoped>
.popup-footer {
  display: flex;
  justify-content: right;
  .el-button {
    width: 80px;
  }
}
</style>
