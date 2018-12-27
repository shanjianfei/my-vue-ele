<template>
  <div class="search-address-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="搜索"></head-title>
    </head-top>
    <form class="search-container" @submit.prevent>
      <input class="search-address-input" type="text" name="search-address" placeholder="请输入小区/写字楼/学校等" v-model="keyword">
      <input type="submit" class="search-address-button" @click="search">
    </form>
    <div class="search-results" v-if="searchResults.length > 0">
      <div>为了满足商家的送餐要求，建议您从列表中选择地址</div>
      <ul>
        <li v-for="(item, index) in searchResults" :key="index" @click="choose(item)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </div>
    <div class="search-tips" v-if="searchResults.length === 0">
      <p>找不到地址？</p>
      <p>尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号等）可稍后输入哦</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import headTitle from '@/components/head/children/headTitle'
import {searchAddress} from '@/service/getData'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      keyword: '',
      searchResults: []
    }
  },
  methods: {
    ...mapMutations(['updateDeliveryAddress']),
    search: function () {
      let self = this
      searchAddress(this.keyword, 'nearby')
        .then(function (data) {
          self.searchResults = data
        })
    },
    choose: function (item) {
      this.updateDeliveryAddress(item)
      this.$router.go(-1)
    }
  },
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .search-address-page {
    height: 100%;
  }
  .search-container {
    .bgw;
    display: flex;
    flex-direction: row;
    padding: 4rem .5rem 1rem .5rem;
    input {
      height: 2.2rem;
      font-size: .9rem;
      .br(.2rem);
      margin-right: 1rem;
      border: 0;
    }
    input:first-child {
      .bgc(#f2f2f2);
      padding-left: .5rem;
      flex: 8;
      color: #999;
    }
    input:last-child {
      .bgc(@blue);
      flex: 2;
      color: #fff;
    }
  }
  .search-tips {
    .vertical-center;
    .flex(@fd: column);
    width: 100%;
    p {
      color: #aaa;
    }
  }
  .search-results {
    div {
      line-height: 2rem;
      color: #FF883F;
      .bgc(#FFF6E4);
      text-align: center;
      font-size: .8rem;
    }
    li {
      padding: 1rem;
      border-bottom: 1px solid #f1f1f1;
      p:first-child {
        color: #555;
        font-size: 1rem;
      }
      p:last-child {
        color: #999;
        font-size: .8rem;
      }
    }
  }
</style>
