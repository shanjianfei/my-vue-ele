<template>
  <div class="exchange-membership-page">
    <head-top>
      <arrow-left slot="head-goback"></arrow-left>
      <span slot="point-title" class="point-title">
        兑换会员
      </span>
    </head-top>
    <div class="exchange-membership-container">
      <div>成功兑换后将关联到当前帐号： fsj</div>
      <input type="text" name="card-number" placeholder="请输入10位卡号" v-model="cardNumber" maxlength="10">
      <input type="text" name="card-password" placeholder="请输入6位卡密" v-model="cardPassword" maxlength="6">
      <button id="submit" disabled="true">兑换</button>
      <div class="exchange-membership-tips">
        <h3>——温馨提示——</h3>
        <p>新兑换的会员服务，权益以「会员说明」为准。</p>
        <p>月卡：30次减免配送费。</p>
        <p>季卡：90次减免配送费。</p>
        <p>年卡：360次减免配送费。</p>
        <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  data () {
    return {
      cardNumber: '',
      cardPassword: ''
    }
  },
  methods: {
    is10Number: function (str) {
      let regNum = /^\d{10}$/
      return regNum.test(str)
    },
    is6Number: function (str) {
      let regNum = /^\d{6}$/
      return regNum.test(str)
    }
  },
  watch: {
    cardNumber: function (newVal, oldVal) {
      if (this.is10Number(newVal) && this.is6Number(this.cardPassword)) {
        document.getElementById('submit').removeAttribute('disabled')
        // document.getElementById('submit').setAttribute('background-color', '#4cd964')
        document.getElementById('submit').style.backgroundColor = '#4cd964'
      } else {
        document.getElementById('submit').setAttribute('disabled', true)
      }
    },
    cardPassword: function (newVal, oldVal) {
      if (this.is6Number(newVal) && this.is10Number(this.cardNumber)) {
        document.getElementById('submit').removeAttribute('disabled')
        // document.getElementById('submit').setAttribute('background-color', '#4cd964 !important')
        document.getElementById('submit').style.backgroundColor = '#4cd964'
      } else {
        document.getElementById('submit').setAttribute('disabled', true)
      }
    }
  },
  components: {headTop, arrowLeft}
}
</script>
<style>
  .exchange-membership-container {
    padding-top: 3rem;
    text-align: center;
  }
  .exchange-membership-container > div:first-child {
    height: 3rem;
    line-height: 3rem;
    text-align: left;
    padding-left: 1rem;
  }
  .exchange-membership-container > input {
    height: 3rem;
    width: 100%;
    padding-left: 1rem;
    background-color: #fff;
    border: 0;
    border-bottom: 0.05rem solid #f1f1f1;
  }
  .exchange-membership-container > button {
    width: 90%;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background-color: #ccc;
    margin-top: 2rem;
    border-radius: 0.5rem;
    border: 0;
  }
  .exchange-membership-tips {
    padding: 1rem 3rem;
  }
  .exchange-membership-tips > p, .exchange-membership-tips > h3 {
    color: #ccc;
  }
  .exchange-membership-tips > p {
    text-align: left;
  }
</style>
