<template>
  <div class="vip-description-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="我的优惠"></head-title>
    </head-top>
    <div class="vip-description-container">
      <header>尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化： 购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。 注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。</header>
      <section>
        <h5>Q1: 特权介绍</h5>
        <p>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</p>
        <p>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。
        更多特权，敬请期待！</p>
        <h5>Q2: 资费介绍</h5>
        <p>饿了么会员卡：20元</p>
        <h5>Q3: 使用说明</h5>
        <p>当用户满足以下任一条件，会员服务自动失效：</p>
        <ol>
          <li>自绑定之日起超过31天；</li>
          <li>在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</li>
        </ol>
        <h5>Q4: 购卡说明</h5>
        <p>在线购买：饿了么App>我的>饿了么会员卡</p>
        <h5>Q5: 温馨提示</h5>
        <p>用户在当前会员服务失效前，无法购买新卡。</p>
        <p>请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。</p>
      </section>
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
  .vip-description-container {
    padding-top: 3rem;
    .bgw;
  }
  h5 {
    color: #333;
    margin: 1rem 0 .5rem 0;
  }
  section {
    padding: 0 1rem;
  }
  p {
    font-size: .8rem;
  }
  header {
    padding: 1rem 3rem;
    font-size: .8rem;
  }
  li {
    font-size: .8rem;
    color: #666;
  }
</style>
