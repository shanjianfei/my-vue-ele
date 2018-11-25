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
<style>
  .voucher-description-container > div:first-child {
    display: flex;
    flex-direction: row-reverse;
    padding: 1rem;
  }
  .voucher-description-container > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .voucher-description-container > div:last-child > img {
    width: 9rem;
    height: 5.2rem;
  }
  .voucher-description-container > div:last-child > p:first-of-type {
    font-size: 1.2rem;
  }
  .voucher-description-container > div:last-child > p:last-of-type {
    color: #999;
    margin: 0.5rem 0;
  }
  .link-download {
    background-color: #56d176;
    color: #fff;
    padding: .7rem .5rem;
    font-size: 1.2rem;
    border-radius: 0.3rem;
  }
</style>
