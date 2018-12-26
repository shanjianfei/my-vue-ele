<template>
  <div class="reset-password-page">
    <head-top class="header">
      <head-title slot="head-center" headTitle="重置密码"></head-title>
      <arrow-left slot="head-left"></arrow-left>
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
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import inputComponent from '@/components/common/input'
import alertMessage from '@/components/common/alertMessage'
import captcha from '@/components/common/captcha'
import buttonSubmit from '@/components/common/buttonSubmit'
import {getCaptcha, resetPassword} from '@/service/getData'
export default {
  data () {
    return {
      username: '',
      captchaImg: '',
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
        this.alertMessage = '请输入正确的账号'
        this.alertShow = true
        return
      }
      if (!this.oldpassWord) {
        this.alertMessage = '请输入旧密码'
        this.alertShow = true
        return
      }
      if (!this.newpassword) {
        this.alertMessage = '请输入新密码'
        this.alertShow = true
        return
      }
      if (!this.confirmpassword) {
        this.alertMessage = '请输入确认密码'
        this.alertShow = true
        return
      }
      if (!this.captchaCode) {
        this.alertMessage = '请输入验证码'
        this.alertShow = true
        return
      }
      if (this.newpassword === this.oldpassWord) {
        this.alertMessage = '新密码与旧密码相同'
        this.alertShow = true
        return
      }
      if (this.newpassword !== this.confirmpassword) {
        this.alertMessage = '两次输入的密码不一致'
        this.alertShow = true
        return
      }
      let self = this
      resetPassword(this.username, this.oldpassWord, this.newpassword, this.confirmpassword, this.captchaCode)
        .then(function (data) {
          if (data.status === 1) {
            self.$router.push('/login')
          } else {
            self.changeChaptchaImg()
            self.alertMessage = data.message
            self.alertShow = true
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
    alertMessage,
    headTitle,
    arrowLeft
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .reset-password-container {
    padding-top: 3.5rem;
  }
  .button-submit {
    margin: 1rem;
    padding: .4rem;
  }
</style>
