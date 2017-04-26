define("tab", ['log'],function(log) {


    //构造函数
    function Slider(opts){
        //构造函数需要的参数
        this.wrap = null;
        this.wrap = opts.dom;
        this.outer = this.wrap.getElementsByTagName('ul')[0];
        // this.list = opts.list;
        //构造三步奏
        var self = this;
        self.init();
        self.renderDOM(function(){
            self.bindDOM();
        });
        self.bindEvent();
    }

    //第一步 -- 初始化
    Slider.prototype.init = function() {
        //设定窗口比率
        // this.radio = window.innerHeight/window.innerWidth;
        //设定一页的宽度
        this.scaleW = $(this.wrap).offset().width;
        //设定初始的索引值
        this.idx = 0;
    };

    //第二步 -- 根据数据渲染DOM
    Slider.prototype.renderDOM = function(callback){
        var self = this,wrap = this.wrap;
        // var data = this.list;
        var lis = wrap.getElementsByTagName('li');
        if( !lis.length )return;
        this.lis = lis;
        var len = lis.length;


        //根据元素的
        for(var i = 0; i < len; i++){
            var li = lis[i];
            // var item = data[i];
            li.style.width = this.scaleW +'px';
            li.style.webkitTransform = 'translate3d('+ i*this.scaleW +'px, 0, 0)';

        }
        var oImg = new Image();
        oImg.onload = function(){
            var height = $(self.lis[0]).offset().height;
            self.outer.style.cssText = 'width:' + self.scaleW +'px;height:'+height+'px';
            // self.createIcon();
            wrap.style.height = (height+20) + 'px';
            self.createIcon();
            callback && callback();
        }
        oImg.src = wrap.getElementsByTagName('img')[0].src;
        // wrap.appendChild(this.outer);
    }
    Slider.prototype.createIcon = function(){
        var size = this.lis.length,
            $iconDiv = $('<div>').addClass('tabiconwrap');

        for( var i = 0; i < size; i++ ){
            var $span = i == 0?$('<span>').addClass('cur'):$('<span>');
            $iconDiv.append($span);
        }
        $(this.wrap).find('.tabiconwrap').remove();
        $(this.wrap).append( $iconDiv );
        this.$iconDivs = $iconDiv;
        this.$iconSpan = this.$iconDivs.children('span');
    }
    Slider.prototype.goIndex = function(n){
        var idx = this.idx;
        var lis = this.outer.getElementsByTagName('li');
        var len = lis.length;
        var cidx;

        //如果传数字 2,3 之类可以使得直接滑动到该索引
        if(typeof n == 'number'){
            cidx = idx;
            //如果是传字符则为索引的变化
        }else if(typeof n == 'string'){
            cidx = idx + n*1;
        }

        //当索引右超出
        if(cidx > len-1){
            cidx = len - 1;
            //当索引左超出
        }else if(cidx < 0){
            cidx = 0;
        }

        //保留当前索引值
        this.idx = cidx;

        //改变过渡的方式，从无动画变为有动画
        lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out';
        lis[cidx-1] && (lis[cidx-1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
        lis[cidx+1] && (lis[cidx+1].style.webkitTransition = '-webkit-transform 0.2s ease-out');

        //改变动画后所应该的位移值
        lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)';
        lis[cidx-1] && (lis[cidx-1].style.webkitTransform = 'translate3d(-'+ this.scaleW +'px, 0, 0)');
        lis[cidx+1] && (lis[cidx+1].style.webkitTransform = 'translate3d('+ this.scaleW +'px, 0, 0)');
        this.$iconSpan.eq(cidx).addClass('cur').siblings().removeClass('cur');
    };

    //第三步 -- 绑定 DOM 事件
    Slider.prototype.bindDOM = function(){
        var self = this;
        var scaleW = self.scaleW;
        var outer = self.outer;
        var len = outer.getElementsByTagName('li').length;

        //手指按下的处理事件
        var startHandler = function(evt){

            //记录刚刚开始按下的时间
            self.startTime = new Date() * 1;

            //记录手指按下的坐标
            self.startX = evt.touches[0].pageX;
            self.startY = evt.touches[0].pageY;
            //清除偏移量
            self.offsetX = 0;
            self.offsetY = 0;
            //事件对象
            var target = evt.target;
            while(target.nodeName != 'LI' && target.nodeName != 'BODY'){
                target = target.parentNode;
            }
            self.target = target;

        };

        //手指移动的处理事件
        var moveHandler = function(evt){
            //兼容chrome android，阻止浏览器默认行为


            //计算手指的偏移量
            self.offsetX = evt.targetTouches[0].pageX - self.startX;
            self.offsetY = evt.targetTouches[0].pageY - self.startY;
            if ( typeof self.scrollY == 'undefined') {
                self.scrollY = !!( self.scrollY || Math.abs(self.offsetX) < Math.abs(self.offsetY) );
            }
            if( !self.scrollY ){
                evt.preventDefault();
            }
            // evt.preventDefault();
            var lis = outer.getElementsByTagName('li');
            //起始索引
            var i = self.idx - 1;
            //结束索引
            var m = i + 3;

            //最小化改变DOM属性
            for(i; i < m; i++){
                lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
                lis[i] && (lis[i].style.webkitTransform = 'translate3d('+ ((i-self.idx)*self.scaleW + self.offsetX) +'px, 0, 0)');
            }
        };

        //手指抬起的处理事件
        var endHandler = function(evt){
            // evt.preventDefault();
            //边界就翻页值
            var boundary = scaleW/6;

            //手指抬起的时间值
            var endTime = new Date() * 1;

            //所有列表项
            var lis = outer.getElementsByTagName('li');

            //当手指移动时间超过300ms 的时候，按位移算
            if(endTime - self.startTime > 300){
                if(self.offsetX >= boundary){
                    self.goIndex('-1');
                }else if(self.offsetX < 0 && self.offsetX < -boundary){
                    self.goIndex('+1');
                }else{
                    self.goIndex('0');
                }
            }else{
                //优化
                //快速移动也能使得翻页
                if(self.offsetX > 50){
                    self.goIndex('-1');
                }else if(self.offsetX < -50){
                    self.goIndex('+1');
                }else{
                    self.goIndex('0');
                }
            }
        };
        self.startHandler = startHandler;
        self.moveHandler = moveHandler;
        self.endHandler = endHandler;

    };
    Slider.prototype.bindEvent = function(){
        //绑定事件
        var self = this;
        self.outer.addEventListener('touchstart', function(evt){
            self.startHandler(evt);
        },false);
        self.outer.addEventListener('touchmove', function(evt){
            self.moveHandler(evt);
        },false);

        self.outer.addEventListener('touchend', function(evt){
            self.endHandler(evt);
        },false);
    }
    return Slider;

});