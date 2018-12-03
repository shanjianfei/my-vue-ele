<template>
  <span class="head-title">{{headTitle}}</span>
</template>
<script>
export default {
  props: ['headTitle']
}
</script>
<style>
  .head-title {
    position: absolute;
    top: 50%;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
