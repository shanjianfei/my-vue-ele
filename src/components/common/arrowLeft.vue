<template>
  <svg class="head-goback" slot="head-goback" @click="$router.go(-1)">
    <use xlink:href="#arrow-left"></use>
  </svg>
</template>
<style lang="less">
  @import "~assets/less/common.less";
  .head-goback {
    .wh(1.2rem, 1.2rem);
    .center-y;
    left: 0.5rem;
  }
</style>
