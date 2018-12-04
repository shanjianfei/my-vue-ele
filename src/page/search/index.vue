<template>
  <div class="search-food-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="point-title" headTitle="搜索"></head-title>
    </head-top>
    <div class="search-food-container">
      <div class="search-food-form">
        <input type="search" name="search" placeholder="请输入商家或美食名称" v-model="inputValue">
        <input type="submit" name="submit" value="submit" @click="search('')">
      </div>
      <div class="search-results" v-if="showSearchResults">
        <ul class="search-results-ul" v-if="searchResults.length">
          <li class="search-results-li" v-for="(item, index) in searchResults" :key="index">
            <p>{{item.name}}</p>
            <p>{{item.address}}</p>
          </li>
        </ul>
        <div class="search-tips" v-else>很抱歉！无搜索结果</div>
      </div>
      <div class="search-history" v-else-if="searchHistory.length">
        <ul class="search-history-ul">
          <header class="search-history-title">搜索历史</header>
          <li class="search-history-li" v-for="(item, index) in searchHistory" :key="index" @click="search(item)">
            {{item}}
          </li>
          <li class="clear-history" @click="clearHistory">清空历史记录</li>
        </ul>
      </div>
    </div>
    <footer-guide></footer-guide>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import footerGuide from '@/components/footer/footer'
import headTitle from '@/components/head/children/headTitle'
import {searchRestaurants} from '@/service/getData'
import {setStore, getStore, removeItem} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      geohash: '',
      inputValue: '',
      searchResults: [],
      searchHistory: [],
      showSearchResults: false
    }
  },
  mounted: function () {
    this.geohash = this.$route.params.geohash
    let storeSearchHistory = JSON.parse(getStore('searchHistory'))
    if (storeSearchHistory) {
      this.searchHistory = storeSearchHistory
    }
  },
  methods: {
    search: function (key) {
      if (!key && !this.inputValue) return
      this.showSearchResults = true
      if (!key) {
        let storeSearchHistory = getStore('searchHistory')
        if (!storeSearchHistory) {
          setStore('searchHistory', JSON.stringify([this.inputValue]))
          this.searchHistory = [this.inputValue]
        } else {
          let storeData = JSON.parse(storeSearchHistory)
          if (storeData.indexOf(this.inputValue) === -1) {
            storeData.push(this.inputValue)
            setStore('searchHistory', JSON.stringify(storeData))
          }
          this.searchHistory = storeData
        }
        key = this.inputValue
      } else {
        this.inputValue = key
      }
      let self = this
      searchRestaurants(this.geohash, key)
        .then(function (data) {
          if ('type' in data && data.type === 'ERROR_DATA') {
            self.searchRestaurants = []
          } else {
            self.searchRestaurants = data
          }
        })
    },
    clearHistory: function () {
      this.searchHistory = []
      removeItem('searchHistory')
    }
  },
  components: {headTop, footerGuide, arrowLeft, headTitle},
  watch: {
    inputValue: function (newValue) {
      if (!newValue) {
        this.showSearchResults = false
      }
    }
  }
}
</script>
<style>
  .search-food-container {
    padding-top: 4rem;
  }
  .search-food-form {
    padding: 0 0.5rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .search-food-form > input {
    height: 2.5rem;
    border-radius: 0.25rem;
    font-weight: bold;
    font-size: 1rem;
    border: 0;
    padding: 0;
  }
  .search-food-form > input:first-child {
    width: 100%;
    flex: 7;
    border: 0.05rem solid #e1e1e1;
    background-color: #f2f2f2;
    padding: 0 0.5rem;
  }
  .search-food-form > input:last-child {
    background-color: #3190e8;
    margin-left: 0.5rem;
    flex: 1.5;
    color: #fff;
    border: 0;
  }
  .search-results-li {
    padding: 1rem;
    border-bottom: 0.1rem solid #f1f1f1;
  }
  .search-results-li > p:first-child {
    color: #555;
    font-size: 1.2rem;
  }
  .search-results-li > p:last-child {
    color: #999;
  }
  .search-results {
    margin-top: .3rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .search-tips {
    margin: 1rem 0;
    font-size: 1.3rem;
  }
  .search-history-li, .clear-history, .search-history-title {
    padding: 0.5rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .search-history-li {
    border-bottom: 0.05rem solid #f1f1f1;
  }
  .clear-history {
    text-align: center;
    color: #3190e8;
  }
</style>
