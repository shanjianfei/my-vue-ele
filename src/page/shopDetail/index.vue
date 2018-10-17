<template>
  <div class="shop-detail-container">
    <head-top :imagePath="getImageUrl(imagePath)" @currentOption="changeCurrentComponent"></head-top>
    <section class="menu-food-container" v-show="currentComponent.product">
      <nav-left :foodMenu="foodMenu" @changeFoodMenu="changeFoodMenu"></nav-left>
      <food-list :food="food"></food-list>
      <buy-cart></buy-cart>
    </section>
    <evaluate :assessmentTags="assessmentTags" :restaurantId="$route.query.id" v-show="currentComponent.evaluate"></evaluate>
  </div>
</template>
<script>
import headTop from './children/header'
import navLeft from './children/navLeft'
import foodList from './children/foodList'
import evaluate from './children/evaluate'
import buyCart from './children/buyCart'
import {getFoodMenu, getImageUrl, getRatingsTags} from '@/service/getData'
export default {
  data () {
    return {
      foodMenu: [],
      food: {},
      imagePath: '',
      assessmentTags: [],
      currentComponent: {product: true, evaluate: false}
    }
  },
  components: {headTop, navLeft, foodList, evaluate, buyCart},
  mounted: function () {
    let self = this
    let restaurantId = this.$route.query.id
    this.imagePath = this.$route.query.imagePath
    getRatingsTags(restaurantId).then(function (data) {
      self.assessmentTags = data
      console.log(data)
    })
    getFoodMenu(restaurantId).then(function (data) {
      self.foodMenu = data
      self.food = data[0]
      console.log(self.food)
    })
  },
  methods: {
    changeFoodMenu: function (msg) {
      this.food = msg.food
      console.log(this.food)
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
    getImageUrl: function (imagePath) {
      return getImageUrl(imagePath)
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
