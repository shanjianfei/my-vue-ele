<template>
  <div class="horizontal-switch-bar-container">
    <router-link v-for="(item, index) in items" :key="index" @click="$emit('changeItem', index)" :to="item.link">
      <span>{{item.content}}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['items']
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .horizontal-switch-bar-container {
    .flex;
    .bgw;
    line-height: 3rem;
    border: .01rem solid #f1f1f1;
    > a {
      text-align: center;
      width: 100%;
    }
    .router-link-active {
      > span {
        border-bottom: .2rem solid #3190e8;
        color: #3190e8;
      }
    }
  }
</style>
