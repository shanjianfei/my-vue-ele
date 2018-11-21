<template>
  <div class="points-page">
    <head-top>
      <arrow-left slot="head-goback"></arrow-left>
      <span slot="point-title" class="point-title">
        我的积分
      </span>
    </head-top>
    <div class="points-container">
      <div class="points-content">
        <section class="points-header">
          <span>当前积分</span>
          <section>
            <img src="@/images/description.png">
            <router-link to="/profile/points/pointsDescription">积分说明</router-link>
          </section>
        </section>
        <section class="points-body">
          <span>0</span>
          <span>分</span>
        </section>
        <button class="points-button">积分兑换商品</button>
      </div>
    </div>
    <div class="points-details">
      <p>最近30天积分纪录</p>
      <img src="@/images/no-log.png">
      <p>最近30天无积分纪录</p>
      <p>快去下单赚取大量积分吧</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  data () {
    return {}
  },
  components: {headTop, arrowLeft}
}
</script>
<style>
  .points-container {
    margin-top: 2.8rem;
    padding: 1rem .5rem .5rem .5rem;
    background-color: #3190e8
  }
  .points-content {
    border-radius: 1rem;
    padding: 1rem;
    background-color: #fff;
  }
  .points-header {
    display: flex;
    justify-content: space-between;
  }
  .points-header > section {
    display: flex;
    align-items: center;
  }
  .points-header > section > img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.3rem;
  }
  .points-header > section > a {
    color: #3190e8;
  }
  .points-body > span:first-child {
    font-size: 3rem;
  }
  .points-button {
    width: 100%;
    text-align: center;
    background-color: #fe6d47;
    color: #f1f1f1;
    height: 3rem;
    margin-top: 2rem;
    border-radius: 0.5rem;
    border: 0;
    font-size: 1.5rem;
  }
  .points-details {
    margin-top: 0.5rem;
    padding: 0.5rem;
    text-align: center;
  }
  .points-details > p:first-child {
    text-align: left;
  }
</style>
