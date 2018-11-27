<template>
  <div class="recommand-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <span class="point-title" slot="head-center">推荐有奖</span>
    </head-top>
    <div class="recommand-container">
      <img src="@/images/activity.png">
      <section class="recommand-ways">
        <span>
          <img src="@/images/weixin.png">
          <p>邀请微信好友</p>
        </span>
        <span>
          <img src="@/images/qq.png">
          <p>邀请QQ好友</p>
        </span>
        <span>
          <img src="@/images/fenxiang.png">
          <p>面对面邀请</p>
        </span>
      </section>
      <section>
        <span>
          <p>累计收益</p>
          <p>
            <span>0</span>
            <span>元</span>
          </p>
        </span>
        <span>
          <p>成功邀请</p>
          <p>
            <span>0</span>
            <span>人</span>
          </p>
        </span>
      </section>
      <div class="gains-detail">
        <p>-收益明细-</p>
        <section>
          <img src="@/images/qianbao.png">
          <p>还不赶紧去邀请好友</p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
export default {
  components: {headTop, arrowLeft}
}
</script>
<style>
  .recommand-container {
    padding-top: 2.2rem;
  }
  .recommand-container > img {
    width: 100%;
    height: 15rem;
  }
  .recommand-ways {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 1.5rem 0;
  }
  .recommand-ways > span {
    text-align: center;
    width: 100%;
  }
  .recommand-ways img {
    width: 4rem;
    height: 4rem;
  }
  .recommand-container > section:last-of-type {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
  }
  .recommand-container > section:last-of-type > span {
    width: 100%;
    text-align: center;
  }
  .recommand-container > section:last-of-type > span:first-child {
    border-right: .1rem dashed #ccc;
  }
  .recommand-container > section:last-of-type > span:first-child > p:last-child > span:first-child {
    color: #ff5633;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .recommand-container > section:last-of-type > span:last-child > p:last-child > span:first-child {
    color: #666;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .gains-detail > section {
    margin-top: 2rem;
  }
  .gains-detail > section > img {
    width: 2rem;
    height: 3rem;
  }
  .gains-detail > section > p {
    color: #ccc;
  }
  .gains-detail {
    text-align: center;
  }
</style>
