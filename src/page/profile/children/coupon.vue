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
    padding-top: 3rem;
  }
  .red-packages-content {
    margin: 1rem 0;
    border-top: .2rem solid #ff5340;
    border-radius: 0.3rem;
  }
  .red-package {
    padding: 1rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: .2rem dashed #ff5340;
    background-color: #fff;
  }
  .red-package > section:first-child {
    padding-right: 1rem;
    border-right: .08rem dashed #ccc;
  }
  .red-package > section:first-child > p:first-child {
    font-size: 1.2rem;
    color: #ff5340;
  }
  .red-package > section:first-child > p:last-child {
    font-size: .7rem;
    color: #aaa;
  }
  .red-package > section:nth-child(2) > p:not(:first-child) {
    font-size: .7rem;
    color: #aaa;
  }
  .red-package > section:nth-child(2) {
    /*padding-left: 1rem;*/
    /*padding-right: 3rem;*/
  }
  .red-package > span {
    color: #ff5340;
  }
  .red-packages-container {
    padding: 1rem 1rem;
  }
  .red-packages-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: .7rem;
  }
  .red-packages-title > span > span {
    color: #ff5340;
  }
  .limit-map > li > span {
    font-size: .7rem;
    color: #aaa;
    background-color: #f5f5f5;
  }
  .history-red-packages-link {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .7rem;
  }
  .history-red-packages-link > svg {
    width: 0.7rem;
    height: 0.7rem;
    margin-left: .5rem;
  }
  .red-package-description {
    color: #3190e8;
  }
  .red-packages-title img {
    width: .8rem;
    height: .8rem;
    margin-right: 0.3rem;
  }
  .red-packages-title > section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bottom-switch-bar {
    display: flex;
    position: absolute;
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
