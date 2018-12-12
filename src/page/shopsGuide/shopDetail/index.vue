<template>
  <div class="shop-detail-container">
    <head-top :restaurantId="restaurantId"></head-top>
    <section class="switch-bar">
      <horizontal-switch-bar :items="switchBar"></horizontal-switch-bar>
      <router-view></router-view>
    </section>
    <buy-cart :restaurantId="restaurantId"></buy-cart>
  </div>
</template>
<script>
import horizontalSwitchBar from '@/components/common/horizontalSwitchBar'
import headTop from './children/header'
import buyCart from './children/buyCart'
export default {
  data () {
    return {
      restaurantId: null,
      switchBar: null
    }
  },
  components: {headTop, buyCart, horizontalSwitchBar},
  created: function () {
    this.restaurantId = this.$route.query.id
    this.switchBar = [
      {
        content: '商品',
        link: {path: '/shopsGuide/shopDetail/food', query: {id: this.restaurantId}}
      },
      {
        content: '评价',
        link: {path: '/shopsGuide/shopDetail/evaluate', query: {id: this.restaurantId}}
      }
    ]
  }
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .shop-detail-container {
    .absolute;
    display: flex;
    flex-direction: column;
    .wh(100%, 100%);
    .switch-bar {
      .relative;
      height: 100%;
    }
  }
</style>
