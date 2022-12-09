<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/components/kabuhayanProductWidgets/index.vue
 * @Date         : 2022-08-12 16:06:34
 * @LastEditTime : 2022-11-02 10:48:50
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<!--  -->
<template>
  <div class="detail-base">
    <el-form ref="kabuhayanProductWidgetsFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
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

      <!-- editStatus & signature -->
      <div v-if="modelTemp.editStatus">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.editStatus.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
              v-for="(editStatusItem, editStatusIndex) in widgetOpts.editStatus.widgets"
              :key="widgetOpts.editStatus.section + editStatusIndex"
              :label-width="setComputedWidth({ en: 90, zh: 90 })"
              :label="$t(editStatusItem.label)"
              :prop="`${[editStatusItem.key]}`"
            >
              <el-input
                v-if="editStatusItem.type === 'input'"
                v-model="modelTemp[editStatusItem.key]"
                :placeholder="$t(editStatusItem.placeholder)"
                :readonly="true"
                clearable
              />
              <el-select
                v-if="editStatusItem.type === 'select'"
                v-model="modelTemp[editStatusItem.key]"
                :placeholder="$t(editStatusItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in editStatusItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- personalInformation -->
      <div v-if="modelTemp.personalInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.personalInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(personalItem, personalIndex) in widgetOpts.personalInformation.widgets"
              :key="widgetOpts.personalInformation + personalIndex"
              :label-width="setComputedWidth({ en: 90, zh: 90 })"
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
        </div>
        <el-divider></el-divider>
      </div>

      <!-- companyInformation -->
      <div v-if="modelTemp.companyInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.companyInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(companyItem, companyIndex) in widgetOpts.companyInformation.widgets"
              :key="widgetOpts.companyInformation + companyIndex"
              :label-width="setComputedWidth({ en: 120, zh: 120 })"
              :label="$t(companyItem.label)"
              :prop="`${[companyItem.key]}`"
            >
              <el-input
                v-if="companyItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.companyInformation.section}`][companyItem.key]"
                :placeholder="$t(companyItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>

          <!-- companyInformation.address -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.companyInformation.address">
            <div class="section section-margin">
              {{ $t(widgetOpts.companyInformation.address.title) }}
            </div>
            <div>
              <el-form-item
                :style="{
                  width: setSysComputedWidth({
                    en: '100%',
                    zh: '100%'
                  }),
                  margin: '0px 10px 16px 0px'
                }"
                v-for="(addressItem, addressIndex) in widgetOpts.companyInformation.address.widgets"
                :key="widgetOpts.companyInformation.address.title + addressIndex"
                :label-width="setComputedWidth({ en: 280, zh: 280 })"
                :label="$t(addressItem.label)"
                :prop="`${[addressItem.key]}`"
              >
                <el-input
                  v-if="addressItem.type === 'input'"
                  :type="addressItem.inputType ? addressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="modelTemp[`${widgetOpts.companyInformation.section}`][`${widgetOpts.companyInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="addressItem.type === 'select'"
                  :value="modelTemp[`${widgetOpts.companyInformation.section}`][`${widgetOpts.companyInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  ref="kycSelect"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in addressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- companyInformation.stay -->
            <div v-if="modelTemp.companyInformation.address.stay">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.companyInformation.address.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.companyInformation.address.stay.widgets"
                  :key="widgetOpts.companyInformation.address.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.companyInformation.section}`][`${widgetOpts.companyInformation.address.key}`][
                        `${widgetOpts.companyInformation.address.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- companyInformation.contact -->
            <div v-if="modelTemp.companyInformation.address.contact">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.companyInformation.address.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.companyInformation.address.contact.widgets"
                  :key="widgetOpts.companyInformation.address.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.companyInformation.section}`][`${widgetOpts.companyInformation.address.key}`][
                        `${widgetOpts.companyInformation.address.contact.key}`
                      ][contactWidgetItem.key]
                    "
                    :placeholder="$t(contactWidgetItem.placeholder)"
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
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(loanItem, loanIndex) in widgetOpts.loanInformation.widgets"
              :key="widgetOpts.loanInformation.section + loanIndex"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
              :label="$t(loanItem.label)"
              :prop="`${[loanItem.key]}`"
            >
              <el-input
                v-if="loanItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.loanInformation.section}`][loanItem.key]"
                :placeholder="$t(loanItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="loanItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.loanInformation.section}`][loanItem.key]"
                :placeholder="$t(loanItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in loanItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- .loanInformation.Purpose -->
          <div v-if="modelTemp.loanInformation.purpose">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.loanInformation.purpose.title) }}
              </div>
              <el-form-item
                v-for="(widgetItem, widgetIndex) in widgetOpts.loanInformation.purpose.widgets"
                :key="'purpose' + widgetIndex"
                :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                :label-width="setComputedWidth({ en: 115, zh: 115 })"
                :prop="`.${[widgetItem.key]}`"
              >
                <div style="margin-right: 20px; margin-top: 0px" slot="label">
                  <el-checkbox
                    :disabled="!isEdit"
                    :indeterminate="widgetOpts.loanInformation.purpose.isFileIndeterminate"
                    v-model="widgetOpts.loanInformation.purpose.checkFileAll"
                    @change="handleCheckBoxAllValue($event, 'purpose', widgetItem)"
                  >
                    {{ $t('button.checkAll') }}
                  </el-checkbox>
                </div>
                <el-checkbox-group :disabled="!isEdit" v-model="modelTemp.loanInformation.purpose" @change="getFileCheckboxValue($event, 'purpose')">
                  <el-checkbox v-for="(item, index) in widgetItem.list" :key="'loanFile' + index" :label="item.value">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- questionnaires -->
      <div v-if="modelTemp.questionnaire">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.questionnaires.title) }}
          </div>
          <!-- base info -->
          <div
            :class="questionnairesIndex == 0 ? 'subInfo-view subInfo-textarea' : 'subInfo-view subInfo-margin subInfo-textarea'"
            v-for="(questionnairesItem, questionnairesIndex) in widgetOpts.questionnaires.questionnairesWidgets"
            :key="widgetOpts.questionnaires.section + questionnairesIndex"
          >
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 10px 16px 0px' }"
              v-for="(widgetsItem, widgetsIndex) in questionnairesItem"
              :key="'question' + widgetsIndex"
              :label-width="setComputedWidth({ en: 70, zh: 70 })"
              :label="$t(widgetsItem.label)"
              :prop="`${[widgetsItem.key]}`"
            >
              <el-input
                :style="{ width: '100%' }"
                v-if="widgetsItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.questionnaires.section}`][questionnairesIndex][widgetsItem.key]"
                :placeholder="$t(widgetsItem.placeholder)"
                :type="widgetsItem.inputType || 'text'"
                :readonly="!isEdit"
                :autosize="{ minRows: 1, maxRows: 4 }"
                clearable
              />
              <el-radio-group
                v-if="widgetsItem.type === 'select'"
                :disabled="!isEdit"
                v-model="modelTemp[`${widgetOpts.questionnaires.section}`][questionnairesIndex][widgetsItem.key]"
              >
                <el-radio v-for="(radioItem, radioIndex) in widgetsItem.list" :label="radioItem.value" :key="radioIndex">
                  {{ $t(radioItem.label) }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
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
/* .detail-base >>> .el-textarea {
  width: 88%;
} */

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
  margin-left: 0;
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
