<template>
  <div class="food-list-container">
    <ul>
      <header class="food-header">
        <span>{{food.name}}</span>
        <span>{{food.description}}</span>
      </header>
      <li class="food-li" v-for="(item, index) in food.foods" :key="index">
        <div class="new-product" :style="{'border-right-color': '#' + item.activ}"></div>
        <div class="new-product-text"><span>aaa</span></div>
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
          <p class="price">
            <span>￥</span>
            <span>{{item.specfoods[0].price}}</span>
          </p>
        </div>
        <div class="food-right">
          <span>拍照</span>
          <svg class="add-food">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
          </svg>
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

  .food-list-container ul {
    padding-left: 0;
  }

  .food-li {
    list-style: none;
    padding-left: 1rem;
    padding-top: 1.5rem;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 0.1rem solid #ebebeb;
    position: relative;
  }

  .new-product {
    position: absolute;
    top: -1.6rem;
    left: -1.6rem;
    border-width: 1.6rem;
    border-style: solid;
    border-color: transparent blue transparent transparent;
    transform:rotate(45deg);
    -ms-transform:rotate(45deg); /* Internet Explorer */
    -moz-transform:rotate(45deg); /* Firefox */
    -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
    -o-transform:rotate(45deg); /* Opera */
  }

  .new-product-text {
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
  }

  .food-icon {
    flex-grow: 2;
  }
  .food-description {
    flex-grow: 1;
  }
  .food-right {
    flex-grow: 4;
  }
</style>
