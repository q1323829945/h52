<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/user/user.vue
 * @Date         : 2022-02-17 09:56:32
 * @LastEditTime : 2022-11-02 13:25:20
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
        <div>{{ slotProps.data.position == null ? '--' : slotProps.data.position.name }}</div>
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

    <!-- 新增用户弹窗 -->
    <popup-view
      v-if="addForm.dialogVisible"
      :title="$t('users.addialogTitle')"
      @handle-close="handleClose('addForm')"
      :width="setPopupWidth({ en: 500 })"
    >
      <el-form :ref="addForm.refName" :model="addForm.data" :rules="rules">
        <div v-for="(item, key) in addForm.data" :key="key">
          <el-form-item :label="$t(addForm.labels[key])" :prop="`${key}`" :label-width="setFormLabelWidth({ en: 160 })">
            <el-input v-if="key == 'username'" type="text" v-model="addForm.data.username" :placeholder="'Enter a name'"></el-input>
            <el-input v-if="key == 'email'" type="text" v-model="addForm.data.email" :placeholder="'Enter a email'"></el-input>
            <el-input v-if="key == 'password'" type="text" v-model="addForm.data.password" :placeholder="'Enter a password'"></el-input>
            <el-select style="width: 100%" v-if="key == 'positionId'" v-model="addForm.data.positionId" clearable :placeholder="'Select a position'">
              <el-option v-for="item in positionDataList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div class="popup-footer">
        <el-button type="primary" @click="commit('addForm')">{{ $t('button.confirm') }}</el-button>
      </div>
    </popup-view>

    <!-- 修改用户户弹窗 -->
    <popup-view
      v-if="changeForm.dialogVisible"
      :title="$t('users.dialogTitle')"
      @handle-close="handleClose('changeForm')"
      :width="setPopupWidth({ en: 500 })"
    >
      <el-form ref="changeForm" :model="changeForm.data" :rules="rules">
        <div v-for="(item, key) in changeForm.data" :key="key">
          <el-form-item :label="$t(`${changeForm.labels[key]}`)" :prop="`${key}`" :label-width="setFormLabelWidth({ en: 100 })">
            <!-- email -->
            <el-input v-if="key == 'email'" type="text" v-model="changeForm.data.email" clearable :placeholder="'Enter a email'"></el-input>
            <!-- 岗位 -->
            <el-select style="width: 100%" v-if="key == 'positionId'" v-model="changeForm.data.positionId" :placeholder="'Select a position'">
              <el-option v-for="item in positionDataList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <!-- 用户角色 -->
            <el-checkbox-group v-if="key == 'roleList'" v-model="changeForm.data.roleList" @change="getCheckboxValue()">
              <el-checkbox v-for="(item, index) in roleDataList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
      <div class="popup-footer">
        <el-button type="primary" @click="commit('changeForm')">{{ $t('button.confirm') }}</el-button>
      </div>
    </popup-view>

    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import utils from '@/utils'
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import api from '@/server/api'
import PopupView from 'components/popupView'
import SearchBar from '@/components/searceBar'

export default {
  components: {
    PublicTable,
    Pagination,
    PopupView,
    SearchBar
  },
  data() {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    const validatorEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('users.emailRule')))
      } else {
        if (!utils.ckEmail(value)) {
          callback(new Error(this.$t('users.emailRule')))
        } else {
          callback()
        }
      }
    }
    return {
      userId: '',
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      selectUserRoleList: [],
      roleDataList: [],
      positionDataList: [],
      tableData: [],
      tableHead: [
        {
          label: 'users.username',
          value: 'username'
        },
        {
          label: 'Position',
          type: 'slot',
          slotName: 'position'
        },
        {
          label: 'users.email',
          value: 'email'
        },
        {
          label: 'users.roles',
          value: 'rolesNames'
        },

        {
          label: 'users.operation',
          type: 'slot',
          slotName: 'delete',
          fixed: 'right',
          width: '150px'
        }
      ],
      addForm: {
        refName: 'addForm',
        dialogVisible: false,
        labels: {
          username: 'users.username',
          email: 'users.email',
          password: 'login.password',
          positionId: 'Position'
        },
        data: {
          username: '',
          email: '',
          password: '',
          positionId: ''
        }
      },
      changeForm: {
        dialogVisible: false,
        labels: {
          email: 'users.email',
          positionId: 'Position',
          roleList: 'users.roles'
        },
        data: {
          email: '',
          positionId: '',
          roleList: []
        }
      },
      searchModel: { username: '', position: '' },
      // searchbar
      searchBarOpts: [
        {
          type: 'input',
          key: 'username',
          label: 'User Name',
          width: '60px',
          placeholder: 'Enter a user name'
        },
        {
          type: 'select',
          key: 'position',
          label: 'Position',
          list: [],
          placeholder: 'Select a position'
        }
        // {
        //   type: 'select',
        //   key: 'unPosition',
        //   label: 'No Position',
        //   list: [
        //     { label: 'yes', value: true },
        //     { label: 'No', value: false }
        //   ],
        //   placeholder: 'Select a status'
        // }
      ],
      formLabelWidth: '100px',
      validatorEmail
    }
  },
  mounted() {},
  computed: {
    //使用computed计算属性来操作tableHead
    setTableHead() {
      return function () {
        return this.tableHead
      }
    },
    setPopupWidth() {
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 400
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
        username: [{ required: true, message: this.$t('users.usernameRule'), trigger: 'blur' }],
        email: [{ validator: this.validatorEmail, required: true, trigger: 'blur' }],
        password: [{ required: true, message: this.$t('login.passwordRule'), trigger: 'blur' }]
      }
      return rules
    }
  },
  created() {
    this.requstRoleData()
    this.requstPositionData()
    this.requstUsersData()
  },
  methods: {
    getCheckboxValue() {
      console.log('roles==>', this.changeForm.data.roleList)
    },
    /**
     * @description: 删除对象为空值的属性
     * @param {*} obj
     * @return {*} obj
     */
    removeProperty(obj) {
      Object.keys(obj).forEach(item => {
        if (obj[item] === '' || obj[item] === undefined || obj[item] === null || obj[item] === 'null') delete obj[item]
      })
      return obj
    },

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
          this.changeForm.data = { email: '', positionId: '', roleList: [] }
          this.requstUsersData()
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.changeForm.data = { email: '', positionId: '', roleList: [] }
          this.$message.error(msg)
        })
    },
    /**
     * @description: 获取所有岗位
     */
    requstPositionData() {
      this.$api
        .fetch(
          `${api.admin.query_position_jsons}/all`,
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
            item.value = item.id
            item.label = item.name
          })
          this.searchBarOpts[1].list = data
          this.positionDataList = data
        })
        .catch(msg => {
          this.$message.error(msg)
        })
    },
    /**
     * @description: 所有角色信息
     */
    requstRoleData() {
      this.$api
        .fetch(
          'query_roles_all_jsons',
          {},
          {
            method: 'get'
          }
        )
        .then(res => {
          this.roleDataList = res.data
          // const data = JSON.parse(JSON.stringify(res.data))
          // data.forEach(item => {
          //   let ids = []
          //   let names = []
          //   item.permissions.forEach(element => {
          //     ids.push(element.id)
          //     names.push(element.name)
          //     item.permissionsIds = ids.join('、')
          //     item.permissionsNames = names.join('、')
          //   })
          // })
          // this.tableData = data
          // this.sumTotal = res.paged.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 获取所有用户
     */
    requstUsersData() {
      let searchModel = this.removeProperty(this.searchModel)

      this.$api
        .fetch(
          'query_user_manger_jsons',
          { page: this.currentPage, size: this.pageSize, ...searchModel },
          {
            method: 'get'
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(item => {
            item.isDeleteVisible = false
            let roleids = []
            let roleNames = []
            item.roles.forEach(element => {
              roleids.push(element.id)
              roleNames.push(element.name)
              // 角色拼接字符串显示
              item.rolesIds = roleids.join('、')
              item.rolesNames = roleNames.join('、')
            })
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
        username: '',
        email: '',
        password: '',
        positionId: ''
      }
    },
    /**
     * @description: 修改用户信息
     * @param {*} data 用户信息
     */
    handChange(data) {
      this.userId = data.id
      this.selectUserRoleList = data.roles
      this.changeForm.data.email = data.email
      this.changeForm.data.positionId = data.position == null ? '' : data.position.id
      if (data.roles.length > 0) {
        var stringResult = data.rolesIds.split('、')
        this.changeForm.data.roleList = stringResult
      } else {
        this.changeForm.data.roleList = []
      }
      this.changeForm.dialogVisible = true
    },
    /**
     * @description: 删除租户信息
     * @param {*} data 租户信息
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
     * @description:提交添加的角色
     */
    commit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == 'changeForm') {
            // 修改
            this.changeForm.dialogVisible = false
            delete this.changeForm.data.roles
            if (this.changeForm.data.positionId == '') {
              delete this.changeForm.data.positionId
            }
            console.log('this.changeForm==>', this.changeForm.data)
            this.requestChangeData('put', `${api.admin.query_user_manger_jsons}/${this.userId}`, this.changeForm.data)
          } else {
            // 新增
            this.addForm.dialogVisible = false
            console.log('this.addForm==>', this.addForm.data)
            if (this.addForm.data.positionId == '') {
              delete this.addForm.data.positionId
            }
            this.$api
              .fetch('query_user_manger_jsons', this.addForm.data)
              .then(() => {
                this.requstUsersData()
                this.resetFormData()
              })
              .catch(msg => {
                this.$message.error(msg)
                this.resetFormData()
              })
          }
        } else {
          return false
        }
      })
    },
    /**
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      this.currentPage = 0
      this.pageSize = 10
      this.requstUsersData()
    },
    /**
     * @description:重置
     */
    handleReset() {
      this.searchModel = { username: '', position: '' }
      this.$refs['mySearchBar'].searchModel = this.searchModel
      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage
      this.requstUsersData()
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstUsersData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstUsersData()
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
