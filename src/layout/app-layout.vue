<!--
 * @Author       : Nimo
 * @FilePath     : /saas-project/src/layout/app-layout.vue
 * @Date         : 2022-02-10 16:14:18
 * @LastEditTime : 2022-02-11 13:03:14
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <keep-alive v-if="$route.meta.keepAlive">
    <router-view></router-view>
  </keep-alive>
  <router-view v-else></router-view>
</template>
<script>
export default {
  name: 'appLayout',
  props: {},
  data() {
    return {}
  },
  watch: {
    $route: {
      handler: function () {
        //页面加载完成后执行
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less"></style>
