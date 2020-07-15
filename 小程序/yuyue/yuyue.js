// pages/yuyue/yuyue.js
const request = require('../../utils/request.js')
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = date.getFullYear(); i <= date.getFullYear() + 1; i++) {
  years.push("" + i + '年');
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i + '月');
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i + '日');
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
// 获取当天的时间
let nowMonth = date.getMonth()
let nowDay = date.getDate() - 1
let nowHour = date.getHours()
let nowMinutes = date.getMinutes()

Page({
  data: {
    titleName: [{
        name: '接机',
      },
      {
        name: '送机',
      }
    ],
    titleIndex: 0, // 接送类型 0：接机 1：送机
    airportList: [],
    airportListIndex: '',
    codename: "获取验证码",
    msgDisable: false,
    isShowXieyi: false,
    city: "上海市",
    jieStartTitle: "",
    jiejiEndAddress: "",
    songjiStartAddress: "",
    songEndTitle: "",
    user: {
      type: 1, // 接送类型 1：接机 2：送机
      client_name: '', //姓名
      client_number: 1, // 乘客数量
      mobile: '',
      sms_code: '',
      qmsj_store_id: '', // 机场ID
      flight_time: '', // 航班起飞时间
      format_start_time: '', // 用车时间
      start_location: '', // 出发地
      end_location: '', // 目的地
      flight: '', // 航班号
      qmsj_driver_sn: '', //车管家编号
      qmsj_mm_airport_order_id: ''
    },
    // 日历
    timeCar: '',
    timeAir: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, nowMonth, nowDay, nowHour, nowMinutes],
    choose_year: '',
    // 确认订单
    isShowSureOrder: false,
    isShowXieyi: false,
    isShowSuccess: false,
    isShowXuzhi: false,
    sureStartAddress: "",
    sureEndAddress: "",
    picCode: '',
    picCodeURL: '',
    captchaKey: '',
    captcha_flag: 0
  },
  onLoad: function (options) {
    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })
  },
  onReady: function () {
    this.searchMap = this.selectComponent("#searchMap");
  },
  onShow: function () {
    var self = this
    wx.getStorage({
      key: 'userToken',
      success(res) {
        self.getAirportList()
      },
      fail() {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })

  },
  // 获取图片验证码
  getLoginByCaptcha: function () {
    wx.showLoading()
    request.getLoginByCaptcha({}).then(res => {
      let captchaData = res.captcha
      wx.hideLoading()
      this.setData({
        picCodeURL: captchaData.img,
        captchaKey: captchaData.key
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  showMpSearch: function () {
    if (!this.data.user.qmsj_store_id) {
      this.showToast('请先选择机场')
      return
    }
    this.searchMap.showDialog()
  },
  _selectLogEvent: function (e) {
    console.log(e)
    let location = e.detail.location
    var title = e.detail.title
    var tabIndex = this.data.titleIndex
    if (tabIndex == 0) {
      // 接机
      this.setData({
        jiejiEndAddress: title,
      })
    } else {
      this.setData({
        songjiStartAddress: title,
      })
    }
  },
  getAirportList: function () {
    wx.showLoading()
    request.getAirportList({}).then(res => {
      wx.hideLoading()
      this.setData({
        airportList: res.qmsj_airport_list
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 获取机场
  getAirport: function (e) {
    let airportListIndex = e.detail.value
    let self = this;
    let qmsj_store_id = self.data.airportList[airportListIndex]['qmsj_store_id']
    let city = self.data.airportList[airportListIndex]['area_city_name']
    let qmsj_store_name = self.data.airportList[airportListIndex]['qmsj_store_name']
    this.setData({
      airportListIndex: e.detail.value,
      'user.qmsj_store_id': qmsj_store_id,
      city: city,
      jieStartTitle: qmsj_store_name,
      songEndTitle: qmsj_store_name
    })
  },
  bindClientName(event) {
    this.setData({
      'user.client_name': event.detail.value
    })
  },
  bindMobile(event) {
    this.setData({
      'user.mobile': event.detail.value
    })
  },
  bindSmsCode(event) {
    this.setData({
      'user.sms_code': event.detail.value
    })
  },
  bindStartLocation(event) {
    this.setData({
      'user.start_location': event.detail.value
    })
  },
  changeTitleName: function (event) {
    let titleindex = event.currentTarget.dataset['titleindex'];
    this.setData({
      titleIndex: titleindex,
      'user.type': titleindex == 0 ? 1 : 2
    })
  },
  jianCount: function () {
    if (this.data.user.client_number == 1) {
      return
    }
    this.setData({
      'user.client_number': this.data.user.client_number - 1
    })
  },
  addCount: function () {
    console.log('add')
    if (this.data.user.client_number == 3) {
      return
    }
    this.setData({
      'user.client_number': this.data.user.client_number + 1
    })
  },
  // 获取验证码
  getMsgCode() {
    if (this.data.user.mobile == '') {
      this.showToast('请先输入手机号')
      return
    }
    let data = {
      captcha_code: this.data.picCode,
      captcha_flag: this.data.captcha_flag,
      user_name: this.data.user.mobile,
      captcha_key: this.data.captchaKey,
      sign: 'qmsj'
    }
    this.setData({
      msgDisable: true
    })
    wx.showLoading()
    request.getSmsCode(data).then(res => {
      wx.hideLoading()
      this.showToast('验证码发送成功')
      this.countDown()
    }).catch(error => {
      wx.hideLoading()
      this.setData({
        msgDisable: false,
        captcha_flag: 1
      })
      this.getLoginByCaptcha()
    })
  },
  countDown() {
    var _this = this;
    var num = 60;
    var timer = setInterval(function () {
      num--;
      if (num <= 0) {
        clearInterval(timer);
        _this.setData({
          codename: '重新发送',
          msgDisable: false
        })
      } else {
        _this.setData({
          codename: num + "s"
        })
      }
    }, 1000)
  },
  //获取航班起飞时间
  bindMultiPickerChangeAir: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    const yearData = year.split('年')[0]
    const monthData = month.split('月')[0]
    const dayData = day.split('日')[0]
    // 2020/05/09 14:38
    const timeAirData = yearData + '/' + monthData + '/' + dayData + ' ' + hour + ":" + minute
    this.setData({
      timeAir: timeAirData,
      'user.flight_time': timeAirData
    })
  },
  // 获取汽车出发时间
  bindMultiPickerChangeCar: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    const yearData = year.split('年')[0]
    const monthData = month.split('月')[0]
    const dayData = day.split('日')[0]
    // 2020/05/09 14:38
    const timeCarData = yearData + '/' + monthData + '/' + dayData + ' ' + hour + ":" + minute
    this.setData({
      timeCar: timeCarData,
      'user.format_start_time': timeCarData
    })
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  showXiyi() {
    this.setData({
      isShowXieyi: true
    })
  },
  goyuyue() {
    var tabIndex = this.data.titleIndex
    if (tabIndex == 0) {
      // 接机
      this.setData({
        sureStartAddress: this.data.jieStartTitle,
        sureEndAddress: this.data.jiejiEndAddress,
        'user.start_location': this.data.jieStartTitle,
        'user.end_location': this.data.jiejiEndAddress
      })
    } else {
      // 送机
      this.setData({
        sureStartAddress: this.data.songjiStartAddress,
        sureEndAddress: this.data.songEndTitle,
        'user.start_location': this.data.songjiStartAddress,
        'user.end_location': this.data.songEndTitle
      })
    }
    if (!this.data.user.client_name) {
      this.showToast("请输入姓名")
      return
    }
    if (!this.data.user.mobile) {
      this.showToast("请输入手机号")
      return
    }
    if (!this.data.user.sms_code) {
      this.showToast("请输入短线验证码")
      return
    }
    if (!this.data.user.qmsj_store_id) {
      this.showToast("请选择机场")
      return
    }
    if (!this.data.user.flight_time) {
      this.showToast("请选择航班时间")
      return
    }
    if (!this.data.user.format_start_time) {
      this.showToast("请选择用车时间")
      return
    }
    if (!this.data.sureStartAddress) {
      this.showToast("请选择起点")
      return
    }
    if (!this.data.sureEndAddress) {
      this.showToast("请选择终点")
      return
    }
    this.setData({
      isShowSureOrder: true
    })
  },
  tapDialogXieyi(event) {
    let btnIndex = event.detail.index
    this.setData({
      isShowXieyi: false
    })
    if (btnIndex == 0) {
      return
    }
    wx.showLoading()
    request.submitAirportOrder(this.data.user).then(res => {
      wx.hideLoading()
      this.setData({
        isShowSuccess: true
      })
    }).catch(err => {})
  },
  tapDialogSuccess(e) {
    this.setData({
      isShowSuccess: false,
      isShowSureOrder: false,
      'user.client_name': "",
      'user.client_number': "",
      'user.mobile': "",
      'user.sms_code': "",
      'user.qmsj_store_id': "",
      'user.flight_time': "",
      'user.format_start_time': "",
      'user.start_location': "",
      'user.end_location': "",
      'user.flight': "",
      'user.qmsj_driver_sn': ""
    })
    wx.switchTab({
      url: '/pages/myorder/myorder',
    })
  },
  showXuzhi() {
    this.setData({
      isShowXuzhi: true
    })
  },
  tapDialogXuzhi(e) {
    this.setData({
      isShowXuzhi: false
    })
  },
  sureOrder() {
    this.setData({
      isShowXieyi: true
    })
  },
  goBackEditOrder() {
    this.setData({
      isShowSureOrder: false
    })
  },
  showToast: function (msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })
  }
})