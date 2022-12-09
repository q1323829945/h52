<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/pdpa/components/detailWidget/index.vue
 * @Date         : 2022-07-19 16:31:41
 * @LastEditTime : 2022-10-11 10:18:22
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<!--  -->
<template>
  <div class="jsd-detail-base" style="margin-top: 20px">
    <el-form :model="modelTemp" ref="pdpaDetailWidgetFormData" :inline="true" size="small">
      <!-- select -->
      <div style="margin: 10px 0px">
        <el-form-item
          :style="{ width: setSysComputedWidth({ en: 320, zh: 285 }) }"
          v-for="(area, index) in modelTemp.area"
          :key="index"
          :label-width="setComputedWidth({ en: 120, zh: 90 })"
          :label="$t(area.label)"
          :prop="`area.${[index]}.value`"
          :rules="{
            required: true,
            message: `${$t(area.rulesMsg)}`,
            trigger: 'change'
          }"
        >
          <el-select v-model="area.value" :placeholder="$t(area.label)" :disabled="!isNewAdd" clearable>
            <el-option v-for="option in area.opts" :key="option.value" :label="$t(option.label)" :value="option.value" />
          </el-select>
        </el-form-item>
      </div>
      <el-divider class="area-divider"></el-divider>

      <!-- 信息列表可编辑 -->
      <div v-if="!onlyRead">
        <!-- 拖拽 -->
        <draggable
          class="content"
          ghost-class="ghost"
          chosen-class="chosen"
          handle=".button-thumb"
          :disabled="!isEdit"
          v-model="modelTemp.pdpaInformation"
          forceFallback="true"
          group="img"
          animation="300"
          @start="onStart"
          @end="onEnd"
        >
          <div class="subInfo-view subInfo-margin" v-for="(item, index) in modelTemp.pdpaInformation" :key="index">
            <div>
              <!-- 每一项下的信息增删 -->
              <div class="button-view" v-if="isEdit">
                <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" circle plain @click="handleAdd($event, index)"></el-button>
                <el-button
                  style="margin-left: 20px"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  plain
                  @click="handleDelete($event, 'item', { section: index })"
                ></el-button>
                <el-button class="button-thumb" size="mini" type="primary" icon="el-icon-thumb">Drag to sort</el-button>
              </div>
              <!-- 每一项名称 -->
              <el-form-item
                :style="{ width: setSysComputedWidth({ en: 310, zh: 280 }), padding: '20px 0px 0px 0px' }"
                :key="item.key"
                :label-width="setComputedWidth({ en: 110, zh: 80 })"
                :label="$t('pdpa.item')"
                :prop="`pdpaInformation.${[index]}.item`"
                :rules="{
                  required: isEdit,
                  message: `${$t('pdpa.itemRuleMessage')}`,
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model="item.item"
                  :disabled="isNewAdd ? false : !isEdit"
                  :placeholder="$t('pdpa.item')"
                  clearable
                  @focus="selectIndex = index"
                  @blur="selectIndex = -1"
                  @clear="selectIndex = index"
                />
              </el-form-item>
            </div>
            <!-- 每一项下信息列表 -->
            <div v-for="(informationItem, informationIndex) in item.information" :key="informationIndex" :index="informationIndex">
              <el-divider class="divider"></el-divider>
              <div>
                <el-button
                  class="sub-delete-button"
                  v-if="isEdit"
                  size="mini"
                  type="danger"
                  icon="el-icon-remove-outline"
                  plain
                  @click="handleDelete($event, 'informationItem', { section: index, index: informationIndex })"
                ></el-button>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 310, zh: 280 }) }"
                  :key="informationItem.key + 'label'"
                  :label-width="setComputedWidth({ en: 110, zh: 80 })"
                  :label="$t('pdpa.label')"
                  :prop="`pdpaInformation.${[index]}.information.${[informationIndex]}.label`"
                  :rules="{
                    required: isEdit,
                    message: `${$t('pdpa.labelRuleMessage')}`,
                    trigger: 'change'
                  }"
                >
                  <el-input
                    v-model="informationItem.label"
                    :disabled="isNewAdd ? false : !isEdit"
                    :placeholder="$t('pdpa.label')"
                    clearable
                    @focus="selectIndex = index"
                    @blur="selectIndex = -1"
                    @clear="selectIndex = index"
                  />
                </el-form-item>
                <el-form-item
                  :style="{ width: setSysComputedWidth({ en: 310, zh: 280 }) }"
                  :key="informationItem.key + 'name'"
                  :label-width="setComputedWidth({ en: 110, zh: 80 })"
                  :label="$t('pdpa.name')"
                  :prop="`pdpaInformation.${[index]}.information.${[informationIndex]}.name`"
                  :rules="{
                    required: isEdit,
                    message: `${$t('pdpa.nameRuleMessage')}`,
                    trigger: 'change'
                  }"
                >
                  <el-input
                    v-model="informationItem.name"
                    :disabled="isNewAdd ? false : !isEdit"
                    :placeholder="$t('pdpa.name')"
                    clearable
                    @focus="selectIndex = index"
                    @blur="selectIndex = -1"
                    @clear="selectIndex = index"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </draggable>
      </div>

      <!-- 信息列表只读 -->
      <div v-else>
        <div class="subInfo-view subInfo-margin" v-for="(item, index) in modelTemp.pdpaInformation" :key="index">
          <div>
            <!-- 每一项名称 -->
            <div class="section-view section-margin">{{ item.item }}</div>
          </div>
          <!-- 每一项下信息列表 -->
          <div>
            <!-- <el-divider class="divider"></el-divider> -->
            <!-- <el-button
                class="sub-delete-button"
                v-if="isEdit"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                plain
                @click="handleDelete($event, 'informationItem', { section: index, index: informationIndex })"
              ></el-button> -->
            <el-form-item
              v-for="(informationItem, informationIndex) in item.information"
              :key="informationIndex"
              :index="informationIndex"
              :label="informationItem.label"
              :prop="`pdpaInformation.${[index]}.information.${[informationIndex]}.name`"
              :rules="{
                required: isEdit,
                message: `${$t('pdpa.nameRuleMessage')}`,
                trigger: 'change'
              }"
            >
              <el-input
                v-model="informationItem.name"
                :disabled="isNewAdd ? false : !isEdit"
                :placeholder="$t('pdpa.name')"
                clearable
                @focus="selectIndex = index"
                @blur="selectIndex = -1"
                @clear="selectIndex = index"
              />
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
</style>
