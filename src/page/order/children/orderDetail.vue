<template>
  <div class="order-detail-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="订单详情" ></head-title>
    </head-top>
    <ul class="order-detail-container">
      <header>
        <!-- <img :src="getImageUrl(order.restaurant_image_url)"> -->
      </header>
    </ul>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
import {getOrders, getOrderDetail} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      userId: null,
      order: {}
    }
  },
  mounted: function () {
    let orderId = this.$route.query.orderId
    let self = this
    let userId = getStore('user_id')
    // getOrderDetail(userId, orderId)
    getOrderDetail(userId, 1)
      .then(function (data) {
        self.order = data
      })
  },
  components: {headTop, arrowLeft, headTitle, arrowRight}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .order-container {
  }
</style>
