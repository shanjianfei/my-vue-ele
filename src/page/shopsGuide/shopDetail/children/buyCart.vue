<template>
  <div class="buy-cart-container">
    <section class="icon-price">
      <div class="cart-icon-container" :class="{'cart-icon-container-active': getCount > 0}">
        <svg class="cart-icon">
          <use xlink:href="#cart-icon"></use>
        </svg>
        <span class="total-count" v-if="getCount > 0">{{getCount}}</span>
      </div>
      <div>
        <p class="total-price">￥{{totalPrice}}</p>
        <p class="delivery-fee">配送费￥{{deliveryFee}}</p>
      </div>
    </section>
    <div class="pay" v-if="distanceOrderAmount > 0">还差￥{{distanceOrderAmount}}起送</div>
    <router-link class="pay pay-active" :to="{path: '/confirmOrder', query: {restaurantId}}" v-else>去下单</router-link>
  </div>
</template>
<script>
import {getRestaurantDetailInfo} from '@/service/getData'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      deliveryFee: 0, // 配送费
      floatMinimumOrderAmount: 0 // 最低起送费
    }
  },
  props: ['restaurantId'],
  computed: {
    ...mapState({
      selectFood: state => state.shopDetail.selectFood // 加入购物车的食物
    }),
    // 距离最低起送费相差金额
    distanceOrderAmount: function () {
      return this.floatMinimumOrderAmount - this.totalPrice
    },
    getCount: function () { // 一共点了几分菜品
      let count = 0
      for (let i in this.selectFood) {
        count += this.selectFood[i].quantity
      }
      return count
    },
    totalPrice: { // 本家店总的点餐费用
      get: function () {
        let totalPrice = 0
        for (let i in this.selectFood) {
          totalPrice += this.selectFood[i].specfoods[0].price * this.selectFood[i].quantity
        }
        return totalPrice
      }
    }
  },
  mounted: function () {
    let self = this
    getRestaurantDetailInfo(this.restaurantId)
      .then(function (data) {
        self.deliveryFee = data.float_delivery_fee
        self.floatMinimumOrderAmount = data.float_minimum_order_amount
      })
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .buy-cart-container {
    .flex;
    .wh(100%, 4.5rem);
    .bgc(#3d3d3f);
    .icon-price {
      flex: 7;
      > div:nth-child(2) {
        margin-left: 5rem;
        .flex(@fd: column; @ai: flex-start;);
        height: 100%;
        .total-price {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .delivery-fee {
          font-size: .5rem;
        }
        p {
          color: #fff;
        }
      }
      .cart-icon-container {
        .bgc(#3d3d3f);
        .br(0.5);
        .absolute;
        .wh(2.8rem, 2.8rem);
        .flex(@jc: center);
        bottom: .6rem;
        left: 1.2rem;
        border: 0.25rem solid #444;
        .cart-icon {
          .wh(1.5rem, 1.5rem);
        }
        .total-count {
          .absolute;
          top: -.6rem;
          left: 2rem;
          .bgc(red);
          line-height: 1rem;
          width: 1rem;
          text-align: center;
          .br(0.5);
          color: #fff;
          font-size: .7rem;
        }
      }
      .cart-icon-container-active {
        .bgc(#3190e8);
      }
    }
    .pay {
      font-size: 1rem;
      font-weight: bold;
      flex: 4;
      height: 100%;
      .flex(@jc: center);
      .bgc(#535356);
      color: #fff;
      text-align: center;
    }
    .pay-active {
      .bgc(#4cd964);
    }
  }
</style>
