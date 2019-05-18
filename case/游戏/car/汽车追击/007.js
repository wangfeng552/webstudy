$("body").bind("touchmove",function(event){
	event.preventDefault();//code
});
// 定义
var i = 0,str='',timer,timer2,timer3,timer4;
var carnum = 12;
// .carBox的left
var Bwidth = $("body").width();
$(".twoCar").css({
	"left":Bwidth+"px"
});
var oneCarw = $(".oneCar").width();
// loading页面
// var timers = setInterval(function(){
// 	var x = parseInt(Math.random()*20);//0~20
// 	i = i + x;
// 	str = i+'%';
// 	if(i>=100){
// 		clearInterval(timers);
// 		$(".load").hide();
// 		$(".page1").show();
// 	}
// 	$('.load .per').html(str);
// },30);
// 1、全部的src
var imgSrc = ["img/bd.png",
				"img/bg-2.png",
				"img/bg-3.png",
				"img/bg-run.png",
				"img/bg-succ.png",
				"img/bg.png",
				"img/false1.png",
				"img/false2.png",
				"img/go.png",
				"img/load.png",
				"img/move.png",
				"img/off.png",
				"img/on.png",
				"img/red.png",
				"img/sudu.png",
				"img/car1.png",
				"img/car2.png"];
var percent;
var loaded = 0,toload = imgSrc.length;
// 2.遍历
for(var i =0;i<toload;i++){
	var img = new Image();
	img.onload = function(){
		loaded++;
		percent = parseInt(loaded/toload*100) + "%";
		$('.load .per').html(percent);
		if(percent == "100%"){
			$(".load").hide();
			$(".page1").show();
		}
	}
	img.src = imgSrc[i];
}
// 声音
var noVoice = false;
$(".on").on('click',function(){
	$(this).hide();
	$(".off").show();
	$("audio").get(0).pause();
	noVoice = true;
	if($("audio").get(1)){
		$("audio").get(1).pause();
	}
});
$(".off").on('click',function(){
	$(this).hide();
	$(".on").show();
	$("audio").get(0).play();
	noVoice = false;
	if($("audio").get(1)){
		$("audio").get(1).play();
	}
});
// page2
$(".btn1").on("click",function(){
	$(".page1").hide();
	$(".page2").show();
	click2();
});
// page2的手指滑动
function click2(){
	$(".red").css({
		"left":"9.9rem"
	});
	$("#audio2").get(0).src = 'audio3.mp3';
	timer2 = setInterval(function(){
		$(".move").css({"left":'7rem'});
		$(".move").animate({left:'3rem'},"slow");
	},1000);
	$(".red").animate({left:"2.5rem"},"slow");
}
// 再次追击的样式重置函数
function reset(){
	carnum = 12;
	$(".car1").css({
		"left":"12rem"
	});
	$(".car2").css({
		"left":"12rem"
	});
	$('.score').html('0');
	$('.go1').html('3').show();
	canTouch = false;
	clearInterval(timer4);//timer4=null;
	clearTimeout(timer3);//timer3=null;
	clearInterval(timer);//timer=null;
	clearInterval(timer2);//timer2=null;//清除page2中的定时器
	$(".page3").css({
		backgroundPositionX:"right"
	});
}
// 汽车开始跑喽～～～～
var touchLock = false;
var touchAble = false;
var strX,endX,pos;
var dis = 0,twoLeft = Bwidth;
function touchCar(){
	var obj = $(".page3").get(0);
	obj.addEventListener('touchstart',function(ev){
		ev.preventDefault();
		if(!touchLock){
			var touch = ev.touches[0];
			strX = touch.pageX;
		}
		touchLock = true;
		// console.log("调用");
	},false);
	obj.addEventListener('touchmove',function(ev){
		ev.preventDefault();
		var touch = ev.touches[0];
		endX = touch.pageX;
	},false);
	obj.addEventListener('touchend',function(){
		dis = strX - endX;
		touchLock = false;
		// 追！
		if(touchAble && dis>0){
			carnum = carnum - dis/200;//rem,   10.9rem
			console.log(twoLeft,dis);//375
			twoLeft = twoLeft - dis;
			if(carnum<=1.1){//确定终点
				carnum = 1.1;
			}
			console.log(dis,twoLeft);
			$(".car2").animate({left:carnum+'rem'},30);	
			$(".twoCar").animate({
				left:twoLeft+"rem",
				// webkitTransition:'1s linear'
			},30);
		}
	},false);
	return;
}
// page2页面中开始游戏按钮---》page3
$(".btn3").on("click",function(){
	// 重置	
	reset();
	$(".page2").hide();
	$(".page3").show();
	var i = 3;
	// if(timer){
	// 	clearInterval(timer);
	// 	timer=null;
	// }
	timer = setInterval(function(){
		i--;
		if(i <= 0){//倒计时GO
			clearInterval(timer);//timer= null;
			clearTimeout(timer3);//timer3=null;
			$(".go1").hide();
			$(".go2").show();//GO
			timer3 = setTimeout(function(){//延时
				$("#audio2").get(0).src = 'audio2.mp3';
				if(noVoice){
					$("#audio2").get(0).pause();
				}
				$(".go2").hide();
				if($(".go2").get(0).style.display == "none"){
					touchAble = true;
				}
				var html = 1;
				// 计时7秒
				timer4 = setInterval(function(){
					html ++;
					if(html>=7){
						clearInterval(timer4);timer4=null;
						touchAble = false;
						setTimeout(function(){
							result();
						},300);
					}
					$(".score").html(html);
				},1000);
				// car1自动
				$('.car1').animate({left:"1.1rem"},7000,'linear');
				$('.oneCar').animate({left:"-"+oneCarw+"rem"},7000,"linear");
				//car2 bug!!!oh!!!!!!no!!!!!o^_^o!!!
				bgMove();
			},1000);
			return;
		}
		$(".go1").html(i);
	},1000);
});
// 之前是给page重复添加事件了。。。。惨！！！
touchCar();
// 背景图片跟着移动
function bgMove(){
	$(".page3").css({
		backgroundPosition:"510rem",
		webkitTransition:'7s linear'
	});
}
// 判断追的结果
function result(){
	var left1 = $('.car1').offset().left;
	var left2 = $('.car2').offset().left;
	$(".page3").hide();
	$("#audio2").get(0).src = '';
	if(left2 > left1){//失败
		$(".page4").show();
	}else{
		var panduan = Math.random();
		panduan >= 0.1 ? $(".page5").show() : $(".page6").show();
	}
	reset();
	return;
}

//再次追击
$('.btn4').on('click',function(){
	$(this).parent().hide();
	$(".page2").show();
	click2();
	// 重置	
	reset();
});
// 了解详情
$('.btn5').on('click',function(){
	$(this).parent().hide();
	// $(".page2").show();
	alert("该页面。。。。");
});	
// 分享好友
$('.btn5').on('click',function(){
	$(this).parent().hide();
	// $(".page2").show();
	alert("该页面。。。。");
});	

// 领取奖励
$('.btn7').on('click',function(){
	$(".page6").hide();
	$(".page7").show();
});
// 提交
var iso = false;
$(".choose").on("click",function(){
	if(iso){
		$('.yes').hide();
		$('.no').hide();
		iso = false;
	}else{
		$('.yes').show();
		$('.no').show();
		iso = true;
	}
});
//选择是否试驾
function cClick(e){
	$(e).on("click",function(){
		var str = $(this).html();
		$(".choose").html(str);
		$('.yes').hide();
		$('.no').hide();
		iso = false;
	});
}
cClick('.yes');
cClick('.no');
$(".close").on("click",function(){
	$(".page7").hide();
	$(".page1").show();
});

$("#user").change(function(){
	var name = $(this).val();
	if(name == ""){
		$(this).focus();
	}
});
$("#phone").change(function(){
	var reg = /^1[34578]\d{9}$/g;
	var str = $(this).val();
	if(!reg.test(str)){
		$(this).focus();
	}
});





// // 1、全部的src
// var imgSrc = ["",""];
// var loaded = 0,toload = imgSrc.length;
// var img = new Image();
// img.onlad = function(){
// 	loaded++;
// }
// img.src = '';

// // 2.遍历
// var percent;
// for(var i =0;i<imgSrc.length;i++){
// 	var img = new Image();
// 	img.onload = function(){
// 		loaded++;
// 		percent = loaded/toload;
// 	}
// }
// window.location.origin+"....";


// 1/重新一个页面的时候音开关





