<template>
  <div class="coupon-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">我的优惠</span>
    </head-top>
    <div class="coupon-container">
      <horizontal-switch-bar :items="itemsSwitchBar" :itemActive="itemActive" @changeItem="changeItem"></horizontal-switch-bar>
      <div class="red-packages-container">
        <div class="red-packages-title">
          <span>有 <span>{{redPackagesNum}}</span> 个红包即将到期</span>
          <section>
            <img src="@/images/description.png">
            <router-link class="red-package-description" to="/profile/points/couponDescription">红包说明</router-link>
          </section>
        </div>
        <ul>
          <li class="red-packages-content" v-for="(item, index) in redPackages" :key="index">
            <div class="red-package">
              <section>
                <p>￥{{item.amount}}</p>
                <p>{{item.description_map.sum_condition}}</p>
              </section>
              <section>
                <p>{{item.name}}</p>
                <p>{{item.description_map.validity_periods}}</p>
                <p>{{item.description_map.phone}}</p>
              </section>
              <span>{{item.description_map.validity_delta}}</span>
            </div>
            <ul class="limit-map">
              <li v-for="(item ,index) in item.limit_map" :key="index">
                <span>{{item}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <router-link class="history-red-packages-link" to="/profile/coupon/overdueredpackages">
        <span>查看历史红包</span>
        <svg><use data-v-841e3554="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
      </router-link>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
import horizontalSwitchBar from '@/components/common/horizontalSwitchBar'
import {getRedPackage} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      itemsSwitchBar: ['红包', '商家代金券'],
      itemActive: 0,
      redPackages: [],
      redPackagesNum: 0
    }
  },
  mounted: function () {
    let userId = getStore('user_id')
    let self = this
    getRedPackage(userId, 20, 0)
      .then(function (data) {
        self.redPackages = data
        self.redPackagesNum = data.length
      })
  },
  methods: {
    changeItem: function (value) {
      if (this.itemActive !== value) {
        this.itemActive = value
      }
    }
  },
  components: {headTop, arrowLeft, horizontalSwitchBar, arrowRight}
}
</script>
<style>
  .coupon-container {
    padding-top: 3rem;
  }
  .red-packages-content {
    margin: 1rem 0;
    border-top: .2rem solid #ff5340;
    border-radius: 0.3rem;
  }
  .red-package {
    padding: 1rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: .2rem dashed #ff5340;
    background-color: #fff;
  }
  .red-package > section:first-child {
    padding-right: 1rem;
    border-right: .08rem dashed #ccc;
  }
  .red-package > section:first-child > p:first-child {
    font-size: 1.2rem;
    color: #ff5340;
  }
  .red-package > section:first-child > p:last-child {
    font-size: .7rem;
    color: #aaa;
  }
  .red-package > section:nth-child(2) > p:not(:first-child) {
    font-size: .7rem;
    color: #aaa;
  }
  .red-package > section:nth-child(2) {
    /*padding-left: 1rem;*/
    /*padding-right: 3rem;*/
  }
  .red-package > span {
    color: #ff5340;
  }
  .red-packages-container {
    padding: 1rem 1rem;
  }
  .red-packages-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: .7rem;
  }
  .red-packages-title > span > span {
    color: #ff5340;
  }
  .limit-map > li > span {
    font-size: .7rem;
    color: #aaa;
    background-color: #f5f5f5;
  }
  .history-red-packages-link {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .7rem;
  }
  .history-red-packages-link > svg {
    width: 0.7rem;
    height: 0.7rem;
    margin-left: .5rem;
  }
  .red-package-description {
    color: #3190e8;
  }
  .red-packages-title img {
    width: .8rem;
    height: .8rem;
    margin-right: 0.3rem;
  }
  .red-packages-title > section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
