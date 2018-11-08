<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="head-search"></slot>
    <slot name="login"></slot>
    <slot name="head-goback"></slot>
    <slot name="city-name"></slot>
    <slot name="point-title"></slot>
    <slot name="change-city"></slot>
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
  }
.point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.7rem;
    font-weight: bold;
  }
</style>
