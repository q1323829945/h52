<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/components/clientProductWidgets/index.vue
 * @Date         : 2022-08-12 16:06:34
 * @LastEditTime : 2022-11-02 11:15:32
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<!--  -->
<template>
  <div class="detail-base">
    <el-form ref="clientProductFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
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
              :style="{ width: setSysComputedWidth({ en: 280, zh: 280 }), margin: '0px 10px 16px 0px' }"
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
                :readonly="!isEdit"
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

      <!-- customerInformation -->
      <div v-if="modelTemp.customerInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.customerInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 330, zh: 330 }), margin: '0px 10px 16px 0px' }"
              v-for="(customerItem, customerIndex) in widgetOpts.customerInformation.widgets"
              :key="widgetOpts.customerInformation + customerIndex"
              :label-width="setComputedWidth({ en: 130, zh: 130 })"
              :label="$t(customerItem.label)"
              :prop="`${[customerItem.key]}`"
            >
              <el-select
                v-if="customerItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.customerInformation.section}`][customerItem.key]"
                :placeholder="$t(customerItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in customerItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>

              <el-date-picker
                :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                @input="$forceUpdate()"
                @change="getBirthDate"
                v-if="customerItem.type === 'date'"
                v-model="modelTemp[`${widgetOpts.customerInformation.section}`][customerItem.key]"
                :readonly="!isEdit"
                :format="customerItem.valueFormat || 'yyyy-MM-dd'"
                type="date"
                :placeholder="$t(customerItem.placeholder)"
              ></el-date-picker>
            </el-form-item>
          </div>

          <!-- .customerInformation.name -->
          <div v-if="modelTemp.customerInformation.name">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.customerInformation.name.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                  v-for="(nameItem, nameIndex) in widgetOpts.customerInformation.name.widgets"
                  :key="widgetOpts.customerInformation.name.title + nameIndex"
                  :label-width="setComputedWidth({ en: 90, zh: 90 })"
                  :label="$t(nameItem.label)"
                  :prop="`${[nameItem.key]}`"
                >
                  <el-input
                    v-if="nameItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.customerInformation.section}`][`${widgetOpts.customerInformation.name.key}`][nameItem.key]"
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

      <!-- productInformation -->
      <div v-if="modelTemp.productInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.productInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(productItem, productIndex) in widgetOpts.productInformation.widgets"
              :key="widgetOpts.productInformation.section + productIndex"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
              :label="$t(productItem.label)"
              :prop="`${[productItem.key]}`"
            >
              <el-select
                v-if="productItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.productInformation.section}`][productItem.key]"
                :placeholder="$t(productItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in productItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- productInformatio.details -->
          <div v-if="modelTemp.productInformation.details">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.productInformation.details.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                  v-for="(detailsItem, detailsIndex) in widgetOpts.productInformation.details.widgets"
                  :key="widgetOpts.productInformation.details.title + detailsIndex"
                  :label-width="setComputedWidth({ en: 70, zh: 90 })"
                  :label="$t(detailsItem.label)"
                  :prop="`${[detailsItem.key]}`"
                >
                  <el-input
                    v-if="detailsItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.productInformation.section}`][`${widgetOpts.productInformation.details.key}`][detailsItem.key]"
                    :placeholder="$t(detailsItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                  <el-select
                    v-if="detailsItem.type === 'select'"
                    v-model="modelTemp[`${widgetOpts.productInformation.section}`][`${widgetOpts.productInformation.details.key}`][detailsItem.key]"
                    :placeholder="$t(detailsItem.placeholder)"
                    ref="kycSelect"
                    :disabled="!isEdit"
                  >
                    <el-option v-for="option in detailsItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- productInformatio.creditCardDetails -->
          <div v-if="modelTemp.productInformation.creditCardDetails">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.productInformation.creditCardDetails.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 340, zh: 340 }), margin: '0px 10px 16px 0px' }"
                  v-for="(creditCardDetailsItem, creditCardDetailsIndex) in widgetOpts.productInformation.creditCardDetails.widgets"
                  :key="widgetOpts.productInformation.creditCardDetails.title + creditCardDetailsIndex"
                  :label-width="setComputedWidth({ en: 145, zh: 145 })"
                  :label="$t(creditCardDetailsItem.label)"
                  :prop="`${[creditCardDetailsItem.key]}`"
                >
                  <el-select
                    v-if="creditCardDetailsItem.type === 'select'"
                    v-model="
                      modelTemp[`${widgetOpts.productInformation.section}`][`${widgetOpts.productInformation.creditCardDetails.key}`][
                        creditCardDetailsItem.key
                      ]
                    "
                    :placeholder="$t(creditCardDetailsItem.placeholder)"
                    ref="kycSelect"
                    :disabled="!isEdit"
                  >
                    <el-option v-for="option in creditCardDetailsItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- deliverInformation -->
      <div v-if="modelTemp.deliverInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.deliverInformation.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(deliverItem, deliverIndex) in widgetOpts.deliverInformation.widgets"
              :key="widgetOpts.deliverInformation.section + deliverIndex"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
              :label="$t(deliverItem.label)"
              :prop="`${[deliverItem.key]}`"
            >
              <el-select
                v-if="deliverItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.deliverInformation.section}`][deliverItem.key]"
                :placeholder="$t(deliverItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in deliverItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- adaInformation -->
      <div v-if="modelTemp.adaInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.adaInformation.title) }}
          </div>
          <!-- base info -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(adaItem, adaIndex) in widgetOpts.adaInformation.widgets"
              :key="widgetOpts.adaInformation.section + adaIndex"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
              :label="$t(adaItem.label)"
              :prop="`${[adaItem.key]}`"
            >
              <el-select
                v-if="adaItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.adaInformation.section}`][adaItem.key]"
                :placeholder="$t(adaItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in adaItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- .adaInformation.accountInformation -->
          <div v-if="modelTemp.adaInformation.accountInformation">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.adaInformation.accountInformation.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 330, zh: 330 }), margin: '0px 10px 16px 0px' }"
                  v-for="(accountItem, accountIndex) in widgetOpts.adaInformation.accountInformation.widgets"
                  :key="widgetOpts.adaInformation.accountInformation.title + accountIndex"
                  :label-width="setComputedWidth({ en: 135, zh: 135 })"
                  :label="$t(accountItem.label)"
                  :prop="`${[accountItem.key]}`"
                >
                  <el-input
                    v-if="accountItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.adaInformation.section}`][`${widgetOpts.adaInformation.accountInformation.key}`][accountItem.key]
                    "
                    :placeholder="$t(accountItem.placeholder)"
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

      <!-- questionnaires -->
      <div v-if="modelTemp.questionnaires">
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

      <!-- financialInformation -->
      <div>
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.financialInformation.title) }}
          </div>
          <!-- 基础数据 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 340, zh: 340 }), margin: '0px 10px 16px 0px' }"
              v-for="(financialItem, financialIndex) in widgetOpts.financialInformation.widgets"
              :key="widgetOpts.financialInformation.section + financialIndex"
              :label-width="setComputedWidth({ en: 145, zh: 145 })"
              :label="$t(financialItem.label)"
              :prop="`${[financialItem.key]}`"
            >
              <el-input
                v-if="financialItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.financialInformation.section}`][financialItem.key]"
                :placeholder="$t(financialItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="financialItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.financialInformation.section}`][financialItem.key]"
                :placeholder="$t(financialItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in financialItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- financialInformation.creditCards -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.financialInformation.creditCards">
            <div class="section section-margin">{{ $t(widgetOpts.financialInformation.creditCards.title) }}</div>
            <el-row type="flex" :gutter="20" class="font-16 flex-warp">
              <div
                class="subInfo-view subInfo-flex-warp-margin"
                v-for="(creditCardsItem, creditCardsIndex) in widgetOpts.financialInformation.creditCards.creditCardsWidgets"
                :key="widgetOpts.financialInformation.creditCards.title + creditCardsIndex"
              >
                <el-form-item
                  v-for="(widgetsItem, widgetsIndex) in creditCardsItem"
                  :key="'widgetsIndex' + widgetsIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                  :label-width="setComputedWidth({ en: 110, zh: 110 })"
                  :label="$t(widgetsItem.label)"
                  :prop="`${widgetOpts.financialInformation.section}.${widgetOpts.financialInformation.creditCards.key}.${[creditCardsIndex]}.${[
                    widgetsItem.key
                  ]}`"
                >
                  <el-input
                    v-if="widgetsItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.financialInformation.section}`]['creditCards'][creditCardsIndex][widgetsItem.key]"
                    :placeholder="$t(widgetsItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
                <el-divider></el-divider>
              </div>
            </el-row>
          </div>

          <!-- .financialInformation.position -->
          <div v-if="modelTemp.financialInformation.position">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.financialInformation.position.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 340, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(positionItem, positionIndex) in widgetOpts.financialInformation.position.widgets"
                  :key="widgetOpts.financialInformation.position.title + positionIndex"
                  :label-width="setComputedWidth({ en: 130, zh: 110 })"
                  :label="$t(positionItem.label)"
                  :prop="`${[positionItem.key]}`"
                >
                  <el-select
                    v-if="positionItem.type === 'select'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][`${widgetOpts.financialInformation.position.key}`][positionItem.key]
                    "
                    :placeholder="$t(positionItem.placeholder)"
                    ref="kycSelect"
                    :disabled="!isEdit"
                  >
                    <el-option v-for="option in positionItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .financialInformation.stayAtCurrentHome -->
          <div v-if="modelTemp.financialInformation.stayAtCurrentHome">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.financialInformation.stayAtCurrentHome.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayAtCurrentHomeItem, stayAtCurrentHomeIndex) in widgetOpts.financialInformation.stayAtCurrentHome.widgets"
                  :key="widgetOpts.financialInformation.stayAtCurrentHome.title + stayAtCurrentHomeIndex"
                  :label-width="setComputedWidth({ en: 70, zh: 70 })"
                  :label="$t(stayAtCurrentHomeItem.label)"
                  :prop="`${[stayAtCurrentHomeItem.key]}`"
                >
                  <el-input
                    v-if="stayAtCurrentHomeItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][`${widgetOpts.financialInformation.stayAtCurrentHome.key}`][
                        stayAtCurrentHomeItem.key
                      ]
                    "
                    :placeholder="$t(stayAtCurrentHomeItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .financialInformation.stayWithPreviousBusiness -->
          <div v-if="modelTemp.financialInformation.stayWithPreviousBusiness">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.financialInformation.stayWithPreviousBusiness.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWithPreviousBusinessItem, stayWithPreviousBusinessIndex) in widgetOpts.financialInformation.stayWithPreviousBusiness
                    .widgets"
                  :key="widgetOpts.financialInformation.stayWithPreviousBusiness.title + stayWithPreviousBusinessIndex"
                  :label-width="setComputedWidth({ en: 70, zh: 70 })"
                  :label="$t(stayWithPreviousBusinessItem.label)"
                  :prop="`${[stayWithPreviousBusinessItem.key]}`"
                >
                  <el-input
                    v-if="stayWithPreviousBusinessItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][`${widgetOpts.financialInformation.stayWithPreviousBusiness.key}`][
                        stayWithPreviousBusinessItem.key
                      ]
                    "
                    :placeholder="$t(stayWithPreviousBusinessItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .financialInformation.stayWithCurrentBusiness -->
          <div v-if="modelTemp.financialInformation.stayWithCurrentBusiness">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.financialInformation.stayWithCurrentBusiness.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWithCurrentBusinessItem, stayWithCurrentBusinessIndex) in widgetOpts.financialInformation.stayWithCurrentBusiness
                    .widgets"
                  :key="widgetOpts.financialInformation.stayWithCurrentBusiness.title + stayWithCurrentBusinessIndex"
                  :label-width="setComputedWidth({ en: 70, zh: 70 })"
                  :label="$t(stayWithCurrentBusinessItem.label)"
                  :prop="`${[stayWithCurrentBusinessItem.key]}`"
                >
                  <el-input
                    v-if="stayWithCurrentBusinessItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][`${widgetOpts.financialInformation.stayWithCurrentBusiness.key}`][
                        stayWithCurrentBusinessItem.key
                      ]
                    "
                    :placeholder="$t(stayWithCurrentBusinessItem.placeholder)"
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
