import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  dishes: {
  }, // {1: {unitPrice: 10, numberDishes: 2}}, unitPrice是单价， numberDishe是点了几份
  totalPrice: 0 // 点餐总价
}

const mutations = {
  updateDishes (state, item) {
    // flag为0减1，为1加1
    let itemId = item.itemId
    let flag = item.flag
    let unitPrice = item.unitPrice // 菜品单价
    if (flag === 1) {
      state.totalPrice += unitPrice
      if (!(itemId in state.dishes)) {
        let value = {
          unitPrice: unitPrice,
          numberDishes: 1
        }
        Vue.set(state.dishes, itemId, value)
      } else {
        state.dishes[itemId].numberDishes += 1
      }
    } else if (flag === 0) {
      if (itemId in state.dishes) {
        if (state.dishes[itemId].numberDishes > 0) {
          console.log(state.dishes)
          state.dishes[itemId].numberDishes -= 1
          state.totalPrice -= state.dishes[itemId].unitPrice
          console.log(state.dishes)
        }
      }
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
