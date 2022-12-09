<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/apply/loan/components/moblieApplyWidgets/index.vue
 * @Date         : 2022-08-12 16:06:34
 * @LastEditTime : 2022-11-02 11:41:39
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<!--  -->
<template>
  <div class="detail-base">
    <el-form ref="moblieApplyFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
      <!-- product -->
      <div v-if="!eventObj.isEvent || eventObj.eventType == 'RECOMMEND_PRODUCT'">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.productName.title) }}
            <el-button v-if="isShowEdit && modelTemp.productName == null" type="primary" @click="handleEdit">
              {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
            </el-button>
            <el-button v-if="isEdit" type="primary" @click="handleSave">{{ `${$t('button.save')}` }}</el-button>
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 350, zh: 330 }), margin: '0px 10px 16px 0px' }"
              v-for="(productTypeItem, productTypeIndex) in widgetOpts.productName.widgets"
              :key="widgetOpts.productName.section + productTypeIndex"
              :label-width="setComputedWidth({ en: 120, zh: 100 })"
              :label="$t(productTypeItem.label)"
              :prop="`${[productTypeItem.key]}`"
              :rules="{
                required: isEdit,
                message: `${$t(productTypeItem.rules.message)}`,
                trigger: 'change'
              }"
            >
              <el-select
                v-if="productTypeItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.productName.section}`]"
                :placeholder="$t(productTypeItem.placeholder)"
                :disabled="eventObj.isEvent && eventObj.eventType != '' ? isEditTemp : !isEdit"
                @change="selectChangeProduct($event)"
              >
                <el-option v-for="option in productTypeItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
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
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(loanItem, loanIndex) in widgetOpts.loanInformation.widgets"
              :key="widgetOpts.loanInformation.section + loanIndex"
              :label-width="setComputedWidth({ en: 80, zh: 80 })"
              :label="$t(loanItem.label)"
              :prop="`${[loanItem.key]}`"
            >
              <el-input
                v-if="loanItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.loanInformation.section}`][loanItem.key]"
                :placeholder="$t(loanItem.placeholder)"
                :disabled="true"
                clearable
              />
              <el-select
                v-if="loanItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.loanInformation.section}`][loanItem.key]"
                :placeholder="$t(loanItem.placeholder)"
                :disabled="true"
              >
                <el-option v-for="option in loanItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

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
                :disabled="true"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- editStatus & signature -->
      <div v-if="modelTemp.signature">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.editStatus.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(editStatusItem, editStatusIndex) in widgetOpts.editStatus.widgets"
              :key="widgetOpts.editStatus.section + editStatusIndex"
              :label-width="setComputedWidth({ en: 80, zh: 80 })"
              :label="$t(editStatusItem.label)"
              :prop="`${[editStatusItem.key]}`"
            >
              <el-input
                v-if="editStatusItem.type === 'input'"
                v-model="modelTemp[editStatusItem.key]"
                :placeholder="$t(editStatusItem.placeholder)"
                :disabled="true"
                clearable
              />
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
              :style="{ width: setSysComputedWidth({ en: 330, zh: 330 }), margin: '0px 10px 16px 0px' }"
              v-for="(personalItem, personalIndex) in widgetOpts.personalInformation.widgets"
              :key="widgetOpts.personalInformation.section + personalIndex"
              :label-width="setComputedWidth({ en: 130, zh: 130 })"
              :label="$t(personalItem.label)"
              :prop="`${[personalItem.key]}`"
            >
              <el-input
                v-if="personalItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.personalInformation.section}`][personalItem.key]"
                :placeholder="$t(personalItem.placeholder)"
                :disabled="true"
                clearable
              />
              <el-select
                v-if="personalItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.personalInformation.section}`][personalItem.key]"
                :placeholder="$t(personalItem.placeholder)"
                ref="kycSelect"
                :disabled="true"
              >
                <el-option v-for="option in personalItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
              <el-date-picker
                :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                @input="$forceUpdate()"
                @change="getBirthDate"
                v-if="personalItem.type === 'date'"
                v-model="modelTemp[`${widgetOpts.personalInformation.section}`][personalItem.key]"
                :disabled="true"
                :format="personalItem.valueFormat || 'yyyy-MM-dd'"
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
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(nameItem, nameIndex) in widgetOpts.personalInformation.name.widgets"
                  :key="widgetOpts.personalInformation.name.title + nameIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(nameItem.label)"
                  :prop="`${[nameItem.key]}`"
                >
                  <el-input
                    v-if="nameItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.personalInformation.section}`][`${widgetOpts.personalInformation.name.key}`][nameItem.key]"
                    :placeholder="$t(nameItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- personalInformation.spouseInformation.name -->
          <div v-if="modelTemp.personalInformation.spouseInformation && modelTemp.personalInformation.spouseInformation.name">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.personalInformation.spouseInformation.title) }}
              </div>
              <div class="subInfo-view subInfo-flex-warp-margin">
                <div class="section">
                  {{ $t(widgetOpts.personalInformation.spouseInformation.name.title) }}
                </div>
                <div>
                  <el-form-item
                    :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                    v-for="(nameItem, nameIndex) in widgetOpts.personalInformation.spouseInformation.name.widgets"
                    :key="widgetOpts.personalInformation.spouseInformation.name.title + nameIndex"
                    :label-width="setComputedWidth({ en: 100, zh: 100 })"
                    :label="$t(nameItem.label)"
                    :prop="`${[nameItem.key]}`"
                  >
                    <el-input
                      v-if="nameItem.type === 'input'"
                      v-model="
                        modelTemp[`${widgetOpts.personalInformation.section}`][`${widgetOpts.personalInformation.spouseInformation.name.key}`][
                          nameItem.key
                        ]
                      "
                      :placeholder="$t(nameItem.placeholder)"
                      :disabled="true"
                      clearable
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <!-- .personalInformation.educationalBackground -->
          <div v-if="modelTemp.personalInformation.educationalBackground">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.personalInformation.educationalBackground.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 350, zh: 350 }), margin: '0px 10px 16px 0px' }"
                  v-for="(educationalItem, educationalIndex) in widgetOpts.personalInformation.educationalBackground.widgets"
                  :key="widgetOpts.personalInformation.educationalBackground.title + educationalIndex"
                  :label-width="setComputedWidth({ en: 150, zh: 150 })"
                  :label="$t(educationalItem.label)"
                  :prop="`${[educationalItem.key]}`"
                >
                  <el-input
                    v-if="educationalItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.personalInformation.section}`][`${widgetOpts.personalInformation.educationalBackground.key}`][
                        educationalItem.key
                      ]
                    "
                    :placeholder="$t(educationalItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                  <el-select
                    v-if="educationalItem.type === 'select'"
                    v-model="
                      modelTemp[`${widgetOpts.personalInformation.section}`][`${widgetOpts.personalInformation.educationalBackground.key}`][
                        educationalItem.key
                      ]
                    "
                    :placeholder="$t(educationalItem.placeholder)"
                    ref="kycSelect"
                    :disabled="true"
                  >
                    <el-option v-for="option in educationalItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- contactInformation -->
      <div v-if="modelTemp.contactInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.contactInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
              v-for="(contactItem, contactIndex) in widgetOpts.contactInformation.widgets"
              :key="widgetOpts.contactInformation.title + contactIndex"
              :label-width="setComputedWidth({ en: 50, zh: 50 })"
              :label="$t(contactItem.label)"
              :prop="`${[contactItem.key]}`"
            >
              <el-input
                v-if="contactItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.contactInformation.section}`][contactItem.key]"
                :placeholder="$t(contactItem.placeholder)"
                :disabled="true"
                clearable
              />
            </el-form-item>
          </div>

          <!-- .contactInformation.mobile -->
          <div v-if="modelTemp.contactInformation.mobile">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.mobile.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 370, zh: 370 }), margin: '0px 10px 16px 0px' }"
                  v-for="(mobileItem, mobileIndex) in widgetOpts.contactInformation.mobile.widgets"
                  :key="widgetOpts.contactInformation.mobile.title + mobileIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(mobileItem.label)"
                  :prop="`${[mobileItem.key]}`"
                >
                  <el-input
                    v-if="mobileItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.mobile.key}`][mobileItem.key]"
                    :placeholder="$t(mobileItem.placeholder)"
                    :disabled="true"
                    clearable
                  >
                    <!-- 前缀 -->
                    <template slot="prepend">
                      <div>
                        +{{ modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.mobile.key}`].countryCode }}
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .contactInformation.homeLandLine -->
          <div v-if="modelTemp.contactInformation.homeLandLine">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.homeLandLine.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(homeLandLineItem, homeLandLineIndex) in widgetOpts.contactInformation.homeLandLine.widgets"
                  :key="widgetOpts.contactInformation.homeLandLine.title + homeLandLineIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(homeLandLineItem.label)"
                  :prop="`${[homeLandLineItem.key]}`"
                >
                  <el-input
                    v-if="homeLandLineItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.homeLandLine.key}`][homeLandLineItem.key]
                    "
                    :placeholder="$t(homeLandLineItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- contactInformation.address -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.contactInformation.address">
            <div class="section section-margin">
              {{ $t(widgetOpts.contactInformation.address.title) }}
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
                v-for="(addressItem, addressIndex) in widgetOpts.contactInformation.address.widgets"
                :key="widgetOpts.contactInformation.address.title + addressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(addressItem.label)"
                :prop="`${[addressItem.key]}`"
              >
                <el-input
                  v-if="addressItem.type === 'input'"
                  :type="addressItem.inputType ? addressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="true"
                  clearable
                />
                <el-select
                  v-if="addressItem.type === 'select'"
                  :value="modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="true"
                >
                  <el-option v-for="option in addressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>
          </div>

          <!-- contactInformation.billingContact -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.contactInformation.billingContact">
            <div class="datasource">
              <div class="section">
                {{ $t(widgetOpts.contactInformation.billingContact.title) }}
              </div>
              <!-- 基础信息 -->
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactItem, contactIndex) in widgetOpts.contactInformation.billingContact.widgets"
                  :key="widgetOpts.contactInformation.billingContact.title + contactIndex"
                  :label-width="setComputedWidth({ en: 50, zh: 50 })"
                  :label="$t(contactItem.label)"
                  :prop="`${[contactItem.key]}`"
                >
                  <el-input
                    v-if="contactItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.billingContact.key}`][contactItem.key]
                    "
                    :placeholder="$t(contactItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                </el-form-item>
              </div>

              <!-- .contactInformation.billingContact.mobile -->
              <div v-if="modelTemp.contactInformation.billingContact.mobile">
                <div class="subInfo-view">
                  <div class="section section-margin">
                    {{ $t(widgetOpts.contactInformation.billingContact.mobile.title) }}
                  </div>
                  <div>
                    <el-form-item
                      :style="{ width: setSysComputedWidth({ en: 370, zh: 370 }), margin: '0px 10px 16px 0px' }"
                      v-for="(mobileItem, mobileIndex) in widgetOpts.contactInformation.billingContact.mobile.widgets"
                      :key="widgetOpts.contactInformation.mobile.title + mobileIndex"
                      :label-width="setComputedWidth({ en: 60, zh: 60 })"
                      :label="$t(mobileItem.label)"
                      :prop="`${[mobileItem.key]}`"
                    >
                      <el-input
                        v-if="mobileItem.type === 'input'"
                        v-model="
                          modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.billingContact.key}`][
                            `${widgetOpts.contactInformation.billingContact.mobile.key}`
                          ][mobileItem.key]
                        "
                        :placeholder="$t(mobileItem.placeholder)"
                        :disabled="true"
                        clearable
                      >
                        <!-- 前缀 -->
                        <template slot="prepend">
                          <div>
                            +{{
                              modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.billingContact.key}`][
                                `${widgetOpts.contactInformation.billingContact.mobile.key}`
                              ].countryCode
                            }}
                          </div>
                        </template>
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <!-- .contactInformation.billingContact.homeLandLine -->
              <div v-if="modelTemp.contactInformation.billingContact.homeLandLine">
                <div class="subInfo-view subInfo-margin">
                  <div class="section section-margin">
                    {{ $t(widgetOpts.contactInformation.billingContact.homeLandLine.title) }}
                  </div>
                  <div>
                    <el-form-item
                      :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                      v-for="(homeLandLineItem, homeLandLineIndex) in widgetOpts.contactInformation.billingContact.homeLandLine.widgets"
                      :key="widgetOpts.contactInformation.homeLandLine.title + homeLandLineIndex"
                      :label-width="setComputedWidth({ en: 100, zh: 100 })"
                      :label="$t(homeLandLineItem.label)"
                      :prop="`${[homeLandLineItem.key]}`"
                    >
                      <el-input
                        v-if="homeLandLineItem.type === 'input'"
                        v-model="
                          modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.billingContact.key}`][
                            `${widgetOpts.contactInformation.billingContact.homeLandLine.key}`
                          ][homeLandLineItem.key]
                        "
                        :placeholder="$t(homeLandLineItem.placeholder)"
                        :disabled="true"
                        clearable
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- employeeInformation -->
      <div v-if="modelTemp.employeeInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.employeeInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(employeeItem, employeeIndex) in widgetOpts.employeeInformation.widgets"
              :key="widgetOpts.employeeInformation + employeeIndex"
              :label-width="setComputedWidth({ en: 120, zh: 110 })"
              :label="$t(employeeItem.label)"
              :prop="`${[employeeItem.key]}`"
            >
              <el-input
                v-if="employeeItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.employeeInformation.section}`][employeeItem.key]"
                :placeholder="$t(employeeItem.placeholder)"
                :disabled="true"
                clearable
              />
              <el-select
                v-if="employeeItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.employeeInformation.section}`][employeeItem.key]"
                :placeholder="$t(employeeItem.placeholder)"
                :disabled="true"
              >
                <el-option v-for="option in employeeItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- .employeeInformation.mobile -->
          <div v-if="modelTemp.employeeInformation.mobile">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.employeeInformation.mobile.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 370, zh: 370 }), margin: '0px 10px 16px 0px' }"
                  v-for="(mobileItem, mobileIndex) in widgetOpts.employeeInformation.mobile.widgets"
                  :key="widgetOpts.employeeInformation.mobile.title + mobileIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(mobileItem.label)"
                  :prop="`${[mobileItem.key]}`"
                >
                  <el-input
                    v-if="mobileItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.employeeInformation.section}`][`${widgetOpts.employeeInformation.mobile.key}`][mobileItem.key]"
                    :placeholder="$t(mobileItem.placeholder)"
                    :disabled="true"
                    clearable
                  >
                    <template slot="prepend">
                      <div>
                        +{{ modelTemp[`${widgetOpts.employeeInformation.section}`][`${widgetOpts.employeeInformation.mobile.key}`].countryCode }}
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .employeeInformation.homeLandLine -->
          <div v-if="modelTemp.employeeInformation.homeLandLine">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.employeeInformation.homeLandLine.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(homeLandLineItem, homeLandLineIndex) in widgetOpts.employeeInformation.homeLandLine.widgets"
                  :key="widgetOpts.employeeInformation.homeLandLine.title + homeLandLineIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(homeLandLineItem.label)"
                  :prop="`${[homeLandLineItem.key]}`"
                >
                  <el-input
                    v-if="homeLandLineItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.employeeInformation.section}`][`${widgetOpts.employeeInformation.homeLandLine.key}`][
                        homeLandLineItem.key
                      ]
                    "
                    :placeholder="$t(homeLandLineItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- employeeInformation.address -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.employeeInformation.address">
            <div class="section section-margin">
              {{ $t(widgetOpts.employeeInformation.address.title) }}
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
                v-for="(addressItem, addressIndex) in widgetOpts.employeeInformation.address.widgets"
                :key="widgetOpts.employeeInformation.address.title + addressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(addressItem.label)"
                :prop="`${[addressItem.key]}`"
              >
                <el-input
                  v-if="addressItem.type === 'input'"
                  :type="addressItem.inputType ? addressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="modelTemp[`${widgetOpts.employeeInformation.section}`][`${widgetOpts.employeeInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="true"
                  clearable
                />
                <el-select
                  v-if="addressItem.type === 'select'"
                  :value="modelTemp[`${widgetOpts.employeeInformation.section}`][`${widgetOpts.employeeInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in addressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- corporateInformation -->
      <div v-if="modelTemp.corporateInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.corporateInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(corporateItem, corporateIndex) in widgetOpts.corporateInformation.widgets"
              :key="widgetOpts.corporateInformation + corporateIndex"
              :label-width="setComputedWidth({ en: 120, zh: 110 })"
              :label="$t(corporateItem.label)"
              :prop="`${[corporateItem.key]}`"
            >
              <el-input
                v-if="corporateItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.corporateInformation.section}`][corporateItem.key]"
                :placeholder="$t(corporateItem.placeholder)"
                :disabled="true"
                clearable
              />
              <el-select
                v-if="corporateItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.corporateInformation.section}`][corporateItem.key]"
                :placeholder="$t(corporateItem.placeholder)"
                :disabled="true"
              >
                <el-option v-for="option in corporateItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- .corporateInformation.mobile -->
          <div v-if="modelTemp.corporateInformation.mobile">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.corporateInformation.mobile.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 370, zh: 370 }), margin: '0px 10px 16px 0px' }"
                  v-for="(mobileItem, mobileIndex) in widgetOpts.corporateInformation.mobile.widgets"
                  :key="widgetOpts.corporateInformation.mobile.title + mobileIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(mobileItem.label)"
                  :prop="`${[mobileItem.key]}`"
                >
                  <el-input
                    v-if="mobileItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.corporateInformation.section}`][`${widgetOpts.corporateInformation.mobile.key}`][mobileItem.key]"
                    :placeholder="$t(mobileItem.placeholder)"
                    :disabled="true"
                    clearable
                  >
                    <template slot="prepend">
                      <div>
                        +{{ modelTemp[`${widgetOpts.corporateInformation.section}`][`${widgetOpts.corporateInformation.mobile.key}`].countryCode }}
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .corporateInformation.homeLandLine -->
          <div v-if="modelTemp.corporateInformation.homeLandLine">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.corporateInformation.homeLandLine.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(homeLandLineItem, homeLandLineIndex) in widgetOpts.corporateInformation.homeLandLine.widgets"
                  :key="widgetOpts.corporateInformation.homeLandLine.title + homeLandLineIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(homeLandLineItem.label)"
                  :prop="`${[homeLandLineItem.key]}`"
                >
                  <el-input
                    v-if="homeLandLineItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.corporateInformation.section}`][`${widgetOpts.corporateInformation.homeLandLine.key}`][
                        homeLandLineItem.key
                      ]
                    "
                    :placeholder="$t(homeLandLineItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- corporateInformation.address -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.corporateInformation.address">
            <div class="section section-margin">
              {{ $t(widgetOpts.corporateInformation.address.title) }}
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
                v-for="(addressItem, addressIndex) in widgetOpts.corporateInformation.address.widgets"
                :key="widgetOpts.corporateInformation.address.title + addressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(addressItem.label)"
                :prop="`${[addressItem.key]}`"
              >
                <el-input
                  v-if="addressItem.type === 'input'"
                  :type="addressItem.inputType ? addressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="modelTemp[`${widgetOpts.corporateInformation.section}`][`${widgetOpts.corporateInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="true"
                  clearable
                />
                <el-select
                  v-if="addressItem.type === 'select'"
                  :value="modelTemp[`${widgetOpts.corporateInformation.section}`][`${widgetOpts.corporateInformation.address.key}`][addressItem.key]"
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in addressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- fileInformation -->
      <div v-if="modelTemp.fileInformation">
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.fileInformation.title) }}</div>
          <div v-if="modelTemp.fileInformation.length > 0">
            <!-- 分栏 -->
            <div
              class="subInfo-view subInfo-flex-warp-margin"
              style="padding-bottom: 20px"
              v-for="(uploadItem, uploadDocumentIndex) in modelTemp.fileInformation"
              :key="'fileInformation' + uploadDocumentIndex"
            >
              <div class="section">
                {{ uploadItem.key }}
              </div>
              <!-- el-form-item -->
              <el-row type="flex" :gutter="0" class="font-16 flex-warp">
                <el-col class="file-imgae-view" :span="4" v-for="(widgetItem, widgetIndex) in uploadItem.path" :key="widgetIndex">
                  <el-image :src="widgetItem" :fit="'contain'" :preview-src-list="uploadItem.path">
                    <div
                      style="
                        border-radius: 10px;
                        background: #f5f7fa;
                        width: 250px;
                        height: 170px;
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                      slot="error"
                      class="image-slot"
                    >
                      <i style="font-size: 50px; color: #999999" class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-else>
            <el-empty :description="$t('commonDialog.noData')"></el-empty>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- agent -->
      <div v-if="modelTemp.agent">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.agent.title) }}
          </div>
          <!-- .agent.channel -->
          <div v-if="modelTemp.agent.channel">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.agent.channel.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(channelItem, channelIndex) in widgetOpts.agent.channel.widgets"
                  :key="widgetOpts.agent.channel.title + channelIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(channelItem.label)"
                  :prop="`${[channelItem.key]}`"
                >
                  <el-input
                    v-if="channelItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.agent.section}`][`${widgetOpts.agent.channel.key}`][channelItem.key]"
                    :placeholder="$t(channelItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- .agent.gps -->
          <div v-if="modelTemp.agent.gps">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.agent.gps.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(gpsItem, gpsIndex) in widgetOpts.agent.gps.widgets"
                  :key="widgetOpts.agent.gps.title + gpsIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(gpsItem.label)"
                  :prop="`${[gpsItem.key]}`"
                >
                  <el-input
                    v-if="gpsItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.agent.section}`][`${widgetOpts.agent.gps.key}`][gpsItem.key]"
                    :placeholder="$t(gpsItem.placeholder)"
                    :disabled="true"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- .agent.teller -->
          <div v-if="modelTemp.agent.teller">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.agent.teller.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(tellerItem, tellerIndex) in widgetOpts.agent.teller.widgets"
                  :key="widgetOpts.agent.teller.title + tellerIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(tellerItem.label)"
                  :prop="`${[tellerItem.key]}`"
                >
                  <el-input
                    v-if="tellerItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.agent.section}`][`${widgetOpts.agent.teller.key}`][tellerItem.key]"
                    :placeholder="$t(tellerItem.placeholder)"
                    :disabled="true"
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
