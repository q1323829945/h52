<template>
  <el-form :inline="true" :model="searchModel" size="small" :label-width="labelWidth" class="search-bar" @submit.native.prevent>
    <!--  -->
    <el-row>
      <!-- search -->
      <el-col :span="20" class="leftBlock">
        <el-col :span="8" v-for="(item, index) in optionList" :key="index">
          <el-form-item :label-width="item.width" :label="$t(item.label)">
            <el-input
              v-if="item.type === 'input'"
              v-model="searchModel[item.key]"
              :placeholder="$t(item.placeholder)"
              clearable
              @clear="handleQuery"
            />
            <el-date-picker
              v-if="item.type === 'date'"
              v-model="searchModel[item.key]"
              :clearable="item.clearable"
              type="daterange"
              :format="item.valueFormat || 'yyyyMMdd'"
              :range-separator="$t('date.to')"
              :start-placeholder="$t('date.startPlaceholde')"
              :end-placeholder="$t('date.endPlaceholder')"
              @change="handleDateChange"
              @blur="dateBlur"
            ></el-date-picker>
            <el-date-picker
              v-if="item.type === 'singleDate'"
              v-model="searchModel[item.key]"
              :format="item.valueFormat || 'yyyyMMdd'"
              type="date"
              :placeholder="$t('date.selectDate')"
            ></el-date-picker>
            <el-select
              v-if="item.type === 'select'"
              v-model="searchModel[item.key]"
              :placeholder="$t(item.placeholder)"
              clearable
              @clear="handleQuery"
              @focus="selectFocus(item.key, searchModel)"
              :filterable="item.filterable"
            >
              <el-option v-for="option in item.list" :key="option.value" :label="$t(option.label)" :value="option.value" />
            </el-select>
            <!-- input + select -->
            <el-input v-if="item.type === 'combination'" placeholder="请输入内容" v-model="searchModel[item.key]" clearable>
              <el-select v-model="searchModel[item.select]" clearable slot="prepend" :placeholder="$t('select.place')">
                <el-option v-for="option in item.list" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
            </el-input>
            <!-- 级联 -->
            <el-cascader
              v-if="item.type === 'cascader'"
              clearable
              :show-all-levels="item.showAllLevels"
              :props="item.props"
              v-model="searchModel[item.key]"
              @clear="handleQuery"
              :options="item.options"
              :placeholder="$t('select.place')"
            />
            <!-- 区间 -->
            <div class="interval" v-if="item.type === 'interval'">
              <el-col :span="11">
                <el-input placeholder="请输入开始值" style="width: 49%" v-model="searchModel[item.startKey]" clearable @clear="handleQuery" />
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input placeholder="请输入结束值" style="width: 49%" v-model="searchModel[item.endKey]" clearable @clear="handleQuery" />
              </el-col>
            </div>
          </el-form-item>
          <slot name="condition" :data="searchModel"></slot>
        </el-col>
      </el-col>

      <!-- right -->
      <el-col :span="6" class="rightBlock">
        <el-form-item class="btn-container">
          <el-button v-if="isSearch" type="primary" icon="el-icon-search" @click="handleQuery">{{ $t('button.query') }}</el-button>
          <el-button v-if="isReset" icon="el-icon-refresh" @click="handleReset">{{ $t('button.reset') }}</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider v-if="optionList.length > 0"></el-divider>

    <!-- toolbar -->
    <el-row :gutter="20" v-show="toolbar" class="toolbar">
      <div class="toolbar-section">
        <el-form-item>
          <!-- <template v-if="addPermisssion">
            <el-button v-if="isAdd" type="primary" icon="el-icon-circle-plus-outline" @click="handlePush">新增</el-button>
          </template>
          <template v-else>
            <el-button v-if="isAdd" type="primary" icon="el-icon-circle-plus-outline" @click="handlePush">新增</el-button>
          </template>
          <template v-if="exportPermisssion">
            <el-button v-if="isExport" type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
          </template>
          <template v-else>
            <el-button v-if="isExport" type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
          </template> -->
          <el-button
            v-if="isAdd"
            :id="toolbarObj.addClassId ? toolbarObj.addClassId : ''"
            type="primary"
            :icon="toolbarObj.addIcon"
            @click="handlePush"
          >
            {{ $t(toolbarObj.add) }}
          </el-button>
          <el-button v-if="isExport" type="primary" icon="el-icon-download" @click="handleExport">{{ $t(toolbarObj.export) }}</el-button>
          <el-button v-if="isImport" type="primary" icon="el-icon-upload2" @click="handleImport">{{ $t(toolbarObj.import) }}</el-button>
          <slot :data="searchModel" />
          <template>
            <template v-if="toolbarObj.slot">
              <slot :name="toolbarObj.slot.slotName" />
            </template>
          </template>
        </el-form-item>
      </div>
    </el-row>
  </el-form>
</template>

<script>
import utils from '@/utils'
export default {
  name: 'searchBar',
  props: {
    labelWidth: {
      type: String,
      default: '60px'
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    // 工具栏配置
    toolbarObj: {
      type: Object,
      default() {
        return {
          addIcon: 'el-icon-circle-plus-outline',
          add: 'button.add',
          export: 'button.export',
          import: 'button.import'
        }
      }
    },
    optionList: {
      type: Array,
      required: true
    },
    // 是否添加新增按钮
    isAdd: {
      type: Boolean,
      default: false
    },
    // 是否添加导入按钮
    isImport: {
      type: Boolean,
      default: false
    },
    // 是否添加导出按钮
    isExport: {
      type: Boolean,
      default: false
    },
    // 是否添加重置按钮
    isReset: {
      type: Boolean,
      default: true
    },
    // 是否添加搜索
    isSearch: {
      type: Boolean,
      default: true
    },
    // 是否有为插槽
    isSlot: {
      type: Boolean,
      default: false
    },
    // 是否有添加功能
    addPermisssion: {
      type: String,
      default: ''
    },
    // 是否有导出功能
    exportPermisssion: {
      type: String,
      default: ''
    }
  },
  computed: {
    toolbar: function () {
      return this.isAdd || this.isImport || this.isExport || this.isSlot
    }
  },
  watch: {
    model: {
      handler() {},
      deep: true
    }
  },
  data() {
    return {
      searchModel: {}
    }
  },
  created() {
    if (!utils.isNull(JSON.stringify(this.model))) {
      this.searchModel = this.model
    }
  },
  methods: {
    // 查询
    handleQuery() {
      this.$emit('handle-query', this.searchModel)
    },
    // 重置
    handleReset() {
      this.$emit('handle-reset', this.searchModel)
    },
    // 新增
    handlePush() {
      this.$emit('handle-push')
    },
    // 导出
    handleExport() {
      this.$emit('handle-export', this.searchModel)
    },
    // 导入
    handleImport() {
      this.$emit('handle-import')
    },
    // 时间选择
    handleDateChange(event) {
      if (utils.objKey(this.searchModel, 'date')) {
        if (utils.isArray(this.searchModel.date)) {
          this.searchModel.date[0] = utils.fomartDate(event[0], '{y}-{m}-{d}')
          this.searchModel.date[1] = utils.fomartDate(event[1], '{y}-{m}-{d}')
        } else {
          this.searchModel.date = utils.fomartDate(event, '{y}-{m}-{d}')
        }
      }
    },
    // 时间选择弹窗关闭
    dateBlur() {
      this.$emit('date-blur', this.searchModel)
    },
    // 下拉框获取焦点
    selectFocus(key, data) {
      let obj = {
        key,
        data
      }
      this.$emit('select-focus', obj)
    }
  }
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding-left: 0;
}
.search-bar >>> .el-date-editor,
.el-input,
.el-select,
.el-cascader,
.el-date-picker {
  width: 100%;
}

.search-bar >>> .el-date-editor,
.el-date-picker {
  min-width: 100%;
}

/* .search-bar >>> .el-input,
.el-select,
.el-cascader {
  width: 100% !important;
}
.search-bar >>> .el-date-editor,
.el-date-picker {
  min-width: 100%;
} */

.search-bar >>> .el-form-item {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background: forestgreen; */
}
.search-bar >>> .el-form-item .el-form-item__label {
  float: left;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-width: 120px;
  width: 120px;
  word-break: break-word;
  font-size: 13px;
  height: 34px;
  justify-content: flex-end;
  align-items: center;
  /* background: red; */
}
.search-bar >>> .el-form-item .el-form-item__content {
  margin-left: 0 !important;
  min-width: 150px;
  flex: 1;
}
.search-bar >>> .el-range-separator {
  padding: 0;
  width: 15px;
}
.search-bar >>> .rightBlock {
  text-align: right;
  position: absolute;
  width: 200px;
  right: 0px;
  bottom: 0;
  /* background: slategray; */
}

/* .search-bar >>> .leftBlock {
  background: slateblue;
} */

.search-bar >>> .toolbar-section {
  padding: 8px;
}
.search-bar >>> .el-divider {
  margin: 0;
}
.search-bar >>> .toolbar-section .el-form-item {
  margin-bottom: 0;
}
.search-bar >>> .interval {
  width: 100%;
  display: flex;
}
.search-bar >>> .interval .line {
  text-align: center;
}
.search-bar >>> .toolbar {
  margin-left: 0 !important;
}
</style>
