<template>
  <div class="overdue-red-packages-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="历史红包"></head-title>
    </head-top>
    <div class="overdue-red-packages-container">
      <ul>
        <li v-for="(item, index) in overdueRedPackages" :key="index" class="red-packages-li">
          <section>
            <section>
              <p>
                <span>￥</span>
                <span>{{parseAmount(item.amount, 0)}}</span>
                <span>.</span>
                <span>{{parseAmount(item.amount, 1)}}</span>
              </p>
              <p>{{item.description_map.sum_condition}}</p>
            </section>
            <section>
              <p>{{item.name}}</p>
              <p>{{item.description_map.validity_periods}}</p>
              <p>{{item.description_map.phone}}</p>
            </section>
            <section>
              <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#expired"></use></svg>
            </section>
          </section>
          <ul class="limit-map">
            <li v-for="(item ,index) in item.limit_map" :key="index">
              {{item}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import {getStore} from '@/commonApi/localStorage'
import {getOverdueRedPackage} from '@/service/getData'
export default {
  data () {
    return {
      overdueRedPackages: [],
      amount0: '',
      amount1: ''
    }
  },
  mounted: function () {
    let userId = getStore('user_id')
    let self = this
    getOverdueRedPackage(userId, 20, 0)
      .then(function (data) {
        self.overdueRedPackages = data
      })
  },
  methods: {
    parseAmount: function (amount, index) {
      let a = parseFloat(amount).toFixed(1).toString()
      return a.split('.')[index]
    }
  },
  components: {headTop, arrowLeft, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .overdue-red-packages-container {
    padding-top: 3rem;
    .red-packages-li {
      .bgw;
      .br(0.04);
      margin: 1rem;
      border-top: .3rem solid #ccc;
      > section {
        .flex;
        padding: 1rem;
        border-top: .3rem dashed #ccc;
        > section:first-child {
          border-right: .08rem dashed #ccc;
          padding-right: 1rem;
          > p:first-child {
            > span {
              color: #ccc;
            }
            > span:nth-child(2) {
              font-size: 2.5rem;
              font-weight: bold;
            }
            > span:nth-child(4) {
              font-weight: bold;
            }
          }
          > p:last-child {
            font-size: .5rem;
            color: #aaa;
          }
        }
        > section:nth-child(2) {
          > p:first-child {
            font-size: 1rem;
          }
          > p:not(:first-child) {
            font-size: .5rem;
            color: #aaa;
          }
        }
        > section:last-child {
          > svg {
            .wh(3.5rem, 3.5rem);
          }
        }
      }
      .limit-map {
        .bgc(#f9f9f9);
        padding: .5rem;
        > li {
          .bgc(#f9f9f9);
          color: #aaa;
          font-size: .6rem;
        }
      }
    }
  }
</style>
