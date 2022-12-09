<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/permissions/permissions.vue
 * @Date         : 2022-02-15 10:47:52
 * @LastEditTime : 2022-06-28 13:34:01
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <template>
      <!-- <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">
        {{ $t('button.add') }}
      </el-button> -->
    </template>
    <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData"></public-table>
    <el-dialog title="新增权限信息" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="formData" :rules="rules">
        <el-form-item label="tag" prop="tag" :label-width="formLabelWidth">
          <el-input v-model="formData.tag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name" :label-width="formLabelWidth">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="remark" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="formData.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commmit('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
  </app-main>
</template>

<script>
import PublicTable from 'components/publicTable'
import Pagination from 'components/pagination'

export default {
  components: {
    PublicTable,
    Pagination
  },
  data() {
    return {
      tableData: [],
      loading: true,
      dialogFormVisible: false,
      sumTotal: 0,
      currentPage: 0,
      pageSize: 10,
      tableHead: [
        {
          label: 'permission.tag',
          value: 'tag'
        },
        {
          label: 'permission.name',
          value: 'name'
        },
        {
          label: 'permission.remark',
          value: 'remark'
        }
      ],
      formData: {
        tag: '',
        name: '',
        remark: ''
      },
      // 表单验证
      rules: {
        tag: [{ required: true, message: 'tag不可为空', trigger: 'blur' }],
        name: [{ required: true, message: 'name不可为空', trigger: 'blur' }],
        remark: [{ required: true, message: 'remark不可为空', trigger: 'blur' }]
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.requstPermissionsData()
  },
  methods: {
    requstPermissionsData() {
      this.$api
        .fetch(
          'query_permissions_jsons',
          { page: this.currentPage, size: this.pageSize },
          {
            method: 'get'
          }
        )
        .then(res => {
          const data = JSON.parse(JSON.stringify(res.data))
          this.loading = false
          this.tableData = data
          this.sumTotal = res.paged.total
        })
        .catch(() => {
          this.loading = false
        })
    },
    handlePush() {},
    commmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          const loading = this.$loading({
            lock: true,
            text: this.$t('loading.add'),
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          this.$api
            .fetch('query_permissions_jsons', {
              tag: this.formData.tag,
              name: this.formData.name,
              remark: this.formData.remark
            })
            .then(() => {
              if (loading) {
                loading.close()
              }
              this.requstPermissionsData()
            })
            .catch(msg => {
              if (loading) {
                loading.close()
              }
              this.$message.error(msg)
            })
          this.formData = {}
        } else {
          this.$message({
            message: '请输入正确的格式',
            type: 'warning'
          })
          return false
        }
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.requstPermissionsData()
    },
    handlePageCurrent(val) {
      this.currentPage = val > 0 ? val - 1 : 1
      this.requstPermissionsData()
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  background: rebeccapurple;
}
</style>
