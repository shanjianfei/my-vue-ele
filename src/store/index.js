import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const shopDetail = {
  state: {
    selectFood: [] // {restaurantId: [{id:1, specfoods:[]}]}
  },
  mutations: {
    updateSelectFood: function (state, selectFood) {
      state.selectFood = selectFood
    }
  }
}

const addAddress = {
  state: {
    addAddressInfo: {
      username: null,
      sex: 1,
      telNum: null,
      address_detail: '',
      phone_bk: '', // 备用电话
      tag: null
    },
    deliveryAddress: {}
  },
  mutations: {
    updateDeliveryAddress: function (state, deliveryAddress) {
      state.deliveryAddress = deliveryAddress
    },
    updateAddressInfo: function (state, addAddressInfo) {
      state.addAddressInfo = addAddressInfo
    }
  }
}

export default new Vuex.Store({
  state: {
    geohash: ''
  },
  mutations: {
    updateGeohash: function (state, geohash) {
      state.geohash = geohash
    }
  },
  modules: {
    shopDetail,
    addAddress
  }
})
