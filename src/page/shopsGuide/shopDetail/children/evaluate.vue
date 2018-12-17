<template>
  <div class="evaluate-container">
    <section class="comprehensive-assessment">
      <section>
        <p>{{foodScore}}</p>
        <p>综合评价</p>
        <p>高于周边商家{{compareRating}}%</p>
      </section>
      <section>
        <p>
          <span>服务态度</span>
          <span>
            <rating-star :rating="serviceScore"></rating-star>
          </span>
          <span>{{serviceScore}}</span>
        </p>
        <p>
          <span>菜品评价</span>
          <span>
            <rating-star :rating="overallScore"></rating-star>
          </span>
          <span>{{overallScore}}</span>
        </p>
        <p>
          <span>送达时间</span>
          <span>{{deliverTime}}分钟</span>
        </p>
      </section>
    </section>
    <section class="assessment-tags">
      <span :class="{'activeTag': index === activeTag}" v-for="(item, index) in assessmentTags" :key="index" @click="selectTag(index)">
        {{item.name}}({{item.count}})
      </span>
    </section>
    <ul class="user-assessment">
      <li v-for="(item, index) in assessmentInfo" :key="index">
        <img :src="getImageUrlByCdn(item.avatar)">
        <section>
          <header class="user-info">
            <section>
              <p>{{item.username}}</p>
              <p>
                <rating-star :rating="item.rating_star"></rating-star>
                <span>{{item.time_spent_desc}}</span>
              </p>
            </section>
            <div>{{item.rated_at}}</div>
          </header>
          <ul class="food-img-ul">
            <li v-for="(item_rating, index_rating) in item.item_ratings" :key="index_rating" v-if="item_rating.image_hash">
              <img :src="getImageUrlByCdn(item_rating.image_hash)">
            </li>
          </ul>
          <ul class="food-name-ul">
            <li v-for="(item_rating, index_rating) in item.item_ratings" :key="index_rating">
              <div>{{item_rating.food_name}}</div>
            </li>
          </ul>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import {getAssessmentInfo, getScore, getImageUrlByCdn, getImageUrl, getRatingsTags} from '@/service/getData'
import ratingStar from '@/components/common/ratingStar'
export default {
  data: function () {
    return {
      assessmentInfo: [],
      foodScore: 0,
      compareRating: 0,
      serviceScore: 0,
      overallScore: 0,
      deliverTime: 0,
      assessmentTags: [],
      activeTag: null
    }
  },
  mounted: function () {
    let restaurantId = this.$route.query.id
    let self = this
    if (restaurantId !== 0) {
      getAssessmentInfo(restaurantId).then(function (data) {
        self.assessmentInfo = data
      })
      getScore(restaurantId).then(function (data) {
        self.compareRating = data.compare_rating.toFixed(3) * 100
        self.foodScore = data.food_score.toFixed(1)
        self.serviceScore = data.service_score.toFixed(1)
        self.overallScore = data.overall_score.toFixed(1)
        self.deliverTime = data.deliver_time
      })
    }
    getRatingsTags(restaurantId).then(function (data) {
      self.assessmentTags = data
    })
  },
  methods: {
    getImageUrlByCdn: function (path) {
      return getImageUrlByCdn(path)
    },
    getImageUrl: function (path) {
      return getImageUrl(path)
    },
    selectTag: function (index) {
      this.activeTag = index
    }
  },
  components: {
    ratingStar
  }
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .evaluate-container {
    position: absolute;
    top: 3rem;
    bottom: 0;
    left: 0;
    right: -18px;
    .flex(@fd: column; @ai: flex-start;);
    overflow: auto;
    > section {
      flex-shrink: 0;
    }
    .comprehensive-assessment {
      .flex(@jc: space-around; @ai: flex-start;);
      .bgw;
      width: 100%;
      margin-top: 1px;
      padding: 1rem;
      box-sizing: border-box;
      p {
        margin-top: 0.3rem;
      }
      > section:first-child {
        .flex(@fd: column);
        > p:first-child {
          font-size: 1.7rem;
          color: #f60;
        }
        > p:nth-child(2) {
          font-size: 1rem;
        }
        > p:nth-child(3) {
          font-size: 0.6rem;
          color: #999;
        }
      }
      > section:last-child {
        span {
          font-size: .9rem;
          margin-right: 0.3rem;
        }
        p {
          display: flex;
        }
        p:nth-child(3) {
          > span:nth-child(2) {
            font-size: 0.7rem;
            color: #999;
          }
        }
      }
    }
    .assessment-tags {
      display: flex;
      flex-wrap: wrap;
      .bgw;
      margin: 0.2rem 0;
      padding-bottom: 0.5rem;
      > span {
        font-size: .9rem;
        padding: 0.4rem;
        margin: .5rem;
        .br(0.05);
        .bgc(#ebf5ff);
      }
      .activeTag {
        .bgc(@blue);
        color: @white;
      }
    }
    .user-assessment {
      .bgw;
      margin-top: 1rem;
      width: 100%;
      > li {
        display: flex;
        margin: 1rem;
        border-bottom: 2px solid #f1f1f1;
        box-sizing: border-box;
        > section {
          margin-left: 1rem;
          width: 100%;
        }
        > img:first-child {
          .wh(2.2rem, 2.2rem);
          .br(0.5);
        }
        .user-info {
          .flex(@ai: flex-start);
          > section {
            p {
              font-size: .85rem;
            }
            p:nth-child(2) {
              .flex;
            }
          }
          > div {
            font-size: 0.7rem;
            color: #999;
          }
        }
        .food-img-ul {
          .flex(@ai: flex-start; @jc: flex-start;);
          flex-wrap: wrap;
          margin-top: 0.5rem;
          > li {
            margin-right: 0.5rem;
          }
          > li:nth-child(3) {
            .absolute;
            right: 0.5rem;
          }
          img {
            .wh(4rem, 4rem);
          }
        }
        .food-name-ul {
          margin: 1rem 0;
          .flex(@ai: flex-start; @jc: flex-start;);
          div {
            width: 3rem;
            text-overflow: ellipsis;
            white-space:nowrap;
            overflow: hidden;
            color: #999;
            border: 1px solid #ebebeb;
            margin-right: 0.3rem;
            padding: 0.2rem;
            font-size: .8rem;
            .br(0.05);
          }
        }
      }
    }
  }
</style>
