// pages/ceshi/ceshi.js
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'apply-shared',  //页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */

  properties: {
    title: {
      type: String,
      value: "123",
    },
  },
  /**
   * 页面的初始数据
   */
  data: {},
  lifetimes: {
    created:function(){
      // 在组件实例刚刚被创建时执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    ready:function(){
      // 在组件在视图层布局完成后执行
    },
    moved:function(){
      // 在组件实例被移动到节点树另一个位置时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
    error:function(){
      // 每当组件方法抛出错误时执行
    }
  },
  // 组件所在页面的生命周期
  pageLifetimes:{
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
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
      console.log("hidedialog");
    },
    //展示弹框
    showDialog() {
      console.log("showdialog");
    },
    /**
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */

    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent");
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    },
  },
});
