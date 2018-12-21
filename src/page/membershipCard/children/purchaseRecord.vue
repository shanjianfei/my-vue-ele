<template>
  <div class="purchase-record-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="购买记录"></head-title>
    </head-top>
    <div class="purchase-record-container">
      <img src="@/images/no-log.png">
      <p>没有购买记录</p>
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
  .purchase-record-container {
    .fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .bgw;
    .flex(@fd: column; @jc: center);
  }
  img {
    width: 11rem;
    height: 7rem;
  }
  p {
    margin-top: .8rem;
    color: #999;
    font-size: .8rem;
  }
</style>
