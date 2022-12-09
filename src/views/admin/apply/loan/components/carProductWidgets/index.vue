<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/apply/loan/components/carProductWidgets/index.vue
 * @Date         : 2022-12-01 13:41:01
 * @LastEditTime : 2022-12-02 17:29:49
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div class="detail-base">
    <el-form ref="carProductFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
      <!-- channel -->
      <div v-if="modelTemp.channel">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.channel.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 280, zh: 280 }), margin: '0px 10px 16px 0px' }"
              v-for="(channelItem, channelIndex) in widgetOpts.channel.widgets"
              :key="widgetOpts.channel.section + channelIndex"
              :label-width="setComputedWidth({ en: 60, zh: 60 })"
              :label="$t(channelItem.label)"
              :prop="`${[channelItem.key]}`"
            >
              <el-input
                v-if="channelItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.channel.section}`][channelItem.key]"
                :placeholder="$t(channelItem.placeholder)"
                :readonly="true"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- editStatus -->
      <!-- <div v-if="modelTemp.editStatus">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.editStatus.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(editStatusItem, editStatusIndex) in widgetOpts.editStatus.widgets"
              :key="widgetOpts.editStatus.section + editStatusIndex"
              :label-width="setComputedWidth({ en: 125, zh: 125 })"
              :label="$t(editStatusItem.label)"
              :prop="`${[editStatusItem.key]}`"
            >
              <el-input
                v-if="editStatusItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.editStatus.section}`]"
                :placeholder="$t(editStatusItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="editStatusItem.type === 'select'"
                v-model="modelTemp[editStatusItem.key]"
                :placeholder="$t(editStatusItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in editStatusItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div> -->

      <!-- personalInformation -->
      <div v-if="modelTemp.personalInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.personalInformation.title) }}
          </div>
          <!-- base info -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 345, zh: 345 }), margin: '0px 10px 16px 0px' }"
              v-for="(personalItem, personalIndex) in widgetOpts.personalInformation.widgets"
              :key="widgetOpts.personalInformation.section + personalIndex"
              :label-width="setComputedWidth({ en: 150, zh: 150 })"
              :label="$t(personalItem.label)"
              :prop="`${[personalItem.key]}`"
            >
              <el-input
                v-if="personalItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.personalInformation.section}`][personalItem.key]"
                :placeholder="$t(personalItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="personalItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.personalInformation.section}`][personalItem.key]"
                :placeholder="$t(personalItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in personalItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
              <el-date-picker
                :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                @input="$forceUpdate()"
                @change="getBirthDate"
                v-if="personalItem.type === 'date'"
                v-model="modelTemp[`${widgetOpts.personalInformation.section}`][personalItem.key]"
                :readonly="!isEdit"
                :format="personalItem.valueFormat || 'MM-dd-yyyy'"
                type="date"
                :placeholder="$t(personalItem.placeholder)"
              ></el-date-picker>
            </el-form-item>
          </div>

          <!-- .personalInformation.name -->
          <div v-if="modelTemp.personalInformation.name">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.personalInformation.name.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                  v-for="(nameItem, nameIndex) in widgetOpts.personalInformation.name.widgets"
                  :key="widgetOpts.personalInformation.name.title + nameIndex"
                  :label-width="setComputedWidth({ en: 90, zh: 90 })"
                  :label="$t(nameItem.label)"
                  :prop="`${[nameItem.key]}`"
                >
                  <el-input
                    v-if="nameItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.personalInformation.section}`][`${widgetOpts.personalInformation.name.key}`][nameItem.key]"
                    :placeholder="$t(nameItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .personalInformation.motherMaidenName -->
          <div v-if="modelTemp.personalInformation.motherMaidenName">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.personalInformation.motherMaidenName.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                  v-for="(motherMaidenNameItem, motherMaidenNameIndex) in widgetOpts.personalInformation.motherMaidenName.widgets"
                  :key="widgetOpts.personalInformation.motherMaidenName.title + motherMaidenNameIndex"
                  :label-width="setComputedWidth({ en: 90, zh: 90 })"
                  :label="$t(motherMaidenNameItem.label)"
                  :prop="`${[motherMaidenNameItem.key]}`"
                >
                  <el-input
                    v-if="motherMaidenNameItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.personalInformation.section}`][`${widgetOpts.personalInformation.motherMaidenName.key}`][
                        motherMaidenNameItem.key
                      ]
                    "
                    :placeholder="$t(motherMaidenNameItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- loanInformation -->
      <div v-if="modelTemp.loanInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.loanInformation.title) }}
          </div>
          <!-- 基础数据 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(loanInformationItem, loanInformationIndex) in widgetOpts.loanInformation.widgets"
              :key="widgetOpts.loanInformation.section + loanInformationIndex"
              :label-width="setComputedWidth({ en: 90, zh: 90 })"
              :label="$t(loanInformationItem.label)"
              :prop="`${[loanInformationItem.key]}`"
            >
              <el-input
                v-if="loanInformationItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.loanInformation.section}`][loanInformationItem.key]"
                :placeholder="$t(loanInformationItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="loanInformationItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.loanInformation.section}`][loanInformationItem.key]"
                :placeholder="$t(loanInformationItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in loanInformationItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- loanInformation.purpose -->
          <!-- <div class="subInfo-view">
            <div :span="8" v-for="(widgetItem, widgetIndex) in widgetOpts.loanInformation.purpose.widgets" :key="'purpose' + widgetIndex">
              <div v-if="widgetItem.type === 'checkbox'">
                <div class="section section-margin">
                  {{ $t(widgetOpts.loanInformation.purpose.title) }}
                </div>
                <el-form-item
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                  :label-width="setComputedWidth({ en: 119, zh: 119 })"
                  :prop="`.${[widgetItem.key]}`"
                >
                  <div style="margin-right: 20px; margin-top: 0px" slot="label">
                    <el-checkbox
                      :disabled="!isEdit"
                      :indeterminate="isFileIndeterminate"
                      v-model="checkFileAll"
                      @change="handleCheckBoxAllValue($event, widgetItem)"
                    >
                      {{ $t('button.checkAll') }}
                    </el-checkbox>
                  </div>
                  <el-checkbox-group :disabled="!isEdit" v-model="modelTemp.loanInformation.purpose" @change="getFileCheckboxValue">
                    <el-checkbox v-for="(item, index) in widgetItem.list" :key="'loanFile' + index" :label="item.value">
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          </div> -->
        </div>
        <el-divider></el-divider>
      </div>

      <el-divider></el-divider>
    </el-form>
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

<style scoped>
.detail-base >>> .el-cascader,
.el-date-picker {
  width: 100% !important;
}
/* .detail-base >>> .el-date-editor {
  width: 90% !important;
} */
.detail-base >>> .el-select,
.el-input {
  width: 100%;
}
.detail-base >>> .el-textarea {
  width: 88%;
}

/* 去掉select下拉箭头 */
/* .detail-base >>> .el-select__caret { */
/*很关键：将默认的select选择框样式清除*/
/* appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none; */
/*为下拉小箭头留出一点位置，避免被文字覆盖*/
/* padding-right: 14px;
} */
/*将小箭头的样式去去掉*/
/* .detail-base >>> .el-icon-arrow-up:before {
  content: '';
} */

.detail-base >>> .el-form-item {
  margin: 0px 30px 16px 0px;
  min-width: 200px;
  /* display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center; */
  /* background: blue; */
}
.detail-base >>> .el-form-item .el-form-item__label {
  float: left;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-width: 50px;
  width: 110px;
  word-break: break-word;
  font-size: 13px;
  height: 34px;
  justify-content: flex-end;
  align-items: center;
  /* background: gold; */
}
.detail-base >>> .el-form-item .el-form-item__content {
  margin-left: 0 !important;
  min-width: 80px;
  flex: 1;
}
.detail-base >>> .el-range-separator {
  padding: 0;
  width: 15px;
}

.detail-base >>> .el-divider {
  margin: 0;
}
.detail-base >>> .toolbar-section .el-form-item {
  margin-bottom: 0;
}
</style>
