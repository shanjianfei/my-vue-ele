<template>
  <div class="coupon-description-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="我的优惠"></head-title>
    </head-top>
    <div class="coupon-description-container">
      <h5>Q1: 怎么获得红包？</h5>
      <p>通过邀请好友获得</p>
      <p>在下单返红包的商家下单获得</p>
      <p>抢微信朋友分享的红包获得</p>
      <h5>Q2: 红包可以做什么？</h5>
      <p>可以抵扣在线支付时的实际支付金额。</p>
      <h5>Q3: 红包的门槛金额按照什么金额计算？</h5>
      <p>红包的的门槛金额按照（选购菜品折后价＋餐盒费）的金额作为计算门槛，即购物车显示的金额（7.3以上版本）。假设红包满30可用，只要选购的菜品现价（折后价）＋餐盒费超过30，就可以使用红包。</p>
      <h5>Q4: 一个红包能拆开多次使用吗？</h5>
      <p>不能，一个红包只能一次性使用，不能分开使用。</p>
      <h5>Q5: 下单的时候使用了红包，但是后来订单取消了，红包还会返还吗？</h5>
      <p>会的，订单无效后红包会自动返还到您的账户里。</p>
      <h5>Q6: 红包兑换码怎样兑换成红包，怎样查看红包？</h5>
      <p>在个人中心 &gt; 我的红包 &gt; 兑换红包，输入兑换码进行兑换。</p>
      <h5>Q7: 邀请好友了，为什么没获得红包？</h5>
      <p>先检查下您是否在同一设备上进行的邀请？或者被邀请人是否通过您发给对方的链接进行注册？而非自己复制链接注册的。同一设备上邀请或没有按照点击发送的链接邀请都是无效邀请。如果您是正常邀请没获得红包，可以致电客服进行查实。</p>
      <h5>Q8: 预订早餐、预订午餐的红包怎么使用？在哪里查询？</h5>
      <p>预订早餐、预订午餐的红包暂时不支持直接点外卖使用，并且当前点外卖的红包也暂时不支持在预订早餐、预订午餐时使用。</p>
      <p>预订早餐、预订午餐的红包从APP首页点击“预订早餐”按钮进入后在右上角的个人中心中查找预订早餐、预订午餐的红包。</p>
      <h5>Q9: 互斥红包怎么使用？</h5>
      <p>互斥红包不与其他优惠活动（包含但不限于：新用户专享、满X元减X元、满X元赠XX）同时使用。</p>
      <h5>Q10: 返红包活动， 红包领取规则是什么?</h5>
      <p>同一个手机号一天限领取三个。</p>
      <p>同一注册用户一天限领取三个。</p>
      <p>注册用户红包直接发送至用户账户里。</p>
      <p>非注册用户红包以兑换码短信的形式发送至用户手机，注册后凭兑换码兑换即可。</p>
      <p>红包的使用周期为1周，自红包发放的第2天开始计算。</p>
      <p>同一个手机号一天最多使用两个红包。</p>
      <p>未收到红包短信的用户注意查看手机里的拦截短信。</p>
      <p>有任何问题请拨打客服电话：10105757。</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .coupon-description-container {
    .bgw;
    padding: 3rem 1rem 1rem 1rem;
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
