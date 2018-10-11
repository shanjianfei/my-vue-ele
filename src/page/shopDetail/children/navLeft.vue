<template>
  <div class="nav-left-container">
    <ul>
      <li class="food-menu-li" :class="{activeMenu: index===currentMenu}" v-for="(item, index) in foodMenu" @click="changeFoodMenu(item, index)" :key="index">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      currentMenu: 0
    }
  },
  props: ['foodMenu'],
  mounted: function () {
  },
  methods: {
    changeFoodMenu: function (item, index) {
      this.currentMenu = index
      this.$emit('changeFoodMenu', {food: item})
    }
  }
}
</script>
<style>
  .nav-left-container {
    width: 8rem;
  }

  .nav-left-container ul {
    margin-top: 0;
  }

  .activeMenu > span {
    font-weight: bold;
  }
  .nav-left-container ul {
    padding-left: 0;
  }

  .nav-left-container li {
    list-style: none;
    height: 5rem;
  }

  .food-menu-li {
    background-color: #f8f8f8;
    border-bottom: 0.1rem solid #ebebeb;
    padding-left: 1rem;
    font-size: 1.3rem;
  }

  .food-menu-li > span {
    line-height: 5rem;
  }

  .activeMenu {
    border-left: 0.3rem solid #3190e8;
    background-color: #fff;
  }
</style>
