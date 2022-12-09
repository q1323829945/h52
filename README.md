
# bdo-management bdo saas管理端基础框架

  

> 基于 vue、vue-router、vuex、less、element-ui、axios、vue-cli4 构建

  

  

## 特性

  

- 基于`vue-cli4`脚手架，并添加业务个性化配置`vue.config.js`构建基础工程结构

  

- 框架布局基于`layout`组件，并支持动画和缓存`keep-active`

  

- 请求数据方法统一，基于`axios`封装方法，统一处理常规异常，异步接口全部放在`api`文件夹

  

- ESLint 代码检查，以及修复检测异常代码

  

- 支持基于 plop 脚手架快速构建基础业务模版, package.json文件script设置create：plop，终端输入npm run create命令

  

  

## 1、基础目录结构

  

├── config - 镜像打包配置

  

├── plop-templates - 业务脚手架，待完善

  

├── public - 公共静态文件

  

└── src - 核心文件

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── assets - 资源库（包含样式、图片、icon、字库等）

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── font

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── icons

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── images

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── style

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── components - 组件库，自建或二次封装

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── layout - 框架结构组件

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── mixins - mixins 前置钩子

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── plugin - 全局过滤器

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── router - 路由（基于vue-router）

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── store - 数据管理（基于vuex）

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── server - 网络层

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── utils - 公共功能模块

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── fomart - 常用格式转换

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── language - 国际化

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── menuTree - 左侧菜单

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── libs - 不常用的依赖库

  

└── views - 业务模块

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── admin - 管理端页面模块

  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── login - 登录

  

## 2、开发构建

  

- 安装依赖

  

  

```

  

npm install

  

```

  

  

- 开发服务

  

  

```

  

npm run dev

  

```

  

  

- 语法检测

  

  

```

  

npm run lint

  

```

  

  

- 打包生成部署包（需先执行依赖安装）

  

  

```

  

npm run build

  

```

  

## 5、相关参考

  

  

- 组件编码规范

  

- See [Configuration Reference](https://cli.vuejs.org/config/).

  

- vue-cli4 [doc-zh](https://cli.vuejs.org/zh/)

  

- vue-router [doc-zh](https://router.vuejs.org/zh/)

  

- vuex [doc-zh](https://vuex.vuejs.org/zh/)

  

- element-ui [doc-zh][doc-zh](https://element.eleme.cn/#/zh-CN/guide/design)

  

- axios [github](https://github.com/axios/axios)

  

- less [doc-zh](http://lesscss.cn/)
