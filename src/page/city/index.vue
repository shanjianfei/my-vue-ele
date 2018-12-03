<template>
  <div class="city-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" :headTitle="cityName"></head-title>
      <section slot="head-right" class="change-city">
        <router-link to="/">切换城市</router-link>
      </section>
    </head-top>
    <div class="city-container">
      <form class="city-search">
        <input-component type="search" placeholder="输入学校、商务楼、地址" ht="3rem" @inputs="input"></input-component>
        <button-submit text="提交" lh="3rem" bg="#3190e8" @submit="search"></button-submit>
      </form>
      <div class="search-list" v-if="searchList">
        <ul v-if="searchList.length > 0">
          <li class="search-result-li" v-for="(item, index) in searchList" :key="index" @click="select(item)">
            <h3>{{item.name}}</h3>
            <p>{{item.address}}</p>
          </li>
        </ul>
        <div class="search-none-result" v-else>
          很抱歉！无搜索结果
        </div>
      </div>
      <div class="search-history" v-else>
        <div class="search-history-title">
          搜索历史
        </div>
        <div class="search-history-content" v-if="searchHistory">
          <ul>
            <li class="search-result-li" v-for="(item, index) in searchHistory" :key="index" @click="select(item)">
              <h3>{{item.name}}</h3>
              <p>{{item.address}}</p>
            </li>
            <li @click="clearHistory">清空所有</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import buttonSubmit from '@/components/common/buttonSubmit'
import inputComponent from '@/components/common/input'
import {getCityInfo, searchAddress} from '@/service/getData'
import {getStore, setStore, clearStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      cityName: '',
      location: '',
      cityId: '',
      searchList: null,
      searchHistory: null
    }
  },
  mounted: function () {
    let cityId = this.$route.params.cityId
    let self = this
    getCityInfo(cityId)
      .then(function (data) {
        self.cityName = data.name
      })

    // 从localStorage获取搜索历史
    this.searchHistory = JSON.parse(getStore('searchAddressHistory'))
  },
  methods: {
    input: function (value) {
      this.location = value
    },
    search: function () {
      let cityId = this.$route.params.cityId
      let keyword = this.location
      let self = this
      searchAddress(cityId, keyword, 'search')
        .then(function (data) {
          self.searchList = data
        })
    },
    select: function (item) {
      let geohash = item.geohash
      if (this.searchHistory) {
        let _exist = 0
        for (let i = this.searchHistory.length - 1; i >= 0; i--) {
          if (this.searchHistory[i].geohash === geohash) {
            _exist = 1
            break
          }
        }
        if (_exist === 0) {
          this.searchHistory.push(item)
          setStore('searchAddressHistory', JSON.stringify(this.searchHistory))
        }
      } else {
        setStore('searchAddressHistory', JSON.stringify([item]))
      }
      let name = item.name
      setStore('geohash', geohash)
      this.$router.push({path: '/shopsGuide', query: {geohash, name}})
    },
    clearHistory: function () {
      clearStore('searchAddressHistory')
      this.searchHistory = null
    }
  },
  components: {
    headTop,
    arrowLeft,
    headTitle,
    buttonSubmit,
    inputComponent
  }
}
</script>
<style>
  .change-city {
    position: absolute;
    right: 1rem;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
  }
  .city-container {
    padding-top: 3.5rem;
  }
  .city-search {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
    padding: 1rem 1.5rem;
  }
  .input-component {
    margin-bottom: 1rem;
  }
  .search-result-li > h3, .search-history-li > h3 {
    font: 1rem "Microsoft YaHei";
    margin: 0 0 .6rem 0;
  }
  .search-result-li > p, .search-history-li > p {
    color: #999;
    margin: 0;
    font: 0.8rem "Microsoft YaHei";
  }
  .search-result-li, .search-history-li {
    list-style-type: none;
    background-color: #fff;
    padding: .8rem 1.5rem;
    border-bottom: .01rem solid #f6f6f6;
  }
  .search-none-result {
    background-color: #fff;
    font: 0.8rem/2rem "Microsoft YaHei";
    text-indent: 1rem;
  }
  .search-history-title {
    color: #666;
    font: 0.8rem/2rem "Microsoft YaHei";
    text-indent: 1rem;
  }
  .search-history-content > ul > li:last-child {
    text-align: center;
    padding: 1rem;
    font-size: 1.2rem;
    color: #666;
  }
</style>
