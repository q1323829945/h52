<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/position/components/positionChangeDialog/index.vue
 * @Date         : 2022-08-30 17:23:18
 * @LastEditTime : 2022-11-03 09:50:26
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <!-- form表单 -->
  <div>
    <div class="form-view">
      <el-form ref="positionChangeForm" :inline="true" size="small" :model="modelTemp.data" :label-width="labelWidth" :rules="rules">
        <el-form-item v-for="(item, key) in modelTemp.data" :key="key" :label="$t(modelTemp.labels[key])" :prop="`${key}`" :label-width="labelWidth">
          <el-input v-if="key == 'name'" type="text" v-model="modelTemp.data.name" :placeholder="'Enter a name'"></el-input>
          <el-input v-if="key == 'remark'" type="text" v-model="modelTemp.data.remark" :placeholder="'Enter a remark'"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 穿梭框 -->
    <el-divider />
    <div class="transfer-view">
      <!-- :right-default-checked="modelTemp.data.usersSelectList" -->
      <el-transfer
        ref="reserve"
        style="text-align: left; display: inline-block"
        :titles="['Unselected User', 'Seletced User']"
        v-model="modelTemp.data.usersSelectList"
        :data="usersAllList"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="Enter a user name"
        @left-check-change="handleLeftChange"
        @right-check-change="handleRightChange"
      ></el-transfer>
    </div>
    <el-divider />
  </div>
</template>

<script>
export default {
  name: 'positionChangeDialog',
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '60px'
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    // 是否有为插槽
    isSlot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      usersAllList: [],
      modelTemp: this.model,
      value: [],
      // 搜索
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  computed: {
    rules() {
      // 表单验证
      const rules = {
        name: [{ required: true, message: 'Name can not be empty', trigger: 'blur' }]
      }
      return rules
    }
  },
  created() {
    this.usersAllList = this.modelTemp.data.usersAllList
  },
  methods: {
    handChange(value, direction, movedKeys) {
      console.log('value==>', value)
      console.log('direction==>', direction)
      console.log('movedKeys==>', movedKeys)
      if (direction == 'right') {
        console.log('this.usersAllList==>', this.usersAllList) //这个就是它包含的所有的属性以及事件，如果需要别的操作直接执行，也可以查询到
        console.log('usersAllList==>', this.modelTemp.data.usersAllList) //这个就是它包含的所有的属性以及事件，如果需要别的操作直接执行，也可以查询到
      }
    },
    handleLeftChange() {
      this.$nextTick(() => {
        this.$refs.reserve.addToRight() //直接执行到右事件
      })
    },
    handleRightChange() {
      this.$nextTick(() => {
        this.$refs.reserve.addToLeft() //直接执行到右事件
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form-view {
  margin-bottom: -70px;
}

.transfer-view {
  margin: 30px 0px 30px 0px;
  display: flex;
  justify-content: center;
  // background: rebeccapurple;
}
</style>

<style scoped>
.transfer-view >>> .el-transfer-panel__header {
  text-align: left;
}

.transfer-view >>> .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
  font-size: 14px;
}

/* .transfer-view >>> .el-transfer-panel__body {
  height: 400px;
} */

.form-view >>> .el-select,
.el-input {
  width: 100%;
}

.form-view >>> .el-form-item {
  margin: 0px 30px 16px 0px;
  min-width: 200px;
  /* display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center; */
  /* background: blue; */
}
.form-view >>> .el-form-item .el-form-item__label {
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
.form-view >>> .el-form-item .el-form-item__content {
  margin-left: 0;
  min-width: 80px;
  flex: 1;
}
.form-view >>> .el-range-separator {
  padding: 0;
  width: 15px;
}

.form-view >>> .el-divider {
  margin: 0;
}
.form-view >>> .toolbar-section .el-form-item {
  margin-bottom: 0;
}
</style>
