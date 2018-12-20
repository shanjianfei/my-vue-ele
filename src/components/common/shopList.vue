<template>
  <ul class="restaurants-list">
    <router-link tag="li" v-for="(item, index) in restaurantsList" :key="index" :to="{path: '/shopsGuide/shopDetail', query: {id: item.id, imagePath: item.image_path, shopInfo: item}}">
      <section>
        <img class="shop-img" :src="getImageUrl(item.image_path)">
      </section>
      <ul class="shop-info">
        <li class="brand">
          <section>
            <span>品牌</span>
            <span>{{item.name}}</span>
          </section>
          <section>
            <span v-for="(d, i) in item.supports" :key="i" :style="{'color': '#' + d.icon_color, 'border': '.05rem solid ' + '#' + d.icon_color}">
              {{d.icon_name}}
            </span>
          </section>
        </li>
        <li class="evaluation">
          <section>
            <rating-star :rating="item.rating"></rating-star>
            <span class="score">{{item.rating}}</span>
            <span class="orders">月销售{{item.recent_order_num}}单</span>
          </section>
          <section>
            <span v-if="item.delivery_mode" class="express">{{item.delivery_mode.text}}</span>
            <span v-if="schedule(item.supports)" class="schedule">准时达</span>
          </section>
        </li>
        <li class="fee-distance">
          <span>
            ￥{{item.float_minimum_order_amount}}起送 / 配送费约{{item.float_delivery_fee}}
          </span>
          <span>
            {{item.distance}} / <span class="order-time">{{item.order_lead_time}}</span>
          </span>
        </li>
      </ul>
    </router-link>
  </ul>
</template>
<script>
import ratingStar from '@/components/common/ratingStar'
import {getImageUrl} from '@/service/getData'
export default {
  props: ['restaurantsList'],
  methods: {
    schedule: function (supports) {
      if (supports) {
        for (let i in supports) {
          if (supports[i].id === 9) {
            return true
          }
        }
      }
      return false
    },
    getImageUrl: function (imgPath) {
      return getImageUrl(imgPath)
    }
  },
  components: {
    ratingStar
  }
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .restaurants-list {
    > li {
      display: flex;
      flex-direction: row;
      padding: 1rem 0.8rem;
      border-bottom: 1px solid #f1f1f1;
      .shop-info {
        width: 100%;
        margin-left: 1rem;
        > li {
          margin-bottom: .6rem;
        }
        .brand {
          .flex;
          > section:first-child {
            .flex;
            span:first-child {
                .bgc(#ffd930);
                .br(0.1);
                margin-right: .5rem;
                padding: .1rem .2rem;
                color: @black;
                font-weight: bold;
                font-size: .6rem;
            }
            span:last-child {
              font-weight: bold;
              font-size: .9rem;
              color: @black;
            }
          }
          > section:last-child {
            > span {
              .br(0.1);
              font-size: .5rem;
              margin-left: .1rem;
            }
          }
        }
        .evaluation {
          .flex;
          > section:first-child {
            display: flex;
            .score {
              color: #ff6000;
              margin-left: 0.2rem;
              font-size: 0.6rem;
            }
            .orders {
              color: #666;
              margin-left: 0.2rem;
              font-size: 0.5rem;
            }
          }
          > section:last-child {
            font-size: 0.5rem;
            > span {
              .br(0.08);
              padding: .1rem 0;
              border: 0.05rem solid @blue;
            }
            .express {
              color: #fff;
              .bgc(@blue);
            }
            .schedule {
              color: @blue;
            }
          }
        }
        .fee-distance {
          .flex;
          span {
            font-size: 0.6rem;
            color: #666;
          }
          > span:last-child {
            span {
              color: @blue;
            }
          }
        }
      }
    }
    .shop-img {
      .wh(4rem, 4rem);
    }
  }
</style>
