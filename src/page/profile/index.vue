<template>
  <div class="profile-page">
    <head-top>
      <svg class="goback" slot="head-goback" @click="$router.go(-1)">
        <use xlink:href="#arrow-left"></use>
      </svg>
      <head-title slot="head-center" headTitle="我的"></head-title>
    </head-top>
    <div class="profile-container">
      <div class="user-info">
        <section>
          <svg>
            <use xlink:href="#avatar-default"></use>
          </svg>
          <section>
            <router-link to="/accountInfo" tag="p" v-if="username">{{username}}</router-link>
            <router-link to="/login" tag="p" v-else>注册/登录</router-link>
            <section>
              <img src="@/images/bindphone.png">
              <p v-if="mobile">手机号: {{mobile}}</p>
              <p v-else>暂无绑定手机号</p>
            </section>
            
          </section>
        </section>
        <arrow-right></arrow-right>
      </div>

      <div class="profile-item">
        <section class="profile-info">
          <router-link class="amount" to="/profile/balance">
            <p>
              <span>{{balance}}</span>元
            </p>
            <p>我的余额</p>
          </router-link>
          <router-link class="coupon" to="/profile/coupon">
            <p>
              <span>{{coupon}}</span>个
            </p>
            <p>我的优惠</p>
          </router-link>
          <router-link class="points" to="/profile/points">
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
    </div>
    <footer-guide></footer-guide>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowRight from '@/components/common/arrowRight'
import footerGuide from '@/components/footer/footer'
import {getUserInfo, isLogin} from '@/service/getData'
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
    if (isLogin()) {
      getUserInfo()
        .then(function (data) {
          if (!('status' in data)) {
            console.log(data)
            self.balance = data.balance
            self.coupon = data.gift_amount
            self.points = data.point
            self.mobile = data.mobile
            self.username = data.username
          }
        })
    }
  },
  components: {headTop, arrowRight, footerGuide, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .item{
    .flex;
    .bgw;
    padding: 0.5rem;
    border-bottom: 2px solid #f1f1f1;
  }
  .order, .points-mall, .membership-card, .service-center, .application-download {
    .item;
  }
  .profile-page {
    header {
      .goback {
        .head-left;
        .wh(1.2rem, 1.2rem);
      }
    }
    .profile-container {
      padding-top: 3rem;
      .user-info {
        .flex;
        .bgc(#3190e8);
        padding: 1.2rem;
        section:first-child {
          .flex;
          svg {
            .wh(4rem, 4rem);
            .bgw;
            .br(0.5);
            margin-right: 1rem;
          }
          section {
            p {
              color: @white;
              font-size: 1.2rem;
              font-weight: bold;
            }
            section {
              .flex(@jc: flex-start);
              p{
                color: @white;
                font-size: .85rem;
              }
            }
          }
        }
      }
      .profile-item {
        .profile-info {
          .flex;
          .bgw;
          a {
            width: 100%;
            text-align: center;
            padding: 1rem;
            border-right: 1px solid #f1f1f1;
            p {
              font-size: 1rem;
            }
          }
          .amount {
            p:nth-child(1) {
              span {
                color: #f90;
                font-weight: bold;
                font-size: 1.5rem;
              }
            }
          }
          .coupon {
            p:nth-child(1) {
              span {
                color: #ff5f3e;
                font-weight: bold;
                font-size: 1.5rem;
              }
            }
          }
          .points {
            p:nth-child(1) {
              span {
                color: #6ac20b;
                font-weight: bold;
                font-size: 1.5rem;
              }
            }
          }
        }
        section:nth-child(2) {
          margin-top: 1rem;
        }
        section:nth-child(3) {
          margin-top: 1rem;
        }
      }
    }
  }
  .icon-left {
    .wh(1rem, 1rem);
    margin-right: 0.5rem;
  }
</style>
