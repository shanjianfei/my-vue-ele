<template>
  <div class="login-page">
    <head-top>
      <svg slot="head-goback" @click="$router.go(-1)">
        <use xlink:href="#arrow-left"></use>
      </svg>
      <head-title headTitle="密码登录" slot="point-title"></head-title>
    </head-top>
    <form class="login-container">
      <div class="user-password">
        <input type="text" name="username" placeholder="账号" @input="getUsername($event.target.value)">
        <input type="password" name="password" placeholder="密码" v-model="password">
        <captcha :captchaImg="captchaImg" @input="getCaptchaCode" @changeChaptchaImg="changeChaptchaImg"></captcha>
      </div>
      <div class="login-tips">
        <p>温馨提示：未注册过的账号，登录时将自动注册 </p>
        <p>注册过的用户可凭账号密码登录 </p>
      </div>
      <div class="button-submit-container">
        <button-submit text="确定" @submit="login" lh="3rem"></button-submit>
      </div>
    </form>
    <alert-message :message="alertMessage" :show="showTip" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import buttonSubmit from '@/components/common/buttonSubmit'
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import alertMessage from '@/components/common/alertMessage'
import inputComponent from '@/components/common/input'
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
      showTip: false,
      inputBg: '#fff',
      inputHt: '3rem'
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
    getUsername: function (value) {
      console.log(value)
      this.username = value
    },
    checkUsername: function () {
      if (this.username) {
        return true
      }
      return false
    },
    checkPassword: function () {
      if (this.password) {
        return true
      }
      return false
    },
    checkCaptcha: function () {
      if (/^\d{4}$/.test(this.captchaCode)) {
        return true
      }
      return false
    },
    login: function () {
      let self = this
      if (!this.checkUsername()) {
        this.showTip = true
        this.alertMessage = '用户名不能为空'
        return
      }
      if (!this.checkPassword()) {
        this.showTip = true
        this.alertMessage = '密码不能为空'
        return
      }
      if (!this.checkCaptcha()) {
        this.showTip = true
        this.alertMessage = '验证码为四位数字'
        return
      }
      login(this.username, this.password, this.captchaCode)
        .then(function (data) {
          if ('username' in data) {
            setStore('user_id', data['user_id'])
            setStore('user', data)
            self.$router.push('/profile')
          } else {
            self.changeChaptchaImg()
            self.showTip = true
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
  components: {headTop, alertMessage, captcha, inputComponent, headTitle, buttonSubmit}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .login-page {
    header {
      svg {
        .head-left;
        .wh(1.2rem, 1.2rem)
      }
    }
    .login-container {
      margin-top: 3.3rem;
      .user-password {
        .bgw;
        .flex(@fd: column);
        input {
          box-sizing: border-box;
          width: 100%;
          line-height: 3rem;
          padding-left: 1rem;
          font-size: 1rem;
          border: 0;
          border-bottom: 1px solid #f1f1f1;
        }
      }
      .login-tips {
        p {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          color: red;
        }
      }
      .button-submit-container {
        padding: 0 1rem;
      }
    }
  }
</style>
