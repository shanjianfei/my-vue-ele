<template>
  <div class="shop-detail-header-container">
    <router-link :to="{path: '/'}" tag="li">
      <span class="head-top-title">商品</span>
    </router-link>
    <router-link :to="{path: '/', query: {geohash, id}}" tag="li">
      <span class="head-top-title">评价</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      restaurantId: ''
    }
  },
  props: ['geohash', 'id']
}
</script>
<style>
  .shop-detail-header-container>li {
    list-style: none;
    width: 100%;
    height: 3rem;
    text-align: center;
  }

  .head-top-title {
    font-size: 1.3rem;
    line-height: 3rem;
    padding: 0.5rem;
    color: #3190e8;
    border-bottom: 0.3rem solid #3190e8;
  }

  .shop-detail-header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 1rem;
    border: 0.1rem solid #ebebeb;
    background-color: #fff;
  }
</style>
