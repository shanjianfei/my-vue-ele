<template>
  <div class="membership-card-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="会员中心"></head-title>
    </head-top>
    <div class="membership-card-container">
      <p>为账户<span> {{username}} </span>购买会员</p>
      <section class="vip-privilege">
        <router-link to="/membershipCard/vipDescription" class="vip-description description-item">
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
          <span @click="buy">购买</span>
        </div>
      </section>
      <router-link to="/membershipCard/exchangeMembership" class="exchange-membership description-item">
        <span>兑换会员</span>
        <section>
          <span>使用卡号卡密</span>
          <arrow-right></arrow-right>
        </section>
      </router-link>
      <router-link to="/membershipCard/purchaseRecord" class="purchase-history description-item">
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
import headTitle from '@/components/head/children/headTitle'
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
  components: {headTop, arrowLeft, arrowRight, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .membership-card-container {
    padding-top: 3rem;
    span {
      font-size: .8rem;
    }
    p {
      font-size: .75rem;
      color: #999;
    }
    img {
      .wh(2.3rem, 2.3rem);
      margin-right: .5rem;
    }
    > p {
      padding: 1.1rem .8rem;
      font-size: .8rem;
      color: #666;
    }
    .description-item {
      .flex;
      .bgw;
      padding: .8rem 1rem;
      border-bottom: 1px solid #f1f1f1;
      > section {
        .flex;
        span {
          margin-right: 0.5rem;
        }
      }
    }
    .vip-privilege {
      .bgw;
      .delivery-reduction {
        .flex(@jc: flex-start);
        padding: 1.2rem 1rem;
        section {
          > p:first-child {
            font-size: 1rem;
            color: #333;
          }
        }
      }
    }
    .open-membership {
      .bgw;
      padding: 0 1rem;
      span:last-child {
        color: #f60;
        font-weight: bold;
        font-size: 1rem;
      }
      p {
        padding: 1rem 0;
        font-size: .8rem;
        color: @black;
        border-bottom: 0.05rem solid #f1f1f1;
      }
      > div {
        padding: 1rem 0;
        border-bottom: 0.05rem solid #f1f1f1;
        .flex;
        > span:last-child {
          padding: .1rem .3rem;
          color: #f60;
          border: 1px solid #f60;
          .br(.2rem);
          font-size: .8rem;
        }
      }
    }
    .vip-description {
      > span {
        font-size: .9rem;
        color: @black;
      }
    }
  }
</style>
