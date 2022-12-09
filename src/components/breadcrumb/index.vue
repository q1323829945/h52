<template>
  <div v-if="$route.meta.breadcrumb && $route.meta.breadcrumb.isShow" class="app-breadcrumb">
    <div class="collapse" @click="handleCollapse" type="text">
      <i :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" style="font-size: 22px"></i>
    </div>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right" :style="{ left: isCollapse ? '65px' : '210px', transition: '0.3s' }">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in $route.meta.breadcrumb.levelList" :key="item.name">
          <router-link v-if="item.url" :to="item.url">{{ $t(item.name) }}</router-link>
          <span v-else>
            {{ $t(item.name) }}
          </span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  name: 'breadcrumb',
  props: {
    // 菜单是否折叠
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapseTemp: this.isCollapse,
      levelList: null
    }
  },
  watch: {
    $route(route) {
      let isShowBreadcrumb = route.meta.breadcrumb ? (route.meta.breadcrumb.isShow ? '1' : '0') : '0'
      utils.setStore('SHOW-BREADCRUMB', isShowBreadcrumb, sessionStorage)
    },
    isCollapse() {}
  },
  created() {},
  methods: {
    handleCollapse() {
      this.isCollapseTemp = !this.isCollapseTemp
      this.$emit('handleCollapse', this.isCollapseTemp)
    }
  }
}
</script>

<style lang="less" scoped>
.app-breadcrumb {
  display: flex;
  flex: 1;
  flex-direction: row;
  // padding-left: 25px;
  margin-top: -20px;
  margin-left: -20px;
  width: 100%;
  height: 40px;
  position: fixed;
  background: #fff;
  z-index: 200;
  line-height: 40px;
  box-shadow: 0px 10px 10px -5px #eeeeee;

  .collapse {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 35px;
    margin: 4px 0px 0px 5px;
  }

  .el-breadcrumb {
    margin: 0px 0px 0px 60px;
    font-size: 14px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
