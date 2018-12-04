<template>
  <div id="app">
    <router-view/>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from '@/components/common/svg'
export default {
  name: 'App',
  components: {
    svgIcon
  }
  // mounted: function () {
  //   let self = this
  //   this.setRootFontSize()
  //   window.onresize = function () {
  //     self.setRootFontSize()
  //   }
  // },
  // methods: {
  //   setRootFontSize: function () {
  //     let w = document.documentElement.offsetWidth
  //     document.documentElement.style.fontSize=w/20+'px';
  //   }
  // }
}
</script>
<style>
  #id {
    height: 100%;
  }
</style>
