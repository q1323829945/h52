<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/channel/components/channelDialog/index.vue
 * @Date         : 2022-09-15 16:42:04
 * @LastEditTime : 2022-11-08 11:11:39
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div>
    <el-dialog :width="'70%'" v-if="dialogObj.show" :visible.sync="dialogObj.show" :close-on-click-modal="false" append-to-body>
      <div slot="title" class="custom-dialog-header">
        <div class="custom-dialog-title">{{ $t(dialogObj.title) }}</div>
      </div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible = true">{{ $t('button.add') }}</el-button>

      <!-- 协议列表 -->
      <public-table :table-head="tableHead" v-loading="loading" :table-data="tableData">
        <!-- agreementType -->
        <template slot="agreementType" slot-scope="slotProps">
          <div>{{ setAgreementType(slotProps.data.agreementType) }}</div>
        </template>
        <!-- fromDateTime -->
        <template slot="fromDateTime" slot-scope="slotProps">
          <div>{{ slotProps.data.fromDateTime | utcToBeijing }}</div>
        </template>
        <!-- toDateTime -->
        <template slot="toDateTime" slot-scope="slotProps">
          <div>{{ slotProps.data.toDateTime | utcToBeijing }}</div>
        </template>
        <!-- signedDate -->
        <template slot="signedDate" slot-scope="slotProps">
          <div>{{ slotProps.data.signedDate | utcToBeijing }}</div>
        </template>
        <!-- 操作 -->
        <template slot="operation" slot-scope="slotProps">
          <!-- 佣金协议 -->
          <el-button size="mini" type="text" @click="handLook(slotProps.data)">
            {{ 'Commission Agreement' }}
          </el-button>
        </template>
      </public-table>

      <!-- 新增议弹窗 -->
      <el-dialog v-if="addDialogVisible" custom-class="add-dialog" :visible.sync="addDialogVisible" append-to-body @close="resetFields">
        <div slot="title" class="custom-dialog-header">
          <div class="custom-dialog-title">{{ 'Add Agreement' }}</div>
        </div>

        <el-form style="margin-top: 10px" :inline="true" ref="addRateForm" :model="addFormData" :rules="addRules">
          <!-- 基础信息 -->
          <el-form-item
            style="margin-top: 10px"
            v-for="(item, key) in addFormData"
            :key="key"
            :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}（%)` : $t(addFormLabel[key])"
            :prop="`${key}`"
            :label-width="formLabelWidth"
          >
            <!-- 类型 -->
            <el-select v-if="key == 'agreementType'" style="width: 180px" v-model="addFormData.agreementType" :placeholder="$t('select.place')">
              <el-option v-for="item in agreementTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
            <!-- commissionMethodType -->
            <el-select
              v-if="key === 'commissionMethodType'"
              @change="handleSelectChange($event, -1, key)"
              v-model="addFormData.commissionMethodType"
              placeholder="Please select"
              clearable
            >
              <el-option v-for="option in commissionMethodTypeOpts" :key="option.value" :label="$t(option.label)" :value="option.value" />
            </el-select>
            <!-- 日期 -->
            <el-date-picker
              v-if="key == 'date'"
              v-model="addFormData.date"
              :editable="false"
              type="daterange"
              :range-separator="$t('date.to')"
              :start-placeholder="$t('date.startPlaceholde')"
              :end-placeholder="$t('date.endPlaceholder')"
              @change="hanldDateChange"
              format="MM-dd-yyyy"
            ></el-date-picker>
          </el-form-item>

          <!-- Add Record Status  -->
          <div>
            <div
              :style="{
                margin: '10px 0px',
                width: setLineWidth(),
                backgroundColor: '#dcdfe9',
                height: '1px'
              }"
            ></div>
            <el-button style="margin: 10px 0px 20px 20px" type="primary" @click="handlePush('Record')" class="el-icon-plus">
              {{ ' Record' }}
            </el-button>
            <!-- form item class="font-16 flex-warp" -->
            <el-row v-if="addFormData.recordList.length > 0" type="flex" :gutter="20">
              <!-- widget -->
              <div v-for="(feeFeaturesItem, feeFeaturesIndex) in addFormData.recordList" :key="'recordList' + feeFeaturesIndex">
                <div class="fee-view">
                  <div class="fee-delete">
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      icon="el-icon-delete"
                      circle
                      @click="handleDeleteCommission('Record', feeFeaturesIndex)"
                    ></el-button>
                  </div>
                  <el-form-item
                    v-for="(item, key) in feeFeaturesItem"
                    :key="key"
                    :style="{ width: setSysComputedWidth({ en: 390, zh: 390 }), margin: '-7px -20px 20px 0px', padding: '5px 0px' }"
                    :label-width="setComputedWidth({ en: 175, zh: 175 })"
                    :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}(%)` : $t(addFormLabel[key])"
                    :prop="`recordList.${[feeFeaturesIndex]}.${[key]}`"
                    :rules="{
                      required: true,
                      message: `${addFormLabel[key]} Do not empty`,
                      trigger: 'change'
                    }"
                  >
                    <!-- commissionCountRange -->
                    <el-input
                      v-if="key === 'commissionAmountRange'"
                      @input="formatNum(addFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="addFormData.recordList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionRatio -->
                    <el-input
                      v-if="key === 'commissionRatio'"
                      @input="formatNum(addFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="addFormData.recordList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionCountRange -->
                    <el-input
                      v-if="key === 'commissionCountRange'"
                      @input="formatNum(addFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="addFormData.recordList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionAmount -->
                    <el-input
                      v-if="key === 'commissionAmount'"
                      @input="formatNum(addFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="addFormData.recordList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                  </el-form-item>
                </div>
              </div>
            </el-row>
          </div>

          <!-- Add Approvaled Status  -->
          <div>
            <div
              :style="{
                margin: '10px 0px',
                width: setLineWidth(),
                backgroundColor: '#dcdfe9',
                height: '1px'
              }"
            ></div>
            <el-button style="margin: 10px 0px 20px 20px" type="primary" @click="handlePush('Approvaled')" class="el-icon-plus">
              {{ ' Approvaled' }}
            </el-button>
            <!-- form item class="font-16 flex-warp" -->
            <el-row v-if="addFormData.approvaledList.length > 0" type="flex" :gutter="20">
              <!-- widget -->
              <div v-for="(feeFeaturesItem, feeFeaturesIndex) in addFormData.approvaledList" :key="'approvaledList' + feeFeaturesIndex">
                <div class="fee-view">
                  <div class="fee-delete">
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      icon="el-icon-delete"
                      circle
                      @click="handleDeleteCommission('Approvaled', feeFeaturesIndex)"
                    ></el-button>
                  </div>
                  <el-form-item
                    v-for="(item, key) in feeFeaturesItem"
                    :key="key"
                    :style="{ width: setSysComputedWidth({ en: 390, zh: 390 }), margin: '-7px -20px 20px 0px', padding: '5px 0px' }"
                    :label-width="setComputedWidth({ en: 175, zh: 175 })"
                    :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}(%)` : $t(addFormLabel[key])"
                    :prop="`approvaledList.${[feeFeaturesIndex]}.${[key]}`"
                    :rules="{
                      required: true,
                      message: `${addFormLabel[key]} Do not empty`,
                      trigger: 'change'
                    }"
                  >
                    <el-input
                      v-if="key === 'commissionAmountRange'"
                      @input="formatNum(addFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="addFormData.approvaledList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionRatio -->
                    <el-input
                      v-if="key === 'commissionRatio'"
                      @input="formatNum(addFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="addFormData.approvaledList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionCountRange -->
                    <el-input
                      v-if="key === 'commissionCountRange'"
                      @input="formatNum(addFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="addFormData.approvaledList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionAmount -->
                    <el-input
                      v-if="key === 'commissionAmount'"
                      @input="formatNum(addFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="addFormData.approvaledList[feeFeaturesIndex][key]"
                      placeholder="Please input"
                      clearable
                    />
                  </el-form-item>
                </div>
              </div>
            </el-row>
          </div>
        </el-form>

        <div slot="footer" class="channel-dialog-footer">
          <el-button type="primary" @click="commit('addRateForm')">{{ $t('button.confirm') }}</el-button>
        </div>
      </el-dialog>

      <!-- 修改议弹窗 -->
      <el-dialog v-if="changeDialogVisible" custom-class="change-dialog" :visible.sync="changeDialogVisible" @close="resetFields" append-to-body>
        <div slot="title" class="custom-dialog-header">
          <div class="custom-dialog-title">{{ 'Commission Agreement' }}</div>
        </div>
        <el-form style="margin-top: 10px" :inline="true" ref="changeRateForm" :model="changeFormData">
          <!-- 基础信息 -->
          <el-form-item
            style="margin-top: 10px"
            v-for="(item, key) in changeFormData"
            :key="key"
            :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}（%)` : $t(addFormLabel[key])"
            :prop="`${key}`"
            :label-width="formLabelWidth"
          >
            <!-- 类型 -->
            <div v-if="key == 'agreementType'">
              <el-select style="width: 180px" :value="changeFormData.agreementType" :placeholder="$t('select.place')" :disabled="true">
                <el-option v-for="item in agreementTypeOpts" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
              </el-select>
            </div>
            <!-- commissionMethodType -->
            <el-select
              v-if="key === 'commissionMethodType'"
              v-model="changeFormData.commissionMethodType"
              placeholder="Please select"
              :disabled="true"
              clearable
            >
              <el-option v-for="option in commissionMethodTypeOpts" :key="option.value" :label="$t(option.label)" :value="option.value" />
            </el-select>
            <!-- 日期 -->
            <el-date-picker
              v-if="key == 'date'"
              :value="changeFormData.date"
              type="daterange"
              :range-separator="$t('date.to')"
              :start-placeholder="$t('date.startPlaceholde')"
              :end-placeholder="$t('date.endPlaceholder')"
              :disabled="true"
              format="MM-dd-yyyy"
              @change="hanldDateChange"
            ></el-date-picker>
          </el-form-item>
          <!-- Record Status  -->
          <div>
            <div
              :style="{
                margin: '10px 0px',
                width: setLineWidth(),
                backgroundColor: '#dcdfe9',
                height: '1px'
              }"
            ></div>
            <el-button style="margin: 10px 0px 20px 20px" type="primary" @click="handlePush('Record')" class="el-icon-plus" :disabled="true">
              {{ ' Record' }}
            </el-button>
            <!-- form item class="font-16 flex-warp" -->
            <el-row v-if="changeFormData.recordList.length > 0" type="flex" :gutter="20">
              <!-- widget -->
              <div v-for="(feeFeaturesItem, feeFeaturesIndex) in changeFormData.recordList" :key="'recordList' + feeFeaturesIndex">
                <div class="fee-view">
                  <div class="fee-delete">
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      icon="el-icon-delete"
                      circle
                      @click="handleDeleteCommission('Record', feeFeaturesIndex)"
                    ></el-button>
                  </div>
                  <el-form-item
                    v-for="(item, key) in feeFeaturesItem"
                    :key="key"
                    :style="{ width: setSysComputedWidth({ en: 390, zh: 390 }), margin: '-7px -20px 20px 0px', padding: '5px 0px' }"
                    :label-width="setComputedWidth({ en: 175, zh: 175 })"
                    :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}(%)` : $t(addFormLabel[key])"
                    :prop="`recordList.${[feeFeaturesIndex]}.${[key]}`"
                    :rules="{
                      required: true,
                      message: `${addFormLabel[key]} Do not empty`,
                      trigger: 'change'
                    }"
                  >
                    <!-- commissionCountRange -->
                    <el-input
                      v-if="key === 'commissionAmountRange'"
                      @input="formatNum(changeFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="changeFormData.recordList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionRatio -->
                    <el-input
                      v-if="key === 'commissionRatio'"
                      @input="formatNum(changeFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="changeFormData.recordList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionCountRange -->
                    <el-input
                      v-if="key === 'commissionCountRange'"
                      @input="formatNum(changeFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="changeFormData.recordList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionAmount -->
                    <el-input
                      v-if="key === 'commissionAmount'"
                      @input="formatNum(changeFormData.recordList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Record')"
                      v-model="changeFormData.recordList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                  </el-form-item>
                </div>
              </div>
            </el-row>
          </div>
          <!-- Approvaled Status  -->
          <div>
            <div
              :style="{
                margin: '10px 0px',
                width: setLineWidth(),
                backgroundColor: '#dcdfe9',
                height: '1px'
              }"
            ></div>
            <el-button style="margin: 10px 0px 20px 20px" type="primary" @click="handlePush('Record')" class="el-icon-plus" :disabled="true">
              {{ ' Approvaled' }}
            </el-button>
            <!-- form item class="font-16 flex-warp" -->
            <el-row v-if="changeFormData.approvaledList.length > 0" type="flex" :gutter="20">
              <!-- widget -->
              <div v-for="(feeFeaturesItem, feeFeaturesIndex) in changeFormData.approvaledList" :key="'approvaledList' + feeFeaturesIndex">
                <div class="fee-view">
                  <div class="fee-delete">
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      icon="el-icon-delete"
                      circle
                      @click="handleDeleteCommission('Approvaled', feeFeaturesIndex)"
                    ></el-button>
                  </div>
                  <el-form-item
                    v-for="(item, key) in feeFeaturesItem"
                    :key="key"
                    :style="{ width: setSysComputedWidth({ en: 390, zh: 390 }), margin: '-7px -20px 20px 0px', padding: '5px 0px' }"
                    :label-width="setComputedWidth({ en: 175, zh: 175 })"
                    :label="key == 'commissionRatio' ? `${$t(addFormLabel[key])}(%)` : $t(addFormLabel[key])"
                    :prop="`approvaledList.${[feeFeaturesIndex]}.${[key]}`"
                    :rules="{
                      required: true,
                      message: `${addFormLabel[key]} Do not empty`,
                      trigger: 'change'
                    }"
                  >
                    <!-- commissionCountRange -->
                    <el-input
                      v-if="key === 'commissionAmountRange'"
                      @input="formatNum(changeFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="changeFormData.approvaledList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionRatio -->
                    <el-input
                      v-if="key === 'commissionRatio'"
                      @input="formatNum(changeFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="changeFormData.approvaledList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionCountRange -->
                    <el-input
                      v-if="key === 'commissionCountRange'"
                      @input="formatNum(changeFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="changeFormData.approvaledList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                    <!-- commissionAmount -->
                    <el-input
                      v-if="key === 'commissionAmount'"
                      @input="formatNum(changeFormData.approvaledList[feeFeaturesIndex][key], key, feeFeaturesIndex, 'Approvaled')"
                      v-model="changeFormData.approvaledList[feeFeaturesIndex][key]"
                      :disabled="true"
                      placeholder="Please input"
                      clearable
                    />
                  </el-form-item>
                </div>
              </div>
            </el-row>
          </div>
        </el-form>
      </el-dialog>
    </el-dialog>

    <!-- 翻页 -->
    <pagination :sum-total="sumTotal" @handle-size="handlePageSize" @handle-current="handlePageCurrent" />
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 200px);
  max-width: calc(100% - 30px);
  background: white;
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
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 10px 20px 20px 20px;
}
.el-dialog.add-dialog.el-dialog__body {
  flex: 1;
  overflow: auto;
  padding: 10px 20px 0px 20px;
}
.channel-dialog-footer {
  padding: 20px 0px 0px 0px;
  box-shadow: 0px -10px 10px -10px #dcdfe9;
}
</style>
