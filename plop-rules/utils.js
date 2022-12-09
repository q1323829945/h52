module.exports = {
  path: {
    // components 组件库
    components: 'src/components/',

    // views 业务代码
    views: 'src/views/admin',

    // utils 工具库
    utils: 'src/utils/',

    // routes 路由模块
    routes: 'src/router/routerPath/',

    // vuex 数据模块
    modules: 'src/store/modules/'
  },
  notEmpty: name => {
    return v => {
      if (!v || v.trim === '') {
        return `${name} is required`
      } else {
        return true
      }
    }
  }
}
