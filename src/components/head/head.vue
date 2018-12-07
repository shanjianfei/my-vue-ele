<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="head-search"></slot>
    <slot name="login"></slot>
    <slot name="head-goback"></slot>
    <slot name="city-name"></slot>
    <slot name="point-title"></slot>
    <slot name="head-title"></slot>
    <slot name="change-city"></slot>
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
    height: 3.5rem;
    z-index: 1000;
    .fixed;
    left: 0;
    top: 0;
    right: 0;
    box-sizing: border-box;
  }
  .head-right {
    .center-y;
    margin-right: .5rem;
    font-size: 1rem;
    color: #fff;
  }
  .head-left {
    margin-left: .5rem;
  }
</style>
