<template>
  <div class="voucher-description-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">代金券说明</span>
    </head-top>
    <div class="voucher-description-container">
      <h3>Q1: 什么是商家代金券？</h3>
      <p>商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额。</p>
      <h3>Q2: 怎么获得商家代金券？</h3>
      <p>进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。</p>
      <p>「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。</p>
      <h3>Q3: 商家代金券使用条件</h3>
      <p>商家代金券仅限在指定商家使用</p>
      <p>商家代金券仅限在线支付使用</p>
      <p>每个订单只能使用一张商家代金券，不可与其他代金券叠加使用</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  components: {headTop, arrowLeft}
}
</script>
<style>
  .voucher-description-container {
    padding: 3rem 1rem 0 1rem;
  }
  .voucher-description-container > h3 {
    color: #333;
    font-weight: normal;
  }
</style>
