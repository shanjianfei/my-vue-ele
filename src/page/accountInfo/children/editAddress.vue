<template>
  <div class="edit-address-page">
    <head-top>
      <head-title slot="head-center" headTitle="编辑地址"></head-title>
      <arrow-left slot="head-left"></arrow-left>
      <span class="head-right" slot="head-right" @click="edit" v-if="editShow">编辑</span>
      <span class="head-right" slot="head-right" @click="edit" v-else>完成</span>
    </head-top>
    <div class="edit-address-container">
      <ul>
        <li v-for="(item, index) in deliveryAddress" :key="index">
          <section>
            <p>{{item.address}}</p>
            <p>{{item.phone}}</p>
          </section>
          <span v-show="!editShow" @click="deleteAddress(item.id)">x</span>
        </li>
      </ul>
      <link-bar contentLeft="新增地址" contentRight="" link="/addNewAddress"></link-bar>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import linkBar from '@/components/common/linkBar'
import {getDeliveryAddress, deleteDeliveryAddress} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      userId: null,
      deliveryAddress: [],
      editShow: true
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
          self.deliveryAddress = data
        })
    },
    edit: function () {
      this.editShow = !this.editShow
    },
    deleteAddress: function (addressId) {
      let self = this
      deleteDeliveryAddress(this.userId, addressId)
        .then(function (data) {
          if ('status' in data && data.status === 1) {
            for (let i = 0; i < self.deliveryAddress.length; i++) {
              if (self.deliveryAddress[i].id === addressId) {
                self.deliveryAddress.splice(i, 1)
                break
              }
            }
          }
        })
    }
  },
  components: {
    headTop,
    linkBar,
    headTitle,
    arrowLeft
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .edit-address-container {
    padding-top: 3.5rem;
  }
  ul {
    li:first-child {
      .bgc(#FFF8C3);
      border-top: 1px solid #ccc;
    }
    li {
      .flex;
      .bgw;
      padding: 0.5rem;
      border-bottom: 1px solid #ccc;
    }
    span {
      font-family: Helvetica Neue,Tahoma,Arial;
      font-size: 1.2rem;
    }
  }
  a {
    margin-top: 0.5rem;
  }
</style>
