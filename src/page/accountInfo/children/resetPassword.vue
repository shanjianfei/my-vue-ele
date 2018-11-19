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
      <captcha @input="getCaptchaCode"></captcha>
      <button-submit text="确认修改" @submit="resetPassword"></button-submit>
    </form>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import inputComponent from '@/components/common/input'
import captcha from '@/components/common/captcha'
import buttonSubmit from '@/components/common/buttonSubmit'
import {resetPassword} from '@/service/getData'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      username: '',
      captchaCode: '',
      oldpassWord: '',
      newpassword: '',
      confirmpassword: ''
    }
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
    getCaptchaCode: function (value) {
      this.captchaCode = value
    },
    resetPassword: function () {
      // username, oldpassWord, newpassword, confirmpassword, captcha_code
      let username = JSON.parse(getStore('user')).username
      let self = this
      resetPassword(username, this.oldpassWord, this.newpassword, this.confirmpassword, this.captchaCode)
        .then(function (data) {
          self.$router.push('/login')
        })
    }
  },
  components: {
    headTop,
    inputComponent,
    captcha,
    buttonSubmit
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
