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
<style>
  .horizontal-switch-bar-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #fff;
  }
  .horizontal-switch-bar-container > a {
    text-align: center;
    width: 100%;
    padding: .8rem 0;
  }
  .router-link-active > span {
    padding-bottom: .3rem;
    border-bottom: .2rem solid #3190e8;
  }
</style>
