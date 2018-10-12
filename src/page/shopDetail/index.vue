<template>
  <div class="shop-detail-container">
    <head-top :imagePath="getImageUrl(imagePath)"></head-top>
    <section class="menu-food-container">
      <nav-left :foodMenu="foodMenu" @changeFoodMenu="changeFoodMenu"></nav-left>
      <food-list :food="food"></food-list>
    </section>
  </div>
</template>
<script>
import headTop from './children/header'
import navLeft from './children/navLeft'
import foodList from './children/foodList'
import {getFoodMenu, getImageUrl} from '@/service/getData'
export default {
  data () {
    return {
      foodMenu: [],
      food: {},
      imagePath: ''
    }
  },
  components: {headTop, navLeft, foodList},
  mounted: function () {
    let self = this
    let id = this.$route.query.id
    this.imagePath = this.$route.query.imagePath
    getFoodMenu(id).then(function (data) {
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
    padding-bottom: 5rem; 
  }
</style>
