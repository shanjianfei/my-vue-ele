<template>
  <div class="choose-delivery-address">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">选择地址</span>
    </head-top>
    <div class="cda-add-address" @click="addNewAddress">
      <img class="add-icon" src="@/images/add_address.png">
      <span>新增收货地址</span>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
export default {
  methods: {
    addNewAddress: function () {
      this.$router.push('/addAddress')
    }
  },
  components: {headTop}
}
</script>
<style>
  .head-goback {
    left: 0.4rem;
    width: 1.2rem;
    height: 1.5rem;
    line-height: 2.2rem;
    margin-left: .4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .point-title {
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.5rem;
  }

  .cda-add-address {
    position: fixed;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .add-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
  }

  .cda-add-address > span {
    font-size: 1.3rem;
    color: #3190e8;
  }
</style>
