import axios from 'axios'
import {getStore} from '@/commonApi/localStorage'
axios.defaults.withCredentials = true

export const isLogin = () => {
  let userId = getStore('user_id')
  if (userId) {
    return true
  }
  return false
}

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
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getRestaurantDetailInfo = (restaurantId) => {
  let url = 'https://elm.cangdu.org/shopping/restaurant/' + restaurantId
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const addToCart = (restaurantId, geohash, entities) => {
  let url = 'https://elm.cangdu.org/v1/carts/checkout'
  return new Promise(function (resolve, reject) {
    axios.post(url, {
      restaurant_id: restaurantId,
      geohash: geohash,
      entities: entities
    })
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const searchAddress = (keyword, type) => {
  let url = 'https://elm.cangdu.org/v1/pois?keyword=' + keyword + '&type=' + type
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        resolve(response.data)
      })
  })
}

export const getRemarks = cartId => {
  let url = 'https://elm.cangdu.org/v1/carts/' + cartId + '/remarks'
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getCaptcha = () => {
  let url = 'https://elm.cangdu.org/v1/captchas'
  return new Promise(function (resolve, reject) {
    axios.post(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const searchRestaurants = (geohash, key) => {
  let url = 'https://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash=' + geohash + '&keyword=' + key
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getUserInfo = userId => {
  let url = 'https://elm.cangdu.org/v1/user?user_id=' + userId
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getDeliveryAddress = userId => {
  let url = 'https://elm.cangdu.org/v1/users/' + userId + '/addresses'
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const getProfileExplain = () => {
  let url = 'https://elm.cangdu.org/v3/profile/explain'
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const membershipCard = (userId) => {
  let url = 'https://elm.cangdu.org/member/v1/users/' + userId + '/delivery_card/physical_card/bind'
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const login = (username, password, captchaCode) => {
  let url = 'https://elm.cangdu.org/v2/login'
  return new Promise(function (resolve, reject) {
    axios.post(url, {
      username,
      password,
      captcha_code: captchaCode
    })
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const uploadProfilePhoto = (userId, formData) => {
  let url = 'https://elm.cangdu.org/eus/v1/users/' + userId + '/avatar'
  return new Promise(function (resolve, reject) {
    axios.post(url, formData)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}

export const resetPassword = (username, oldpassWord, newpassword, confirmpassword, captchaCode) => {
  let url = 'https://elm.cangdu.org/v2/changepassword'
  let formData = {
    username,
    oldpassWord,
    newpassword,
    confirmpassword,
    captcha_code: captchaCode
  }
  return new Promise(function (resolve, reject) {
    axios.post(url, formData)
      .then(function (response) {
        if (response.status === 200) {
          resolve(response.data)
        }
      })
  })
}
