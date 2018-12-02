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
<style>
  .link-bar-small-page {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 .5rem;
    line-height: 2.5rem;
  }
  .link-bar-small-left {
    font-size: .8rem;
  }
  .link-bar-small-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: .3rem;
  }
</style>
