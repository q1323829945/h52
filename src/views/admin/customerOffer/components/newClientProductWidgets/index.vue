<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/customerOffer/components/newClientProductWidgets/index.vue
 * @Date         : 2022-08-12 16:06:34
 * @LastEditTime : 2022-08-19 16:46:45
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<!--  -->
<template>
  <div class="detail-base">
    <el-form ref="newClientProductFormData" :inline="true" :model="modelTemp" size="small" :label-width="labelWidth" @submit.native.prevent>
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

      <!-- cif -->
      <div v-if="modelTemp.cif">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.cif.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 280, zh: 280 }), margin: '0px 10px 16px 0px' }"
              v-for="(cifItem, cifIndex) in widgetOpts.cif.widgets"
              :key="widgetOpts.cif.section + cifIndex"
              :label-width="setComputedWidth({ en: 60, zh: 60 })"
              :label="$t(cifItem.label)"
              :prop="`${[cifItem.key]}`"
            >
              <el-input
                v-if="cifItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.cif.section}`][cifItem.key]"
                :placeholder="$t(cifItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="cifItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.cif.section}`][cifItem.key]"
                :placeholder="$t(cifItem.placeholder)"
                :disabled="!isEdit"
              >
                <el-option v-for="option in cifItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
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
                :value-format="customerItem.valueFormat || 'yyyy-MM-dd'"
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

      <!-- contactInformation -->
      <div v-if="modelTemp.contactInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.contactInformation.title) }}
          </div>
          <!-- 基础信息 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(contactItem, contactIndex) in widgetOpts.contactInformation.widgets"
              :key="widgetOpts.contactInformation + contactIndex"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
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

          <!-- .contactInformation.mobileInformation -->
          <div v-if="modelTemp.contactInformation.mobileInformation">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.mobileInformation.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(mobileItem, mobileIndex) in widgetOpts.contactInformation.mobileInformation.widgets"
                  :key="widgetOpts.contactInformation.mobileInformation.title + mobileIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(mobileItem.label)"
                  :prop="`${[mobileItem.key]}`"
                >
                  <el-input
                    v-if="mobileItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.mobileInformation.key}`][mobileItem.key]
                    "
                    :placeholder="$t(mobileItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .contactInformation.homeLandline -->
          <div v-if="modelTemp.contactInformation.homeLandline">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.homeLandline.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(homeLandlineItem, homeLandlineIndex) in widgetOpts.contactInformation.homeLandline.widgets"
                  :key="widgetOpts.contactInformation.homeLandline.title + homeLandlineIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(homeLandlineItem.label)"
                  :prop="`${[homeLandlineItem.key]}`"
                >
                  <el-input
                    v-if="homeLandlineItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.homeLandline.key}`][homeLandlineItem.key]
                    "
                    :placeholder="$t(homeLandlineItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- contactInformation.homeAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.contactInformation.homeAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.contactInformation.homeAddress.title) }}
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
                v-for="(homeAddressItem, homeAddressIndex) in widgetOpts.contactInformation.homeAddress.widgets"
                :key="widgetOpts.contactInformation.homeAddress.title + homeAddressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(homeAddressItem.label)"
                :prop="`${[homeAddressItem.key]}`"
              >
                <el-input
                  v-if="homeAddressItem.type === 'input'"
                  :type="homeAddressItem.inputType ? homeAddressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.homeAddress.key}`][homeAddressItem.key]
                  "
                  :placeholder="$t(homeAddressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="homeAddressItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.homeAddress.key}`][homeAddressItem.key]
                  "
                  :placeholder="$t(homeAddressItem.placeholder)"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in homeAddressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- homeAddress.stay -->
            <div v-if="modelTemp.contactInformation.homeAddress.stay">
              <el-divider></el-divider>
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.homeAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.contactInformation.homeAddress.stay.widgets"
                  :key="widgetOpts.contactInformation.homeAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.homeAddress.key}`][
                        `${widgetOpts.contactInformation.homeAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- homeAddress.contact -->
            <div v-if="modelTemp.contactInformation.homeAddress.contact">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.homeAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.contactInformation.homeAddress.contact.widgets"
                  :key="widgetOpts.contactInformation.homeAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.homeAddress.key}`][
                        `${widgetOpts.contactInformation.homeAddress.contact.key}`
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

          <!-- contactInformation.alternateAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.contactInformation.alternateAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.contactInformation.alternateAddress.title) }}
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
                v-for="(alternateAddressItem, alternateAddressIndex) in widgetOpts.contactInformation.alternateAddress.widgets"
                :key="widgetOpts.contactInformation.alternateAddress.title + alternateAddressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(alternateAddressItem.label)"
                :prop="`${[alternateAddressItem.key]}`"
              >
                <el-input
                  v-if="alternateAddressItem.type === 'input'"
                  :type="alternateAddressItem.inputType ? alternateAddressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.alternateAddress.key}`][
                      alternateAddressItem.key
                    ]
                  "
                  :placeholder="$t(alternateAddressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="alternateAddressItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.alternateAddress.key}`][
                      alternateAddressItem.key
                    ]
                  "
                  :placeholder="$t(alternateAddressItem.placeholder)"
                  ref="kycSelect"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in alternateAddressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- alternateAddress.stay -->
            <div v-if="modelTemp.contactInformation.alternateAddress.stay">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.alternateAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.contactInformation.alternateAddress.stay.widgets"
                  :key="widgetOpts.contactInformation.alternateAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 90, zh: 90 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.alternateAddress.key}`][
                        `${widgetOpts.contactInformation.alternateAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- alternateAddress.contact -->
            <div v-if="modelTemp.contactInformation.alternateAddress.contact">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.alternateAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.contactInformation.alternateAddress.contact.widgets"
                  :key="widgetOpts.contactInformation.alternateAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.alternateAddress.key}`][
                        `${widgetOpts.contactInformation.alternateAddress.contact.key}`
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

          <!-- .contactInformation.workLandline -->
          <div v-if="modelTemp.contactInformation.workLandline">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.workLandline.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
                  v-for="(workLandlineItem, workLandlineIndex) in widgetOpts.contactInformation.workLandline.widgets"
                  :key="widgetOpts.contactInformation.workLandline.title + workLandlineIndex"
                  :label-width="setComputedWidth({ en: 110, zh: 110 })"
                  :label="$t(workLandlineItem.label)"
                  :prop="`${[workLandlineItem.key]}`"
                >
                  <el-input
                    v-if="workLandlineItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.workLandline.key}`][workLandlineItem.key]
                    "
                    :placeholder="$t(workLandlineItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- contactInformation.workAddress -->
          <div class="subInfo-view subInfo-margin" v-if="modelTemp.contactInformation.workAddress">
            <div class="section section-margin">
              {{ $t(widgetOpts.contactInformation.workAddress.title) }}
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
                v-for="(workAddressItem, workAddressIndex) in widgetOpts.contactInformation.workAddress.widgets"
                :key="widgetOpts.contactInformation.workAddress.title + workAddressIndex"
                :label-width="
                  setComputedWidth({
                    en: 280,
                    zh: 280
                  })
                "
                :label="$t(workAddressItem.label)"
                :prop="`${[workAddressItem.key]}`"
              >
                <el-input
                  v-if="workAddressItem.type === 'input'"
                  :type="workAddressItem.inputType ? workAddressItem.inputType : 'text'"
                  :autosize="{ minRows: 1, maxRows: 1 }"
                  v-model="
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.workAddress.key}`][workAddressItem.key]
                  "
                  :placeholder="$t(workAddressItem.placeholder)"
                  :readonly="!isEdit"
                  clearable
                />
                <el-select
                  v-if="workAddressItem.type === 'select'"
                  :value="
                    modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.workAddress.key}`][workAddressItem.key]
                  "
                  :placeholder="$t(workAddressItem.placeholder)"
                  ref="kycSelect"
                  :disabled="!isEdit"
                >
                  <el-option v-for="option in workAddressItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
                </el-select>
              </el-form-item>
            </div>

            <!-- workAddress.stay -->
            <div v-if="modelTemp.contactInformation.workAddress.stay">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.workAddress.stay.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 270, zh: 270 }), margin: '0px 10px 16px 0px' }"
                  v-for="(stayWidgetItem, stayWidgetIndex) in widgetOpts.contactInformation.workAddress.stay.widgets"
                  :key="widgetOpts.contactInformation.workAddress.stay.title + stayWidgetIndex"
                  :label-width="setComputedWidth({ en: 90, zh: 90 })"
                  :label="$t(stayWidgetItem.label)"
                  :prop="`${[stayWidgetItem.key]}`"
                >
                  <el-input
                    v-if="stayWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.workAddress.key}`][
                        `${widgetOpts.contactInformation.workAddress.stay.key}`
                      ][stayWidgetItem.key]
                    "
                    :placeholder="$t(stayWidgetItem.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>

            <!-- workAddress.contact -->
            <div v-if="modelTemp.contactInformation.workAddress.contact">
              <el-divider></el-divider>

              <div class="section section-margin">
                {{ $t(widgetOpts.contactInformation.workAddress.contact.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
                  v-for="(contactWidgetItem, contactWidgetIndex) in widgetOpts.contactInformation.workAddress.contact.widgets"
                  :key="widgetOpts.contactInformation.workAddress.contact.title + contactWidgetIndex"
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
                  :label="$t(contactWidgetItem.label)"
                  :prop="`${[contactWidgetItem.key]}`"
                >
                  <el-input
                    v-if="contactWidgetItem.type === 'input'"
                    v-model="
                      modelTemp[`${widgetOpts.contactInformation.section}`][`${widgetOpts.contactInformation.workAddress.key}`][
                        `${widgetOpts.contactInformation.workAddress.contact.key}`
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

      <!-- personalInformation -->
      <div v-if="modelTemp.personalInformation">
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.personalInformation.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(personalItem, personalIndex) in widgetOpts.personalInformation.widgets"
              :key="widgetOpts.personalInformation.section + personalIndex"
              :label-width="setComputedWidth({ en: 100, zh: 100 })"
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
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in personalItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- signatureStatus -->
      <div>
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.signatureStatus.title) }}
          </div>
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 370, zh: 370 }), margin: '0px 10px 16px 0px' }"
              v-for="(signatureStatusItem, signatureStatusIndex) in widgetOpts.signatureStatus.widgets"
              :key="widgetOpts.personalInformation.section + signatureStatusIndex"
              :label-width="setComputedWidth({ en: 165, zh: 165 })"
              :label="$t(signatureStatusItem.label)"
              :prop="`${[signatureStatusItem.valueKey]}${[signatureStatusItem.key]}`"
            >
              <el-input
                v-if="signatureStatusItem.type === 'input'"
                v-model="modelTemp[`${signatureStatusItem.valueKey}`][signatureStatusItem.key]"
                :placeholder="$t(signatureStatusItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <el-divider></el-divider>
      </div>

      <!-- internal -->
      <div>
        <div class="datasource">
          <div class="section">
            {{ $t(widgetOpts.internal.title) }}
          </div>
          <!-- 基础数据 -->
          <div>
            <el-form-item
              :style="{ width: setSysComputedWidth({ en: 320, zh: 320 }), margin: '0px 10px 16px 0px' }"
              v-for="(internalItem, internalIndex) in widgetOpts.internal.widgets"
              :key="widgetOpts.internal.section + internalIndex"
              :label-width="setComputedWidth({ en: 110, zh: 110 })"
              :label="$t(internalItem.label)"
              :prop="`${[internalItem.key]}`"
            >
              <el-input
                v-if="internalItem.type === 'input'"
                v-model="modelTemp[`${widgetOpts.internal.section}`][internalItem.key]"
                :placeholder="$t(internalItem.placeholder)"
                :readonly="!isEdit"
                clearable
              />
              <el-select
                v-if="internalItem.type === 'select'"
                v-model="modelTemp[`${widgetOpts.internal.section}`][internalItem.key]"
                :placeholder="$t(internalItem.placeholder)"
                ref="kycSelect"
                :disabled="!isEdit"
              >
                <el-option v-for="option in internalItem.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
              </el-select>
              <el-date-picker
                :style="{ width: setSysComputedWidth({ en: 182, zh: 182 }) }"
                @input="$forceUpdate()"
                v-if="internalItem.type === 'date'"
                v-model="modelTemp[`${widgetOpts.internal.section}`][internalItem.key]"
                :readonly="!isEdit"
                :value-format="internalItem.valueFormat || 'yyyy-MM-dd'"
                type="date"
                :placeholder="$t(internalItem.placeholder)"
              />
            </el-form-item>
          </div>

          <!-- .internal.id1 -->
          <div v-if="modelTemp.internal.id1">
            <div class="subInfo-view">
              <div class="section section-margin">
                {{ $t(widgetOpts.internal.id1.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                  v-for="(id1Item, id1Index) in widgetOpts.internal.id1.widgets"
                  :key="widgetOpts.internal.id1.title + id1Index"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(id1Item.label)"
                  :prop="`${[id1Item.key]}`"
                >
                  <el-input
                    v-if="id1Item.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.internal.section}`][`${widgetOpts.internal.id1.key}`][id1Item.key]"
                    :placeholder="$t(id1Item.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .internal.id2 -->
          <div v-if="modelTemp.internal.id2">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.internal.id2.title) }}
              </div>
              <div>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 290, zh: 290 }), margin: '0px 10px 16px 0px' }"
                  v-for="(id2Item, id2Index) in widgetOpts.internal.id2.widgets"
                  :key="widgetOpts.internal.id2.title + id2Index"
                  :label-width="setComputedWidth({ en: 60, zh: 60 })"
                  :label="$t(id2Item.label)"
                  :prop="`${[id2Item.key]}`"
                >
                  <el-input
                    v-if="id2Item.type === 'input'"
                    v-model="modelTemp[`${widgetOpts.internal.section}`][`${widgetOpts.internal.id2.key}`][id2Item.key]"
                    :placeholder="$t(id2Item.placeholder)"
                    :readonly="!isEdit"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
          </div>

          <!-- .internal.biometrics -->
          <div v-if="modelTemp.internal.biometrics">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.internal.biometrics.title) }}
              </div>
              <el-form-item
                v-for="(widgetItem, widgetIndex) in widgetOpts.internal.biometrics.widgets"
                :key="'biometrics' + widgetIndex"
                :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                :label-width="setComputedWidth({ en: 115, zh: 100 })"
                :prop="`.${[widgetItem.key]}`"
              >
                <div style="margin-right: 20px; margin-top: 0px" slot="label">
                  <el-checkbox
                    :disabled="!isEdit"
                    :indeterminate="widgetOpts.internal.biometrics.isFileIndeterminate"
                    v-model="widgetOpts.internal.biometrics.checkFileAll"
                    @change="handleCheckBoxAllValue($event, 'biometrics', widgetItem)"
                  >
                    {{ $t('button.checkAll') }}
                  </el-checkbox>
                </div>
                <el-checkbox-group :disabled="!isEdit" v-model="modelTemp.internal.biometrics" @change="getFileCheckboxValue($event, 'biometrics')">
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
                  :label-width="setComputedWidth({ en: 70, zh: 70 })"
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
                  :label-width="setComputedWidth({ en: 140, zh: 140 })"
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
              :style="{ width: setSysComputedWidth({ en: 300, zh: 300 }), margin: '0px 10px 16px 0px' }"
              v-for="(adaItem, adaIndex) in widgetOpts.adaInformation.widgets"
              :key="widgetOpts.adaInformation.section + adaIndex"
              :label-width="setComputedWidth({ en: 95, zh: 95 })"
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
                  :label-width="setComputedWidth({ en: 100, zh: 100 })"
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

          <!-- .financialInformation.fundsSource -->
          <div v-if="modelTemp.financialInformation.fundsSource">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.financialInformation.fundsSource.title) }}
              </div>
              <el-form-item
                v-for="(widgetItem, widgetIndex) in widgetOpts.financialInformation.fundsSource.widgets"
                :key="'fundsSource' + widgetIndex"
                :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                :label-width="setComputedWidth({ en: 115, zh: 115 })"
                :prop="`.${[widgetItem.key]}`"
              >
                <div style="margin-right: 20px; margin-top: 0px" slot="label">
                  <el-checkbox
                    :disabled="!isEdit"
                    :indeterminate="widgetOpts.financialInformation.fundsSource.isFileIndeterminate"
                    v-model="widgetOpts.financialInformation.fundsSource.checkFileAll"
                    @change="handleCheckBoxAllValue($event, 'fundsSource', widgetItem)"
                  >
                    {{ $t('button.checkAll') }}
                  </el-checkbox>
                </div>
                <el-checkbox-group
                  :disabled="!isEdit"
                  v-model="modelTemp.financialInformation.fundsSource"
                  @change="getFileCheckboxValue($event, 'fundsSource')"
                >
                  <el-checkbox v-for="(item, index) in widgetItem.list" :key="'loanFile' + index" :label="item.value">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>

          <!-- .financialInformation.natures -->
          <div v-if="modelTemp.financialInformation.natures">
            <div class="subInfo-view subInfo-margin">
              <div class="section section-margin">
                {{ $t(widgetOpts.financialInformation.natures.title) }}
              </div>
              <el-form-item
                v-for="(widgetItem, widgetIndex) in widgetOpts.financialInformation.natures.widgets"
                :key="'natures' + widgetIndex"
                :style="{ width: setComputedWidth({ en: '100%', zh: '100%' }) }"
                :label-width="setComputedWidth({ en: 115, zh: 115 })"
                :prop="`.${[widgetItem.key]}`"
              >
                <div style="margin-right: 20px; margin-top: 0px" slot="label">
                  <el-checkbox
                    :disabled="!isEdit"
                    :indeterminate="widgetOpts.financialInformation.natures.isFileIndeterminate"
                    v-model="widgetOpts.financialInformation.natures.checkFileAll"
                    @change="handleCheckBoxAllValue($event, 'natures', widgetItem)"
                  >
                    {{ $t('button.checkAll') }}
                  </el-checkbox>
                </div>
                <el-checkbox-group
                  :disabled="!isEdit"
                  v-model="modelTemp.financialInformation.natures"
                  @change="getFileCheckboxValue($event, 'natures')"
                >
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
