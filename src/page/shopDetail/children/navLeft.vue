<template>
  <div class="nav-left-container">
    <ul>
      <li class="food-menu-li" :class="{activeMenu: index===currentMenu}" v-for="(item, index) in foodMenu" @click="changeFoodMenu(item, index)" :key="index">
        <span>{{item.name}}</span>
        <span class="number-navleft" v-if="getNumber(item.id) > 0">{{getNumber(item.id)}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import {getStore} from '@/commonApi/localStorage'
export default {
  data: function () {
    return {
      currentMenu: 0,
    }
  },
  props: ['selectFood', 'foodMenu'],
  methods: {
    changeFoodMenu: function (item, index) {
      this.currentMenu = index
      this.$emit('changeFoodMenu', {food: item})
    },
    getNumber: function (id) {
      let count = 0
      for (let i = 0; i < this.selectFood.length; i++) {
        if (this.selectFood[i].category_id === id) {
          count++
        }
      }
      return count
    }
  }
}
</script>
<style>
  .nav-left-container {
    width: 15rem;
    overflow: auto;
    height: 100%;
  }
  .nav-left-container > ul {
    margin-top: 0;
    padding-left: 0;
  }
  .food-menu-li {
    background-color: #f8f8f8;
    border-bottom: 0.1rem solid #ebebeb;
    padding: 1.7rem 1rem;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    position: relative;
  }
  .food-menu-li span:first-child{
    word-break: normal;
    width: auto;
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
  }
  .activeMenu {
    border-left: 0.3rem solid #3190e8;
    background-color: #fff;
  }
  .activeMenu > span:first-child {
    font-weight: bold;
  }
  .number-navleft {
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
</style>
