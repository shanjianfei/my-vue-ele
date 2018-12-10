<template>
  <div class="coupon-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="我的优惠"></head-title>
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
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
import horizontalSwitchBar from '@/components/common/horizontalSwitchBar'
export default {
  data () {
    return {
      itemsSwitchBar: [{content: '红包', link: '/profile/coupon/redpackages'}, {content: '商家代金券', link: '/profile/coupon/voucher'}]
    }
  },
  components: {headTop, arrowLeft, horizontalSwitchBar, arrowRight, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .coupon-page {
    .coupon-container {
      padding: 3rem 0;
    }
    .bottom-switch-bar {
      .flex;
      .bgw;
      position: fixed;
      bottom: 0;
      line-height: 3rem;
      width: 100%;
      > a {
        width: 100%;
        text-align: center;
        color: #555;
        font-size: 1.2rem;
      }
      > a:first-child {
        border-right: .05rem solid #f1f1f1;
      }
    }
  }
</style>
