<template>
  <div class="balance-description-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-title" headTitle="余额问题"></head-title>
    </head-top>
    <div class="balance-description-container">
      <h4>Q1: 使用余额的条件</h4>
      <p>为了保护账户安全，使用余额前必须先绑定手机号。</p>
      <h4>Q2: 余额可以怎么用？</h4>
      <p>余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。</p>
      <h4>Q3:我要如何提现？</h4>
      <p>为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。</p>
      <h4>Q4:为什么会提现失败？</h4>
      <p>可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。</p>
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
  .balance-description-container {
    .bgw;
    padding: 3rem 1rem 1rem 1rem;
    h4 {
      margin: 1rem 0;
      color: #333;
      font-weight: normal;
    }
    p {
      font-size: .9rem;
    }
  }
</style>
