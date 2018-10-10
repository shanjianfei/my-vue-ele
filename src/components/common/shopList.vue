<template>
  <div class="restaurants-list">
    <ul>
      <router-link tag="li" v-for="(item, index) in restaurantsList" :key="index" :to="{path: '/shopDetail', query: {id: item.id}}">
        <section>
          <img class="shop-img" :src="imageBaseUrl + item.image_path">
        </section>
        <section class="shop-info">
          <ul>
            <li class="brand">
              <h4>{{item.name}}</h4>
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
              <span class="fee">
                ￥{{item.float_minimum_order_amount}}起送 / 配送费约{{item.float_delivery_fee}}
              </span>
              <span class="distance">
                {{item.distance}} / <span class="order-time">{{item.order_lead_time}}</span>
              </span>
            </li>
          </ul>
        </section>
      </router-link>
    </ul>
  </div>
</template>
<script>
import ratingStar from '@/components/common/ratingStar'
export default {
  data () {
    return {
      imageBaseUrl: 'https://elm.cangdu.org/img/'
    }
  },
  props: ['restaurantsList'],
  mounted: function () {
    console.log(this.restaurantsList)
  },
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
    }
  },
  components: {
    ratingStar
  }
}
</script>
<style>
  .restaurants-list ul, h4 {
    padding-left: 0.6rem;
    padding-top: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .restaurants-list li {
    list-style: none;
  }

  .restaurants-list>ul>li {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    margin-right: 1.5rem;
  }

  .shop-info {
    width: 100%;
  }

  .shop-info>ul>li {
    margin-bottom: 0.5rem;
  }

  .shop-img {
    width: 4rem;
    height: 4rem;
  }

  .evaluation {
    display: flex;
    justify-content: space-between;
  }

  .evaluation > section:nth-child(1) {
    display: flex;
  }

  .evaluation > section:nth-child(2) {
    font-size: 0.6rem;
  }

  .score {
    color: #ff6000;
    margin-left: 0.2rem;
    font-size: 0.6rem;
  }

  .orders {
    color: #666;
    margin-left: 0.2rem;
    font-size: 0.6rem;
  }

  .fee-distance {
    display: flex;
    justify-content: space-between;
  }

  .fee {
    color: #666;
    font-size: 0.7rem;
  }

  .distance {
    color: #666;
    font-size: 0.7rem;
  }

  .express {
    color: #fff;
    background-color: #3190e8;
    border: 0.05rem solid #3190e8;
  }

  .order-time {
    color: #3190e8;
  }

  .schedule {
    color: #3190e8;
    border: 0.05rem solid #3190e8;
  }
</style>
