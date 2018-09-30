<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="head-search"></slot>
    <slot name="login" class="login"></slot>
    <slot name="head-goback"></slot>
    <slot name="city-name" class="city-name"></slot>
    <slot name="point-title" class="point-title"></slot>
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
  }
</style>
