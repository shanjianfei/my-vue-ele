<template>
  <div class="service-description-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" :headTitle="title"></head-title>
    </head-top>
    <div v-html="content">
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
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
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .service-description-page {
    margin-top: 3.3rem;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    color: #333;
  }
</style>
