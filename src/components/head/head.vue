<template>
  <header id="head-top">
    <slot name="head-search"></slot>
    <slot name="login"></slot>
    <slot name="head-left"></slot>
    <slot name="head-right"></slot>
    <slot name="head-center"></slot>
  </header>
</template>
<script>
</script>
<style scoped lang="less">
  @import "~assets/less/common.less";
  #head-top {
    background-color: @blue;
    width: 100%;
    height: 3rem;
    z-index: 1000;
    .fixed;
    left: 0;
    top: 0;
    right: 0;
    box-sizing: border-box;
  }
  .head-right {
    .absolute;
    .center-y;
    right: .5rem;
    font-size: .9rem;
    color: #fff;
  }
  .head-left {
    margin-left: .5rem;
  }
</style>
