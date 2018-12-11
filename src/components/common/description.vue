<template>
  <section class="description-container">
    <img src="@/images/description.png">
    <router-link class="link-description" :to="discriptionObj.link">{{discriptionObj.content}}</router-link>
  </section>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted: function () {
    console.log(this.discriptionObj)
  },
  props: ['discriptionObj']
}
</script>
<style lang="less">
  @import "~assets/less/common.less";
  .description-container {
    .flex;
    .link-description {
      font-size: .8rem;
      color: #3190e8;
    }
    > img {
      .wh(1rem, 1rem);
      margin-right: .5rem;
    }
  }
  .link-description {
    font-size: .8rem;
    color: #3190e8;
  }
</style>
