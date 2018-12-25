<template>
  <div class="choose-delivery-address">
    <head-top class="header">
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="选择地址"></head-title>
    </head-top>
    <div class="choose-delivery-address-container">
      <ul>
        <li class="address-item" v-for="(item, index) in deliveryAddress" :key="index" @click="choose(index, item.id)">
          <svg :class="{'choosed' : choosed === index}" fill="#f1f1f1"><use xlink:href="#select"></use></svg>
          <section>
            <p>
              <span>{{item.name}}</span>
              <span>先生</span>
              <span>{{item.phone}}</span>
            </p>
            <p>
              <span>{{item.tag}}</span>
              <span>{{item.address}}</span>
            </p>
          </section>
        </li>
      </ul>
    </div>
    <div class="cda-add-address" @click="addNewAddress">
      <img src="@/images/add_address.png">
      <span>新增收货地址</span>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import {getDeliveryAddress} from '@/service/getData'
import {getStore, setStore} from '@/commonApi/localStorage'
import arrowLeft from '@/components/common/arrowLeft'
import headTitle from '@/components/head/children/headTitle'
export default {
  data () {
    return {
      deliveryAddress: [],
      choosed: null
    }
  },
  mounted: function () {
    let self = this
    let userId = getStore('user_id')
    getDeliveryAddress(userId)
      .then(function (data) {
        self.deliveryAddress = data
      })
  },
  methods: {
    addNewAddress: function () {
      this.$router.push('/addAddress')
    },
    choose: function (index, id) {
      this.choosed = index
      setStore('deliveryAddressChoosedId', id)
      this.$router.go(-1)
    }
  },
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .choose-delivery-address-container {
    padding-top: 3rem;
    .address-item {
      .flex(@jc: flex-start);
      .bgw;
      padding: .5rem;
      border-bottom: 1px solid #f1f1f1;
      svg {
        .wh(1rem, 1rem);
        margin-right: .5rem;
      }
      .choosed {
        fill: #4cd964;
      }
      section {
        p:first-child {
          span {
            color: @black;
            font-size: .9rem;
          }
          span:first-child {
            font-weight: bold;
            font-size: 1.1rem;
          }
        }
        p:last-child {
          span {
            font-size: .75rem;
          }
          span:first-child {
            .bgc(#4cd964);
            color: #fff;
            padding: 0 .2rem;
            border-radius: 15%;
          }
        }
      }
    }
  }
  .cda-add-address {
    .fixed;
    bottom: 1rem;
    .flex(@jc: center);
    width: 100%;
    span {
      font-size: 1rem;
      color: @blue;
    }
    img {
      .wh(1.3rem, 1.3rem);
      margin-right: .5rem;
    }
  }
</style>
