<template>
  <div class="pay-online-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">在线支付</span>
    </head-top>
    <div class="pay-online-container">
      <div class="time-left">
        <p>支付剩余时间</p>
        <p>
          <span>00</span>
          <span>:</span>
          <span>{{minute}}</span>
          <span>:</span>
          <span>{{second}}</span>
        </p>
      </div>
      <div class="pay-way">
        <p>选择支付方式</p>
        <ul>
          <li @click="choose('zhifubao')">
            <section class="link-bar-left">
              <img src="@/images/zhifubao.png">
              <span>支付宝</span>
            </section>
            <svg class="link-bar-right" :class="{'choosed': chooseWay === 'zhifubao'}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use></svg>
          </li>
          <li @click="choose('weixin')">
            <section class="link-bar-left">
              <img src="@/images/weixin.png">
              <span>微信</span>
            </section>
            <svg class="link-bar-right" :class="{'choosed': chooseWay === 'weixin'}" fill="#f1f1f1"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use></svg>
          </li>
        </ul>
      </div>
      <div class="button-submit-container">
        <button-submit text="确认支付" lh="2.5rem" @submit="submit"></button-submit>
      </div>
    </div>
    <alert-message :message="message" :show="show" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import alertMessage from '@/components/common/alertMessage'
import buttonSubmit from '@/components/common/buttonSubmit'
export default {
  data () {
    return {
      minute: '1',
      second: '00',
      message: '',
      show: false,
      chooseWay: 'zhifubao',
      setIntervalFlag: null
    }
  },
  mounted: function () {
    this.setIntervalFlag = setInterval(this.reduce, 1000)
    this.message = '暂不开放支付功能'
    this.show = true
  },
  methods: {
    reduce: function () {
      let m = parseInt(this.minute)
      let s = parseInt(this.second)
      if (m === 0 && s === 0) {
        clearInterval(this.setIntervalFlag)
        this.message = '支付超时'
        this.show = true
        return
      }
      if (s === 0) {
        this.second = '59'
        this.minute = '' + (m - 1)
      } else {
        this.second = '' + (s - 1)
      }
      if (parseInt(this.minute) < 10) {
        this.minute = '0' + parseInt(this.minute)
      }
      if (parseInt(this.second) < 10) {
        this.second = '0' + parseInt(this.second)
      }
    },
    choose: function (value) {
      this.chooseWay = value
    },
    submit: function () {
      this.message = '当前环境无法支付，请打开官方APP进行付款'
      this.show = true
    },
    closeTip: function () {
      this.message = ''
      this.show = false
    }
  },
  components: {headTop, arrowLeft, alertMessage, buttonSubmit}
}
</script>
<style>
  .pay-online-container {
    padding-top: 3rem;
  }
  .time-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 2rem;
    background-color: #fff;
  }
  .time-left > p:first-child {
    font-size: .8rem;
  }
  .time-left > p:last-child {
    font-size: 2rem;
  }
  .time-left > p:last-child > span {
    color: #000;
  }
  .pay-way > p {
    padding: .5rem .5rem;
  }
  .pay-way li {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 .5rem;
    line-height: 4rem;
    align-items: center;
  }
  .link-bar-right {
    margin-right: .3rem;
    width: 1.2rem;
    height: 1.2rem;
    fill: #ccc;
  }
  .pay-way li:first-child {
    border-bottom: .05rem solid #f1f1f1;
  }
  .link-bar-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link-bar-left > img {
    width: 2rem;
    height: 2rem;
    margin-right: .5rem;
  }
  .choosed {
    fill: #4cd964;
  }
  .button-submit-container {
    margin: 1rem 1rem;
  }
</style>
