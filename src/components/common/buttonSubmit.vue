<template>
  <div class="button-submit" @click="$emit('submit')">
    {{text}}
  </div>
</template>
<script>
export default {
  props: ['text']
}
</script>
<style>
  .button-submit {
    line-height: 2rem;
    font-size: 1rem;
    background-color: #4cd964;
    color: #fff;
    text-align: center;
    border-radius: 0.2rem;
  }
</style>
