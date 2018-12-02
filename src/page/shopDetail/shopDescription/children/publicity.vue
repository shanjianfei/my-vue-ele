<template>
  <div class="publicity-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">食品监督安全公示</span>
    </head-top>
    <div class="publicity-container" v-if="restaurantDetailInfo">
      <div class="publicity-info">
        <header>食品监督安全公示</header>
        <section>
          <svg class="publicity-icon" v-if="restaurantDetailInfo.status == 1">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
          </svg>
          <svg class="publicity-icon" v-else>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
          </svg>
          <section class="check-result">
            <p>监督检查结果：
              <span v-if="restaurantDetailInfo.status == 1" class="check-result-well">良好</span>
              <span v-else class="check-result-bad">差</span>
            </p>
            <p>检查日期： {{restaurantDetailInfo.identification.identificate_date}}</p>
          </section>
        </section>
      </div>
      <div class="business-registration-information">
        <header>食品监督安全公示</header>
        <ul>
          <li>
            <span>企业名称</span>
            <span>{{restaurantDetailInfo.identification.company_name}}</span>
          </li>
          <li>
            <span>工商执照注册号</span>
            <span>{{restaurantDetailInfo.identification.identificate_agency}}</span>
          </li>
          <li>
            <span>注册资本</span>
            <span>{{restaurantDetailInfo.identification.registered_number}}</span>
          </li>
          <li>
            <span>注册地址</span>
            <span>{{restaurantDetailInfo.identification.registered_address}}</span>
          </li>
          <li>
            <span>属地监管所</span>
            <span>{{restaurantDetailInfo.identification.registered_principal}}</span>
          </li>
          <li>
            <span>法定代表人</span>
            <span>{{restaurantDetailInfo.identification.legal_person}}</span>
          </li>
          <li>
            <span>经营范围</span>
            <span>{{restaurantDetailInfo.identification.operation_period}}</span>
          </li>
        </ul>
      </div>
      <div class="catering-license">
        <header>餐饮许可证</header>
        <ul>
          <li>
            <span>营业范围</span>
            <span>{{restaurantDetailInfo.identification.operation_period}}</span>
          </li>
          <li>
            <span>许可证有效期</span>
            <span>{{restaurantDetailInfo.identification.licenses_date}}</span>
          </li>
          <li>
            <span>许可证号</span>
            <span>{{restaurantDetailInfo.identification.licenses_number}}</span>
          </li>
          <li>
            <span>发证时间</span>
            <span>{{restaurantDetailInfo.identification.licenses_scope}}</span>
          </li>
          <li>
            <span>发证机关</span>
            <span>{{restaurantDetailInfo.identification.registered_principal}}</span>
          </li>
        </ul>
      </div>
      <div class="license">
        <header>许可证书</header>
        <div>
          <img :src="getImageUrl(restaurantDetailInfo.license.business_license_image)">
          <img :src="getImageUrl(restaurantDetailInfo.license.catering_service_license_image)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getRestaurantDetailInfo, getImageUrl, getImageUrlByCdn} from '@/service/getData'
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  data () {
    return {
      restaurantDetailInfo: null
    }
  },
  mounted: function () {
    let self = this
    let restaurantId = this.$route.query.restaurantId
    getRestaurantDetailInfo(restaurantId)
      .then(function (data) {
        self.restaurantDetailInfo = data
      })
  },
  methods: {
    getImageUrl: function (img) {
      return getImageUrlByCdn(img)
    }
  },
  components: {headTop, arrowLeft}
}
</script>
<style>
  .publicity-container {
    padding-top: 3rem;
  }
  .publicity-info > header, .catering-license > header, .business-registration-information > header, .license > header {
    padding: .8rem;
    border-bottom: .01rem solid #f1f1f1;
    background-color: #fff;
    color: #666;
  }
  .publicity-info > section {
    padding: .8rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: .01rem solid #f1f1f1;
  }
  .publicity-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }
  .check-result > p{
    font-size: .7rem;
  }
  .check-result-well {
    color: #7ed321;
  }
  .check-result-bad {
    color: red;
  }
  .catering-license, .business-registration-information, .license {
    margin-top: .5rem;
  }
  .catering-license > ul > li, .business-registration-information > ul > li {
    line-height: 1.8rem;
    padding: 0 .8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .catering-license > ul > li > span, .business-registration-information > ul > li > span {
    font-size: .8rem;
  }
</style>
