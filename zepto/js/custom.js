
/*微信判断js*/
function isWeixinBrowser(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
/*cookie*/
(function(){
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  r[2];
    }
    var utm_source=GetQueryString("utm_source");
    var utm_campaign=GetQueryString("utm_campaign");
    window.setCookie=function(name,value)
    {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=zhong.com";
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=zhongchouban.com.cn";
    };
    if(utm_source){
        setCookie("utm_source",utm_source)
    }
    if(utm_campaign){
        setCookie("utm_campaign",utm_campaign)
    }
})(Zepto);
/*弹窗公用 js*/
var settime=null ;//settimeout 临时
function openExt(obj,settimeout){
    obj.show();
    obj.animate({opacity:1},300);
    if(settimeout){
        settime=setTimeout(function(){
            closeExt($(".ext_warning"));
        },2000)
    }
}
function closeExt(obj){
    obj.animate({
        opacity:0
    },300,'ease-in-out',function(){
        obj.hide()
    });
}

$(".ext_warning").click(
    function(e){
        clearTimeout(settime);
        closeExt($(this));
    }
);
/*end:弹窗公用js*/
/*后台架构js*/
var warning="";
var warning_obj=$(".ext_warning");
var warning_obj_inner=$(".ext_warning .wrapper");
/*验证信息*/
function checkUserName_phone(val){
    if($.trim(val)==""){
        warning="手机号格式不正确";
        return false;
    }else if(!(/^1\d{10}$/.test($.trim(val)))){
        warning="手机号格式不正确";
        return false;
    }else{
        return true
    }
};
function checkPassWord_register(val){
    if($.trim(val)=="") {
        warning="密码不能为空白";
        return false;
    }
    else if(!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9~!@#$%^&*()_+=`;':",.<>/?]{6,20}$/.test($.trim(val))){
        warning="密码必须为6-20位数字和字母组合";
        return false;
    }
    else{
        return true;
    }
};
function checkPassWord(val){
    if($.trim(val)=="") {
        warning="密码不能为空白";
        return false;
    }
    else{
        return true;
    }
};
function checkIdcode(val){
    if($.trim(val)!="") {
        return true;
    }
    else{
        warning="验证码不能为空白";
        return false;
    }
};
function checkRePassWord(val1,val2){
    if(val1==val2) {
        return true;
    }
    else{
        warning="两次密码必须相同";
        return false;
    }
};
function checkEmail(val){
    if($.trim(val)=="") {
        warning="邮箱不能为空白";
        return false;
    }
    else if(!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test($.trim(val))){
        warning="您输入的邮箱有误";
        return false;
    }
    else{
        return true;
    }
};
function ajax_Form(data,url){
    var result="";
    $.ajax({
        type: 'POST',
        url: url ,
        data: data ,
        success: function(data){
            result=data;
        } ,
        error:function(error){
        },
        dataType: "json"
    });
    return result;
}
/*end:后台架构js*/

/*checkbox     register2.html*/
(function(){
    $("a.checkbox").click(function(e){
        e.preventDefault();
        var obj=$(this);
        if(obj.hasClass("checkbox_disable")) return;
        if(obj.hasClass("checked")){
            obj.removeClass("checked");
        }else{
            obj.addClass("checked");
        }
        return false;
    })
})(Zepto);
(function(){
    $(".register_detail form i a").click(function(e){
        e.preventDefault();
        openExt($(".ext_register"))
    })
})(Zepto);
/*ext close*/
(function(){
    $(".ext a.close").click(function(e){
        e.preventDefault();
        var ext=$(this).parents(".ext")
        closeExt(ext)
    });

})(Zepto);


/*form radiobox*/
(function(){
    var document_obj=$(document);
    document_obj.on("touchstart","li.radio",function(){
        var obj=$(this);
        if(obj.hasClass("radio_disable")) return;
        var data_name=obj.attr("data-name");
        $("[data-name="+data_name+"]").removeClass("radio_checked");
        obj.addClass("radio_checked")
    })
    document_obj.on("click","li.radio",function(){
        var obj=$(this);
        if(obj.hasClass("radio_disable")) return;
        var data_name=obj.attr("data-name");
        $("[data-name="+data_name+"]").removeClass("radio_checked");
        obj.addClass("radio_checked")
    })
})(Zepto);
/*form checkbox*/
(function(){
    var document_obj=$(document);
    document_obj.on("touchstart click","li.checkbox",function(e){
        e.stopPropagation();
        var obj=$(this);
        if(obj.hasClass("checked")){
            obj.removeClass("checked")
        }else{
            obj.addClass("checked")
        }
        var fn=obj.data("function");
        if(fn){
            fn(obj)
        }
    })
})(Zepto);
/*form normal_link */
(function(){
    $(".normal_link").parents("form li").click(function(e){
        e.preventDefault();
        if($(this).find("label").hasClass("denied")) return;
        location.href=$(this).find(".normal_link").attr("href");
    })
})(Zepto);
/*full_loading*/
(function(){
    window.addFullLoading=function(text){

        if(text!=undefined){
            $("body").append("<div style='opacity:0'  class='full_loading'><div class='wrapper'><div class='img'><div class='inner'><span></span></div></div><p>"+text+"</p></div></div>");
        }else{
            $("body").append("<div style='opacity:0'  class='full_loading'><div class='wrapper'><div class='img'><div class='inner'><span></span></div></div></div></div>");

        }
        $(".full_loading").css({"opacity":1});
    }
    window.removeLoading=function(){
        var loading=$(".full_loading");
        loading.css({opacity:0});
        setTimeout(function(){
            loading.remove();
        },500)
    }
})(Zepto);

/*temp_alert*/
window.alert=function(text){
    if($(".ext_append").length<=0){
        $("body").append("<div class='ext ext_warning ext_append'><div class='wrapper'></div></div>");
        $(".ext_append").click(function(){
            closeExt($(this))
        })
    }
    var obj=$(".ext_append");
    obj.find(".wrapper").html(text);
    openExt(obj);
}

/*track*/
var _zctrack = _zctrack || ["m"];
if(isWeixinBrowser()){
    _zctrack=["wx"];
}
(function() {
    var hm = document.createElement("script");
    hm.src = "//z.zhong.com/static/track.js?v=20150828";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
/*visble_password*/
(function($) {
    $("a.visible").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var obj=$(this);
        var input_password=$(this).parents("form li").find(".password");
        if(obj.hasClass("active")){
            obj.removeClass("active");
            input_password.attr("type","password");
        }else{
            obj.addClass("active");
            input_password.attr("type","text")
        }
    })
})(Zepto);


/*temp*/
(function($) {
    var last=null;
    var form_li=$("form li");
    form_li.each(function(){
        var obj=$(this);
        if(last!=null){
            if((!last.hasClass("normal") && !last.hasClass("sp1")) && (obj.hasClass("normal") || obj.hasClass("sp3") )){
                last.css({"border-bottom":"none"});last=null;return;
            }
        }
        last=obj;
    })
})(Zepto);


/*验证码*/

(function($){
    var yzm_link=$("a.yzm_link");
    var setInterval_obj=null;
    var totle_setInterval_obj=null;
    yzm_link.data("active",false);
    yzm_link.data("first_active",true);
    window.reverseTime=function (num){
        clearInterval(setInterval_obj);
        clearTimeout(totle_setInterval_obj);
        num-=1;
        yzm_link.text(num+"s后发送");
        setInterval_obj=setInterval(function(){
            num-=1;
            yzm_link.text(num+"s后发送");
        },1000);


        totle_setInterval_obj=setTimeout(function(){
            clearInterval(setInterval_obj);
            yzm_link.text("重新发送");
            yzm_link.removeClass("disable");
            yzm_link.data("active",false);
        },1000*num);
    }
    yzm_link.click(function(e){
        e.preventDefault();
    })
    window.enable_yzm=function(){
        clearInterval(setInterval_obj);
        clearTimeout(totle_setInterval_obj);
        yzm_link.data("first_active",false);
        yzm_link.removeClass("disable");
        yzm_link.text("点击发送")
        yzm_link.data("active",false);

    };
    window.click_yzm=function(fun,fun_error,time){
        yzm_link.click(function(e){
            if($(this).data("first_active")==true){
                if(fun_error!=undefined){
                    fun_error();
                }
                return;}
            if($(this).data("active")==true) {
                return;
            }
            yzm_link.data("active",true);
            e.preventDefault();
            yzm_link.addClass("disable");
            var num=0;
            if(time==undefined){
                num = 60;
            }else{
                num=time;
            }
            reverseTime(num);
            fun();
        });
    };
    window.lock_yzm=function(fun){
        yzm_link.data("first_active",true);
        if(fun!=undefined){
            fun();
        }
    }
})(Zepto);
/*控制高度*/
(function($){
    var $window=$(window);
    var page=$(".pagewrapper");
    var window_height=$window.height();
    $window.resize(function(){
        window_height=$window.height();
        page.css({"min-height":window_height+"px"})
    }).resize()

})(Zepto)

//倒计时
function LoadTimeWf() {
    $(".hs-time").each(
        function(i) {
            var stime = $(this).attr("stime");
            var etime = $(this).attr("etime");
            var d = Date.parse(stime);
            var today = new Date();
            var time = d - today;
            if (Math.floor(time) <= 0) {
                var str = "";
                d = Date.parse(etime);
//				$(this).attr("stime", $(this).attr("etime"));
                today = new Date();
                time = d - today;
                if(Math.floor(time) <= 0){
                    str = "已结束";
                }else{
                    //var tday = Math.floor(time/ (1000 * 60 * 60 * 24));
                    var thour = Math.floor(time / (1000 * 60 * 60 * 24))*24 + Math.floor(time / (1000 * 60 * 60)) % 24;
                    if(thour < 10){
                        thour = "0" + thour;
                    }
                    var tminute = Math.floor(time / (1000 * 60)) % 60;
                    if(tminute < 10){
                        tminute = "0" + tminute;
                    }
                    var tsecond = Math.floor(time / 1000) % 60;
                    str ="<cite>" + thour + "</cite>小时<cite>" + tminute
                        + "</cite>分<cite>" + tsecond
                        + "</cite>秒后 将取消订单，请尽快支付";
                }
                $(this).html(str);
            } else {
                //var tday = Math.floor(time / (1000 * 60 * 60 * 24));
                var thour = Math.floor(time / (1000 * 60 * 60 * 24))*24 + Math.floor(time / (1000 * 60 * 60)) % 24;
                if(thour < 10){
                    thour = "0" + thour;
                }
                var tminute = Math.floor(time / (1000 * 60)) % 60;
                if(tminute < 10){
                    tminute = "0" + tminute;
                }
                var tsecond = Math.floor(time / 1000) % 60;
                str =  thour
                    + "</cite>小时<cite>" + tminute
                    + "</cite>分<cite>" + tsecond + "</cite>秒开始";
                $(this).html(str);
            }
        });
    setTimeout(LoadTimeWf, 1000);
}
LoadTimeWf();

