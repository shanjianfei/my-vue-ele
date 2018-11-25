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
<style>
  .description-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .link-description {
    font-size: .8rem;
    color: #3190e8;
  }
  .description-container > img {
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
  }
</style>
