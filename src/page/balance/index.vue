<template>
  <div class="balance-page">
    <head-top>
      <arrow-left slot="head-goback"></arrow-left>
      <span slot="point-title" class="point-title">
        我得余额
      </span>
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
        <button class="balance-button">提现</button>
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
import arrowLeft from '@/components/common/arrowLeft'
export default {
  data () {
    return {}
  },
  components: {headTop, arrowLeft}
}
</script>
<style>
  .balance-container {
    margin-top: 2.8rem;
    padding: 1rem .5rem .5rem .5rem;
    background-color: #3190e8
  }
  .balance-content {
    border-radius: 1rem;
    padding: 1rem;
    background-color: #fff;
  }
  .balance-header {
    display: flex;
    justify-content: space-between;
  }
  .balance-header > section {
    display: flex;
    align-items: center;
  }
  .balance-header > section > img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.3rem;
  }
  .balance-header > section > a {
    color: #3190e8;
  }
  .balance-body > span:first-child {
    font-size: 3rem;
  }
  .balance-button {
    width: 100%;
    text-align: center;
    background-color: #ccc;
    color: #f1f1f1;
    height: 3rem;
    margin-top: 2rem;
    border-radius: 0.5rem;
    border: 0;
    font-size: 1.5rem;
  }
  .transaction-details {
    margin-top: 0.5rem;
    padding: 0.5rem;
    text-align: center;
  }
  .transaction-details > p:first-child {
    text-align: left;
  }
</style>
