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
<style lang="less">
  @import '~assets/less/common.less';
  .alert-message-page {
    .vertical-center;
    .flex(@fd: column);
    .bgw;
    width: 85%;
    border-radius: 3%;
    .tip-icon-container {
      .wh(5rem, 5rem);
      .br(0.5);
      .flex(@fd: column; @jc: center);
      border: 5px solid #f8cb86;
      margin: .5rem .5rem;
      span:first-child {
        .bgc(#f8cb86);
        .wh(.2rem, 3rem);
        margin: .5rem 0;
      }
      span:last-child {
        .bgc(#f8cb86);
        .wh(.3rem, .3rem);
        .br(0.5);
      }
    }
    .message-content {
      margin: .6rem 0;
      font-size: 1.2rem;
      text-align: center;
    }
    .button-container {
      width: 100%;
    }
  }
</style>
