<template>
  <router-link class="link-bar-small-page" :to="link">
    <span class="link-bar-small-left">{{contentLeft}}</span>
    <section class="link-bar-small-right">
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
  .link-bar-small-page {
    .bgw;
    .flex;
    padding: 0 .5rem;
    height: 2.5rem;
    .link-bar-small-left {
      font-size: .8rem;
    }
    .link-bar-small-right {
      .flex;
      margin-right: .3rem;
    }
  }
</style>
