<template>
  <ul class="horizontal-switch-bar-container">
    <li v-for="(item, index) in items" :key="index" @click="$emit('changeItem', index)">
      <span :class="{'item-active': index === itemActive}">{{item}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['items', 'itemActive']
}
</script>
<style>
  .horizontal-switch-bar-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .horizontal-switch-bar-container > li {
    text-align: center;
    width: 100%;
    padding: .8rem 0;
  }
  .item-active {
    padding-bottom: .3rem;
    border-bottom: .2rem solid #3190e8;
  }
</style>
