<template>
  <div class="shop-detail-header-container">
    <img :src="imagePath">
    <div class="head-top">
      <div class="head-top-back-icon" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline data-v-c8684834="" points="12,18 4,9 12,0" style="fill: none; stroke: black; stroke-width: 3;"></polyline>
        </svg>
      </div>
      <div>
        <svg class="description_arrow" data-v-c8684834="" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path data-v-c8684834="" d="M0 0 L8 7 L0 14" stroke="black" stroke-width="3" fill="none"></path>
        </svg>
      </div>
      <div class="shop-introduction">
        <img :src="imagePath">
        <section>
          <p>{{shopInfo.name}}</p>
          <p>商家配送／{{shopInfo.order_lead_time}}分钟送达／配送费¥{{shopInfo.float_delivery_fee}}</p>
          <p>公告：{{shopInfo.promotion_info}}</p>
        </section>
      </div>
    </div>
    <ul class="product-evaluate">
      <li @click="changeProductEvaluat('product')" :class="{'current-li': currentLi === 'product'}">
        <span>商品</span>
      </li>
      <li @click="changeProductEvaluat('evaluate')" :class="{'current-li': currentLi === 'evaluate'}">
        <span>评价</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      restaurantId: '',
      shopInfo: {},
      currentLi: 'product'
    }
  },
  props: ['geohash', 'id', 'imagePath'],
  mounted: function () {
    this.shopInfo = this.$route.query.shopInfo
  },
  methods: {
    changeProductEvaluat: function (option) {
      this.$emit('currentOption', {current: option})
      this.currentLi = option
    }
  }
}
</script>
<style>
  .shop-detail-header-container > img:nth-child(1) {
    width: 100%;
    height: 30rem;
    position: absolute;
    z-index: 9;
    filter: blur(10px);
  }

  .head-top {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    z-index: 11;
    height: 100%;
  }

  .head-top-back-icon {
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  .head-top > div:nth-child(2) {
    position: absolute;
    right: 0;
    height: 100%;
    width: 3rem;
  }

  .description_arrow {
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .shop-introduction {
    height: 8rem;
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
  }

  .shop-introduction > img {
    height: 5.5rem;
    width: 5.5rem;
    margin-left: 1rem;
    border-radius: 0.5rem;
  }

  .shop-introduction > section {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  .shop-introduction > section > p {
    margin: 0;
    color: #fff;
    margin-bottom: 0.3rem;
  }

  .shop-introduction > section > p:nth-child(1) {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .product-evaluate {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fff;
    height: 6rem;
    z-index: 10;
    position: relative;
    padding: 0;
    margin: 0;
  }

  .product-evaluate > li {
    list-style: none;
    width: 100%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.3rem;
    padding: 0.5rem;
  }

  .current-li > span {
    color: #3190e8;
    border-bottom: 0.3rem solid #3190e8;
  }

  .shop-detail-header-container {
    flex-shrink: 0;
    height: 13rem;
    position: relative;
    z-index: 11;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 0.1rem solid #ebebeb;
    background-color: #fff;
  }

  .shop-detail-header-container > div{
    z-index: 10;
    position: relative;
  }
</style>
