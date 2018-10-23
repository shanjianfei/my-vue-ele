import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], rquire => r(require('../page/home')), 'home')
const city = r => require.ensure([], rquire => r(require('../page/city')), 'city')
const shopsGuide = r => require.ensure([], require => r(require('../page/shopsGuide')), 'shopsGuide')
// const ratingStar = r => require.ensure([], require => r(require('../components/common/ratingStar')), 'ratingStar')
const shop = r => require.ensure([], require => r(require('../page/shop')), 'shop')
const shopDetail = r => require.ensure([], require => r(require('../page/shopDetail')), 'shopDetail')
const order = r => require.ensure([], require => r(require('../page/order')), 'order')
const chooseDeliveryAddress = r => require.ensure([], require => r(require('../page/order/children/chooseDeliveryAddress')), 'chooseDeliveryAddress')
const addAddress = r => require.ensure([], require => r(require('../page/order/children/children/addAddress')), 'addAddress')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/city/:cityId',
      name: 'city',
      component: city
    },
    {
      path: '/shopsGuide',
      name: 'shopsGuide',
      component: shopsGuide
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/shopDetail',
      name: 'shopDetail',
      component: shopDetail
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/chooseDeliveryAddress',
      name: 'chooseDeliveryAddress',
      component: chooseDeliveryAddress,
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    }

  ]
})
