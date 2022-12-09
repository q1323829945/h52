/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/store/store.js
 * @Date         : 2022-02-16 16:30:04
 * @LastEditTime : 2022-11-02 13:48:48
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// state (全局变量的数据)
// getters (用来获取数据的方法)
// actions (跟后台接口打交道的方法)
// mutations (存储数据的方法)

// vueComponent(组件) -> actions
// -> mutations -> state -> vueComponent(组件)
// vueComponent(组件) -> getters -> state

let store = new Vuex.Store({
  // 1. state
  state: {
    onceNetworkAlert: false, // 网络请求错误弹窗只弹一次
    menuTreeData: [
      {
        id: 1,
        name: 'menu1',
        parent_id: null,
        type: 'D',
        icon: null,
        path: null,
        sort: null,
        remark: null,
        hierarchy: 1
      },
      {
        id: 2,
        name: 'sys',
        parent_id: null,
        type: 'D',
        icon: null,
        path: null,
        sort: null,
        remark: null,
        hierarchy: 1
      },
      {
        id: 3,
        name: 'user',
        parent_id: 2,
        type: 'M',
        icon: null,
        path: null,
        sort: null,
        remark: null,
        hierarchy: 2
      },
      {
        id: 4,
        name: 'menu',
        parent_id: 2,
        type: 'M',
        icon: null,
        path: null,
        sort: null,
        remark: null,
        hierarchy: 2
      },
      {
        id: 5,
        name: 'role',
        parent_id: 2,
        type: 'M',
        icon: null,
        path: null,
        sort: null,
        remark: null,
        hierarchy: 2
      },
      {
        id: 6,
        name: 'permissions',
        parent_id: 2,
        type: 'M',
        icon: null,
        path: null,
        sort: null,
        remark: null,
        hierarchy: 2
      },
      {
        id: 7,
        name: '菜单管理',
        parent_id: 4,
        type: 'M',
        icon: null,
        path: null,
        sort: null,
        remark: null,
        hierarchy: 3
      }
    ],
    // 左侧边栏折叠状态
    menuIsCollapse: false,
    routerMeta: null
  },

  // 2. getters
  getters: {
    // 参数列表state指的是state数据
    getMenuTreeData(state) {
      return state.menuTreeData
    },
    getOnceNetworkAlert(state) {
      return state.onceNetworkAlert
    },
    getMenuIsCollapse(state) {
      return state.menuIsCollapse
    },
    getRouterMeta(state) {
      return state.routerMeta
    }
  },
  // 3. actions 通常跟api接口打交道
  actions: {
    // 设置菜单信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setNewMenuTreeData({ commit }, data) {
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit('set_MenuTreeData', data)
    },

    setOnceNetworkAlert({ commit }, data) {
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit('set_OnceNetworkAlertx', data)
    },

    setRouterMeta({ commit }, data) {
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit('set_routerMeta', data)
    }
  },
  // 4. mutations
  mutations: {
    // state指的是state的数据
    // data传递过来的数据
    set_MenuTreeData(state, data) {
      state.menuTreeData = data
    },
    set_OnceNetworkAlertx(state, data) {
      state.onceNetworkAlert = data
    },
    set_menuIsCollapse(state, data) {
      state.menuIsCollapse = data
    },
    set_routerMeta(state, data) {
      state.routerMeta = data
    }
  }
})

export default store
