<template>
  <div class="download-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <headTitle slot="head-center" headTitle="下载"></headTitle>
    </head-top>
    <section class="download-container">
      <img class="ele-logo" src="@/images/elmlogo.jpeg">
      <p>下载饿了么APP</p>
      <button >下载</button>
    </section>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  data () {
    return {}
  },
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .download-page {
    .bgw;
    height: 100%;
  }
  .download-container{
    .flex(@fd: column; @jc: center);
    padding-top: 2.8rem;
  }
  .ele-logo {
    margin-top: 2rem;
    border-radius: 1rem;
  }
  p {
    margin-top: .5rem;
    font-size: 1rem;
  }
  button {
    width: 90%;
    margin-top: 1.2rem;
    padding: .5rem 0;
    .br(.3rem);
    .bgc(#4cd964);
    border: 0;
    color: #fff;
    font-size: 1rem;
  }
</style>
