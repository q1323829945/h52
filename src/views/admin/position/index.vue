<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/position/index.vue
 * @Date         : 2022-08-30 17:05:53
 * @LastEditTime : 2022-11-03 09:50:14
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 搜索 -->
    <search-bar
      ref="mySearchBar"
      :optionList="searchBarOpts"
      :isAdd="true"
      :is-export="false"
      :is-import="false"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
      @handle-push="addForm.dialogVisible = true"
    ></search-bar>

    <!-- 列表 -->
    <public-table :table-head="setTableHead()" v-loading="loading" :table-data="tableData">
      <template slot="position" slot-scope="slotProps">
        <div>{{ slotProps.data.position | transformPositionType }}</div>
      </template>
      <!-- 删除、修改信息 -->
      <template slot="delete" slot-scope="slotProps">
        <!-- 删除提醒气泡 -->
        <el-popconfirm
          hide-icon
          :title="$t('users.deleteTips')"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          @cancel="slotProps.data.isDeleteVisible = false"
          @confirm="handDelete(slotProps.data)"
        >
          <!-- 删除按钮 -->
          <!-- <el-button slot="reference" type="text">
            {{ $t('button.delete') }}
          </el-button> -->
        </el-popconfirm>
        <!-- 修改按钮 -->
        <el-button size="mini" type="text" @click="handChange(slotProps.data)">{{ $t('users.change') }}</el-button>
      </template>
    </public-table>

    <!-- 新增岗位弹窗 -->
    <popup-view v-if="addForm.dialogVisible" :title="'Add New Position'" @handle-close="handleClose('addForm')" :width="setPopupWidth({ en: 400 })">
      <el-form :ref="addForm.refName" :model="addForm.data" :rules="rules">
        <div v-for="(item, key) in addForm.data" :key="key">
          <el-form-item :label="$t(addForm.labels[key])" :prop="`${key}`" :label-width="setFormLabelWidth({ en: 100 })">
            <el-input v-if="key == 'name'" type="text" v-model="addForm.data.name" :placeholder="'Enter a name'"></el-input>
            <el-input v-if="key == 'remark'" type="text" v-model="addForm.data.remark" :placeholder="'Enter a remark'"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="popup-footer">
        <el-button type="primary" @click="commit('addForm')">{{ $t('button.confirm') }}</el-button>
      </div>
    </popup-view>

    <!-- 修改岗位弹窗 -->
    <popup-view
      v-if="changeForm.dialogVisible"
      :title="'Modify Position Info'"
      @handle-close="handleClose('changeForm')"
      :width="setPopupWidth({ en: 650 })"
      :overflowConfig="popupOverflowConfig"
    >
      <Position-Change-Dialog :ref="changeForm.refName" :model.sync="changeForm" />
      <div class="popup-footer">
        <el-button type="primary" @click="commit('changeForm')">{{ $t('button.confirm') }}</el-button>
      </div>
    </popup-view>

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import api from '@/server/api'
import PopupView from 'components/popupView'
import PositionChangeDialog from './components/positionChangeDialog/index.vue'
import SearchBar from '@/components/searceBar'

export default {
  components: {
    PublicTable,
    Pagination,
    PopupView,
    SearchBar,
    PositionChangeDialog
  },
  data() {
    return {
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      usersDataList: [],
      tableData: [],
      tableHead: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Remark',
          value: 'remark'
        },
        {
          label: 'Users',
          value: 'usersNames'
        },

        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'delete',
          width: '130px',
          fixed: 'right'
        }
      ],
      popupOverflowConfig: {
        popupOverflow: 'auto',
        contentOverflow: 'hidden',
        bodyOverflow: 'auto'
      },
      addForm: {
        refName: 'addForm',
        dialogVisible: false,
        labels: {
          name: 'Name',
          remark: 'Remark'
        },
        data: {
          name: '',
          remark: ''
        }
      },
      changeForm: {
        refName: 'changeForm',
        dialogVisible: false,
        labels: {
          name: 'Name',
          remark: 'Remark'
        },
        data: {
          name: '',
          remark: '',
          usersAllList: [],
          usersSelectList: []
        }
      },
      searchModel: { name: '' },
      // searchbar
      searchBarOpts: [
        {
          type: 'input',
          key: 'name',
          label: 'Name',
          placeholder: 'Enter Position Name'
        }
      ],
      formLabelWidth: '100px'
    }
  },
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        return this.tableHead
      }
    },
    setPopupWidth() {
      // return value => {
      //   const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 120
      //   if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
      //     return `${width}px`
      //   } else {
      //     return `${width + 20}px`
      //   }
      // }
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.en : value.en
        return `${width}px`
      }
    },
    setFormLabelWidth() {
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 100
        return `${width}px`
      }
    },
    rules() {
      // 表单验证
      const rules = {
        name: [{ required: true, message: 'Name can not be empty', trigger: 'blur' }]
      }
      return rules
    }
  },
  created() {
    // 添加这一行 可以保证组件不被keep-alive进行缓存
    this.$destroy()
    this.requstAllUserData()
    this.requstPositionData()
  },
  methods: {
    /**
     * @description: 请求修改
     * @param {*} method 请求方式 put get delete
     * @param {*} url url
     * @param {*} param param
     */
    requestChangeData(method, url, param) {
      const loading = this.$loading({
        lock: true,
        text: this.$t('loading.change'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.$api
        .fetch(url, param, {
          method: method
        })
        .then(() => {
          if (loading) {
            loading.close()
          }
          this.changeForm.data = {
            name: '',
            remark: '',
            usersAllList: this.usersDataList,
            usersSelectList: []
          }
          this.requstPositionData()
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.changeForm.data = {
            name: '',
            remark: '',
            usersAllList: this.usersDataList,
            usersSelectList: []
          }
          this.$message.error(msg)
        })
    },
    /**
     * @description: 获取所有用户
     */
    requstAllUserData() {
      this.$api
        .fetch(
          `${api.admin.query_user_manger_jsons}/all`,
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
          data.forEach(item => {
            item.label = item.username
            item.key = item.id
          })
          this.usersDataList = data
          this.changeForm.data.usersAllList = data
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 获取所有岗位
     */
    requstPositionData() {
      this.$api
        .fetch(
          'query_position_jsons',
          { page: this.currentPage, size: this.pageSize },
          {
            method: 'get'
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(item => {
            item.isDeleteVisible = false
            if (item.users.length > 0) {
              let usersIds = []
              let usersNames = []
              item.users.forEach(element => {
                usersIds.push(element.id.toString())
                usersNames.push(element.username)
                // 角色拼接字符串显示
                item.usersIds = usersIds
                item.usersNames = usersNames.join('、')
              })
              console.log('')
            }
          })
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(msg => {
          this.loading = false
          this.$message.error(msg)
        })
    },
    resetFormData() {
      this.addForm.data = {
        name: '',
        remark: ''
      }
    },
    /**
     * @description: 修改用户信息
     * @param {*} data 用户信息
     */
    handChange(data) {
      this.changeForm.data.id = data.id
      this.changeForm.data.name = data.name
      this.changeForm.data.remark = data.remark
      this.changeForm.data.usersSelectList = data.usersIds
      this.changeForm.dialogVisible = true
    },
    /**
     * @description: 删除岗位信息
     * @param {*} data 岗位信息
     */
    handDelete(data) {
      data.isDeleteVisible = false
      this.requestChangeData('delete', `${api.admin.query_user_manger_jsons}/${data.id}`, {})
    },
    /**
     * @description: 编辑弹窗
     * @param {*} type addForm新增 changeForm修改
     */
    handleClose(type) {
      if (type == 'addForm') {
        this.addForm.dialogVisible = false
        this.resetFormData()
      } else {
        this.changeForm.dialogVisible = false
      }
    },
    /**
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      console.log('data==>', data)
      this.currentPage = 0
      this.pageSize = 10
      this.$api
        .fetch(
          'query_position_jsons',
          { name: this.searchModel.name, page: this.currentPage, size: this.pageSize },
          {
            method: 'get'
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(item => {
            item.isDeleteVisible = false
            if (item.users.length > 0) {
              let usersIds = []
              let usersNames = []
              item.users.forEach(element => {
                usersIds.push(element.id.toString())
                usersNames.push(element.username)
                // 角色拼接字符串显示
                item.usersIds = usersIds
                item.usersNames = usersNames.join('、')
              })
            }
          })
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(msg => {
          this.loading = false
          this.$message.error(msg)
        })
    },
    /**
     * @description:重置
     */
    handleReset() {
      this.searchModel = { name: '' }
      this.$refs['mySearchBar'].searchModel = this.searchModel
      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage
      this.requstPositionData()
    },
    /**
     * @description:提交添加的角色
     */
    commit(formName) {
      if (formName == 'addForm') {
        // 新增
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addForm.dialogVisible = false
            this.$api
              .fetch('query_position_jsons', this.addForm.data)
              .then(() => {
                this.requstPositionData()
                this.resetFormData()
              })
              .catch(msg => {
                this.$message.error(msg)
                this.resetFormData()
              })
          } else {
            return false
          }
        })
      } else {
        // 修改
        this.$refs.changeForm.$refs.positionChangeForm.validate(valid => {
          if (valid) {
            this.changeForm.dialogVisible = false
            this.requestChangeData('put', `${api.admin.query_position_jsons}`, {
              id: this.changeForm.data.id,
              name: this.changeForm.data.name,
              remark: this.changeForm.data.remark,
              usersList: this.changeForm.data.usersSelectList
            })
          } else {
            return false
          }
        })
      }
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstPositionData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstPositionData()
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
  margin: 20px 0px 10px 0px;
  display: flex;
  justify-content: right;
  .el-button {
    width: 80px;
  }
}
</style>
