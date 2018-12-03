<template>
  <div class="add-address">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">添加地址</span>
    </head-top>
    <div class="address-info">
      <p class="contact">
        <span class="contact-left">联系人</span>
        <span class="contact-right name-sex">
          <p class="contact-name">
            <input class="contact-input" type="text" name="contact-name" placeholder="你的名字" v-model="username">
          </p>
          <p class="contact-sex">
            <input type="radio" name="contact-sex" v-model="sex" value="1">先生
            <input type="radio" name="contact-sex" v-model="sex" value="0">女士
          </p>
        </span>
      </p>
      <p class="contact contact-tel">
        <span class="contact-left">联系电话</span>
        <input class="contact-right contact-input" type="text" name="contact-tel" placeholder="你的手机号码" v-model="telNum">
      </p>
      <p class="contact delivery-address">
        <span class="contact-left">送餐地址</span>
        <span class="contact-right">
          <router-link class="search-contact-address" to="/searchAddress" tag="div">
            <span v-if="deliveryAddress">{{deliveryAddress.name}}</span>
            <span v-else>小区/写字楼/学校等</span>
          </router-link>
          <input class="contact-input contact-address" type="text" name="contact-address" placeholder="详细地址（如门牌号等）">
        </span>
      </p>
      <p class="contact">
        <span class="contact-left">标签</span>
        <input class="contact-right contact-input" type="text" placeholder="无/家/学校/公司" v-model="address">
      </p>
    </div>
    <div class="contact-submit">确定</div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      username: null,
      sex: 1,
      telNum: null,
      address: null

    }
  },
  computed: mapState({
    deliveryAddress: state => state.addAddress.deliveryAddress
  }),
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
  .address-info {
    margin-top: 2.8rem;
    padding-top: 0.5rem;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  .contact {
    display: flex;
    flex-direction: row;
    border-top: 0.05rem solid #f1f1f1;
    padding: 1rem;
  }
  .contact-left {
    flex: 3;
    line-height: 2.05rem;
  }
  .contact-right {
    flex: 7;
  }
  .contact-input{
    border: 0;
    outline: none;
    height: 2rem;
    width: 100%;
    padding: 0;
  }
  .contact-sex, .contact-address {
    padding: 0.5rem 0;
    border-top: 0.05rem solid #f1f1f1;
  }

  .search-contact-address {
    height: 2rem;
  }

  .contact-submit {
    line-height: 3rem;
    color: #fff;
    border-radius: 0.5rem;
    border: 0;
    background-color: #4cd964;
    margin: 0 1rem;
    margin-top: 1rem;
    text-align: center;
  }
</style>
