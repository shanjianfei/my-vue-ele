<template>
  <div class="shop-info-container">
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
</template>
<script>
import {getAssessmentInfo, getScore, getImageUrlByCdn, getImageUrl} from '@/service/getData'
import ratingStar from '@/components/common/ratingStar'
export default {
  data: function () {
    return {
      assessmentInfo: [],
      foodScore: 0,
      compareRating: 0,
      serviceScore: 0,
      overallScore: 0,
      deliverTime: 0
    }
  },
  props: ['assessmentTags', 'restaurantId'],
  mounted: function () {
    let self = this
    if (this.restaurantId !== 0) {
      getAssessmentInfo(this.restaurantId).then(function (data) {
        self.assessmentInfo = data
      })
      getScore(this.restaurantId).then(function (data) {
        self.compareRating = data.compare_rating.toFixed(3) * 100
        self.foodScore = data.food_score.toFixed(1)
        self.serviceScore = data.service_score.toFixed(1)
        self.overallScore = data.overall_score.toFixed(1)
        self.deliverTime = data.deliver_time
      })
    }
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
<style>
  .user-assessment-ul {
    margin-left: 1.5rem;
  }

  .user-assessment-ul > li {
    display: flex;
  }

  .user-assessment-ul > li > section {
    margin-left: 1rem;
    width: 100%;
  }

  .user-assessment-ul > li > img:first-child {
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
  }

  .user-info > section > p:nth-child(2) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .user-info > div {
    font-size: 0.8rem;
    color: #999;
    margin-right: 1.2rem;
  }

  .shop-info-container {
    margin-top: 0.1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .shop-info-container > section {
    flex-shrink: 0;
  }
  .comprehensive-assessment {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #fff;
    padding-bottom: 1rem;
  }

  .comprehensive-assessment p {
    margin: 0;
    margin-top: 0.6rem;
  }

  .comprehensive-assessment > section:nth-child(1) > p:first-child {
    font-size: 2rem;
    color: #ff9a0d;
  }

  .comprehensive-assessment > section:nth-child(1) > p:nth-child(3) {
    font-size: 0.7rem;
    color: #999;
  }

  .comprehensive-assessment > section:nth-child(2) > p:first-child {
    display: flex;
    flex-direction: row;
  }

  .comprehensive-assessment > section:nth-child(2) > p:first-child > span {
    margin-right: 0.3rem;
  }

  .comprehensive-assessment > section:nth-child(2) > p:nth-child(2) {
    display: flex;
    flex-direction: row;
  }

  .comprehensive-assessment > section:nth-child(2) > p:nth-child(2) > span {
    margin-right: 0.3rem;
  }

  .comprehensive-assessment > section:nth-child(2) > p:nth-child(3) > span {
    margin-right: 0.3rem;
  }

  .comprehensive-assessment > section:nth-child(2) > p:nth-child(3) > span:nth-child(2) {
    font-size: 0.7rem;
    color: #999;
  }

  .assessment-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    padding-bottom: 0.5rem;
  }

  .assessment-tags > span {
    font-size: 1.1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #ebf5ff;
    margin-left: 1rem;
    margin-top: 0.8rem;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .food-img-ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .food-img-ul > li {
    margin-right: 0.5rem;
  }

  .user-info-ul > li:nth-child(3) {
    position: absolute;
    right: 0.5rem;
  }

  .food-img-ul img {
    width: 5rem;
    height: 5rem;
  }

  .food-name-ul {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
  }

  .food-name-ul span {
    display: block;
    width: 5rem;
    text-overflow : ellipsis;
    white-space:nowrap;
    overflow: hidden;
    color: #999;
    border: 0.05rem solid #999;
    margin-right: 0.3rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  .user-assessment-container {
    margin-top: 1rem;
    background-color: #fff;
  }

  .user-assessment-container li {
    list-style: none;
  }

  .user-assessment-ul > li {
    padding-top: 1rem;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid #f1f1f1;
  }

</style>
