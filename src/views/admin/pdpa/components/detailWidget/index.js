/*
 * @Author       : Nimo
 * @FilePath     : /bdo-management/src/views/admin/pdpa/components/detailWidget/index.js
 * @Date         : 2022-07-19 16:31:19
 * @LastEditTime : 2022-09-14 17:06:22
 * @LastEditors  : Nimo
 * @Logs         :
 *
 */

import draggable from 'vuedraggable'

export default {
  name: 'detailWidget',
  components: { draggable },
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isNewAdd: {
      type: Boolean,
      default: false
    },
    onlyRead: {
      type: Boolean,
      default: false
    },
    // 是否有为插槽
    isSlot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drag: false,
      selectIndex: -1,
      modelTemp: this.model
    }
  },
  watch: {
    model: {
      handler(newVal) {
        this.modelTemp = newVal
      },
      immediate: true
    }
  },
  computed: {
    setComputedWidth() {
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 120
        return `${width}px`
      }
    },
    setSysComputedWidth() {
      return value => {
        const width = this.$i18n.locale == 'en' ? value.en : value.zh ? value.zh : 120
        if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
          return `${width}px`
        } else {
          return `${width + 20}px`
        }
      }
    },
    setItemClass() {
      return value => {
        const className = this.$i18n.locale == 'en' ? 'item-view  item-view-width' : 'item-view'
        if (value == this.selectIndex) {
          return className + ' ' + 'item-view-select-shadow'
        }
        return className
      }
    }
  },
  created() {},
  methods: {
    selectChange() {
      this.forceUpdate()
      console.log('modelTemp==>', this.modelTemp)
    },
    forceUpdate() {
      this.$forceUpdate()
    },
    handleAdd(evt, index) {
      this.selectIndex = index
      let values = {
        label: '',
        name: ''
      }
      let information = this.modelTemp.pdpaInformation[index].information
      //unshift
      information.push(values)
      // 修改el-button 点击后依然处于聚焦状态导致的问题
      let target = evt.target
      if (target.nodeName == 'SPAN') {
        target = evt.target.parentNode
      }
      target.blur()
    },
    /**
     * @description: 删除
     * @param {*} type 删除的类型
     * @param {*} item item 对象
     */
    handleDelete(evt, type, item) {
      if (type == 'item') {
        this.selectIndex = -1
        this.modelTemp.pdpaInformation.splice(item.section, 1)
      } else {
        let information = this.modelTemp.pdpaInformation[item.section].information
        information.splice(item.index, 1)
        if (information.length <= 0) {
          this.selectIndex = item.section
          this.modelTemp.pdpaInformation.splice(item.section, 1)
        }
      }
      // 修改el-button 点击后依然处于聚焦状态导致的问题
      let target = evt.target
      if (target.nodeName == 'SPAN') {
        target = evt.target.parentNode
      }
      target.blur()
    },
    //开始拖拽事件
    onStart() {
      // this.drag = true
    },
    //拖拽结束事件
    //拖拽结束事件
    onEnd() {
      // this.drag = false
      //拖拽完成后的顺序
      let arr = []
      this.modelTemp.pdpaInformation.forEach(item => {
        arr.push(item.item)
      })
      //拖拽后利用localStorage记录顺序
      localStorage.arr = arr
      var localSt = localStorage.arr //已经存储起来的排序后的id
      //如果有localst记录则，按照这个进行排序元素
      if (localSt) {
        var resArr = localSt.split(',')
        let arrSort = [] //定义一个变量，用来存储排序后id对应的数据
        for (let index = 0; index < resArr.length; index++) {
          //循环已经存储到localStorage中的数组id
          // const element = resArr[index]
          // console.log(element)
          this.modelTemp.pdpaInformation.map(item => {
            //循环已经获取到的数组数据，根据存储到localStorage中的Id匹配到对应的数据
            if (item.item == resArr[index]) {
              arrSort.push(item)
            }
          })
        }
        this.modelTemp.pdpaInformation = arrSort
        // this.sortDatas = arrSort
      }
    },
    /**
     * @description: 保存
     * @param {*}
     * @return {*}
     */
    handleSave() {
      this.$refs.pdpaDetailWidgetFormData.validate(valid => {
        if (valid) {
          this.$emit('handleSave', this.modelTemp)
        } else {
          this.$message.error(this.$t('pdpa.pdpaFormMessage'))
          return false
        }
      })
    }
  }
}
