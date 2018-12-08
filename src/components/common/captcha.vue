<template>
  <section class="captcha-container">
    <input type="text" name="captcha" placeholder="验证码" maxlength="4" @input="$emit('input', $event.target.value)">
    <img :src="captchaImg">
    <span @click="$emit('changeChaptchaImg')">
      <span>看不清</span>
      <span>换一张</span>
    </span>
  </section>
</template>
<script>
export default {
  props: ['captchaImg']
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .captcha-container {
    .flex;
    .bgw;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    input {
      width: 100%;
      flex: 6;
      border: 0;
      line-height: 3rem;
      padding-left: 1rem;
      font-size: 1rem;
    }
    img {
      height: 1.8rem;
      width: 100%;
      flex: 2;
    }
    span {
      .flex(@fd: column);
      flex: 2;
      width: 100%;
      font-size: .85rem;
      span:first-child {

      }
      span:last-child {
        color: #3b95e9;
      }
    }
  }
</style>
