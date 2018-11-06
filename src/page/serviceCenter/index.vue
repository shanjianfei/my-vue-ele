<template>
  <div class="service-center-container">
    <head-top>
      <arrow-left slot="head-goback"></arrow-left>
      <span class="point-title" slot="point-title">服务中心</span>
    </head-top>
    <div class="service-items">
      <ul>
        <li v-for="(item, index) in explain" :key="index" class="service-li">
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
    console.log(1)
    getProfileExplain()
      .then(function (data) {
        self.explain = data
      })
  },
  components: {headTop, arrowLeft, arrowRight}
}
</script>
