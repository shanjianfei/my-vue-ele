<template>
  <div class="alert-message-page" v-show="show">
    <div class="tip-icon-container">
      <span></span>
      <span></span>
    </div>
    <div class="message-content">
      {{message}}
    </div>
    <div class="button-container">
      <button-submit text="确认" @submit="closeTip"></button-submit>
    </div>
  </div>
</template>
<script>
import buttonSubmit from '@/components/common/buttonSubmit'
export default {
  props: ['message', 'show'],
  methods: {
    closeTip: function () {
      this.$emit('closeTip')
    }
  },
  components: {buttonSubmit}
}
</script>
<style>
  .alert-message-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 3%;
    justify-content: space-between;
  }
  .message-content {
    margin: .6rem 0;
    font-size: 1.2rem;
    text-align: center;
  }
  .tip-icon-container {
    margin: .5rem .5rem;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: .2rem solid #f8cb86;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tip-icon-container > span:first-child {
    margin: .5rem 0;
    height: 3rem;
    width: .2rem;
    background-color: #f8cb86;
  }
  .tip-icon-container > span:last-child {
    height: .3rem;
    width: .3rem;
    background-color: #f8cb86;
    border-radius: 50%;
  }
  .button-container {
    width: 100%;
  }
</style>
