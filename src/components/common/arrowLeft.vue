<template>
  <svg class="head-goback" slot="head-goback" @click="$router.go(-1)">
    <use xlink:href="#arrow-left"></use>
  </svg>
</template>
<style>
  .head-goback {
    width: 1.2rem;
    height: 1.5rem;
    line-height: 2.2rem;
    left: 0.4rem;
    margin-left: .4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
