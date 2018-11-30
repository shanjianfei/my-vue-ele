<template>
  <div class="shop-detail-container">
    <head-top @currentOption="changeCurrentComponent" :restaurantId="restaurantId"></head-top>
    <section class="menu-food-container" v-show="currentComponent.product">
      <nav-left :foodMenu="foodMenu" @changeFoodMenu="changeFoodMenu"></nav-left>
      <food-list :food="food" :restaurantId="restaurantId" :selectFood="selectFood" @removeFood="removeFood" @addFood="addFood"></food-list>
      <buy-cart :selectFood="selectFood" :restaurantId="restaurantId"></buy-cart>
    </section>
    <evaluate :restaurantId="restaurantId" v-show="currentComponent.evaluate"></evaluate>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import headTop from './children/header'
import navLeft from './children/navLeft'
import foodList from './children/foodList'
import evaluate from './children/evaluate'
import buyCart from './children/buyCart'
import {getFoodMenu} from '@/service/getData'
import {setStore, getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      restaurantId: null,
      foodMenu: [],
      food: {}, // 所选餐厅的所有食物
      selectFood: [], // 加入购物车的食物
      currentComponent: {product: true, evaluate: false} // 商品和评价标签切换
    }
  },
  components: {headTop, navLeft, foodList, evaluate, buyCart},
  created: function () {
    this.restaurantId = this.$route.query.id
  },
  mounted: function () {
    let self = this
    getFoodMenu(this.restaurantId).then(function (data) {
      self.foodMenu = data
      self.food = data[0]
    })
    let order = JSON.parse(getStore('order'))
    if (order) {
      if (this.restaurantId in order) {
        this.selectFood = order[this.restaurantId].foodsInfo
      }
    }
  },
  computed: mapState({
    currentRestaurantDetailInfo: state => state.shopDetail.currentRestaurantDetailInfo
  }),
  methods: {
    ...mapMutations({
      setRestaurantInfo: 'updateCurrentRestaurantDetailInfo'
    }),
    changeFoodMenu: function (msg) {
      this.food = msg.food
    },
    changeCurrentComponent: function (msg) {
      if (msg.current === 'product') {
        this.currentComponent.product = true
        this.currentComponent.evaluate = false
      } else {
        this.currentComponent.product = false
        this.currentComponent.evaluate = true
      }
    },
    addFood: function (item) {
      let order = JSON.parse(getStore('order'))
      if (order) {
        if (this.restaurantId in order) {
          order[this.restaurantId].foodsInfo.push(item)
          setStore('order', JSON.stringify(order))
        } else {
          order[this.restaurantId] = {foodsInfo: [item]}
          setStore('order', JSON.stringify(order))
        }
      } else {
        order = {}
        order[this.restaurantId] = {foodsInfo: [item]}
        setStore('order', JSON.stringify(order))
      }
      this.selectFood = order[this.restaurantId].foodsInfo
    },
    removeFood: function (item) {
      let order = JSON.parse(getStore('order'))
      if (order) {
        if (this.restaurantId in order) {
          for (let i in order[this.restaurantId].foodsInfo) {
            if (order[this.restaurantId].foodsInfo[i].item_id === item.item_id) {
              order[this.restaurantId].foodsInfo.splice(i, 1)
              break
            }
          }
          setStore('order', JSON.stringify(order))
          this.selectFood = order[this.restaurantId].foodsInfo
        }
      }
    }
  }
}
</script>
<style>
  .shop-detail-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .menu-food-container {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    padding-bottom: 4rem;
    position: relative;
  }
</style>
