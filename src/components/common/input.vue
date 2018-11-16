<template>
  <input class="input-component" type="text" :value="value" :placeholder="placeholder" @input="$emit('inputs', $event.target.value)" @change="$emit('change', $event.target.value)" :maxlength="maxLength? maxlength: 20">
</template>
<script>
export default {
  props: ['value', 'placeholder', 'maxLength']
}
</script>
<style>
  .input-component {
    height: 2.2rem;
    width: 100%;
    padding-left: 0.5rem;
    font-size: .8rem;
    box-sizing: border-box;
    /*color: #f1f1f1;*/
    border-radius: 0.2rem;
    border: 1px solid #ddd;
    background-color: #f2f2f2;
  }
</style>
