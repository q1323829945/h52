<template>
  <div class="custom-dialog">
    <div class="custom-dialog-wrap"></div>
    <!--  popup -->
    <div id="popupView" class="popup-view" :style="{ overflow: overflowConfig.popupOverflow }">
      <!-- conetnt -->
      <div
        :class="overflowConfig.contentOverflow == 'scroll' ? 'custom-dialog-content content-max-height' : 'custom-dialog-content'"
        :style="{ overflow: overflowConfig.contentOverflow, width: this.setWidth('body') }"
      >
        <!-- header -->
        <div
          :class="overflowConfig.popupOverflow == 'hidden' ? 'custom-dialog-header' : 'custom-dialog-header header-position'"
          :style="{ width: this.setWidth('header') }"
        >
          <span class="custom-dialog-title">{{ title }}</span>
          <!-- button -->
          <button type="button" class="custom-dialog_headerBtn" @click="closeView">
            <i class="el-icon-close"></i>
          </button>
        </div>
        <!-- body -->
        <div class="custom-dialog-body" :style="{ overflow: overflowConfig.bodyOverflow }">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ' '
    },
    overflowConfig: {
      type: Object,
      default() {
        return {
          popupOverflow: 'hidden',
          contentOverflow: 'scroll',
          bodyOverflow: 'scroll'
        }
      }
    },
    width: {
      type: String,
      default: '800'
    }
  },
  computed: {
    //使用computed计算属性来操作Width
    setWidth() {
      return value => {
        let hasPx = this.width.indexOf('px') != -1
        let width = hasPx ? this.width.replace('px', '') : this.width
        return value == 'header' ? `${width - 40}px` : `${width}px`
      }
    }
  },
  methods: {
    closeView() {
      this.$emit('handle-close')
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.custom-dialog-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2010;
}

.popup-view {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* 默认不可滚动 */
  /* overflow: hidden; */
  /* overflow: auto; */
  margin: 0;
  z-index: 2011;
  animation: dialog-fade-in 0.3s;
}

.dialog-fade-enter-active {
  animation: dialog-fade-in 0.3s;
}

/* .dialog-fade-leave-active {
  animation: dialog-fade-out 0.3s;
} */

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

/* @keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
} */
.custom-dialog-content {
  position: relative;
  width: 800px;
  /* 默认滚动 */
  /* overflow: scroll; */
  transform: none;
  left: 0;
  margin: 30vh auto;
  min-height: 100px;
  background: #fff;
}
.content-max-height {
  max-height: 55%;
}

/* .customer-dialog-content {
  width: 900px;
} */
.customer-dialog-25 {
  width: 25%;
}
.custom-dialog-70 {
  width: 70%;
}

.custom-dialog-header {
  position: fixed;
  width: 640px;
  margin-left: 0px;
  margin-right: 0px;
  min-height: 28px;
  line-height: 28px;
  border-bottom: 1px solid #e4e7ed;
  background: #368ee0;
  padding: 2px 20px;
  z-index: 10;
}

.header-position {
  position: relative;
}

.custom-dialog-header .custom-dialog-title {
  color: #fff;
  font-size: 13px;
  line-height: 24px;
}

.custom-dialog-header .custom-dialog_headerBtn {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
.custom-dialog-header .custom-dialog_headerBtn .el-icon-close {
  color: #fff;
}
.custom-dialog-body {
  margin-top: 25px;
  padding: 20px 20px 10px;
  /* 默认滚动 */
  /* overflow: scroll;  */
  /* overflow: hidden; */
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.custom-dialog-footer {
  padding: 20px;
  padding-top: 10px;
  text-align: right;
  box-sizing: border-box;
}
</style>
