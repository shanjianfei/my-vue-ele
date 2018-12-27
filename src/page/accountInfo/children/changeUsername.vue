<template>
  <div class="change-username-page">
    <head-top>
      <head-title slot="head-center" headTitle="修改用户名"></head-title>
      <arrow-left slot="head-left"></arrow-left>
    </head-top>
    <div class="change-username-container">
      <input-component value="" placeholder="输入用户名" @inputs="checkValueInput"></input-component>
      <div class="tip">
        <span v-if="checkName">用户名只能修改一次（5-24字符之间）</span>
        <span v-else style="color:red">用户名长度在5到24位之间</span>
      </div>
      <button-submit text="确认修改" lh="2.5rem" bg="#3199e8" @submit="submit"></button-submit>
    </div>
  </div>
</template>
<script>
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import inputComponent from '@/components/common/input'
import buttonSubmit from '@/components/common/buttonSubmit'
import headTop from '@/components/head/head'
import {getStore, setStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      checkName: true,
      username: ''
    }
  },
  components: {
    inputComponent,
    headTop,
    buttonSubmit,
    headTitle,
    arrowLeft
  },
  methods: {
    checkValueInput: function (value) {
      if (/^\w{5,24}$/.test(value)) {
        this.checkName = true
      } else {
        this.checkName = false
      }
      this.username = value
    },
    submit: function () {
      let userInfo = JSON.parse(getStore('user'))
      if (!this.checkName || !this.username) {
        this.checkName = false
        return
      }
      userInfo.username = this.username
      setStore('user', JSON.stringify(userInfo))
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .change-username-container {
    padding: 3.5rem 1rem 1rem 1rem;
  }
  .tip {
    font-size: .65rem;
    margin-top: 1rem;
  }
  .submit {
    .bgc(#3199e8);
    line-height: 2.5rem;
    text-align: center;
    color: #ccc;
    margin-top: 1rem;
  }
  .button-submit {
    margin-top: 1rem;
  }
</style>
