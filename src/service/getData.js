import axios from 'axios'

export const getShopList = (latitude, longitude, offset, restaurantCategoryId = '', restaurantCategoryIds = '', orderBy = '', deliveryMode = '', supportIds = []) => {
  let supportStr = ''
  supportIds.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id
    }
  })
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurantCategoryId,
    'restaurant_category_ids[]': restaurantCategoryIds,
    orderBy,
    'delivery_mode[]': deliveryMode + supportStr
  }

  let query = '?'
  Object.keys(data).forEach(function (item, index) {
    query += (item + '=' + data[item] + '&')
  })
  query = query.slice(0, -1)
  let url = 'https://elm.cangdu.org/shopping/restaurants'
  url += query
  console.log(url)
  return new Promise(function (resolve, reject) {
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

export const getFoodMenu = (restaurantId) => {
  let url = 'https://elm.cangdu.org/shopping/v2/menu?restaurant_id=' + restaurantId
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getImageUrl = (imagePath) => {
  let imageBaseUrl = 'https://elm.cangdu.org/img/'
  let imageUrl = imageBaseUrl + imagePath
  return imageUrl
}
