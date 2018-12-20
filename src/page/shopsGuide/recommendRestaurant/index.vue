<template>
  <div class="recommend-restaurant-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" :headTitle="textTitle"></head-title>
    </head-top>
    <section class="food-head-container">
      <div :class="['food-category', {'choose-type': contentShow == 'category'}]">
        <div class="classification-item" @click="chooseClassification('category')">
          <span>
            {{textTitle}}
          </span>
          <svg viewBox="0 0 10 9">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="options">
          <div class="food-category-content item-content" v-show="contentShow == 'category'">
            <ul class="category-left">
              <li :class="{active: currentSubCategory===index}" v-for="(item, index) in foodCategory" :key="index" @click="changeSubCategories(item, index)">
                <section>
                  <img :src="getImgPath(item.image_url)">
                  <span class="category-name">{{item.name}}</span>
                </section>
                <section>
                  <span class="category-count">{{item.count}}</span>
                  <svg width="8" height="8" class="category_arrow" >
                    <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                  </svg>
                </section>
              </li>
            </ul>
            <ul class="category-right">
              <li v-for="(item_s, index_s) in subCategories" :key="index_s" @click="getSubCategoryShops(item_s.id, item_s.name)">
                <span>{{item_s.name}}</span>
                <span>{{item_s.count}}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div :class="['food-sort', {'choose-type': contentShow == 'sort'}]" >
        <div class="classification-item" @click="chooseClassification('sort')">
          <span>排序</span>
          <svg viewBox="0 0 10 9">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="options">
          <div class="food-sort-content item-content" v-show="contentShow == 'sort'">
            <ul>
              <li class="sort-item" @click="sort(4)">
                <svg>
                  <use xlink:href="#default"></use>
                </svg>
                <span>智能排序</span>
              </li>
              <li class="sort-item" @click="sort(5)">
                <svg>
                  <use xlink:href="#distance"></use>
                </svg>
                <span>距离最近</span>
              </li>
              <li class="sort-item" @click="sort(6)">
                <svg>
                  <use xlink:href="#hot"></use>
                </svg>
                <span>销量最高</span>
              </li>
              <li class="sort-item" @click="sort(1)">
                <svg>
                  <use xlink:href="#price"></use>
                </svg>
                <span>起送价最低</span>
              </li>
              <li class="sort-item" @click="sort(2)">
                <svg>
                  <use xlink:href="#speed"></use>
                </svg>
                <span>配送速度最快</span>
              </li>
              <li class="sort-item" @click="sort(3)">
                <svg>
                  <use xlink:href="#rating"></use>
                </svg>
                <span>评分最高</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="food-filter" :class="['food-select', {'choose-type': contentShow == 'select'}]">
        <div class="classification-item" @click="chooseClassification('select')">
          <span>
            筛选
          </span>
          <svg viewBox="0 0 10 9">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="options">
          <div class="food-select-content item-content" v-show="contentShow == 'select'">
            <div class="options">
              <div class="shipping-method-container">
                <div class="shipping-method-label">
                  <span>配送方式</span>
                </div>
                <ul>
                  <li v-for="(item, index) in shippingMethods" @click="selectShippingMethods(index)" :key="index">
                    <svg v-show="shippingMethodsStatus[index].status">
                      <use xlink:href="#selected"></use>
                    </svg>
                    <svg v-if="!shippingMethodsStatus[index].status && item.id===1">
                      <use xlink:href="#fengniao"></use>
                    </svg>
                    <svg v-else-if="!shippingMethodsStatus[index].status && item.id!==1">
                      <use xlink:href="#default"></use>
                    </svg>
                    <span :style="{color: '#' + item.color}">{{item.text}}</span>
                  </li>
                </ul>
              </div>
              <div class="marketers-property-container">
                <span>商家属性（可以多选）</span>
                <ul>
                  <li v-for="(item, index) in activities" @click="selectActivities(index)" :key="index">
                    <svg v-show="activitiesStatus[index].status">
                      <use xlink:href="#selected"></use>
                    </svg>
                    <span class="marketers-property-icon" v-show="!activitiesStatus[index].status" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                    <span :class="{activity_select: activitiesStatus[index].status}">{{item.name}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="food-select-footer">
              <button class="clear" @click="clear">清空</button>
              <button class="confirm" @click="filter">确定<span v-show="activeActivitiesNum !==0">({{activeActivitiesNum}})</span></button>
            </div>
          </div>
        </transition>
      </div>
    </section>
    <shop-list :restaurantsList="restaurantsList" class="shop-list"></shop-list>
  </div>
</template>
<script>
import Vue from 'vue'
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import shopList from '@/components/common/shopList'
import {getShopList, getShippingMethod, getFoodCategory, getImageUrlByCdn, getShopActivityList} from '@/service/getData'
export default {
  data () {
    return {
      restaurantsList: [],
      textTitle: '',
      contentShow: '',
      latitude: '',
      longitude: '',
      foodCategory: [],
      subCategories: [],
      currentSubCategory: 0,
      activities: {}, // 商家属性
      activitiesStatus: [], // 保存是否选中商家属性
      shippingMethodsStatus: [], // 一共选了几种配送方式
      activeActivitiesNum: 0, // 一共选了几个商家属性
      shippingMethods: [] // 配送方式
    }
  },
  mounted: function () {
    var self = this
    var geohash = this.$route.query.geohash
    this.textTitle = this.$route.query.title
    this.latitude = geohash.split(',')[0]
    this.longitude = geohash.split(',')[1]
    getShippingMethod(this.latitude, this.longitude).then(function (data) {
      self.shippingMethods = data
      self.shippingMethods.forEach(function (item, index) {
        self.shippingMethodsStatus[index] = {id: item.id, status: false}
      })
    })
    getShopList(this.latitude, this.longitude, 0, '', '', '4')
      .then(function (data) {
        self.restaurantsList = data
      })
    getShopActivityList(this.latitude, this.longitude)
      .then(function (data) {
        self.activities = data
        self.activities.forEach(function (item, index) {
          self.activitiesStatus[index] = {status: false, id: item.id}
        })
      })
  },
  methods: {
    getImgPath: function (path) {
      return getImageUrlByCdn(path)
    },
    chooseClassification: function (type) {
      let self = this
      if (this.contentShow !== type) {
        this.contentShow = type
      } else {
        this.contentShow = ''
      }
      if (type === 'category') {
        getFoodCategory(this.latitude, this.longitude)
          .then(function (data) {
            self.foodCategory = data
            self.subCategories = data[0].sub_categories
            self.currentSubCategory = 0
          })
      }
    },
    sort: function (type) {
      var self = this
      getShopList(this.latitude, this.longitude, 0, '', '', type + '')
        .then(function (data) {
          self.restaurantsList = data
        })
      this.contentShow = ''
    },
    changeSubCategories: function (item, index) {
      this.subCategories = item.sub_categories
      this.currentSubCategory = index
    },
    getSubCategoryShops: function (id, name) {
      this.contentShow = ''
      this.textTitle = name
      let self = this
      getShopList(this.latitude, this.longitude, 0, '', id)
        .then(function (data) {
          self.restaurantsList = data
        })
    },
    selectActivities: function (index) {
      let newValue = this.activitiesStatus[index]
      newValue.status = !newValue.status
      Vue.set(this.activitiesStatus, index, newValue)
      if (this.activitiesStatus[index].status) {
        this.activeActivitiesNum++
      } else {
        this.activeActivitiesNum--
      }
    },
    selectShippingMethods: function (index) {
      let newValue = this.shippingMethodsStatus[index]
      newValue.status = !newValue.status
      Vue.set(this.shippingMethodsStatus, index, newValue)
    },
    clear: function () {
      let self = this
      this.activitiesStatus.forEach(function (item, index) {
        self.activitiesStatus[index].status = false
      })
      this.activeFengNiao = false
      this.activeActivitiesNum = 0
    },
    filter: function () {
      let self = this
      let deliveryMode = []
      this.shippingMethodsStatus.forEach(function (item, index) {
        if (item.status) {
          deliveryMode.push(item.id)
        }
      })
      let supportIds = this.activitiesStatus
      getShopList(this.latitude, this.longitude, 0, '', '', '', deliveryMode, supportIds).then(function (data) {
        self.restaurantsList = data
      })
      this.contentShow = ''
    }
  },
  components: {
    headTop,
    shopList,
    arrowLeft,
    headTitle
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .classification-item {
    .relative;
    .bgw;
    width: 100%;
    z-index: 10;
    line-height: 2.2rem;
    span {
      font-size: .75rem;
      color: @black;
    }
    svg {
      .wh(.5rem, .5rem);
      fill: blue;
    }
  }
  .choose-type {
    .classification-item {
      svg {
        transform: rotate(180deg);
        fill: #666;
      }
    }
  }
  .item-content {
    .bgw;
    .absolute;
    transition: all 0.3s;
    top: 3rem;
    left:0rem;
    width: 100%;
  }
  .food-head-container {
    .wh(100%, 2.2rem);
    .bgw;
    .flex;
    padding-top: 3rem;
    margin-bottom: .2rem;
    > div {
      text-align: center;
      width: 100%;
    }
    .food-category {
      .food-category-content {
        .flex(@ai: flex-start);
        margin-top: 2.2rem;
        z-index: 5;
        .category-left {
          .bgc(#f1f1f1);
          flex: 1;
          .active {
            .bgw;
          }
          li {
            .flex;
            padding: .5rem 1rem;
            section {
              .flex(@ai: flex-start);
              img {
                .wh(1.2rem, 1.2rem);
                margin-right: .5rem;
              }
              .category-name {
                font-size: .65rem;
              }
              .category-count {
                font-size: 0.65rem;
                color: #fff;
                .bgc(#ccc);
                .br(0.3);
                margin-right: .7rem;
                padding: 0 .1rem;
                line-height: .8rem;
              }
            }
          }
        }
        .category-right {
          flex: 1;
          li > {
            .flex;
            box-sizing: border-box;
            padding: .8rem .3rem;
            margin: 0 .5rem;
            border-bottom: 0.1rem solid #ccc;
            span {
              font-size: .75rem;
            }
          }
        }
      }
    }
    .food-sort {
      .flex(@fd: column);
      > div {
        border-left: 1px solid #f1f1f1;
        border-right: 1px solid #f1f1f1;
      }
      .food-sort-content {
        margin-top: 2.2rem;
        z-index: 5;
        ul {
          width: 100%;
          padding: 0 1rem;
        }
        .sort-item {
          .flex(@jc: flex-start);
          padding: 1rem 0;
          border-bottom: 1px solid #ccc;
          svg {
            .wh(1rem, 1rem);
            margin-right: 1rem;
          }
          > span {
            font-size: .75rem;
          }
        }
      }
    }
    .food-filter {
      z-index: 5;
      span {
        font-size: .6rem;
        color: @black;
      }
      .food-select-content {
        margin-top: 2.5rem;
        .bgc(#f1f1f1);
        .options {
          .bgw;
          padding: 0 1rem;
          .shipping-method-container {
            .shipping-method-label {
              text-align: left;
            }
            li {
              .flex(@jc: flex-start);
              .br(0.1);
              padding: .3rem;
              width: 5rem;
              border: 0.05rem solid #eee;
              svg {
                .wh(1.1rem, 1.1rem);
              }
            }
          }
          .marketers-property-container {
            text-align: left;
            margin-top: .5rem;
            ul {
              display: flex;
              flex-wrap: wrap;
              margin-top: .3rem;
              li {
                .flex(@jc: flex-start);
                .br(0.05);
                width: 28%;
                padding: .3rem .2rem;
                border: 1px solid #eee;
                margin-bottom: 0.5rem;
                margin-right: 0.5rem;
                .marketers-property-icon {
                  .flex(@jc: center);
                  .br(0.1);
                  padding: .1rem .2rem;
                  border: 1px solid rgb(63, 189, 230);
                  margin-right: .3rem;
                }
                .activity_select {
                  color: #3190e8;
                }
                svg {
                  .wh(.8rem, .8rem);
                }
              }
            }
          }
        }
        .food-select-footer {
          .flex;
          padding: .5rem;
          button {
            .br(0.03);
            padding: .3rem 0;
            width: 100%;
            border: 0;
            font-size: 1.1rem;
          }
          .clear {
            .bgw;
            margin-right: .5rem;
          }
          .confirm {
            .bgc(#56d176);
          }
        }
      }
    }
  }

  .options-enter,
  .options-leave-to {
    transform: translateY(-100%);
  }
  .options-leave,
  .options-enter-to {
    transform: translateY(0);
  }
</style>
