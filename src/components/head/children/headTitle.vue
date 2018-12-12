<template>
  <span class="head-title">{{headTitle}}</span>
</template>
<script>
export default {
  props: ['headTitle']
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .head-title {
    .absolute;
    .vertical-center;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>
