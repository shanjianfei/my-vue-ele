<template>
  <div class="shop-description-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">商家详情</span>
    </head-top>
    <div class="shop-description-container" v-if="restaurantDetailInfo">
      <div class="activity">
        <header>活动与属性</header>
        <ul>
          <li v-for="(item, index) in restaurantDetailInfo.supports" :key="index">
            <span :style="{'background-color': '#' + item.icon_color}">{{item.icon_name}}</span>
            <span>{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="publicity">
        <link-bar contentLeft="食品监督安全公示" :link="'/shopDetail/shopDescription/children/publicity?restaurantId=' + restaurantId" contentRight="企业认证详情"></link-bar>
        <section>
          <svg class="publicity-icon" v-if="restaurantDetailInfo.status == 1">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
          </svg>
          <svg class="publicity-icon" v-else>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
          </svg>
          <section class="check-result">
            <p>监督检查结果：
              <span v-if="restaurantDetailInfo.status == 1" class="check-result-well">良好</span>
              <span v-else class="check-result-bad">差</span>
            </p>
            <p>检查日期： {{restaurantDetailInfo.identification.identificate_date}}</p>
          </section>
        </section>
      </div>
      <div class="shop-info">
        <header>商家信息</header>
        <ul>
          <li>{{restaurantDetailInfo.name}}</li>
          <li>{{restaurantDetailInfo.address}}</li>
          <li>营业时间： {{restaurantDetailInfo.opening_hours}}</li>
          <li class="license-li" @click="onClick(0)">
            <span>营业执照</span>
            <arrow-right></arrow-right>
          </li>
          <li class="license-li" @click="onClick(1)">
            <span>餐饮服务许可证</span>
            <arrow-right></arrow-right>
          </li>
        </ul>
        <div class="img-painter" v-show="show" @click="hide">
          <img :src="img">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getRestaurantDetailInfo, getImageUrl} from '@/service/getData'
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import linkBar from '@/components/common/linkBar'
import arrowRight from '@/components/common/arrowRight'
export default {
  data () {
    return {
      restaurantId: null,
      restaurantDetailInfo: null,
      img: '',
      show: false
    }
  },
  mounted: function () {
    this.restaurantId = this.$route.query.restaurantId
    let self = this
    getRestaurantDetailInfo(this.restaurantId)
      .then(function (data) {
        self.restaurantDetailInfo = data
      })
  },
  methods: {
    onClick: function (value) {
      if (value === 0) {
        this.img = getImageUrl(this.restaurantDetailInfo.license.business_license_image)
      } else {
        this.img = getImageUrl(this.restaurantDetailInfo.license.catering_service_license_image)
      }
      this.show = true
    },
    hide: function () {
      this.show = false
    }
  },
  components: {headTop, arrowLeft, linkBar, arrowRight}
}
</script>
<style>
  .shop-description-container {
    padding-top: 3rem;
  }
  .activity > header, .shop-info > header {
    padding: .8rem;
    border-bottom: .01rem solid #f1f1f1;
    background-color: #fff;
    color: #666;
  }
  .activity > ul > li {
    line-height: 2rem;
    padding: 0 .8rem;
  }
  .activity > ul > li > span {
    font-size: .8rem;
  }
  .activity > ul > li > span:first-child {
    padding: .1rem;
    border-radius: 20%;
    font-size: .6rem;
    font-weight: bold;
    color: #fff;
    margin-right: .5rem;
  }
  .publicity, .shop-info {
    margin-top: .8rem;
  }
  .publicity > section {
    padding: .8rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: .01rem solid #f1f1f1;
  }
  .publicity-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }
  .check-result > p{
    font-size: .7rem;
  }
  .check-result-well {
    color: #7ed321;
  }
  .check-result-bad {
    color: red;
  }
  .shop-info > ul {
    padding: 0 .8rem;
    background-color: #fff;
  }
  .shop-info > ul > li {
    padding: .8rem 0;
    color: #666;
    font-size: .8rem;
    border-bottom: .01rem solid #f1f1f1;
  }
  .link-bar-small-page {
    border-bottom: .01rem solid #f1f1f1;
  }
  .img-painter {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background-color: #000;
  }
  .img-painter > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .license-li {
    display: flex;
    justify-content: space-between;
  }
</style>
