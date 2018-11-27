<template>
  <div class="coupon-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">我的优惠</span>
    </head-top>
    <div class="coupon-container">
      <horizontal-switch-bar :items="itemsSwitchBar"></horizontal-switch-bar>
      <router-view></router-view>
    </div>
    <div class="bottom-switch-bar">
      <router-link to="/profile/coupon/convertredpackages">兑换红包</router-link>
      <router-link to="/profile/coupon/recommand">推荐有奖</router-link>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
import horizontalSwitchBar from '@/components/common/horizontalSwitchBar'
export default {
  data () {
    return {
      itemsSwitchBar: [{content: '红包', link: '/profile/coupon/redpackages'}, {content: '商家代金券', link: '/profile/coupon/voucher'}]
    }
  },
  components: {headTop, arrowLeft, horizontalSwitchBar, arrowRight}
}
</script>
<style>
  .coupon-container {
    padding: 3.2rem 0;
  }
  .bottom-switch-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    line-height: 3rem;
    background-color: #fff;
    width: 100%;
    justify-content: space-between;
  }
  .bottom-switch-bar > a {
    width: 100%;
    text-align: center;
    color: #555;
    font-size: 1.2rem;
  }
  .bottom-switch-bar > a:first-child {
    border-right: .05rem solid #f1f1f1;
  }
</style>
