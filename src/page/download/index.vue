<template>
  <div class="download-page">
    <head-top>
      <span class="point-title" slot="point-title">下载</span>
      <arrow-left slot="head-goback"></arrow-left>
    </head-top>
    <section class="download-container">
      <img class="ele-logo" src="@/images/elmlogo.jpeg">
      <p>下载饿了么APP</p>
      <button class="button-download">下载</button>
    </section>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  data () {
    return {}
  },
  components: {headTop, arrowLeft}
}
</script>
<style>
  .point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.7rem;
    font-weight: bold;
  }
  .download-page {
    height: 100%;
    background-color: #fff;
  }
  .download-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.8rem;
  }
  .ele-logo {
    margin-top: 2rem;
    border-radius: 1rem;
  }
  .button-download {
    width: 90%;
    margin-top: 1.5rem;
    height: 3rem;
    border-radius: 0.5rem;
    background-color: #4cd964;
    border: 0;
    color: #fff;
    font-size: 1.2rem;
  }
</style>
