<template>
  <div class="add-address">
    <head-top class="header">
      <arrow-left slot="head-left"></arrow-left>
      <head-title slot="head-center" headTitle="添加地址"></head-title>
    </head-top>
    <div class="address-info">
      <p class="contact">
        <span class="contact-left">联系人</span>
        <span class="contact-right name-sex">
          <p class="contact-name">
            <input class="contact-input" type="text" name="contact-name" placeholder="你的名字" v-model="username">
          </p>
          <p class="contact-sex">
            <section @click="click(1)">
              <svg :class="['select-icon', {'choosed' : sex === 1}]" fill="#f1f1f1">
                <use xlink:href="#select"></use>
              </svg>
              <label>先生</label>
            </section>
            <section @click="click(2)">
              <svg :class="['select-icon', {'choosed' : sex === 2}]" fill="#f1f1f1">
                <use xlink:href="#select"></use>
              </svg>
              <label>女士</label>
            </section>
          </p>
        </span>
      </p>
      <p class="contact contact-tel">
        <span class="contact-left">联系电话</span>
        <section class="contact-right contact-input">
          <section>
            <input type="text" name="contact-tel" placeholder="你的手机号码" v-model="telNum">
            <img src="@/images/add_phone.png">
          </section>
          <input class="contact-right contact-input" type="text" name="contact-tel" placeholder="备用号码" v-model="telNum">
        </section>
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
    <div class="contact-submit" @click="submit">确定</div>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import headTitle from '@/components/head/children/headTitle'
import {addDeliveryAddress} from '@/service/getData'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      username: null,
      sex: 1,
      telNum: null,
      address: null, // 标签类型，2:家，3:学校，4:公司
      phone_bk: null // 备用电话
    }
  },
  computed: mapState({
    deliveryAddress: state => state.addAddress.deliveryAddress
  }),
  methods: {
    click: function (sex) {
      this.sex = sex
    },
    submit: function () {
      addDeliveryAddress(user_id, address, address_detail, geohash, this.username, this.telNum, tag, this.sex, this.phone_bk, this.address)
    }
  },
  components: {headTop, headTitle, arrowLeft}
}
</script>
<style scoped lang="less">
  @import '~assets/less/common.less';
  input{
    border: 0;
    outline: none;
    height: 2rem;
    width: 100%;
    padding: 0;
  }
  .select-icon {
    .wh(1rem, 1rem);
  }
  .contact-sex {
    .flex(@jc: flex-start);
    padding: 0.5rem 0;
    border-top: 0.05rem solid #f1f1f1;
    section {
      .flex(@jc: flex-start);
      margin-right: 1rem;
    }
    svg {
      margin-right: .2rem;
    }
  }
  .contact-tel {
    > section {
      .flex(@fd: column);
      > section {
        width: 100%;
        .flex(@jc: flex-start);
      }
      img {
        .wh(1rem, 1rem);
      }
    }
  }
  .choosed {
    fill: #4cd964;
  }
  .address-info {
    .bgw;
    margin-top: 2.8rem;
    padding-top: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .contact {
    .flex(@ai: flex-start);
    border-top: 0.05rem solid #f1f1f1;
    padding: 1rem;
    .contact-left {
      flex: 3;
      line-height: 2.05rem;
    }
    .contact-right {
      flex: 7;
    }
  }
  .contact-address {
    padding: 0.5rem 0;
    border-top: 0.05rem solid #f1f1f1;
  }
  .search-contact-address {
    height: 2rem;
  }
  .contact-submit {
    line-height: 2.5rem;
    color: #fff;
    border-radius: 0.5rem;
    border: 0;
    background-color: #4cd964;
    margin: 0 1rem;
    margin-top: 1rem;
    text-align: center;
  }
</style>
