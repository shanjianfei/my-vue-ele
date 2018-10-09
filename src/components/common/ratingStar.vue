<template>
  <div class="rating-container">
   <section class="star-container">
     <svg class="fill-grey" v-for="i in 5" :key="i">
       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
     </svg>
   </section>
   <div class="star-overflow-container" :style="'width:' + rating*2.5/5 + 'rem'">
     <section class="star-overflow">
       <svg class="fill-orange" v-for="i in 5" :key="i">
         <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
       </svg>
     </section>
   </div>
  </div>
</template>
<script>
export default {
  props: ['rating']
}
</script>
<style>
  .rating-container {
    position: relative;
    width: 2.5rem;
    height: 1rem;
    z-index: -1;
  }

  .star-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 1rem;
    display: flex;
  }

  .star-overflow {
    position: absolute;
    top: 0;
    left: 0;
    height: 1rem;
    width: 2.5rem;
    display: flex;
  }

  .fill-grey {
    fill: #d1d1d1;
  }

  .fill-orange {
    fill: #ff9a0d;
  }

  .star-overflow-container {
    position: relative;
    overflow: hidden;
    height: 100%;
  }
</style>
