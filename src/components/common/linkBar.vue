<template>
  <router-link class="link-bar-page" :to="link">
    <span class="link-bar-left">{{contentLeft}}</span>
    <section class="link-bar-right">
      <span>{{contentRight}}</span>
      <arrow-right></arrow-right>
    </section>
  </router-link>
</template>
<script>
import arrowRight from '@/components/common/arrowRight'
export default {
  components: {
    arrowRight
  },
  props: ['contentLeft', 'contentRight', 'link']
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .link-bar-page {
    .bgw;
    .flex;
    padding: 0 .5rem;
    height: 2.5rem;
    .link-bar-right {
      .flex;
      margin-right: .3rem;
      > span {
        margin-right: .5rem;
        color: #bbb;
      }
    }
  }
</style>
