<template>
  <div class="add-new-address-page">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">新增地址</span>
    </head-top>
    <div class="add-new-address-container">
      <input-component placeholder="请填写你的名字"></input-component>
      <input-component placeholder="小区/写字楼/学校等"></input-component>
      <input-component placeholder="请填写详细送餐地址"></input-component>
      <input-component placeholder="请填写能够联系到您的手机号"></input-component>
      <input-component placeholder="备用联系电话（选填）"></input-component>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import inputComponent from '@/components/common/input'
export default {
  components: {
    headTop,
    inputComponent
  }
}
</script>
<style>
  .add-new-address-container {
    padding: 3.5rem 1rem .8rem 1rem;
    background-color: #fff;
  }
  .input-component {
    margin-top: .5rem;
  }
</style>
