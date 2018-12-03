<template>
  <input class="input-component" :type="type ? type : 'text'" :value="value" :placeholder="placeholder" @input="$emit('inputs', $event.target.value)" @change="$emit('change', $event.target.value)" :maxlength="maxLength? maxlength: 20" :style="{'background-color': bg? bg: '#f2f2f2', 'height': ht? ht: '2.2rem', 'font-size': fs? fs: '1rem', 'border': border? border: '1px solid #ddd'}">
</template>
<script>
export default {
  props: ['type', 'value', 'placeholder', 'maxLength', 'bg', 'ht', 'fs', 'border']
}
</script>
<style>
  .input-component {
    width: 100%;
    padding-left: 0.5rem;
    box-sizing: border-box;
    border-radius: 0.2rem;
    border: 1px solid #ddd;
  }
</style>
