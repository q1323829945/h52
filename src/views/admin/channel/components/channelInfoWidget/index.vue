<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/channel/components/channelInfoWidget/index.vue
 * @Date         : 2022-05-05 10:32:39
 * @LastEditTime : 2022-12-05 14:25:28
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div class="detail-base">
    <el-form ref="channelInfoFormData" :rules="rules" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
      <!--  信息 -->
      <div>
        <div class="datasource">
          <div class="section">{{ widgetOpts.information.title }}</div>
          <div>
            <el-form-item
              v-for="(infoWidgetItem, infoWidgetIndex) in widgetOpts.information.widgets"
              :key="'rule' + infoWidgetIndex"
              :style="{ width: setSysComputedWidth({ en: 410, zh: 410 }), margin: '0px 10px 16px 0px' }"
              :label="$t(infoWidgetItem.label)"
              :label-width="setComputedWidth({ en: 200, zh: 200 })"
              :prop="`${[infoWidgetItem.key]}`"
              :rules="{
                required: isEdit,
                message: `${$t(infoWidgetItem.rules.message)}`,
                trigger: 'blur'
              }"
            >
              <!--                 :disabled="!isEdit" -->
              <el-input
                v-if="infoWidgetItem.type === 'input'"
                v-model="modelTemp[infoWidgetItem.key]"
                :disabled="isNewAdd ? false : true"
                :placeholder="$t(infoWidgetItem.placeholder)"
                clearable
              />
              <el-date-picker
                style="width: 111%"
                v-if="infoWidgetItem.type === 'date'"
                @input="$forceUpdate()"
                v-model="modelTemp[infoWidgetItem.key]"
                :value-format="infoWidgetItem.valueFormat || 'yyyy-MM-dd'"
                type="date"
                :disabled="isNewAdd ? false : true"
                :placeholder="$t(infoWidgetItem.placeholder)"
                :format="'MM-dd-yyyy'"
              ></el-date-picker>
              <el-select
                v-if="infoWidgetItem.type === 'select'"
                v-model="modelTemp[infoWidgetItem.key]"
                :placeholder="$t(infoWidgetItem.placeholder)"
                :disabled="isNewAdd ? false : true"
                clearable
              >
                <el-option v-for="option in infoWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>

      <!-- channelIdentification -->
      <div v-if="modelTemp.channelIdentification">
        <el-divider></el-divider>
        <div class="datasource">
          <div class="section">
            {{ widgetOpts.channelIdentification.title }}
            <el-button
              v-if="isNewAdd ? true : isEdit"
              size="mini"
              type="primary"
              icon="el-icon-circle-plus-outline"
              circle
              plain
              @click="isEdit ? handlePush({ section: widgetOpts.channelIdentification.section }) : ''"
            ></el-button>
          </div>
          <!-- 组件 -->
          <div
            class="paramsItem"
            v-for="(channelIdItem, channelIdIndex) in widgetOpts.channelIdentification.channelIdentificationWidgets"
            :key="'channelId' + channelIdIndex"
          >
            <!-- 删除 -->
            <div v-if="isNewAdd ? true : isEdit" class="delete-datasource">
              <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                circle
                @click="handleDeleteDatasource({ section: widgetOpts.channelIdentification.section, sectionIndex: channelIdIndex })"
              ></el-button>
            </div>
            <!-- 表单内组件 -->
            <el-form-item
              :style="{ width: setComputedWidth({ en: 370, zh: 370 }) }"
              v-for="(idWidgetItem, idIWidgetndex) in channelIdItem"
              :key="'idWidget' + idIWidgetndex"
              :label-width="setComputedWidth({ en: 130, zh: 130 })"
              :label="$t(idWidgetItem.label)"
              :prop="`${widgetOpts.channelIdentification.section}.${[channelIdIndex]}.${[idWidgetItem.key]}`"
              :rules="{
                required: isEdit,
                message: `${$t(idWidgetItem.rules.message)}`,
                trigger: 'change'
              }"
            >
              <el-input
                v-if="idWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.channelIdentification.section}`][channelIdIndex][idWidgetItem.key]"
                :disabled="!isEdit"
                :placeholder="$t(idWidgetItem.placeholder)"
                clearable
              />
              <el-select
                v-if="idWidgetItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.channelIdentification.section}`][channelIdIndex][idWidgetItem.key]"
                :placeholder="$t(idWidgetItem.placeholder)"
                :disabled="!isEdit"
                clearable
              >
                <el-option v-for="option in idWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>

      <!-- channelCast -->
      <div v-if="modelTemp.channelCast">
        <el-divider></el-divider>
        <div class="datasource">
          <div class="section">
            {{ widgetOpts.channelCast.title }}
          </div>
          <div>
            <el-form-item
              v-for="(channelCastWidgetItem, channelCastWidgetIndex) in widgetOpts.channelCast.widgets"
              :key="'channelCast' + channelCastWidgetIndex"
              :style="{ width: setSysComputedWidth({ en: 280, zh: 280 }), margin: '0px 10px 16px 0px' }"
              :label="$t(channelCastWidgetItem.label)"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
              :prop="`${widgetOpts.channelCast.section}.${[channelCastWidgetItem.key]}`"
              :rules="{
                required: isEdit,
                message: `${$t(channelCastWidgetItem.rules.message)}`,
                trigger: 'change'
              }"
            >
              <el-input
                v-if="channelCastWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.channelCast.section}`][channelCastWidgetItem.key]"
                :disabled="isNewAdd ? false : true"
                :placeholder="$t(channelCastWidgetItem.placeholder)"
                clearable
              />
              <el-cascader
                v-if="channelCastWidgetItem.type === 'cascader'"
                v-model="cascaderData"
                :options="castTypeList"
                :disabled="isNewAdd ? false : true"
                clearable
                :props="optionProps"
                @change="handleChangeCascader"
              ></el-cascader>
            </el-form-item>
          </div>
        </div>
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

// el-input为数字时隐藏右边小箭头
/deep/input::-webkit-outer-spin-button,
/deep/input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/deep/input[type='number'] {
  -moz-appearance: textfield;
}
</style>

<style scoped>
.detail-base >>> .el-select,
.el-cascader {
  width: 100% !important;
}
/* .detail-base >>> .el-date-editor {
  width: 90% !important;
} */
.detail-base >>> .el-date-picker {
  width: 100%;
}
.detail-base >>> .el-input {
  width: 120%;
}
.detail-base >>> .el-form-item {
  margin: 0px 50px 16px 0px;
  min-width: 340px;
  /* display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;*/
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
