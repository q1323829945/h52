<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/document/document.vue
 * @Date         : 2022-03-14 11:23:30
 * @LastEditTime : 2022-06-28 13:39:04
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <app-main>
    <!-- 添加最外层文件夹， el-dropdown外层套div 加@click.stop， 阻止el-tree on-click-node事件冒泡-->
    <div style="display: inline-block; margin-top: -10px" @click.stop>
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button style="margin: 10px" type="primary">
          {{ $t('document.addFolder') }}
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-folder-add" :command="append({ folderType: documentTypeObj.baseDirectory }, documentTypeObj.directory)">
            {{ $t('document.baseFolder') }}
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-folder-add" :command="append({ folderType: documentTypeObj.templateDirectory }, documentTypeObj.directory)">
            {{ $t('document.templateFolder') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 树 -->
    <div class="tree_container">
      <el-tree v-loading="loading" class="tree" :data="treeData" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div>
            <i v-if="data.directoryPath" class="el-icon-folder-opened" style="font-size: 17px"></i>
            <span style="color: #999999">&nbsp;{{ node.label }}</span>
          </div>
          <span>
            <div class="right-view">
              <!-- 操作， el-dropdown外层套div 加@click.stop， 阻止el-tree on-click-node事件冒泡-->
              <div v-if="data.directoryPath" style="display: inline-block" @click.stop>
                <el-dropdown trigger="click" @command="handleCommand">
                  <div class="icon-button">
                    <i class="el-icon-plus"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <!-- 文件node -->
                    <el-dropdown-item
                      v-if="data.folderType == documentTypeObj.templateDirectory"
                      icon="el-icon-files"
                      :command="append(data, documentTypeObj.template)"
                    >
                      {{ $t('document.templateDocument') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="data.folderType == documentTypeObj.baseDirectory"
                      icon="el-icon-files"
                      :command="append(data, documentTypeObj.loanFileConfig)"
                    >
                      {{ $t('document.baseDocument') }}
                    </el-dropdown-item>
                    <!-- 文件夹node -->
                    <el-dropdown-item icon="el-icon-folder-add" :command="append(data, documentTypeObj.directory)">
                      {{ data.folderType == documentTypeObj.templateDirectory ? $t('document.templateFolder') : $t('document.baseFolder') }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- 下载 -->
              <div
                v-if="data.directoryId && data.folderType == documentTypeObj.templateDirectory"
                class="icon-button"
                @click.stop="() => download(node, data)"
              >
                <i class="el-icon-download"></i>
              </div>
              <!-- 修改 -->
              <div v-if="data.folderType == documentTypeObj.templateDirectory" class="icon-button" @click.stop="() => change(node, data)">
                <i class="el-icon-edit"></i>
              </div>
              <!-- 删除 -->
              <div class="icon-button" @click.stop="() => remove(node, data)">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </span>
        </span>
      </el-tree>
    </div>

    <!-- 文件弹窗 -->
    <Document-Dialog :documentDialogObj="documentDialogObj" @commit="commit" />

    <!-- 新增贷款配置弹窗 -->
    <popup-view v-if="addLoanFileConfigForm.dialogVisible" :title="$t('document.addBaseDocument')" @handle-close="handleClose" :width="'400px'">
      <div>
        <el-form :ref="addLoanFileConfigForm.refName" :model="addLoanFileConfigForm.data" :rules="rules">
          <div v-for="(item, key) in addLoanFileConfigForm.data" :key="key">
            <el-form-item :label="$t(addLoanFileConfigForm.labels[key])" :prop="`${key}`" :label-width="'160px'">
              <!-- 配置名称 -->
              <el-input v-if="key == 'name'" type="text" v-model="addLoanFileConfigForm.data.name"></el-input>
              <!-- 配置是否必选-->
              <div v-if="key == 'required'">
                <el-radio v-model="addLoanFileConfigForm.data.required" :label="true">{{ $t('configType.yes') }}</el-radio>
                <el-radio v-model="addLoanFileConfigForm.data.required" :label="false">{{ $t('configType.no') }}</el-radio>
              </div>
            </el-form-item>
          </div>
        </el-form>
        <div class="popup-footer">
          <el-button type="primary" @click="commit({ formType: 'loanFileConfig' })">{{ $t('button.confirm') }}</el-button>
        </div>
      </div>
    </popup-view>
  </app-main>
</template>

<script>
import utils from '@/utils'
import api from '@/server/api'
import DocumentDialog from './components/documentDialog.vue'
import PopupView from 'components/popupView'

export default {
  components: { DocumentDialog, PopupView },
  data() {
    return {
      loading: true,
      documentType: 'directory', // 添加类型，directory目录  template文件
      folderType: 'BASE',
      documentTypeObj: {
        directory: 'directory', // 目录
        template: 'template', // 模板文件
        loanFileConfig: 'loanFileConfig', // 贷款配置文件
        baseDirectory: 'BASE',
        templateDirectory: 'TEMPLATE'
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name' // 这里的名字要和封装的数据中的节点名字一样
      },
      addLoanFileConfigForm: {
        refName: 'addLoanFileConfigForm',
        dialogVisible: false,
        labels: {
          name: 'permission.name',
          required: 'permission.required'
        },
        data: {
          directoryId: '',
          name: '',
          required: true
        },
        nodeData: {}
      }, //formdata
      documentDialogObj: {
        show: false,
        title: 'ratePlan.rate'
      } // 文档弹窗
    }
  },
  computed: {
    rules() {
      // 表单验证
      const rules = {
        name: [{ required: true, message: this.$t('ratePlan.nameRule'), trigger: 'blur' }],
        required: [{ required: true, message: this.$t('login.passwordRule'), trigger: 'blur' }]
      }
      return rules
    }
  },
  created() {
    this.requstDocumentTemplateData()
  },
  methods: {
    /**
     * @description: 获取所有文件
     */
    requstDocumentTemplateData() {
      this.$api
        .fetch(
          'query_documentTemplateDirectory_jsons',
          {},
          {
            method: 'get',
            comm: {
              showMessage: true
            }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.treeData = this.getTreeData(data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 递归树
     * @param {*} data treeData
     * @return {*}
     */
    getTreeData(data) {
      let arr = []
      data.forEach(element1 => {
        let newData = {}
        newData.id = element1.id
        newData.name = element1.name
        newData.parentId = element1.parentId
        newData.directoryPath = element1.directoryPath
        newData.children = []
        newData.folderType = element1.directoryType // 文件夹类型

        // directory 有无目录
        if (element1.directory) {
          element1.directory.forEach(element2 => {
            let newData2 = {}
            newData2.id = element2.id
            newData2.name = element2.name
            newData2.parentId = element2.parentId
            newData2.directoryPath = element2.directoryPath
            newData2.children = []
            newData.children.children = []
            if (element2.directory) {
              newData2.children.children = this.getTreeData(element2.directory)
              if (element2.templates) {
                element2.templates.forEach(element2 => {
                  element2.folderType = element1.directoryType
                  element2.path = element1.directoryPath
                  newData2.children.children.push(element2)
                })
              }
            }
          })
          newData.children = this.getTreeData(element1.directory)
          // templates 有无目录
          if (element1.templates) {
            element1.templates.forEach(element2 => {
              element2.folderType = element1.directoryType // 文件夹类型
              element2.path = element1.directoryPath
              newData.children.push(element2)
            })
          }
        }
        arr.push(newData)
      })
      return arr
    },
    /**
     * @description: 请求文件夹增删改
     * @param {*} url
     * @param {*} param
     * @param {*} optionParam
     */
    requstHandleDocumentTemplateDirectoryData(loadingText, url, param, optionParam) {
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
          this.requstDocumentTemplateData()
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.$message.error(msg)
        })
    },
    /**
     * @description: 请求文件增删改
     * @param {*} url
     * @param {*} param
     * @param {*} optionParam
     */
    requstHandleDocumentTemplateData(loadingText, url, param, optionParam = {}) {
      const loading = this.$loading({
        lock: true,
        text: loadingText,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .fetchDocument(url, param, optionParam)
        .then(res => {
          if (loading) {
            loading.close()
          }
          if (optionParam.method !== 'get') {
            this.requstDocumentTemplateData()
          } else {
            utils.convertRes2Blob(res)
          }
        })
        .catch(msg => {
          if (loading) {
            loading.close()
          }
          this.$message.error(msg)
        })
    },
    handleClose() {
      this.addLoanFileConfigForm.dialogVisible = false
    },
    /**
     * @description: 添加文件目录、文件夹弹框
     * @param {*} command
     */
    handleCommand(command) {
      this.documentType = command.type
      if (this.documentType == this.documentTypeObj.directory) {
        this.folderType = command.data.folderType
        // 添加文件夹
        this.documentDialogObj.formType = 'directoryAdd'
        this.documentDialogObj.formData = { name: '' }
        this.documentDialogObj.nodeData = command.data
        this.documentDialogObj.title = this.folderType == this.documentTypeObj.baseDirectory ? 'document.addBaseFolder' : 'document.addTemplateFolder'
        this.documentDialogObj.show = true
      } else if (this.documentType == this.documentTypeObj.template) {
        // 添加模板文件
        this.documentDialogObj.formType = 'templateAdd'
        this.documentDialogObj.formData = { name: '', languageType: '', documentType: '' }
        this.documentDialogObj.nodeData = command.data
        this.documentDialogObj.title = 'document.addTemplateDocument'
        this.documentDialogObj.show = true
      } else if (this.documentType == this.documentTypeObj.loanFileConfig) {
        // 添加基础文件
        this.addLoanFileConfigForm.dialogVisible = true
        this.addLoanFileConfigForm.nodeData = command.data
        this.addLoanFileConfigForm.data.directoryId = command.data.id
      }
    },
    /********************************  tree节点操作 ********************************/
    /**
     * @description: 添加tree
     */
    append(data, type) {
      return {
        data: data,
        type: type
      }
    },
    /**
     * @description: 下载
     */
    download(node, data) {
      // 下载文件
      this.requstHandleDocumentTemplateData(
        this.$t('loading.download'),
        `${api.admin.query_downloadTemplate_jsons}/${data.id}`,
        {},
        {
          encrypt: 'download',
          method: 'get',
          responseType: 'arraybuffer'
        }
      )
    },

    /**
     * @description:修改tree
     */
    change(node, data) {
      if (utils.objKey(data, 'directoryId')) {
        // 修改文件
        this.documentDialogObj.formType = 'templateChange'
        this.documentDialogObj.formData = { name: data.name, languageType: data.languageType, documentType: data.documentType }
        this.documentDialogObj.nodeData = data
        this.documentDialogObj.title = 'document.modifyFile'
      } else {
        // 修改文件夹
        this.documentDialogObj.formType = 'directoryChange'
        this.documentDialogObj.formData = { name: data.name }
        this.documentDialogObj.nodeData = data
        this.documentDialogObj.title = 'document.modifyFolder'
      }
      this.documentDialogObj.show = true
    },
    /**
     * @description: 删除tree
     * @param {*} node
     * @param {*} data
     */
    remove(node, data) {
      let text = utils.objKey(data, 'directoryId') ? 'document.theFile' : 'document.theDirectory'
      this.$confirm(`${this.$t('document.deleteDialog')}${this.$t(text)}, ${this.$t('document.continue')}?`, this.$t('commonDialog.tips'), {
        confirmButtonText: this.$t('button.confirm'),
        cancelButtonText: this.$t('button.cancel'),
        type: 'warning'
      })
        .then(() => {
          if (utils.objKey(data, 'directoryId')) {
            if (data.folderType == this.documentTypeObj.baseDirectory) {
              // 删除基础文件
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
                  this.requstDocumentTemplateData()
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
              // 删除模板文件
              this.requstHandleDocumentTemplateData(
                this.$t('loading.delete'),
                `${api.admin.query_documentTemplate_jsons}/${data.id}`,
                {},
                {
                  method: 'delete'
                }
              )
            }
          } else {
            // 删除文件夹
            this.requstHandleDocumentTemplateDirectoryData(
              this.$t('loading.delete'),
              `${api.admin.query_documentTemplateDirectory_jsons}/${data.id}`,
              {},
              {
                method: 'delete'
              }
            )
          }
        })
        .catch(() => {})
    },
    /**
     * @description: 文件增改参数
     * @param {*} formData
     * @param {*} nodeData
     * @param {*} fileInfo
     * @param {*} type
     * @return {*} formData
     */
    setHandleDocumentTemplateParam(formData, nodeData, fileInfo = {}, type = 'add') {
      let template = {
        name: formData.name,
        directoryId: nodeData.id,
        languageType: formData.languageType,
        documentType: formData.documentType,
        directoryPath: type == 'change' ? nodeData.path : nodeData.directoryPath
      }
      if (type != 'add') {
        template.documentStoreReference = nodeData.documentStoreReference
      }
      let tempFormData = new FormData() // 创建form对象
      if (utils.objKey(fileInfo, 'raw')) {
        tempFormData.append('file', fileInfo.raw)
      }
      tempFormData.append(
        'template',
        new Blob([JSON.stringify(template)], {
          type: 'application/json'
        })
      )

      return tempFormData
    },
    /**
     * @description: 提交
     */
    commit(data) {
      const { formType, formData, nodeData, fileInfo } = data

      switch (formType) {
        case 'directoryAdd': // 添加文件夹
          {
            this.requstHandleDocumentTemplateDirectoryData(this.$t('loading.add'), 'query_documentTemplateDirectory_jsons', {
              name: formData.name,
              parentId: utils.isNull(nodeData.id) ? '' : nodeData.id,
              tenantId: 0,
              directoryType: this.folderType
            })
          }
          break
        case 'directoryChange': //修改文件夹
          {
            this.requstHandleDocumentTemplateDirectoryData(
              this.$t('loading.change'),
              `${api.admin.query_documentTemplateDirectory_jsons}/${nodeData.id}`,
              {
                id: nodeData.id,
                name: formData.name,
                tenantId: 0,
                directoryType: this.folderType
              },
              {
                method: 'put'
              }
            )
          }
          break
        case 'templateChange': {
          // 修改文件
          const tempFormData = this.setHandleDocumentTemplateParam(formData, nodeData, fileInfo, 'change')
          this.requstHandleDocumentTemplateData(this.$t('loading.change'), `${api.admin.query_documentTemplate_jsons}/${nodeData.id}`, tempFormData, {
            encrypt: 'upload',
            isRevise: true
          })
          break
        }
        case 'templateAdd': {
          // 添加文件
          const addFormData = this.setHandleDocumentTemplateParam(formData, nodeData, fileInfo, 'add')
          this.requstHandleDocumentTemplateData(this.$t('loading.add'), 'query_documentTemplate_jsons', addFormData, {
            encrypt: 'upload'
          })
          break
        }
        case 'loanFileConfig': {
          // 贷款文件配置
          this.$refs[`${this.addLoanFileConfigForm.refName}`].validate(valid => {
            if (valid) {
              this.addLoanFileConfigForm.dialogVisible = false
              const loading = this.$loading({
                lock: true,
                text: this.$t('loading.add'),
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              })
              this.$api
                .fetch('query_loanUploadConfigure_jsons', this.addLoanFileConfigForm.data)
                .then(() => {
                  this.requstDocumentTemplateData()
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
          break
        }
        default:
          break
      }
    },
    randomColor() {
      var str = '#'
      for (var i = 0; i < 6; i++) {
        str += Math.floor(Math.random() * 16).toString(16)
      }
      return str
    }
  }
}
</script>

<style lang="less" scoped>
.tree_container {
  // width: 500px;
  border-radius: 5px;
}
.right-view {
  display: flex;
  flex-direction: row;
  height: 40px;
  // background: salmon;
}
.icon-button {
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  // background: red;
}
</style>

<style lang="less">
.el-tree {
  /*改变高度*/
  .el-tree-node__content {
    margin-top: 10px;
    // height: 50px;
  }
  /*tree组件选中背景色修改 */
  // .el-tree-node.is-current > .el-tree-node__content {
  //   background-color: rgba(1, 68, 144, 0.5);
  // }
  .custom-tree-node {
    // margin-top: -30px;
    margin-right: 500px;
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    width: 50vw;
    // background: aqua;
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
