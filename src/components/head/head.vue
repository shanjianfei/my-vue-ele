<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="head-search"></slot>
    <slot name="login"></slot>
    <slot name="head-goback"></slot>
    <slot name="city-name"></slot>
    <slot name="point-title"></slot>
    <slot name="change-city"></slot>
    <slot name="head-left"></slot>
    <slot name="head-right"></slot>
    <slot name="head-center"></slot>
  </header>
</template>
<script>
</script>
<style>
  #head-top {
    background-color: #3190e8;
    position: fixed;
    width: 100%;
    height: 2.8rem;
    z-index: 1000;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
  }
  .point-title {
    position: absolute;
    top: 50%;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    left: 50%;
    transform: translate(-50%, -50%);
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
