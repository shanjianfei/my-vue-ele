<template>
  <div class="purchase-record-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">购买记录</span>
    </head-top>
    <div class="purchase-record-container">
      <img src="@/images/no-log.png">
      <p>没有购买记录</p>
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
  .purchase-record-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .purchase-record-container > img {
    width: 13rem;
    height: 9rem;
  }
  .purchase-record-container > p {
    margin-top: 1rem;
    color: #999;
  }
</style>
