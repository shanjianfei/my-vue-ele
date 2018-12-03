<template>
  <div class="order-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="订单列表" ></head-title>
    </head-top>
    <ul class="order-container">
      <li v-for="(item, index) in orders" :key="index" class="order-li">
        <img :src="getImageUrl(item.restaurant_image_url)">
        <section>
          <router-link to="">
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
          <section class="order-again">
            <div>再来一单</div>
          </section>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
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
  components: {headTop, arrowLeft, headTitle, arrowRight}
}
</script>
<style>
  .order-container {
    padding-top: 3rem;
  }
  .order-li {
    padding: 1rem 1rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .order-li > img {
    width: 3.5rem;
    height: 3.5rem;
  }
  .order-li > section {
    width: 100%;
    padding-left: 1rem;
  }
  .info-top {
    padding-bottom: 1rem;
    border-bottom: .01rem solid #f1f1f1;
  }
  .info-top > section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .info-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: .01rem solid #f1f1f1;
  }
  .info-bottom > span:last-child {
    color: #f60;
    font-weight: bold;
  }
  .restaurant-name {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .restaurant-name > span {
    font-size: 1.2rem;
    color: #000;
  }
  .created-time {
    font-size: .8rem;
    color: #999;
  }
  .order-again {
    display: flex;
    justify-content: flex-end;
    margin-top: .5rem;
  }
  .order-again > div {
    line-height: 1.6rem;
    padding: 0 .3rem;
    border: .01rem solid #3190e8;
    color: #3190e8;
    border-radius: .2rem;
  }
</style>
