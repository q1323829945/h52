<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/loan/components/loanProductDetail/index.vue
 * @Date         : 2022-04-21 11:06:51
 * @LastEditTime : 2022-10-09 16:49:31
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div class="detail-base">
    <div class="header">
      <el-button v-if="data.isEdit" type="primary" @click="handleCancelEdit">
        {{ !isEdit ? $t('button.edit') : $t('button.cancel') }}
      </el-button>
      <el-button v-if="data.isEdit && isEdit" style="margin-left: 15px" type="primary" @click="commit('productFormData')">
        {{ $t('button.save') }}
      </el-button>
    </div>
    <el-form
      ref="loanProductDetail"
      :rules="rules"
      :inline="true"
      :model="detailModelTemp"
      size="small"
      :label-width="labelWidth"
      @submit.native.prevent
    >
      <div v-for="(item, index) in detailOpts" :key="index">
        <div class="section-header">
          <div class="title">{{ $t(item.title) }}</div>
          <div v-if="item.section == 'feeFeatures'" class="add">
            <el-button
              v-if="isEdit"
              size="mini"
              type="primary"
              icon="el-icon-circle-plus-outline"
              circle
              plain
              @click="isEdit ? handlePush(item.section) : ''"
            ></el-button>
          </div>
        </div>
        <!-- 产品  -->
        <el-row v-if="item.section == 'loanProductType'">
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 300, zh: 275 }) }"
              v-for="(widgetItem, widgetIndex) in item.widgets"
              :key="widgetIndex"
              :label-width="setComputedWidth({ en: 105, zh: 80 })"
              :label="$t(widgetItem.label)"
              :prop="`.${[widgetItem.key]}`"
            >
              <el-input
                v-if="widgetItem.type === 'input'"
                @input="forceUpdate"
                v-model="detailModelTemp[widgetItem.key]"
                :disabled="!isEdit"
                :placeholder="$t(widgetItem.placeholder)"
                clearable
              />
              <el-select
                @change="forceUpdate"
                v-if="widgetItem.type === 'select'"
                v-model="detailModelTemp[widgetItem.key]"
                :placeholder="$t(widgetItem.placeholder)"
                clearable
                :disabled="true"
              >
                <el-option v-for="option in widgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </el-row>

        <!-- 利息-->
        <el-row v-if="item.section == 'interestFeature'">
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 350, zh: 310 }) }"
              v-for="(widgetItem, widgetIndex) in item.widgets"
              :key="widgetIndex"
              :label-width="setComputedWidth({ en: 160, zh: 115 })"
              :label="$t(widgetItem.label)"
              :prop="`.${[widgetItem.key]}`"
              :rules="{
                required: isEdit,
                message: `${$t(widgetItem.rules.message)}`,
                trigger: 'change'
              }"
            >
              <el-input
                v-if="widgetItem.type === 'input'"
                @input="formatNum(item.section, detailModelTemp[item.section][widgetItem.key], [widgetItem.key], widgetIndex)"
                v-model="detailModelTemp[widgetItem.key]"
                :disabled="!isEdit"
                :placeholder="$t(widgetItem.placeholder)"
                clearable
              />
              <el-select
                v-if="widgetItem.type === 'select'"
                style="width: 130px"
                @change="forceUpdate"
                v-model="detailModelTemp[widgetItem.key]"
                :placeholder="$t(widgetItem.placeholder)"
                :disabled="!isEdit"
                clearable
                :popper-append-to-body="false"
              >
                <el-option v-for="option in widgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
              <!-- <div v-if="widgetItem.key == 'ratePlanId'">{{ widgetItem.list[0] }}</div> -->
            </el-form-item>
          </div>
        </el-row>

        <!-- 选择贷款文件配置 -->
        <div v-if="item.section == 'questionnairesConfig'" :gutter="20">
          <div :span="item.span" v-for="(widgetItem, widgetIndex) in item.widgets" :key="'loanFileConfig' + widgetIndex">
            <!-- 文件已配置 -->
            <div v-if="questionnaireList.length > 0">
              <div v-if="widgetItem.type === 'checkbox'">
                <el-form-item
                  :style="{ width: setComputedWidth({ en: 800, zh: 800 }) }"
                  :label-width="setComputedWidth({ en: 119, zh: 100 })"
                  :prop="`.${[widgetItem.key]}`"
                  :rules="{
                    required: isEdit,
                    validator: validateQuestionnaires,
                    trigger: 'change'
                  }"
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
                  <el-checkbox-group :disabled="!isEdit" v-model="detailModelTemp.questionnaires" @change="getFileCheckboxValue">
                    <el-checkbox v-for="(item, index) in widgetItem.list" :key="'loanFile' + index" :label="item.value">
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
            <!-- 文件未配置 -->
            <div v-else style="margin-bottom: 15px">
              <el-button v-if="isEdit" type="primary" @click="routerLink('/dashboard/questionnaires')">
                {{ $t('loanProduct.questionnairesConfigButton') }}
              </el-button>
            </div>
          </div>
        </div>

        <!-- 线条 -->
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
.detail-base >>> .el-select,
.el-input,
.el-date-picker,
.el-cascader {
  width: 100% !important;
}
/* .detail-base >>> .el-date-editor {
  width: 90% !important;
} */
.detail-base >>> .el-form-item {
  margin: 0px 50px 16px 0px;
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
  min-width: 185px;
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
