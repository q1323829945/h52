<template>
  <transition name="fade">
    <app-layout id="app"></app-layout>
  </transition>
</template>
<script>
import appLayout from '@/layout/app-layout'
export default {
  name: 'c-app',
  components: { appLayout },
  data() {
    return {}
  }
}
</script>
<style lang="less">
#app {
  font-family: Helvetica, Tahoma, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', STXihei, 'Microsoft YaHei', SimHei;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  // 灰色模式
  // filter: progid:DXImageTransform.Microsoft.BasicImage(graysale=1);
  // -webkit-filter: grayscale(100%);
}
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
