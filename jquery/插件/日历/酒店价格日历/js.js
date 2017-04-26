/*
 * yagizaDate 1.0
 *
 * Yagiza
 * Copyright 2016, MIT License
 *
 * IE 8+, Chrome, fireFox
 */

// * 字段说明 ********************
// buyNumMax 最多购买数
// buyNumMin 最少购买数
// cashback 返现
// price 售价、分销价、分销售价
// priceSettlement 结算价、采购价、分销结算价
// priceMarket 景区挂牌价
// priceRetail 建议零售价
// stock 总库存
// stockDay 当天库存
// * END 字段说明 ********************

// // 初始化数据
// var priceData = {
// callbackId:'#mydemo', // 用于接收回调JSON数据
//  // startDay: null,
//  // endDay: null,
//  priceSettlement: "结算价",
//  priceNormal: "售价",
//  cashback: "返现",
//  stock: "9999",
//  // week: [],
//  dayData: [
//      {
//          date: "2016-10-21",
//          stockDay: "9000",
//          buyNumMax: "50",
//          buyNumMin: "1",
//          priceNormal: "0.12",
//          priceMarket: "100.00",
//          priceSettlement: "90.00",
//          priceRetail: "99.00"
//      },{
//          date: "2016-11-12",
//          stockDay: "9000",
//          buyNumMax: "50",
//          buyNumMin: "1",
//          priceNormal: "12.00",
//          priceMarket: "100.00",
//          priceSettlement: "90.00",
//          priceRetail: "99.00"
//      }
//  ]
// }
//
// 调用方法
// $.yagizaDate('2016-10-08',priceData);
// 日期格式不合法，自动获取系统时间0000-00-00

;(function($){
    var yagizaDate = function(setDay, priceData){
        var _this_ = this,
        // 数据接收#id
            callbackId = priceData.callbackId,
            priceData = priceData;

        // 系统日期 年月
        var todayDate = new Date(),
            sy = todayDate.getFullYear(),
            sm = todayDate.getMonth(),
        // 今天几号
            d =  todayDate.getDate(),
        // 今天 y-m-d
            today = sy + '-'+this.ddf(sm+1)+'-'+this.ddf(d);

        // Datedata 日期价格库存json
        // setDay 设置日期 2016-10-10
        var reg = /^\d{4}-\d{2}-\d{2}$/;
        if(!reg.test(setDay)){
            console.log('日期格式有误！');
            // return false;
            setDay = sy + '-' + this.ddf(sm+1) + '-' + this.ddf(d);
        }

        // 默认参数配置
        // 设置年月
        // replace(/-/,'/') 解决IE98及以下版本输出NaN问题
        var setMsec = new Date(setDay.replace(/-/g,'/')),
            y = setMsec.getFullYear(),
            m = setMsec.getMonth()+1,
        // 当月天数
            maxdays = (new Date(Date.parse(new Date(y,m,1)) - 86400000)).getDate(),
        //获取当月（日期对象）
            thisMonthDate = new Date(y,m-1);
        firstDayWeek = thisMonthDate.getDay(); //这个月的第一天是星期几

        // HTML结构
        // td id="2016-10-10"
        var td_id;
        // 传入对象中日期数据设置
        var arr = priceData.dayData,
            arrLen = arr.length;

        // 遮罩
        this.mask = $('<div class="yagiza-date-selector">');
        // 创建html DOM结构
        var html = '';
        html += '   <div class="date-selector-box">';
        html += '       <div class="header">';
        html += '           <h2>'+ y +'年'+ this.ddf(m) +'月</h2>';
        if((y+''+this.ddf(m)) > (sy+''+this.ddf(parseInt(sm)+1))) {
            html += '       <a class="prev" id="yagizaPrevMonth" title="上一月"><i></i></a>';
        }
        html += '           <a class="next" id="yagizaNextMonth" title="下一月"><i></i></a>';
        html += '       </div>';
        html += '       <div class="date-table">';
        html += '       <table cellpadding="0" cellspacing="0">';
        html += '           <thead><tr class="week"><th class="weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th></tr></thead>';
        html += '           <tbody id="yagizaDateTd">';

        var i = 0, j = 0, k = 0, showDay,
        // tr 行数
            row = Math.ceil((maxdays + firstDayWeek)/7);
        // 创建日期表格
        for(j=0;j<row;j++){
            html+='<tr>';

            for(k=1;k<=7;k++){
                showDay = j*7 + k - firstDayWeek;
                if(showDay>0&&showDay<=maxdays){
                    td_id = y +'-'+ this.ddf(m) +'-'+ this.ddf(showDay);
                    // 今天及之后的日期，显示价格、库存
                    if(td_id>=today){
                        html+='<td data-week="'+ (k - 1) +'" id="'+ td_id +'"><b>'+showDay+'</b></td>';
                    } else {
                        html+='<td><b>'+showDay+'</b></td>';
                    }
                } else {
                    html+='<td> </td>';
                }
            } // for k End

            html+='</tr>';
        } // for j End

        html += '           </tbody>';
        html += '       </table>';
        html += '   </div>';
        html += '   <div class="footer"><button type="reset" class="btn bg-green">重置</button><button type="submit" class="btn bg-orange">确定</button><button type="cancel" class="btn bg-gray">取消</button></div>';
        html += '</div>';

        this.mask.append(html);
        $('body').append(this.mask);

        // 上一月
        $('.yagiza-date-selector #yagizaPrevMonth').click(function(){
            var newMonth='';
            if(parseInt(m)==1){
                newMonth = (y - 1)+'-12-01';
            } else {
                newMonth = y + '-' + _this_.ddf(m - 1)+'-01';
            }
            _this_.close();
            $.yagizaDate(newMonth,priceData);
        });

        // 下一月
        $('.yagiza-date-selector #yagizaNextMonth').click(function(){
            var newMonth='';
            if(parseInt(m)==12){
                newMonth = (y + 1)+'-01-01';
            } else {
                newMonth = y + '-' + _this_.ddf(m + 1)+'-01';
            }
            _this_.close();
            $.yagizaDate(newMonth,priceData);
        });

        // 取消
        $('.yagiza-date-selector button[type="cancel"]').click(function(){
            _this_.close();
        });

        // 确定
        $('.yagiza-date-selector button[type="submit"]').click(function(){
            var callbackData = JSON.stringify(priceData);
            $(callbackId).text(callbackData);
            _this_.close();
        });

        // 重置 保留基本信息
        $('.yagiza-date-selector button[type="reset"]').click(function(){
            priceData = {
                startDay: null,
                endDay: null,
                priceSettlement: priceData.priceSettlement,
                priceNormal: priceData.priceNormal,
                cashback: priceData.cashback,
                stock: priceData.stock,
                week: null,
                dayData: []
            }
            _this_.close();
            $.yagizaDate(setDay,priceData);
        });

        // 加载库存、售价等数据
        $(function(){

            // 今天及之后的日期，显示价格、库存
            // 含有ID的td标签
            var td = $('.yagiza-date-selector #yagizaDateTd td[id]');
            // console.log(td)
            $.each(td, function(i, item){
                var list='<div><p>分：￥<span>'+_this_.nf(priceData.priceNormal)+'</span></p><p>采：￥<span>'+_this_.nf(priceData.priceSettlement)+'</span></p><p>库：<span>'+_this_.nf(priceData.stock)+'</span></p></div>';
                // 独立设置价格、日期
                $.each(arr, function(i, item2){
                    if(item.id===item2.date){
                        list='<div data-buyNumMax="'+item2.buyNumMax+'" data-buyNumMin="'+item2.buyNumMin+'" data-priceMarket="'+item2.priceMarket+'" data-priceRetail="'+item2.priceRetail+'"><p>分：￥<span>'+_this_.nf(item2.priceNormal)+'</span></p><p>采：￥<span>'+_this_.nf(item2.priceSettlement)+'</span></p><p>库：<span>'+_this_.nf(item2.stockDay)+'</span></p></div>';
                    }
                });
                // 将价格、库存写入对应日期
                $('#'+item.id).addClass('active').find('b').after(list);
                list = '';
            })

            // 点击 显示单日信息设置窗口
            td.click(function(){

                var id = $(this).attr('id');
                var obj = {
                    date: id,
                    stockDay: $(this).find('div p:nth-child(3) span').text(),
                    buyNumMax: $(this).find('div').attr('data-buyNumMax'),
                    buyNumMin: $(this).find('div').attr('data-buyNumMin'),
                    priceNormal: $(this).find('div p:nth-child(1) span').text(),
                    priceMarket: $(this).find('div').attr('data-priceMarket'),
                    priceSettlement: $(this).find('div p:nth-child(2) span').text(),
                    priceRetail: $(this).find('div').attr('data-priceRetail'),
                    startDay: id,
                    endDay: id
                }

                // console.log('obj:'+obj)
                // 创建单日设置项
                _this_.dateSet(obj);
                $('#'+id).closest('.date-selector-box').css('display','none');

            });

            // 取消 单日信息设置
            $('.yagiza-date-selector').on('click', '.close', function(){
                $('.yagiza-date-selector .date-set-box').remove();
                $('.yagiza-date-selector .date-selector-box').css('display','block');
            });

            // 设置 日期相关信息 ***************
            $('.yagiza-date-selector').on('click', '[rel="enable"]', function(){

                var thisDate = $(this).attr('data-date'),
                    stockDay = _this_.nf($('#stockDay').val()),
                    buyNumMax = _this_.nf($('#buyNumMax').val()),
                    buyNumMin = _this_.nf($('#buyNumMin').val()),
                    priceNormal = _this_.nf($('#priceNormal').val()),
                    priceMarket = _this_.nf($('#priceMarket').val()),
                    priceSettlement = _this_.nf($('#priceSettlement').val()),
                    priceRetail = _this_.nf($('#priceRetail').val());

                // 判断日期格式是否合法
                var startDay = $('#startDay').val(),
                    endDay = $('#endDay').val();
                // var reg = /^\d{4}-\d{2}-\d{2}$/;
                if(!reg.test(startDay)){
                    alert('开始时间格式错误，请使用0000-00-00格式！');
                    $('#startDay').val(thisDate).focus();
                    return false;
                }

                if( startDay<today){
                    alert('开始时间不能小于今天（'+today+'）！');
                    $('#startDay').val(thisDate).focus();
                    return false;
                }

                if(!reg.test(endDay)){
                    alert('结束时间格式错误，请使用0000-00-00格式！');
                    $('#endDay').val(thisDate).focus();
                    return false;
                }

                if( endDay<today){
                    alert('结束时间不能小于今天（'+today+'）！');
                    $('#startDay').val(thisDate).focus();
                    return false;
                }

                if( endDay<startDay){
                    alert('结束时间（'+endDay+'）不能小于开始时间（'+startDay+'）！');
                    $('#endDay').val(thisDate).focus();
                    return false;
                }

                // 批量设置 *****************************
                // 设置周一 至 周日
                var weekArr = [],
                    setWeek = $('input[name=setWeek]:checked');
                setWeek.each(function(i,item){
                    // ！parseInt 周几转换为数字，字符串后面不能匹配
                    weekArr[i] = parseInt(item.value);
                })
                // 获取选择周日的长度
                var wlen = weekArr.length;

                // 特殊设置日期
                var spDayArr = [],
                // 只设置了日期范围的
                    spDayArr1 = [],
                // 设置了周几的
                    spDayArr2 = [];

                // 如果用户设置了日期
                if(startDay!=thisDate || endDay!=thisDate){
                    var sd = new Date(startDay),
                        ed = new Date(endDay),
                        sdMsec = Date.parse(startDay),
                        edMsec = Date.parse(endDay),
                    // 相差天数
                        dayLen = parseInt((edMsec - sdMsec)/(1000 * 60 * 60 * 24)) + 1;

                    for(var n=0;n<dayLen;n++){
                        spDayArr1[n] = _this_.msecToYmd((sdMsec + 86400000*n));
                    }

                    // 删除priceData.dayData中，与设置日期重复的数据
                    $.each(spDayArr1, function(index, item){
                        // 判断priceData.dayData是否存在相应日期
                        if(arrLen>0){
                            for(var k=(arrLen-1);k>=0;k--){
                                // 当日数据已存在-》删除
                                if(arr[k] && arr[k].date === item){
                                    arr.splice(k, 1);
                                }
                            }
                        }

                    }); // each END

                } else {
                    spDayArr = [thisDate];
                }

                // 如果用户设置了周几
                if(wlen){
                    // 如果用户设置了日期范围
                    if(spDayArr1.length>0){
                        var w,wd;
                        $.each(spDayArr1, function(i, item){
                            w = new Date(item);
                            wd = w.getDay();
                            if($.inArray(wd, weekArr)>-1 && item){
                                spDayArr2.push(item);
                            }

                        })
                    } else {
                        // 设置了周几
                        // 获取一年的时间设置
                        var todayMsec = Date.parse(todayDate),
                            newDate;

                        for(var k=0;k<365;k++){
                            newDate = new Date(todayMsec+k*86400000);
                            if($.inArray(newDate.getDay(), weekArr)>-1){
                                spDayArr2.push(_this_.dateFYmd(newDate));
                            }
                        }
                    }

                } // end 周几设置

                // 重组 priceData.dayData
                // 存在设置日期
                if(spDayArr2.length>0){
                    spDayArr = spDayArr2;
                } else if(spDayArr1.length>0){
                    spDayArr = spDayArr1;
                }

                if(spDayArr.length>0){
                    var o;
                    $.each(spDayArr, function(i,item){
                        var o = {
                            date: item,
                            stockDay: stockDay,
                            buyNumMax: buyNumMax,
                            buyNumMin: buyNumMin,
                            priceNormal: priceNormal,
                            priceMarket: priceMarket,
                            priceSettlement: priceSettlement,
                            priceRetail: priceRetail
                        }
                        // 将新数据写入 priceData.dayData
                        arr.push(o);
                        // delete o;
                    });
                    // 更新priceData.dayData
                    priceData.dayData = arr;
                }

                _this_.close();
                $.yagizaDate(setDay,priceData);

            });

        }); // $(function) END

    }

    yagizaDate.prototype = {
        // 毫秒转yyyy-MM-dd
        msecToYmd: function(item){
            var y,m,d,
                item = new Date(item);
            y = item.getFullYear();
            m = item.getMonth()+1
            m = m < 10 ? '0'+ m : m;
            d = item.getDate();
            d = d < 10 ? '0'+ d : d;
            return y+'-'+m+'-'+d;
        },
        // // yyyy-MM-dd转毫秒
        // ymdToMsec: function(item){
        //  var itemDate = new Date(item);
        //  return itemDate.getTime();
        // },

        // Date对象格式话 yyyy-mm-dd
        dateFYmd: function(d){
            var y = d.getFullYear(),
                m = d.getMonth(),
                d =  d.getDate(),
                ymd = y + '-'+this.ddf(m+1)+'-'+this.ddf(d);
            return ymd;
        },

        // 两位数格式化，不足两位首位补0
        // double-digit fomart
        ddf: function(n){
            n = parseInt(n);
            return n < 10 ? '0'+n : n;
        },

        // 移除日期设置窗口
        close: function(){
            this.mask.remove();
        },
        // 为空或undefined = ''
        // null fomart
        nf: function(str){
            return str ? str : '';
        },
        // 创建单日/批量设置窗口DOM
        dateSet: function(obj){
            var _this = this;
            var setBox = '';
            // console.log(obj)
            setBox += '<div class="date-set-box"><div class="header"><h2>'+obj.date+' 价格详细</h2><a href="javascript:void(0)" class="close"><i></i></a></div>';
            setBox += '    <dl class="yagiza-form clearfix">';
            setBox += '        <dd>最多购买数：<input class="input-text" id="buyNumMax" type="text" value="'+ this.nf(obj.buyNumMax) +'"></dd>';
            setBox += '        <dd>最少购买数：<input class="input-text" id="buyNumMin" type="text" value="'+ this.nf(obj.buyNumMin) +'"></dd>';
            setBox += '        <dd>分 销 售 价：<input class="input-text" id="priceNormal" type="text" value="'+ this.nf(obj.priceNormal) +'"></dd>';
            setBox += '        <dd>景区挂牌价：<input class="input-text" id="priceMarket" type="text" value="'+ this.nf(obj.priceMarket) +'"></dd>';
            setBox += '        <dd>分销结算价：<input class="input-text" id="priceSettlement" type="text" value="'+ this.nf(obj.priceSettlement) +'"></dd>';
            setBox += '        <dd>建议零售价：<input class="input-text" id="priceRetail" type="text" value="'+ this.nf(obj.priceRetail) +'"></dd>';
            setBox += '        <dd>当 天 库 存：<input class="input-text" id="stockDay" type="text" value="'+ this.nf(obj.stockDay) +'"></dd>';
            setBox += '    </dl><hr><dl class="yagiza-form clearfix">';
            setBox += '        <dt><b>批量设置</b></dt>';
            setBox += '        <dd>开 始 时 间：<input class="input-text" id="startDay" type="date" value="'+ this.nf(obj.date) +'"></dd>';
            setBox += '        <dd>结 束 时 间：<input class="input-text" id="endDay" type="date" value="'+ this.nf(obj.date) +'"></dd>';
            setBox += '    </dl>';
            setBox += '    <dl class="yagiza-form clearfix">';
            setBox += '        <dt>';
            setBox += '            设 置 星 期：';
            setBox += '            <label><input name="setWeek" type="checkbox" value="1"> 周一</label>';
            setBox += '            <label><input name="setWeek" type="checkbox" value="2"> 周二</label>';
            setBox += '            <label><input name="setWeek" type="checkbox" value="3"> 周三</label>';
            setBox += '            <label><input name="setWeek" type="checkbox" value="4"> 周四</label>';
            setBox += '            <label><input name="setWeek" type="checkbox" value="5"> 周五</label>';
            setBox += '            <label><input name="setWeek" type="checkbox" value="6"> 周六</label>';
            setBox += '            <label><input name="setWeek" type="checkbox" value="0"> 周日</label>';
            setBox += '        </dt>';
            setBox += '    </dl>';
            setBox += '    <div class="footer">';
            setBox += '        <button rel="enable" class="btn bg-orange" data-date="'+obj.date+'">启用本设置</button>';
            setBox += '        <button rel="cancel" class="btn bg-gray close">取消</button>';
            setBox += '    </div>';
            setBox += '</div>';
            this.mask.append(setBox);
        }

    }

    // window.yagizaDate = yagizaDate;
    $.yagizaDate = function(month, priceData){
        return new yagizaDate(month, priceData);
    }

})(jQuery);