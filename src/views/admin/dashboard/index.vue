<!--
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/dashboard/index.vue
 * @Date         : 2022-02-10 14:41:12
 * @LastEditTime : 2022-09-21 09:24:07
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <el-container>
    <!-- 头部 -->
    <dashboard-header></dashboard-header>
    <!-- 侧边栏 -->
    <el-aside :style="{ width: isCollapse ? '65px' : '210px', transition: '0.3s' }">
      <el-menu
        :class="isCollapse ? 'el-menu-vertical collapse' : 'el-menu-vertical'"
        :default-openeds="openList"
        :default-active="activeIndex"
        :unique-opened="true"
        :router="true"
        :collapse="isCollapse"
        background-color="#334154"
        text-color="#b2bcc9"
        active-text-color="#409eff"
        :collapse-transition="false"
        @open="handleOpen"
        @close="handleClose"
      >
        <menu-tree :menuData="menuTreeDatas"></menu-tree>
      </el-menu>
    </el-aside>
    <!-- 内容 -->
    <el-container>
      <el-main :style="{ left: isCollapse ? '65px' : '210px', transition: '0.3s' }">
        <!-- 面包屑导航 -->
        <Breadcrumb :isCollapse="isCollapse" @handleCollapse="handleCollapse" />
        <!-- 右侧页面 -->
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import utils from 'utils'
import MenuTree from 'components/menuTree'
import DashboardHeader from 'components/dashboardHeader'
import Breadcrumb from 'components/breadcrumb'
export default {
  components: {
    MenuTree,
    DashboardHeader,
    Breadcrumb
  },
  data() {
    return {
      // 👇👇👇element-ui中submenu使用default-opened与vue页面信息刷新的冲突👇👇👇
      // 👇👇👇如果没有把default-openeds与vue中data的某个变量绑定，即使手动下拉别的菜单，选中的菜单也没法更新到一个变量中👇👇👇
      // 👇👇👇这样一来如果此时vue刷新dom，此时默认展开的菜单还是 ‘1’👇👇👇
      openList: ['0'],
      isCollapse: false,
      menuTreeDatas: [] //菜单栏
    }
  },
  computed: {
    activeIndex() {
      const route = this.$route
      let path = ''
      // menuPath有值在右侧main内跳转页面刷新dom，继续选中当前的菜单
      path = route.meta.menuPath ? route.meta.menuPath : route.path
      return path
    },
    /**
     * @description: 在 router-view上加上一个唯一的key，避免多次跳转同一页面不触发created和mounted
     * @return {*} 全路径作为路由中唯一的key
     */
    key() {
      return this.$route.fullPath
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.isCollapse = Boolean(utils.getStore('LEFT-MENU-COLLAPSE', localStorage))
      this.menuTreeDatas = utils.setLanguageMenuTree()
    },
    handleOpen(key, keyPath) {
      console.log('handleOpen', key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log('handleClose', key, keyPath)
    },
    handleCollapse(value) {
      // 左侧边栏折叠状态
      this.isCollapse = value
      utils.setStore('LEFT-MENU-COLLAPSE', value ? 'true' : '', localStorage)
      this.$store.commit('set_menuIsCollapse', value ? true : false)
    }
  }
}
</script>

<style lang="less">
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
  // background: aqua;
}
.el-aside {
  // position: absolute;
  position: fixed;
  left: 0px;
  top: 80px;
  bottom: 0;
  background-color: #334154;
  overflow-x: hidden;
  // background-color: red;
  // overflow-y: scroll;
}

.el-main {
  position: fixed;
  left: 70px;
  right: 0;
  top: 80px;
  bottom: 0px;
  overflow-y: scroll;
  background-color: transparent;
  background: transparent;
  // background-color: #fff;
  // background-color: green;
}
</style>

<style lang="less" scoped>
// el-menu
.el-menu-vertical:not(.el-menu--collapse) {
  width: 209px;
  height: auto;
}
.collapse:not(.el-menu--collapse) {
  width: 69px;
  height: auto;
}
.el-menu {
  border-right: solid 0px transparent;
}

// fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

// fade-transform
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
