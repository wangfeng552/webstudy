// pages/ceshi/ceshi.js
Component({
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  }, 
   /** 
   * 组件的属性列表 
   * 用于组件自定义设置 
  */ 
  properties:{
    title:{
      type:String,
      value:'123'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {},
 /**
   * 组件的方法列表 
   * 更新属性和数据的方法与更新页面数据的方法类似 
  */ 
  methods: { 
    /** 
    * 公有方法 
    */
    //隐藏弹框 
    hideDialog() { 
    console.log('hidedialog')
    }, 
    //展示弹框 
    showDialog() { 
      console.log('showdialog')
    }, 
    /** 
     * 内部私有方法建议以下划线开头 
     * triggerEvent 用于触发事件 
    */ 
    _cancelEvent() { //触发取消回调 
      this.triggerEvent("cancelEvent") 
    }, 
    _confirmEvent() { //触发成功回调 
      this.triggerEvent("confirmEvent"); 
    } 
  } 
})