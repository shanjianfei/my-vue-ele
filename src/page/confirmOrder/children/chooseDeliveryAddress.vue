<template>
  <div class="choose-delivery-address">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">选择地址</span>
    </head-top>
    <div class="choose-delivery-address-container">
      <ul>
        <li class="address-item" v-for="(item, index) in deliveryAddress" :key="index" @click="choose(index, item.id)">
          <svg class="link-bar-right" :class="{'choosed' : choosed === index}" fill="#f1f1f1"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use></svg>
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
      <img class="add-icon" src="@/images/add_address.png">
      <span>新增收货地址</span>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import {getDeliveryAddress} from '@/service/getData'
import {getStore, setStore} from '@/commonApi/localStorage'
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
      console.log(1)
      setStore('deliveryAddressChoosedId', id)
      this.$router.go(-1)
    }
  },
  components: {headTop}
}
</script>
<style>
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

  .cda-add-address {
    position: fixed;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .add-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
  }

  .cda-add-address > span {
    font-size: 1.3rem;
    color: #3190e8;
  }
  .choose-delivery-address-container {
    padding-top: 3rem;
  }
  .address-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: .5rem;
    background-color: #fff;
    border-bottom: .02rem solid #f1f1f1;
  }
  .address-item > svg {
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
  }
  .choosed {
    fill: #4cd964;
  }
  .address-item > section > p:first-child > span:first-child {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .address-item > section > p:first-child > span {
    color: #000;
    font-size: .9rem;
  }
  .address-item > section > p:last-child > span:first-child {
    background-color: #4cd964;
    color: #fff;
    padding: 0 .2rem;
    border-radius: 15%;
  }
  .address-item > section > p:last-child > span {
    font-size: .75rem;

  }
</style>
