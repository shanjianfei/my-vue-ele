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
    <span class="pay">还差￥20起送</span>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      deliveryFee: 0,
      totalPrice: 0
    }
  },
  computed: mapState([
    'numberDishes'
  ])
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
</style>
