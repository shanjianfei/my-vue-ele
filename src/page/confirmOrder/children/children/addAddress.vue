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
            <img src="@/images/add_phone.png" @click="showPhoneBk">
          </section>
          <input class="contact-right contact-input" type="text" name="contact-tel" placeholder="备用号码" v-model="phone_bk" v-if="phone_bk_show">
        </section>
      </p>
      <p class="contact delivery-address">
        <span class="contact-left">送餐地址</span>
        <span class="contact-right">
          <router-link class="search-contact-address" to="/searchAddress" tag="div">
            <span v-if="addAddressInfo.deliveryAddress">{{addAddressInfo.deliveryAddress.name}}</span>
            <span v-else>小区/写字楼/学校等</span>
          </router-link>
          <input class="contact-input contact-address" type="text" name="contact-address" placeholder="详细地址（如门牌号等）" v-model="address_detail">
        </span>
      </p>
      <p class="contact">
        <span class="contact-left">标签</span>
        <input class="contact-right contact-input" type="text" placeholder="无/家/学校/公司" v-model="tag">
      </p>
    </div>
    <div class="contact-submit" @click="submit">确定</div>
    <alert-message :message="alertMessage" :show="alertMessageShow" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowLeft from '@/components/common/arrowLeft'
import headTitle from '@/components/head/children/headTitle'
import alertMessage from '@/components/common/alertMessage'
import {addDeliveryAddress} from '@/service/getData'
import {mapState, mapMutations} from 'vuex'
import {deepCopy} from '@/commonApi/util'
import {getStore} from '@/commonApi/localStorage'
export default {
  data () {
    return {
      username: null,
      sex: 1,
      telNum: null,
      address_detail: '',
      phone_bk: '', // 备用电话
      phone_bk_show: false,
      tag: null,
      alertMessage: '',
      alertMessageShow: false
    }
  },
  beforeRouteLeave (to, from, next) {
    let data = deepCopy(this.addAddressInfo)
    data.username = this.username
    data.sex = this.sex
    data.telNum = this.telNum
    data.address_detail = this.address_detail
    data.phone_bk = this.phone_bk
    data.tag = this.tag
    this.updateDeliveryAddress(data)
    next()
  },
  mounted: function () {
    this.username = this.addAddressInfo.username
    this.sex = this.addAddressInfo.sex
    this.telNum = this.addAddressInfo.telNum
    this.address_detail = this.addAddressInfo.address_detail
    this.phone_bk = this.addAddressInfo.phone_bk
    this.tag = this.addAddressInfo.tag
  },
  computed: mapState({
    addAddressInfo: state => state.addAddress.addAddressInfo
  }),
  methods: {
    ...mapMutations(['updateDeliveryAddress']),
    click: function (sex) {
      this.sex = sex
    },
    showPhoneBk: function () {
      this.phone_bk_show = true
    },
    filter: function () {
      if (!this.username) {
        this.alertMessage = '请输入姓名'
        this.alertMessageShow = true
        return false
      }
      if (!this.telNum) {
        this.alertMessage = '请输入电话号码'
        this.alertMessageShow = true
        return false
      }
      if (!this.addAddressInfo.deliveryAddress) {
        this.alertMessage = '请输入送餐地址'
        this.alertMessageShow = true
        return false
      }
      if (!this.address_detail) {
        this.alertMessage = '请输入送餐地址详细地址'
        this.alertMessageShow = true
        return false
      }
      if (!this.tag) {
        this.alertMessage = '标签错误'
        this.alertMessageShow = true
        return false
      }
      return true
    },
    submit: function () {
      if (!this.filter()) {
        return
      }
      let self = this
      let userId = getStore('user_id')
      let geohash = this.addAddressInfo.deliveryAddress.geohash
      let address = this.addAddressInfo.deliveryAddress.name
      addDeliveryAddress(userId, address, this.address_detail, geohash, this.username, this.telNum, this.tag, this.sex, this.phone_bk, 1)
        .then(function (data) {
          self.$router.go(-1)
        })
    },
    closeTip: function () {
      this.alertMessage = ''
      this.alertMessageShow = false
    }
  },
  components: {headTop, headTitle, arrowLeft, alertMessage}
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
