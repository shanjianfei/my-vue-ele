<template>
  <div class="city-container">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <section slot="city-name" class="city-name">
        <span class="title-text">{{cityName}}</span>
      </section>
      <section slot="change-city" class="change-city">
        <router-link to="/">切换城市</router-link>
      </section>
    </head-top>
    <form class="city-search">
      <div>
        <input type="search" name="search-city" placeholder="输入学校、商务楼、地址" v-model="location">
      </div>
      <div>
        <input type="button" name="search-city-submit" value="提交" @click="search">
      </div>
    </form>
    <div class="search-list">
      <ul>
        <li v-for="(item, index) in searchList" :key="index" @click="showShops(item.geohash, item.name)">
          <h3>{{item.name}}</h3>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </div>
    <div class="search-history">
      <div class="search-history-title">
        搜索历史
      </div>
      <div class="search-history-content">
        <ul>
          <!-- <router-link tag="li" v-for=""></router-link> -->
        </ul>
      </div>
    </div>
    <div class="search-none-result" v-if="searchNoneResult">
      很抱歉！无搜索结果
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import axios from 'axios'
import {setStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      cityName: '',
      location: '',
      cityId: '',
      searchList: [],
      searchNoneResult: false,
      searchHistory: []
    }
  },
  mounted: function () {
    var cityId = this.$route.params.cityId
    var url = 'https://elm.cangdu.org/v1/cities/' + cityId.toString()
    var self = this
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          self.cityName = response.data.name
        }
      })
  },
  methods: {
    search: function () {
      this.searchNoneResult = false
      var cityId = this.$route.params.cityId
      var keyword = this.location
      var url = 'https://elm.cangdu.org/v1/pois?city_id=' + cityId + '&keyword=' + keyword + '&type=search'
      var self = this
      axios.get(url)
        .then(function (response) {
          if (response.status === 200) {
            var data = response.data
            if (data.name === 'ERROR_QUERY_TYPE') {
              self.searchList = []
              self.searchNoneResult = true
            } else {
              self.searchList = response.data
            }
          }
        })
    },
    showShops: function (geohash, name) {
      setStore('geohash', geohash)
      this.$router.push({path: '/shopsGuide', query: {geohash, name}})
    }
  },
  components: {
    headTop
  }
}
</script>
<style>
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

  .header {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
  }

  .city-name {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  .title-text {
    font-size: 1.3rem;
    color: #fff;
  }

  .change-city {
    position: absolute;
    right: 1rem;
    top: 50%;
    text-align: center;
    transform: translateY(-50%);
  }

  .change-city > a {
    text-decoration: none;
    color: #fff;
    font-size: 0.8rem;
  }

  .city-container {
    padding-top: 3.5rem;
  }

  .city-search {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
    padding-top: 0.5rem;
  }

  .city-search div {
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }

  .city-search input {
    width: 100%;
    height: 1.7rem;
    margin-bottom: 0.5rem;
  }

  .city-search input:nth-child(2) {
    background-color: #3190e8;
    border: 0px;
  }

  .search-list ul {
    margin: 4px 0;
    padding-left: 0;
  }

  .search-list li h3 {
    font: 0.8rem/2rem "Microsoft YaHei";
    margin: 0;
  }

  .search-list li p {
    color: #999;
    margin: 0;
    font: 0.6rem/2rem "Microsoft YaHei";
  }

  .search-list ul li {
    list-style-type: none;
    background-color: #fff;
    margin: 1px 0;
    padding-left: 1rem;
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
</style>
