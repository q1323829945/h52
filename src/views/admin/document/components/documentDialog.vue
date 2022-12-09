<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/document/components/documentDialog.vue
 * @Date         : 2022-03-10 10:33:20
 * @LastEditTime : 2022-08-30 17:05:06
 * @LastEditors  : Nimo
 * @Logs         :         

 * 
-->
<template>
  <div
    :class="documentDialogObj.formType == 'directoryAdd' || documentDialogObj.formType == 'directoryChange' ? 'directory-dialog' : 'template-dialog'"
  >
    <el-dialog v-if="documentDialogObj.show" :visible.sync="documentDialogObj.show" @close="resetFields" append-to-body>
      <div slot="title" class="custom-dialog-header">
        <div class="custom-dialog-title">{{ $t(documentDialogObj.title) }}</div>
      </div>
      <el-form
        :ref="formType[documentDialogObj.formType]"
        :model="documentFormData"
        :rules="documentDialogObj.formType == 'directoryAdd' || documentDialogObj.formType == 'directoryChange' ? directoryRules : templateRules"
      >
        <!-- 文件夹 -->
        <div v-if="documentDialogObj.formType == 'directoryAdd' || documentDialogObj.formType == 'directoryChange'">
          <el-form-item style="margin-top: 20px" :label="$t('document.foldername')" prop="name" :label-width="formLabelWidth">
            <el-input @input="forceUpdate" type="text" v-model="documentDialogObj.formData.name"></el-input>
          </el-form-item>
        </div>

        <!-- 文件 -->
        <div v-else>
          <div v-for="(item, key) in documentFormData" :key="key">
            <el-form-item :label="key == 'fileType' ? '' : $t(documentFormLabel[`${key}`])" :prop="`${key}`" :label-width="formLabelWidth">
              <!-- 文件名 -->
              <el-input v-if="key == 'name'" @input="forceUpdate" type="text" v-model="documentFormData.name"></el-input>
              <!-- 文件语言 -->
              <div v-if="key == 'languageType'">
                <el-select style="width: 190px" @change="forceUpdate" v-model="documentFormData.languageType" :placeholder="$t('select.place')">
                  <el-option v-for="item in languageTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
              </div>
              <!-- 文件类型 -->
              <div v-if="key == 'documentType'">
                <el-select style="width: 190px" @change="forceUpdate" v-model="documentFormData.documentType" :placeholder="$t('select.place')">
                  <el-option v-for="item in documentTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>

          <!-- 导入文件 -->
          <el-upload
            class="upload-demo"
            action="none"
            :auto-upload="false"
            :on-change="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :multiple="false"
            :limit="1"
            accept=".doc,.docx,.pdf"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">{{ $t('button.selectFile') }}</el-button>
          </el-upload>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commmit(formType[documentDialogObj.formType])">{{ $t('button.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import utiles from '@/utils'
export default {
  name: 'documentDialog',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  inheritAttrs: true,
  props: {
    documentDialogObj: {
      type: Object,
      default() {
        return {
          title: '利率',
          formType: 'directoryAdd',
          formData: { name: '', languageType: '', documentType: '' }
        }
      }
    }
  },
  data: () => ({
    documentFormLabel: { name: 'document.filename', languageType: 'document.languageType', documentType: 'document.documentType' },
    documentFormData: { name: '', languageType: '', documentType: '' },
    fileInfo: {}, //文件本地fiile
    // 表单类型 directoryAdd目录增， directoryChange目录改， templateAdd文件增， templateChange文件改
    formType: { directoryAdd: 'directoryAdd', directoryChange: 'directoryChange', templateAdd: 'templateAdd', templateChange: 'templateChange' },
    templateFormLabel: {
      name: 'name',
      languageType: 'languageType',
      documentType: 'documentType'
    },
    formLabelWidth: '120px',
    languageTypeOpts: [],
    fileTypeObj: { doc: 'DOC', docx: 'DOCX', pdf: 'PDF' },
    documentTypeOpts: [],
    fileList: []
  }),
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    directoryRules() {
      const directoryRules = {
        name: [{ required: true, message: this.$t('document.filenameRule'), trigger: 'blur' }]
      }
      return directoryRules
    },
    templateRules() {
      const templateRules = {
        name: [{ required: true, message: this.$t('document.filenameRule'), trigger: 'blur' }],
        languageType: [{ required: true, message: this.$t('document.languageRule'), trigger: 'blur' }],
        documentType: [{ required: true, message: this.$t('document.documentTypeRule'), trigger: 'blur' }]
      }
      return templateRules
    }
  },
  watch: {
    documentDialogObj: {
      handler(newVal) {
        if (newVal.formType == 'templateChange') {
          this.fileList = [{ name: newVal.nodeData.name }]
        }
        if (newVal.show) {
          this.documentFormData = newVal.formData
          this.fileInfo = {}
          this.fileList = []
        }
      },
      deep: true
    }
  },
  created() {
    this.languageTypeOpts = utiles.common.languageTypeOpts
    this.documentTypeOpts = utiles.common.documentTypeOpts
  },
  mounted() {},
  methods: {
    forceUpdate() {
      this.$forceUpdate()
    },
    resetFields() {
      this.documentDialogObj.show = false
      this.documentDialogObj.formData = {}
    },
    // el-upload删除文件
    handleRemove(file, fileList) {
      console.log('handleRemove fileList ++ ', fileList)
      this.fileInfo = {}
      this.fileList = []
    },
    // el-upload选中文件
    handlePreview(file) {
      this.fileInfo = file
      // 取文件名
      this.documentDialogObj.formData.name = file.raw.name.substring(0, file.raw.name.lastIndexOf('.'))
      // 取文件后缀
      let fileExtension = file.raw.name.split('.').pop().toLowerCase()
      this.documentDialogObj.formData.fileType = this.fileTypeObj[fileExtension]
      this.fileList = [{ name: this.documentDialogObj.formData.name }]
      this.forceUpdate()
    },
    // el-uploadge文件数量
    handleExceed() {
      this.$message.warning(`${this.$t('document.limitDialog')} 1 ${this.$t('document.limitCount')} `)
    },
    // el-upload即将删除文件
    beforeRemove(file, fileList) {
      console.log('beforeRemove', file, fileList)
      return this.$confirm(`${this.$t('commonDialog.returnConfirm')}： ${file.name}？`)
    },
    /**
     * @description:提交
     */
    commmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.documentDialogObj.formType == 'templateAdd') {
            if (JSON.stringify(this.fileInfo) === '{}') {
              this.$message.warning(this.$t('commonDialog.selectFileMessage'))
              return
            }
          }
          if (this.documentDialogObj.formType == 'templateChange') {
            if (this.fileList.length <= 0) {
              this.$message.warning(`请选择文件 `)
              return
            }
          }
          this.documentDialogObj.show = false
          let data = {
            formType: this.documentDialogObj.formType,
            nodeData: this.documentDialogObj.nodeData,
            formData: this.documentFormData,
            fileInfo: this.fileInfo
          }
          this.$emit('commit', data)
        } else {
          return false
        }
      })
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
  top: 40%;
  left: 55%;
  transform: translate(-50%, -50%);
  // max-height: calc(100% - 200px);
  // max-width: calc(100% - 200px);
  max-height: calc(100% - 200px);
  max-width: 30%;
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 10px 20px 20px 20px;
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
</style>

<style lang="less" scoped>
.template-dialog {
  /deep/ .el-dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 10%);
    max-width: calc(100% - 80%);
    min-width: 350px;
    min-height: 300px;
  }
  /deep/ .el-select {
    width: 120px;
  }
}
.directory-dialog {
  /deep/ .el-dialog {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 10%);
    max-width: calc(100% - 80%);
    min-width: 350px;
    min-height: 200px;
  }
  /deep/ .el-select {
    width: 120px;
  }
}
.el-popover {
  padding-bottom: 0px;
}
</style>
