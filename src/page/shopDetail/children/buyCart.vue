<template>
  <div class="buy-cart-container">
    <section class="icon-price">
      <div class="cart-icon-container">
        <svg data-v-c8684834="" class="cart-icon">
          <use data-v-c8684834="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
        </svg>
        <span class="number-dishes">{{numberDishes}}</span>
      </div>
      <div>
        <p class="total-price">￥{{totalPrice}}</p>
        <p class="delivery-fee">配送费￥{{deliveryFee}}</p>
      </div>
    </section>
    <span class="pay" v-if="distanceOrderAmount > 0">还差￥{{distanceOrderAmount}}起送</span>
    <router-link class="pay pay-active" :to="{path: '/order', query: {restaurantId}}" v-else>去下单</router-link>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {getRestaurantDetailInfo} from '@/service/getData'
export default {
  data () {
    return {
      restaurantId: 0, // 商家的id
      deliveryFee: 0, // 配送费
      floatMinimumOrderAmount: 0, // 最低起送费
      numberDishes: 0, // 一共点了几分菜品
      totalPrice: 0 // 本家店总的点餐费用
    }
  },
  computed: {
    ...mapState({
      dishes: state => state.dishes
    }),
    // 距离最低起送费相差金额
    distanceOrderAmount: function () {
      return this.floatMinimumOrderAmount - this.totalPrice
    }
  },
  mounted: function () {
    this.restaurantId = this.$route.query.id
    let self = this
    this.getNumberDishes(this.dishes)
    getRestaurantDetailInfo(this.restaurantId)
      .then(function (data) {
        self.deliveryFee = data.float_delivery_fee
        self.floatMinimumOrderAmount = data.float_minimum_order_amount
      })
  },
  methods: {
    getNumberDishes (dishes) {
      for (let i in dishes) {
        if (i === this.restaurantId) {
          this.numberDishes = 0
          this.totalPrice = 0
          for (let j in dishes[i]) {
            console.log(dishes[i])
            this.numberDishes += dishes[i][j].numberDishes
            this.totalPrice += (dishes[i][j].specfoods[0].price * dishes[i][j].numberDishes)
          }
        }
      }
    }
  },
  watch: {
    dishes: {
      handler (newValue, oldValue) {
        this.getNumberDishes(newValue)
      },
      deep: true
    }
  }
  // props: ['deliveryFee', 'totalPrice', 'numberDishes']
}
</script>
<style>
  .buy-cart-container {
    display: flex;
    justify-content: space-between;
    flex: row;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4rem;
    background-color: #3d3d3f;
  }
  .cart-icon-container {
    background-color: #3d3d3f;
    border-radius: 2.4rem;
    position: absolute;
    bottom: .6rem;
    left: 1.2rem;
    border: 0.4rem solid #666;
  }
  .icon-price > div:nth-child(2) {
    position: absolute;
    left: 6.5rem;
  }
  .icon-price > div:nth-child(2) > p {
    color: #fff;
  }
  .icon-price > div:nth-child(2) > p:nth-child(1) {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .icon-price > div:nth-child(2) > p:nth-child(2) {
    font-size: .7rem;
  }
  .cart-icon {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem;
    text-align: center;
  }
  .number-dishes {
    position: absolute;
    top: -.6rem;
    left: 2.8rem;
    background-color: red;
    border-radius: 0.1rem;
    line-height: 1.3rem;
    height: 1.3rem;
    width: 1.3rem;
    text-align: center;
    border-radius: 1.3rem;
    color: #fff;
  }
  .pay {
    font-size: 1.15rem;
    font-weight: bold;
    width: 8rem;
    line-height: 4rem;
    background-color: #535356;
    color: #fff;
    text-align: center;
  }

  .pay-active {
    background-color: #4cd964;
  }
</style>
