<template>
  <div class="food-container">
    <ul class="food-left">
      <li class="food-category-li" :class="{active: index===currentFoodCategory}" v-for="(item, index) in foodCategory" @click="selectFoodCategory(item, index)" :key="index">
        <span>{{item.name}}</span>
        <span class="count" v-if="getCategoryCount(item.id) > 0">{{getCategoryCount(item.id)}}</span>
      </li>
    </ul>
    <ul class="food-right">
      <header class="food-header">
        <span>{{restaurantInfo.name}}</span>
        <span>{{restaurantInfo.description}}</span>
      </header>
      <li class="food-li" v-for="(item, index) in food.foods" :key="index">
        <div class="food-attributes">
          <div v-for="(attr, index) in item.attributes" :key="index">
            <span class="attr-new-backbround" v-if="attr.icon_name === '新'" :style="{'border-right-color': '#' + attr.icon_color}"></span>
            <span class="attr-new" v-if="attr.icon_name === '新'">新品</span>
            <span class="food-recommendation" v-if="attr.icon_name === '招牌'" :style="{'border-color': '#' + attr.icon_color, color: '#' + attr.icon_color}">招牌</span>
          </div>
        </div>
        <div class="food-icon">
          <img :src="getImageUrl(item.image_path)">
        </div>
        <div class="food-description">
          <p>{{item.name}}</p>
          <p>{{item.description}}</p>
          <p>月售{{item.month_sales}}&nbsp;&nbsp;&nbsp;好评率{{item.satisfy_rate}}%</p>
          <p class="food-activity" v-if="item.activity">
            <span :style="{'border-color': '#' + item.activity.icon_color, color: '#' + item.activity.image_text_color}">{{item.activity.image_text}}</span>
          </p>
          <p class="food-footer">
            <span class="price">
              <span>￥</span>
              <span>{{item.specfoods[0].price}}</span>
            </span>
            <span>
              <svg class="remove-food" @click="$emit('removeFood', item)">
                <use xlink:href="#cart-minus"></use>
              </svg>
              <span class="food-num">{{getFoodCount(item.item_id)}}</span>
              <svg class="add-food" @click="$emit('addFood', item)">
                <use xlink:href="#cart-add"></use>
              </svg>
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {getRestaurantDetailInfo, getImageUrl, getFoodMenu} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      restaurantId: null,
      currentFoodCategory: 0,
      foodCategory: [],
      selectFood: [],
      restaurantInfo: {},
      food: {}
    }
  },
  mounted: function () {
    this.restaurantId = this.$route.query.id
    console.log(1)
    this.init()
  },
  methods: {
    init: function () {
      let self = this
      getFoodMenu(this.restaurantId).then(function (data) {
        self.foodCategory = data
        self.food = data[0]
      })
      getRestaurantDetailInfo(this.restaurantId)
        .then(function (data) {
          if (!('status' in data && data.status === 0)) {
            self.restaurantInfo = data
          }
        })
      let order = JSON.parse(getStore('order'))
      if (order) {
        if (this.restaurantId in order) {
          this.selectFood = order[this.restaurantId].foodsInfo
        }
      }
    },
    selectFoodCategory: function (item, index) {
      this.currentFoodCategory = index
    },
    getCategoryCount: function (id) {
      let count = 0
      for (let i = 0; i < this.selectFood.length; i++) {
        if (this.selectFood[i].category_id === id) {
          count++
        }
      }
      return count
    },
    getFoodCount: function (id) {
      let count = 0
      for (let i in this.selectFood) {
        if (this.selectFood[i].item_id === id) {
          count += 1
        }
      }
      return count
    },
    getImageUrl: function (imgPath) {
      return getImageUrl(imgPath)
    }
  }
}
</script>
<style>
  .food-left {
    width: 15rem;
    overflow: auto;
    height: 100%;
  }
  .food-category-li {
    background-color: #f8f8f8;
    border-bottom: 0.1rem solid #ebebeb;
    padding: 1.7rem 1rem;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    position: relative;
  }
  .count {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    line-height: 1.15rem;
    width: 1.15rem;
    border-radius: 50%;
    color: #fff;
    font-size: .8rem;
    text-align: center;
  }
  .active {
    border-left: 0.3rem solid #3190e8;
    background-color: #fff;
  }

  .food-right {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .food-header {
    height: 4rem;
    padding-left: 1rem;
  }
  .food-header > span:nth-child(1) {
    font-weight: bold;
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  .food-li {
    padding: 1rem 0.5rem;
    display: flex;
    flex-direction: row;
    border-bottom: 0.1rem solid #f1f1f1;
    position: relative;
  }
  .attr-new-backbround {
    position: absolute;
    top: -1.6rem;
    left: -1.6rem;
    border-width: 1.6rem;
    border-style: solid;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    transform:rotate(45deg);
  }
  .attr-new {
    font-size: 0.7rem;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    top: -1.6rem;
    left: -1.6rem;
    position: absolute;
    transform:rotate(-45deg);
  }
  .food-icon > img {
    height: 4.2rem;
    width: 4.2rem;
    padding-right: 1rem;
  }
  .food-description {
    width: 100%;
  }
  .food-description > p {
    margin: 0.3rem 0 0.3rem 0;
  }
  .food-description > p:nth-child(1) {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .food-description > p:nth-child(2) {
    color: #999;
  }
  .food-activity > span {
    font-size: 0.6rem;
    border: 0.07rem solid;
    padding: 0.08rem;
    border-radius: 0.5rem;
  }
  .price > span {
    color: #f1884f;
  }
  .price > span:nth-child(2) {
    font-size: 1.4rem;
    font-weight: bold;
  }
  .add-food {
    height: 1.8rem;
    width: 1.8rem;
    fill: #3190e8;
    margin-right: 2rem;
  }
  .food-num {
    display: inline-block;
    text-align: center;
    width: 1.8rem;
    font-size: 1.3rem;
  }
  .remove-food {
    height: 1.8rem;
    width: 1.8rem;
    fill: #3190e8;
  }
  .food-footer > span:nth-child(2) {
    display: flex;
    align-items: center;
  }
  .food-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .food-recommendation {
    position: absolute;
    top: 1rem;
    right: 3.2rem;
    font-size: 0.6rem;
    border: 0.07rem solid;
    border-radius: 0.55rem;
    padding: 0.15rem;
  }
</style>
