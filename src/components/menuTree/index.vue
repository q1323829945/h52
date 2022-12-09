<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/components/menuTree/index.vue
 * @Date         : 2022-02-14 16:42:49
 * @LastEditTime : 2022-08-03 17:14:26
 * @LastEditors  : Nimo
 * @Logs         : 
 *  
-->
<template>
  <div :class="!isCollapse ? 'menu' : 'menu arrow-none'">
    <template v-for="menu in this.menuData">
      <!-- 多级菜单 -->
      <el-submenu :key="menu.id" :index="menu.id + ''" v-if="menu.children">
        <template slot="title">
          <i :style="{ color: isCollapse ? setSubItermColor(menu, $route) : '#fff' }" :class="menu.icon"></i>
          <span slot="title">{{ !isCollapse ? $t(`${menu.name}`) : '' }}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-submenu>
      <!-- 只有一级菜单or多级菜单下的子菜单 -->
      <el-menu-item :key="menu.id" :index="menu.path" v-else>
        <div :class="menu.path == '/dashboard/home' ? 'menu-item menu-item-bgcolor' : !isCollapse ? 'menu-item' : 'menu-item menu-item-collapse'">
          <i v-if="menu.path == '/dashboard/home'" :style="{ color: isCollapse ? setHomeSubItemColor($route.path) : '#fff' }" :class="menu.icon"></i>
          <span v-if="menu.path == '/dashboard/home'" style="font-size: 13.5px" slot="title">{{ !isCollapse ? $t(`${menu.name}`) : '' }}</span>
          <span v-else style="font-size: 13.5px" slot="title">{{ $t(`${menu.name}`) }}</span>
        </div>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import utils from 'utils'

export default {
  data() {
    return {
      isCollapse: false,
      test: 'dashboard.headerTitle'
    }
  },
  props: ['menuData'],
  name: 'MenuTree',
  computed: {},
  created() {
    this.isCollapse = Boolean(utils.getStore('LEFT-MENU-COLLAPSE', localStorage))
  },
  methods: {
    setSubItermColor(item, route) {
      let path = route.meta.menuPath ? route.meta.menuPath : route.path
      let n = 0 // 用于判断当前一级菜单下的二级菜单是否被点击
      for (let i = 0; i < item.children.length; i++) {
        if (item.children[i].path == path) {
          n = 1
        }
      }
      if (n == 1) {
        // 被点击了，返回高亮
        return '#2e95fb'
      } else {
        // 未被点击，返回未高亮
        return '#fff'
      }
    },
    setHomeSubItemColor(route) {
      return route == '/dashboard/home' ? '#2e95fb' : '#fff'
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  .menu-item {
    margin-left: -40px;
    padding-left: 40px;
    width: 170px;
    height: 100%;
    background-color: #1c2835;
  }
  .menu-item-collapse {
    margin-left: 0px;
    padding-left: 0px;
    background-color: transparent;
  }
  .menu-item-bgcolor {
    background-color: #334154 !important;
  }
  .menu-item:hover {
    background-color: #2b3442 !important;
  }
  // 设置子菜单背景色
  // /deep/.el-menu-item {
  //   background-color: transparent !important;
  //   // background-color: #041527 !important;
  // }
  // // 设置子菜单悬停背景色
  // /deep/.el-menu-item:hover {
  //   background-color: #2b3442 !important;
  // }
  // // 子菜单选中颜色
  // /deep/.el-menu .el-menu-item.is-active {
  //   color: #2e95fb !important;
  //   background: linear-gradient(270deg, #f2f7fc 0%, #fefefe 100%) !important;
  // }
  // // 子菜单选中标题颜色
  // .el-submenu /deep/.el-submenu__title:hover {
  //   color: #2e95fb !important;
  //   background: linear-gradient(270deg, #f2f7fc 0%, #fefefe 100%) !important;
  // }
  // 子菜单选中标题颜色
  // /deep/.el-submenu.el-submenu__title.is-active {
  //   color: #2e95fb !important;
  //   background: linear-gradient(270deg, #f2f7fc 0%, #fefefe 100%) !important;
  // }
}
.arrow-none {
  /deep/ .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }

  /deep/ .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
