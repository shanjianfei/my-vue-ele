<template>
  <router-link class="head-center-link" :to="link">
    <span>{{headTitle}}</span>
  </router-link>
</template>
<script>
export default {
  props: ['headTitle', 'link']
}
</script>
<style>
  .head-center-link {
    position: absolute;
    top: 50%;
    font-size: 1.2rem;
    font-weight: bold;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .head-center-link > span {
    color: #fff;
  }
</style>
