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
      <input class="captcha-input" type="text" name="user" placeholder="账号" v-model="username">
      <input type="password" name="password" placeholder="密码" v-model="password">
      <captcha :captchaImg="captchaImg" @input="getCaptchaCode" @changeChaptchaImg="changeChaptchaImg"></captcha>
    </div>
    <div class="login-tips">
      <p>温馨提示：未注册过的账号，登录时将自动注册 </p>
      <p>注册过的用户可凭账号密码登录 </p>
    </div>
    <div class="login-submit" @click="login">确定</div>
    <alert-message :message="alertMessage" :show="showTip" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import alertMessage from '@/components/common/alertMessage'
import captcha from '@/components/common/captcha'
import {mapState} from 'vuex'
import {getCaptcha, login} from '@/service/getData'
import {setStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      username: '',
      password: '',
      captchaCode: '',
      captchaImg: '',
      alertMessage: '',
      showTip: false
    }
  },
  computed: mapState({
    deliveryAddress: state => state.addAddress.deliveryAddress
  }),
  mounted: function () {
    this.getChaptchaImg()
  },
  methods: {
    getChaptchaImg: function () {
      let self = this
      getCaptcha()
        .then(function (data) {
          self.captchaImg = data.code
        })
    },
    changeChaptchaImg: function () {
      this.getChaptchaImg()
    },
    login: function () {
      let self = this
      login(this.username, this.password, this.captchaCode)
        .then(function (data) {
          if ('username' in data) {
            setStore('user_id', data['user_id'])
            setStore('user', data)
            self.$router.go(-1)
          } else {
            self.changeChaptchaImg()
            self.showTip = true
            console.log(data)
            self.alertMessage = data.message
          }
        })
    },
    getCaptchaCode: function (captchaCode) {
      this.captchaCode = captchaCode
    },
    closeTip: function () {
      this.showTip = false
      this.alertMessage = ''
    }
  },
  components: {headTop, alertMessage, captcha}
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
