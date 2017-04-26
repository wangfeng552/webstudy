//usage:$("#stage").fullscreenstage(width:1024,height:768,x:50,y:50,top:0,bottom:0,left:0,right:0)
(function($){
    if ($.fn.fullscreenstage) return;
    $.fn.fullscreenstage=function(config){
        var fss=$.fn.fullscreenstage;
        $(this).each(function(){
            if (config){
                var data=$(this).data(fss._data);
                if (config=="update"){
                    if (data){
                        $(data.wrapper).each(function(){fss.hookeach(this,true)});
                    }
                    return;
                }
                if (! data){
                    data=$.extend({},fss.defaults,config);
                    data.activeitem=this;
                    var wrapper=$("<div></div>").addClass(fss.wrapper_class);
                    $(this).after(wrapper);
                    wrapper.css({height:"100%",width:"100%",overflow:'hidden'});
                    wrapper.bind("updatesize",fss.hookeach);
                    $(this).appendTo(wrapper);
                    var dirs=["top","bottom","left","right"];
                    for (var dir in dirs){fss.getfix(this,data,dirs[dir])}
                    data.wrapper=wrapper[0];
                }else{
                    data==$.extend(data,fss.defaults,config);
                }

                $(data.wrapper).removeClass(fss.wrapper_disable_class);
                $(data.activeitem).addClass(fss.active_class);

                data.width=data.width || $(this).width();
                data.height=data.height || $(this).height();
                $(this).data(fss._data,data);
                $(data.wrapper).data(fss._data,data);
                if (! fss.hooked){
                    $(window).resize(fss.hook);
// 	  $(window).bind('orientationchange',fss.orientationchange);
                    fss.hooked=true;
                }
                fss.hook();
            }else{
                data=$(this).data(fss._data);
                if (data){
                    $(data.wrapper).addClass(fss.wrapper_disable_class);
                    $(data.activeitem).removeClass(fss.active_class);
                }
            }
        });
    }
    var fss=$.fn.fullscreenstage;
    fss.getfix=function(obj,data,dir){
        if (data[dir]=="auto"){
            data[dir]=0;
            var rawvalue=$(obj).css("margin-"+dir);
            if (rawvalue.substr(-2)=="px"){
                data[dir]=rawvalue.substr(0,-3)*1;
            }
        }

    }
    fss.hook=function(){
        $("."+fss.wrapper_class).each(function(){fss.hookeach(this)});
    };
    fss.orientationchange=function(){
        $(window).triggerHandler('orientationchange');
    }
    fss.hookeach=function(obj,manual){
        if (!$(obj).hasClass(fss.wrapper_disable_class)){
            var data=$(obj).data(fss._data);
            if (!(manual || data.autoupdate)){return;}
            var width=$(obj).width()+data.left+data.right;
            var height=$(obj).height()+data.top+data.bottom;
            $("."+fss.active_class,obj).each(function(){
                var data=$(this).data(fss._data);
                var domwhrate=data.width/data.height;
                if (domwhrate>width/height){
                    if (data.expand){
                        $(this).css({'margin-top':0,'margin-left':"-"+String((height*domwhrate-width+data.left)*data.x/100)+"px"});
                        $(this).height(height);
                        $(this).width(height*domwhrate);
                    }else{
                        $(this).css({'margin-top':String((height-data.top-width/domwhrate )*data.y/100)+"px",'margin-left':0});
                        $(this).width(width);
                        $(this).height(width/domwhrate);
                    }
                }else{
                    if (data.expand){
                        $(this).css({'margin-top':"-"+String((width/domwhrate-height+data.top)*data.y/100)+"px",'margin-left':0});
                        $(this).width(width);
                        $(this).height(width/domwhrate);
                    }else{
                        $(this).css({'margin-left':String((width-height*domwhrate-data.left)*data.x/100)+"px",'margin-top':0});
                        $(this).height(height);
                        $(this).width(height*domwhrate);
                    }
                }
            });
        }
    }
    fss.hooked=false;
    fss._data="__fss_data_config",
        fss.event={
        };
    fss.defaults={
        imglist:{},
        hrefclass:"image",
        x:50,
        y:50,
        top:"auto",
        bottom:"auto",
        left:"auto",
        right:"auto",
        expand:true,
        autoupdate:true
    };
    fss.wrapper_class="fss-wrapper";
    fss.wrapper_disable_class="fss-wrapper-disable";
    fss.active_class="fss-active-item";
})(jQuery)