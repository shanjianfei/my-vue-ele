<template>
  <div>
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <section slot="point-title" class="point-title">
        <span class="title-text">{{textTitle}}</span>
      </section>
    </head-top>
    <section class="food-head-container">
      <div class="food-classification">
        <span class="classification-item" @click="chooseClassification('classification')">
          {{textTitle}}
        </span>
        <transition>
          <section class="food-classification-content" v-show="contentShow == 'classification'">
          </section>
        </transition>
      </div>
      <div :class="['food-sort', {'choose-type': contentShow == 'sort'}]" @click="chooseClassification('sort')">
        <span class="classification-item">排序</span>
        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="classification-icon">
          <polygon points="0,3 10,3 5,8"/>
        </svg>
        <transition name="showlist">
          <section class="food-sort-content" v-show="contentShow == 'sort'">
            <ul>
              <li class="sort-item">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                </svg>
                <span>智能排序</span>
              </li>
              <li class="sort-item">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                </svg>
                <span>距离最近</span>
              </li>
              <li class="sort-item">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                </svg>
                <span>销量最高</span>
              </li>
              <li class="sort-item">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                </svg>
                <span>起送价最低</span>
              </li>
              <li class="sort-item">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                </svg>
                <span>配送速度最快</span>
              </li>
              <li class="sort-item">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                </svg>
                <span>评分最高</span>
              </li>
            </ul>
          </section>
        </transition>
      </div>
      <div class="food-filter">
        <span class="classification-item">筛选</span>
      </div>
    </section>
    <shop-list :restaurantsList="restaurantsList" class="shop-list"></shop-list>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import shopList from '@/components/common/shopList'
import axios from 'axios'
export default {
  data () {
    return {
      restaurantsList: [],
      textTitle: '',
      contentShow: '',
      typeFlag: ''
    }
  },
  mounted: function () {
    var self = this
    var geohash = this.$route.query.geohash
    this.textTitle = this.$route.query.title
    var urlRestaurantBase = 'https://elm.cangdu.org/shopping/restaurants'
    var latitude = geohash.split(',')[0]
    var longitude = geohash.split(',')[1]
    var urlRestaurant = urlRestaurantBase + '?latitude=' + latitude + '&longitude=' + longitude
    axios.get(urlRestaurant)
      .then(function (response) {
        if (response.status === 200) {
          self.restaurantsList = response.data
          console.log(response.data)
        }
      })
  },
  methods: {
    chooseClassification: function (type) {
      if (this.contentShow !== type) {
        this.contentShow = type
      } else {
        this.contentShow = ''
      }
    }
  },
  components: {
    headTop,
    shopList
  }
}
</script>
<style>
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

  .header {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
  }

  .point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  .title-text {
    font-size: 1.3rem;
    color: #fff;
  }

  .food-head-container {
    position: fixed;
    top: 2.8rem;
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #f1f1f1;
    background-color: #fff;
    z-index: 1001;
  }

  .food-head-container>div {
    width: 100%;
    text-align: center;
    font: 1.1rem "Mircsoft Yahei"
  }

  .food-sort-content {
    background-color: #fff;
    display: flex;
    position: absolute;
    top: 3rem;
    left:0rem;
    width: 100%;
  }

  .classification-item {
    line-height: 3rem;
  }

  ul {
    padding-left: 0;
  }

  .sort-item {
    display: flex;
    height: 5rem;
  }

  .sort-item>svg {
    height: 100%;
    width: 1rem;
    margin: 0 1.5rem 0 2rem;
  }

  .sort-item>span {
    line-height: 5rem;
    color: #666;
  }

  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }

  .shop-list {
    margin-top: 7rem;
  }

  .choose-type .classification-icon {
    transform: rotate(180deg);
    fill: blue;
  }

  .classification-icon {
      vertical-align: middle;
      transition: all 0.3s;
      fill: #666;
    }
</style>
