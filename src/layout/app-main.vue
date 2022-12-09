<!--
 * @Author       : Nimo
 * @FilePath     : /jsd-management/src/layout/app-main.vue
 * @Date         : 2022-06-10 13:24:58
 * @LastEditTime : 2022-06-15 14:05:28
 * @LastEditors  : Nimo
 * @Logs         : 
 * 
-->
<template>
  <div :class="isShowBreadcrumb == '1' ? 'jsd-base-breadcrumb-view' : 'jsd-base-breadcrumb-view jsd-base-breadcrumb-top'">
    <slot name="header"></slot>
    <div class="jsd-base-breadcrumb-view__content" :id="appId">
      <div class="jsd-base-breadcrumb-view__box">
        <slot></slot>
      </div>
    </div>
    <!-- <slot></slot> -->
    <slot name="footer"></slot>
  </div>
</template>
<script>
import utils from '@/utils'

export default {
  name: 'app-main',
  props: {
    id: String
  },
  data() {
    return {
      appId: this.id || this.$route.path.replace(/\//g, '_') || new Date().getTime(),
      isShowBreadcrumb: utils.getStore('SHOW-BREADCRUMB', sessionStorage) || '0'
    }
  }
}
</script>
