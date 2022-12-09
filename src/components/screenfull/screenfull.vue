<template>
  <div class="screenfull-svg" @click="handleScreenfull">
    <!-- <i :class="iconclass" style="font-size: 40px"></i> -->
    <i v-if="!isFullscreen" style="font-size: 35px" class="iconfont icon-fullscreen"></i>
    <i v-else style="font-size: 35px" class="iconfont icon-fullscreen-exit"></i>
    <!-- <img v-if="!isFullscreen" src="@/assets/images/common/fullscreen48.png" alt="" />
    <img v-else src="@/assets/images/common/shrinkscreen48.png" alt="" /> -->
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'screenfull',
  data() {
    return {
      isFullscreen: false,
      iconclass: [],
      fullscreen: ['icon-fullscreen'],
      exitFullscreen: ['icon-fullscreen-exit']
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    // this.$destroy()
  },
  methods: {
    init() {
      if (screenfull.isEnabled) {
        this.iconclass = this.fullscreen
        screenfull.on('change', this.change)
      }
    },

    change() {
      this.isFullscreen = screenfull.isFullscreen
      if (screenfull.isFullscreen) {
        this.iconclass = this.exitFullscreen
      } else {
        this.iconclass = this.fullscreen
      }
    },
    handleScreenfull() {
      if (!screenfull.isEnabled) {
        this.$message.error('你的浏览器不支持全屏')
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style lang="less" scoped>
.screenfull-svg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 38px;
    height: 38px;
  }
}
</style>
