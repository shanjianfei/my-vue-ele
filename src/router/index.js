import Vue from 'vue'
import Router from 'vue-router'
import {isLogin} from '@/service/getData'

Vue.use(Router)

const home = r => require.ensure([], rquire => r(require('../page/home')), 'home')
const city = r => require.ensure([], rquire => r(require('../page/city')), 'city')
const shopsGuide = r => require.ensure([], require => r(require('../page/shopsGuide')), 'shopsGuide')
const shop = r => require.ensure([], require => r(require('../page/shop')), 'shop')
const shopDetail = r => require.ensure([], require => r(require('../page/shopDetail')), 'shopDetail')
const order = r => require.ensure([], require => r(require('../page/order')), 'order')
const chooseDeliveryAddress = r => require.ensure([], require => r(require('../page/order/children/chooseDeliveryAddress')), 'chooseDeliveryAddress')
const addAddress = r => require.ensure([], require => r(require('../page/order/children/children/addAddress')), 'addAddress')
const searchAddress = r => require.ensure([], require => r(require('../page/order/children/children/children/searchAddress')), 'searchAddress')
const orderComments = r => require.ensure([], require => r(require('../page/order/children/orderComments')), 'orderComments')
const login = r => require.ensure([], require => r(require('../page/login')), 'login')
const accountInfo = r => require.ensure([], require => r(require('../page/accountInfo')), 'accountInfo')
const changeUsername = r => require.ensure([], require => r(require('../page/accountInfo/children/changeUsername')), 'changeUsername')
const resetPassword = r => require.ensure([], require => r(require('../page/accountInfo/children/resetPassword')), 'resetPassword')
const editAddress = r => require.ensure([], require => r(require('../page/accountInfo/children/editAddress')), 'editAddress')
const addNewAddress = r => require.ensure([], require => r(require('../page/accountInfo/children/children/addNewAddress')), 'addNewAddress')
const search = r => require.ensure([], require => r(require('../page/search')), 'search')
const profile = r => require.ensure([], require => r(require('../page/profile')), 'profile')
const membershipCard = r => require.ensure([], require => r(require('../page/membershipCard')), 'membershipCard')
const exchangeMembership = r => require.ensure([], require => r(require('../page/membershipCard/children/exchangeMembership')), 'exchangeMembership')
const serviceCenter = r => require.ensure([], require => r(require('../page/serviceCenter')), 'serviceCenter')
const servceDescription = r => require.ensure([], require => r(require('../page/serviceCenter/children/serviceDescription')), 'servceDescription')
const download = r => require.ensure([], require => r(require('../page/download')), 'download')
const balance = r => require.ensure([], require => r(require('../page/balance')), 'balance')
const balanceDescription = r => require.ensure([], require => r(require('../page/balance/children/balanceDescription')), 'balanceDescription')
const points = r => require.ensure([], require => r(require('../page/points')), 'points')
const pointsDescription = r => require.ensure([], require => r(require('../page/points/children/pointsDescription')), 'pointsDescription')
const coupon = r => require.ensure([], require => r(require('../page/profile/children/coupon')), 'coupon')
const couponDescription = r => require.ensure([], require => r(require('../page/profile/children/children/couponDescription')), 'couponDescription')

let router = new Router({
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
      component: chooseDeliveryAddress
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
    {
      path: '/searchAddress',
      name: 'searchAddress',
      component: searchAddress
    },
    {
      path: '/orderComments',
      name: 'orderComments',
      component: orderComments
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/accountInfo',
      name: 'accountInfo',
      component: accountInfo,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/balance',
      name: 'balance',
      component: balance
    },
    {
      path: '/profile/balance/balanceDescription',
      name: 'balanceDescription',
      component: balanceDescription
    },
    {
      path: '/profile/points',
      name: 'points',
      component: points
    },
    {
      path: '/profile/points/pointsDescription',
      name: 'pointsDescription',
      component: pointsDescription
    },
    {
      path: '/profile/coupon',
      name: 'coupon',
      component: coupon,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/points/couponDescription',
      name: 'couponDescription',
      component: couponDescription,
      meta: { requiresAuth: true }
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      component: editAddress,
      meta: { requiresAuth: true }
    },
    {
      path: '/accountInfo/changeUsername',
      name: 'changeUsername',
      component: changeUsername,
      meta: { requiresAuth: true }
    },
    {
      path: '/accountInfo/resetPassword',
      name: 'resetPassword',
      component: resetPassword,
      meta: { requiresAuth: true }
    },
    {
      path: '/addNewAddress',
      name: 'addNewAddress',
      component: addNewAddress
    },
    {
      path: '/search/:geohash',
      name: 'search',
      component: search
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/membershipCard',
      name: 'membershipCard',
      component: membershipCard
    },
    {
      path: '/membershipCard/exchangeMembership',
      name: 'exchangeMembership',
      component: exchangeMembership
    },
    {
      path: '/serviceCenter',
      name: 'serviceCenter',
      component: serviceCenter
    },
    {
      path: '/serviceCenter/servceDescription',
      name: 'servceDescription',
      component: servceDescription
    },
    {
      path: '/download',
      name: 'download',
      component: download
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLogin()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
