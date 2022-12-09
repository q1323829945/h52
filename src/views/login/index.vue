<!--
 * @Author       : Nimo
 * @FilePath     : /car-management/src/views/login/index.vue
 * @Date         : 2022-02-11 11:02:45
 * @LastEditTime : 2022-12-05 15:21:11
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div class="login-container" v-loading="fullscreenLoading" element-loading-background="rgba(0, 0, 0, 0.0)">
    <!-- 国际化 -->
    <el-dropdown v-if="isShowLanguage" class="language-dropdown" @command="handleLanguage">
      <span style="color: white">
        {{ language.label }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, key) in langsObj" :key="key" :command="`${key}`" :class="{ selected: language.value == key }">
          {{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 登录表单 -->
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">{{ $t('login.loginTitle') }}</h3>
      <!-- 账号 -->
      <el-form-item prop="username">
        <el-input :style="{ width: '100%' }" type="text" :placeholder="$t('login.accountPlace')" v-model="form.username" clearable>
          <div class="icon-view" slot="prefix">
            <i class="el-icon-user"></i>
          </div>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          ref="password"
          :style="{ width: '100%' }"
          clearable
          :type="passwordType"
          :placeholder="$t('login.passwordPlace')"
          v-model="form.password"
          @keyup.enter.native="onSubmit('loginForm')"
        >
          <div class="icon-view" slot="prefix">
            <i class="el-icon-lock"></i>
          </div>
          <div class="icon-view icon-margin" slot="suffix" @click="handleShowPwd">
            <i :class="passwordType === 'password' ? 'iconfont icon-no_eye' : 'iconfont icon-eye-fill'"></i>
          </div>
        </el-input>
      </el-form-item>
      <!-- domain -->
      <el-form-item prop="domain">
        <el-input :style="{ width: '100%' }" type="text" :placeholder="$t('login.domainPlace')" v-model="form.domain" clearable>
          <div class="icon-view" slot="prefix">
            <i class="el-icon-link"></i>
          </div>
        </el-input>
      </el-form-item>
      <div class="button-view">
        <el-button class="login-button" type="primary" v-on:click="onSubmit('loginForm')">{{ $t('login.signin') }}</el-button>
      </div>
    </el-form>

    <!-- handleClose -->
    <el-dialog :title="$t('commonDialog.tips')" :visible.sync="dialogVisible" width="30%">
      <span>{{ $t('login.dialogLoginTips') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          {{ $t('commonDialog.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import utils from 'utils'

export default {
  name: 'Login',
  data() {
    return {
      isShowLanguage: process.env.VUE_APP_ENV == 'production' ? false : true,
      fullscreenLoading: false,
      language: { label: 'English', value: 'en' },
      langsObj: { en: 'English', zh: '中文' },
      passwordType: 'password',
      form: {
        username: '',
        password: '',
        domain: 'fd02ab50-c56a-447d-b8ee-0b8429779c15'
      },
      // 对话框显示和隐藏
      dialogVisible: false,
      menuIcons: [
        'el-icon-s-home',
        'el-icon-s-tools',
        'el-icon-s-cooperation',
        'el-icon-s-finance',
        'el-icon-search',
        'el-icon-s-data',
        'el-icon-s-marketing',
        'el-icon-s-custom'
      ]
    }
  },
  computed: {
    //使用computed计算属性来操作form表单规则的国际化
    rules() {
      const rules = {
        username: [{ required: true, message: this.$t('login.accountRule'), trigger: 'change' }],
        password: [{ required: true, message: this.$t('login.passwordRule'), trigger: 'change' }],
        domain: [{ required: true, message: this.$t('login.domainRule'), trigger: 'change' }]
      }
      //语言切换刷新表单，避免切换语言出现错误提示
      this.$nextTick(() => {
        this.$refs.loginForm.clearValidate()
        this.$refs.loginForm.resetFields()
      })
      return rules
    }
  },
  beforeCreate() {
    // 进入页面修改body颜色
    document.querySelector('body').setAttribute('style', 'background-color:#041527')
  },

  beforeDestroy() {
    // 离开页面清除body颜色
    document.querySelector('body').removeAttribute('style')
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      // 获取当前语言
      let storeLang = utils.getStore('Language', localStorage) || utils.getSystemLanguage()
      for (var key in this.langsObj) {
        if (key == storeLang) {
          this.language.value = key
          this.language.label = this.langsObj[key]
          break
        }
      }
    },
    // 切换语言
    handleLanguage(command) {
      this.language.value = command
      this.language.label = this.langsObj[command]
      this.$i18n.locale = command
      document.title = utils.getPageTitleLanguage(this.$i18n, this.$route.meta.title)
      utils.setStore('Language', command, localStorage)
    },
    // 密码明文
    handleShowPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getLogin()
        } else {
          return false
        }
      })
    },

    /**
     * @description: 登录
     */
    getLogin() {
      this.fullscreenLoading = true
      utils.setStore('USER-DOMAIN', this.form.domain, sessionStorage)

      this.$api
        .fetch(
          'get_login_jsons',
          {
            username: this.form.username,
            password: this.form.password
          },
          {
            encrypt: 'login'
          }
        )
        .then(res => {
          let userinfo = { username: res.data.username, email: res.data.email }
          utils.setStore('USER-INFO', userinfo, sessionStorage)
          utils.setStore('USER-TOKEN', res.data.token, sessionStorage)
          // user
          this.requestMenu()
        })
        .catch(msg => {
          this.fullscreenLoading = false
          this.$message.error(msg)
        })
    },

    /**
     * @description: 获取用户信息
     */
    requestUserData() {
      this.$api
        .fetch('query_user_jsons', {}, { method: 'get' })
        .then(() => {})
        .catch(() => {})
    },
    /**
     * @description: 获取侧边栏菜单
     */
    requestMenu() {
      this.$api
        .fetch('query_menu_jsons', {}, { method: 'get' })
        .then(res => {
          console.log('requestMenu res==>', res)
          // const menuArray = [
          //   {
          //     name: 'sysConfig',
          //     parentName: '',
          //     icon: '',
          //     path: '',
          //     children: [
          //       {
          //         name: 'roleConfig',
          //         parentName: 'sysConfig',
          //         icon: '',
          //         path: '/dashboard/role',
          //         children: null
          //       },
          //       {
          //         name: 'permissionConfig',
          //         parentName: 'sysConfig',
          //         icon: '',
          //         path: '/dashboard/permissions',
          //         children: null
          //       },
          //       {
          //         name: 'userConfig',
          //         parentName: 'sysConfig',
          //         icon: '',
          //         path: '/dashboard/user',
          //         children: null
          //       },
          //       {
          //         name: 'positionConfig',
          //         parentName: 'sysConfig',
          //         icon: '',
          //         path: '/dashboard/positionConfig',
          //         children: null
          //       }
          //     ]
          //   },
          //   {
          //     name: 'businessConfig',
          //     parentName: '',
          //     icon: '',
          //     path: '',
          //     children: [
          //       {
          //         name: 'ratePlanConfig',
          //         parentName: 'businessConfig',
          //         icon: '',
          //         path: '/dashboard/ratePlan',
          //         children: null
          //       },
          //       {
          //         name: 'questionnairesConfig',
          //         parentName: 'businessConfig',
          //         icon: '',
          //         path: '/dashboard/questionnaires',
          //         children: null
          //       },
          //       {
          //         name: 'loanProductConfig',
          //         parentName: 'businessConfig',
          //         icon: '',
          //         path: '/dashboard/loanProduct',
          //         children: null
          //       },
          //       {
          //         name: 'pdpaConfig',
          //         parentName: 'businessConfig',
          //         icon: '',
          //         path: '/dashboard/pdpaConfig',
          //         children: null
          //       }
          //       // {
          //       //   name: 'workflowConfig',
          //       //   parentName: 'businessConfig',
          //       //   icon: '',
          //       //   path: '/dashboard/workflowConfig',
          //       //   children: null
          //       // },
          //       // {
          //       //   name: 'workflowQuery',
          //       //   parentName: 'businessConfig',
          //       //   icon: '',
          //       //   path: '/dashboard/workflowQuery',
          //       //   children: null
          //       // }
          //     ]
          //   },
          //   {
          //     name: 'businessHandling',
          //     parentName: '',
          //     icon: '',
          //     path: '',
          //     children: [
          //       {
          //         name: 'loanApplySupplementConfig',
          //         parentName: 'businessHandling',
          //         icon: '',
          //         path: '/dashboard/loanApplySupplement',
          //         children: null
          //       }
          //       // {
          //       //   name: 'eventHandle',
          //       //   parentName: 'businessHandling',
          //       //   icon: '',
          //       //   path: '/dashboard/eventHandle',
          //       //   children: null
          //       // }
          //     ]
          //   },
          //   {
          //     name: 'businessQuery',
          //     parentName: '',
          //     icon: '',
          //     path: '',
          //     children: [
          //       {
          //         name: 'loanApplyQueryConfig',
          //         parentName: 'businessQuery',
          //         icon: '',
          //         path: '/dashboard/loanApplyQuery',
          //         children: null
          //       }
          //       // {
          //       //   name: 'eventHandleQuery',
          //       //   parentName: 'businessQuery',
          //       //   icon: '',
          //       //   path: '/dashboard/eventHandleQuery',
          //       //   children: null
          //       // }
          //     ]
          //   },
          //   {
          //     name: 'statisticsQuery',
          //     parentName: '',
          //     icon: '',
          //     path: '',
          //     children: [
          //       {
          //         name: 'commissionStatisticsConfig',
          //         parentName: 'statisticsQuery',
          //         icon: '',
          //         path: '/dashboard/commissionStatisticsConfig',
          //         children: null
          //       },
          //       {
          //         name: 'loanApplicationStatisticsConfig',
          //         parentName: 'statisticsQuery',
          //         icon: '',
          //         path: '/dashboard/loanApplicationStatisticsConfig',
          //         children: null
          //       }
          //     ]
          //   },
          //   {
          //     name: 'channelConfig',
          //     parentName: '',
          //     icon: '',
          //     path: '',
          //     children: [
          //       {
          //         name: 'channelQueryConfig',
          //         parentName: 'channelConfig',
          //         icon: '',
          //         path: '/dashboard/channelQueryConfig',
          //         children: null
          //       }
          //     ]
          //   }
          // ]

          const menuArray = JSON.parse(JSON.stringify(res.data))
          menuArray.splice(0, 0, {
            name: 'homeConfig',
            parentName: '',
            icon: '',
            children: null,
            path: '/dashboard/home'
          })
          // menuArray[1].children.splice(0, 0, {
          //   name: 'eventConfig',
          //   parentName: 'sysConfig',
          //   icon: '',
          //   path: '/dashboard/eventConfig',
          //   children: null
          // })
          // console.log('menuArray res==>', menuArray)

          // icon设置
          if (this.menuIcons.length < menuArray.length) {
            let icons = []
            for (let index = 0; index < menuArray.length - this.menuIcons.length; index++) {
              icons.push('el-icon-menu')
            }
            this.menuIcons = [...this.menuIcons, ...icons]
          }
          menuArray.forEach((element, index) => {
            element.icon = this.menuIcons[index]
          })
          this.fullscreenLoading = false
          utils.setStore('ASIDE-MENU-TREE', menuArray, sessionStorage)
          this.routerLink('/dashboard', true)
        })
        .catch(() => {
          this.fullscreenLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  // background: #fff;
  background: #041527;
  // 041527
  // 334154
}
.language-dropdown {
  position: absolute;
  float: right;
  top: 40px;
  right: 50px;
}
.login-box {
  // border: 1px solid #dcdfe6;
  width: 450px;
  margin: 150px auto;
  padding: 35px 35px 15px 35px;
  // border-radius: 10px;
  // box-shadow: 0 0 25px #ceced1;
  // background: #fff;

  /deep/ .el-form-item {
    margin: 0px 0px 30px 0px;
  }
  // 输入框不为空
  /deep/ .el-input {
    height: 40px;
    input {
      // background: transparent;
      border: 0px;
      // border-bottom: 1px solid #bebebe;
      // -webkit-appearance: none;
      border-radius: 5px;
      // padding: 12px 5px 12px 15px;
      color: white;
      // caret-color: goldenrod;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
        -webkit-text-fill-color: white !important;
      }
    }
  }
  // 输入框为空
  /deep/ .el-input__inner {
    height: 100%;
    padding-left: 70px;
    background: #2d3a4b;
  }
  /deep/ .el-input__inner::placeholder {
    color: #606266;
  }

  // 处理clear不在输入框内问题
  ::v-deep {
    .el-input__suffix {
      height: auto;
      font-size: 20px;
      &-inner {
        flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        margin-top: 4px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.login-title {
  text-align: center;
  font-size: 30px;
  margin: 0 auto 60px auto;
  color: #fff;
  // color: #303133;
}
.button-view {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-button {
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
}

.icon-view {
  width: 30px;
  height: 80%;
  margin: 5px 0px 0px 10px;
  font-size: 18px;
  // background: goldenrod;
}

.icon-margin {
  margin: 1px 0px 0px 10px;
}
</style>
