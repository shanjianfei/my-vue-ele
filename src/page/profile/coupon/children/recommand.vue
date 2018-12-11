<template>
  <div class="recommand-page">
    <head-top>
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="推荐有奖"></head-title>
    </head-top>
    <div class="recommand-container">
      <img src="@/images/activity.png">
      <section class="recommand-ways">
        <span @click="recommand">
          <img src="@/images/weixin.png">
          <p>邀请微信好友</p>
        </span>
        <span @click="recommand">
          <img src="@/images/qq.png">
          <p>邀请QQ好友</p>
        </span>
        <span @click="recommand">
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
    <alert-message message="请在饿了吗APP中打开" :show="tipShow" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import headTitle from '@/components/head/children/headTitle'
import arrowLeft from '@/components/common/arrowLeft'
import alertMessage from '@/components/common/alertMessage'
export default {
  data () {
    return {
      tipShow: false
    }
  },
  methods: {
    recommand: function () {
      this.tipShow = true
    },
    closeTip: function () {
      this.tipShow = false
    }
  },
  components: {headTop, arrowLeft, alertMessage, headTitle}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  .recommand-container {
    padding-top: 3rem;
    > img {
      .wh(100%, 15rem);
    }
    .recommand-ways {
      .flex;
      .bgw;
      padding: 1.5rem 0;
      > span {
        text-align: center;
        width: 100%;
      }
      img {
        .wh(4rem, 4rem);
      }
    }
    > section:last-of-type {
      .flex;
      padding: 1.5rem 1rem;
      > span {
        width: 100%;
        text-align: center;
      }
      > span:first-child {
        border-right: .1rem dashed #ccc;
        > p:last-child {
          > span:first-child {
            color: #ff5633;
            font-weight: bold;
            font-size: 1.5rem;
          }
        }
      }
    }
    .gains-detail {
      text-align: center;
      > section {
        margin-top: 2rem;
        > img {
          .wh(2rem, 3rem);
        }
        > p {
          color: #ccc;
        }
      }
    }
  }
</style>
