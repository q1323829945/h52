<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/components/teacherProductWidgets/index.vue
 * @Date         : 2022-08-12 16:06:34
 * @LastEditTime : 2022-08-19 16:40:40
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<!--  -->
<template>
  <div class="detail-base">
    <el-form ref="teacherProductFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
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
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(editStatusItem, editStatusIndex) in widgetOpts.editStatus.widgets"
              :key="widgetOpts.editStatus.section + editStatusIndex"
              :label-width="setComputedWidth({ en: 125, zh: 125 })"
              :label="$t(editStatusItem.label)"
              :prop="`${[editStatusItem.key]}`"
            >
              <el-input
                v-if="editStatusItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.editStatus.section}`][editStatusItem.key]"
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
      </div>

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
                :value-format="personalItem.valueFormat || 'yyyy-MM-dd'"
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

      <!-- contactInformation -->
      <div v-if="modelTemp.contactInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.contactInformation.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 310, zh: 310 }), margin: '0px 10px 16px 0px' }"
              v-for="(contactItem, contactIndex) in widgetOpts.contactInformation.widgets"
              :key="widgetOpts.contactInformation.section + contactIndex"
              :label-width="setComputedWidth({ en: 105, zh: 105 })"
              :label="$t(contactItem.label)"
              :prop="`${[contactItem.key]}`"
            >
              <el-input
                v-if="contactItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.contactInformation.section}`][contactItem.key]"
                :placeholder="$t(contactItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>

          <!-- contactInformation.presentAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.contactInformation.presentAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.contactInformation.presentAddress.title) }}
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
                v-for="(presentAddressItem, presentAddressIndex) in widgetOpts.contactInformation.presentAddress.widgets"
                :key="widgetOpts.contactInformation.presentAddress.title + presentAddressIndex"
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
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.presentAddress.key}`][
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
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.presentAddress.key}`][
                      presentAddressItem.key
                    ]
                  "
                  :placeholder="$t(presentAddressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in presentAddressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- presentAddress.stay -->
            <div v-if="modelTemp.contactInformation.presentAddress.stay">
              <el-divider></el-divider>
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.presentAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.contactInformation.presentAddress.stay.widgets"
                  :key="widgetOpts.contactInformation.presentAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.presentAddress.key}`][
                        `${widgetOpts.contactInformation.presentAddress.stay.key}`
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
            <div v-if="modelTemp.contactInformation.presentAddress.contact">
              <el-divider></el-divider>
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.presentAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.contactInformation.presentAddress.contact.widgets"
                  :key="widgetOpts.contactInformation.presentAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.presentAddress.key}`][
                        `${widgetOpts.contactInformation.presentAddress.contact.key}`
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

          <!-- contactInformation.permanentAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.contactInformation.permanentAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.contactInformation.permanentAddress.title) }}
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
                v-for="(permanentAddressItem, permanentAddressIndex) in widgetOpts.contactInformation.permanentAddress.widgets"
                :key="widgetOpts.contactInformation.permanentAddress.title + permanentAddressIndex"
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
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.permanentAddress.key}`][
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
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.permanentAddress.key}`][
                      permanentAddressItem.key
                    ]
                  "
                  :placeholder="$t(permanentAddressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in permanentAddressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- permanentAddress.stay -->
            <el-divider></el-divider>
            <div v-if="modelTemp.contactInformation.permanentAddress.stay">
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.permanentAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.contactInformation.permanentAddress.stay.widgets"
                  :key="widgetOpts.contactInformation.permanentAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.permanentAddress.key}`][
                        `${widgetOpts.contactInformation.permanentAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- permanentAddress.contact -->
            <div v-if="modelTemp.contactInformation.permanentAddress.contact">
              <el-divider></el-divider>
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.permanentAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.contactInformation.permanentAddress.contact.widgets"
                  :key="widgetOpts.contactInformation.permanentAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.permanentAddress.key}`][
                        `${widgetOpts.contactInformation.permanentAddress.contact.key}`
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

      <!-- educationalBackground -->
      <div v-if="modelTemp.channel">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.educationalBackground.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 340, zh: 340 }), margin: '0px 10px 16px 0px' }"
              v-for="(educationalBackgroundItem, educationalBackgroundIndex) in widgetOpts.educationalBackground.widgets"
              :key="widgetOpts.educationalBackground.section + educationalBackgroundIndex"
              :label-width="setComputedWidth({ en: 145, zh: 145 })"
              :label="$t(educationalBackgroundItem.label)"
              :prop="`${[educationalBackgroundItem.key]}`"
            >
              <el-input
                v-if="educationalBackgroundItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.educationalBackground.section}`][educationalBackgroundItem.key]"
                :placeholder="$t(educationalBackgroundItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="educationalBackgroundItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.educationalBackground.section}`][educationalBackgroundItem.key]"
                :placeholder="$t(educationalBackgroundItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in educationalBackgroundItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- employmentInformation -->
      <div v-if="modelTemp.employmentInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.employmentInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 330, zh: 330 }), margin: '0px 10px 16px 0px' }"
              v-for="(employmentItem, employmentIndex) in widgetOpts.employmentInformation.widgets"
              :key="widgetOpts.employmentInformation.section + employmentIndex"
              :label-width="setComputedWidth({ en: 130, zh: 130 })"
              :label="$t(employmentItem.label)"
              :prop="`${[employmentItem.key]}`"
            >
              <el-input
                v-if="employmentItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.employmentInformation.section}`][employmentItem.key]"
                :placeholder="$t(employmentItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="employmentItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.employmentInformation.section}`][employmentItem.key]"
                :placeholder="$t(employmentItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in employmentItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- employmentInformation.address -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.employmentInformation.address">
            <div class="section section-margin">
              {{ $t(widgetOpts.employmentInformation.address.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 10px 16px 0px' }"
                v-for="(addressItem, addressIndex) in widgetOpts.employmentInformation.address.widgets"
                :key="widgetOpts.employmentInformation.title + widgetOpts.employmentInformation.address.title + addressIndex"
                :label-width="setComputedWidth({ en: 280, zh: 280 })"
                :label="$t(addressItem.label)"
                :prop="`${[addressItem.key]}`"
              >
                <el-input
                  v-if="addressItem.type === 'input'"
                  :type="addressItem.inputType ? addressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.employmentInformation.section}`][`${widgetOpts.employmentInformation.address.key}`][addressItem.key]
                  "
                  :placeholder="$t(addressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="addressItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.employmentInformation.section}`][`${widgetOpts.employmentInformation.address.key}`][addressItem.key]
                  "
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in addressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- address.stay -->
            <div v-if="modelTemp.employmentInformation.address.stay">
              <el-divider></el-divider>
              <div class="section section-margin">
                {{ $t(widgetOpts.employmentInformation.address.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 280, zh: 280 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.employmentInformation.address.stay.widgets"
                  :key="widgetOpts.employmentInformation.address.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.employmentInformation.section}`][`${widgetOpts.employmentInformation.address.key}`][
                        `${widgetOpts.employmentInformation.address.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- address.contact -->
            <div v-if="modelTemp.employmentInformation.address.contact">
              <el-divider></el-divider>
              <div class="section section-margin">
                {{ $t(widgetOpts.employmentInformation.address.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.employmentInformation.address.contact.widgets"
                  :key="widgetOpts.employmentInformation.address.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.employmentInformation.section}`][`${widgetOpts.employmentInformation.address.key}`][
                        `${widgetOpts.employmentInformation.address.contact.key}`
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
              v-for="(employmentItem, employmentIndex) in widgetOpts.spouseInformation.widgets"
              :key="widgetOpts.spouseInformation.section + employmentIndex"
              :label-width="setComputedWidth({ en: 100, zh: 100 })"
              :label="$t(employmentItem.label)"
              :prop="`${[employmentItem.key]}`"
            >
              <el-input
                v-if="employmentItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.spouseInformation.section}`][employmentItem.key]"
                :placeholder="$t(employmentItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="employmentItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.spouseInformation.section}`][employmentItem.key]"
                :placeholder="$t(employmentItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in employmentItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>

          <!-- spouseInformation.name -->
          <div v-if="modelTemp.spouseInformation.name">
            <div class="subInfo-view">
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
          </div>

          <!-- spouseInformation.address -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.spouseInformation.employerAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.spouseInformation.employerAddress.title) }}
            </div>
            <div>
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 10px 16px 0px' }"
                v-for="(addressItem, addressIndex) in widgetOpts.spouseInformation.employerAddress.widgets"
                :key="widgetOpts.spouseInformation.title + widgetOpts.spouseInformation.employerAddress.title + addressIndex"
                :label-width="setComputedWidth({ en: 280, zh: 280 })"
                :label="$t(addressItem.label)"
                :prop="`${[addressItem.key]}`"
              >
                <el-input
                  v-if="addressItem.type === 'input'"
                  :type="addressItem.inputType ? addressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.spouseInformation.section}`][`${widgetOpts.spouseInformation.employerAddress.key}`][addressItem.key]
                  "
                  :placeholder="$t(addressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="addressItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.spouseInformation.section}`][`${widgetOpts.spouseInformation.employerAddress.key}`][addressItem.key]
                  "
                  :placeholder="$t(addressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in addressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- address.stay -->
            <div v-if="modelTemp.spouseInformation.employerAddress.stay">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.spouseInformation.employerAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 280, zh: 280 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.spouseInformation.employerAddress.stay.widgets"
                  :key="widgetOpts.spouseInformation.employerAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.spouseInformation.section}`][`${widgetOpts.spouseInformation.employerAddress.key}`][
                        `${widgetOpts.spouseInformation.employerAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- address.contact -->
            <div v-if="modelTemp.spouseInformation.employerAddress.contact">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.spouseInformation.employerAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 340, zh: 340 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.spouseInformation.employerAddress.contact.widgets"
                  :key="widgetOpts.spouseInformation.employerAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 145, zh: 145 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.spouseInformation.section}`][`${widgetOpts.spouseInformation.employerAddress.key}`][
                        `${widgetOpts.spouseInformation.employerAddress.contact.key}`
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
          <!-- 基础数据 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 340, zh: 340 }), margin: '0px 10px 16px 0px' }"
              v-for="(loanInformationItem, loanInformationIndex) in widgetOpts.loanInformation.widgets"
              :key="widgetOpts.loanInformation.section + loanInformationIndex"
              :label-width="setComputedWidth({ en: 145, zh: 145 })"
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
          <div class="subInfo-view">
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
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- disbursalMode -->
      <div v-if="modelTemp.disbursalMode">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.disbursalMode.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 370, zh: 370 }), margin: '0px 10px 16px 0px' }"
              v-for="(disbursalModeItem, disbursalModeIndex) in widgetOpts.disbursalMode.widgets"
              :key="widgetOpts.disbursalMode.section + disbursalModeIndex"
              :label-width="setComputedWidth({ en: 165, zh: 165 })"
              :label="$t(disbursalModeItem.label)"
              :prop="`${[disbursalModeItem.key]}`"
            >
              <el-input
                v-if="disbursalModeItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.disbursalMode.section}`][disbursalModeItem.key]"
                :placeholder="$t(disbursalModeItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!--  characterReferences -->
      <div v-if="modelTemp.characterReferences">
        <div class="datasource">
          <div class="section">{{ $t(widgetOpts.characterReferences.title) }}</div>
          <el-row type="flex" :gutter="20" class="font-16 flex-warp">
            <div
              class="subInfo-view subInfo-flex-warp-margin"
              v-for="(characterItem, characterndex) in widgetOpts.characterReferences.characterReferencesWidgets"
              :key="widgetOpts.characterReferences.section + characterndex"
            >
              <el-form-item
                v-for="(widgetsItem, widgetsIndex) in characterItem"
                :key="'widgetsIndex' + widgetsIndex"
                :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                :label-width="setComputedWidth({ en: 90, zh: 90 })"
                :label="$t(widgetsItem.label)"
                :prop="
                  !widgetsItem.isObj
                    ? `${widgetOpts.characterReferences.section}.${[characterndex]}.${[widgetsItem.key]}`
                    : `${widgetOpts.characterReferences.section}.${[characterndex]}.name.${[widgetsItem.key]}`
                "
              >
                <el-input
                  v-if="widgetsItem.type === 'input' && !widgetsItem.isObj"
                  v-model="modelTemp[`${widgetOpts.characterReferences.section}`][characterndex][widgetsItem.key]"
                  :placeholder="$t(widgetsItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-input
                  v-if="widgetsItem.type === 'input' && widgetsItem.isObj"
                  v-model="modelTemp[`${widgetOpts.characterReferences.section}`][characterndex]['name'][widgetsItem.key]"
                  :placeholder="$t(widgetsItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </el-row>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- financialInformation -->
      <div v-if="modelTemp.financialInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.financialInformation.title) }}
          </div>
          <!-- 基础数据 -->
          <div :style="{ margin: '15px 0px 0px 0px' }">
            <el-row type="flex" :gutter="20" class="font-16 flex-warp">
              <div
                class="subInfo-view"
                :style="{ width: '270px', padding: '20px 20px 0px 20px', margin: '5px 10px 15px 10px' }"
                v-for="(financialItem, financialIndex) in widgetOpts.financialInformation.widgets"
                :key="widgetOpts.financialInformation.section + financialIndex"
              >
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 40px 20px 0px' }"
                  :label-width="setComputedWidth({ en: 230, zh: 230 })"
                  :label="''"
                  :prop="`${[financialItem.key]}`"
                >
                  <div class="section" :style="{ padding: '0px 0px 0px 0px' }">{{ $t(financialItem.label) }}</div>
                  <div class="financialInformation-label">{{ 'Select' }}</div>
                  <el-select
                    v-model="modelTemp[`${widgetOpts.financialInformation.section}`][financialItem.key]"
                    :placeholder="$t(financialItem.placeholder)"
                    :disabled="!isEdit"
                    :ref="financialItem.key"
                    @change="handleSelectChange(widgetOpts.financialInformation.section, financialItem)"
                  >
                    <el-option v-for="option in financialItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                  </el-select>

                  <div class="financialInformation-label">{{ 'Enter(Select other to enter)' }}</div>
                  <el-input
                    :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }) }"
                    v-model="financialInformationModel[financialItem.key]"
                    :placeholder="`Enter ${financialItem.label}`"
                    :readonly="!financialItem.isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </el-row>
          </div>

          <!-- financialInformation.creditCardInformation -->
          <div v-if="modelTemp.financialInformation.creditCardInformation">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.financialInformation.creditCardInformation.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(creditCardItem, creditCardIndex) in widgetOpts.financialInformation.creditCardInformation.widgets"
                  :key="widgetOpts.financialInformation.creditCardInformation.title + creditCardIndex"
                  :label-width="setComputedWidth({ en: 90, zh: 90 })"
                  :label="$t(creditCardItem.label)"
                  :prop="`${[creditCardItem.key]}`"
                >
                  <el-input
                    v-if="creditCardItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`][`${widgetOpts.financialInformation.creditCardInformation.key}`][
                        creditCardItem.key
                      ]
                    "
                    :placeholder="$t(creditCardItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- financialInformation.revenueDetails -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.financialInformation.revenueDetails">
            <!-- sourceOfIncome  -->
            <div class="section section-margin">{{ $t(widgetOpts.financialInformation.revenueDetails.sourceOfIncome.title) }}</div>
            <el-row type="flex" :gutter="20" class="font-16 flex-warp">
              <div
                class="subInfo-view subInfo-flex-warp-margin"
                v-for="(sourceOfIncomeItem, sourceOfIncomeIndex) in widgetOpts.financialInformation.revenueDetails.sourceOfIncome.widgets"
                :key="widgetOpts.financialInformation.revenueDetails.sourceOfIncome.title + sourceOfIncomeIndex"
              >
                <el-form-item
                  v-for="(widgetsItem, widgetsIndex) in sourceOfIncomeItem"
                  :key="'widgetsIndex' + widgetsIndex"
                  :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }), margin: '0px 0px 16px 0px' }"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(widgetsItem.label)"
                  :prop="`${widgetOpts.financialInformation.section}.${widgetOpts.financialInformation.revenueDetails.key}.${
                    widgetOpts.financialInformation.revenueDetails.sourceOfIncome.key
                  }.${[sourceOfIncomeIndex]}.${[widgetsItem.key]}`"
                >
                  <el-input
                    v-if="widgetsItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`]['revenueDetails']['sourceOfIncome'][sourceOfIncomeIndex][
                        widgetsItem.key
                      ]
                    "
                    :placeholder="$t(widgetsItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                  <el-select
                    v-if="widgetsItem.type === 'select'"
                    v-model="
                      modelTemp[`${widgetOpts.financialInformation.section}`]['revenueDetails']['sourceOfIncome'][sourceOfIncomeIndex][
                        widgetsItem.key
                      ]
                    "
                    :placeholder="$t(widgetsItem.placeholder)"
                    :disabled="!isEdit"
                  >
                    <el-option v-for="option in widgetsItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                  </el-select>
                </el-form-item>
                <el-divider></el-divider>
              </div>
            </el-row>

            <!-- totalIncome  -->
            <div>
              <div class="section section-margin">{{ $t(widgetOpts.financialInformation.revenueDetails.totalIncome.title) }}</div>
              <el-form-item
                v-for="(widgetsItem, widgetsIndex) in widgetOpts.financialInformation.revenueDetails.totalIncome.widgets"
                :key="widgetOpts.financialInformation.revenueDetails.totalIncome.title + widgetsIndex"
                :style="{ width: setComputedWidth({ en: 300, zh: 300 }), margin: '0px 0px 16px 0px' }"
                :label-width="setComputedWidth({ en: 100, zh: 100 })"
                :label="$t(widgetsItem.label)"
                :prop="`${widgetOpts.financialInformation.section}.${widgetOpts.financialInformation.revenueDetails.key}.${
                  widgetOpts.financialInformation.revenueDetails.totalIncome.key
                }.${[widgetsItem.key]}`"
              >
                <el-input
                  v-if="widgetsItem.type === 'input'"
                  v-model="modelTemp[`${widgetOpts.financialInformation.section}`]['revenueDetails']['totalIncome'][widgetsItem.key]"
                  :placeholder="$t(widgetsItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
              </el-form-item>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
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
