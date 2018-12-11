<template>
  <div class="voucher-container">
    <div class="voucher-description-container">
      <div>
        <description :discriptionObj="discriptionObj"></description>
      </div>
      <div>
        <img src="@/images/voucher.png">
        <p>无法使用代金券</p>
        <p>非客户端或客户端版本过低</p>
        <router-link class="link-download" to="/download">下载或升级客户端</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import description from '@/components/common/description'
export default {
  data () {
    return {
      redPackages: [],
      redPackagesNum: 0,
      discriptionObj: {link: '/profile/coupon/voucher/voucherdescription', content: '商家代金券说明'}
    }
  },
  components: {
    description
  }
}
</script>
<style scoped lang="less">
  @import "~assets/less/common.less";
  .voucher-description-container {
    > div:first-child {
      .flex(@fd: row-reverse;);
      padding: 1rem;
    }
    > div:last-child {
      .flex(@fd: column;);
      > img {
        .wh(@width: 9rem; @height: 5,2rem);
      }
      > p:first-of-type {
        font-size: 1.2rem;
      }
      > p:last-of-type {
        color: #999;
        margin: 0.5rem 0;
      }
      .link-download {
        .bgc(@green);
        color: #fff;
        padding: .7rem .5rem;
        font-size: 1.2rem;
        border-radius: 0.3rem;
      }
    }
  }
</style>
