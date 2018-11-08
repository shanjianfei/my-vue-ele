<template>
  <div class="membership-card-page">
    <head-top>
      <arrow-left slot="head-goback"></arrow-left>
      <span class="point-title" slot="point-title">会员中心</span>
    </head-top>
    <div class="membership-card-container">
      <p>为账户fsj购买会员</p>
      <section class="vip-privilege">
        <router-link to="/abc" class="vip-description">
          <span>会员特权</span>
          <section>
            <span>会员说明</span>
            <arrow-right></arrow-right>
          </section>
        </router-link>
      </section>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import arrowRight from '@/components/common/arrowRight'
export default {
  components: {headTop, arrowLeft, arrowRight}
}
</script>
<style>
.membership-card-container {
  padding-top: 3rem;
}
.membership-card-container > p:first-child {
  padding: 1.1rem .8rem;
}
.vip-privilege {
  background-color: #fff;
}
.vip-description {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 3rem;
}
.vip-description > span:first-child {
  font-size: 1.2rem;
}
.vip-description > section {
  display: flex;
  align-items: center;
  /*text-align: center*/
  /*justify-content: space-between;*/
}
</style>
