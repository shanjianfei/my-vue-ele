<template>
  <div class="order-comments-container">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">订单备注</span>
    </head-top>
    <div class="quick-note">
      <header class="quick-note-title">快速备注</header>
      <section class="quick-note-item">
        <span v-for="(item, index) in getRemar" :key="index"></span>
      </section>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
export default {
  data () {
    return {
      remarks: []
    }
  },
  methods: {

  },
  components: {headTop}
}
</script>
<style>
  .head-goback {
    left: 0.4rem;
    width: 1.2rem;
    height: 1.5rem;
    line-height: 2.2rem;
    margin-left: .4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.5rem;
  }
</style>
