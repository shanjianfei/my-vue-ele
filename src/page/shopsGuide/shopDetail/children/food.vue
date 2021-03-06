<template>
  <div class="food-container">
    <ul class="food-left">
      <li :class="{active: index===currentFoodCategory}" v-for="(item, index) in foodCategory" @click="selectFoodCategory(item, index)" :key="index">
        <span class="category-name">{{item.name}}</span>
        <span class="food-count" v-if="getCategoryCount(item.id) > 0">{{getCategoryCount(item.id)}}</span>
      </li>
    </ul>
    <ul class="food-right">
      <header>
        <span>{{restaurantInfo.name}}</span>
        <span>{{restaurantInfo.description}}</span>
      </header>
      <li v-for="(item, index) in food.foods" :key="index">
        <div v-for="(attr, index) in item.attributes" :key="index">
          <span class="new-icon" v-if="attr.icon_name === '新'" :style="{'border-right-color': '#' + attr.icon_color}"></span>
          <span class="new-bar" v-if="attr.icon_name === '新'">新品</span>
          <span class="specialty" v-if="attr.icon_name === '招牌'" :style="{'border-color': '#' + attr.icon_color, color: '#' + attr.icon_color}">招牌</span>
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
            <span>
              <span>￥</span>
              <span>{{item.specfoods[0].price}}</span>
            </span>
            <span>
              <svg class="remove-food" @click="removeFood(item)">
                <use xlink:href="#cart-minus"></use>
              </svg>
              <span class="food-num">{{getFoodCount(item.item_id)}}</span>
              <svg class="add-food" @click="addFood(item)">
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
import {getStore, setStore} from '@/commonApi/localStorage'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      restaurantId: null, // 餐厅的id
      currentFoodCategory: 0, // 当前选择的食品种类
      foodCategory: [], // 食品种类列表
      selectFood: [], // 加入购物车的食物
      restaurantInfo: {}, // 餐厅详细信息
      food: {} // 所选餐厅的所有食物
    }
  },
  mounted: function () {
    this.restaurantId = this.$route.query.id
    this.init()
  },
  methods: {
    ...mapMutations(['updateSelectFood']),
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
          this.updateSelectFood(this.selectFood)
        }
      }
    },
    selectFoodCategory: function (item, index) {
      this.currentFoodCategory = index
      this.food = item
    },
    getCategoryCount: function (id) {
      for (let i = 0; i < this.selectFood.length; i++) {
        if (this.selectFood[i].category_id === id) {
          return this.selectFood[i].quantity
        }
      }
      return 0
    },
    getFoodCount: function (id) {
      for (let i in this.selectFood) {
        if (this.selectFood[i].item_id === id) {
          return this.selectFood[i].quantity
        }
      }
      return 0
    },
    getImageUrl: function (imgPath) {
      return getImageUrl(imgPath)
    },
    addFood: function (item) {
      let order = JSON.parse(getStore('order'))
      if (order) {
        if (this.restaurantId in order) {
          let _exist = 0
          for (let i in order[this.restaurantId].foodsInfo) {
            if (order[this.restaurantId].foodsInfo[i].item_id === item.item_id) {
              order[this.restaurantId].foodsInfo[i].quantity += 1
              _exist = 1
              break
            }
          }
          if (_exist !== 1) {
            item.quantity = 1
            order[this.restaurantId].foodsInfo.push(item)
          }
          setStore('order', JSON.stringify(order))
        } else {
          item.quantity = 1
          order[this.restaurantId] = {foodsInfo: [item]}
          setStore('order', JSON.stringify(order))
        }
      } else {
        order = {}
        item.quantity = 1
        order[this.restaurantId] = {foodsInfo: [item]}
        setStore('order', JSON.stringify(order))
      }
      this.selectFood = order[this.restaurantId].foodsInfo
      this.updateSelectFood(this.selectFood)
    },
    removeFood: function (item) {
      let order = JSON.parse(getStore('order'))
      if (order) {
        if (this.restaurantId in order) {
          for (let i in order[this.restaurantId].foodsInfo) {
            if (order[this.restaurantId].foodsInfo[i].item_id === item.item_id) {
              order[this.restaurantId].foodsInfo[i].quantity -= 1
              if (order[this.restaurantId].foodsInfo[i].quantity === 0) {
                order[this.restaurantId].foodsInfo.splice(i, 1)
              }
              if (order[this.restaurantId].foodsInfo.length === 0) {
                delete (order[this.restaurantId])
                this.selectFood = []
                setStore('order', JSON.stringify(order))
                this.updateSelectFood(this.selectFood)
                return
              }
              break
            }
          }
          setStore('order', JSON.stringify(order))
          this.selectFood = order[this.restaurantId].foodsInfo
          this.updateSelectFood(this.selectFood)
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .food-container {
    display: flex;
    flex-direction: row;
    .absolute;
    bottom: 0rem;
    top: 3rem;
    left: 0;
    right: 0;
    overflow: auto;
    .food-left {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      flex: 2.5;
      .active {
        border-left: 0.3rem solid #3190e8;
        .bgw;
        > span {
          font-weight: bold;
        }
      }
      li {
        .bgc(#f8f8f8);
        border-bottom: 0.1rem solid #ebebeb;
        padding: 1rem .5rem;
        font-size: .9rem;
        .flex(@jc: flex-start;);
        .relative;
        .category-name {
          word-break:break-all;
          white-space:normal;
        }
        .food-count {
          .absolute;
          top: 0;
          right: 0;
          .bgc(red);
          line-height: 1.15rem;
          width: 1.15rem;
          .br(0.5);
          color: #fff;
          font-size: .8rem;
          text-align: center;
        }
      }
    }
    .food-right {
      .wh(100%, 100%);
      overflow-y: auto;
      overflow-x: hidden;
      flex: 7;
      header {
        height: 2.5rem;
        padding-left: 1rem;
        span:nth-child(1) {
          font-weight: bold;
          font-size: 1.3rem;
          margin-right: 0.5rem;
        }
      }
      li {
        padding: 1rem 0.5rem;
        display: flex;
        flex-direction: row;
        border-bottom: 0.1rem solid #f1f1f1;
        position: relative;
        div:first-child {
          .new-icon {
            .absolute;
            top: -1.6rem;
            left: -1.6rem;
            border-width: 1.6rem;
            border-style: solid;
            border-top-color: transparent;
            border-left-color: transparent;
            border-bottom-color: transparent;
            transform:rotate(45deg);
          }
          .new-bar {
            font-size: 0.7rem;
            font-weight: bold;
            color: #fff;
            .flex(@ai: flex-end; @jc: center);
            .wh(3.2rem, 3.2rem);
            top: -1.6rem;
            left: -1.6rem;
            .absolute;
            transform:rotate(-45deg);
          }
          .specialty {
            .absolute;
            top: 1rem;
            right: .75rem;
            font-size: 0.4rem;
            border: 1px solid;
            .br(0.3);
            padding: 0.1rem;
          }
        }
        .food-icon > img {
          height: 3.5rem;
          width: 3.5rem;
          padding-right: 1rem;
        }
        .food-description {
          width: 100%;
          p {
            margin: 0.3rem 0 0.3rem 0;
            color: #000;
            font-size: .8rem;
          }
          p:nth-child(1) {
            font-size: 1rem;
            font-weight: bold;
          }
          p:nth-child(2) {
            color: #999;
          }
          .food-activity {
            span {
              font-size: 0.6rem;
              border: 0.07rem solid;
              padding: 0.08rem;
              border-radius: 0.5rem;
            }
          }
          .food-footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            span:first-child {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              span {
                color: #f60;
              }
              span:last-child {
                font-size: 1rem;
                font-weight: bold;
              }
            }
            span:last-child {
              display: flex;
              align-items: center;
              .add-food {
                height: 1.3rem;
                width: 1.3rem;
                fill: @blue;
              }
              .food-num {
                display: inline-block;
                text-align: center;
                width: 1.3rem;
                font-size: .9rem;
              }
              .remove-food {
                height: 1.3rem;
                width: 1.3rem;
                fill: @blue;
              }
            }
          }
        }
      }
    }
  }
</style>
