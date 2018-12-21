<template>
  <div class="order-page">
    <head-top class="header">
      <router-link class="login" slot="head-right" to="/login" v-if="!isLogin">
        注册|登录
      </router-link>
      <router-link class="logout" slot="head-right" to="/profile" v-else>
        <svg class="user-avatar">
          <use xlink:href="#user" stroke="#fff" fill="#fff"></use>
        </svg>
      </router-link>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="确认订单"></head-title>
    </head-top>
    <section class="order-container" v-if="checkData">
      <router-link to="/chooseDeliveryAddress" class="add-delivery-address-container">
        <section>
          <svg class="location_icon">
            <use xlink:href="#location"></use>
          </svg>
          <section v-if="deliveryAddress">
            <p>
              <span>{{deliveryAddress.name}}</span>
              <span>先生</span>
              <span>{{deliveryAddress.phone}}</span>
            </p>
            <p>
              <span>{{deliveryAddress.tag}}</span>
              <span>{{deliveryAddress.address}}</span>
            </p>
          </section>
          <span v-else>请添加一个收货地址</span>
        </section>
        <svg class="arrow_right">
            <use xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <section class="delivery-time-container">
        <h5>送达时间</h5>
        <section>
          <span>尽快送达 | 预计{{checkData.delivery_reach_time}}</span>
          <span class="delivery-mode" :style="{'background-color': '#' + shopInfo.delivery_mode.color}">{{shopInfo.delivery_mode.text}}</span>
        </section>
      </section>
      <section class="pay-mode-container">
        <section class="pay-mode">
          <span>支付方式</span>
          <section @click="showPayWay">
            <span>在线支付</span>
            <svg class="arrow_right">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </section>
        </section>
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
        <ul class="food-list">
          <li v-for="(item, index) in selectFood" :key="index">
            <span>{{item.name}}</span>
            <section class="num-price-container">
              <span>x {{item.quantity}}</span>
              <span>￥{{item.specfoods[0].price}}</span>
            </section>
          </li>
          <li v-for="(item, index) in checkData.cart.extra" :key="index + 'food'">
            <span>{{item.name}}</span>
            <span>￥{{item.price}}</span>
          </li>
          <li>
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
          <router-link :to="{path: '/confirmOrder/orderComments', query: checkData.cart.id}" tag="span">订单备注</router-link>
          <span class="order-remarks-right">
            <span>口味、偏好等</span>
            <span>
              <svg class="arrow_right">
                <use xlink:href="#arrow-right"></use>
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
                <use xlink:href="#arrow-right"></use>
              </svg>
            </span>
          </span>
        </section>
      </section>
    </section>
    <div class="order-footer" v-if="checkData">
      <span>待支付￥{{checkData.cart.total}}</span>
      <router-link to="/membershipCard/payOnline">确认下单</router-link>
    </div>
    <div class="cover" v-show="coverShow"></div>
    <div class="pay-way" v-if="checkData && paywayShow">
      <p>支付方式</p>
      <ul>
        <li class="pay-way-li" v-for="(item, index) in checkData.payments" @click="choosePayWay(item)" :key="index">
          <span :class="{'unsupport-pay-way': !item.is_online_payment}">{{item.name}}<span v-if="!item.is_online_payment">（{{item.disabled_reason}}）</span></span>
          <svg>
            <use :class="item.select_state === 1 ? 'choosed' : 'select_icon'" xlink:href="#select"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import {getImageUrl, addToCart, getDeliveryAddress, getRestaurantDetailInfo, isLogin} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
import arrowLeft from '@/components/common/arrowLeft'
import headTitle from '@/components/head/children/headTitle'
export default {
  data () {
    return {
      checkData: null,
      deliveryAddress: null,
      payayId: 1,
      paywayShow: false,
      shopInfo: {},
      order: {},
      selectFood: [],
      isLogin: false,
      coverShow: false
    }
  },
  mounted: function () {
    this.isLogin = isLogin()
    let self = this
    let restaurantId = this.$route.query.restaurantId + ''
    let entities = []
    let userId = getStore('user_id')
    getRestaurantDetailInfo(restaurantId)
      .then(function (data) {
        self.shopInfo = data
      })
    getDeliveryAddress(userId)
      .then(function (data) {
        let deliveryAddressChoosedId = getStore('deliveryAddressChoosedId')
        for (let i = 0; i < data.length; i++) {
          if (parseInt(deliveryAddressChoosedId) === data[i].id) {
            self.deliveryAddress = data[i]
          }
        }
      })
    this.order = JSON.parse(getStore('order'))
    if (restaurantId in this.order) {
      this.selectFood = this.order[restaurantId].foodsInfo
      for (let i in this.selectFood) {
        let foodInfo = {attrs: [], extra: {}}
        foodInfo.id = this.selectFood[i].item_id
        foodInfo.name = this.selectFood[i].name
        foodInfo.packing_fee = this.selectFood[i].specfoods[0].packing_fee
        foodInfo.price = this.selectFood[i].specfoods[0].price
        foodInfo.quantity = this.selectFood[i].quantity
        foodInfo.sku_id = this.selectFood[i].specfoods[0].sku_id
        foodInfo.specs = this.selectFood[i].specfoods[0].specs
        foodInfo.stock = this.selectFood[i].specfoods[0].stock
        entities.push([foodInfo])
      }
    }
    let geohash = getStore('geohash')
    addToCart(restaurantId, geohash, entities)
      .then(function (data) {
        if (!('status' in data && data.status === 0)) {
          console.log(data.cart.extra)
          self.checkData = data
        }
      })
  },
  methods: {
    getImageUrl: function (imagePath) {
      return getImageUrl(imagePath)
    },
    fillOrderNotes: function () {

    },
    showPayWay: function () {
      this.paywayShow = true
      this.coverShow = true
    },
    choosePayWay: function (payway) {
      if (payway.is_online_payment) {
        this.payayId = payway.id
        this.paywayShow = false
        this.coverShow = false
      }
    }
  },
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  @gray: #aaa;
  .item {
    .flex;
    .bgw;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }
  .login {
    .head-right;
  }
  .logout {
    .head-right;
    .user-avatar {
      .wh(1.2rem, 1.2rem);
    }
  }
  .arrow_right {
    .wh(1rem, 1rem);
    fill: @gray;
  }
  .order-container {
    padding-top: 2.8rem;
    padding-bottom: 4rem;
    height: 100%;
    .add-delivery-address-container {
      .item;
      > section {
        .flex;
        .location_icon {
          .wh(1rem, 1rem);
        }
        span {
          font-size: 1rem;
        }
        section {
          margin-left: .5rem;
          p:first-child {
            span:first-child {
              font-weight: bold;
              color: @black;
            }
          }
          p:last-child {
            span:first-child {
              .bgc(#4cd964);
              .br(0.15);
              color: @white;
              padding: .1rem .2rem;
            }
            > span {
              font-size: .7rem;
            }
          }
        }
      }
    }
    .delivery-time-container {
      .flex;
      .bgw;
      padding: 0 1rem;
      margin-top: 0.5rem;
      border-left: 0.3rem solid @blue;
      > section {
        .flex(@fd: column; @ai: flex-end);
        > span:first-child {
          font-size: 1rem;
          color: @blue;
        }
        .delivery-mode {
          .br(0.05);
          padding: 0.1rem;
          margin-top: 0.3rem;
          color: @white;
          font-size: .7rem;
        }
      }
    }
    .pay-mode-container {
      .pay-mode {
        .item;
        > span {
          font-size: .9rem;
        }
        > section {
          > span {
            color: @gray;
          }
        }
      }
      .red-package-container {
        .item;
        border-top: 0.1rem solid #f1f1f1;
        > span {
          color: @gray;
        }
      }
    }
    .food-list-container {
      .flex(@fd: column; @ai: flex-start);
      .bgw;
      margin-top: 1rem;
      padding: 1rem;
      > header {
        width: 100%;
        .flex(@jc: flex-start);
        padding: 1rem 0;
        border-bottom: 1px solid #f1f1f1;
        .shop-icon {
          .wh(1.8rem, 1.8rem);
        }
        > span {
          font-size: 1rem;
          color: @black;
          margin-left: .5rem;
        }
      }
      .food-list {
        width: 100%;
        li {
          .flex;
          padding: .5rem 0;
          span {
            color: @gray;
          }
          .num-price-container {
            > span:first-child {
              margin-right: .8rem;
              color: #f60;
            }
          }
        }
      }
    }
    .order-total-price-container {
      margin-top: 2px;
      padding: 1rem;
      .bgw;
      > p:first-child {
        .flex;
        > span:nth-child(2) {
          color: #f60;
        }
      }
      > p:last-child {
        margin-top: .5rem;
        color: #f60;
        text-align: right;
      }
    }
    .order-content-footer {
      margin-top: 1rem;
      padding: 1rem;
      .bgw;
      .order-remarks, .order-invoice-title {
        .flex;
        padding: .5rem 0;
        .order-remarks-right > span, .order-invoice-title-right > span {
          color: @gray;
        }
      }
    }
  }
  .order-footer {
    .fixed;
    .flex;
    .wh(100%, 3rem);
    bottom: 0;
    span, a {
      .bgc(#3d3d3f);
      padding: .8rem;
      font-size: 1.1rem;
      color: #fff;
      flex: 7;
    }
    a {
      .bgc(#4cd964);
      text-align: center;
      flex: 3;
    }
  }
  .cover {
    .fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    .bgc(@black);
    opacity: .3;
  }
  .pay-way {
    .fixed;
    .bgw;
    bottom: 0;
    left: 0;
    right: 0;
    height: 15rem;
    z-index: 110;
    > p {
      .bgc(#fafafa);
      color: #333;
      padding: .8rem 0;
      font-size: 1rem;
      text-align: center;
    }
    .pay-way-li {
      .flex;
      padding: 1rem .5rem;
      .unsupport-pay-way {
        color: #ccc;
        span {
          color: #ccc;
        }
      }
      > svg {
        .wh(1rem, 1rem);
      }
      .select_icon {
        fill: #f1f1f1;
      }
      .choosed {
        fill: #4cd964;
      }
    }
  }
</style>
