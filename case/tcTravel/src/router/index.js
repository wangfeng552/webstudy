import App from '../App'
import {OrderDownRouter} from '../views/orderDown/router'
import sceneryDetailsRouter from './sceneryDetails';

const index = r => require.ensure([], () => r(require('../views/index/index')), 'index')
const cityList = r => require.ensure([], () => r(require('../views/cityList/cityList')), 'cityList')
const orderList = r => require.ensure([], () => r(require('../views/orderList/orderList')), 'orderList')
const orderdetail = r => require.ensure([], () => r(require('../views/orderdetail/orderdetail')), 'orderdetail')
const applyRefund = r => require.ensure([], () => r(require('../views/applyRefund/applyRefund')), 'applyRefund')
const refundProgress = r => require.ensure([], () => r(require('../views/refundProgress/refundProgress')), 'refundProgress')



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
            name:'index',
            meta:{
                keepAlive:true
            }
        },
        {
            path: '/cityList',
            component: cityList,
            name:'cityList',
            meta:{
                keepAlive:true
            }
        },
        {
            path: '/orderList',
            component: orderList,
            name:'orderList',
            meta:{
             keepAlive:false
            }
        },
       {
            path: '/applyRefund',
            component: applyRefund,
            name:'applyRefund',
            meta:{
              keepAlive:false
            }
        },
        {
            path: '/refundProgress',
            component: refundProgress,
            name:'refundProgress',
            meta:{
              keepAlive:false
            }
        },
        {
            path: '/orderdetail',
            component: orderdetail,
            name:'orderDetail'
        },
        ...OrderDownRouter,
        ...sceneryDetailsRouter
    ]
}]
