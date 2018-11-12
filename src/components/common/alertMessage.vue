<template>
  <div class="alert-message-page" v-show="show">
    <div class="message-content">
      {{message}}
    </div>
    <button @click="$emit('closeTip')">ok</button>
  </div>
</template>
<script>
export default {
  props: ['message', 'show'],
  mounted: function () {
  },
  methods: {
    confirm: function () {
      // this.showTip = false
    }
  }
}
</script>
<style>
  .alert-message-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10rem;
    height: 6rem;
    background-color: #fff;
  }
  .message-content {
    margin-top: 1rem;
    font-size: 1.2rem;
    text-align: center;
  }
  .alert-message-page > button {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2rem;
    background-color: #4cd964;
    border-radius: 0.3rem;
    color: #fff;
    font-size: 1.3rem;
  }
</style>
