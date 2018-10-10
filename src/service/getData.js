const baseUrl = "https://elm.cangdu.org/v1/cities?type=guess"

import axios from "axios"

export const getShopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  })
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };

  let query = '?'
  Object.keys(data).forEach(function (item, index) {
    query += (item + '=' + data[item] + '&')
  })
  query = query.slice(0, -1)
  let url = 'https://elm.cangdu.org/shopping/restaurants'
  url += query
  console.log(url)
  return new Promise(function(resolve, reject) {
    axios.get(url)
    .then(function (response) {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        resolve([])
      }
    })
  })
}

export const getShippingMethod = (latitude, longitude) => {
  let url = 'https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes'
  url = url + '?latitude=' + latitude + '&longitude=' + longitude
  return new Promise(function (resolve, reject) {
    axios.get(url)
    .then(function (response) {
      if (response.status === 200) {
        resolve(response.data)
      }
    })
  })
}

export const getFoodMenu = (restaurant_id) => {
  let url = 'https://elm.cangdu.org/shopping/v2/menu?restaurant_id=' + restaurant_id
  return new Promise(function(resolve, reject) {
    axios.get(url)
      .then(function(response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}