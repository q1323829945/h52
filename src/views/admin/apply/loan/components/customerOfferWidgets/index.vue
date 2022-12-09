<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/customerOffer/components/customerOfferWidgets/index.vue
 * @Date         : 2022-05-10 10:54:42
 * @LastEditTime : 2022-06-15 10:04:26
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div class="detail-base">
    <el-form ref="customerOfferFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
      <!-- underwriting -->
      <div v-if="modelTemp.underwriting">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.underwriting.title) }}
            <el-button v-if="modelTemp.editStatus == 'SUBMIT'" type="primary" @click="handleEdit">
              {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
            </el-button>
            <el-button v-if="isEdit" type="primary" @click="handleSave">{{ `${$t('button.save')}` }}</el-button>
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 340, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(underwritingWidgetItem, underwritingWidgetIndex) in widgetOpts.underwriting.widgets"
              :key="widgetOpts.underwriting.section + underwritingWidgetIndex"
              :label-width="setComputedWidth({ en: 145, zh: 75 })"
              :label="$t(underwritingWidgetItem.label)"
              :prop="`${[underwritingWidgetItem.key]}`"
            >
              <el-input
                v-if="underwritingWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.underwriting.section}`][underwritingWidgetItem.key]"
                :placeholder="$t(underwritingWidgetItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  loan -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.loan.title) }}</div>
          <div v-if="modelTemp.loan">
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 260, zh: 250 }) }"
              v-for="(loanWidgetItem, loanWidgetIndex) in widgetOpts.loan.widgets"
              :key="widgetOpts.loan.section + loanWidgetIndex"
              :label-width="setComputedWidth({ en: 65, zh: 50 })"
              :label="$t(loanWidgetItem.label)"
              :prop="`${[loanWidgetItem.key]}`"
            >
              <el-input
                v-if="loanWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.loan.section}`][loanWidgetItem.key]"
                :placeholder="$t(loanWidgetItem.placeholder)"
                readonly
                clearable
              />
              <el-select
                v-if="loanWidgetItem.type === 'select'"
                :value="modelTemp[`${widgetOpts.loan.section}`][loanWidgetItem.key]"
                :placeholder="$t(loanWidgetItem.placeholder)"
                ref="loanSelect"
                @visible-change="closeCustomerOfferSelect($event, 'loanSelect')"
                readonly
              >
                <el-option v-for="option in loanWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  product -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.product.title) }}</div>
          <div v-if="modelTemp.product">
            <el-form-item
              :style="{
                width: setSysComputedWidth({
                  en: productWidgetItem.key == 'amountSection' || productWidgetItem.key == 'termSection' ? 570 : 320,
                  zh: 340
                }),
                margin: '0px 10px 16px 0px'
              }"
              v-for="(productWidgetItem, productWidgetIndex) in widgetOpts.product.widgets"
              :key="widgetOpts.product.section + productWidgetIndex"
              :label-width="
                setComputedWidth({
                  en: productWidgetItem.key == 'amountSection' || productWidgetItem.key == 'termSection' ? 300 : 95,
                  zh: productWidgetItem.key == 'amountSection' || productWidgetItem.key == 'termSection' ? 130 : 90
                })
              "
              :label="$t(productWidgetItem.label)"
              :prop="`${[productWidgetItem.key]}`"
            >
              <el-input
                v-if="productWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.product.section}`][productWidgetItem.key]"
                :placeholder="$t(productWidgetItem.placeholder)"
                readonly
                clearable
              />
              <el-select
                v-if="productWidgetItem.type === 'select'"
                :value="modelTemp[`${widgetOpts.product.section}`][productWidgetItem.key]"
                :placeholder="$t(productWidgetItem.placeholder)"
                ref="productSelect"
                @visible-change="closeCustomerOfferSelect($event, 'productSelect')"
                readonly
              >
                <el-option v-for="option in loanWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
              <!-- 金额 -->
              <div v-if="productWidgetItem.type === 'amountSection'" class="sectionInput-view">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="modelTemp[`${widgetOpts.product.section}`]['amountConfiguration']['maxValueRange']"
                  placement="top-start"
                >
                  <el-input
                    v-model="modelTemp[`${widgetOpts.product.section}`]['amountConfiguration']['maxValueRange']"
                    :placeholder="$t(productWidgetItem.placeholder)"
                    readonly
                    clearable
                  />
                </el-tooltip>
                &nbsp;{{ '—' }}&nbsp;
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="modelTemp[`${widgetOpts.product.section}`]['amountConfiguration']['minValueRange']"
                  placement="top-start"
                >
                  <el-input
                    v-model="modelTemp[`${widgetOpts.product.section}`]['amountConfiguration']['minValueRange']"
                    :placeholder="$t(productWidgetItem.placeholder)"
                    readonly
                    clearable
                  />
                </el-tooltip>
              </div>
              <!-- 期限 -->
              <div v-if="productWidgetItem.type === 'termSection'" class="sectionInput-view">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="setTermMaxValue(modelTemp[`${widgetOpts.product.section}`]['termConfiguration']['maxValueRange'])"
                  placement="top-start"
                >
                  <div class="term-label">
                    {{ setTermMaxValue(modelTemp[`${widgetOpts.product.section}`]['termConfiguration']['maxValueRange']) }}
                  </div>
                </el-tooltip>
                &nbsp;{{ '—' }}&nbsp;
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="setTermMaxValue(modelTemp[`${widgetOpts.product.section}`]['termConfiguration']['minValueRange'])"
                  placement="top-start"
                >
                  <div class="term-label">
                    {{ setTermMaxValue(modelTemp[`${widgetOpts.product.section}`]['termConfiguration']['minValueRange']) }}
                  </div>
                </el-tooltip>
                <!-- <el-input
                  :value="`${transformLoanTerm(modelTemp[`${widgetOpts.product.section}`]['termConfiguration']['maxValueRange'])}`"
                  :placeholder="$t(productWidgetItem.placeholder)"
                  readonly
                  clearable
                />
                &nbsp;{{ '—' }}&nbsp;
                <el-input
                  v-model="modelTemp[`${widgetOpts.product.section}`]['termConfiguration']['maxValueRange']"
                  :placeholder="$t(productWidgetItem.placeholder)"
                  readonly
                  clearable
                /> -->
              </div>
            </el-form-item>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  company detail -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.detail.title) }}</div>
          <div v-if="modelTemp.detail">
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 360, zh: 340 }), margin: '0px 10px 16px 0px' }"
              v-for="(detailWidgetItem, detailWidgetIndex) in widgetOpts.detail.widgets"
              :key="widgetOpts.detail.section + detailWidgetIndex"
              :label-width="setComputedWidth({ en: 150, zh: 90 })"
              :label="$t(detailWidgetItem.label)"
              :prop="`${[detailWidgetItem.key]}`"
            >
              <el-input
                v-if="detailWidgetItem.type === 'input'"
                :type="detailWidgetItem.inputType ? detailWidgetItem.inputType : 'text'"
                :autosize="{ minRows: 1, maxRows: 3 }"
                resize="none"
                v-model="modelTemp[`${widgetOpts.detail.section}`][detailWidgetItem.key]"
                :placeholder="$t(detailWidgetItem.placeholder)"
                readonly
                clearable
              />
              <el-select
                v-if="detailWidgetItem.type === 'select'"
                :value="modelTemp[`${widgetOpts.detail.section}`][detailWidgetItem.key]"
                :placeholder="$t(detailWidgetItem.placeholder)"
                ref="detailSelect"
                @visible-change="closeCustomerOfferSelect($event, 'detailSelect')"
                readonly
              >
                <el-option v-for="option in detailWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  contact -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.contact.title) }}</div>
          <div v-if="modelTemp.contact">
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 350, zh: 320 }), margin: '0px 0px 16px 0px' }"
              v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.contact.widgets"
              :key="widgetOpts.contact.section + contactWidgetIndex"
              :label-width="setComputedWidth({ en: 100, zh: 65 })"
              :label="$t(contactWidgetItem.label)"
              :prop="`${[contactWidgetItem.key]}`"
            >
              <el-input
                v-if="contactWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.contact.section}`][contactWidgetItem.key]"
                :placeholder="$t(contactWidgetItem.placeholder)"
                readonly
                clearable
              >
                <template slot="prepend" v-if="contactWidgetItem.key == 'mobileNumber'">
                  <div style="width: 10px">{{ modelTemp.contact.mobileArea }}</div>
                </template>
              </el-input>
            </el-form-item>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  referenceAccount -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.referenceAccount.title) }}</div>
          <div v-if="modelTemp.referenceAccount">
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 285 }), margin: '0px 10px 16px 0px' }"
              v-for="(accountWidgetItem, accountWidgetIndex) in widgetOpts.referenceAccount.widgets"
              :key="widgetOpts.referenceAccount.section + accountWidgetIndex"
              :label-width="setComputedWidth({ en: 95, zh: 73 })"
              :label="$t(accountWidgetItem.label)"
              :prop="`${[accountWidgetItem.key]}`"
            >
              <el-input
                v-if="accountWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.referenceAccount.section}`][accountWidgetItem.key]"
                :placeholder="$t(accountWidgetItem.placeholder)"
                readonly
                clearable
              />
            </el-form-item>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  guarantor -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.guarantor.title) }}</div>
          <div v-if="modelTemp.guarantor">
            <!-- primaryGuarantor 主要担保人-->
            <div>
              <el-form-item
                :style="{ width: setComputedWidth({ en: 390, zh: 290 }) }"
                v-for="(primaryWidgetItem, primaryWidgetIndex) in widgetOpts.guarantor.primaryGuarantorWidgets"
                :key="widgetOpts.guarantor.section + 'primary' + primaryWidgetIndex"
                :label-width="setComputedWidth({ en: 145, zh: 80 })"
                :label="$t(primaryWidgetItem.label)"
                :prop="`${widgetOpts.guarantor.section}.${[primaryWidgetItem.key]}`"
              >
                <el-input
                  v-if="primaryWidgetItem.type === 'input'"
                  v-model="modelTemp[`${widgetOpts.guarantor.section}`][primaryWidgetItem.key]"
                  :placeholder="$t(primaryWidgetItem.placeholder)"
                  readonly
                  clearable
                />
              </el-form-item>
            </div>
            <!-- guarantors list分栏  -->
            <div v-for="(guarantorsItem, guarantorsIndex) in widgetOpts.guarantor.guarantorWidgets" :key="'guarantors' + guarantorsIndex">
              <div class="guarantors-view">
                <div>
                  <el-form-item
                    v-for="(widgetItem, widgetIndex) in guarantorsItem"
                    :key="widgetIndex"
                    :style="{ width: setComputedWidth({ en: 340, zh: 330 }), margin: '0px 0px 16px 0px' }"
                    :label-width="setComputedWidth({ en: 140, zh: 135 })"
                    :label="$t(widgetItem.label)"
                    :prop="`${widgetOpts.guarantor.section}.guarantors.${[guarantorsIndex]}.${[widgetItem.key]}`"
                    :rules="{
                      required: isEdit,
                      message: `${$t(widgetItem.rules.message)}`,
                      trigger: 'change'
                    }"
                  >
                    <el-input
                      v-if="widgetItem.type === 'input'"
                      :style="{ width: setComputedWidth({ en: 185, zh: 185 }) }"
                      v-model="modelTemp[`${widgetOpts.guarantor.section}`]['guarantors'][guarantorsIndex][widgetItem.key]"
                      readonly
                      :placeholder="$t(widgetItem.placeholder)"
                      clearable
                    >
                      <!-- 前缀 -->
                      <template slot="prepend" v-if="widgetItem.key == 'mobileNumber'">
                        <div style="width: 10px">{{ modelTemp[`${widgetOpts.guarantor.section}`]['guarantors'][guarantorsIndex].mobileArea }}</div>
                      </template>

                      <!-- 后缀 -->
                      <template slot="append" v-if="widgetItem.key == 'industryExpYear' || widgetItem.key == 'manageExpYear'">
                        <div style="width: 15px">{{ '' | languageYear }}</div>
                      </template>
                    </el-input>
                    <el-select
                      v-if="widgetItem.type === 'select'"
                      :style="{ width: setComputedWidth({ en: 185, zh: 185 }) }"
                      :value="modelTemp[`${widgetOpts.guarantor.section}`]['guarantors'][guarantorsIndex][widgetItem.key]"
                      :placeholder="$t(widgetItem.placeholder)"
                      ref="guarantorsSelect"
                      @visible-change="closeCustomerOfferSelect($event, 'guarantorsSelect')"
                      readonly
                    >
                      <el-option v-for="option in widgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  financial -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.financial.title) }}</div>
          <div v-if="modelTemp.financial">
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 370, zh: 395 }) }"
              v-for="(financialWidgetItem, financialWidgetIndex) in widgetOpts.financial.widgets"
              :key="widgetOpts.financial.section + financialWidgetIndex"
              :label-width="setComputedWidth({ en: 175, zh: 200 })"
              :label="$t(financialWidgetItem.label)"
              :prop="`${[financialWidgetItem.key]}`"
            >
              <el-input
                v-if="financialWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.financial.section}`][financialWidgetItem.key]"
                :placeholder="$t(financialWidgetItem.placeholder)"
                readonly
                clearable
              />
              <el-select
                v-if="financialWidgetItem.type === 'select'"
                :value="modelTemp[`${widgetOpts.financial.section}`][financialWidgetItem.key]"
                :placeholder="$t(financialWidgetItem.placeholder)"
                ref="financialSelect"
                @visible-change="closeCustomerOfferSelect($event, 'financialSelect')"
                readonly
              >
                <el-option v-for="option in financialWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  uploadDocument -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.uploadDocument.title) }}</div>
          <el-row v-if="modelTemp.uploadDocument" type="flex" :gutter="20" class="font-16 flex-warp">
            <!-- 分栏 -->
            <div
              v-for="(uploadItem, uploadDocumentIndex) in widgetOpts.uploadDocument.uploadDocumentWidgets"
              :key="'uploadDocument' + uploadDocumentIndex"
            >
              <div class="uploadDocument-view">
                <div class="uploadDocument-download">
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="handleDownload(modelTemp[`${widgetOpts.uploadDocument.section}`][uploadDocumentIndex])"
                  >
                    {{ $t('button.download') }}
                  </el-button>
                </div>
                <!-- el-form-item -->
                <el-col :span="8" v-for="(widgetItem, widgetIndex) in uploadItem" :key="widgetIndex">
                  <el-form-item
                    :style="{ width: setSysComputedWidth({ en: 360, zh: 290 }), margin: '0px 0px 16px 0px' }"
                    :label-width="setComputedWidth({ en: 165, zh: 95 })"
                    :label="$t(widgetItem.label)"
                    :prop="`${widgetOpts.uploadDocument.section}.${[uploadDocumentIndex]}.${[widgetItem.key]}`"
                    :rules="{
                      required: isEdit,
                      message: `${$t(widgetItem.rules.message)}`,
                      trigger: 'change'
                    }"
                  >
                    <el-input
                      v-if="widgetItem.type === 'input'"
                      v-model="modelTemp[`${widgetOpts.uploadDocument.section}`][uploadDocumentIndex][widgetItem.key]"
                      readonly
                      :placeholder="$t(widgetItem.placeholder)"
                      clearable
                    />
                    <el-select
                      v-if="widgetItem.type === 'select'"
                      v-model="modelTemp[`${widgetOpts.uploadDocument.section}`][uploadDocumentIndex][widgetItem.key]"
                      :placeholder="$t(widgetItem.placeholder)"
                      readonly
                      clearable
                    >
                      <el-option v-for="option in widgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>
            </div>
          </el-row>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  kyc -->
      <div>
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.kyc.title) }}</div>
          <div v-if="modelTemp.kyc">
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 420, zh: 500 }) }"
              v-for="(kycWidgetItem, kycWidgetIndex) in widgetOpts.kyc.widgets"
              :key="widgetOpts.kyc.section + kycWidgetIndex"
              :label-width="setComputedWidth({ en: 215, zh: 300 })"
              :label="$t(kycWidgetItem.label)"
              :prop="`${[kycWidgetItem.key]}`"
            >
              <el-input
                v-if="kycWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.kyc.section}`][kycWidgetItem.key]"
                :placeholder="$t(kycWidgetItem.placeholder)"
                readonly
                clearable
              />
              <el-select
                v-if="kycWidgetItem.type === 'select'"
                :value="modelTemp[`${widgetOpts.kyc.section}`][kycWidgetItem.key]"
                :placeholder="$t(kycWidgetItem.placeholder)"
                ref="kycSelect"
                @visible-change="closeCustomerOfferSelect($event, 'kycSelect')"
                readonly
              >
                <el-option v-for="option in kycWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
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
.detail-base >>> .el-textarea {
  width: 88% !important;
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
