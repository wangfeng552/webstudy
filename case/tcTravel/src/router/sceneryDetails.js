const sceneryDetails = r => require.ensure([], () => r(require('../views/sceneryDetails/sceneryDetails')), 'sceneryDetails')
const sceneryDetailsIntroduce = r => require.ensure([], () => r(require('../views/sceneryDetails/sceneryDetailsIntroduce')), 'sceneryDetailsIntroduce')
const sceneryDetailsTicketInfo = r => require.ensure([], () => r(require('../views/sceneryDetails/sceneryDetailsTicketInfo')), 'sceneryDetailsTicketInfo')
const sceneryDetailsTips = r => require.ensure([], () => r(require('../views/sceneryDetails/sceneryDetailsTips')),'sceneryDetailsTips')
const sceneryMap = r => require.ensure([], () => r(require('../views/sceneryDetails/sceneryMap')),'sceneryMap')
const sceneryPic = r => require.ensure([], () => r(require('../views/sceneryDetails/sceneryPic')),'sceneryPic')

export default  [
        {
            path: '/sceneryDetails/:sceneryId',
            component: sceneryDetails,
            name:"sceneryDetails",
            meta:{
                keepAlive:true
            }
        },
        {
            //path: '/sceneryDetailsIntroduce/:title/:info',
            path: '/sceneryDetailsIntroduce',
            component: sceneryDetailsIntroduce,
            name:"sceneryDetailsIntroduce"
        },
        {
            path: '/sceneryDetailsTicketInfo',
            component: sceneryDetailsTicketInfo,
            name:"sceneryDetailsTicketInfo"
        },
        {
            path: '/sceneryDetailsTips',
            component: sceneryDetailsTips,
            name:"sceneryDetailsTips"
        },
        {
            path: '/sceneryMap',
            component: sceneryMap,
            name:"sceneryMap"
        },
        {
            path: '/sceneryPic',
            component: sceneryPic,
            name:"sceneryPic"
        }
    ]
