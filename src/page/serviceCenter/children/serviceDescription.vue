<template>
  <div class="service-description-container">
    <head-top>
      <span class="point-title" slot="point-title">{{title}}</span>
      <arrow-left slot="head-goback"></arrow-left>
    </head-top>
    <div class="service-description-content" v-html="content">
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import {getProfileExplain} from '@/service/getData'
export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  mounted: function () {
    let self = this
    let index = this.$route.query.key
    let contentKey = index.slice(0, -7) + 'Content'
    getProfileExplain()
      .then(function (data) {
        self.title = data[index]
        self.content = data[contentKey]
      })
  },
  components: {headTop, arrowLeft}
}
</script>
<style>
  .service-description-content {
    margin-top: 3.3rem;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    color: #333;
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
</style>
