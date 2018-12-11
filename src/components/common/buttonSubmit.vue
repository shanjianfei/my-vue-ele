<template>
  <div class="button-submit" @click="$emit('submit')" :style="{'line-height': lh ? lh : '2rem', 'background-color': bg ? bg : '#4cd964', 'font-size': fs ? fs : '1rem'}">
    {{text}}
  </div>
</template>
<script>
export default {
  props: ['text', 'lh', 'bg', 'fs']
}
</script>
<style>
  .button-submit {
    color: #fff;
    text-align: center;
    border-radius: 0.2rem;
  }
</style>
