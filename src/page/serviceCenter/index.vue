<template>
  <div class="service-center-container">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="服务中心"></head-title>
    </head-top>
    <div class="service-items">
      <section class="online-customer-service">
        <section>
          <svg><use xlink:href="#human"></use></svg>
          <span>在线客服</span>
        </section>
        <section>
          <svg><use xlink:href="#phone"></use></svg>
          <span>在线客服</span>
        </section>
      </section>
      <ul>
        <header>
          热门问题
        </header>
        <li v-for="(item, index) in explain" v-if="index.indexOf('Caption') !== -1" :key="index" @click="showContent(index)">
          <span>{{item}}</span>
          <arrow-right></arrow-right>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
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
      this.$router.push({path: '/serviceCenter/servceDescription', query: {key: index}})
    }
  },
  components: {headTop, arrowLeft, arrowRight, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .border-bottom {
    border-bottom: 1px solid #f1f1f1;
  }
  .service-items {
    margin-top: 2.8rem;
    span {
      font-size: .85rem;
    }
    .online-customer-service {
      .flex;
      > section {
        .flex(@fd: column);
        .bgw;
        width: 100%;
        padding: 1rem;
        .border-bottom;
        svg {
          .wh(1.5rem, 1.5rem);
        }
      }
      > section:first-child {
        border-right: 1px solid #f1f1f1;
      }
    }
    ul {
      header {
        .bgw;
        padding: 1rem;
        .border-bottom;
        color: #222;
        font-size: 1.1rem;
      }
      li {
        .flex;
        padding: 0.5rem 1rem;
        .border-bottom;
      }
    }
  }
</style>
