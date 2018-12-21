<template>
  <div class="exchange-membership-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="兑换会员"></head-title>
    </head-top>
    <div class="exchange-membership-container">
      <div>成功兑换后将关联到当前帐号： <span>{{username}}</span></div>
      <input type="text" name="card-number" placeholder="请输入10位卡号" v-model="cardNumber" maxlength="10">
      <input type="text" name="card-password" placeholder="请输入6位卡密" v-model="cardPassword" maxlength="6">
      <button id="submit" disabled="true" @click="submit">兑换</button>
      <div class="exchange-membership-tips">
        <h6>——温馨提示——</h6>
        <p>新兑换的会员服务，权益以「会员说明」为准。</p>
        <p>月卡：30次减免配送费。</p>
        <p>季卡：90次减免配送费。</p>
        <p>年卡：360次减免配送费。</p>
        <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
      </div>
    </div>
    <alert-message :message="tipMessage" :show="showTip" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import alertMessage from '@/components/common/alertMessage'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      username: '',
      cardNumber: '',
      cardPassword: '',
      tipMessage: 'ssss',
      showTip: false
    }
  },
  mounted: function () {
    this.username = JSON.parse(getStore('user')).username
  },
  methods: {
    is10Number: function (str) {
      let regNum = /^\d{10}$/
      return regNum.test(str)
    },
    is6Number: function (str) {
      let regNum = /^\d{6}$/
      return regNum.test(str)
    },
    submit: function () {
      this.showTip = true
    },
    closeTip: function () {
      this.showTip = false
    }
  },
  watch: {
    cardNumber: function (newVal, oldVal) {
      if (this.is10Number(newVal) && this.is6Number(this.cardPassword)) {
        document.getElementById('submit').removeAttribute('disabled')
        document.getElementById('submit').style.backgroundColor = '#4cd964'
      } else {
        document.getElementById('submit').setAttribute('disabled', true)
        document.getElementById('submit').style.backgroundColor = '#ccc'
      }
    },
    cardPassword: function (newVal, oldVal) {
      if (this.is6Number(newVal) && this.is10Number(this.cardNumber)) {
        document.getElementById('submit').removeAttribute('disabled')
        document.getElementById('submit').style.backgroundColor = '#4cd964'
      } else {
        document.getElementById('submit').setAttribute('disabled', true)
        document.getElementById('submit').style.backgroundColor = '#ccc'
      }
    }
  },
  components: {headTop, arrowLeft, alertMessage, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .exchange-membership-container {
    padding-top: 3rem;
    text-align: center;
    > div:first-child {
      text-align: left;
      padding: .5rem 1rem;
      font-size: .75rem;
      span {
        color: #000;
        font-size: 1rem;
        font-weight: bold;
      }
    }
    input {
      .bgw;
      height: 3rem;
      width: 100%;
      padding-left: 1rem;
      border: 0;
      border-bottom: 1px solid #f1f1f1;
      box-sizing: border-box;
    }
    h6 {
      color: #aaa;
    }
    p {
      text-align: left;
      color: #aaa;
      font-size: .7rem;
    }
    button {
      width: 90%;
      line-height: 2.4rem;
      font-size: 1rem;
      font-weight: bold;
      color: #fff;
      .bgc(#ccc);
      margin-top: 2rem;
      .br(0.3rem);
      border: 0;
    }
    .exchange-membership-tips {
      padding: 0 3rem;
    }
  }
</style>
