<template>
  <div class="rating-container">
   <section class="star-container">
     <svg class="fill-grey" v-for="i in 5" :key="i">
       <use xlink:href="#star"></use>
     </svg>
   </section>
   <div class="star-overflow-container" :style="'width:' + rating*2.5/5 + 'rem'">
     <section class="star-overflow">
       <svg class="fill-orange" v-for="i in 5" :key="i">
         <use xlink:href="#star"></use>
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
<style lang="less">
  @import '~assets/less/common.less';
  .rating-container {
    .relative;
    .wh(2.5rem, 1rem);
    .star-container {
      .absolute;
      .wh(2.5rem, 1rem);
      top: 0;
      left: 0;
      display: flex;
      .fill-grey {
        fill: #d1d1d1;
      }
    }
    .star-overflow-container {
      .relative;
      overflow: hidden;
      height: 100%;
      .star-overflow {
        .absolute;
        .wh(2.5rem, 1rem);
        top: 0;
        left: 0;
        display: flex;
        .fill-orange {
          fill: #ff9a0d;
        }
      }
    }
  }
</style>
