<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/components/dashboardHeader/index.vue
 * @Date         : 2022-02-21 15:29:26
 * @LastEditTime : 2022-12-05 15:26:30
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <el-header>
    <div class="content">
      <!-- 标题 -->
      <div class="left-view">
        <div class="logo-image">
          <img src="@/assets/images/common/logo.png" alt="" />
        </div>
        <span>{{ $t('dashboard.headerTitle') }}</span>
      </div>
      <div class="right-view">
        <!-- 项目全屏缩放 -->
        <screenfull class="screenfull-view" />

        <div class="user-view">
          <div class="name-label">{{ `${$t('login.username')}：` }}{{ userInfo.username }}</div>
          <div class="email-label">{{ `${$t('login.email')}：` }}{{ userInfo.email }}</div>
        </div>

        <!-- help -->
        <el-dropdown @command="handleHelpCommand" style="margin-right: 30px">
          <span class="el-dropdown-link">
            <i style="font-size: 22px; margin-top: 3px" class="el-icon-question"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, key) in helpObj" :key="key" :command="`${key}`" :class="{ selected: help.label == item }">
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 语言切换 -->
        <el-dropdown v-if="isShowLanguage" @command="handleCommand" style="margin-right: 30px">
          <span class="el-dropdown-link">
            {{ language.label }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, key) in langsObj" :key="key" :command="`${key}`" :class="{ selected: language.value == key }">
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 退出登录 -->
        <el-popover v-model="visible" placement="top-start" trigger="click">
          <p>{{ $t('login.logoutTips') }}</p>
          <div style="text-align: center">
            <el-button type="primary" size="mini" @click="logout">{{ $t('button.confirm') }}</el-button>
            <el-button size="mini" type="primary" @click="visible = false">{{ $t('button.cancel') }}</el-button>
          </div>
          <el-button slot="reference" type="primary">{{ $t('login.logout') }}</el-button>
        </el-popover>
      </div>
    </div>
  </el-header>
</template>

<script>
import utils from '@/utils'
import screenfull from '../screenfull/index'

export default {
  name: 'dashboardHeader',
  components: { screenfull },
  props: {},
  data() {
    return {
      isShowLanguage: process.env.VUE_APP_ENV == 'production' ? false : true,
      visible: false,
      userInfo: {},
      language: { label: 'English', value: 'en' },
      langsObj: { en: 'English', zh: '中文' },
      help: { label: 'Guide' },
      helpObj: { label: 'Guide' }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    initData() {
      // 语言
      let storeLang = utils.getStore('Language', localStorage) || utils.getSystemLanguage()
      for (var key in this.langsObj) {
        if (key == storeLang) {
          this.language.value = key
          this.language.label = this.langsObj[key]
          break
        }
      }

      this.userInfo = utils.getStore('USER-INFO', sessionStorage)
    },
    handleHelp() {
      utils.setStore('GUIDE-SAVE-SETP1', '', localStorage)
      utils.setStore('GUIDE-SAVE-SETP2', '', localStorage)
      utils.setStore('GUIDE-SAVE-SETP3', '', localStorage)
      utils.setStore('GUIDE-SAVE-SETP4', '', localStorage)
      utils.setStore('GUIDE-SAVE-SETP5', '', localStorage)
      utils.setStore('GUIDE-SAVE-SETP6', '', localStorage)
      utils.setStore('GUIDE-SAVE-SETP7', '', localStorage)
      utils.setStore('GUIDE-SAVE-SETP8', '', localStorage)

      if (this.$route.path == '/dashboard/channelQueryConfig') {
        window.location.reload()
      } else {
        this.routerLink(`/dashboard/channelQueryConfig`, 'replace')
      }
    },
    handleHelpCommand(command) {
      console.log('command==>', command)
      this.handleHelp()
    },
    handleCommand(command) {
      this.language.value = command
      this.language.label = this.langsObj[command]
      this.$i18n.locale = command
      // 页面标题国际化
      document.title = utils.getPageTitleLanguage(this.$i18n, this.$route.meta.title)
      utils.setStore('Language', command, localStorage)
    },
    logout() {
      this.visible = false
      window.sessionStorage.clear()
      this.goToLogin()
    }
  }
}
</script>

<style lang="less">
.selected {
  color: #409eff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header {
  // position: absolute;
  position: fixed;
  background-color: #041527;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 80px !important;
}
.content {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-view {
    display: inline-flex;
    align-items: center;
    font-size: 20px;
    color: #fff;

    span {
      margin: 5px 0px 0px 0px;
    }

    .logo-image {
      width: 145px;
      height: 30px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
  }
  .right-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: transparent;
    // background: red;
  }
  .screenfull-view {
    font-size: 8px;
    margin: 3px 30px 0px 0px;
    color: #fff;
    // background: #409eff;
  }
}

.user-view {
  margin-right: 40px;
  height: 35px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .name-label {
    color: #fff;
    font-size: 12px;
    // background: red;
  }

  .email-label {
    color: #fff;
    font-size: 12px;
    // background: yellowgreen;
  }
}

p {
  font-size: 13px;
  text-align: center;
}
</style>
