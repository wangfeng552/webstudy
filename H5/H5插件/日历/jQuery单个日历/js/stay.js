/*******住宿详情页面时间控件******/
(function($){
    stay = {
        start:$('#startDate'),
        end:$('#endDate'),
        today:(new Date()),
        init:function(){
            stay.inputVal();
            stay.endFun();
            stay.startFun();
        },
        startFun:function(){
            stay.start.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                appendText : '明天',
                firstDay : 1,
                showOtherMonths:true,
                minDate : 0,
                maxDate:180,
                onSelect:function(dateText,inst){
                    stay.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days', 1)));
                    stay.end.datepicker('option', 'maxDate', new Date(moment(dateText).add('days', 180)));
                    var strDay =  stay.compare($(this));
                    stay.start.datepicker('option', 'appendText', strDay);
                    if((new Date(stay.end.val()) - new Date(dateText)) <= (24*60*60*1000)){
                        stay.end.datepicker('option', 'appendText', stay.compare(stay.end));
                    }
                }

            });
        },
        endFun:function(){
            stay.end.datepicker('refresh');
            stay.end.datepicker({
                dateFormat : 'yy-mm-dd',
                dayNamesMin : ['日','一','二','三','四','五','六'],
                monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                altFormat : 'yy-mm-dd',
                yearSuffix:'年',
                showMonthAfterYear:true,
                appendText : '后天',
                firstDay : 1,
                showOtherMonths:true,
                minDate : 1,
                maxDate:180,
                    onSelect:function(){
                        stay.end.datepicker('option', 'appendText', stay.compare($(this)));
                    }
            });
        },
        transformStr:function(day,strDay){
            switch (day){
                    case 1:
                        strDay  = '星期一';
                        break;
                    case 2:
                        strDay  = '星期二';
                        break;
                    case 3:
                        strDay  = '星期三';
                        break;
                    case 4:
                        strDay  = '星期四';
                        break;
                    case 5:
                        strDay  = '星期五';
                        break;
                    case 6:
                        strDay  = '星期六';
                        break;
                    case 0:
                        strDay  = '星期日';
                        break;
                }
            return strDay;
        },
        compare:function(obj){
            var strDay = '今天';
            var myDate = new Date(stay.today.getFullYear(),stay.today.getMonth(),stay.today.getDate());
            var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
            day == 0 ? strDay: day == 1 ?
                (strDay = '明天') : day == 2 ?
                (strDay = '后天') : (strDay = stay.transformStr(obj.datepicker('getDate').getDay(),strDay));
            return strDay;
        },
        inputVal:function(){
            stay.inputTimes(stay.start,1);
            stay.inputTimes(stay.end,2);
        },
        inputTimes:function(obj,day){
            var m = new Date(moment(stay.today).add('days', day));
            obj.val(m.getFullYear() + "-" + stay.addZero((m.getMonth()+1)) + "-" + stay.addZero(m.getDate()));
        },
        addZero:function(num){
            num < 10 ? num = "0" + num : num ;
            return num;
        }
    }
    stay.init();
})(jQuery);