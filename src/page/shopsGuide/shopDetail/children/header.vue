<template>
  <div class="shop-detail-header-container">
    <img :src="getImageUrl(restaurantInfo.image_path)">
    <svg class="goback-icon" @click="$router.go(-1)">
      <use xlink:href="#arrow-left"></use>
    </svg>
    <div class="head-top">
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
import arrowLeft from '@/components/common/arrowLeft'
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
  components: {arrowLeft, arrowRight}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .shop-detail-header-container {
    .wh(100%, 7rem);
    .relative;
    .flex(@fd: column; @ai: flex-start);
    flex-shrink: 0;
    z-index: 11;
    overflow: hidden;
    .bgw;
    > img:nth-child(1) {
      .wh(100%, 100%);
      .absolute;
      z-index: 9;
      filter: blur(10px);
      opacity: 0.5;
    }
    .goback-icon {
      .absolute;
      .wh(1.5rem, 1.5rem);
      top: .2rem;
      left: .2rem;
      z-index: 12;
    }
    .head-top {
      .absolute;
      .flex;
      .wh(100%, 100%);
      .bgc(rgba(119, 103, 137, 0.43));
      padding-top: .5rem;
      z-index: 11;
      .arrow-right-container {
        .absolute;
        .flex(@jc: center);
        .wh(3rem, 100%);
        right: 0;
      }
      .shop-introduction {
        .wh(100%, 8rem);
        .flex(@ai: flex-start);
        margin-top: 1rem;
        > img {
          .wh(4.5rem, 4.5rem);
          margin-left: 1rem;
          .br(0.05);
        }
        > section {
          .flex(@fd: column; @ai: flex-start; @jc: flex-start);
          padding-left: .5rem;
          padding-right: 3rem;
          > p {
            color: #fff;
            margin-bottom: 0.3rem;
            font-size: .75rem;
          }
          > p:nth-child(1) {
            font-size: 1.3rem;
            font-weight: bold;
          }
        }
      }

    }
  }
</style>
