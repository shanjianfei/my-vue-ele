<template>
  <div class="order-page-container">
    <head-top class="header">
      <span slot="login" class="head-login">注册|登录</span>
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">确认订单</span>
    </head-top>
    <section class="order-container" v-if="checkData">
      <router-link to="/chooseDeliveryAddress" class="add-delivery-address-container">
        <section>
          <svg data-v-4e0d5034="" class="location_icon">
            <use data-v-4e0d5034="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <span>请添加一个收货地址</span>
        </section>
        <svg class="arrow_right">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <section class="delivery-time-container">
        <h2>送达时间</h2>
        <section>
          <span>尽快送达 | 预计{{checkData.delivery_reach_time}}</span>
          <span class="delivery-mode" :style="{'background-color': '#' + shopInfo.delivery_mode.color}">{{shopInfo.delivery_mode.text}}</span>
        </section>
      </section>
      <section class="pay-mode-container">
        <router-link :to="'/city/' + restaurantId" class="pay-mode">
          <span>支付方式</span>
          <section>
            <span>在线支付</span>
            <svg class="arrow_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </section>
        </router-link>
        <section class="red-package-container">
          <span>红包</span>
          <span>暂时只在饿了么APP中使用</span>
        </section>
      </section>
      <section class="food-list-container">
        <header>
          <img class="shop-icon" :src="getImageUrl(shopInfo.image_path)">
          <span>{{shopInfo.name}}</span>
        </header>
        <ul class="food-list-ul">
          <li class="food-list-li" v-for="item in dishes[shopInfo.id]" :key="item.restaurant_id">
            <span class="food-name">{{item.name}}</span>
            <section class="num-price-container">
              <span>x {{item.numberDishes}}</span>
              <span>￥{{item.specfoods[0].price}}</span>
            </section>
          </li>
          <li class="food-list-li" v-for="(item, index) in checkData.cart.extra" :key="index + 'food'">
            <span>{{item.name}}</span>
            <span>￥{{item.price}}</span>
          </li>
          <li class="food-list-li">
            <span>配送费</span>
            <span>￥{{checkData.cart.deliver_amount}}</span>
          </li>
        </ul>
      </section>
      <section class="order-total-price-container">
        <p>
          <span>订单 ￥{{checkData.cart.total}}</span>
          <span>待支付</span>
        </p>
        <p>￥{{checkData.cart.total}}</p>
      </section>
      <section class="order-content-footer">
        <section class="order-remarks">
          <span>订单备注</span>
          <span class="order-remarks-right">
            <span>口味、偏好等</span>
            <span>
              <svg class="arrow_right">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </span>
        </section>
        <section class="order-invoice-title">
          <span>发票抬头</span>
          <span class="order-invoice-title-right">
            <span>不需要开发票</span>
            <span>
              <svg class="arrow_right">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </span>
        </section>
      </section>
    </section>
    <div class="order-footer" v-if="checkData">
      <span>待支付￥{{checkData.cart.total}}</span>
      <router-link to="/a">确认下单</router-link>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import headTop from '@/components/head/head'
import {getImageUrl, addToCart} from '@/service/getData'
export default {
  data () {
    return {
      restaurantId: null,
      checkData: null
    }
  },
  computed: {
    ...mapState({
      shopInfo: state => state.currentRestaurantDetailInfo,
      dishes: state => state.dishes
    })
  },
  mounted: function () {
    let self = this
    let restaurantId = this.shopInfo.id
    let geohash = this.shopInfo.latitude + ',' + this.shopInfo.longitude
    let entities = []
    if (restaurantId in this.dishes) {
      for (let i in this.dishes[restaurantId]) {
        let foodInfo = {attrs: [], extra: {}}
        foodInfo.id = this.dishes[restaurantId][i].item_id
        foodInfo.name = this.dishes[restaurantId][i].name
        foodInfo.packing_fee = this.dishes[restaurantId][i].specfoods[0].packing_fee
        foodInfo.price = this.dishes[restaurantId][i].specfoods[0].price
        foodInfo.quantity = this.dishes[restaurantId][i].numberDishes
        foodInfo.sku_id = this.dishes[restaurantId][i].specfoods[0].sku_id
        foodInfo.specs = this.dishes[restaurantId][i].specfoods[0].specs
        foodInfo.stock = this.dishes[restaurantId][i].specfoods[0].stock
        entities.push([foodInfo])
      }
    }
    addToCart(restaurantId, geohash, entities)
      .then(function (data) {
        self.checkData = data
      })
  },
  methods: {
    getImageUrl: function (imagePath) {
      return getImageUrl(imagePath)
    }
  },
  components: {headTop}
}
</script>
<style>
  .head-login {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    right: 0.55rem;
    font-size: 0.8rem;
  }
  .head-goback {
    left: 0.4rem;
    width: 1.2rem;
    height: 1.5rem;
    line-height: 2.2rem;
    margin-left: .4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.5rem;
  }
  .order-container {
    margin-top: 2.8rem;
    height: 100%;
    margin-bottom: 5rem;
  }
  .add-delivery-address-container, .pay-mode, .red-package-container {
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: 1.5rem;
    padding: 1rem;
  }
  .arrow_right, .location_icon {
    width: 1rem;
    height: 1rem;
  }

  .delivery-time-container {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin-top: 0.5rem;
    border-left: 0.3rem solid #3190e8;
    height: 7rem;
  }

  .delivery-time-container > h2 {
    margin-left: 2rem;
    line-height: 7rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  .delivery-time-container > section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  .delivery-time-container > section > span:nth-child(1) {
    font-size: 1.2rem;
    margin-right: 0.5rem;
    color: #3190e8;
  }

  .delivery-mode {
    margin-top: 0.3rem;
    padding: 0.2rem;
    border-radius: 0.5rem;
    color: #fff;
    margin-right: 0.5rem;
    font-size: 1rem;
  }
  .red-package-container {
    border-top: 0.1rem solid #f1f1f1;
  }

  .pay-mode > section > span {
    color: #aaa;
    font-size: 1.3rem;
  }

  .arrow_right {
    fill: #aaa;
  }

  .red-package-container > span {
    color: #aaa;
    font-size: 1.3rem;
  }

  .shop-icon {
    width: 3rem;
    height: 3rem;
  }

  .food-list-container {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-top: 1rem;
  }

  .food-list-container > header {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 5rem;
    border-bottom: 0.1rem solid #f1f1f1;
    margin-left: 1rem;
  }

  .food-list-container > header > span {
    font-size: 1.8rem;
    color: #000;
    margin-left: 1rem;
  }

  .food-list-ul {
    margin-left: 1rem;
  }

  .food-list-li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .food-list-li span {
    font-size: 1.5rem;
    color: #aaa;
  }

  .food-list-li > span:nth-child(2) {
    margin-right: 1rem;
  }

  .num-price-container {
    margin-right: 1rem;
  }

  .num-price-container > span:nth-child(1) {
    margin-right: 2rem;
    color: #f60;
    font-family: Helvetica Neue,Tahoma,Arial;
  }

  .order-total-price-container {
    margin-top: 0.1rem;
    background-color: #fff;
  }

  .order-total-price-container > p > span:nth-child(2) {
    color: #f60;
  }

  .order-total-price-container > p:nth-child(2) {
    color: #f60;
    text-align: right;
  }

  .order-total-price-container > p:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .order-total-price-container > p {
    padding: 1rem;
    font-size: 1.3rem;
  }

  .order-content-footer {
    margin-top: 1rem;
    background-color: #fff;
  }

  .order-remarks, .order-invoice-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
  }

  .order-remarks > span, .order-invoice-title > span {
    font-size: 1.3rem;
  }

  .order-remarks-right > span, .order-invoice-title-right > span {
    font-size: 1rem;
    color: #aaa;
  }

  .order-footer {
    position: fixed;
    bottom: 0;
    height: 4rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-footer > span, .order-footer > a {
    font-size: 1.3rem;
    padding: 1rem;
    color: #fff;
    background-color: #3d3d3f;
    flex: 7;
  }

  .order-footer > a {
    background-color: #4cd964;
    font-size: 1.3rem;
    padding: 1rem;
    color: #fff;
    flex: 3;
    text-align: center;
  }

</style>
