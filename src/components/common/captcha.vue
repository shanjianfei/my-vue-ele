<template>
  <section class="captcha-container">
    <input type="text" name="captcha" placeholder="验证码" maxlength="4" @input="$emit('input', $event.target.value)">
    <img class="captcha-img" :src="captchaImg">
    <span class="change-chaptcha" @click="$emit('changeChaptchaImg')">
      <span>看不清</span>
      <span>换一张</span>
    </span>
  </section>
</template>
<script>
export default {
  props: ['captchaImg'],
}
</script>
<style>
  .captcha-container > input {
    width: 100%;
    flex: 6;
    outline: none;
    border: 0;
    border-bottom: 0.1rem solid #f1f1f1;
    line-height: 3rem;
    padding-left: 1rem;
    font-size: 1rem;
  }
  .captcha-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fff;
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
    background: 
  }
  .change-chaptcha > span:last-child {
    color: #3b95e9;
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
</style>
