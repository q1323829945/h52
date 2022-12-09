<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/home/components/homeChartFilter.vue
 * @Date         : 2022-08-08 14:30:07
 * @LastEditTime : 2022-09-23 10:40:53
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div>
    <div class="top">
      <div>
        <el-radio-group v-model="radio1.value" v-for="item in dateTypeArray" :key="item.value" @change="radioChange(item.value)">
          <el-radio-button style="margin-right: 10px" :label="item.value">{{ $t(item.label) }}</el-radio-button>
        </el-radio-group>
      </div>

      <div class="search-view">
        <div v-if="!opts.isHiddenSelect" class="enter-view">
          <div class="label">{{ opts.selectWidgetTitle }}</div>
          <!-- product -->
          <el-select v-if="model.productId != null" v-model="model.productId" placeholder="Select Product" clearable>
            <el-option v-for="option in model.selectList" :key="option.value" :label="$t(option.label)" :value="option.value" />
          </el-select>
          <!-- channel applyStatus -->
          <el-select v-if="model.applyStatus != null" v-model="model.applyStatus" placeholder="Select Status" clearable>
            <el-option v-for="option in model.selectList" :key="option.value" :label="$t(option.label)" :value="option.value" />
          </el-select>
        </div>
        <div v-if="!opts.isHiddenInput" class="enter-view">
          <div class="label">Channel Code</div>
          <el-input v-model="model.channelCode" placeholder="Enter Channel Code" clearable @clear="handleQuery" />
        </div>

        <!-- 按年 -->
        <div class="label" style="min-width: 30px">Date</div>
        <div class="year-view" v-if="dateType == 'year'">
          <!-- 开始 -->
          <el-date-picker
            :style="{ width: '90px' }"
            v-model="yearStart"
            :type="dateType"
            :key="0"
            align="right"
            :placeholder="$t('date.startYear')"
            :picker-options="startDatePicker"
            @change="hanldDateChange"
          ></el-date-picker>

          <div class="to-label">{{ $t('date.to') }}</div>
          <!-- 结束 -->
          <el-date-picker
            :style="{ width: '90px' }"
            v-model="yearEnd"
            :type="dateType"
            :key="1"
            align="right"
            :placeholder="$t('date.endYear')"
            :picker-options="endDatePicker"
            @change="hanldDateChange"
          ></el-date-picker>
        </div>

        <!-- 按月 -->
        <div v-else-if="dateType == 'month'">
          <el-date-picker
            :style="{ width: '220px' }"
            v-model="dateValues"
            type="monthrange"
            :range-separator="$t('date.to')"
            :start-placeholder="$t('date.startYear')"
            :end-placeholder="$t('date.endYear')"
            :format="'MM-yyyy'"
            @change="hanldDateChange"
          ></el-date-picker>
        </div>

        <!-- 按日 -->
        <div v-else>
          <el-date-picker
            :style="{ width: '220px' }"
            v-model="dateValues"
            type="daterange"
            :range-separator="$t('date.to')"
            :start-placeholder="$t('date.startPlaceholde')"
            :end-placeholder="$t('date.endPlaceholder')"
            :format="'MM-dd-yyyy'"
            @change="hanldDateChange"
          ></el-date-picker>
        </div>
      </div>
    </div>

    <div class="bottom">
      <el-button type="primary" icon="el-icon-search" @click="handleQuery">{{ $t('button.query') }}</el-button>
      <el-button icon="el-icon-refresh" @click="handleReset">{{ $t('button.reset') }}</el-button>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  name: 'homeChartFilter',
  props: {
    opts: {
      type: Object,
      default() {
        return {
          selectWidgetTitle: 'Product'
        }
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      radio1: { label: 'home.day', value: 'date' },
      dateValues: [],
      dateType: 'date',
      yearStart: '',
      yearEnd: utils.fomartDate(new Date(), '{y}-{m}-{d}'),
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      dateTypeArray: [
        { label: 'home.year', value: 'year' },
        { label: 'home.month', value: 'month' },
        { label: 'home.day', value: 'date' }
      ],
      modelTemp: {}
    }
  },
  computed: {},
  // watch: {
  //   model: {
  //     handler(newVal) {
  //       console.log('newVal++>', newVal)
  //       this.radio1 = this.model.selectRadio
  //       this.dateType = this.model.selectRadio.value
  //       if (this.dateType == 'year') {
  //         this.yearEnd = this.model.date.dateParam.endDate
  //         this.yearStart = this.model.date.dateParam.startDate
  //       } else if (this.dateType == 'month') {
  //         this.dateValues.push(this.model.date.dateParam.endDate)
  //         this.dateValues.unshift(this.model.date.dateParam.startDate)
  //       } else if (this.dateType == 'date') {
  //         this.dateValues.push(this.model.date.dateParam.endDate)
  //         this.dateValues.unshift(this.model.date.dateParam.startDate)
  //       }
  //     },
  //     deep: true
  //   }
  // },
  mounted() {},
  created() {
    // this.dateValues.push(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
    // let oneWeekBefore = utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
    // this.dateValues.unshift(utils.fomartDate(oneWeekBefore, '{y}-{m}-{d}'))
    // this.setFilterData()
    // console.log('created model==>', this.model)
    this.radio1 = this.model.selectRadio
    this.dateType = this.model.selectRadio.value
    if (this.dateType == 'year') {
      this.yearEnd = this.model.date.dateParam.endDate
      this.yearStart = this.model.date.dateParam.startDate
    } else if (this.dateType == 'month') {
      this.dateValues.push(this.model.date.dateParam.endDate)
      this.dateValues.unshift(this.model.date.dateParam.startDate)
    } else if (this.dateType == 'date') {
      this.dateValues.push(this.model.date.dateParam.endDate)
      this.dateValues.unshift(this.model.date.dateParam.startDate)
    }
    // console.log('dateValues==>', this.dateValues)
    this.setFilterData()
  },
  methods: {
    // 选择年份范围选择时开始时间不能大于结束时间，结束时间不能小于开始时间
    // 提出开始时间必须小于提出结束时间
    beginDate() {
      let self = this
      return {
        disabledDate(time) {
          if (self.yearEnd !== '') {
            let fixedTime = new Date(time)
            return fixedTime.getFullYear() >= utils.fomartDate(self.yearEnd, '{y}')
          }
        }
      }
    },
    // 提出结束时间必须大于提出开始时间
    processDate() {
      let self = this
      return {
        disabledDate(time) {
          let fixedTime = new Date(time)
          return fixedTime.getFullYear() < utils.fomartDate(self.yearStart, '{y}')
        }
      }
    },
    /**
     * @description: 按年月日筛选
     * @param {*} type 年月日type
     */
    radioChange(type) {
      this.dateType = type
      this.dateValues = []
      if (this.dateType == 'year') {
        this.yearEnd = utils.fomartDate(new Date(), '{y}-{m}-{d}')
        // 前一年
        let oneYearBefore = utils.oneYearBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
        this.yearStart = utils.fomartDate(oneYearBefore, '{y}')
      } else if (this.dateType == 'month') {
        this.dateValues.push(utils.fomartDate(new Date(), '{y}-{m}'))
        // 前一个月
        let oneMonthBefore = utils.oneMonthBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
        this.dateValues.unshift(utils.fomartDate(oneMonthBefore, '{y}-{m}'))
      } else if (this.dateType == 'date') {
        // 前一周
        this.dateValues.push(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
        let oneWeekBefore = utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
        this.dateValues.unshift(utils.fomartDate(oneWeekBefore, '{y}-{m}-{d}'))
      }
      this.setFilterData()
    },
    /**
     * @description: click date picker
     */
    hanldDateChange() {
      this.setFilterData()
    },
    /**
     * @description: 筛选条件
     */
    setFilterData() {
      let fomart = this.dateType == 'month' ? '{y}-{m}' : '{y}-{m}-{d}'

      if (this.dateType == 'year' && (this.yearEnd == null || this.yearStart == null)) {
        return
      }
      if (this.dateType != 'year' && (this.dateValues == null || this.dateValues.length == 0)) {
        return
      }
      let dateParam = { startDate: utils.fomartDate(this.dateValues[0], fomart), endDate: utils.fomartDate(this.dateValues[1], fomart) }
      if (this.dateType == 'year') {
        dateParam.startDate = utils.fomartDate(this.yearStart, '{y}')
        dateParam.endDate = utils.fomartDate(this.yearEnd, '{y}')
      }
      this.$emit('handleChartFilter', { model: this.model, date: dateParam, dateType: this.dateType })
    },
    handleQuery() {
      this.setFilterData()
    },
    handleReset() {
      this.dateValues = []
      this.dateValues.push(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      let oneWeekBefore = utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
      this.dateValues.unshift(utils.fomartDate(oneWeekBefore, '{y}-{m}-{d}'))
      this.radio1 = { label: 'home.day', value: 'date' }
      this.dateType = 'date'
      this.model.channelCode = null
      this.model.productId = null
      this.model.applyStatus = null
      this.setFilterData()
    }
  }
}
</script>

<style lang="less" scoped>
.label {
  display: flex;
  min-width: 90px;
  height: 32px;
  max-height: 32px;
  justify-content: flex-end;
  align-items: center;
  margin: 0px 10px 0px 0px;
  font-size: 13px;
  color: #606266;
  // background: fuchsia;
}
.top {
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  // background: aquamarine;

  .search-view {
    flex: 1;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    // background: red;

    .enter-view {
      display: flex;
      flex-direction: row;
      margin: 0px 30px 0px 0px;
      // background: slategray;
    }

    .year-view {
      display: flex;
      flex-direction: row;
      // background: seagreen;
      .to-label {
        display: flex;
        align-items: center;
        text-align: center;
        padding: 0px 10px;
        font-size: 12px;
      }
    }
  }
}
.bottom {
  margin: 20px 0px 0px 0px;
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  // background: cadetblue;
}
</style>
