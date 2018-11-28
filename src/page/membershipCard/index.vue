<template>
  <div class="membership-card-page">
    <head-top>
      <arrow-left slot="head-goback"></arrow-left>
      <span class="point-title" slot="point-title">会员中心</span>
    </head-top>
    <div class="membership-card-container">
      <p>为账户<span>{{username}}</span>购买会员</p>
      <section class="vip-privilege">
        <router-link to="/membershipCard/vipDescription" class="vip-description">
          <span>会员特权</span>
          <section>
            <span>会员说明</span>
            <arrow-right></arrow-right>
          </section>
        </router-link>
        <section class="delivery-reduction">
          <img src="@/images/sheng.jpeg">
          <section>
            <p>减免配送费</p>
            <p>每月减免30单，每日可减免3单，每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </section>
        </section>
        <section class="delivery-reduction">
          <img src="@/images/jifen.jpeg">
          <section>
            <p>减免配送费</p>
            <p>每月减免30单，每日可减免3单，每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </section>
        </section>
      </section>
      <section class="open-membership">
        <p>开通会员</p>
        <div>
          <span>1个月<span>¥20</span></span>
          <div @click="buy">购买</div>
        </div>
      </section>
      <router-link to="/membershipCard/exchangeMembership" class="exchange-membership">
        <span>兑换会员</span>
        <section>
          <span>使用卡号卡密</span>
          <arrow-right></arrow-right>
        </section>
      </router-link>
      <router-link to="/membershipCard/purchaseRecord" class="purchase-history">
        <span>购买记录</span>
        <section>
          <span>开发票</span>
          <arrow-right></arrow-right>
        </section>
      </router-link>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      username: ''
    }
  },
  mounted: function () {
    this.username = JSON.parse(getStore('user')).username
  },
  methods: {
    buy: function () {
      this.$router.push('/membershipCard/payOnline')
    }
  },
  components: {headTop, arrowLeft, arrowRight}
}
</script>
<style>
.membership-card-container {
  padding-top: 3rem;
}
.membership-card-container > p:first-child {
  padding: 1.1rem .8rem;
}
.vip-privilege, .open-membership {
  background-color: #fff;
  padding: 0 1rem;
}
.vip-description, .exchange-membership, .purchase-history {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 3rem;
  border-bottom: 0.05rem solid #f1f1f1;
}
.vip-description > span:first-child {
  font-size: 1.2rem;
}
.vip-description > section, .exchange-membership > section, .purchase-history > section {
  display: flex;
  align-items: center;
}
.vip-description > section > span, .exchange-membership > section > span, .purchase-history > section > span {
  margin-right: 0.5rem;
}
.delivery-reduction {
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  border-bottom: 0.05rem solid #f1f1f1;
}
.delivery-reduction > img {
  width: 3rem;
  height: 3rem;
  margin-right: .5rem;
}
.delivery-reduction > section > p:first-child {
  font-size: 1.3rem;
  color: #333;
}
.open-membership > p, .open-membership > div {
  border-bottom: 0.05rem solid #f1f1f1;
  line-height: 3rem;
}
.open-membership > div {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.open-membership > div > span > span {
  color: #f60;
  font-weight: bold;
}
.open-membership > div > div {
  color: #f60;
  border: 0.05rem solid #f60;
  height: 2rem;
  line-height: 2rem;
  border-radius: 0.5rem;
  width: 4rem;
  text-align: center;
}
.exchange-membership, .purchase-history {
  background-color: #fff;
  margin-top: 1rem;
  padding: 0 1rem;
}
.membership-card-container > p > span {
  font-weight: bold;
  color: #000;
}

</style>
