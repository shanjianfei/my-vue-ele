<template>
  <div class="coupon-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">我的优惠</span>
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