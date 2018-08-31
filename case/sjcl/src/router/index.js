import App from '../App'

const index = r => require.ensure([], () => r(require('../views/index/index')), 'index')
const category = r => require.ensure([], () => r(require('../views/category/category')), 'category')
const cart = r => require.ensure([], () => r(require('../views/cart/cart')), 'cart')
const goodsList = r => require.ensure([], () => r(require('../views/goodsList/goodsList')), 'goodsList')
const search = r => require.ensure([], () => r(require('../views/search/search')), 'search')
const goodsDetail = r => require.ensure([], () => r(require('../views/goodsDetail/goodsDetail')), 'goodsDetail')


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
            component: index
        },
        {
            path: '/category',
            component: category
        },
        {
            path: '/goodsList',
            component: goodsList
        },
        {
        	path: '/cart',
        	component:cart
        },
        {
            path: '/search',
            component: search
        },
        {
            path: '/goodsDetail',
            component: goodsDetail
        }
    ]
}]