<template>
  <div class="food-list-container">
    <ul>
      <header class="food-header">
        <span>{{food.name}}</span>
        <span>{{food.description}}</span>
      </header>
      <li class="food-li" v-for="(item, index) in food.foods" :key="index">
        <div class="food-attributes">
          <div v-for="(attr, index) in item.attributes" :key="index">
            <span class="attr-new-backbround" v-if="attr.icon_name === '新'" :style="{'border-right-color': '#' + attr.icon_color}"></span>
            <span class="attr-new" v-if="attr.icon_name === '新'">新品</span>
            <span class="food-recommendation" v-if="attr.icon_name === '招牌'" :style="{'border-color': '#' + attr.icon_color, color: '#' + attr.icon_color}">招牌</span>
          </div>
          
        </div>
        <div class="food-icon">
          <img :src="getImageUrl(item.image_path)">
        </div>
        <div class="food-description">
          <p>{{item.name}}</p>
          <p>{{item.description}}</p>
          <p>月售{{item.month_sales}}&nbsp&nbsp&nbsp好评率{{item.satisfy_rate}}%</p>
          <p class="food-activity" v-if="item.activity">
            <span :style="{'border-color': '#' + item.activity.icon_color, color: '#' + item.activity.image_text_color}">{{item.activity.image_text}}</span>
          </p>
          <p class="food-footer">
            <span class="price">
              <span>￥</span>
              <span>{{item.specfoods[0].price}}</span>
            </span>
            <span class="add-food">
              <svg class="add-food">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
              </svg>
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {getImageUrl} from '@/service/getData'
export default {
  data () {
    return {

    }
  },
  mounted: function () {
  },
  props: ['food'],
  methods: {
    getImageUrl: function (path) {
      return getImageUrl(path)
    }
  }
}
</script>
<style>
  .food-header {
    height: 4rem;
    padding-left: 1rem;
  }
  .food-header > span:nth-child(1) {
    font-weight: bold;
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  
  .food-list-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .food-list-container ul {
    padding-left: 0;
    width: 100%;
  }

  .food-li {
    width: 100%;
    list-style: none;
    padding-left: 1rem;
    padding-top: 1.5rem;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 0.1rem solid #ebebeb;
    position: relative;
  }

  .attr-new-backbround {
    position: absolute;
    top: -1.6rem;
    left: -1.6rem;
    border-width: 1.6rem;
    border-style: solid;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    transform:rotate(45deg);
    -ms-transform:rotate(45deg); /* Internet Explorer */
    -moz-transform:rotate(45deg); /* Firefox */
    -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
    -o-transform:rotate(45deg); /* Opera */
  }

  .attr-new {
    font-size: 0.7rem;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    top: -1.6rem;
    left: -1.6rem;
    position: absolute;
    transform:rotate(-45deg);
    -ms-transform:rotate(-45deg); /* Internet Explorer */
    -moz-transform:rotate(-45deg); /* Firefox */
    -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
    -o-transform:rotate(-45deg); /* Opera */
  }

  .food-icon > img {
    height: 4.2rem;
    width: 4.2rem;
    padding-right: 1rem;
  }

  .food-description {
    width: 100%;
  }

  .food-description > p {
    margin: 0.3rem 0 0.3rem 0;
  }

  .food-description > p:nth-child(1) {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .food-description > p:nth-child(2) {
    color: #999;
  }

  .food-activity > span {
    font-size: 0.6rem;
    border: 0.07rem solid;
    padding: 0.08rem;
    border-radius: 0.5rem;
  }

  .price > span {
    color: #f1884f;
  }

  .price > span:nth-child(2) {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .food-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding-right: 1rem;
  }

  .food-right > span {
    padding: 0.15rem;
    border: 0.07rem solid #f1884f;
    border-radius: 0.55rem;
    font-size: 0.5rem;
    color: #f1884f;
    margin-right: 0.35rem;
  }

  .add-food {
    height: 1.8rem;
    width: 1.8rem;
    fill: #3190e8;
    margin-right: 2rem;
  }

  .food-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .food-recommendation {
    position: absolute;
    top: 1rem;
    right: 2.2rem;
    font-size: 0.6rem;
    border: 0.07rem solid;
    border-radius: 0.55rem;
    padding: 0.15rem;
  }
</style>
