<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/role/role.vue
 * @Date         : 2022-02-15 10:24:31
 * @LastEditTime : 2022-11-02 13:23:34
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <search-bar ref="mySearchBar" :optionList="[]" :isAdd="true" :is-export="false" :is-import="false" @handle-push="handlePush"></search-bar>
    <!-- 列表 -->
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
      <template slot="handle" slot-scope="slotProps">
        <el-button size="mini" type="text" @click="handChange(slotProps.data)">{{ $t('button.modification') }}</el-button>
      </template>
    </public-table>

    <!-- 新增角色弹窗 -->
    <popup-view v-if="addDialogVisible" :title="$t('role.newRoleInfo')" @handle-close="handleClose('addForm')" :width="'360px'">
      <div>
        <el-form style="margin-top: 20px" ref="addForm" :model="addFormData" :rules="addRules">
          <div v-for="(item, key) in addFormData" :key="key">
            <el-form-item :label="$t(addFormLabel[key])" :prop="`${key}`" :label-width="formLabelWidth">
              <el-input v-if="key == 'name'" type="text" v-model="addFormData.name" :placeholder="'Please input'"></el-input>
              <el-input v-if="key == 'remark'" type="text" v-model="addFormData.remark" :placeholder="'Please input'"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="popup-footer">
          <el-button type="primary" @click="commmit('addForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </div>
    </popup-view>

    <!-- 修改权限弹窗 -->
    <popup-view
      v-if="changeDialogVisible"
      :title="$t('role.modifyingRoleRights')"
      @handle-close="handleClose('changeForm')"
      :width="'800px'"
      :overflowConfig="popupOverflowConfig"
    >
      <div>
        <el-form ref="changeForm" :model="changeFormData" :rules="changeRules">
          <el-form-item :label="$t('role.newRolePermissions')" prop="checkList" :label-width="'100px'">
            <el-checkbox-group v-model="changeFormData.checkList" @change="getCheckboxValue(1)">
              <el-checkbox v-for="item in permissionsData" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="popup-footer">
          <el-button type="primary" @click="commmit('changeForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </div>
    </popup-view>

    <!-- 页码 -->
    <pagination ref="myPagination" :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'
import SearchBar from 'components/searceBar'
import api from '@/server/api'
import PopupView from 'components/popupView'

export default {
  components: {
    PublicTable,
    Pagination,
    SearchBar,
    PopupView
  },
  data() {
    return {
      permissionsData: [], // 所有权限
      loading: true,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableData: [],
      searchModel: {},
      popupOverflowConfig: {
        popupOverflow: 'auto',
        contentOverflow: 'hidden',
        bodyOverflow: 'auto'
      },
      // table
      tableHead: [
        {
          label: 'role.name',
          value: 'name',
          width: '240px'
        },
        {
          label: 'role.remark',
          value: 'remark',
          width: '240px'
        },
        {
          label: 'role.permissions',
          value: 'permissionsNames',
          width: '320px'
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
      addFormLabel: { name: 'role.newRoleName', remark: 'role.newRoleRemark' /*, checkList: 'role.newRolePermissions'*/ },
      addFormData: {
        name: '',
        remark: '',
        checkList: []
      },
      // 修改表单验证
      changeDialogVisible: false,
      changeFormData: {
        checkList: []
      },
      formLabelWidth: '80px'
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    addRules() {
      const addRules = {
        name: [{ required: true, message: `${this.$t('role.newRoleNameRule')}`, trigger: 'blur' }]
        // checkList: [{ required: true, message: `${this.$t('role.newRolePermRule')}`, trigger: 'blur' }]
      }
      return addRules
    },
    changeRules() {
      const changeRules = {
        checkList: [{ required: true, message: `${this.$t('role.newRolePermRule')}`, trigger: 'blur' }]
      }
      return changeRules
    }
  },
  created() {
    this.requstPermissionsData()
    this.requstRoleData()
  },
  methods: {
    getCheckboxValue(type) {
      if (type == 0) {
        // console.log('checkList==>', this.addFormData.checkList)
      } else {
        // console.log('checkList==>', this.changeFormData.checkList)
      }
    },
    resetFields() {
      this.addFormData = {
        name: '',
        remark: '',
        checkList: []
      }
      this.changeFormData = { checkList: [] }
    },
    /**
     * @description: 点击修改
     */
    handChange(data) {
      this.changeDialogVisible = true
      this.changeFormData = { checkList: [] }
      this.changeFormData.id = data.id
      this.changeFormData.name = data.name
      this.changeFormData.remark = data.remark
      if (data.permissions.length > 0) {
        var stringResult = data.permissionsIds.split('、')
        // for (let i = 0; i < stringResult.length; i++) {
        //   stringResult[i] = parseInt(stringResult[i])
        // }
        this.changeFormData.checkList = stringResult
      }
    },
    /**
     * @description: 获取所有权限
     */
    requstPermissionsData() {
      this.$api
        .fetch(
          'query_permissions_all_jsons',
          {},
          {
            method: 'get'
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.permissionsData = data
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 获取所有角色
     */
    requstRoleData() {
      this.loading = true
      this.$api
        .fetch(
          'query_roles_jsons',
          { page: this.currentPage, size: this.pageSize },
          {
            method: 'get'
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          data.forEach(item => {
            let ids = []
            let names = []
            item.permissions.forEach(element => {
              ids.push(element.id)
              names.push(element.name)
              item.permissionsIds = ids.join('、')
              item.permissionsNames = names.join('、')
            })
          })
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 添加角色
     */
    addRoleData() {
      let parmas = {
        name: this.addFormData.name,
        remark: this.addFormData.remark,
        permissionList: this.addFormData.checkList
      }
      const loading = this.$loading({
        lock: true,
        text: this.$t('loading.add'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .fetch('query_roles_jsons', parmas)
        .then(() => {
          if (loading) {
            loading.close()
          }
          this.resetFields()
          this.requstRoleData()
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
     * @description: 修改角色权限
     */
    changeRolePermissionsData() {
      let parmas = {
        name: this.changeFormData.name,
        remark: this.changeFormData.remark,
        permissionList: this.changeFormData.checkList
      }

      const loading = this.$loading({
        lock: true,
        text: this.$t('loading.change'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      this.$api
        .fetch(`${api.admin.query_roles_jsons}/${this.changeFormData.id}`, parmas, {
          method: 'put',
          comm: {
            putURL: true
          }
        })
        .then(() => {
          if (loading) {
            loading.close()
          }
          this.resetFields()
          this.requstRoleData()
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
    commmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == 'changeForm') {
            this.changeDialogVisible = false
            this.changeRolePermissionsData()
          } else {
            this.addDialogVisible = false
            this.addRoleData()
          }
        } else {
          return false
        }
      })
    },
    /**
     * @description: 新增
     */
    handlePush() {
      this.addDialogVisible = true
    },
    /**
     * @description: 查询
     * @param {*} data
     */
    handleQuery(data) {
      this.searchModel = data
      this.currentPage = 1
      this.pageSize = 10
    },
    /**
     * @description:重置
     */
    handleReset() {
      this.searchModel = {}
      this.$refs['mySearchBar'].searchModel = {}
      this.currentPage = 0
      this.pageSize = 10
      this.$refs['myPagination'].currentPage = this.currentPage
    },
    /**
     * @description: 编辑弹窗
     * @param {*} type addForm新增 changeForm修改
     */
    handleClose(type) {
      if (type == 'addForm') {
        this.addDialogVisible = false
      } else {
        this.changeDialogVisible = false
      }
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstRoleData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstRoleData()
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
