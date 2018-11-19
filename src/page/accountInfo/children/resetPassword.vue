<template>
  <div class="reset-password-page">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">编辑地址</span>
      <span class="head-right" slot="head-right">编辑</span>
    </head-top>
    <form class="reset-password-container">
      <input-component placeholder="账号" bg="#fff" border="0.04rem solid #f1f1f1" ht="3.5rem" @inputs="getUsername"></input-component>
      <input-component placeholder="旧密码" bg="#fff" border="0.04rem solid #f1f1f1" ht="4rem"  @inputs="getOldPassword"></input-component>
      <input-component placeholder="请输入新密码" bg="#fff" border="0.04rem solid #f1f1f1" ht="4rem"  @inputs="getNewPassword"></input-component>
      <input-component placeholder="请确认密码" bg="#fff" border="0.04rem solid #f1f1f1" ht="4rem"  @inputs="getConfirmPassword"></input-component>
      <captcha @input="getCaptchaCode" :captchaImg="captchaImg" @changeChaptchaImg="changeChaptchaImg"></captcha>
      <button-submit text="确认修改" @submit="resetPassword"></button-submit>
    </form>
    <alert-message :message="alertMessage" :show="alertShow" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import inputComponent from '@/components/common/input'
import alertMessage from '@/components/common/alertMessage'
import captcha from '@/components/common/captcha'
import buttonSubmit from '@/components/common/buttonSubmit'
import {resetPassword} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
import {getCaptcha} from '@/service/getData'
export default {
  data () {
    return {
      username: '',
      captchaImg: '', // 
      captchaCode: '',
      oldpassWord: '',
      newpassword: '',
      confirmpassword: '',
      alertMessage: '',
      alertShow: false
    }
  },
  mounted: function () {
    this.getCaptchaImg()
  },
  methods: {
    getUsername: function (value) {
      this.username = value
    },
    getOldPassword: function (value) {
      this.oldpassWord = value
    },
    getNewPassword: function (value) {
      this.newpassword = value
    },
    getConfirmPassword: function (value) {
      this.confirmpassword = value
    },
    getCaptchaImg: function () {
      let self = this
      getCaptcha()
        .then(function (data) {
          self.captchaImg = data.code
        })
    },
    changeChaptchaImg: function () {
      this.getCaptchaImg()
    },
    getCaptchaCode: function (value) {
      this.captchaCode = value
    },
    resetPassword: function () {
      if (!this.username) {
        this.alertMessage = "请输入正确的账号"
        this.alertShow = true
        return
      }
      if (!this.oldpassWord) {
        this.alertMessage = "请输入旧密码"
        this.alertShow = true
        return
      }
      if (!this.newpassword) {
        this.alertMessage = "请输入新密码"
        this.alertShow = true
        return
      }
      if (!this.confirmpassword) {
        this.alertMessage = "请输入确认密码"
        this.alertShow = true
        return
      }
      if (!this.captchaCode) {
        this.alertMessage = "请输入验证码"
        this.alertShow = true
        return
      }
      if (this.newpassword === this.oldpassWord) {
        this.alertMessage = "新密码与旧密码相同"
        this.alertShow = true
        return
      }
      if (this.newpassword !== this.confirmpassword) {
        this.alertMessage = "两次输入的密码不一致"
        this.alertShow = true
        return
      }
      // let username = JSON.parse(getStore('user')).username
      let self = this
      resetPassword(this.username, this.oldpassWord, this.newpassword, this.confirmpassword, this.captchaCode)
        .then(function (data) {
          if (data.status === 1) {
            self.$router.push('/login')
          } else {
            self.changeChaptchaImg()
            self.alertMessage = data.message
            self.alertShow = true
            return
          }
        })
    },
    closeTip: function () {
      this.alertShow = false
    }
  },
  components: {
    headTop,
    inputComponent,
    captcha,
    buttonSubmit,
    alertMessage
  }
}
</script>
<style>
  .reset-password-container {
    padding-top: 3.5rem;
  }
  .input-component {
    border: 0;
  }
  .button-submit {
    margin: 1rem 1rem 0 1rem;
  }
</style>
