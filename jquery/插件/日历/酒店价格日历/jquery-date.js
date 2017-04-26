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
// stockRemain 返现
// price 售价、分销价、分销售价
// priceRetail 结算价、采购价、分销结算价
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
//  priceRetail: "结算价",
//  priceBase: "售价",
//  stockRemain: "返现",
//  stock: "9999",
//  // week: [],
//  dayData: [
//      {
//          date: "2016-10-21",
//          stockDay: "9000",
//          buyNumMax: "50",
//          buyNumMin: "1",
//          priceBase: "0.12",
//          priceMarket: "100.00",
//          priceRetail: "90.00",
//          priceRetail: "99.00"
//      },{
//          date: "2016-11-12",
//          stockDay: "9000",
//          buyNumMax: "50",
//          buyNumMin: "1",
//          priceBase: "12.00",
//          priceMarket: "100.00",
//          priceRetail: "90.00",
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
        var reg = /\d{4}-\d{1,2}-\d{1,2}/;
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
        	firstDayWeek = thisMonthDate.getDay(), //这个月的第一天是星期几
        	maxy = sy+1; //最大年限

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
        html += '           <span class="title-date">'+ y +'年'+ this.ddf(m) +'月</span>';
       /* if((y+''+this.ddf(m)) > (sy+''+this.ddf(parseInt(sm)+1))) {*/
            html += '       <a class="prev" id="yagizaPrevMonth" title="上一月"><i></i></a>';
        /*}*/
       	if((y+''+this.ddf(m)) != maxy+"12") {
        	html += '           <a class="next" id="yagizaNextMonth" title="下一月"><i></i></a>';
        }
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
                    // 显示价格、库存
                    if(td_id>=today){
                    html+='<td data-week="'+ (k - 1) +'" id="'+ td_id +'"><b>'+showDay+'</b></td>';
                    } else {
                        html+='<td data-week="'+ (k - 1) +'" id="'+ td_id +'" class="oldDate"><b>'+showDay+'</b></td>';
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
       /* html += '   <div class="footer"><button type="reset" class="btn bg-green">重置</button><button type="submit" class="btn bg-orange">确定</button><button type="cancel" class="btn bg-gray">取消</button></div>';*/
        html += '</div>';

        this.mask.append(html);
        $('.dateBox').html(this.mask);

        // 上一月
        $('.yagiza-date-selector #yagizaPrevMonth').click(function(){
            var newMonth='';
            if(parseInt(m)==1){
                newMonth = (y - 1)+'-12-01';
            } else {
                newMonth = y + '-' + _this_.ddf(m - 1)+'-01';
            }
            $("#dateChange").val(function(){
            	 var newD = newMonth.split("-");
            	return newD[0]+"年"+parseInt(newD[1])+"月";
            });
            //ajax
            
            
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
            $("#dateChange").val(function(){
            	var newD = newMonth.split("-");
            	return newD[0]+"年"+parseInt(newD[1])+"月";
            });
            //ajax
            
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
                priceRetail: priceData.priceRetail,
                priceBase: priceData.priceBase,
                stockRemain: priceData.stockRemain,
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
            $.each(td, function(i, item){
            	var className = "";
            	if(priceData.houseType == "1") {
            		className = "fullStyle";
            	} else if(priceData.houseType == "2") {
            		className = "closeStyle";
            	}
            	
                var list='<div><p>售：<span>'+_this_.nf(priceData.priceRetail)+'/'+_this_.nf(priceData.priceBase)+'</span></p><p>库：<span>'+_this_.nf(priceData.stockRemain)+'/'+_this_.nf(priceData.stock)+'</span></p></div>';
                // 独立设置价格、日期
                $.each(arr, function(i, item2){
                    if(item.id===item2.date){
                    	if(item2.houseType == "1") {
		            		className = "fullStyle";
		            	} else if(item2.houseType == "2") {
		            		className = "closeStyle";
		            	}
                        list='<div data-priceRetail="'+item2.priceRetail+'" data-priceBase="'+item2.priceBase+'" data-stockRemain="'+item2.stockRemain+'" data-stock="'+item2.stock+'"><p>售：<span>'+_this_.nf(item2.priceRetail)+'/'+_this_.nf(item2.priceBase)+'</span></p><p>库：<span>'+_this_.nf(item2.stockRemain)+'/'+_this_.nf(item2.stock)+'</span></p></div>';
                        
                    }
                });
                
                if($(this).hasClass("oldDate")) {
            		 $('#'+item.id).find('b').after(list);
            	} else {
                	// 将价格、库存写入对应日期
                	$('#'+item.id).addClass('active '+className).find('b').after(list);
                }
                list = '';
            })

            // 点击 显示单日信息设置窗口
            td.click(function(){
                var id = $(this).attr('id');
                if($(this).hasClass("oldDate")) {
                	return;
                }
                $(".date-table td").removeClass("td-active");
                $(this).addClass("td-active");
                var obj = {
                    date: id,
                    stock: $(this).find('div').attr('data-stock'),
                    stockRemain:$(this).find('div').attr('data-stockRemain'),
                    priceBase: $(this).find('div').attr('data-priceBase'),
                    priceRetail: $(this).find('div').attr('data-priceRetail'),
                    startDay: id,
                    endDay: id
                }
				$("#stock").val(obj.stock);
                $("#stockRemain").val(obj.stockRemain);
				$("#priceBase").val(obj.priceBase);
				$("#priceRetail").val(obj.priceRetail);
				$("#date-sta,#date-end").val(id);
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
                    priceBase = _this_.nf($('#priceBase').val()),
                    priceMarket = _this_.nf($('#priceMarket').val()),
                    priceRetail = _this_.nf($('#priceRetail').val()),
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
                            priceBase: priceBase,
                            priceMarket: priceMarket,
                            priceRetail: priceRetail,
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
        }
        

    }

    // window.yagizaDate = yagizaDate;
    $.yagizaDate = function(month, priceData){
        return new yagizaDate(month, priceData);
    }

})(jQuery);