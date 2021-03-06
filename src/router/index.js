import Vue from 'vue'
import Router from 'vue-router'
import {isLogin} from '@/service/getData'

Vue.use(Router)

const home = r => require.ensure([], rquire => r(require('../page/home')), 'home')
const city = r => require.ensure([], rquire => r(require('../page/city')), 'city')
const shopsGuide = r => require.ensure([], require => r(require('../page/shopsGuide')), 'shopsGuide')
const recommendRestaurant = r => require.ensure([], require => r(require('../page/shopsGuide/recommendRestaurant')), 'recommandRestaurant')
const shopDetail = r => require.ensure([], require => r(require('../page/shopsGuide/shopDetail')), 'shopDetail')
const shopDescription = r => require.ensure([], require => r(require('../page/shopsGuide/shopDetail/shopDescription')), 'shopDescription')
const food = r => require.ensure([], require => r(require('../page/shopsGuide/shopDetail/children/food')), 'food')
const evaluate = r => require.ensure([], require => r(require('../page/shopsGuide/shopDetail/children/evaluate')), 'evaluate')

const publicity = r => require.ensure([], require => r(require('../page/shopsGuide/shopDetail/shopDescription/children/publicity')), 'publicity')

const order = r => require.ensure([], require => r(require('../page/order')), 'order')
const orderDetail = r => require.ensure([], require => r(require('../page/order/children/orderDetail')), 'orderDetail')

const confirmOrder = r => require.ensure([], require => r(require('../page/confirmOrder')), 'confirmOrder')
const chooseDeliveryAddress = r => require.ensure([], require => r(require('../page/confirmOrder/children/chooseDeliveryAddress')), 'chooseDeliveryAddress')
const addAddress = r => require.ensure([], require => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
const searchAddress = r => require.ensure([], require => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
const orderComments = r => require.ensure([], require => r(require('../page/confirmOrder/children/orderComments')), 'orderComments')
const login = r => require.ensure([], require => r(require('../page/login')), 'login')
const accountInfo = r => require.ensure([], require => r(require('../page/accountInfo')), 'accountInfo')
const changeUsername = r => require.ensure([], require => r(require('../page/accountInfo/children/changeUsername')), 'changeUsername')
const resetPassword = r => require.ensure([], require => r(require('../page/accountInfo/children/resetPassword')), 'resetPassword')
const editAddress = r => require.ensure([], require => r(require('../page/accountInfo/children/editAddress')), 'editAddress')
const addNewAddress = r => require.ensure([], require => r(require('../page/accountInfo/children/children/addNewAddress')), 'addNewAddress')
const search = r => require.ensure([], require => r(require('../page/search')), 'search')

const profile = r => require.ensure([], require => r(require('../page/profile')), 'profile')

const balance = r => require.ensure([], require => r(require('../page/profile/balance')), 'balance')
const balanceDescription = r => require.ensure([], require => r(require('../page/profile/balance/children/balanceDescription')), 'balanceDescription')

const coupon = r => require.ensure([], require => r(require('../page/profile/coupon')), 'coupon')

const points = r => require.ensure([], require => r(require('../page/profile/points')), 'points')
const pointsDescription = r => require.ensure([], require => r(require('../page/profile/points/children/pointsDescription')), 'pointsDescription')

const overdueRedPackages = r => require.ensure([], require => r(require('../page/profile/coupon/children/redpackage/overdueRedPackages')), 'overdueRedPackages')
const redPackages = r => require.ensure([], require => r(require('../page/profile/coupon/children/redpackage/redPackages')), 'redPackages')
const redPackageDescription = r => require.ensure([], require => r(require('../page/profile/coupon/children/redpackage/children/redPackageDescription')), 'redPackageDescription')

const voucher = r => require.ensure([], require => r(require('../page/profile/coupon/children/voucher/')), 'voucher')
const voucherDescription = r => require.ensure([], require => r(require('../page/profile/coupon/children/voucher/children/voucherDescription')), 'voucherDescription')

const convertRedPackages = r => require.ensure([], require => r(require('../page/profile/coupon/children/convertRedPackages')), 'convertRedPackages')
const recommand = r => require.ensure([], require => r(require('../page/profile/coupon/children/recommand')), 'recommand')

const membershipCard = r => require.ensure([], require => r(require('../page/membershipCard')), 'membershipCard')
const purchaseRecord = r => require.ensure([], require => r(require('../page/membershipCard/children/purchaseRecord')), 'purchaseRecord')
const payOnline = r => require.ensure([], require => r(require('../page/membershipCard/children/payOnline')), 'payOnline')
const vipDescription = r => require.ensure([], require => r(require('../page/membershipCard/children/vipDescription')), 'vipDescription')

const exchangeMembership = r => require.ensure([], require => r(require('../page/membershipCard/children/exchangeMembership')), 'exchangeMembership')
const serviceCenter = r => require.ensure([], require => r(require('../page/serviceCenter')), 'serviceCenter')
const servceDescription = r => require.ensure([], require => r(require('../page/serviceCenter/children/serviceDescription')), 'servceDescription')
const download = r => require.ensure([], require => r(require('../page/download')), 'download')

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
      path: '/shopsGuide/recommendRestaurant',
      name: 'recommendRestaurant',
      component: recommendRestaurant
    },
    {
      path: '/shopsGuide/shopDetail',
      redirect: '/shopsGuide/shopDetail/food',
      name: 'shopDetail',
      component: shopDetail,
      children: [
        {
          path: 'food',
          component: food
        },
        {
          path: 'evaluate',
          component: evaluate
        }
      ]
    },
    {
      path: '/shopsGuide/shopDetail/shopDescription',
      name: 'shopDescription',
      component: shopDescription
    },
    {
      path: '/shopsGuide/shopDetail/shopDescription/children/publicity',
      name: 'publicity',
      component: publicity
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
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
      path: '/confirmOrder/orderComments',
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
      path: '/order',
      name: 'order',
      component: order,
      meta: { requiresAuth: true }
    },
    {
      path: '/order/orderDetail',
      name: 'orderDetail',
      component: orderDetail,
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
      path: '/profile/coupon/overdueredpackages',
      name: 'overdueRedPackages',
      component: overdueRedPackages,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/coupon/convertredpackages',
      name: 'convertRedPackages',
      component: convertRedPackages,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/coupon/recommand',
      name: 'recommand',
      component: recommand,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/coupon',
      redirect: '/profile/coupon/redpackages',
      name: 'coupon',
      component: coupon,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'redpackages',
          component: redPackages
        },
        {
          path: 'voucher',
          component: voucher
        }
      ]
    },
    {
      path: '/profile/coupon/redpackages/redpackagedescription',
      name: 'redPackageDescription',
      component: redPackageDescription,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/coupon/voucher/voucherdescription',
      name: 'voucherDescription',
      component: voucherDescription,
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
      path: '/membershipCard/purchaseRecord',
      name: 'purchaseRecord',
      component: purchaseRecord
    },
    {
      path: '/membershipCard/payOnline',
      name: 'payOnline',
      component: payOnline
    },
    {
      path: '/membershipCard/vipDescription',
      name: 'vipDescription',
      component: vipDescription
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
