<template>
  <div class="shops-guide-page">
    <head-top>
      <router-link slot="head-left" class="head-search" :to="'/search/' + geohash">
        <svg class="search-icon">
          <use xlink:href="#search" stroke="#fff" fill="#fff"></use>
        </svg>
      </router-link>
      <head-center-link slot="head-center" link="/" :headTitle="headTitle"></head-center-link>
      <router-link class="login" slot="head-right" to="/login" v-if="!isLogin">
        注册|登录
      </router-link>
      <router-link class="logout" slot="head-right" to="/profile" v-else>
        <svg class="user-avatar">
          <use xlink:href="#user" stroke="#fff" fill="#fff"></use>
        </svg>
      </router-link>
    </head-top>
    <div class="shops-guide-container">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(obj, index) in foodsRecommand" :key="index">
          <router-link class="food-link" :to="{path: '/shopsGuide/recommendRestaurant', query: {title: item.title, geohash}}" v-for="(item, i) in obj" :key="i">
            <img :src="getImageUrl(item.image_url)">
            <p>{{item.title}}</p>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="food-list">
        <div class="shop-list-title">
          <svg class="shop-list-icon"><use xlink:href="#shop"></use></svg>
          <span>附近商家</span>
        </div>
        <shop-list :restaurantsList="restaurantsList"></shop-list>
      </div>
    </div>
    <footer-guild></footer-guild>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import headTop from '@/components/head/head'
import headCenterLink from '@/components/head/children/headCenterLink'
import shopList from '@/components/common/shopList'
import footerGuild from '@/components/footer/footer'
import {isLogin, getFoodClassificationList, getShopList} from '@/service/getData'
export default {
  data () {
    return {
      foodsRecommand: [],
      headTitle: '',
      restaurantsList: [],
      geohash: '',
      isLogin: false,
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  mounted: function () {
    // 获取登陆状态
    this.isLogin = isLogin()
    this.geohash = this.$route.query.geohash
    this.headTitle = this.$route.query.name
    let self = this
    getFoodClassificationList()
      .then(function (data) {
        for (let i = 0, j = 0; i < data.length; i += 8, j++) {
          self.foodsRecommand[j] = data.slice(i, i + 8)
        }
      })
    // 获取 shops
    var latitude = this.geohash.split(',')[0]
    var longitude = this.geohash.split(',')[1]
    getShopList(latitude, longitude)
      .then(function (data) {
        self.restaurantsList = data
      })
  },
  methods: {
    getImageUrl: function (img) {
      let baseUrl = 'https://fuss10.elemecdn.com'
      return baseUrl + img
    }
  },
  components: {
    headTop,
    shopList,
    footerGuild,
    headCenterLink,
    swiper,
    swiperSlide
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .shops-guide-page {
    header {
      .head-search {
        .head-left;
        .search-icon {
          .wh(1.2rem, 1.2rem);
        }
      }
      .login {
        .head-right;
      }
      .logout {
        .head-right;
        .user-avatar {
          .wh(1.2rem, 1.2rem);
        }
      }
    }
    .shops-guide-container {
      padding-top: 3rem;
      .swiper-container {
        .bgw;
        .swiper-slide {
          .flex;
          flex-wrap: wrap;
          .food-link {
            .flex(@fd: column; @jc: center);
            width: 25%;
            text-align: center;
            margin: 0.6rem 0;
            img {
              .wh(3rem, 3rem);
            }
          }
        }
        .swiper-pagination-bullets {
          bottom: 0;
        }
      }
      .food-list {
        margin-top: 1rem;
        .shop-list-title {
          .bgw;
          .flex(@jc: flex-start);
          padding: .5rem 1rem;
          .shop-list-icon {
            .wh(1rem, 1rem);
            fill: #999;
            margin-right: .5rem;
          }
          span {
            color: #999;
          }
        }
      }
    }
  }
</style>
