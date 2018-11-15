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
<style>
  .link-bar-page {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 .5rem;
    line-height: 2.5rem;
  }
  .link-bar-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link-bar-right > span {
    margin-right: .3rem;
  }
</style>
