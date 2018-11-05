<template>
  <div class="membership-card">
    <head-top>
      <p>s</p>
      <arrow-left></arrow-left>
      <span class="point-title" slot="point-title">会员中心</span>
    </head-top>
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
  .head-goback {
    left: 0.4rem;
    margin-left: .4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.7rem;
    font-weight: bold;
  }
</style>
