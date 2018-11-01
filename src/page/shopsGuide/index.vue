<template>
  <div class="shops-guide">
    <head-top class="header">
      <router-link slot="head-search" class="head-search" :to="'/search/' + geohash">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link class="point-title" slot="point-title" to="/abc">
        <span class="title-text">{{pointTitle}}</span>
      </router-link>
      <router-link class="login" slot="login" to="/abc">
        <span>注册|登录</span>
      </router-link>
    </head-top>
    <div class="foods-recommand">
      <!-- Swiper -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in foodsRecommand" :key="index">
            <router-link v-for="(food, index) in item" :key="index" :to="{path: '/shop', query: {title: food.title, geohash: $route.query.geohash}}">
              <figure>
                <img :src="foodsRecommandBaseUrl + food.image_url">
                <figcaption>{{food.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <shop-list :restaurantsList="restaurantsList"></shop-list>
  </div>
</template>
<script>
import axios from 'axios'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import headTop from '@/components/head/head'
import shopList from '@/components/common/shopList'
export default {
  data () {
    return {
      foodsRecommandBaseUrl: 'https://fuss10.elemecdn.com',
      foodsRecommand: [],
      pointTitle: '',
      restaurantsList: [],
      geohash: ''
    }
  },
  mounted: function () {
    this.geohash = this.$route.query.geohash
    this.pointTitle = this.$route.query.name
    var urlRecommand = 'https://elm.cangdu.org/v2/index_entry'
    var self = this
    axios.get(urlRecommand)
      .then(function (response) {
        if (response.status === 200) {
          var data = response.data
          var resArr = [...data]
          var foodArr = []
          for (let i = 0, j = 0; i < data.length; i += 8, j++) {
            foodArr[j] = resArr.splice(0, 8)
          }
          self.foodsRecommand = foodArr
        }
      })
      .then(function () {
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true
        })
      })
    // 获取 shops
    var urlRestaurantBase = 'https://elm.cangdu.org/shopping/restaurants'
    var latitude = this.geohash.split(',')[0]
    var longitude = this.geohash.split(',')[1]
    var urlRestaurant = urlRestaurantBase + '?latitude=' + latitude + '&longitude=' + longitude
    axios.get(urlRestaurant)
      .then(function (response) {
        if (response.status === 200) {
          self.restaurantsList = response.data
        }
      })
  },
  methods: {
  },
  components: {
    headTop,
    shopList
  }
}
</script>
<style>
  .point-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-decoration: none;
  }

  .title-text {
    color: #fff;
  }

  .login {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.7rem;
    text-decoration: none;
  }

  .login span {
    color: #fff;
  }

  .head-search {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 1.4rem;
    width: 1.4rem;
    left: 0.7rem;
  }

  .foods-recommand {
    padding-top: 3rem;
    background-color: #fff;
  }

  .foods-recommand a {
    width: 25%;
    text-align: center;
    text-decoration: none;
    margin: 0.7rem 0;
  }

  .foods-recommand figure {
    padding: 0;
    margin: 0;
  }

  .foods-recommand a img {
    width: 3rem;
    height: 3rem;
  }

  .foods-recommand figcaption {
    color: #666;
    font-family: "Microsoft Yahei";
  }

  .swiper-wrapper {
    margin-bottom: 0.7rem;
  }

  .swiper-slide {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
