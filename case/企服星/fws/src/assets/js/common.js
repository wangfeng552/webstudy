/**
 * Created by ADMIN on 2017/8/1.
 */

import Vue from 'vue'

export default{
  install(Vue,options)
  {
    //全局 变量 start ==============
    Vue.prototype.fileSupportFormatGol = '文件支持jpg、jpeg、png、txt、doc、docx、xls、xlsx、ppt、pptx、pdf格式';
    Vue.prototype.fileUploadFailWaringwordsGol = '请上传正确的文件格式';
    //全局 变量 start ==============
    //传入str， 判断str 是否全部是数字，并且是正整数
    Vue.prototype.isNumberIntGol = function (str) {
      if(str == undefined || str == null) return false;
      var r = /^\+?[1-9][0-9]*$/;　　//正整数
      // var r = /^\+?[0-9][0-9]*$/;　　//自然数 包括 0
      var mark = r.test(str);
      return mark;
    },
      //判断是否为空
      Vue.prototype.isEmptyGol = function (item) {
        if(item == undefined || item == null) return true;
        else return false;
      },

      //验证 上传的 file 的格式是否符合规范 （只支持 jpg，png，txt doc docx xls ppt pdf ，小于20M）
      // 返回 true  ==> 在严格和那个通过  反之 false
      // 传入 file 该文件(ele 控件上传的那个文件)
      Vue.prototype.verifyUpLoadTypeGol = function (file) {
        if(this.isEmptyGol(file))        return false;
        if(this.isEmptyGol(file.name))   return false;
        if(this.isEmptyGol(file.raw))    return false;
        if(this.isEmptyGol(file.size))   return false;
        // 判断格式是否 符合
        var markType = false;
        if(file.name.indexOf(".doc") >= 0) markType = true;
        else if(file.name.indexOf(".png") >= 0) markType = true;
        else if(file.name.indexOf(".jpg") >= 0) markType = true;
        else if(file.name.indexOf(".txt") >= 0) markType = true;
        else if(file.name.indexOf(".ppt") >= 0) markType = true;
        else if(file.name.indexOf(".pdf") >= 0) markType = true;
        else if(file.name.indexOf(".xls") >= 0) markType = true;
        else if(file.name.indexOf(".jpeg") >= 0) markType = true;


        if (!markType) return false;
        // 判断大小
        // if ((file.size/(1024*1024)) > 20) return false;
        return true;
      },
      Vue.prototype.beforeUpLoadFileValidateGol = function (file) {
        var markType = false;
        if(file.name.toLowerCase().indexOf(".doc") >= 0) markType = true;
        else if(file.name.toLowerCase().indexOf(".png") >= 0) markType = true;
        else if(file.name.toLowerCase().indexOf(".jpg") >= 0) markType = true;
        else if(file.name.toLowerCase().indexOf(".txt") >= 0) markType = true;
        else if(file.name.toLowerCase().indexOf(".ppt") >= 0) markType = true;
        else if(file.name.toLowerCase().indexOf(".pdf") >= 0) markType = true;
        else if(file.name.toLowerCase().indexOf(".xls") >= 0) markType = true;
        else if(file.name.toLowerCase().indexOf(".jpeg") >= 0) markType = true;
        if (!markType) return false;
        // 判断大小
        // if ((file.size/(1024*1024)) > 20) return false;
        return true;
      },

      // 将 Data的string  装换成 正常显示的 string yyyy-MM-dd
      Vue.prototype.formatDateToStrGol = function (timeSting,fmt) {
        function padLeftZero(str) {
          return ('00' + str).substr(str.length);
        }
        let date = new Date(timeSting);
        if(this.isEmptyGol(fmt))  fmt  = 'yyyy-MM-dd';


        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        };
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
          }
        }
        return fmt;
      }
  }
}
