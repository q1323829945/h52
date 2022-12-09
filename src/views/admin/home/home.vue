<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/admin/home/home.vue
 * @Date         : 2022-02-17 13:40:51
 * @LastEditTime : 2022-12-05 11:34:09
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div>
    <div class="tabs-base">
      <div class="title-label">{{ 'Dashboard' }}</div>
      <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
        <el-tab-pane :label="$t('menuTree.loanStatistical')" name="first"></el-tab-pane>
        <el-tab-pane :label="$t('menuTree.commissionStatistical')" name="second"></el-tab-pane>
        <el-tab-pane :label="'Channel Statistical'" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <app-main style="background: #f5f5f5">
      <!-- 贷款申请统计 -->
      <div v-if="tabActiveName == 'first'">
        <HomeChartFilter :key="0" :style="{ margin: '120px 0px 0px 0px' }" :model.sync="searchModel.loan" @handleChartFilter="handleChartFilter" />
        <Home-Chart :model.sync="chartsModel.barData" :style="{ margin: '30px 0px 0px 0px' }" />
        <Home-Chart :model.sync="chartsModel.curveData" :style="{ margin: '30px 0px 30px 0px' }" />
      </div>

      <!-- 佣金统计 -->
      <div v-if="tabActiveName == 'second'">
        <HomeChartFilter
          :key="1"
          :style="{ margin: '120px 0px 0px 0px' }"
          :opts="{ isHiddenSelect: true }"
          :model.sync="searchModel.commission"
          @handleChartFilter="handleChartFilter"
        />
        <Home-Chart :model.sync="chartsModel" :style="{ margin: '30px 0px 30px 0px' }" />
      </div>

      <!-- 渠道统计 -->
      <div v-if="tabActiveName == 'third'">
        <HomeChartFilter
          :key="2"
          :style="{ margin: '120px 0px 0px 0px' }"
          :opts="{ isHiddenSelect: false, isHiddenInput: true, selectWidgetTitle: 'Apply Status' }"
          :model.sync="searchModel.channel"
          @handleChartFilter="handleChartFilter"
        />
        <div class="channel-pie-view">
          <Home-Chart :model.sync="chartsModel.acrossBarData" :style="{ margin: '30px 10px 30px 0px', width: '50%', height: '400px' }" />
          <!-- <Home-Chart :model.sync="chartsModel.leftData" :style="{ margin: '30px 10px 30px 0px', width: '50%', height: '400px' }" /> -->
          <Home-Chart :model.sync="chartsModel.rightData" :style="{ margin: '30px 0px 30px 10px', width: '50%', height: '400px' }" />
        </div>
      </div>
    </app-main>
  </div>
</template>

<style lang="less"></style>
<script>
import utils from '@/utils'
import HomeChart from '@/views/admin/home/components/homeChart'
import HomeChartFilter from '@/views/admin/home/components/homeChartFilter'
import language from '@/utils/language'
import api from '@/server/api'

export default {
  components: { HomeChartFilter, HomeChart },
  name: 'home',
  data() {
    return {
      load: true,
      i18n: language,
      tabActiveName: 'first',
      selectList: [],
      searchModel: {
        loan: {
          channelCode: '',
          productId: '',
          selectList: [],
          selectRadio: { label: 'home.day', value: 'date' },
          date: {
            dateParam: {
              endDate: utils.fomartDate(new Date(), '{y}-{m}-{d}'),
              startDate: utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
            },
            dateType: 'D'
          }
        },
        commission: {
          channelCode: '',
          selectRadio: { label: 'home.day', value: 'date' },
          date: {
            dateParam: {
              endDate: utils.fomartDate(new Date(), '{y}-{m}-{d}'),
              startDate: utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
            },
            dateType: 'D'
          }
        },
        channel: {
          applyStatus: '',
          selectList: utils.common.loanTypeStatusOpts,
          selectRadio: { label: 'home.day', value: 'date' },
          date: {
            dateParam: {
              endDate: utils.fomartDate(new Date(), '{y}-{m}-{d}'),
              startDate: utils.oneWeekBefore(utils.fomartDate(new Date(), '{y}-{m}-{d}'))
            },
            dateType: 'D'
          }
        }
      },
      chartsModel: {},
      isBack: true // 前一个页面为登录页，禁止后退
    }
  },

  beforeRouteEnter(to, from, next) {
    // 进入页面修改body颜色
    document.querySelector('body').setAttribute('style', 'background:#f5f5f5;background-color:#f5f5f5')
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.isBack = from.path == '/login' ? false : true
    })
  },
  destroyed() {
    //离开页面时恢复回退
    window.removeEventListener('popstate', this.myBack, false)
  },
  beforeRouteLeave(to, from, next) {
    // 离开页面清除body颜色
    document.querySelector('body').removeAttribute('style')
    next()
  },
  mounted() {
    //禁止后退
    if (!this.isBack) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.myBack, false)
    }
  },
  activated() {
    this.requestProductData()
    this.enterPageRequestChart()
  },
  created() {
    let isShowBreadcrumb = this.$route.meta.breadcrumb ? (this.$route.meta.breadcrumb.isShow ? '1' : '0') : '0'
    utils.setStore('SHOW-BREADCRUMB', isShowBreadcrumb, sessionStorage)
    let guiHidden = Boolean(utils.getStore('GUIDE-SAVE-SETP1', localStorage))
    if (!guiHidden) {
      this.routerLink(`/dashboard/channelQueryConfig`)
    }
  },
  methods: {
    myBack() {
      history.pushState(null, null, document.URL)
    },
    handleTabClick(tab) {
      this.tabActiveName = tab.name
    },
    /**
     * @description: 获取所有贷款产品
     */
    requestProductData() {
      this.$api
        .fetch(
          `${api.admin.query_product_json}/paged`,
          {},
          {
            method: 'get',
            comm: { paramUrl: true, showMessage: true }
          }
        )
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.selectList = []
          data.forEach(element => {
            let obj = { label: element.name, value: element.id }
            this.selectList.push(obj)
          })

          this.searchModel.loan.selectList = this.selectList
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 获取所有贷款申请
     */
    requstApplicationStatisticsData(param) {
      this.$api
        .fetch('query_loanApplicationStatistics_charts_jsons', param, {
          method: 'get',
          comm: { showMessage: true }
        })
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.setApplicationChartsData(data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 贷款申请可视化数据
     * @param {*} data
     */
    setApplicationChartsData(data) {
      let fomart = '{m}-{d}-{y}'
      if (this.searchModel.loan.date.dateType == 'M') {
        fomart = '{m}-{y}'
      } else if (this.searchModel.loan.date.dateType == 'Y') {
        fomart = '{y}'
      }
      let statisticsLegends = [language.t('customerOffer.applyCount'), language.t('customerOffer.approvalCount')]
      // 柱状图申请数
      let applyCountValues = []
      let xAxisDateArray = []
      data.applyCount.forEach(element => {
        xAxisDateArray.push(utils.fomartDate(element.dateTime, fomart))
        applyCountValues.push(element.applyCount)
      })
      // 柱状图申请通过数
      let approvalCountValues = []
      data.approvalCount.forEach(element => {
        approvalCountValues.push(element.approvalCount)
      })

      // 折线图申请金额
      let applyAmountValues = []
      data.applyAmount.forEach(element => {
        applyAmountValues.push(element.amount)
      })
      // 统计数
      let statisticsValues = [applyCountValues, approvalCountValues]
      // echart配置
      let barSeries = []
      statisticsLegends.forEach((element, index) => {
        barSeries.push({
          name: element, //legend里的data数据分别渲染上去
          type: 'bar',
          barGap: 0,
          label: {
            // 在柱状图上面显示
            show: false,
            position: 'top'
          },
          //修改柱子宽度
          barMaxWidth: '40px',
          barMinHeight: 1, // 柱子最低高度
          data: statisticsValues[index] // 换接口的值
        })
      })
      this.$set(this.chartsModel, 'barData', {
        barData: {
          legend: statisticsLegends,
          xAxis: xAxisDateArray,
          applyCount: { values: applyCountValues },
          approvalCount: { values: approvalCountValues },
          applyAmount: { values: applyAmountValues },
          series: barSeries
        },
        isCurve: false,
        isBar: true,
        isPie: false
      })

      this.$set(this.chartsModel, 'curveData', {
        curveData: {
          legend: [language.t('customerOffer.applyAmount')],
          xAxis: this.chartsModel.barData.barData.xAxis,
          series: [
            {
              name: language.t('customerOffer.applyAmount'),
              type: 'line',
              stack: 'Total',
              data: this.chartsModel.barData.barData.applyAmount.values
            }
          ]
        },
        isCurve: true,
        isBar: false,
        isPie: false
      })
    },
    /**
     * @description: 获取所有佣金统计
     */
    requstCommissionStatisticsData(param) {
      this.$api
        .fetch('query_commissionStatistics_charts_jsons', param, {
          method: 'get',
          comm: { showMessage: true }
        })
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          this.setCommissionChartsData(data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * @description: 佣金可视化数据
     */
    setCommissionChartsData(data) {
      let statisticsLegends = [
        {
          name: language.t('customerOffer.camount'),
          itemStyle: {
            color: '#409EFF'
          }
        }
      ]
      // 柱状图申请数
      let amountValues = []
      let xAxisDateArray = []
      let fomart = '{m}-{d}-{y}'
      if (this.searchModel.commission.date.dateType == 'M') {
        fomart = '{m}-{y}'
      } else if (this.searchModel.commission.date.dateType == 'Y') {
        fomart = '{y}'
      }
      // 折线图金额
      data.commissionAmount.forEach(element => {
        xAxisDateArray.push(utils.fomartDate(element.dateTime, fomart))
        amountValues.push(element.amount)
      })

      // 统计数
      let statisticsValues = [amountValues]
      let series = []
      statisticsLegends.forEach((element, index) => {
        series.push({
          name: element.name,
          type: 'line',
          stack: 'Total',
          data: statisticsValues[index], // 换接口的值
          zlevel: 1,
          z: 1,
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#409EFF'
          },
          areaStyle: {
            color: '#409EFF'
          }
        })
      })
      this.chartsModel = {
        curveData: {
          legend: statisticsLegends,
          xAxis: xAxisDateArray,
          series: series
        },
        barData: {},
        isBar: false,
        isCurve: true
      }
    },

    /**
     * @description: 获取所有渠道统计
     */
    requstChannelStatisticsData(param) {
      this.$api
        .fetch('query_channel_statistics_pie_jsons', param, {
          method: 'get',
          comm: { showMessage: true }
        })
        .then(res => {
          this.loading = false
          const data = JSON.parse(JSON.stringify(res.data))
          let amountList = []
          let countList = []
          let names = []
          if (data.length > 0) {
            data.forEach(element => {
              names.push(element.channelName)
              amountList.push({ name: element.channelName, value: element.amount })
              countList.push({ name: element.channelName, value: element.count })
            })
          } else {
            names = ['channel']
            amountList = [{ name: 'channel', value: 0 }]
            countList = [{ name: 'channel', value: 0 }]
          }

          // bar统计数
          let barSeries = []
          barSeries.push({
            // name: 'Amount', //legend里的data数据分别渲染上去
            type: 'bar',
            barGap: 0,
            label: {
              // 在柱状图上面显示
              show: false,
              position: 'top'
            },
            // //修改柱子宽度
            // barMaxWidth: '40px',
            barMinHeight: 3, // 柱子最低高度
            data: amountList // 换接口的值
          })
          let barData = {
            title: 'Amount',
            acrossBarData: {
              yAxis: names,
              series: [
                {
                  // name: 'Amount', //legend里的data数据分别渲染上去
                  type: 'bar',
                  barGap: 0,
                  label: {
                    // 在柱状图上面显示
                    show: false,
                    position: 'top'
                  },
                  // //修改柱子宽度
                  // barMaxWidth: '40px',
                  barMinHeight: 3, // 柱子最低高度
                  data: amountList // 换接口的值
                }
              ]
            },
            isCurve: false,
            isAcrossBar: true,
            isBar: false,
            isPie: false
          }
          this.chartsModel = {
            acrossBarData: barData,
            leftData: { title: 'Amount', pieData: { data: amountList, names: names }, isBar: false, isCurve: false, isPie: true },
            rightData: { title: 'Count', pieData: { data: countList, names: names }, isBar: false, isCurve: false, isPie: true }
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    enterPageRequestChart() {
      switch (this.tabActiveName) {
        case 'first':
          {
            this.requstApplicationStatisticsData({
              startDate: this.searchModel.loan.date.dateParam.startDate,
              endDate: this.searchModel.loan.date.dateParam.endDate,
              channelCode: this.searchModel.loan.channelCode,
              productId: this.searchModel.loan.productId,
              frequency: this.searchModel.loan.date.dateType
            })
          }
          break
        case 'second':
          {
            this.requstCommissionStatisticsData({
              startDate: this.searchModel.commission.date.dateParam.startDate,
              endDate: this.searchModel.commission.date.dateParam.endDate,
              channelCode: this.searchModel.commission.channelCode,
              frequency: this.searchModel.commission.date.dateType
            })
          }
          break
        case 'third':
          {
            this.requstChannelStatisticsData({
              startDate: this.searchModel.channel.date.dateParam.startDate,
              endDate: this.searchModel.channel.date.dateParam.endDate,
              frequency: this.searchModel.channel.date.dateType,
              applyStatus: this.searchModel.channel.applyStatus
            })
          }
          break

        default:
          break
      }
    },
    /**
     * @description: 数据筛选
     * @param {*} value 筛选条件
     */
    handleChartFilter(value) {
      switch (this.tabActiveName) {
        case 'first':
          {
            console.log('first==>', value)
            this.searchModel.loan.date.dateParam = value.date
            this.searchModel.loan.productId = value.model.productId ? value.model.productId : ''
            if (value.dateType == 'year') {
              this.searchModel.loan.date.dateType = 'Y'
              this.searchModel.loan.selectRadio = { label: 'home.year', value: 'year' }
            } else if (value.dateType == 'month') {
              this.searchModel.loan.date.dateType = 'M'
              this.searchModel.loan.selectRadio = { label: 'home.month', value: 'month' }
            } else {
              this.searchModel.loan.date.dateType = 'D'
              this.searchModel.loan.selectRadio = { label: 'home.day', value: 'date' }
            }
            this.requstApplicationStatisticsData({
              startDate: value.date.startDate,
              endDate: value.date.endDate,
              channelCode: value.model.channelCode,
              productId: value.model.productId,
              frequency: this.searchModel.loan.date.dateType
            })
          }
          break
        case 'second':
          {
            console.log('second==>', value)
            this.searchModel.commission.date.dateParam = value.date
            if (value.dateType == 'year') {
              this.searchModel.commission.date.dateType = 'Y'
              this.searchModel.commission.selectRadio = { label: 'home.year', value: 'year' }
            } else if (value.dateType == 'month') {
              this.searchModel.commission.date.dateType = 'M'
              this.searchModel.commission.selectRadio = { label: 'home.month', value: 'month' }
            } else {
              this.searchModel.commission.date.dateType = 'D'
              this.searchModel.commission.selectRadio = { label: 'home.day', value: 'date' }
            }
            this.requstCommissionStatisticsData({
              startDate: value.date.startDate,
              endDate: value.date.endDate,
              channelCode: value.model.channelCode,
              frequency: this.searchModel.commission.date.dateType
            })
          }
          break
        case 'third':
          {
            console.log('third==>', value)
            this.searchModel.channel.date.dateParam = value.date
            this.searchModel.channel.applyStatus = value.model.applyStatus != null ? value.model.applyStatus : ''
            if (value.dateType == 'year') {
              this.searchModel.channel.date.dateType = 'Y'
              this.searchModel.channel.selectRadio = { label: 'home.year', value: 'year' }
            } else if (value.dateType == 'month') {
              this.searchModel.channel.date.dateType = 'M'
              this.searchModel.channel.selectRadio = { label: 'home.month', value: 'month' }
            } else {
              this.searchModel.channel.date.dateType = 'D'
              this.searchModel.channel.selectRadio = { label: 'home.day', value: 'date' }
            }
            this.requstChannelStatisticsData({
              startDate: this.searchModel.channel.date.dateParam.startDate,
              endDate: this.searchModel.channel.date.dateParam.endDate,
              frequency: this.searchModel.channel.date.dateType,
              applyStatus: this.searchModel.channel.applyStatus
            })
          }
          break

        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tabs-base {
  background: #fff;
  position: fixed;
  margin: -20px 0px 0px -20px;
  width: 100%;
  padding: 15px 15px 0px 15px;
  z-index: 100;
  // background: red;

  .title-label {
    font-size: 16;
    margin: 10px 0px 20px 0px;
    // background: seagreen;
  }
}

.channel-pie-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
