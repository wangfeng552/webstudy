//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady: function () {
    this.ceshi = this.selectComponent("#ceshi"); 
  },
  _cancelEvent:function(){
    this.ceshi.hideDialog();
  },
  showDia(){
    this.ceshi.hideDialog();
  }
})
