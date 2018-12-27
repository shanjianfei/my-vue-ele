<template>
  <div class="order-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="订单列表" ></head-title>
    </head-top>
    <ul class="order-container">
      <li v-for="(item, index) in orders" :key="index">
        <img :src="getImageUrl(item.restaurant_image_url)">
        <section>
          <router-link :to="{path: '/order/orderDetail', query: {orderId: item.id}}">
            <section class="info-top">
              <section>
                <section class="restaurant-name">
                  <span>{{item.restaurant_name}}</span>
                  <arrow-right></arrow-right>
                </section>
                <span class="status-title">{{item.status_bar.title}}</span>
              </section>
              <p class="created-time">{{item.formatted_created_at}}</p>
            </section>
            <section class="info-bottom">
              <span>
                {{item.basket.group[0][0].name}}
                <span>等{{item.basket.group[0].length}}件商品</span>
              </span>
              <span>￥{{item.total_amount}}</span>
            </section>
          </router-link>
          <router-link class="order-again" :to="{path: '/shopsGuide/shopDetail', query: {id: item.restaurant_id}}">
            <span>再来一单</span>
          </router-link>
        </section>
      </li>
    </ul>
    <footer-guide></footer-guide>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
import footerGuide from '@/components/footer/footer'
import {getOrders, getImageUrl} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      orders: null
    }
  },
  mounted: function () {
    let self = this
    let userId = getStore('user_id')
    getOrders(userId, 10, 0)
      .then(function (data) {
        self.orders = data
      })
  },
  methods: {
    getImageUrl: function (img) {
      return getImageUrl(img)
    }
  },
  components: {headTop, arrowLeft, headTitle, arrowRight, footerGuide}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .order-container {
    padding-top: 3rem;
    padding-bottom: 3.5rem;
    li {
      .flex(@jc: flex-start; @ai: flex-start);
      padding: 1rem;
      margin-bottom: .5rem;
      > section {
        width: 100%;
      }
    }
    img {
      .wh(3rem, 3rem);
      margin-right: .5rem;
    }
    .info-top {
      padding-bottom: 1rem;
      border-bottom: 1px solid #f1f1f1;
      > section {
        .flex;
      }
    }
    .info-bottom {
      .flex;
      padding: 1rem 0;
      border-bottom: 1px solid #f1f1f1;
      span {
        font-size: .85rem;
      }
      > span:last-child {
        color: #f60;
        font-weight: bold;
      }
    }
    .restaurant-name {
      .flex;
      > span {
        font-size: 1rem;
        color: @black;
      }
    }
    .status-title {
      font-size: .8rem;
      color: @black;
    }
    .created-time {
      font-size: .8rem;
      color: #999;
    }
    .order-again {
      display: flex;
      justify-content: flex-end;
      margin-top: .5rem;
      span {
        .br(.2rem);
        padding: 0 .3rem;
        font-size: .75rem;
        border: 1px solid @blue;
        color: @blue;
      }
    }
  }
</style>
