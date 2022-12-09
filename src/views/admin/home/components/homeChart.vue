<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/home/components/homeChart.vue
 * @Date         : 2022-07-29 16:51:44
 * @LastEditTime : 2022-09-23 10:08:51
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div>
    <!-- <div class="grid-view">
      <div
        ref="channelPieChart"
        :class="modelTemp.isPie ? (modelTemp.isBar ? 'pie-chart chart-grid-size' : 'pie-chart chart-fill-size') : 'chart-none'"
      ></div>
      <div
        ref="channelBarChart"
        :class="modelTemp.isBar ? (modelTemp.isPie ? 'bar-chart chart-grid-size' : 'bar-chart chart-fill-size') : 'chart-none'"
      ></div>
    </div> -->

    <div ref="channelPieChart" :class="modelTemp.isPie ? 'pie-chart chart-fill-size' : 'chart-none'"></div>
    <div ref="channelBarChart" :class="modelTemp.isBar ? 'bar-chart chart-fill-size' : 'chart-none'"></div>
    <div ref="channelCurveChart" :class="modelTemp.isCurve ? 'curve-chart chart-fill-size' : 'chart-none'"></div>
    <!-- 横向柱状 -->
    <div ref="channelAcrossBarChart" :class="modelTemp.isAcrossBar ? 'bar-chart  chart-fill-size' : 'chart-none'"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import utils from '@/utils'
import language from '@/utils/language'

//通过this.$echarts来使用
export default {
  name: 'hello',
  props: {
    model: {
      type: Object,
      default() {
        return { barData: {}, curveData: {}, pieData: {}, isBar: false, isCurve: false, isPie: false, isAcrossBar: false }
      }
    }
  },
  data() {
    return {
      channelBarChart: null,
      channelCurveChart: null,
      channelPieChart: null,
      channelAcrossBarChart: null,

      modelTemp: {}
    }
  },
  computed: {
    menuCollapse() {
      return this.$store.state.menuIsCollapse
    }
  },
  watch: {
    menuCollapse(newVal, oldVal) {
      setTimeout(() => {
        if (this.modelTemp.isBar) {
          this.channelBarChart.resize()
        }
        if (this.modelTemp.isCurve) {
          this.channelCurveChart.resize()
        }
        if (this.modelTemp.isPie) {
          this.channelPieChart.resize()
        }
        if (this.modelTemp.isAcrossBar) {
          this.channelAcrossBarChart.resize()
        }
      }, 200)
      console.log('newVal==>', newVal, 'oldVal==>', oldVal)
    },
    model: {
      handler(newVal) {
        // console.log('newVal-->', newVal)
        this.modelTemp = newVal
        this.setChartsData()
        this.$nextTick(function () {
          // 柱状图
          if (this.modelTemp.isBar) {
            this.drawChannelBarChart()
          } else {
            if (this.channelBarChart) {
              this.channelBarChart.dispose()
              this.channelBarChart = null
            }
          }

          // 曲线图
          if (this.modelTemp.isCurve) {
            this.drawChannelCurveChart()
          } else {
            if (this.channelCurveChart) {
              this.channelCurveChart.dispose()
              this.channelCurveChart = null
            }
          }

          // 饼状图
          if (this.modelTemp.isPie) {
            this.drawChannelPieChart()
          } else {
            if (this.channelPieChart) {
              this.channelPieChart.dispose()
              this.channelPieChart = null
            }
          }

          // 横向柱状图
          if (this.modelTemp.isAcrossBar) {
            this.drawChannelAcrossBarChart()
          } else {
            if (this.channelAcrossBarChart) {
              this.channelAcrossBarChart.dispose()
              this.channelAcrossBarChart = null
            }
          }
        })
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(function () {
      if (this.modelTemp.isBar) {
        this.drawChannelBarChart()
      }
      if (this.modelTemp.isCurve) {
        this.drawChannelCurveChart()
      }
      if (this.modelTemp.isPie) {
        this.drawChannelPieChart()
      }
      if (this.modelTemp.isAcrossBar) {
        this.drawChannelAcrossBarChart()
      }
    })
  },
  created() {
    this.setChartsData()
    this.modelTemp = this.model
  },
  methods: {
    /**
     * @description: 数据
     */
    setChartsData() {
      if (!utils.objKey(this.model, 'isBar')) {
        this.model.isBar = true
      }
      if (!utils.objKey(this.model, 'isCurve')) {
        this.model.isCurve = true
      }
      if (!utils.objKey(this.model, 'isPie')) {
        this.model.isPie = false
      }
      if (!utils.objKey(this.model, 'isAcrossBar')) {
        this.model.isAcrossBar = false
      }
    },
    // 柱状图
    drawChannelBarChart() {
      if (!this.modelTemp.isBar) {
        return
      }
      // 基于准备好的dom，初始化echarts实例
      this.channelBarChart = echarts.getInstanceByDom(this.$refs.channelBarChart)
      if (!this.channelBarChart) {
        this.channelBarChart = echarts.init(this.$refs.channelBarChart)
      }
      // 绘制图表
      const option = {
        animation: true, //控制动画示否开启
        // animationDuration:5000, // 动画的时长，它是以毫秒为单位
        animationDuration: arg => {
          return 1000 * arg
        },
        animationEasing: 'bounceOut', //缓动动画
        // animationThreshold: 8, //动画元素的阈值
        title: {
          text: '',
          textStyle: {
            fontSize: 16 //字体大小
          }
        },
        tooltip: {
          // trigger: 'axis'
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
          // formatter: function (params) {
          //   console.log('parm', params)
          //   // return '日期：' + (params[0].name ? params[0].name : '') + '<br/>' + '提货金额: ' + (params[0].value ? params[0].value : '')
          // }
        },
        backgroundColor: '#fff',
        color: ['#409EFF', '#293047'],
        legend: {
          top: '6%',
          data: utils.objKey(this.modelTemp, 'barData')
            ? this.modelTemp.barData.legend
            : [language.t('customerOffer.applyCount'), language.t('customerOffer.approvalCount')]
        },
        toolbox: {
          top: '2%',
          right: '1%',
          feature: {
            saveAsImage: { title: 'Save As Image' }
          }
        },
        grid: {
          top: '26%',
          left: '4%',
          right: '4%',
          bottom: '8%',
          // 刻度标签
          containLabel: true
        },
        xAxis: {
          data: utils.objKey(this.modelTemp, 'barData') ? this.modelTemp.barData.xAxis : [utils.fomartDate(new Date(), '{y}-{m}-{d}')]
        },
        yAxis: [
          // 如果是y轴显示，将上面xAxis里的值互换一下就行了
          {
            type: 'value'
          }
        ],
        series: utils.objKey(this.modelTemp, 'barData')
          ? this.modelTemp.barData.series
          : [
              {
                name: language.t('customerOffer.applyCount'), //legend里的data数据分别渲染上去
                type: 'bar',
                barGap: 0,
                label: {
                  // 在柱状图上面显示
                  show: true,
                  position: 'top'
                },
                //修改柱子宽度
                barMaxWidth: '40px',
                barMinHeight: 5, // 柱子最低高度
                data: [0] // 换接口的值
              },
              {
                name: language.t('customerOffer.approvalCount'), //legend里的data数据分别渲染上去
                type: 'bar',
                barGap: 0,
                label: {
                  // 在柱状图上面显示
                  show: true,
                  position: 'top'
                },
                //修改柱子宽度
                barMaxWidth: '40px',
                barMinHeight: 5, // 柱子最低高度
                data: [0] // 换接口的值
              }
            ]
      }
      this.channelBarChart.setOption(option, true)

      window.addEventListener('resize', () => {
        if (this.channelBarChart != null) {
          this.channelBarChart.resize()
        }
      })
      if (this.channelBarChart != null) {
        this.channelBarChart.resize()
      }
    },
    // 横向柱状图
    drawChannelAcrossBarChart() {
      if (!this.modelTemp.isAcrossBar) {
        return
      }
      // 基于准备好的dom，初始化echarts实例
      this.channelAcrossBarChart = echarts.getInstanceByDom(this.$refs.channelAcrossBarChart)
      if (!this.channelAcrossBarChart) {
        this.channelAcrossBarChart = echarts.init(this.$refs.channelAcrossBarChart)
      }
      // 绘制图表
      const option = {
        animation: true, //控制动画示否开启
        // animationDuration:5000, // 动画的时长，它是以毫秒为单位
        animationDuration: arg => {
          return 1000 * arg
        },
        animationEasing: 'bounceOut', //缓动动画
        // animationThreshold: 8, //动画元素的阈值
        title: {
          text: this.modelTemp.title,
          top: '2%',
          left: '2%',
          textStyle: {
            fontSize: 15 //字体大小
          }
        },
        tooltip: {
          // trigger: 'axis'
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
          // formatter: function (params) {
          //   console.log('parm', params)
          //   // return '日期：' + (params[0].name ? params[0].name : '') + '<br/>' + '提货金额: ' + (params[0].value ? params[0].value : '')
          // }
        },
        backgroundColor: '#fff',
        color: '#409EFF',
        legend: {
          top: '6%',
          data: utils.objKey(this.modelTemp, 'acrossBarData') ? this.modelTemp.acrossBarData.legend : 'Amount'
        },
        toolbox: {
          top: '2%',
          right: '1%',
          feature: {
            saveAsImage: { title: 'Save As Image' }
          }
        },
        grid: {
          top: '15%',
          left: '4%',
          right: '4%',
          bottom: '8%',
          // 刻度标签
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: utils.objKey(this.modelTemp, 'acrossBarData') ? this.modelTemp.acrossBarData.yAxis : ['Channel'] //y即接口方法传递过来的参数也是y轴的数据（y等同于res.data.yData）
        },
        series: utils.objKey(this.modelTemp, 'acrossBarData')
          ? this.modelTemp.acrossBarData.series
          : [
              {
                name: language.t('customerOffer.applyCount'), //legend里的data数据分别渲染上去
                type: 'bar',
                barGap: 0,
                label: {
                  // 在柱状图上面显示
                  show: true,
                  position: 'top'
                },
                //修改柱子宽度
                barMaxWidth: '40px',
                barMinHeight: 5, // 柱子最低高度
                data: [0] // 换接口的值
              }
            ]
      }
      this.channelAcrossBarChart.setOption(option, true)

      window.addEventListener('resize', () => {
        if (this.channelAcrossBarChart != null) {
          this.channelAcrossBarChart.resize()
        }
      })
      if (this.channelAcrossBarChart != null) {
        this.channelAcrossBarChart.resize()
      }
    },
    /**
     * @description: 曲线图
     */
    drawChannelCurveChart() {
      if (!this.modelTemp.isCurve) {
        return
      }
      // 基于准备好的dom，初始化echarts实例
      this.channelCurveChart = echarts.getInstanceByDom(this.$refs.channelCurveChart)
      if (!this.channelCurveChart) {
        this.channelCurveChart = echarts.init(this.$refs.channelCurveChart)
      }
      const option = {
        // 标题
        title: {
          text: '',
          textStyle: {
            fontSize: 16 //字体大小
          }
        },
        // 提示框组件，用于配置鼠标滑过或点击图表时的显示框
        tooltip: {
          trigger: 'axis'
        },
        backgroundColor: '#fff',
        color: ['#409EFF'],
        // 提示分类 applyAmount
        legend: {
          top: '6%',
          textStyle: {
            fontSize: 13 //字体大小
          },
          data: utils.objKey(this.modelTemp, 'curveData') ? this.modelTemp.curveData.legend : ['']
        },
        // 设置网格样式
        grid: {
          top: '26%',
          left: '4%',
          right: '4%',
          bottom: '8%',
          // 刻度标签
          containLabel: true
        },
        toolbox: {
          top: '2%',
          right: '1%',
          feature: {
            saveAsImage: { title: 'Save As Image' }
          }
        },
        xAxis: {
          data: utils.objKey(this.modelTemp, 'curveData') ? this.modelTemp.curveData.xAxis : [utils.fomartDate(new Date(), '{y}-{m}-{d}')]
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
            // lineStyle: {
            //   // type: 'solid',
            //   color: 'red', // 左边线的颜色
            //   width: '2' // 坐标线的宽度
            // }
          },
          type: 'value'
        },
        series: utils.objKey(this.modelTemp, 'curveData')
          ? this.modelTemp.curveData.series
          : [
              {
                name: '',
                type: 'line',
                stack: 'Total',
                data: [0]
              }
            ]
      }
      this.channelCurveChart.setOption(option, true)

      window.addEventListener('resize', () => {
        if (this.channelCurveChart != null) {
          this.channelCurveChart.resize()
        }
      })
      if (this.channelCurveChart != null) {
        this.channelCurveChart.resize()
      }
    },
    /**
     * @description: 饼状图
     */
    drawChannelPieChart() {
      this.channelPieChart = echarts.getInstanceByDom(this.$refs.channelPieChart)
      if (!this.channelPieChart) {
        this.channelPieChart = echarts.init(this.$refs.channelPieChart)
      }
      const option = {
        legend: {
          // 图例
          data: this.modelTemp.pieData.data.names,
          left: '5%',
          right: '5%',
          bottom: '2%',
          orient: 'horizontal',
          scrollDataIndex: 5
        },
        backgroundColor: '#fff',
        // 标题
        title: {
          text: this.modelTemp.title,
          top: '2%',
          left: '2%',
          textStyle: {
            fontSize: 15 //字体大小
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}' // b代表名称，c代表对应值，d代表百分比
        },
        toolbox: {
          top: '2%',
          right: '1%',
          feature: {
            saveAsImage: { title: 'Save As Image' }
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter: '{b} : {d}%' // b代表名称，c代表对应值，d代表百分比
            },
            center: ['50%', '40%'],
            // 不显示连接线-->
            labelLine: { show: true },
            radius: '55%', //饼图半径
            data: this.modelTemp.pieData.data
          }
        ]
      }
      this.channelPieChart.setOption(option, true)

      window.addEventListener('resize', () => {
        if (this.channelPieChart != null) {
          this.channelPieChart.resize()
        }
      })
      if (this.channelPieChart != null) {
        this.channelPieChart.resize()
      }
    }
  }
}

// this.myChart.resize()
// this.$nextTick(() => {
// debugger
// setTimeout(() => {
// console.log('111111')
// var content = document.getElementById('content')
// var nodelist = content.childNodes
// for (let index = 0; index < nodelist.length; index++) {
//   const element = nodelist[index]
//   console.log('element:' + element)
//   if (index == 1) {
//     content.removeChild(nodelist[index])

//     // let width = this.menuCollapse ? '110%' : '100%'
//     let width = '0px'
//     let background = this.menuCollapse ? 'blue' : 'yellow'
//     console.log('width==>', width)
//     // 创建元素
//     var item = document.createElement('div')
//     //创建节点属性
//     var item_style = document.createAttribute('style')
//     // 给节点属性赋值
//     item_style.value = `margin:${width};height:400px;background:${background};`
//     //创建节点属性
//     var item_id = document.createAttribute('id')
//     // 给节点属性赋值
//     item_id.value = 'myChart'
//     // 将节点属性加入到对应的文本节点中
//     item.setAttributeNode(item_style)
//     item.setAttributeNode(item_id)
//     content.insertBefore(item, content.childNodes[1])
//     this.drawLine()
//     this.$forceUpdate()
//     break
//   }
// }
// }, 50)
// })

//  graphic: {
//           silent: true, // Whether response to mouse events / touch events.(是否响应鼠标事件)
//           type: 'text', // 这里类型有多种: image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group
//           left: 'center',
//           top: 'middle',
//           // invisible: 可以理解为 是否隐藏 字段; true: 隐藏; 有数据就隐藏
//           invisible: utils.objKey(this.modelTemp, 'barData') ? true : false,
//           style: {
//             fill: '#9d9d9d', // 填充颜色 这里为文字填充色
//             text: '暂无数据',
//             fontWeight: 'bold',
//             fontSize: '40px'
//             // 当以上几个中的属性不生效可以使用下面的属性来设置文字样式
//             /**
//         	font: 字体样式的简写方式, 可能有些版本 fontSize 无效, 可更换为font属性
//         	font的最后一个属性是: 字体,不可缺少,不然样式不生效, 可以随便写几个字母就代替.
//         */
//             // font: 'bold 30px null',
//             // font: 'bold 30px qazwsx',
//             // font: 'bold 30px Microsoft YaHei',
//           }
//         },
</script>

<style lang="less" scoped>
.content-base {
  margin-top: 20px;
  // margin-bottom: 20px;
}

.grid-view {
  flex: 1;
  display: flex;
  flex: row;
  justify-content: space-between;
  // background: khaki;
  width: 100%;
}

.bar-chart {
  margin: '30px 0px 10px 0px';
  height: 400px;
}

.curve-chart {
  margin: '30px 0px 10px 0px';
  height: 400px;
}

.chart-grid-size {
  width: 49%;
}

.chart-fill-size {
  width: 100%;
}

.pie-chart {
  margin: '30px 0px 10px 0px';
  height: 100%;
}

.chart-none {
  margin: 0px;
  height: 0px;
}
</style>
