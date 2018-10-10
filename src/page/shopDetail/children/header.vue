<template>
  <div class="shop-detail-header">
    <router-link :to="{path: '/'}" tag="li">商品</router-link>
    <router-link :to="{path: '/', query: {geohash, id}}">评价</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      restaurantId: ''
    }
  }
}
</script>