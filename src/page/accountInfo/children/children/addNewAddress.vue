<template>
  <div class="add-new-address-page">
    <head-top class="header">
      <head-title slot="head-center" headTitle="新增地址"></head-title>
      <arrow-left slot="head-left"></arrow-left>
    </head-top>
    <div class="add-new-address-container">
      <section class="area-input">
        <section class="input-component-container">
          <input-component placeholder="请填写你的名字" @change="checkUsername"></input-component>
          <p class="tip" v-if="usernameTip">请填写您的姓名</p>
        </section>
        <section class="input-component-container">
          <router-link to="/searchAddress">
            <input-component placeholder="小区/写字楼/学校等" readonly="true" v-model="deliveryAddress.name"></input-component>
          </router-link>
        </section>
        <section class="input-component-container">
          <input-component placeholder="请填写详细送餐地址" @change="checkAddress"></input-component>
          <p class="tip" v-if="fullAddressTip">送餐地址太短了，不能辨识</p>
        </section>
        <section class="input-component-container">
          <input-component placeholder="请填写能够联系到您的手机号" @change="checkTelNum"></input-component>
          <p class="tip" v-if="telNumTip">请输入正确的手机号</p>
        </section>
        <section class="input-component-container">
          <input-component placeholder="备用联系电话（选填）" @change="checkemergencyTelNum"></input-component>
          <p class="tip" v-if="emergencyTelNumTip">请输入正确的手机号</p>
        </section>
      </section>
      <button-submit text="新增地址" @submit="submit"></button-submit>
      <alert-message :message="alertMessage" :show="show" @closeTip="closeTip"></alert-message>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import alertMessage from '@/components/common/alertMessage'
import inputComponent from '@/components/common/input'
import buttonSubmit from '@/components/common/buttonSubmit'
import {mapState, mapMutations} from 'vuex'
import {addDeliveryAddress} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      username: '',
      usernameTip: false,
      fullAddress: '123',
      fullAddressTip: false,
      telNum: null,
      telNumTip: false,
      emergencyTelNum: null,
      emergencyTelNumTip: false,
      alertMessage: '',
      show: false
    }
  },
  components: {
    headTop,
    inputComponent,
    buttonSubmit,
    arrowLeft,
    headTitle,
    alertMessage
  },
  computed: mapState({
    deliveryAddress: state => state.addAddress.deliveryAddress,
    geohash: state => state.geohash
  }),
  methods: {
    ...mapMutations({
      chooseDeliveryAddress: 'updateDeliveryAddress'
    }),
    submit: function () {
      let self = this
      let userId = getStore('user_id')
      let geohash = this.deliveryAddress.geohash
      let address = this.deliveryAddress.name
      addDeliveryAddress(userId, address, this.fullAddress, geohash, this.username, this.telNum, '公司', 1, this.emergencyTelNum, 4)
        .then(function (data) {
          if (data.status === 0) {
            self.alertMessage = data.message
            self.show = true
          } else {
            self.$router.go(-1)
          }
        })
    },
    checkemergencyTelNum: function (value) {
      this.telNum = value
      let ret = /^1[3,4,5,6,7,8]\d{9}$/.test(this.telNum)
      if (!ret) {
        this.emergencyTelNumTip = true
      } else {
        this.emergencyTelNumTip = false
      }
    },
    checkTelNum: function (value) {
      this.telNum = value
      let ret = /^1[3,4,5,6,7,8]\d{9}$/.test(this.telNum)
      if (!ret) {
        this.telNumTip = true
      } else {
        this.telNumTip = false
      }
    },
    checkUsername: function (value) {
      this.username = value
      if (!this.username) {
        this.usernameTip = true
      } else {
        this.usernameTip = false
      }
    },
    checkAddress: function (value) {
      this.fullAddress = value
      let ret = value.length
      if (ret < 3) {
        this.fullAddressTip = true
      } else {
        this.fullAddressTip = false
      }
    },
    closeTip: function () {
      this.alertMessage = ''
      this.show = false
    }
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .add-new-address-container {
    padding-top: 3.5rem;
  }
  .area-input {
    width: 100%;
    padding: .8rem 1rem;
    background-color: #fff;
    box-sizing: border-box;
  }
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
