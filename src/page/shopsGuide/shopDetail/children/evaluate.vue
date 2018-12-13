<template>
  <div class="evaluate-container-wrap">
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
      <span v-for="(item, index) in assessmentTags" :key="index">
        {{item.name}}({{item.count}})
      </span>
    </section>
    <section class="user-assessment-container">
      <ul class="user-assessment-ul">
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
                <span>{{item_rating.food_name}}</span>
              </li>
            </ul>
          </section>
        </li>
      </ul>
    </section>
  </div>
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
      assessmentTags: []
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
    }
  },
  components: {
    ratingStar
  }
}
</script>
<style lang="less">
  @import '~assets/less/common.less';
  .user-assessment-ul {
    margin-left: 1.5rem;
    > li {
      display: flex;
      padding-top: 1rem;
      padding-bottom: 2rem;
      border-bottom: 0.1rem solid #f1f1f1;
      > section {
        margin-left: 1rem;
        width: 100%;
      }
      > img:first-child {
        .wh(3rem, 3rem);
        .br(0.05);
      }
    }
  }

  .user-info {
    .flex(@ai: flex-start);
    > section {
      p:nth-child(2) {
        .flex;
      }
    }
    > div {
      font-size: 0.8rem;
      color: #999;
      margin-right: 1.2rem;
    }
  }
  .evaluate-container-wrap {
    overflow: hidden;
  }
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
  }
  .comprehensive-assessment {
    .flex(@jc: space-around; @ai: flex-start;);
    .bgw;
    width: 100%;
    padding-bottom: 1rem;
    p {
      margin-top: 0.6rem;
    }
    > section:nth-child(1) {
      > p:first-child {
        font-size: 2rem;
        color: #ff9a0d;
      }
      > p:nth-child(3) {
        font-size: 0.7rem;
        color: #999;
      }
    }
    > section:nth-child(2) {
      > p:first-child {
        display: flex;
        > span {
          margin-right: 0.3rem;
        }
      }
      > p:nth-child(2) {
        display: flex;
        > span {
          margin-right: 0.3rem;
        }
      }
      p:nth-child(3) {
        > span {
          margin-right: 0.3rem;
        }
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
      font-size: 1.1rem;
      padding: 0.5rem;
      margin-left: 1rem;
      margin-top: 0.8rem;
      .br(0.05);
      .bgc(#ebf5ff);
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
      .wh(5rem, 5rem);
    }
  }
  .food-name-ul {
    margin: 1rem 0;
    .flex(@ai: flex-start; @jc: flex-start;);
    span {
      display: block;
      width: 5rem;
      text-overflow: ellipsis;
      white-space:nowrap;
      overflow: hidden;
      color: #999;
      border: 0.05rem solid #999;
      margin-right: 0.3rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }

  .user-assessment-container {
    .bgw;
    margin-top: 1rem;
    margin-bottom: 0rem;
    width: 100%
  }

</style>
