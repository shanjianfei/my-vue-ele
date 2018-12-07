<template>
  <div class="home-page">
    <head-top class="head-top">
      <span slot="head-left" class="head-left">ele.me</span>
      <router-link class="login" v-if="isLogin()" slot="head-right" to="/profile">
        <svg class="user-avatar">
          <use xlink:href="#user" stroke="#fff" fill="#fff"></use>
        </svg>
      </router-link>
      <router-link v-else slot="head-right" class="logout" to="/login">注册|登录</router-link>
    </head-top>
    <div class="home-container">
      <div class="city_nav">
        <div class="city_tip">
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <router-link class="city_guess" :to="'/city/' + locationCity.id"  @click.native="choseCity(locationCity)">
          <span>{{locationCity.name}}</span>
          <arrow-right></arrow-right>
        </router-link>
      </div>
      <section class="hot_city_container">
        <h4>热门城市</h4>
        <ul>
          <router-link v-for="(item, index) in hotCityList" :to="'/city/' + item.id" :key="index" tag="li" @click.native="choseCity(item)">
            {{item.name}}
          </router-link>
        </ul>
      </section>
      <section class="group_city_container">
        <div v-for="(item, index) in sortgroupcity" :key="index">
          <h4>
            {{index}}
            <span v-if="index === 'A'">（按字母排序）</span>
          </h4>
          <ul>
            <router-link v-for="(i, d) in item" :key="d" tag="li" :to="'/city/' + i.id" @click.native="choseCity(i)">
              {{i.name}}
            </router-link>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowRight from '@/components/common/arrowRight'
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import {isLogin} from '@/service/getData'
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
    isLogin: function () {
      return isLogin()
    },
    ...mapMutations(['updateGeohash']),
    choseCity: function (item) {
      let geohash = item.latitude + ',' + item.longitude
      this.updateGeohash(geohash)
    }
  },
  components: {
    headTop,
    arrowRight
  }
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  @gray:#e4e4e4;
  @typeface-hn:"Helvetica Neue";
  @typeface-my:"Microsoft YaHei";
  .ul-city {
    li {
      padding: .6rem .5rem;
      float: left;
      color: #3190e8;
      text-align: center;
      font: 0.8rem @typeface-my;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      .wh(@width: 25%; @height: auto);
      .border;
    }
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .head-top {
    .relative;
    .head-left {
      .head-left;
      font-weight: bold;
      font-size: 1.3rem;
    }
    .login {
      .head-right;
      .wh(@width: 1.5rem; @height: 1.5rem);
      .user-avatar {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .logout {
      .head-right;
      .wh(@width: 4.5rem; @height: 1.2rem);
    }
  }
  .home-container {
    padding-top: 3rem;
    .city_nav {
      padding-top: .5rem;
      background-color: #fff;
      .city_tip {
        padding: .6rem .5rem;
        .flex;
        span:first-child {
          font-size: .9rem;
          color: #666;
        }
        span:last-child {
          font-size: 0.7rem;
          color: #9f9f9f;
          font-weight: bold;
        }
      }
      .city_guess {
        .flex;
        padding: .6rem .5rem;
        border-top: 1px solid @gray;
        border-bottom: 2px solid @gray;
        span:first-child {
          font-size: 1.1rem;
          color: @blue;
        }
      }
    }
    .hot_city_container {
      margin-top: .5rem;
      .bgw;
      h4 {
        margin: 0;
        font-family: @typeface-hn;
        font-size: 1rem;
        padding: 0.5rem;
        color: #666;
      }
      ul {
        .ul-city;
      }
    }
    .group_city_container {
      margin-top: .5rem;
      .bgw;
      div {
        margin-top: .5rem;
        border-top: 2px solid @gray;
        h4 {
          margin: 0;
          margin-top: .5rem;
          margin: 0;
          padding: .5rem;
          font: .9rem @typeface-my;
          color: #666;
          span {
            font-size: .75rem;
            color: #999;
          }
        }
        ul {
          .ul-city;
          margin-bottom: .5rem;
          border-bottom: 2px solid @gray;
          li {
            color: #666;
          }
        }
      }
    }
  }
</style>
