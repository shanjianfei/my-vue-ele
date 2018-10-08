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
      <div :class="['food-category', {'choose-type': contentShow == 'category'}]" @click="chooseClassification('category')">
        <span class="classification-item">
          {{textTitle}}
        </span>
        <transition>
          <section class="food-category-content" v-show="contentShow == 'category'">
            <ul>
              <li class="category-li-left" v-for="(item, index) in foodCategory" :key="index">
                <section>
                  <img :src="getImgPath(item.image_url)">
                  <span class="category-name">{{item.name}}</span>
                </section>
                <section>
                  <span class="category-count">{{item.count}}</span>
                  <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
                    <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                  </svg>
                </section>
              </li>
            </ul>
            <ul>
              <section class="category-li-right">
                  <url>
                    <li class="sub_categories" v-for="(item, index) in sub_categories">
                      <span>item.name</span>
                      <span>item.count</span>
                    </li>
                  </url>
              </section>
            </ul>
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
              <li class="sort-item" @click="sort(4)">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                </svg>
                <span>智能排序</span>
              </li>
              <li class="sort-item" @click="sort(5)">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                </svg>
                <span>距离最近</span>
              </li>
              <li class="sort-item" @click="sort(6)">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                </svg>
                <span>销量最高</span>
              </li>
              <li class="sort-item" @click="sort(1)">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                </svg>
                <span>起送价最低</span>
              </li>
              <li class="sort-item" @click="sort(2)">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                </svg>
                <span>配送速度最快</span>
              </li>
              <li class="sort-item" @click="sort(3)">
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
      typeFlag: '',
      latitude: '',
      longitude: '',
      urlRestaurantBase: 'https://elm.cangdu.org/shopping/restaurants',
      foodCategory: []
    }
  },
  mounted: function () {
    var self = this
    var geohash = this.$route.query.geohash
    this.textTitle = this.$route.query.title
    this.latitude = geohash.split(',')[0]
    this.longitude = geohash.split(',')[1]
    var order_by = '4'
    var urlRestaurant = this.urlRestaurantBase + '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&order_by=' + order_by
    axios.get(urlRestaurant)
      .then(function (response) {
        if (response.status === 200) {
          self.restaurantsList = response.data
          console.log(response.data)
        }
      })
  },
  methods: {
    getImgPath: function (path) {
      if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
      }
      let suffix = ''
      if (path.indexOf('jpeg') > -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
      return 'https://fuss10.elemecdn.com' + url
    },
    chooseClassification: function (type) {
      let self = this
      if (this.contentShow !== type) {
        this.contentShow = type
      } else {
        this.contentShow = ''
      }
      if (type === 'category') {
        let url = 'https://elm.cangdu.org/shopping/v2/restaurant/category' + '?latitude=' + this.latitude + '&longitude=' + this.longitude
        axios.get(url)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data)
            self.foodCategory = response.data
          }
        });
      }
    },
    sort: function (type) {
      var urlRestaurant = this.urlRestaurantBase + '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&order_by=' + type
      var self = this
      axios.get(urlRestaurant)
        .then(function (response) {
          if (response.status === 200) {
            self.restaurantsList = response.data
          }
        });
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

  .food-category-content {
    background-color: #fff;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    top: 3rem;
    left:0rem;
  }

  .food-category-content>ul:first-child {
    background-color: #f1f1f1;
  }

  .food-category-content > ul {
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
    align-items: center;
  }

  .category-li-left>section {
    display: flex;
    height: 4rem;
    align-items: center;
  }

  .category-li-left {
    display: flex;
    height: 3rem;
    justify-content: space-between;
  }

  .sort-item>svg {
    height: 100%;
    width: 1rem;
    margin: 0 1.5rem 0 2rem;
  }

  .category-li-left img {
    height: 1.5rem;
    width: 1.5rem;
    margin: 0 1rem 0 2rem;
  }

  .category-count {
    font-size: 0.8rem;
    color: #fff;
    background-color: #ccc;
    border: 0.25rem solid #ccc;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }

  .category-li-left svg {
    margin-right: 1rem;
  }

  .sort-item>span, .category-name {
    line-height: 5rem;
    font-family: "Microsoft Yahei";
    color: #666;
    font-size: 1rem;
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
