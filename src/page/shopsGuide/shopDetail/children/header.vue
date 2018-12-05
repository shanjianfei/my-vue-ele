<template>
  <div class="shop-detail-header-container">
    <img :src="getImageUrl(restaurantInfo.image_path)">
    <div class="head-top">
      <svg class="goback-icon" @click="$router.go(-1)">
        <use xlink:href="#arrow-left"></use>
      </svg>
      <router-link class="arrow-right-container" tag="div" :to="{path: '/shopsGuide/shopDetail/shopDescription', query: {'restaurantId': restaurantId}}">
        <arrow-right></arrow-right>
      </router-link>
      <div class="shop-introduction">
        <img :src="getImageUrl(restaurantInfo.image_path)">
        <section>
          <p>{{restaurantInfo.name}}</p>
          <p>商家配送／{{restaurantInfo.order_lead_time}}分钟送达／配送费¥{{restaurantInfo.float_delivery_fee}}</p>
          <p>公告：{{restaurantInfo.promotion_info}}</p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import arrowRight from '@/components/common/arrowRight'
import {getRestaurantDetailInfo, getImageUrl} from '@/service/getData'
export default {
  data () {
    return {
      restaurantInfo: {}
    }
  },
  mounted: function () {
    let self = this
    getRestaurantDetailInfo(this.restaurantId)
      .then(function (data) {
        if (!('status' in data && data.status === 0)) {
          self.restaurantInfo = data
        }
      })
  },
  methods: {
    getImageUrl: function (imagePath) {
      return getImageUrl(imagePath)
    }
  },
  props: ['restaurantId'],
  components: {arrowRight}
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
  .goback-icon {
    position: absolute;
    top: .2rem;
    left: .2rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .arrow-right-container {
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>
