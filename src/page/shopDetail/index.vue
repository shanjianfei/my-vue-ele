<template>
  <div>
    <head-top></head-top>
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
import {getFoodMenu} from '@/service/getData'
export default {
  data () {
    return {
      foodMenu: [],
      food: {}
    }
  },
  components: {headTop, navLeft, foodList},
  mounted: function () {
    let self = this
    let id = this.$route.query.id
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
    }
  }
}
</script>
<style>
  .menu-food-container {
    display: flex;
    flex-direction: row;
  }
</style>
