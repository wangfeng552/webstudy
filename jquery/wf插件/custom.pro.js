(function(window,jQuery){
    var $=jQuery;
    return (function(){
        zhong=function(){};
        //对象参数类
        zhong._obj={
            //document
            document:$(document),
            body_obj:$("body"),
            //select
            select_part:$(".select_part"),
            //checkbox 计数
            wly_checkbox_i:0,
            //radio 计数
            wly_radio_i:0,
            //旧版弹窗
            ext:$(".ext"),
            //旧版弹窗 关闭按钮
            ext_close:$(".ext .close"),
            //旧版残留bgcover
            bgcover:$(".bgcover"),
            //判断提示语句
            warning:"",
            /*验证码按钮相关*/
            yzm_link:$("a.yzm"),
            yzm_setInterval_obj:null,
            totle_setInterval_obj:null


        };
        //工具类
        zhong._tool={
            //遍历cookie
            _GetQueryString:function(name){
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if(r!=null)return  r[2];
            },
            //select
            wly_select_function:function(){
                var select_part=$(".select_part");
                select_part.data("open",false);
                select_part.find("ul").hide();
                select_part.each(function(){
                    var this_select= $(this);
                    if(this_select.data("function")==true) return;
                    this_select.data("function",true);
                    this_select.children("a").bind("click",function(e){
                        e.preventDefault();
                        var obj=$(this);
                        var select =obj.parents(".select_part");
                        var ul=select.find("ul");

                        select_part.find("ul").hide();
                        select_part.data("open",false);

                        if(select.data("open")){
                            ul.hide();
                            select.data("open",false);
                        }else{
                            ul.show();
                            select.data("open",true);

                        }
                    });
                });
            },
            //checkbox
            wly_checkbox_function:function(){
                $( "input[type=checkbox]").each(function(){
                    var i=zhong._obj.wly_checkbox_i;
                    var obj=$(this);
                    if(obj.data("function")==true) return;
                    obj.data("function",true);
                    var name=obj.attr("name");
                    var value=obj.attr("value");
                    obj.hide();
                    if(obj.attr("checked")!="checked"){
                        obj.after("<div id='spcheckbox"+i+"' class='spcheckbox sp"+name+"'></div>");
                    }else{
                        obj.after("<div id='spcheckbox"+i+"' class='spcheckbox sp"+name+" check_active'></div>");
                    }
                    $(".sp"+name).data("name",name);

                    var new_obj=$("#spcheckbox"+i)
                    new_obj.data("value",value);
                    if(obj.attr("disabled")=="disabled"){
                        new_obj.addClass("disabled")
                    }
                    zhong._obj.wly_checkbox_i++;
                });
            },
            //radio
            wly_radio_function:function(){
                $("input[type=radio]").each(function () {
                    var i=zhong._obj.wly_radio_i;
                    var obj=$(this);
                    if(obj.data("function")==true) return;
                    obj.data("function",true);
                    var name = obj.attr("name");
                    var value = obj.attr("value");
                    obj.hide();
                    if (obj.attr("checked") != "checked") {
                        obj.after("<div id='spradio" + i + "' class='spradio sp" + name + "'></div>");
                    } else {
                        obj.after("<div id='spradio" + i + "' class='spradio sp" + name + " radio_active'></div>");
                    }
                    $(".sp" + name).data("name", name);
                    $("#spradio" + i).data("value", value);
                    zhong._obj.wly_radio_i++;
                });
            },
            //旧版弹窗-开启
            openExt:function(obj){
                if (isIe6) {
                    $(obj).css({"top":($(window).scrollTop()+250)})
                    zhong._obj.bgcover.width("1200");
                    zhong._obj.bgcover.height($(".bodyer").height());
                }
                zhong._obj.bgcover.show();
                zhong._obj.bgcover.stop().animate({"opacity":0.6},500);
                $(obj).show();
            },
            //旧版弹窗-关闭
            closeExt:function(obj){
                $(obj).hide();
                zhong._obj.bgcover.stop().animate({"opacity":0},500,function(){
                    zhong._obj.bgcover.hide();
                })
            },
            //旧版表单提示
            infornmation_alert:function (type,name,text){
                remove_infornmation_alert(name);
                var input=$("[name="+name+"]");
                var parent= input.parents(".input_row");
                parent.find(".correct").remove();
                parent.find(".error").remove();
                if(type=="error"){
                    input.addClass("error");
                }
                if(!text){
                    text="";
                }
                parent.append("<em class='"+type+"'>"+text+"</em>");
            },
            //旧版表单消除提示
            remove_infornmation_alert:function(name){
                var input=$("[name="+name+"]");
                input.removeClass("error");
                input.parents(".input_row").find(".correct").remove();
                input.parents(".input_row").find(".error").remove();
            },
            //密码强度测试
            password_detect:function(value){
                var this_value= $.trim(value);
                if(/^[A-Za-z0-9\x21-\x7e]{10,20}$/.test(this_value) && /[~!@#$%^&*()_+`=,.\-<>?/\\、'";（）…￥]{1,}/g.test(this_value) && /[A-Z]{1,}/g.test(this_value) &&  /[a-z]{1,}/g.test(this_value) &&  /[0-9]{1,}/g.test(this_value)){
                    return 3;
                }else if((/^[A-Za-z0-9\x21-\x7e]{6,9}$/.test(this_value) &&  /[A-Z]{1,}/g.test(this_value) &&  /[a-z]{1,}/g.test(this_value) &&  /[0-9]{1,}/g.test(this_value))|| (/^[A-Za-z0-9\x21-\x7e]{10,20}$/.test(this_value) &&  /[a-zA-Z]{1,}/g.test(this_value) &&  /[0-9]{1,}/g.test(this_value))){
                    return 2;
                }else if(/^[a-zA-Z0-9]{6,10}$/.test(this_value) &&  /[a-zA-Z]{1,}/g.test(this_value) &&  /[0-2]{1,}/g.test(this_value)){
                    return 1;
                }else {
                    return 0;
                }
            },
            /*
             *判断格式
             * */
            //姓名
            checkUserName_phone:function(val){
                if($.trim(val)==""){
                    warning="手机号不能为空白";
                    return false;
                }else if(!(/^1\d{10}$/.test($.trim(val)))){
                    warning="手机号格式不正确";
                    return false;
                }else{
                    return true
                }
            },
            //注册密码
            checkPassWord_register:function(val){
                if($.trim(val)=="") {
                    warning="密码不能为空白";
                    return false;
                }
                else if(!/^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z0-9~!@#$%^&*()_+<>/;'`,.=]{6,20}$/.test($.trim(val))){
                    warning="密码必须为6-20位数字和字母组合";
                    return false;
                }
                else{
                    return true;
                }
            },
            //普通密码
            checkPassWord:function(val){
                if($.trim(val)=="") {
                    warning="密码不能为空白";
                    return false;
                }
                else{
                    return true;
                }
            },
            //ID
            checkIdcode:function(val){
                if($.trim(val)!="") {
                    return true;
                }
                else{
                    warning="验证码不能为空白";
                    return false;
                }
            },
            //重复密码
            checkRePassWord :function(val1,val2){
                if(val1==val2) {
                    return true;
                }
                else{
                    warning="两次密码必须相同";
                    return false;
                }
            },
            //email
            checkEmail :function(val){
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
            },
            /*验证码相关*/
            //倒计时
            reverseTime:function(num){
                clearInterval(zhong._obj.setInterval_obj);
                clearTimeout(zhong._obj.totle_setInterval_obj);
                num-=1;
                zhong._obj.yzm_link.text(num+"s,重新发送验证码");
                zhong._obj.setInterval_obj=setInterval(function(){
                    num-=1;
                    yzm_link.text(num+"s,重新发送验证码");
                },1000);


                zhong._obj.totle_setInterval_obj=setTimeout(function(){
                    clearInterval(zhong._obj.setInterval_obj);
                    zhong._obj.yzm_link.text("重新发送验证码");
                    zhong._obj.yzm_link.removeClass("disable");
                    zhong._obj.yzm_link.data("active",false);
                },1000*num);
            },
            //开启验证码
            enable_yzm:function(){
                clearInterval(zhong._obj.setInterval_obj);
                clearTimeout(zhong._obj.totle_setInterval_obj);
                zhong._obj.yzm_link.data("first_active",false);
                zhong._obj.yzm_link.removeClass("disable");
                zhong._obj.yzm_link.text("发送验证码");
                zhong._obj.yzm_link.data("active",false);

            },
            //绑定验证码事件
            click_yzm:function(fun,fun_error,time){
                zhong._obj.yzm_link.click(function(e){
                    if($(this).data("first_active")==true){
                        if(fun_error!=undefined){
                            fun_error();
                        }
                        return;}
                    if($(this).data("active")==true) {
                        return;
                    }
                    zhong._obj.yzm_link.data("active",true);
                    e.preventDefault();
                    zhong._obj.yzm_link.addClass("disable");
                    var num=0;
                    if(time==undefined){
                        num = 60;
                    }else{
                        num=time;
                    }
                    reverseTime(num);
                    fun();
                });
            },
            //锁定验证码
            lock_yzm:function(fun){
                zhong._obj.yzm_link.data("first_active",true);
                if(fun!=undefined){
                    fun();
                }
            },
            //限时
            time_detected:function(start,end){
                var n=new Date();
                var now_date=n.getTime();
                var start_time=Date.parse(start);
                var end_time=Date.parse(end);
                if(now_date<start_time || now_date>end_time){
                    return false;
                }else{
                    return true;
                }
            },
            //滚动至某个元素
            wlyscrollTo:function(obj){
                var top=obj.offset().top;
                $('html,body').stop().animate({scrollTop:top-50+"px"},300);
            },
            /*window.alert
             * text   主要文字
             * type   弹窗类型  1： 成功   2： 等待中  3：失败  5：警告
             * h2     弹窗标题
             * link   按钮文字
             * url   按钮链接
             * fun   按钮的功能
             * bgcover_bool   false:关闭 遮罩关闭功能
             * close_bool   false:关闭 遮罩关闭功能
             * */
            alert:function(text,type,h2,link,url,fun,bgcover_bool,close_bool){
                if(type== undefined){
                    type=5;
                }
                var main_name="";
                var class_name="ext_state"+type;
                var html='';
                var obj=null;

                switch (type){
                    case 1:main_name="ext_hint_success"; break;
                    case 2:main_name="ext_hint_wait"; break;
                    case 3:main_name="ext_hint_failed"; break;
                    case 5:main_name="ext_hint_warning"; break;
                    default :main_name="ext_hint_warning"; break;
                }

                if($(".bgcover").length<=0){
                    $("body").append('<div class="bgcover"></div>');
                }
                $(document).off("click",".bgcover");
                if(bgcover_bool==undefined || bgcover_bool==true ){
                    $(document).on("click",".bgcover",function(){
                        zhong._tool.closeExt($(".ext"))
                    });
                }
                if($("."+class_name).length<=0){
                    html+='<div class="ext '+class_name+'"><h1>提示</h1><div class="ext_hint '+main_name+'"><div class="img"></div><div class="content">';
                    if(h2==undefined) h2="";
                    html+='<h2>'+h2+'</h2>';
                    html+='<p>'+text+'</p>';

                    if(link!=undefined){
                        if(url==undefined){
                            url="#"
                        }
                        html+='<a href="'+url+'" class="confirm2"  target="_blank">'+link+'</a>';
                    }
                    html+='</div></div><a href="#" class="close">关闭</a></div>';

                    $("body").append(html);

                    if(fun!=undefined){
                        $("."+class_name).find(".confirm2").click(function(e){
                            e.preventDefault()
                            fun();
                        })
                    }
                    obj=$("."+class_name);
                }else{
                    var bgcover=$(".bgcover");
                    obj=$("."+class_name);
                    obj.find("p").html(text);
                    if(h2!=undefined) obj.find("h2").html(h2);
                    if(link!=undefined){
                        if(url==undefined){
                            url="#"
                        }
                        if(obj.find(".confirm2").length<=0){
                            obj.find(".content").append('<a href="'+url+'" class="confirm2"  target="_blank">'+link+'</a>')
                        }else{
                            var button= obj.find(".confirm2");
                            button.text(link);
                            button.attr("href",url);
                        }
                        var button= obj.find(".confirm2");
                        button.unbind("click");
                        bgcover.unbind("click");
                        if(fun!=undefined){
                            button.click(function(e){
                                e.preventDefault();
                                fun();
                            })
                        }
                    }else{
                        obj.find(".confirm2").remove();
                    }


                }
                if(close_bool==undefined || close_bool==true ){
                    obj.find(".close").show();
                }else if(close_bool==false){
                    obj.find(".close").hide();
                }
                zhong._tool.openExt(obj);
            },
            /*pop 组件
             * 基础
             * check_bgcover
             * pop_open
             * pop_close
             * */
            //bgcover
            check_bgcover:function(){
                if(zhong._obj.bgcover.length>0) return; //zhong._obj.bgcover=$(".bgcover")
                else {zhong._obj.body_obj.append('<div class="bgcover"></div>');zhong._obj.bgcover=$(".bgcover")} //zhong._obj.body_obj=$("body)
            },
            //开启弹窗
            pop_open:function(obj){
                if (isIe6) {
                    obj.css({"top":($(window).scrollTop()+250)});
                    zhong._obj.bgcover.width("1200");
                    zhong._obj.bgcover.height(zhong._obj.body_obj.height());
                }
                zhong._obj.bgcover.show();
                zhong._obj.bgcover.stop().animate({"opacity":0.6},500);
                obj.show();
            },
            //关闭弹窗
            pop_close:function (obj){
                obj.hide();
                zhong._obj.bgcover.stop().animate({"opacity":0},500,function(){
                    zhong._obj.bgcover.hide();
                })

            },

            /*pop_estate
             *
             * config
             *  title ：标题
             *  style ：类型 1警告 2通过 3失败 4等待
             *  subtitle ：副标题
             *  content ：内容
             *  submit ：按钮内容
             *  submit_link ：按钮链接
             *  submit_link_function ：按钮方法
             *  close_button ：true
             *
             * */
            pop_estate:function(option){
                var _default={
                    title:"提示",
                    style:1,
                    subtitle:undefined,
                    content:undefined,
                    submit:undefined,
                    submit_link:"#",
                    submit_link_function:function(){},
                    sub_submit:undefined,
                    sub_submit_link:"#",
                    close_button:true,
                    close_button_function:function(){},
                    bg_cover_function:function(){
                        zhong._tool.pop_close($(".pop_estate"))
                    }
                };
                option= $.extend(_default,option);
                var pop_estate=$(".pop_estate");
                if(pop_estate.length<=0){
                    var html='';
                    html+='<div style="display:none" class="pop_part pop_estate'+option.style+' pop_estate"><div class="inner"><div class="pop_head"><h1>'+option.title+'</h1>';
                    if(option.close_button){
                        html+='<a href="#">关闭</a>';
                    }else{
                        html+='<a href="#" style="display: none">关闭</a>';
                    }
                    html+='</div><div class="pop_body"><div class="clearfix estate_main"><div class="img"></div><div class="content">';
                    if(!option.subtitle){
                        option.subtitle="";
                    }
                    html+='<h2>'+option.subtitle+'</h2>';
                    if(!option.content){
                        option.content="";
                    }
                    html+='<p>'+option.content+'</p></div></div>';
                    if(!option.sub_submit){
                        if(option.submit){
                            html+='<a class="pop_submit" href="'+option.submit_link+'">'+option.submit+'</a><a class="pop_sub_submit" style="display:none" href="#"></a>';
                        }else{
                            html+='<a class="pop_submit" style="display:none" href="'+option.submit_link+'"></a><a class="pop_sub_submit" style="display:none" href="#"></a>';
                        }
                    }else{
                        if(option.submit){
                            html+='<a class="pop_submit pop_submit_sp" href="'+option.submit_link+'">'+option.submit+'</a><a class="pop_sub_submit" href="'+option.sub_submit_link+'">'+option.sub_submit+'</a>';
                        }else{
                            html+='<a class="pop_submit pop_submit_sp" style="display:none" href="'+option.submit_link+'"></a><a class="pop_sub_submit" href="'+option.sub_submit_link+'">'+option.sub_submit+'</a>';
                        }
                    }
                    html+='</div></div></div>';

                    zhong._tool.check_bgcover();
                    zhong._obj.body_obj.append(html);
                    pop_estate=$(".pop_estate");
                }else{
                    pop_estate.attr("class","pop_part pop_estate pop_estate"+option.style);
                    pop_estate.find("h1").text(option.title);
                    if(!option.subtitle){
                        option.subtitle="";
                    }
                    pop_estate.find("h2").text(option.subtitle);
                    if(!option.content){
                        option.content="";
                    }
                    pop_estate.find("p").html(option.content);
                    if(option.submit){
                        pop_estate.find("a.pop_submit").attr("href",option.submit_link).text(option.submit).show();
                    }else{
                        pop_estate.find("a.pop_submit").hide();
                    }
                    if(option.sub_submit){
                        pop_estate.find("a.pop_sub_submit").text(option.sub_submit).attr("href",option.sub_submit_link).show();
                        pop_estate.find("a.pop_submit").addClass("pop_submit_sp");
                    }else{
                        pop_estate.find("a.pop_sub_submit").hide();
                        pop_estate.find("a.pop_submit").removeClass("pop_submit_sp");
                    }
                    if(option.close_button){
                        pop_estate.find(".pop_head a").show();
                    }else{
                        pop_estate.find(".pop_head a").hide();
                    }

                }
                pop_estate.find("a.pop_submit").unbind("click").bind("click",function(){
                    option.submit_link_function();
                });
                pop_estate.find(".pop_head a").unbind("click").bind("click",function(){
                    option.close_button_function();
                    zhong._tool.pop_close( $(this).parents(".pop_part"));
                });
                $(".bgcover").unbind("click").bind("click",function(){
                    option.bg_cover_function();
                });
                zhong._tool.pop_open(pop_estate)
            } ,
            /*pop_iframe
             *
             * config
             *  title ：标题
             *  src ：iframe链接
             *  width ：窗口大小 宽度
             *  height ：窗口大小 高度
             *
             * */
            pop_iframe:function(option){
                var _default={
                    title:"提示",
                    src:"#",
                    width:545,
                    height:518,
                    close_button:true,
                    close_button_function:function(){},
                    bg_cover_function:function(){
                        zhong._tool.pop_close($(".pop_iframe"));
                    }
                };
                option= $.extend(_default,option);
                var pop_iframe=$(".pop_iframe");
                if(pop_iframe.length<=0){
                    var html='<div class="pop_part pop_iframe" style="width: '+option.width+'px;height: '+option.height+'px;margin-left: -'+option.width/2+'px;margin-top: -'+option.height/2+'px;"><div class="inner"><div class="pop_head"><h1>'+option.title+'</h1><a href="#">关闭</a></div><div class="pop_body"><iframe style="height: '+(option.height-74)+'px;" frameborder="0" src="'+option.src+'" scrolling="no"></iframe></div></div> </div>';
                    window.check_bgcover();
                    zhong._obj.body_obj.append(html);
                    pop_iframe=$(".pop_iframe");
                }else{
                    pop_iframe.find("h1").text(option.title);
                    pop_iframe.css({width:option.width,height:option.height,"margin-left": '-'+option.width/2+'px','margin-top': '-'+option.height/2+'px'});

                    var old_src=pop_iframe.find("iframe").attr("src");
                    if($.trim(old_src)!= $.trim(option.src)){
                        pop_iframe.find("iframe").remove();
                        pop_iframe.find(".pop_body").append('<iframe frameborder="0" scrolling="no"></iframe>');
                        pop_iframe.find("iframe").attr("src",option.src);
                    }
                    pop_iframe.find("iframe").css({height:option.height-74});
                }
                if(option.close_button){
                    pop_iframe.find(".pop_head a").show();
                }else{
                    pop_iframe.find(".pop_head a").hide();
                }
                pop_iframe.find(".pop_head a").unbind("click").bind("click",function(){
                    option.close_button_function();
                    zhong._tool.pop_close( $(this).parents(".pop_part"));
                });
                $(".bgcover").unbind("click").bind("click",function(){
                    option.bg_cover_function();
                });
                zhong._tool.pop_open(pop_iframe)
                pop_iframe.find("iframe").show();


            },

            /*pop_single
             *
             * config
             *  title ：标题
             *  content ：内容
             *  submit ：按钮内容
             *  submit_link ：按钮链接
             *  submit_link_function ：按钮方法
             * */
            pop_single:function(option) {
                var _default = {
                    title: "提示",
                    content: "test",
                    submit: "text",
                    submit_link: "#",
                    submit_link_function: function () {
                    }
                };
                option = $.extend(_default, option);
                var pop_single = $(".pop_single");
                if (pop_single.length <= 0) {
                    var html = '';
                    html += '<div class="pop_part pop_single" style="display: none"><div class="inner"><div class="pop_head"><h1>' + option.title + '</h1><a href="#">关闭</a></div><div class="pop_body"><div class="single_main"><div class="content">' + option.content + '</div></div> <a class="pop_submit" href="'+ option.submit_link + '">' + option.submit + '</a></div></div></div>';

                    window.check_bgcover();
                    zhong._obj.body_obj.append(html);
                    pop_single = $(".pop_single");
                } else {
                    pop_single.find("h1").text(option.title);
                    pop_single.find(".content").html(option.content);
                    pop_single.find(".pop_submit").attr("href",option.submit_link).text(option.submit)
                }
                pop_single.find("a.pop_submit").unbind("click").bind("click", function () {
                    option.submit_link_function();
                });
                zhong._tool.pop_open(pop_single);
            }


        };
        //默认执行
        zhong._init={
            //utm 串号
            utm_source:function(){
                var utm_source=zhong._tool._GetQueryString("utm_source");
                if(utm_source){
                    setCookie("utm_source",utm_source)
                }
            },
            //模拟select
            wly_select:function(){
                zhong._tool.wly_select_function();
                zhong._obj.document.on("click",".select_part li a",function(e){
                    e.preventDefault();
                    var obj=$(this);
                    var ul =obj.parents("ul");
                    var select=ul.parents(".select_part");
                    var select_main=select.children("a");

                    zhong._obj.select_part.data("open",false);

                    var value=obj.attr("data-value");
                    var text="";
                    if(obj.attr("data-text")!=undefined){
                        text=obj.attr("data-text");
                    }else{
                        text=obj.text();
                    }
                    select_main.attr("data-value",value);
                    select_main.text(text);

                    $(".select_part  li a").removeClass("active");
                    zhong._obj.select_part.removeClass("active");
                    obj.addClass("active");
                    select.children("a").addClass("active");
                    select.addClass("active");
                    $(".select_part ul").hide();
                });
                zhong._obj.document.click(function(e){
                    if($(e.target).parents(".select_part").length==0){
                        $(".select_part ul").hide();
                    }
                });
            },
            //模拟checkbox
            wly_checkbox:function(){
                zhong._tool.wly_checkbox_function();
                zhong._obj.document.on("click",".spcheckbox",function(){
                    var item=$(this);
                    if(item.hasClass("disabled")) return;
                    var value=item.data("value");
                    if(item.hasClass("check_active")){
                        $( "input[value='"+value+"']").attr("checked",false);
                        item.removeClass("check_active");
                        item.parents("tr").removeClass("check_active")
                    }else{
                        item.addClass("check_active");
                        $( "input[value='"+value+"']").attr("checked",true);
                        item.parents("tr").addClass("check_active")
                    }
                });
            },
            //模拟radio
            wly_radio:function(){
                zhong._tool.wly_radio_function();
                zhong._obj.document.on("click",".spradio",function(){
                    var obj=$(this);
                    var spclass=".sp"+obj.data("name");
                    $(spclass).removeClass("radio_active");
                    obj.addClass("radio_active");
                    var value=obj.data("value");
                    $( "input[name='"+obj.data("name")+"']").attr("checked",false);
                    $( "input[value='"+value+"']").attr("checked",true);
                });
            },
            //模拟placeholder
            wly_placeholder:function(){
                var document_obj=zhong._obj.document;
                document_obj.on("keydown",".input_part input",function(){
                    var obj=$(this);
                    var this_input_part=obj.parents(".input_part");
                    this_input_part.find("span").hide();
                });
                document_obj.on("click",".input_part span",function(){
                    var obj=$(this);
                    var this_input_part=obj.parents(".input_part");
                    obj.hide();
                    this_input_part.find("input").focus();
                });
                document_obj.on("touchstart",".input_part span",function(){
                    var obj=$(this);
                    var this_input_part=obj.parents(".input_part");
                    obj.hide();
                    this_input_part.find("input").focus();
                });
                document_obj.on("blur",".input_part input",function(){
                    var obj=$(this);
                    var this_input_part=obj.parents(".input_part");
                    if($.trim(obj.val())=="") {
                        this_input_part.find("span").show();
                    }
                });
                document_obj.on("change",".input_part input",function(){
                    var obj=$(this);
                    var this_input_part=obj.parents(".input_part");
                    if($.trim(obj.val())=="") {
                        this_input_part.find("span").show();
                    }else{
                        this_input_part.find("span").hide();
                    }
                });
                $(function(){
                    var obj=$("input");
                    obj.each(function(){
                        var this_input_part=$(this).parents(".input_part");
                        if($.trim($(this).val())=="") {
                            this_input_part.find("span").show();
                        }else{
                            this_input_part.find("span").hide();
                        }
                    })
                })
            },
            //旧版弹窗相关
            old_ext:function(){
                zhong._obj.document.on("click",".ext a.close",function(e){
                    e.preventDefault();
                    zhong._tool.closeExt( $(this).parents(".ext"));
                });
                zhong._obj.document.on("click",".bgcover",function(e){
                    var ext=$(".ext");
                    if(ext.length>0){
                        zhong._tool.closeExt(ext)
                    }
                });
            },
            //warning
            warning:function(){
                window.warning="";
            },
            //验证码
            yzm:function(){
                zhong._obj.yzm_link.data("active",false);
                zhong._obj.yzm_link.data("first_active",true);
                zhong._obj.yzm_link.click(function(e){
                    e.preventDefault();
                });
            },
            //share_part
            share_part:function(){
                if($(".bdsharebuttonbox").length>0){
                    var url=window.location.href;
                    var title=$("title").text();
                    var dec=$("[name=description]").attr("content");
                    var img=$(".left .block_img img").attr("src");
                    var host=window.location.host;
                    if(dec==undefined) dec=title;


                    var html_qzone="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=";
                    html_qzone+=url+"&title="+title+"&desc="+dec+"&summary=&site="+host;
                    $("#button_qzone").attr("href",html_qzone);


                    var html_sina="http://service.weibo.com/share/share.php?url=";
                    html_sina+=url+"&title="+title+"&appkey=&desc="+dec+"&pic="+img;
                    $("#button_weibo").attr("href",html_sina);


                    var html_qq="http://share.v.t.qq.com/index.php?c=share&a=index&url=";
                    html_qq+=url+"&title="+title+"&appkey=&desc="+dec+"&pic="+img;
                    $("#button_qq").attr("href",html_qq);


                    var html_renren="http://widget.renren.com/dialog/share?resourceUrl=";
                    html_renren+=url+"&srcUrl="+url+"&title"+title+"&description"+dec+"&pic="+img;
                    $("#button_renren").attr("href",html_renren);



                    var html_douban="http://www.douban.com/share/service?href=";
                    html_douban+=url+"&name="+title+"&text"+dec;
                    $("#button_douban").attr("href",html_douban);
                }
            },
            //pop
            pop:function(){
                $(document).on("click",".pop_head a",function(e){
                    e.preventDefault();
                    zhong._tool.pop_close( $(this).parents(".pop_part"));
                });
            }

        };
        $.each(zhong._init,function(k,fun){
            fun();
        });
        window.$zhong=zhong._tool;
        window.zhong = zhong;

        /*外部调用 临时*/
        $.extend(window,$zhong)
    })()
}(window,jQuery));


/*track*/
(function(){
    /*TrackJs*/
    var _zctrack = _zctrack || ["pc"];
    function loadTrackJs(){
//cnzz
        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan class='trackjs' id='cnzz_stat_icon_1255986542'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1255986542%26show%3Dpic2' type='text/javascript'%3E%3C/script%3E"));

//baidu
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?f5d8bd05260e9514bc89b934e95da201";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
//zhong
        (function() {
            var hk = document.createElement("script");
            hk.src = "//z.zhong.com/static/track.js?v=20150828";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hk, s);
        })();
    };


    loadTrackJs();
})();
/*temp*/
/*submenu*/
(function($){
    $(".user_nav ul li.active").each(function(){
        var obj=$(this);
        var link=obj.find(".children_wrapper");
        var span=obj.find(".children_holder");
        if(obj.hasClass("active")){
            link.data("opened",true)
        }else{
            link.data("opened",false)
        }
    });
    $(".children_wrapper").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var obj=$(this);
        var parent=obj.parents("li");
        var dl=parent.find("dl");
        var dd=parent.find("dd").length;
        var span=parent.find(".children_holder");
        if(obj.data("opened")==true){
            parent.stop().animate({"height":"44px"},300);
            span.removeClass("children_holder_active");
            obj.data("opened",false);
        }else{
            parent.stop().animate({"height":44+dd*35+1+"px"},300);
            span.addClass("children_holder_active");
            obj.data("opened",true)
        }

    })
})(jQuery);

/*pager item*/
(function($){
    $.fn.wly_pager_bulder = function(options){
        var that=this;
        wly_pager_bulder.obj=$(that);
        if(options=="destory"){
            return wly_pager_bulder._destory( wly_pager_bulder.obj);
        }else{
            that.options = $.extend(that.defaults, options);
            wly_pager_bulder.obj.data("wpb_options", that.options );
            wly_pager_bulder._init(that.options.pager_length, that.options.pager_per_length,that.options.pager_percent, wly_pager_bulder.obj)
        }
    };
    var wly_pager_bulder= $.fn.wly_pager_bulder;
    wly_pager_bulder.defaults={
        pager_length:20,
        pager_per_length:10,
        pager_percent:1
    };//默认参数  无
    wly_pager_bulder.html_item=function(num,now_num){
        if(num==now_num) {
            return "<a href='#' class='active' data-pager='"+num+"'>"+num+"</a>";
        }else {
            return "<a href='#' data-pager='" + num + "'>" + num + "</a>";
        }
    };
    wly_pager_bulder.html_item_first=function(now_num,pager_per_length){
        if(now_num<=pager_per_length){
            return "<a href='#' class='first disable' data-pager='1'>|<</a>";
        }else{
            return "<a href='#' class='first' data-pager='1'>|<</a>";
        }
    };
    wly_pager_bulder.html_item_prev=function(now_num){
        if(now_num==1){
            return "<a href='#' class='prev disable' data-pager='1'><</a>";
        }else{
            return "<a href='#' class='prev' data-pager='"+(now_num-1)+"'><</a>";
        }
    };
    wly_pager_bulder.html_item_next=function(now_num,pager_length){
        if(now_num==pager_length){
            return "<a href='#' class='next disable' data-pager='"+pager_length+"'>></a>";
        }else{
            return "<a href='#' class='next' data-pager='"+(now_num+1)+"'>></a>";
        }
    };
    wly_pager_bulder.html_item_last=function(now_num,pager_length,pager_per_length){
        if(now_num>(pager_length-pager_per_length)){
            return "<a href='#' class='last disable' data-pager='"+pager_length+"'>>|</a>";
        }else{
            return "<a href='#' class='last' data-pager='"+pager_length+"'>>|</a>";
        }
    };
    wly_pager_bulder.pager_analize=function(pager_length,pager_per_length,pager_percent){
        if(pager_percent>pager_length || pager_percent<=0){
            return false;
        }
        if(pager_length<pager_per_length){
            pager_per_length=pager_length;
        }
        var array=[];
        var rest=Math.floor(pager_per_length/2);
        if (pager_percent<=rest){
            for(var i=1;i<=pager_per_length;i++){
                array.push(i)
            }
        }else if(pager_percent>pager_length-rest){
            for(var i=pager_length-pager_per_length+1;i<=pager_length;i++){
                array.push(i)
            }
        }else{
            for(var i=pager_percent-rest;i<=pager_percent+rest;i++){
                array.push(i)
            }
        }
        return array;
    };
    wly_pager_bulder.pager_construction=function(array,now_num,pager_per_length,pager_length){
        if(!array){
            return false
        }
        var html="";
        html+=wly_pager_bulder.html_item_first(now_num,pager_per_length);
        html+=wly_pager_bulder.html_item_prev(now_num);
        $.each(array,function(k,v){
            html+=wly_pager_bulder.html_item(v,now_num);
        });
        html+=wly_pager_bulder.html_item_next(now_num,pager_length);
        html+=wly_pager_bulder.html_item_last(now_num,pager_length,pager_per_length);
        return html;
    };
    wly_pager_bulder._destory=function(obj){
        obj.html("")
    };
    wly_pager_bulder._init=function(pager_length,pager_per_length,pager_percent,obj){
        obj.html(wly_pager_bulder.pager_construction(wly_pager_bulder.pager_analize(pager_length,pager_per_length,pager_percent),pager_percent,pager_per_length,pager_length))
    };

})(jQuery);
/*$(".pager .pager_inner").wly_pager_bulder({pager_length:Math.ceil(7/2),pager_per_length:2,pager_percent:4})*/
