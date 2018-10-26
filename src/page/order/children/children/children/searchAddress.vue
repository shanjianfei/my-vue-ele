<template>
  <div class="search-address">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">搜索</span>
    </head-top>
    <div class="search-container">
      <input class="search-address-input" type="text" name="search-address" placeholder="请输入小区/写字楼/学校等" v-model="keyword">
      <button class="search-address-button" @click="search">搜索</button>
    </div>
    <div class="search-results"></div>
    <div class="search-tips">
      <p>找不到地址？</p>
      <p>尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号等）可稍后输入哦</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import {searchAddress} from '@/service/getData'
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    search: function () {
      searchAddress(this.keyword, 'nearby')
        .then(function (data) {
          console.log(data)
        })
    }
  },
  components: {headTop}
}
</script>
<style>
  .search-address {
    height: 100%;
    background-color: #fff;
  }
  .head-goback {
    left: 0.4rem;
    width: 1.2rem;
    height: 1.5rem;
    line-height: 2.2rem;
    margin-left: .4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.5rem;
  }
  .search-container {
    display: flex;
    flex-direction: row;
    padding-top: 4rem;
    height: 3rem;
  }
  .search-address-input {
    flex: 8;
    font-size: 1.2rem;
    margin: 0 1rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: #f1f1f1;
  }
  .search-address-button {
    flex: 2;
    margin-right: 1rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: #3190e8;
    font-size: 1.2rem;
    color: #fff;
  }
  .search-tips {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%
  }
  .search-tips > p {
    color: #aaa;
  }
</style>
