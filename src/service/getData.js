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
  let imageUrl = imagePath ? imageBaseUrl + imagePath : imageBaseUrl + 'default.jpg'
  return imageUrl
}

export const getImageUrlByCdn = (imagePath) => {
  let imageBaseUrl = 'https://fuss10.elemecdn.com/'
  let suffix = ''
  if (imagePath) {
    if (imagePath.endsWith('jpeg')) {
      suffix = '.jpeg'
    } else {
      suffix = '.png'
    }
  } else {
    return 'https://elm.cangdu.org/img/default.jpg'
  }
  let _imagePath = imagePath.substr(0, 1) + '/' + imagePath.substr(1, 2) + '/' + imagePath.substr(3) + suffix
  let imageUrl = imageBaseUrl + _imagePath
  return imageUrl
}

export const getRatingsTags = (restaurantId) => {
  let url = 'https://elm.cangdu.org/ugc/v2/restaurants/' + restaurantId + '/ratings/tags'
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getAssessmentInfo = (restaurantId, tagName, offset, limit) => {
  let url = 'https://elm.cangdu.org/ugc/v2/restaurants/' + restaurantId + '/ratings?offset=' + offset + '&limit=' + limit + '&tag_name=' + tagName
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        console.log(100)
        console.log(response)
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getScore = (restaurantId) => {
  let url = 'https://elm.cangdu.org/ugc/v2/restaurants/' + restaurantId + '/ratings/scores'
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        console.log(101)
        console.log(response)
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}
