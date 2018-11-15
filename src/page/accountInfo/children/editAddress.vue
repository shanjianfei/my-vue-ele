<template>
  <div class="edit-address-page">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">编辑地址</span>
      <span class="head-right" slot="head-right">编辑</span>
    </head-top>
    <div class="edit-address-container">
      <link-bar contentLeft="新增地址" contentRight="" link="/addNewAddress"></link-bar>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import linkBar from '@/components/common/linkBar'
export default {
  components: {
    headTop,
    linkBar
  }
}
</script>
<style>
  .edit-address-container {
    padding-top: 3.5rem;
  }
</style>
