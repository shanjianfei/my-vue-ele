<template>
  <div>
    <head-top>
      <span slot="logo" class="head_logo">ele.me</span>
      <span slot="login" class="head_login" @click="login">注册|登录</span>
    </head-top>
    <div class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + locationCity.id" class="guess_city" @click.native="choseCity(locationCity)">
        <span>{{locationCity.name}}</span>
        <svg class="arrow_right">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </div>
    <section class="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul>
        <router-link v-for="(item, index) in hotCityList" :to="'/city/' + item.id" :key="index" tag="li" @click.native="choseCity(item)">
          {{item.name}}
        </router-link>
      </ul>
    </section>
    <section class="group_city_container">
      <div v-for="(item, index) in sortgroupcity" :key="index">
        <h4 class="city_title">
          {{index}}
        </h4>
        <ul>
          <router-link v-for="(i, d) in item" :key="d" tag="li" :to="'/city/' + i.id" @click.native="choseCity(i)">
            {{i.name}}
          </router-link>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
export default {
  data: function () {
    return {
      locationCity: '',
      hotCityList: [],
      groupCityList: []
    }
  },
  mounted: function () {
    const url = 'https://elm.cangdu.org/v1/cities'
    var urlGuess = url + '?type=guess'
    var urlHot = url + '?type=hot'
    var urlGroup = url + '?type=group'
    var self = this
    axios.get(urlGuess)
      .then(function (response) {
        if (response.status === 200) {
          self.locationCity = response.data
        }
      })
    axios.get(urlHot)
      .then(function (response) {
        if (response.status === 200) {
          for (var i = response.data.length - 1; i >= 0; i--) {
            self.hotCityList.push(response.data[i])
          }
        }
      })
    axios.get(urlGroup)
      .then(function (response) {
        if (response.status === 200) {
          self.groupCityList = response.data
        }
      })
  },
  computed: {
    ...mapState(['geohash']),
    sortgroupcity () {
      let sortobj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupCityList[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupCityList[String.fromCharCode(i)]
        }
      }
      return sortobj
    }
  },
  methods: {
    ...mapMutations(['updateGeohash']),
    login: function () {
      this.$router.push('/login')
    },
    choseCity: function (item) {
      let geohash = item.latitude + ',' + item.longitude
      this.updateGeohash(geohash)
    }
  },
  components: {
    headTop
  }
}
</script>
<style>
  .head_logo {
    left: 0.4rem;
    font-weight: 400;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
  }

  .head_login {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    right: 0.55rem;
    font-size: 0.8rem;
  }

  .city_nav {
    padding-top: 3.5rem;
    border-top: 1px solid #e4e4e4;
    background-color: #fff;
    margin-bottom: 0.4rem;
  }

  .city_tip {
    line-height: 2rem;
    padding: 0 0.45rem;
    display: flex;
    justify-content: space-between;
  }

  .city_tip > span:first-child {
    font-size: 0.8rem;
    color: #666;
  }

  .city_tip > span:nth-child(2) {
    font-size: 0.8rem;
    color: #9f9f9f;
    font-weight: 900;
  }

  .guess_city {
    align-items: center;
    height: 1.8rem;
    padding: 0 0.45rem;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
    display: flex;
    justify-content: space-between;
    text-decoration: none;
  }

  .arrow_right {
    width: 1rem;
    height: 1rem;
    fill: #999;
  }
  .city_title {
    font: 0.8rem/1.8rem "Helvetica Neue";
    text-indent: 0.5rem;
    color: #666;
  }

  .hot_city_container {
    background-color: #fff;
  }

  .hot_city_container ul {
    padding-left: 0;
  }

  .hot_city_container li {
    list-style-type: none;
    float: left;
    width: 25%;
    height: 2rem;
    color: #3190e8;
    text-align: center;
    font: 0.8rem/2rem "Microsoft YaHei";
  }

  .hot_city_container ul:after {
    content:  '';
    display: block;
    clear: both;
  }

  .group_city_container div {
    background-color: #fff;
  }

  .group_city_container ul {
    padding-left: 0;
  }

  .group_city_container li {
    list-style-type: none;
    float: left;
    width: 25%;
    height: 2rem;
    color: #666;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font: 0.8rem/2rem "Microsoft YaHei";
  }

  .group_city_container ul:after {
    content:  '';
    display: block;
    clear: both;
  }
</style>
