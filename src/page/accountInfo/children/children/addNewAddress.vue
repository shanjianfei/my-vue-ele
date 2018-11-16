<template>
  <div class="add-new-address-page">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">新增地址</span>
    </head-top>
    <div class="add-new-address-container">
      <section class="area-input">
        <section class="input-component-container">
          <input-component placeholder="请填写你的名字" v-model="username"></input-component>
          <p class="tip" v-if="usernameTip">请填写您的姓名</p>
        </section>
        <section class="input-component-container">
          <router-link to="/searchAddress">
            <input-component placeholder="小区/写字楼/学校等" v-model="address.name" readonly="true"></input-component>
          </router-link>
        </section>
        <section class="input-component-container">
          <input-component placeholder="请填写详细送餐地址" v-model="fullAddress"></input-component>
          <p class="tip" v-if="fullAddressTip">送餐地址太短了，不能辨识</p>
        </section>
        <section class="input-component-container">
          <input-component placeholder="请填写能够联系到您的手机号" v-model="telNum"></input-component>
          <p class="tip" v-if="telNumTip">请输入正确的手机号</p>
        </section class="input-component-container">
        <section>
          <input-component placeholder="备用联系电话（选填）" v-model="emergencyTelNum"></input-component>
          <p class="tip" v-if="emergencyTelNumTip">请输入正确的手机号</p>
        </section>
      </section>
      <button-submit text="新增地址" @submit="submit"></button-submit>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import inputComponent from '@/components/common/input'
import buttonSubmit from '@/components/common/buttonSubmit'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      username: '',
      usernameTip: false,
      address: '',
      fullAddress: '',
      fullAddressTip: false,
      telNum: null,
      telNumTip: false,
      emergencyTelNum: null,
      emergencyTelNumTip: false
    }
  },
  components: {
    headTop,
    inputComponent,
    buttonSubmit
  },
  computed: mapState({
    deliveryAddress: state => state.addAddress.deliveryAddress
  }),
  mounted: function () {
    this.address = this.deliveryAddress? this.deliveryAddress: this.address
  },
  methods: {
    ...mapMutations({
      chooseDeliveryAddress: 'updateDeliveryAddress'
    }),
    submit: function () {
      console.log(1)
    },
    checkTelNum: function () {
      return /^1[3,4,5,6,7,8]\d{9}$/.test(this.telNum)
    },
    searchAddress: function () {
      console.log(2)
    }
  }
}
</script>
<style>
  .add-new-address-container {
    padding-top: 3.5rem;
  }
  .area-input {
    width: 100%;
    padding: .8rem 1rem;
    background-color: #fff;
    box-sizing: border-box;
  }
 /* .input-component {
    margin-top: .5rem;
  }*/
  .button-submit {
    margin: 1rem 1rem;
  }
  .tip {
    color: #ea3106;
    font-size: .8rem;
  }
  .input-component-container {
    padding: .5rem 0;
  }
</style>
