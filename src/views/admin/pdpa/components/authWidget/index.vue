<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/pdpa/components/authWidget/index.vue
 * @Date         : 2022-07-20 16:37:20
 * @LastEditTime : 2022-07-20 16:37:20
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div class="jsd-detail-base">
    <el-form :inline="true" size="small">
      <el-form-item
        :style="{ width: setSysComputedWidth({ en: 360, zh: 320 }) }"
        v-for="(item, key) in modelTemp"
        :key="key"
        :label-width="setComputedWidth({ en: 160, zh: 120 })"
        :label="$t(item.label)"
      >
        <el-select v-model="item.value" :placeholder="$t(item.label)" @change="selectChange()">
          <el-option v-for="option in item.selectList" :key="option.value" :label="$t(option.label)" :value="option.value" />
        </el-select>
      </el-form-item>
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
