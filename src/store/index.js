import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  currentRestaurantDetailInfo: {},
  dishes: {}, // {1: {unitPrice: 10, numberDishes: 2}}, unitPrice是单价， numberDishe是点了几份
  // {restaurantId: [{id:1, specfoods:[]}]}
}

function deepCopy(o) {
  if (o instanceof Array) {
    var n = [];
    for (var i = 0; i < o.length; ++i) {
        n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Function) {
    var n = new Function("return " + o.toString())();
    return n
  } else if (o instanceof Object) {
    var n = {}
    for (var i in o) {
        n[i] = deepCopy(o[i]);
    }
    return n;
  } else {
    return o;
  }
}

const mutations = {
  updateDishes (state, food) {
    let restaurantId = food.restaurantId
    let foodId = food.item.item_id
    let flag = food.flag // flag为0减1，为1加1
    let foods = state.dishes[restaurantId] // [food1, food2 , ...]
    // let unitPrice = food.item.specfoods[0].price // 菜品单价
    if (flag === 1) {
      if (!(restaurantId in state.dishes)) {
        let value = food.item
        value.numberDishes = 1
        Vue.set(state.dishes, restaurantId, [value])
      } else {
        let _exist = 0
        for (let i in foods) {
          if (foodId === foods[i].item_id) {
            let value = deepCopy(foods[i])
            value.numberDishes += 1
            Vue.set(foods, i, value)
            _exist++
            break
          }
        }
        if (!_exist) {
          // add new food
          let value = food.item
          value.numberDishes = 1
          foods.push(value)
          }
      }
    } else if (flag === 0) {
      if (restaurantId in state.dishes) {
        for (let i in foods) {
          if (foodId === foods[i].item_id) {
            let value = deepCopy(foods[i])
            let _n = value.numberDishes
            value.numberDishes = _n > 0? (_n - 1): 0
            Vue.set(foods, i, value)
            break
          }
        }
      }
    }
  },
  updateCurrentRestaurantDetailInfo: function (state, detailInfo) {
    state.currentRestaurantDetailInfo = detailInfo
  }
}

export default new Vuex.Store({
  state,
  mutations
})
