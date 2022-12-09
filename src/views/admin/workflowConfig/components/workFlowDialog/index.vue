<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/workflowConfig/components/workFlowDialog/index.vue
 * @Date         : 2022-10-25 16:32:39
 * @LastEditTime : 2022-11-04 16:16:02
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div>
    <el-dialog :width="'70%'" v-if="workFlowDialogObj.show" :visible.sync="workFlowDialogObj.show" :close-on-click-modal="false" append-to-body>
      <div slot="title" class="custom-dialog-header">
        <div class="custom-dialog-title">{{ $t(workFlowDialogObj.title) }}</div>
      </div>
      <el-button v-if="showAdd" type="primary" icon="el-icon-circle-plus-outline" @click="hanleShowDialog('add')">{{ $t('button.add') }}</el-button>
      <!-- 列表 -->
      <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
        <!-- 类型 -->
        <template slot="type" slot-scope="slotProps">
          <div>{{ setTypeLabel(slotProps.data.type) }}</div>
        </template>
        <!-- status -->
        <template slot="status" slot-scope="slotProps">
          <div>{{ setStatusLabel(slotProps.data.status) }}</div>
        </template>
        <!-- start -->
        <template slot="start" slot-scope="slotProps">
          <div>{{ slotProps.data.start | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
        <!-- end -->
        <template slot="end" slot-scope="slotProps">
          <div>{{ slotProps.data.end | utcToBeijing(['y-m-d', 'h:i:s']) }}</div>
        </template>
        <!-- 操作 -->
        <template slot="handle" slot-scope="slotProps">
          <!-- 修改 -->
          <el-button :disabled="!showAdd" size="mini" type="text" @click="hanleShowDialog('change', slotProps.data)">
            {{ $t('button.change') }}
          </el-button>
          <!-- 删除提醒气泡 -->
          <el-popconfirm
            hide-icon
            :title="'Delete this event?'"
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            @cancel="slotProps.data.isDeleteVisible = false"
            @confirm="handDelete(slotProps.data)"
          >
            <el-button :disabled="!showAdd" style="margin-left: 20px" slot="reference" type="text">
              {{ $t('button.delete') }}
            </el-button>
          </el-popconfirm>
        </template>
      </public-table>

      <!-- 翻页 -->
      <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />

      <!-- 新增事件弹窗 -->
      <el-dialog
        v-if="addDialogVisible"
        :custom-class="'append-dialog'"
        :visible.sync="addDialogVisible"
        append-to-body
        :close-on-click-modal="false"
        @close="resetFields"
      >
        <div slot="title" class="custom-dialog-header">
          <div class="custom-dialog-title">{{ dialogType == 'Add' ? 'Add Workflow Event' : 'Modify Workflow Event' }}</div>
        </div>
        <div>
          <el-form style="margin-top: 30px" ref="addRateForm" :model="addFormData" :rules="addRules">
            <el-form-item
              style="margin-top: 30px"
              v-for="(item, key) in addFormData"
              :key="key"
              :label="$t(addFormLabel[key])"
              :prop="`${key}`"
              :label-width="'60px'"
            >
              <!-- 类型 -->
              <el-select v-if="key == 'type'" style="width: 190px" v-model="addFormData.type" :placeholder="$t('select.place')">
                <el-option v-for="item in eventTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
              </el-select>
              <!-- 排序 -->
              <el-input
                style="width: 190px"
                v-if="key == 'sort'"
                @input="formatNumber(addFormData.sort)"
                type="text"
                v-model="addFormData.sort"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="commit('addRateForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import index from './index.js'
export default {
  ...index
}
</script>
<style lang="less" scoped>
@import 'index.less';
</style>
