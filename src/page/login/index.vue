<template>
  <div class="login-container">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">密码登录</span>
    </head-top>
    <div class="user-password">
      <input class="captcha-input" type="text" name="user" placeholder="账号">
      <input type="password" name="password" placeholder="密码">
      <section class="captcha-container">
        <input type="text" name="captcha" placeholder="验证码">
        <img class="captcha-img" :src="captchaImg">
        <span class="change-chaptcha" @click="changeChaptcha">
          <span>看不清</span>
          <span>换一张</span>
        </span>
      </section>
    </div>
    <div class="login-tips">
      <p>温馨提示：未注册过的账号，登录时将自动注册 </p>
      <p>注册过的用户可凭账号密码登录 </p>
    </div>
    <div class="login-submit">确定</div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import {mapState} from 'vuex'
import {getCaptcha} from '@/service/getData'
export default {
  data () {
    return {
      captchaImg: ''
    }
  },
  computed: mapState({
    deliveryAddress: state => state.addAddress.deliveryAddress
  }),
  mounted: function () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha: function () {
      let self = this
      getCaptcha()
        .then(function (data) {
          self.captchaImg = data.code
        })
    },
    changeChaptcha: function () {
      this.getCaptcha()
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
  .user-password{
    margin-top: 3.3rem;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  .user-password > input, .captcha-container > input {
    outline: none;
    border: 0;
    border-bottom: 0.1rem solid #f1f1f1;
    line-height: 3rem;
    padding-left: 1rem;
    font-size: 1rem;
  }
  .captcha-container > input {
    width: 100%;
    flex: 6;
  }
  .captcha-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .change-img {
    width: 100%;
    flex: 2;
  }
  .change-chaptcha {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 2;
    text-align: center;
    justify-content: center;
  }
  .change-chaptcha > span:last-child {
    color: #3b95e9;
  }
  .login-submit {
    line-height: 3rem;
    color: #fff;
    border-radius: 0.5rem;
    border: 0;
    background-color: #4cd964;
    margin: 0 1rem;
    margin-top: 1rem;
    text-align: center;
  }
  .login-tips > p {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: red;
  }
</style>
