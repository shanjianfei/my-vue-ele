<template>
  <div class="convert-red-packages-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="兑换红包"></head-title>
    </head-top>
    <div class="convert-red-packages-container">
      <input-component :placeholder="placeholder" :bg="bg" :ht="ht" @inputs="getConvertCode"></input-component>
      <div class="captcha">
        <captcha :captchaImg="captchaImg" @input="getCaptchaCode" @changeChaptchaImg="changeChaptchaImg"></captcha>
      </div>
      <button-submit text="兑换" lh="3rem" :bg="submitbg" @submit="submit"></button-submit>
    </div>
    <alert-message :message="alertMessage" :show="alertShow" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import inputComponent from '@/components/common/input'
import captcha from '@/components/common/captcha'
import buttonSubmit from '@/components/common/buttonSubmit'
import alertMessage from '@/components/common/alertMessage'
import {getCaptcha, exchangeRedPackage} from '@/service/getData'
export default {
  data () {
    return {
      placeholder: '请输入兑换码',
      bg: '#fff',
      ht: '3.5rem',
      captchaImg: '',
      captchaCode: '',
      submitbg: '#ccc',
      convertCode: '',
      alertMessage: '',
      alertShow: false
    }
  },
  mounted: function () {
    this.getCaptchaImg()
  },
  methods: {
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
    checkConvertCode: function () {
      let pattern = /^\d{1,}$/
      return pattern.test(this.convertCode)
    },
    checkCaptchaCode: function () {
      let pattern = /^\d{4}$/
      return pattern.test(this.convertCode)
    },
    getCaptchaCode: function (value) {
      this.captchaCode = value
      if (this.checkCaptchaCode() && this.checkConvertCode()) {
        this.submitbg = ''
      } else {
        this.submitbg = '#ccc'
      }
    },
    getConvertCode: function (value) {
      this.convertCode = value
      if (this.checkCaptchaCode() && this.checkConvertCode()) {
        this.submitbg = ''
      } else {
        this.submitbg = '#ccc'
      }
    },
    submit: function () {
      if (this.checkCaptchaCode() && this.checkConvertCode()) {
        this.changeChaptchaImg()
        let self = this
        exchangeRedPackage()
          .then(function (data) {
            if ('status' in data && data.status === 0) {
              self.alertMessage = ''
              self.alertShow = false
            }
          })
      }
    },
    closeTip: function () {
      this.alertMessage = ''
      this.alertShow = false
    }
  },
  components: {headTop, arrowLeft, inputComponent, captcha, buttonSubmit, alertMessage, headTitle}
}
</script>
<style scoped lang="less">
  .convert-red-packages-container {
    padding: 4rem 1rem;
    .captcha {
      margin: 1rem 0;
    }
  }
</style>
