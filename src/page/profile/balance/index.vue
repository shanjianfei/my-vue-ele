<template>
  <div class="balance-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-title" headTitle="我得余额"></head-title>
    </head-top>
    <div class="balance-container">
      <div class="balance-content">
        <section class="balance-header">
          <span>当前余额</span>
          <section>
            <img src="@/images/description.png">
            <router-link to="/profile/balance/balanceDescription">余额说明</router-link>
          </section>
        </section>
        <section class="balance-body">
          <span>0.00</span>
          <span>元</span>
        </section>
        <button-submit text="提现" bg="#ccc" lh="3rem"></button-submit>
      </div>
    </div>
    <div class="transaction-details">
      <p>交易明细</p>
      <img src="@/images/no-log.png">
      <p>暂无明细记录</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import buttonSubmit from '@/components/common/buttonSubmit'
export default {
  data () {
    return {}
  },
  components: {headTop, arrowLeft, headTitle, buttonSubmit}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .balance-page {
    .balance-container {
      margin-top: 3rem;
      padding: 1rem .5rem .5rem .5rem;
      background-color: @blue;
      .balance-content {
        .br(0.015);
        padding: 1rem;
        background-color: #fff;
        .balance-header {
          .flex;
          > section {
            .flex;
            > img {
              .wh(1.2rem, 1.2rem);
              margin-right: 0.3rem;
            }
            > a {
              color: @blue;
            }
          }
        }
        .balance-body {
          > span:first-child {
            font-size: 3rem;
          }
        }
        > div {
          margin-top: 2rem;
          font-size: 1.5rem;
        }
      }
    }
    .transaction-details {
      margin-top: 0.5rem;
      padding: 0.5rem;
      text-align: center;
      > p:first-child {
        text-align: left;
        font-size: .8rem;
      }
    }
  }
</style>
