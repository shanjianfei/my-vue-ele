<template>
  <div class="service-center-container">
    <head-top>
      <arrow-left slot="head-goback"></arrow-left>
      <span class="point-title" slot="point-title">服务中心</span>
    </head-top>
    <div class="service-items">
      <section class="online-customer-service">
        <section>
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#human"></use></svg>
          <span>在线客服</span>
        </section>
        <section>
          <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#phone"></use></svg>
          <span>在线客服</span>
        </section>
      </section>
      <ul>
        <header class="service-items-header">
          热门问题
        </header>
        <li v-for="(item, index) in explain" v-if="index.indexOf('Caption') !== -1" :key="index" class="service-li" @click="showContent(index)">
          <span>{{item}}</span>
          <arrow-right></arrow-right>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
import {getProfileExplain} from '@/service/getData'
export default {
  data () {
    return {
      explain: {}
    }
  },
  mounted: function () {
    let self = this
    getProfileExplain()
      .then(function (data) {
        self.explain = data
      })
  },
  methods: {
    showContent: function (index) {
      this.$router.push({path:'/serviceCenter/servceDescription', query:{key: index}})
    }
  },
  components: {headTop, arrowLeft, arrowRight}
}
</script>
<style>
  .service-items {
    margin-top: 2.8rem;
  }
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
  .online-customer-service {
    display: flex;
    flex-direction: row;

  }
  .online-customer-service > section {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 0.05rem solid #f1f1f1;
    background-color: #fff;
  }
  .online-customer-service > section:nth-child(1) {
    border-right: 0.05rem solid #f1f1f1;
  }
  .online-customer-service > section > svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  .service-items-header {
    padding: 1rem;
    background-color: #fff;
    border-bottom: 0.1rem solid #f1f1f1;
    color: #222;
    font-size: 1.2rem;
  }
  .service-li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-bottom: 0.1rem solid #f1f1f1;
  }
</style>
