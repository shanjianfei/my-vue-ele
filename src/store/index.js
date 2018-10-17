import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  dishes: {
  },
  numberDishes: 0
}

const mutations = {
  incrementNumberDishes (state) {
    state.numberDishes++
  },
  decrementNumberDishes (state) {
    if (state.numberDishes > 0) {
      state.numberDishes--
    }
  },
  updateDishes (state, item) {
    // flag为0减1，为1加1
    let itemId = item.itemId
    let flag = item.flag
    if (flag === 1) {
      if (!(itemId in state.dishes)) {
        Vue.set(state.dishes, itemId, flag)
      } else {
        state.dishes[itemId] += 1
      }
    } else if (flag === 0) {
      if (state.dishes[itemId] > 0) {
        state.dishes[itemId] -= 1
      }
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
