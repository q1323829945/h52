<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/components/corporateProductWidgets/index.vue
 * @Date         : 2022-08-12 16:06:34
 * @LastEditTime : 2022-08-19 16:45:46
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<!--  -->
<template>
  <div class="detail-base">
    <el-form ref="corporateProductFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
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
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- editStatus -->
      <div v-if="modelTemp.editStatus">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.editStatus.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 310, zh: 310 }), margin: '0px 10px 16px 0px' }"
              v-for="(editStatusItem, editStatusIndex) in widgetOpts.editStatus.widgets"
              :key="widgetOpts.editStatus.section + editStatusIndex"
              :label-width="setComputedWidth({ en: 115, zh: 115 })"
              :label="$t(editStatusItem.label)"
              :prop="`${[editStatusItem.key]}`"
            >
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
      </div>

      <!-- undertaking -->
      <div v-if="modelTemp.undertaking">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.undertaking.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 340, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(undertakingItem, undertakingIndex) in widgetOpts.undertaking.widgets"
              :key="widgetOpts.undertaking.section + undertakingIndex"
              :label-width="setComputedWidth({ en: 140, zh: 140 })"
              :label="$t(undertakingItem.label)"
              :prop="`${[undertakingItem.key]}`"
            >
              <el-input
                v-if="undertakingItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.undertaking.section}`][undertakingItem.key]"
                :placeholder="$t(undertakingItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- referralInformation -->
      <div v-if="modelTemp.referralInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.referralInformation.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(referralWidgetItem, referralWidgetIndex) in widgetOpts.referralInformation.widgets"
              :key="widgetOpts.referralInformation.section + referralWidgetIndex"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
              :label="$t(referralWidgetItem.label)"
              :prop="`${[referralWidgetItem.key]}`"
            >
              <el-input
                v-if="referralWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.referralInformation.section}`][referralWidgetItem.key]"
                :placeholder="$t(referralWidgetItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- borrowerInformation -->
      <div v-if="modelTemp.borrowerInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.borrowerInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 340, zh: 340 }), margin: '0px 10px 16px 0px' }"
              v-for="(borrowerWidgetItem, borrowerWidgetIndex) in widgetOpts.borrowerInformation.widgets"
              :key="widgetOpts.borrowerInformation.section + borrowerWidgetIndex"
              :label-width="setComputedWidth({ en: 145, zh: 145 })"
              :label="$t(borrowerWidgetItem.label)"
              :prop="`${[borrowerWidgetItem.key]}`"
            >
              <el-input
                v-if="borrowerWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.borrowerInformation.section}`][borrowerWidgetItem.key]"
                :placeholder="$t(borrowerWidgetItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>

          <!-- businessAddress -->
          <div class="subInfo-view" v-if="modelTemp.borrowerInformation.businessAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.borrowerInformation.businessAddress.title) }}
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
                v-for="(businessAddressWidgetItem, businessAddressWidgetIndex) in widgetOpts.borrowerInformation.businessAddress.widgets"
                :key="widgetOpts.borrowerInformation.businessAddress.title + businessAddressWidgetIndex"
                :label-width="
                  setSysComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(businessAddressWidgetItem.label)"
                :prop="`${[businessAddressWidgetItem.key]}`"
              >
                <el-input
                  v-if="businessAddressWidgetItem.type === 'input'"
                  :type="businessAddressWidgetItem.inputType ? businessAddressWidgetItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v
                  v-model="
                    modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.businessAddress.key}`][
                      businessAddressWidgetItem.key
                    ]
                  "
                  :placeholder="$t(businessAddressWidgetItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="businessAddressWidgetItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.businessAddress.key}`][
                      businessAddressWidgetItem.key
                    ]
                  "
                  :placeholder="$t(businessAddressWidgetItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in businessAddressWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
              <el-divider></el-divider>
            </div>

            <!-- businessAddress.stay -->
            <div v-if="modelTemp.borrowerInformation.businessAddress.stay">
              <div class="section section-margin">
                {{ $t(widgetOpts.borrowerInformation.businessAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.borrowerInformation.businessAddress.stay.widgets"
                  :key="widgetOpts.borrowerInformation.businessAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.businessAddress.key}`][
                        `${widgetOpts.borrowerInformation.businessAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
              <el-divider></el-divider>
            </div>

            <!-- businessAddress.contact -->
            <div v-if="modelTemp.borrowerInformation.businessAddress.contact">
              <div class="section section-margin">
                {{ $t(widgetOpts.borrowerInformation.businessAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.borrowerInformation.businessAddress.contact.widgets"
                  :key="widgetOpts.borrowerInformation.businessAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.businessAddress.key}`][
                        `${widgetOpts.borrowerInformation.businessAddress.contact.key}`
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

          <!-- factoryAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.borrowerInformation.factoryAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.borrowerInformation.factoryAddress.title) }}
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
                v-for="(factoryAddressWidgetItem, factoryAddressWidgetIndex) in widgetOpts.borrowerInformation.factoryAddress.widgets"
                :key="widgetOpts.borrowerInformation.factoryAddress.title + factoryAddressWidgetIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(factoryAddressWidgetItem.label)"
                :prop="`${[factoryAddressWidgetItem.key]}`"
              >
                <el-input
                  v-if="factoryAddressWidgetItem.type === 'input'"
                  :type="factoryAddressWidgetItem.inputType ? factoryAddressWidgetItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.factoryAddress.key}`][
                      factoryAddressWidgetItem.key
                    ]
                  "
                  :placeholder="$t(factoryAddressWidgetItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="factoryAddressWidgetItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.factoryAddress.key}`][
                      factoryAddressWidgetItem.key
                    ]
                  "
                  :placeholder="$t(factoryAddressWidgetItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in factoryAddressWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
              <el-divider></el-divider>
            </div>
            <!-- factoryAddress.stay -->
            <div v-if="modelTemp.borrowerInformation.factoryAddress.stay">
              <div class="section section-margin">
                {{ $t(widgetOpts.borrowerInformation.factoryAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.borrowerInformation.factoryAddress.stay.widgets"
                  :key="widgetOpts.borrowerInformation.factoryAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.factoryAddress.key}`][
                        `${widgetOpts.borrowerInformation.factoryAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
              <el-divider></el-divider>
            </div>

            <!-- factoryAddress.contact -->
            <div v-if="modelTemp.borrowerInformation.factoryAddress.contact">
              <div class="section section-margin">
                {{ $t(widgetOpts.borrowerInformation.factoryAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.borrowerInformation.factoryAddress.contact.widgets"
                  :key="widgetOpts.borrowerInformation.factoryAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.borrowerInformation.section}`][`${widgetOpts.borrowerInformation.factoryAddress.key}`][
                        `${widgetOpts.borrowerInformation.factoryAddress.contact.key}`
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

      <!--  partnersInformation -->
      <div v-if="modelTemp.partnersInformation">
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.partnersInformation.title) }}</div>
          <el-row type="flex" :gutter="20" class="font-16 flex-warp">
            <div
              class="subInfo-view subInfo-flex-warp-margin"
              v-for="(partnersItem, partnersIndex) in widgetOpts.partnersInformation.partnersWidgets"
              :key="widgetOpts.partnersInformation.section + partnersIndex"
            >
              <el-form-item
                v-for="(widgetsItem, widgetsIndex) in partnersItem"
                :key="'widgetsIndex' + widgetsIndex"
                :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                :label-width="setComputedWidth({ en: 160, zh: 160 })"
                :label="$t(widgetsItem.label)"
                :prop="
                  !widgetsItem.isObj
                    ? `${widgetOpts.partnersInformation.section}.${[partnersIndex]}.${[widgetsItem.key]}`
                    : `${widgetOpts.partnersInformation.section}.${[partnersIndex]}.name.${[widgetsItem.key]}`
                "
              >
                <el-input
                  v-if="widgetsItem.type === 'input' && !widgetsItem.isObj"
                  v-model="modelTemp[`${widgetOpts.partnersInformation.section}`][partnersIndex][widgetsItem.key]"
                  :placeholder="$t(widgetsItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-input
                  v-if="widgetsItem.type === 'input' && widgetsItem.isObj"
                  v-model="modelTemp[`${widgetOpts.partnersInformation.section}`][partnersIndex]['name'][widgetsItem.key]"
                  :placeholder="$t(widgetsItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="widgetsItem.type === 'select'"
                  v-model="modelTemp[`${widgetOpts.partnersInformation.section}`][partnersIndex]['name'][widgetsItem.key]"
                  :placeholder="$t(widgetsItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in widgetsItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>
          </el-row>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- mortgagorInformation -->
      <div v-if="modelTemp.mortgagorInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.mortgagorInformation.title) }}
            <!-- <el-button v-if="modelTemp.editStatus == 'SUBMIT'" type="primary" @click="handleEdit">
              {{ !isEdit ? `${$t('button.edit')}` : `${$t('button.cancelNoBlank')}` }}
            </el-button>
            <el-button v-if="isEdit" type="primary" @click="handleSave">{{ `${$t('button.save')}` }}</el-button> -->
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(mortgagoWidgetItem, mortgagoWidgetIndex) in widgetOpts.mortgagorInformation.widgets"
              :key="widgetOpts.mortgagorInformation.section + mortgagoWidgetIndex"
              :label-width="setComputedWidth({ en: 90, zh: 90 })"
              :label="$t(mortgagoWidgetItem.label)"
              :prop="`${[mortgagoWidgetItem.key]}`"
            >
              <el-input
                v-if="mortgagoWidgetItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.mortgagorInformation.section}`][mortgagoWidgetItem.key]"
                :placeholder="$t(mortgagoWidgetItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="mortgagoWidgetItem.type === 'select'"
                :value="modelTemp[`${widgetOpts.mortgagorInformation.section}`][mortgagoWidgetItem.key]"
                :placeholder="$t(mortgagoWidgetItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in mortgagoWidgetItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- .mortgagorInformation.name -->
          <div v-if="modelTemp.mortgagorInformation.name">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.mortgagorInformation.name.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                  v-for="(nameItem, nameIndex) in widgetOpts.mortgagorInformation.name.widgets"
                  :key="widgetOpts.mortgagorInformation.name.title + nameIndex"
                  :label-width="setComputedWidth({ en: 90, zh: 90 })"
                  :label="$t(nameItem.label)"
                  :prop="`${[nameItem.key]}`"
                >
                  <el-input
                    v-if="nameItem.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.name.key}`][nameItem.key]"
                    :placeholder="$t(nameItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .mortgagorInformation.motherName -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.mortgagorInformation.motherName">
            <div class="section section-margin">
              {{ $t(widgetOpts.mortgagorInformation.motherName.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                v-for="(motherNameItem, motherNameIndex) in widgetOpts.mortgagorInformation.motherName.widgets"
                :key="widgetOpts.mortgagorInformation.motherName.title + motherNameIndex"
                :label-width="setComputedWidth({ en: 90, zh: 90 })"
                :label="$t(motherNameItem.label)"
                :prop="`${[motherNameItem.key]}`"
              >
                <el-input
                  v-if="motherNameItem.type === 'input'"
                  v-model="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.motherName.key}`][motherNameItem.key]
                  "
                  :placeholder="$t(motherNameItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <!-- .mortgagorInformation.fatherName -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.mortgagorInformation.fatherName">
            <div class="section section-margin">
              {{ $t(widgetOpts.mortgagorInformation.fatherName.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                v-for="(fatherNameItem, fatherNameIndex) in widgetOpts.mortgagorInformation.fatherName.widgets"
                :key="widgetOpts.mortgagorInformation.fatherName.title + fatherNameIndex"
                :label-width="setComputedWidth({ en: 90, zh: 90 })"
                :label="$t(fatherNameItem.label)"
                :prop="`${[fatherNameItem.key]}`"
              >
                <el-input
                  v-if="fatherNameItem.type === 'input'"
                  v-model="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.fatherName.key}`][fatherNameItem.key]
                  "
                  :placeholder="$t(fatherNameItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <!-- .mortgagorInformation.residencePhone -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.mortgagorInformation.residencePhone">
            <div class="section section-margin">
              {{ $t(widgetOpts.mortgagorInformation.residencePhone.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                v-for="(residencePhoneItem, residencePhoneIndex) in widgetOpts.mortgagorInformation.residencePhone.widgets"
                :key="widgetOpts.mortgagorInformation.residencePhone.title + residencePhoneIndex"
                :label-width="setComputedWidth({ en: 100, zh: 100 })"
                :label="$t(residencePhoneItem.label)"
                :prop="`${[residencePhoneItem.key]}`"
              >
                <el-input
                  v-if="residencePhoneItem.type === 'input'"
                  v-model="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.residencePhone.key}`][
                      residencePhoneItem.key
                    ]
                  "
                  :placeholder="$t(residencePhoneItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <!-- .mortgagorInformation.officePhone -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.mortgagorInformation.officePhone">
            <div class="section section-margin">
              {{ $t(widgetOpts.mortgagorInformation.officePhone.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                v-for="(officePhoneItem, officePhoneIndex) in widgetOpts.mortgagorInformation.officePhone.widgets"
                :key="widgetOpts.mortgagorInformation.officePhone.title + officePhoneIndex"
                :label-width="setComputedWidth({ en: 100, zh: 100 })"
                :label="$t(officePhoneItem.label)"
                :prop="`${[officePhoneItem.key]}`"
              >
                <el-input
                  v-if="officePhoneItem.type === 'input'"
                  v-model="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.officePhone.key}`][officePhoneItem.key]
                  "
                  :placeholder="$t(officePhoneItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <!-- .mortgagorInformation.fax -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.mortgagorInformation.fax">
            <div class="section section-margin">
              {{ $t(widgetOpts.mortgagorInformation.fax.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                v-for="(faxItem, faxIndex) in widgetOpts.mortgagorInformation.fax.widgets"
                :key="widgetOpts.mortgagorInformation.fax.title + faxIndex"
                :label-width="setComputedWidth({ en: 100, zh: 100 })"
                :label="$t(faxItem.label)"
                :prop="`${[faxItem.key]}`"
              >
                <el-input
                  v-if="faxItem.type === 'input'"
                  v-model="modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.fax.key}`][faxItem.key]"
                  :placeholder="$t(faxItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <!-- mortgagorInformation.presentAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.mortgagorInformation.presentAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.mortgagorInformation.presentAddress.title) }}
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
                v-for="(presentAddressItem, presentAddressIndex) in widgetOpts.mortgagorInformation.presentAddress.widgets"
                :key="widgetOpts.mortgagorInformation.presentAddress.title + presentAddressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(presentAddressItem.label)"
                :prop="`${[presentAddressItem.key]}`"
              >
                <el-input
                  v-if="presentAddressItem.type === 'input'"
                  :type="presentAddressItem.inputType ? presentAddressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.presentAddress.key}`][
                      presentAddressItem.key
                    ]
                  "
                  :placeholder="$t(presentAddressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="presentAddressItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.presentAddress.key}`][
                      presentAddressItem.key
                    ]
                  "
                  :placeholder="$t(presentAddressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in presentAddressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
              <el-divider></el-divider>
            </div>

            <!-- presentAddress.stay -->
            <div v-if="modelTemp.mortgagorInformation.presentAddress.stay">
              <div class="section section-margin">
                {{ $t(widgetOpts.mortgagorInformation.presentAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.mortgagorInformation.presentAddress.stay.widgets"
                  :key="widgetOpts.mortgagorInformation.presentAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.presentAddress.key}`][
                        `${widgetOpts.mortgagorInformation.presentAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- presentAddress.contact -->
            <div v-if="modelTemp.mortgagorInformation.presentAddress.contact">
              <div class="section section-margin">
                {{ $t(widgetOpts.mortgagorInformation.presentAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.mortgagorInformation.presentAddress.contact.widgets"
                  :key="widgetOpts.mortgagorInformation.presentAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.presentAddress.key}`][
                        `${widgetOpts.mortgagorInformation.presentAddress.contact.key}`
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

          <!-- mortgagorInformation.permanentAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.mortgagorInformation.permanentAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.mortgagorInformation.permanentAddress.title) }}
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
                v-for="(permanentAddressItem, permanentAddressIndex) in widgetOpts.mortgagorInformation.permanentAddress.widgets"
                :key="widgetOpts.mortgagorInformation.permanentAddress.title + permanentAddressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(permanentAddressItem.label)"
                :prop="`${[permanentAddressItem.key]}`"
              >
                <el-input
                  v-if="permanentAddressItem.type === 'input'"
                  :type="permanentAddressItem.inputType ? permanentAddressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.permanentAddress.key}`][
                      permanentAddressItem.key
                    ]
                  "
                  :placeholder="$t(permanentAddressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="permanentAddressItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.permanentAddress.key}`][
                      permanentAddressItem.key
                    ]
                  "
                  :placeholder="$t(permanentAddressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in permanentAddressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
              <el-divider></el-divider>
            </div>

            <!-- permanentAddress.stay -->
            <div v-if="modelTemp.mortgagorInformation.permanentAddress.stay">
              <div class="section section-margin">
                {{ $t(widgetOpts.mortgagorInformation.permanentAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.mortgagorInformation.permanentAddress.stay.widgets"
                  :key="widgetOpts.mortgagorInformation.permanentAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.permanentAddress.key}`][
                        `${widgetOpts.mortgagorInformation.permanentAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
              <el-divider></el-divider>
            </div>

            <!-- permanentAddress.contact -->
            <div v-if="modelTemp.mortgagorInformation.permanentAddress.contact">
              <div class="section section-margin">
                {{ $t(widgetOpts.mortgagorInformation.permanentAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.mortgagorInformation.permanentAddress.contact.widgets"
                  :key="widgetOpts.mortgagorInformation.permanentAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.mortgagorInformation.section}`][`${widgetOpts.mortgagorInformation.permanentAddress.key}`][
                        `${widgetOpts.mortgagorInformation.permanentAddress.contact.key}`
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

      <!-- spouseInformation -->
      <div v-if="modelTemp.spouseInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.spouseInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(spouseInformationItem, spouseInformationIndex) in widgetOpts.spouseInformation.widgets"
              :key="widgetOpts.spouseInformation.section + spouseInformationIndex"
              :label-width="setComputedWidth({ en: 90, zh: 90 })"
              :label="$t(spouseInformationItem.label)"
              :prop="`${[spouseInformationItem.key]}`"
            >
              <el-input
                v-if="spouseInformationItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.spouseInformation.section}`][spouseInformationItem.key]"
                :placeholder="$t(spouseInformationItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="spouseInformationItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.spouseInformation.section}`][spouseInformationItem.key]"
                :placeholder="$t(spouseInformationItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in spouseInformationItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- name -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.spouseInformation.name">
            <div class="section section-margin">
              {{ $t(widgetOpts.spouseInformation.name.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                v-for="(nameItem, nameIndex) in widgetOpts.spouseInformation.name.widgets"
                :key="widgetOpts.spouseInformation.name.title + nameIndex"
                :label-width="setComputedWidth({ en: 90, zh: 90 })"
                :label="$t(nameItem.label)"
                :prop="`${[nameItem.key]}`"
              >
                <el-input
                  v-if="nameItem.type === 'input'"
                  v-model="modelTemp[`${widgetOpts.spouseInformation.section}`][`${widgetOpts.spouseInformation.name.key}`][nameItem.key]"
                  :placeholder="$t(nameItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <!-- sssOrGsis -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.spouseInformation.sssOrGsis">
            <div class="section section-margin">
              {{ $t(widgetOpts.spouseInformation.sssOrGsis.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                v-for="(sssOrGsisItem, sssOrGsisIndex) in widgetOpts.spouseInformation.sssOrGsis.widgets"
                :key="widgetOpts.spouseInformation.sssOrGsis.title + sssOrGsisIndex"
                :label-width="setComputedWidth({ en: 60, zh: 60 })"
                :label="$t(sssOrGsisItem.label)"
                :prop="`${[sssOrGsisItem.key]}`"
              >
                <el-input
                  v-if="sssOrGsisItem.type === 'input'"
                  v-model="modelTemp[`${widgetOpts.spouseInformation.section}`][`${widgetOpts.spouseInformation.sssOrGsis.key}`][sssOrGsisItem.key]"
                  :placeholder="$t(sssOrGsisItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>

          <!-- officePhone -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.spouseInformation.officePhone">
            <div class="section section-margin">
              {{ $t(widgetOpts.spouseInformation.officePhone.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                v-for="(officePhoneItem, officePhoneIndex) in widgetOpts.spouseInformation.officePhone.widgets"
                :key="widgetOpts.spouseInformation.officePhone.title + officePhoneIndex"
                :label-width="setComputedWidth({ en: 100, zh: 100 })"
                :label="$t(officePhoneItem.label)"
                :prop="`${[officePhoneItem.key]}`"
              >
                <el-input
                  v-if="officePhoneItem.type === 'input'"
                  v-model="
                    modelTemp[`${widgetOpts.spouseInformation.section}`][`${widgetOpts.spouseInformation.officePhone.key}`][officePhoneItem.key]
                  "
                  :placeholder="$t(officePhoneItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- collateralInformation -->
      <div v-if="modelTemp.collateralInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.collateralInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 370, zh: 370 }), margin: '0px 10px 16px 0px' }"
              v-for="(collateralItem, collateralIndex) in widgetOpts.collateralInformation.widgets"
              :key="`${widgetOpts.collateralInformation.section}` + collateralIndex"
              :label-width="setComputedWidth({ en: 170, zh: 170 })"
              :label="$t(collateralItem.label)"
              :prop="`${[collateralItem.key]}`"
            >
              <el-input
                v-if="collateralItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.collateralInformation.section}`][collateralItem.key]"
                :placeholder="$t(collateralItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- loanInformation -->
      <div v-if="modelTemp.loanInformation">
        <div style="margin-top: 20px; background: blue"></div>
        <el-divider></el-divider>
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.loanInformation.title) }}
          </div>
          <!-- base info -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(loanInformationItem, loanInformationIndex) in widgetOpts.loanInformation.widgets"
              :key="widgetOpts.loanInformation.section + loanInformationIndex"
              :label-width="setComputedWidth({ en: 100, zh: 100 })"
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

          <!-- .loanInformation.purpose -->
          <div v-if="modelTemp.loanInformation.purpose">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.loanInformation.purpose.title) }}
              </div>

              <!--  workingCapital -->
              <div class="subInfo-view">
                <div class="section section-margin">
                  {{ $t(widgetOpts.loanInformation.purpose.workingCapital.title) }}
                </div>
                <el-form-item
                  v-for="(widgetItem, widgetIndex) in widgetOpts.loanInformation.purpose.workingCapital.widgets"
                  :key="'workingCapital' + widgetIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                  :label-width="setComputedWidth({ en: 115, zh: 115 })"
                  :prop="`.${[widgetItem.key]}`"
                >
                  <div style="margin-right: 20px; margin-top: 0px" slot="label">
                    <el-checkbox
                      :disabled="!isEdit"
                      :indeterminate="widgetOpts.loanInformation.purpose.workingCapital.isFileIndeterminate"
                      v-model="widgetOpts.loanInformation.purpose.workingCapital.checkFileAll"
                      @change="handleCheckBoxAllValue($event, 'workingCapital', widgetItem)"
                    >
                      {{ $t('button.checkAll') }}
                    </el-checkbox>
                  </div>
                  <el-checkbox-group
                    :disabled="!isEdit"
                    v-model="modelTemp.loanInformation.purpose.workingCapital"
                    @change="getFileCheckboxValue($event, 'workingCapital')"
                  >
                    <el-checkbox v-for="(item, index) in widgetItem.list" :key="'workingCapital' + index" :label="item.value">
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>

              <!--  capex -->
              <div class="subInfo-view subInfo-margin">
                <div class="section section-margin">
                  {{ $t(widgetOpts.loanInformation.purpose.capex.title) }}
                </div>
                <el-form-item
                  v-for="(widgetItem, widgetIndex) in widgetOpts.loanInformation.purpose.capex.widgets"
                  :key="'capex' + widgetIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                  :label-width="setComputedWidth({ en: 115, zh: 115 })"
                  :prop="`.${[widgetItem.key]}`"
                >
                  <div style="margin-right: 20px; margin-top: 0px" slot="label">
                    <el-checkbox
                      :disabled="!isEdit"
                      :indeterminate="widgetOpts.loanInformation.purpose.capex.isFileIndeterminate"
                      v-model="widgetOpts.loanInformation.purpose.capex.checkFileAll"
                      @change="handleCheckBoxAllValue($event, 'capex', widgetItem)"
                    >
                      {{ $t('button.checkAll') }}
                    </el-checkbox>
                  </div>
                  <el-checkbox-group
                    :disabled="!isEdit"
                    v-model="modelTemp.loanInformation.purpose.capex"
                    @change="getFileCheckboxValue($event, 'capex')"
                  >
                    <el-checkbox v-for="(item, index) in widgetItem.list" :key="'capex' + index" :label="item.value">
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>

              <!--  investment -->
              <div class="subInfo-view subInfo-margin" style="margin-bottom: 20px">
                <div class="section section-margin">
                  {{ $t(widgetOpts.loanInformation.purpose.investment.title) }}
                </div>
                <el-form-item
                  v-for="(widgetItem, widgetIndex) in widgetOpts.loanInformation.purpose.investment.widgets"
                  :key="'investment' + widgetIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                  :label-width="setComputedWidth({ en: 115, zh: 115 })"
                  :prop="`.${[widgetItem.key]}`"
                >
                  <div style="margin-right: 20px; margin-top: 0px" slot="label">
                    <el-checkbox
                      :disabled="!isEdit"
                      :indeterminate="widgetOpts.loanInformation.purpose.investment.isFileIndeterminate"
                      v-model="widgetOpts.loanInformation.purpose.investment.checkFileAll"
                      @change="handleCheckBoxAllValue($event, 'investment', widgetItem)"
                    >
                      {{ $t('button.checkAll') }}
                    </el-checkbox>
                  </div>
                  <el-checkbox-group
                    :disabled="!isEdit"
                    v-model="modelTemp.loanInformation.purpose.investment"
                    @change="getFileCheckboxValue($event, 'investment')"
                  >
                    <el-checkbox v-for="(item, index) in widgetItem.list" :key="'investment' + index" :label="item.value">
                      {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  financialInformation -->
      <div v-if="modelTemp.financialInformation">
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.financialInformation.title) }}</div>

          <!-- deposits -->
          <div class="subInfo-view subInfo-margin" v-if="widgetOpts.financialInformation.deposits.depositsWidgets.length > 0">
            <div class="section section-margin">{{ $t(widgetOpts.financialInformation.deposits.title) }}</div>
            <el-row type="flex" :gutter="20" class="font-16 flex-warp">
              <div
                class="subInfo-view subInfo-flex-warp-margin"
                v-for="(depositsItem, depositsIndex) in widgetOpts.financialInformation.deposits.depositsWidgets"
                :key="widgetOpts.financialInformation.section + widgetOpts.financialInformation.deposits.title + depositsIndex"
              >
                <el-form-item
                  v-for="(widgetsItem, widgetsIndex) in depositsItem"
                  :key="'widgetsIndex' + widgetsIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                  :label-width="setComputedWidth({ en: 140, zh: 140 })"
                  :label="$t(widgetsItem.label)"
                  :prop="`${widgetOpts.financialInformation.section}.${widgetOpts.financialInformation.deposits.key}.${[depositsIndex]}.${[
                    widgetsItem.key
                  ]}`"
                >
                  <el-input
                    v-if="widgetsItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][widgetOpts.financialInformation.deposits.key][depositsIndex][
                        widgetsItem.key
                      ]
                    "
                    :placeholder="$t(widgetsItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                  <el-date-picker
                    :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                    @input="$forceUpdate()"
                    v-if="widgetsItem.type === 'date'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][widgetOpts.financialInformation.deposits.key][depositsIndex][
                        widgetsItem.key
                      ]
                    "
                    :readonly="!isEdit"
                    :value-format="widgetsItem.valueFormat || 'MMyyyy'"
                    type="date"
                    :placeholder="$t(widgetsItem.placeholder)"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-row>
          </div>

          <!-- loans -->
          <div class="subInfo-view subInfo-margin" v-if="widgetOpts.financialInformation.loans.loansWidgets.length > 0">
            <div class="section section-margin">{{ $t(widgetOpts.financialInformation.loans.title) }}</div>
            <el-row type="flex" :gutter="20" class="font-16 flex-warp">
              <div
                class="subInfo-view subInfo-flex-warp-margin"
                v-for="(loansItem, loansIndex) in widgetOpts.financialInformation.loans.loansWidgets"
                :key="widgetOpts.financialInformation.section + widgetOpts.financialInformation.loans.title + loansIndex"
              >
                <el-form-item
                  v-for="(widgetsItem, widgetsIndex) in loansItem"
                  :key="'widgetsIndex' + widgetsIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                  :label-width="setComputedWidth({ en: 140, zh: 140 })"
                  :label="$t(widgetsItem.label)"
                  :prop="`${widgetOpts.financialInformation.section}.${widgetOpts.financialInformation.loans.key}.${[loansIndex]}.${[
                    widgetsItem.key
                  ]}`"
                >
                  <el-input
                    v-if="widgetsItem.type === 'input'"
                    :value="
                      modelTemp[`${widgetOpts.financialInformation.section}`][widgetOpts.financialInformation.loans.key][loansIndex][widgetsItem.key]
                    "
                    :placeholder="$t(widgetsItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                  <el-date-picker
                    :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                    v-if="widgetsItem.type === 'date'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][widgetOpts.financialInformation.loans.key][loansIndex][widgetsItem.key]
                    "
                    :readonly="!isEdit"
                    :value-format="widgetsItem.valueFormat || 'yyyyMMdd'"
                    type="date"
                    :placeholder="$t(widgetsItem.placeholder)"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-row>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  tradeReferences -->
      <div v-if="modelTemp.tradeReferences">
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.tradeReferences.title) }}</div>
          <!-- majorCustomers -->
          <div class="subInfo-view" v-if="widgetOpts.tradeReferences.majorCustomers.widgets.length > 0">
            <div class="section section-margin">{{ $t(widgetOpts.tradeReferences.majorCustomers.title) }}</div>
            <el-row type="flex" :gutter="20" class="font-16 flex-warp">
              <div
                class="subInfo-view subInfo-flex-warp-margin"
                v-for="(majorCustomersItem, majorCustomersIndex) in widgetOpts.tradeReferences.majorCustomers.widgets"
                :key="widgetOpts.tradeReferences.section + widgetOpts.tradeReferences.majorCustomers.title + majorCustomersIndex"
              >
                <el-form-item
                  v-for="(widgetsItem, widgetsIndex) in majorCustomersItem"
                  :key="'widgetsIndex' + widgetsIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                  :label-width="setComputedWidth({ en: 170, zh: 170 })"
                  :label="$t(widgetsItem.label)"
                  :prop="`${widgetOpts.tradeReferences.section}.${widgetOpts.tradeReferences.majorCustomers.key}.${[majorCustomersIndex]}.${[
                    majorCustomersItem.key
                  ]}`"
                >
                  <el-input
                    v-if="widgetsItem.type === 'input'"
                    :value="
                      modelTemp[`${widgetOpts.tradeReferences.section}`][widgetOpts.tradeReferences.majorCustomers.key][majorCustomersIndex][
                        majorCustomersItem.key
                      ]
                    "
                    :placeholder="$t(widgetsItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                  <el-date-picker
                    :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                    v-if="widgetsItem.type === 'date'"
                    v-model="
                      modelTemp[`${widgetOpts.tradeReferences.section}`][widgetOpts.tradeReferences.majorCustomers.key][majorCustomersIndex][
                        widgetsItem.key
                      ]
                    "
                    :readonly="!isEdit"
                    :value-format="widgetsItem.valueFormat || 'yyyyMMdd'"
                    type="date"
                    :placeholder="$t(widgetsItem.placeholder)"
                  ></el-date-picker>
                </el-form-item>
                <el-divider></el-divider>
              </div>
            </el-row>
          </div>

          <!-- majorSuppliers -->
          <div class="subInfo-view subInfo-margin" v-if="widgetOpts.tradeReferences.majorSuppliers.widgets.length > 0">
            <div class="section section-margin">{{ $t(widgetOpts.tradeReferences.majorSuppliers.title) }}</div>
            <el-row type="flex" :gutter="20" class="font-16 flex-warp">
              <div
                class="subInfo-view subInfo-flex-warp-margin"
                v-for="(majorSuppliersItem, majorSuppliersIndex) in widgetOpts.tradeReferences.majorSuppliers.widgets"
                :key="widgetOpts.tradeReferences.section + widgetOpts.tradeReferences.majorSuppliers.title + majorSuppliersIndex"
              >
                <el-form-item
                  v-for="(widgetsItem, widgetsIndex) in majorSuppliersItem"
                  :key="'widgetsIndex' + widgetsIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                  :label-width="setComputedWidth({ en: 170, zh: 170 })"
                  :label="$t(widgetsItem.label)"
                  :prop="`${widgetOpts.tradeReferences.section}.${widgetOpts.tradeReferences.majorSuppliers.key}.${[majorSuppliersIndex]}.${[
                    widgetsItem.key
                  ]}`"
                >
                  <el-input
                    v-if="widgetsItem.type === 'input'"
                    :value="
                      modelTemp[`${widgetOpts.tradeReferences.section}`][widgetOpts.tradeReferences.majorSuppliers.key][majorSuppliersIndex][
                        widgetsItem.key
                      ]
                    "
                    :placeholder="$t(widgetsItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                  <el-date-picker
                    :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                    v-if="widgetsItem.type === 'date'"
                    v-model="
                      modelTemp[`${widgetOpts.tradeReferences.section}`][widgetOpts.tradeReferences.majorSuppliers.key][majorSuppliersIndex][
                        widgetsItem.key
                      ]
                    "
                    :readonly="!isEdit"
                    :value-format="widgetsItem.valueFormat || 'yyyyMMdd'"
                    type="date"
                    :placeholder="$t(widgetsItem.placeholder)"
                  ></el-date-picker>
                </el-form-item>
                <el-divider></el-divider>
              </div>
            </el-row>
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
