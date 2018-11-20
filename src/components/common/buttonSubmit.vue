<template>
  <div class="button-submit" @click="$emit('submit')" :style="{'line-height': lh ? lh : '2rem', 'background-color': bg ? bg : '#4cd964'}">
    {{text}}
  </div>
</template>
<script>
export default {
  props: ['text', 'lh', 'bg']
}
</script>
<style>
  .button-submit {
    font-size: 1rem;
    color: #fff;
    text-align: center;
    border-radius: 0.2rem;
  }
</style>
