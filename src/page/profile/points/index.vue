<template>
  <div class="points-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="我的积分"></head-title>
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
        <button-submit text="积分兑换商品" bg="#fe6d47" lh="3rem" fs="1.2rem"></button-submit>
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
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import buttonSubmit from '@/components/common/buttonSubmit'
export default {
  data () {
    return {}
  },
  components: {headTop, arrowLeft, headTitle, buttonSubmit}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .points-container {
    margin-top: 2.8rem;
    padding: 1rem .5rem .5rem .5rem;
    background-color: @blue;
    .points-content {
      .br(0.03);
      .bgw;
      padding: 1rem;
    }
    .points-header {
      .flex;
      > section {
        .flex;
        > img {
          .wh(1.2rem, 1.2rem);
          margin-right: .3rem;
        }
        > a {
          color: @blue;
        }
      }
    }
    .points-body {
      margin-bottom: 2rem;
      > span:first-child {
        font-size: 3rem;
      }
    }
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
