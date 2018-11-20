<template>
  <div class="account-info-page">
    <head-top class="header">
      <section slot="head-goback" class="head-goback" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </section>
      <span class="point-title" slot="point-title">账户信息</span>
    </head-top>
    <div class="account-info-container">
      <section class="base-info">
        <div class="item profile-photo" @click="selectProfilePhoto">
          <span>头像</span>
          <section class="item-right">
            <img :src="profilePhoto">
            <arrow-right></arrow-right>
          </section>
          <input id="upload-profile-photo-input" type="file" name="profilePhoto" style="display: none" @change="uploadProfilePhoto">
        </div>
        <router-link class="item username" to="/accountInfo/changeUsername">
          <span>用户名</span>
          <section class="item-right">
            <span>{{username}}</span>
            <arrow-right></arrow-right>
          </section>
        </router-link>
        <router-link class="item delivery-address" to="/editAddress">
          <span>收货地址</span>
          <arrow-right></arrow-right>
        </router-link>
      </section>
      <section class="account-bind">
        <p>账号绑定</p>
        <router-link to="" @click.native="bindAccount">
          <section>
            <img src="@/images/bindphone.png">
            <span>手机</span>
          </section>
          <arrow-right></arrow-right>
        </router-link>
      </section>
      <section class="security-setting">
        <p>账号安全</p>
        <router-link to="/accountInfo/resetPassword">
          <span>密码登录</span>
          <section>
            <span>修改</span>
            <arrow-right></arrow-right>
          </section>
        </router-link>
      </section>
      <button-submit text="退出登录" lh="2.5rem" bg="#d8584a" @submit="logout"></button-submit>
    </div>
    <alert-message :show="showTip" :message="alertMessage" @closeTip="closeTip"></alert-message>
  </div>
</template>
<script>
import headTop from '@/components/head/head'
import arrowRight from '@/components/common/arrowRight'
import buttonSubmit from '@/components/common/buttonSubmit'
import {isLogin, getUserInfo, getImageUrl, uploadProfilePhoto} from '@/service/getData'
import {getStore, setStore, clearStore} from '@/commonApi/localStorage'
import alertMessage from '@/components/common/alertMessage'
export default {
  data () {
    return {
      userId: null,
      username: '',
      profilePhoto: '',
      showTip: false,
      alertMessage: ''
    }
  },
  mounted: function () {
    if (isLogin) {
      let userInfo = JSON.parse(getStore('user'))
      this.userId = userInfo.user_id
      this.username = userInfo.username
      this.profilePhoto = getImageUrl(userInfo.avatar)
    }
  },
  methods: {
    selectProfilePhoto: function () {
      let upload = document.getElementById('upload-profile-photo-input')
      upload.click()
    },
    uploadProfilePhoto: function () {
      let upload = document.getElementById('upload-profile-photo-input')
      let fileObj = upload.files[0]
      var form = new FormData() // FormData 对象
      form.append('file', fileObj) // 文件对象
      let self = this
      uploadProfilePhoto(this.userId, form)
        .then(function (data) {
          if (data.status === 1) {
            getUserInfo()
              .then(function (data) {
                setStore('user', JSON.stringify(data))
                self.profilePhoto = getImageUrl(data.avatar)
              })
          } else {
            self.showTip = true
            self.alertMessage = '上传头像失败'
          }
        })
    },
    bindAccount: function () {
      this.showTip = true
      this.alertMessage = '请在手机APP中设置'
    },
    logout: function () {
      clearStore()
      this.$router.go(-1)
    },
    closeTip: function () {
      this.showTip = false
      this.alertMessage = ''
    }
  },
  components: {headTop, arrowRight, alertMessage, buttonSubmit}
}
</script>
<style>
  .account-info-container {
    padding-top: 3.5rem;
  }
  .item {
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 3.5rem;
    background-color: #fff;
    border-bottom: 0.05rem solid #ccc;
  }
  .profile-photo {
    border-top: 0.05rem solid #ccc;
    line-height: 4.5rem;
  }
  .profile-photo img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .item-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .arrow-right {
    margin-left: 0.5rem;
  }
  .account-bind img {
    margin-right: 0.5rem;
  }
  .account-bind > a, .account-bind > p, .security-setting > a, .security-setting > p {
    line-height: 3.5rem;
    padding: 0 1rem;
  }
  .account-bind > a, .security-setting > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 0.05rem solid #ccc;
    border-top: 0.05rem solid #ccc;
  }
  .account-bind > p, .security-setting > p {
    font-size: 0.8rem;
  }
  .account-bind > a > section, .security-setting > a > section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .button-submit {
    margin: 2rem 0.7rem 0 0.7rem;
  }
</style>
