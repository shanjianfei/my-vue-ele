<template>
  <div class="edit-address-page">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">编辑地址</span>
      <span class="head-right" slot="head-right">编辑</span>
    </head-top>
    <div class="edit-address-container">
      <ul>
        <li class="delivery-address-li" v-for="(item, index) in deliveryAddress" :key="index">
          <p>{{item.address}}</p>
          <p>{{item.phone}}</p>
        </li>
      </ul>
      <link-bar contentLeft="新增地址" contentRight="" link="/addNewAddress"></link-bar>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import linkBar from '@/components/common/linkBar'
import {getDeliveryAddress, isLogin} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      userId: null,
      deliveryAddress: []
    }
  },
  mounted: function () {
    this.userId = getStore('user_id')
    this.getDeliveryAddress(this.userId)
  },
  methods: {
    getDeliveryAddress: function (userId) {
      let self = this
      getDeliveryAddress(userId)
        .then(function (data) {
          console.log(data)
          self.deliveryAddress = data
        })
    }
  },
  components: {
    headTop,
    linkBar
  }
}
</script>
<style>
  .edit-address-container {
    padding-top: 3.5rem;
  }
  .delivery-address-li {
    background-color: #FFF8C3;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-top: 0.03rem solid #ccc;
    border-bottom: 0.03rem solid #ccc;
  }
</style>
