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
    deliveryAddress: null
  },
  mutations: {
    updateDeliveryAddress: function (state, deliveryAddress) {
      state.deliveryAddress = deliveryAddress
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
