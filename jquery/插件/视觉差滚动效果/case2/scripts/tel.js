var trigger = 0

	//jQuery(".imgbox .bd li").each(function(i){ jQuery("#imgbox .bd li").slice(i*6,i*6+6).wrapAll("<ul></ul>");});
	jQuery("#partner").slide({
		mainCell:".imgbox .bd .picList",
		autoPage:true,	
		effect:"leftLoop",	
		autoPlay:true,
		prevCell: ".slideprev",
		nextCell: ".slidenext"	});


$(document).ready(function() {
	$(".love-btn").hover(
	function(){
		$(".show-bj").show();
		$(".show-bj").css("cursor", "pointer");
		$(".show-bj").css("z-index","2");
		$(".show-bj").animate({ left: "365px",opacity: "1" },1000);
	}, 
	function(){
		$(".show-bj").css("cursor", "pointer");
		$(".show-bj").css("z-index","0")
		$(".show-bj").animate({ left: "150px",opacity: "0"  },300);
	});
	$(".love-btn2").hover(
	function(){
		$(".show-bj2").show();
		$(".show-bj2").css("cursor", "pointer");
		$(".show-bj2").css("z-index","2");
		$(".show-bj2").animate({ right: "365px",opacity: "1" },1000);
	}, 
	function(){
		$(".show-bj2").css("cursor", "pointer");
		$(".show-bj2").css("z-index","0")
		$(".show-bj2").animate({ right: "150px",opacity: "0"  },300);
	});

	
	
	
	$('#nav').localScroll();
	$('.mainnav').localScroll();
	$(".wheel-button").wheelmenu({
        trigger: "hover",
        animation: "fly",
        animationSpeed: "slow"
      });

	$("#thumbscreen").slides({
		container: "thumbscreen-slides",
		generateNextPrev: true,
		pagination: false
	});
	/*nav begin*/
	  $("#iconbar li a").hover(
		  function() {
			var iconName = $(this).children("img").attr("src");
			var origen = iconName.split(".png")[0];
			$(this).children("img").attr({src: "" + origen + "o.png"});
			$(this).css("cursor", "pointer");
			$(this).animate({width: "176px"}, {queue: false,duration: "normal"}, 1);
			$(this).children("span").animate({opacity: "show"}, 1);
		  }, 
		  function() {
			var iconName = $(this).children("img").attr("src");
			var origen = iconName.split("o.")[0];
			$(this).children("img").attr({src: "" + origen + ".png"});
			$(this).animate({width: "31px"}, {queue: false,duration: "normal"}, 1);
			$(this).children("span").animate({opacity: "hide"}, 1);
		  });
		  $("#iconbar li").hover(
		  function() {
			$(this).addClass("bj");
		  }, 
		  function() {
			$(this).removeClass("bj")
  });
  /*nav end*/	
  $(".video-thumbnails a").click(function(){
		if (trigger == 0) {
			$("#video-container, .video-thumbnails-wrap:visible .video-div").slideDown("slow");
			$("#video .content").animate({"top": "-=235px"}, "slow");
			$(".next, .prev").hide();
			$(".video-thumbnails a").css({"opacity": "0.2"}).click(function(){
				return false;
			});
			trigger = 1;
			url = $(this).attr("href");
			//getContent(url);
			getContent(url);
			$(this).blur();
			return false;
  	} else {
			$("#video-container, .video-thumbnails-wrap:visible .video-div").slideUp("slow");
			$("#video .content").animate({"top": "+=235px"}, "slow");
			$(".next, .prev").delay(600).fadeIn("slow");
			$(".video-thumbnails a").css({"opacity": "1"});
			trigger = 0;
			$("#video-content").text("tschüss");
			return false;
		}
	});
	$("a.video-slider-prev, a.video-slider-next").live("click", function() {
		url = $(this).attr("href");
		getContent(url);
		$(this).blur();
		return false;
	});
	
	$("#video-content").ajaxStart(function() {
		$(this).fadeOut();
		// $(this).fadeOut(function() {
		// 	(this)
		// 		.text("")
		// 		.addClass("loading")
		// 		.fadeIn();
		// });
	});

		$("#video-content").ajaxSuccess(function() {
			//$(".video-cycle").bxSlider({
//				auto: "true",
//				//autoDelay: 5000,
//				autoHover: "true",
//				pause: 4000,
//				pager: "true",
//				pagerType: "short",
//				speed: 1000
//			});
			
		  $(".video-slider-close").click(function(){
				$("#video-container, .video-thumbnails-wrap:visible .video-div").slideUp("slow");
				$("#video .content").animate({"top": "+=235px"}, "slow");
				$(".next, .prev").delay(600).fadeIn("slow");
				$(".video-thumbnails a").css({"opacity": "1"});
				trigger = 0;
				$("#video-content").text("tschüss");
				return false;
			});
			/*
			$(".manufactured li").hover(
				function(){
					if ($(this).attr("title")) {
						var tip = $(this).attr("title");
						$(this).attr("title","");
						$(this).append("<span id='tooltip'><span>"+tip+"</span></span>");
					}
				},
				function(){
					$(this).attr("title",$("#tooltip span").html());
					$(this).children("span#tooltip").remove();
				}
			);
			*/
		});
		/* 使用js分组，每6个li放到一个ul里面 */
//$("#multipleColumn .bd li").each(function(i){ jQuery("#multipleColumn .bd li").slice(i*6,i*6+6).wrapAll("<ul></ul>");});
 
/* 调用SuperSlide，每次滚动一个ul，相当于每次滚动6个li */
	

	//$("#imgbox").slide({titCell:".hd ul",mainCell:"div ul",autoPage:true,effect:"leftLoop",autoPlay:true});
});
/*
 *      Holt den Inhalt vom Server
 */
function getContent(url) {
	$.ajax({
		type: "GET",
		//url: "pro/ajax.html",
		url: url+"ajax.html",
		dataType: "html",
		success: function(html) {
		$("#video-content").html(html)
			.fadeIn();
		}
	});
}

function getImpressum(url) {
$.ajax({
	url: url+"ajax.html",
	dataType: "html",
	success: function(html) {
		//Inhalt reinschreiben und anzeigen
		$("#impressum_content").html(html);
		$("#impressum_wrap").fadeIn();
		// hide: video-container
		if (trigger == 1) {
			$("#video-container, .video-thumbnails-wrap:visible .video-div").slideUp("slow");
			$("#video .content").animate({"top": "+=235px"}, "slow");
			$(".next, .prev").delay(600).fadeIn("slow");
			$(".video-thumbnails a").css({"opacity": "1"});
			trigger = 0;
			$("#video-content").text("error");
		}
	}
	});
}
//这是弹出层，IE9以下无法圆角
;(function($){$.fn.SmohanPopLayer=function(options){var Config={Shade:true,Event:"click",Content:"Content",Title:"Smohan.net"};var options=$.extend(Config,options);var layer_width=$('#'+options.Content).outerWidth(true);var layer_height=$('#'+options.Content).outerHeight(true)
var layer_top=(layer_height+40)/2;var layer_left=(layer_width+40)/2;var load_left=(layer_width-36)/2;var load_top=(layer_height-100)/2;var layerhtml="";if(options.Shade==true){layerhtml+='<div class="Smohan_Layer_Shade" style="display:none;"></div>';}
layerhtml+='<div class="Smohan_Layer_box" style="width:'+layer_width+'px;height:'+layer_height+'px; margin-top:-'+layer_top+'px;margin-left:-'+layer_left+'px;display:none;" id="layer_'+options.Content+'">';layerhtml+='<h3><b class="text">'+options.Title+'</b><a href="javascript:void(0)" class="close"></a></h3>';layerhtml+='<div class="layer_content">';layerhtml+='<div class="loading" style="left:'+load_left+'px;top:'+load_top+'px;"></div>';layerhtml+='<div id="'+options.Content+'" style="display:block;">'+$("#"+options.Content).html()+'</div>';layerhtml+='</div>';layerhtml+='</div>';$('body').prepend(layerhtml);if(options.Event=="unload"){$('#layer_'+options.Content).animate({opacity:'show',marginTop:'-'+layer_top+'px'},"slow",function(){$('.Smohan_Layer_Shade').show();$('.Smohan_Layer_box .loading').hide();});}else{$(this).live(options.Event,function(e){$('#layer_'+options.Content).animate({opacity:'show',marginTop:'-'+layer_top+'px'},"slow",function(){$('.Smohan_Layer_Shade').show();$('.Smohan_Layer_box .loading').hide();});});}
$('.Smohan_Layer_box .close').click(function(e){$('.Smohan_Layer_box').animate({opacity:'hide',marginTop:'-300px'},"slow",function(){$('.Smohan_Layer_Shade').hide();$('.Smohan_Layer_box .loading').show();});});};})(jQuery);

	
$(document).ready(function(e) {
    $('.cd-popup-trigger').SmohanPopLayer({Shade : true,Event:'click',Content : 'popup', Title : '扫一扫微信二维码关注我们'});
});