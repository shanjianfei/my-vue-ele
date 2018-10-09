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
      <div :class="['food-category', {'choose-type': contentShow == 'category'}]">
        <div class="classification-item" @click="chooseClassification('category', $event)">
          <span>
            {{textTitle}}
          </span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="classification-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="category">
          <div class="food-category-content" v-show="contentShow == 'category'">
            <ul>
              <li class="category-li-left" :class="{active: currentSubCategory===index}" v-for="(item, index) in foodCategory" :key="index" @click="changeSubCategories(item, index)">
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
            <ul class="category-li-right">
              <li class="subCategories" v-for="(item_s, index_s) in subCategories" :key="index_s" @click="getSubCategoryShops(item_s.id, item_s.name)">
                <span>{{item_s.name}}</span>
                <span>{{item_s.count}}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div :class="['food-sort', {'choose-type': contentShow == 'sort'}]" @click="chooseClassification('sort', $event)">
        <div class="classification-item">
          <span>排序</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="classification-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="showlist">
          <div class="food-sort-content" v-show="contentShow == 'sort'">
            <ul>
              <li class="sort-item" @click="sort(4)">
                <section>
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                  </svg>
                  <span>智能排序</span>
                </section>
              </li>
              <li class="sort-item" @click="sort(5)">
                <section>
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                  </svg>
                  <span>距离最近</span>
                </section>
              </li>
              <li class="sort-item" @click="sort(6)">
                <section>
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                  </svg>
                  <span>销量最高</span>
                </section>
              </li>
              <li class="sort-item" @click="sort(1)">
                <section>
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                  </svg>
                  <span>起送价最低</span>
                </section>
              </li>
              <li class="sort-item" @click="sort(2)">
                <section>
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                  </svg>
                  <span>配送速度最快</span>
                </section>
              </li>
              <li class="sort-item" @click="sort(3)">
                <section>
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                  </svg>
                  <span>评分最高</span>
                </section>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="food-filter" :class="['food-select', {'choose-type': contentShow == 'select'}]" @click="chooseClassification('select', $event)">
        <div class="classification-item">
          <span>
            筛选
          </span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="classification-icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="select">
          <div class="food-select-content">
            <div class="options">
              <div class="shipping-method">
                <div class="shipping-method-label">
                  <span>配送方式</span>
                </div>
                <section class="fengniao">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#fengniao"></use>
                  </svg>
                  <span>蜂鸟专送</span>
                </section>
              </div>
              <div class="marketers-property-container">
                <span class="marketers-property-label">商家属性（可以多选）</span>
                <ul class="marketers-property">
                  <li class="marketers-property-li">
                    <span class="marketers-property-icon">品</span>
                    <span>品牌商家</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="food-select-footer">
              <button>清空</button>
              <button>确定</button>
            </div>
          </div>
        </transition>
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
      foodCategory: [],
      subCategories: [],
      currentSubCategory: 0
    }
  },
  computed: {

  },
  mounted: function () {
    var self = this
    var geohash = this.$route.query.geohash
    this.textTitle = this.$route.query.title
    console.log(this.textTitle)
    this.latitude = geohash.split(',')[0]
    this.longitude = geohash.split(',')[1]
    var order_by = '4'
    var urlRestaurant = this.urlRestaurantBase + '?latitude=' + this.latitude + '&longitude=' + this.longitude + '&order_by=' + order_by
    axios.get(urlRestaurant)
      .then(function (response) {
        if (response.status === 200) {
          self.restaurantsList = response.data
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
    chooseClassification: function (type, event) {
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
            self.subCategories = response.data[0].sub_categories
            self.currentSubCategory = 0
          }
        })
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
        })
    },
    changeSubCategories: function (item, index) {
      this.subCategories = item.sub_categories
      this.currentSubCategory = index
    },
    changeCurrentCategory: function () {

    },
    getSubCategoryShops: function (id, name) {
      console.log(id)
      this.contentShow = ''
      this.textTitle = name
      let url = 'https://elm.cangdu.org/shopping/restaurants?latitude=' + this.latitude + '&longitude=' + this.longitude + '&restaurant_category_ids[]=' + id
      let self = this
      axios.get(url)
        .then(function (response) {
          if (response.status === 200) {
            self.restaurantsList = response.data
            console.log(self.restaurantsList)
          }
        })
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
    z-index: 100;
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
    z-index: 13;
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
    position: relative;
    line-height: 3rem;
    z-index: 14;
  }

  ul {
    padding-left: 0;
  }

  .sort-item > section {
    display: flex;
    align-items: center;
    height: 5rem;
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

  .sort-item svg {
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

  .sort-item span, .category-name {
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

  .category-enter-active {
    transition: all 0.3s;
  }

  .category-enter {
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

  .active {
    background-color: #fff;
  }

  .subCategories {
    line-height: 4rem;
    display: flex;
    justify-content: space-between;
    margin-left: 1rem;
    margin-right: 1rem;
    border-bottom: 0.1rem solid #ccc;
  }

  .shipping-method svg {
    height: 1.6rem;
    width: 1.6rem;
  }

  .food-select-content {
    background-color: #fff;
    position: absolute;
    width: 100%;
    top: 3rem;
    left:0rem;
  }

  .shipping-method {
    padding-left: 2rem;
    margin-bottom: 1rem;
  }

  .shipping-method-label {
    text-align: left
  }

  .fengniao {
    display: flex;
    height: 2rem;
    width: 8rem;
    justify-content: center;
    align-content: center;
    border: 0.1rem solid #eee;
  }

  .marketers-property-label {
    text-align: left;
  }

  .marketers-property-container {
    text-align: left;
    padding-left: 2rem;
  }

  .marketers-property {
    display: flex;
    flex-wrap: wrap;
  }

  .marketers-property-li {
    display: flex;
    border: 0.1rem solid #eee;
    height: 3rem;
    width: 8rem;
    align-items: center;
    justify-content: center;
  }

  .marketers-property-icon {
    padding: 0.1rem;
    border: 0.1rem solid rgb(63, 189, 230);
    height: 2.2rem;
    width: 2.2rem;
    text-align: center;
    margin-right: 0.5rem;
  }

  .marketers-property-li > span:nth-child(2) {
    line-height: 3rem;
  }

  .food-select-footer {
    display: flex;
    justify-content: space-between;
  }

  .food-select-footer > button{
    width: 100%;
    margin-right: 1rem;
    margin-left: 1rem;
    height: 3rem;
  }
</style>
