<template>
  <div class="profile-container">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">我的</span>
    </head-top>

    <div class="user-info">
      <section>
        <svg class="head-shot">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
        <section>
          <router-link to="/accountInfo" tag="p" v-if="username">{{username}}</router-link>
          <router-link to="/login" tag="p" v-else>注册/登录</router-link>
          <p v-if="mobile">手机号: {{mobile}}</p>
          <p v-else>暂无绑定手机号</p>
        </section>
      </section>
      <arrow-right></arrow-right>
    </div>

    <div class="profile-item">
      <section class="profile-info">
        <router-link class="amount" to="/balance">
          <p>
            <span>{{balance}}</span>元
          </p>
          <p>我的余额</p>
        </router-link>
        <router-link class="coupon" to="/coupon">
          <p>
            <span>{{coupon}}</span>个
          </p>
          <p>我的优惠</p>
        </router-link>
        <router-link class="points" to="/points">
          <p>
            <span>{{points}}</span>分
          </p>
          <p>我的积分</p>
        </router-link>
      </section>
      <section>
        <router-link class="order" to="/order" tag="p">
          <section>
            <svg class="icon-left" fill="#4aa5f0">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
            </svg>
            <span>我的订单</span>
          </section>
          <arrow-right></arrow-right>
        </router-link>
        <a class="points-mall" href="https://activity.m.duiba.com.cn/">
          <section>
            <svg class="icon-left" fill="#fc7b53">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
            <span>积分商城</span>
          </section>
          <arrow-right></arrow-right>
        </a>
        <router-link class="membership-card" to="/membershipCard" tag="p">
          <section>
            <svg class="icon-left" fill="#ffc636">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
            </svg>
            <span>饿了吗会员卡</span>
          </section>
          <arrow-right></arrow-right>
        </router-link>
      </section>
      <section>
        <router-link class="service-center" to="/serviceCenter" tag="p">
          <section>
            <svg class="icon-left" fill="#4aa5f0">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
            </svg>
            <span>服务中心</span>
          </section>
          <arrow-right></arrow-right>
        </router-link>
        <router-link class="application-download" to="/download" tag="p">
          <section>
            <svg class="icon-left" fill="#3cabff">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
            </svg>
            <span>下载饿了么app</span>
          </section>
          <arrow-right></arrow-right>
        </router-link>
      </section>
    </div>
    <footer-guide></footer-guide>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowRight from '@/components/common/arrowRight'
import footerGuide from '@/components/footer/footer'
import {getUserInfo, isLogin} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      balance: 0,
      coupon: 0,
      points: 0,
      mobile: '',
      username: ''
    }
  },
  mounted: function () {
    let self = this
    if (isLogin) {
      let userId = getStore('user_id')
      getUserInfo()
        .then(function (data) {
          if (!('status' in data)) {
            self.balance = data.balance
            self.coupon = data.gift_amount
            self.points = data.point
            self.mobile = data.mobile
            self.username = data.username
          }
        })
    }
  },
  components: {headTop, arrowRight, footerGuide}
}
</script>
<style>
  .head-goback {
    left: 0.4rem;
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
    font-size: 1.7rem;
    font-weight: bold;
  }
  .header {
    display: fixed;
    top: 0;
  }
  .user-info {
    /*margin-top: 5rem;*/
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #3190e8;
    padding: 0 1.5rem;
    padding-top: 5rem;
    padding-bottom: 1.5rem;
  }
  .user-info > section:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .user-info > section:nth-child(1) > section > p:nth-child(1) {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .user-info > section:nth-child(1) > section > p:nth-child(2) {
    color: #fff;
    font-size: 1.2rem;
  }
  .head-shot {
    width: 5rem;
    height: 5rem;
    margin-right: 1rem;
    background-color: #fff;
    border-radius: 50%;
  }
  .profile-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
  }
  .profile-info > a {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-right: 0.02rem solid #f1f1f1;
  }
  .order, .points-mall, .membership-card, .service-center, .application-download {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: #fff;
    border-bottom: 0.05rem solid #f1f1f1;
  }
  .profile-info > a > p {
    font-size: 1rem;
  }
  .profile-item > section:nth-child(3),  .profile-item > section:nth-child(2){
    margin-top: 1rem;
  }
  .amount > p:nth-child(1) > span {
    color: #f90;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .coupon > p:nth-child(1) > span {
    color: #ff5f3e;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .points > p:nth-child(1) > span {
    color: #6ac20b;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .icon-left {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
</style>
