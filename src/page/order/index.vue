<template>
  <div class="order-page-container">
    <head-top class="header">
      <span slot="login" class="head-login">注册|登录</span>
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">确认订单</span>
    </head-top>
    <section class="order-container">
      <router-link :to="'/city/' + cityId" class="add-delivery-address-container">
        <section>
          <svg data-v-4e0d5034="" class="location_icon">
            <use data-v-4e0d5034="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <span>请添加一个收货地址</span>
        </section>
        <svg class="arrow_right">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <section class="delivery-time-container">
        <span>送达时间</span>
        <section></section>
      </section>
    </section>
  </div>
</template>
<script>
import {mapState} from  'vuex'
import headTop from '@/components/head/head'
export default {
  data () {
    return {
      restaurantId: 0
    }
  },
  computed: mapState(['currentRestaurantDetailInfo']),
  mounted: function () {
    // let id = 
    // [{attrs:[],extra:{},id:食品id,name:食品名称,packing_fee:打包费,price:价格,quantity:数量,sku_id:规格id,specs:规格,stock:存量,}]
  },
  components: {headTop}
}
</script>
<style>
  .head-login {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    right: 0.55rem;
    font-size: 0.8rem;
  }
  .head-goback {
    left: 0.4rem;
    width: 1.2rem;
    height: 1.5rem;
    line-height: 2.2rem;
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
    font-size: 1.5rem;
  }
  .order-container {
    margin-top: 2.8rem;
    height: 100%;
  }
  .add-delivery-address-container {
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: 1.5rem;
    padding: 1rem;
  }
  .arrow_right, .location_icon {
    width: 1rem;
    height: 1rem;
  }

</style>
