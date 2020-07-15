// pages/trip/trip.js
const app = getApp()
const request = require('../../utils/request')
const QQMapWX = require('../../libs/qqmap-wx-jssdk.min');
var qqmapsdk;
Page({
  data: {
    orderID: "",
    longitude: '',
    latitude: '',
    polyline: "",
    mapKey: app.globalData.mapKey,
    currentOrderInfo: "",
    driverInfo: "",
    isCancelOrder: false,
    reasonValue: '',
    reasonType: [],
    cancelReason: '',
    startPoint: {
      longitude: '',
      latitude: ''
    },
    endPoint: {
      longitude: '',
      latitude: ''
    },
    showCancelDialog: false,
    cancelReason: ""
  },
  onLoad: function (options) {
    this.setData({
      orderID: options.orderid
    })
    qqmapsdk = new QQMapWX({
      key: this.data.mapKey
    });
    this.getAirportDetail()
  },
  getAirportDetail: function () {
    request.getAirportDetail({
      qmsj_mm_airport_order_id: this.data.orderID
    }).then(res => {
      wx.hideLoading()
      let resInfo = res.qmsj_mm_airport_order_info
      this.setData({
        currentOrderInfo: resInfo,
        driverInfo: resInfo.qmsj_mm_reservation_info,
        startPoint: {
          longitude: resInfo.start_longitude,
          latitude: resInfo.start_latitude
        },
        endPoint: {
          longitude: resInfo.end_longitude,
          latitude: resInfo.end_latitude
        }
      })
      this.queryMapRoutine()
    }).catch(err => {
      wx.hideLoading()
    })
  },
  submitUpCar: function () {
    wx.showLoading()
    request.submitUpCar({
      qmsj_mm_airport_order_id: this.data.orderID
    }).then(res => {
      this.getAirportDetail()
    }).catch(error => {
      wx.hideLoading()
    })
  },
  submitDownCar: function () {
    wx.showLoading()
    request.submitDownCar({
      qmsj_mm_airport_order_id: this.data.orderID
    }).then(res => {
      wx.showToast({
        title: '已送达',
      })
      this.getAirportDetail()
      // setTimeout(res => {
      //   wx.switchTab({
      //     url: '/pages/guide/guide',
      //   })
      // }, 2000)
    }).catch(error => {
      wx.hideLoading()
    })
  },
  // 查询地图路线
  queryMapRoutine(e) {
    var _this = this;
    
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving',
      from: _this.data.startPoint,
      to: _this.data.endPoint,
      success: function (res) {
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        let markersTemp = []
        let route = ret.result.routes[0]
        let distance = route.distance < 1000 ?
          `${route.distance}米` :
          `${(route.distance / 1000).toFixed(2)}公里`
        let duration = route.duration < 60 ?
          `${route.duration}分钟` :
          `${parseInt(route.duration / 60)}小时${route.duration % 60}分钟`
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        let startPoint = pl[0]
        let endPoint = pl[pl.length - 1]
        let midPoint = pl[((pl.length) / 2).toFixed(0)]
        markersTemp = [{
            iconPath: '../../images/icon3.png',
            id: 0,
            latitude: startPoint.latitude,
            longitude: startPoint.longitude,
            width: 28,
            height: 28,
            zIndex: -1,
            anchor: {
              x: 0.5,
              y: 1
            }
          },
          {
            iconPath: '../../images/icon4.png',
            id: 1,
            latitude: endPoint.latitude,
            longitude: endPoint.longitude,
            width: 28,
            height: 28,
            zIndex: -1,
            anchor: {
              x: 0.5,
              y: 1
            }
          },
          {
            id: 0,
            latitude: midPoint.latitude,
            longitude: midPoint.longitude,
            label: {
              content: '全程' + distance + '，约' + duration + '到达', //文本
              color: '#000000', //文本颜色
              borderRadius: 3, //边框圆角
              borderWidth: 1, //边框宽度
              borderColor: '#cccccc', //边框颜色
              bgColor: '#ffffff', //背景色
              padding: 5, //文本边缘留白
              textAlign: 'center' //文本对齐方式。有效值: left, right, center
            }
          }
        ]
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }],
          markers: markersTemp,
        })
      }
    });
  },
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '4007755001'
    })
  },
  makePhoneCallDriver: function (event) {
    let mobile = this.data.driverInfo.qmsj_driver_mobile
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  cancelAirOrder: function () {
    this.setData({
      showCancelDialog: true
    })
  },
  tapCancelButton: function (e) {
    let btnIndex = e.detail.index
    console.log(btnIndex)
    let data = {
      qmsj_mm_airport_order_id: this.data.orderID,
      cancel_type: 4,
      cancel_reason: this.data.cancelReason
    }
    if(btnIndex == 0){
      this.setData({
        showCancelDialog:false
      })
    }
    if (btnIndex == 1) {
      wx.showLoading()
      if(!this.data.cancelReason){
        wx.showToast({
          title: ' 请输入您取消订单的原因',
          icon: "none"
        })
        return
      }
      request.cancelAirOrder(data).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '取消成功',
          icon: "none"
        })
        setTimeout(res => {
          wx.switchTab({
            url: '/pages/guide/guide',
          })
        },2000)

      }).catch(err => {
        wx.hideLoading()
      })
      console.log('确认')
    }

  },
  goYuyue: function () {
    wx.switchTab({
      url: '/pages/yuyue/yuyue',
    })
  },
  goWenquan: function () {
    wx.navigateTo({
      url: '/pages/pingjia/pingjia?orderID=' + this.data.orderID,
    })
  }
})