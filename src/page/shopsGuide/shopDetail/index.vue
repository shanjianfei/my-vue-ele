<template>
  <div class="shop-detail-container">
    <head-top @currentOption="changeCurrentComponent" :restaurantId="restaurantId"></head-top>
    <section class="switch-bar">
      <horizontal-switch-bar :items="switchBar"></horizontal-switch-bar>
      <router-view></router-view>
    </section>
    <!-- <buy-cart :selectFood="selectFood" :restaurantId="restaurantId"></buy-cart> -->
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import headTop from './children/header'
import buyCart from './children/buyCart'
import horizontalSwitchBar from '@/components/common/horizontalSwitchBar'
import {getFoodMenu} from '@/service/getData'
import {setStore, getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      restaurantId: null,
      foodMenu: [],
      food: {}, // 所选餐厅的所有食物
      selectFood: [], // 加入购物车的食物
      currentComponent: {product: true, evaluate: false}, // 商品和评价标签切换
      switchBar: null
    }
  },
  // components: {headTop, navLeft, foodList, evaluate, buyCart},
  components: {headTop, buyCart, horizontalSwitchBar},
  created: function () {
    this.restaurantId = this.$route.query.id
    this.switchBar = [
      {
        content: '商品',
        link: {path: '/shopsGuide/shopDetail/food', query: {id: this.restaurantId}}
      },
      {
        content: '评价',
        link: {path: '/shopsGuide/shopDetail/evaluate', query: {id: this.restaurantId}}
      }
    ]
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
  .switch-bar {
    position: relative;
    height: 100%;
  }
</style>
