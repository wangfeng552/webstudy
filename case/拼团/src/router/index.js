import App from '../App'

const index = r => require.ensure([], () => r(require('../views/index/index')), 'index')
const bookingList = r => require.ensure([], () => r(require('../views/bookingList/bookingList')), 'bookingList')
const groupingList = r => require.ensure([], () => r(require('../views/groupingList/groupingList')), 'groupingList')
const orderConfirm = r => require.ensure([], () => r(require('../views/orderConfirm/orderConfirm')), 'orderConfirm')
const paySuccess = r => require.ensure([], () => r(require('../views/paySuccess/paySuccess')), 'paySuccess')
const detail = r => require.ensure([], () => r(require('../views/detail/index')), 'detail');
export default [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index,
      name: 'index',
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/bookingList',
      component: bookingList,
      name: 'bookingList',
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/groupingList',
      component: groupingList,
      name: 'groupingList',
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orderConfirm',
      component: orderConfirm,
      name: 'orderConfirm',
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/paySuccess',
      component: paySuccess,
      name: 'paySuccess',
      meta: {
        keepAlive: false
      }
    },
		{
			path: '/detail',
      component: detail,
      name: 'detail',
      meta: {
        keepAlive: false
      }
		}

  ]
}]
