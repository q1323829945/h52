<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/views/admin/customerOffer/components/customerOfferChart/customerOfferChart.vue
 * @Date         : 2022-08-01 15:25:01
 * @LastEditTime : 2022-08-01 15:25:01
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <!-- <div class="bg"></div> -->
  <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
</template>

<script>
import * as echarts from 'echarts'

//通过this.$echarts来使用
export default {
  name: 'CustomerOfferChart',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: 'test' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  background: red;
  width: 300px;
  height: 300px;
}
</style>
