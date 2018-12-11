<template>
  <div class="points-description-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="积分问题"></head-title>
    </head-top>
    <div class="points-description-container">
      <h5>Q1: 怎么获得积分？</h5>
      <p>在线支付的订单将获得订单积分奖励：</p>
      <p>积分将在用户完成评价后获得。</p>
      <p>可获得积分=订单金额×10（即1元=10点积分）。</p>
      <p>订单金额指实际付款金额，不包含活动优惠金额。</p>
      <p>每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。</p>
      <h5>Q2: 积分用来做什么？</h5>
      <p>可以在积分商城兑换各种礼品。</p>
      <h5>Q3: 礼品兑换很多天了还没有收到，该怎么办？</h5>
      <p>礼品从兑换日起，3个工作日（周末不算）内处理发货，发货后，通常会在3个工作日左右送达。</p>
      <h5>Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？</h5>
      <p>不会，手机充值卡兑换，是直接充值到您填写的手机号上，充值之前不会和您电话确认，所以您在填写电话的时候，请确认电话是否正确。</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  data () {
    return {}
  },
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .points-description-container {
    .bgw;
    padding: 3rem 1rem 0 1rem;
    h5 {
      margin: 1rem 0;
      color: #333;
      font-weight: normal;
    }
    p {
      font-size: .85rem;
    }
  }
</style>
