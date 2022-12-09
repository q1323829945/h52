<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/components/publicTable/index.vue
 * @Date         : 2022-02-11 13:16:43
 * @LastEditTime : 2022-11-15 09:54:39
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <el-table
    ref="myTable"
    :data="tableData"
    highlight-current-row
    stripe
    border
    max-height="600"
    @selection-change="handleChecked"
    style="width: 100%; margin: 10px 0"
    :row-class-name="tableRowClassName"
  >
    <template v-if="rowKey">
      <el-table-column type="selection" width="55" :selectable="selecTable" />
    </template>
    <template v-if="!rowKey && isIndex">
      <el-table-column type="index" :label="$t('common.number')" width="80" fixed align="left" />
    </template>
    <el-table-column
      v-for="(item, index) in tableHead"
      :key="index"
      :fixed="item.fixed || false"
      :label="$t(`${item.label}`)"
      :show-overflow-tooltip="item.isTooltip || true"
      :width="item.width"
      min-width="200%"
      :class-name="item.className || ''"
      :align="
        item.type === 'slot' && (item.slotName == 'handle' || item.slotName == 'delete' || item.slotName == 'detail' || item.slotName == 'operation')
          ? 'center'
          : 'left'
      "
    >
      <template slot-scope="scope">
        <template v-if="item.type === 'slot'">
          <slot :name="item.slotName" :data="scope.row" />
        </template>
        <template v-else>{{ scope.row[item.value] }}</template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/* 通用表格 */
export default {
  name: 'publicTable',
  props: {
    height: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      required: true
    },
    tableHead: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String
    },
    isIndex: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChecked(val) {
      this.$emit('handle-checked', val)
    },
    tableRowClassName({ row }) {
      this.$emit('table-row-class-name', row)
    }
  }
}
</script>

<style lang="less">
// .el-table {
//   width: 100%;
//   .el-table__header-wrapper table,
//   .el-table__body-wrapper table {
//     width: 100% !important;
//   }
//   .el-table__body,
//   .el-table__footer,
//   .el-table__header {
//     table-layout: auto;
//   }
// }
</style>
