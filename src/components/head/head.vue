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
    position: fixed;
    width: 100%;
    height: 3.5rem;
    z-index: 1000;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
  }
  .head-right {
    position: absolute;
    top: 50%;
    right: .5rem;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #fff;
    right: .5rem;
  }
  .head-left {
    margin-left: .5rem;
  }
  .head-goback {
    position: absolute;
    top: 50%;
    left: .5rem;
    transform: translateY(-50%);
    width: 1rem;
    height: 1.2rem;
    left: .5rem;
  }
</style>
