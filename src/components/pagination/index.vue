<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/components/pagination/index.vue
 * @Date         : 2022-02-10 16:35:31
 * @LastEditTime : 2022-10-26 15:43:46
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div v-if="sumTotal > 10" class="my-pagination">
    <el-pagination
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="sumTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    sumTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handle-size', val)
    },
    handleCurrentChange(val) {
      this.$emit('handle-current', val)
    }
  }
}
</script>

<style scoped>
.my-pagination {
  padding: 20px 10px;
  text-align: right;
  overflow: hidden;
}
</style>
