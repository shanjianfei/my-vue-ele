<template>
  <input class="input-component" type="text" :value="value" :placeholder="placeholder" @input="$emit('inputs', $event.target.value)">
</template>
<script>
export default {
  props: ['value', 'placeholder']
}
</script>
<style>
  .input-component {
    height: 2.2rem;
    width: 100%;
    padding-left: 0.5rem;
    font-size: 1.1rem;
    box-sizing: border-box;
  }
</style>
