/*
 cutSlider
 Compressed by uglify 
 Author:Zuo Shilong 
 Date: 2013-09-12
 Verson: 0.2.2
 */
!function(a){var b=function(b,c,d){this.opts=a.extend({speed:800,autoplay:!1,autoplaySpeed:5e3},c),this.$obj=a(b),this.$item=this.$obj.find(".cs-list").find("li"),this.itemLength=this.$item.length,this.timer=null,this.count=1,this.callback=d||function(){},this.init()};b.prototype={init:function(){this.$item.eq(0).addClass("curr").css("display","block"),this.$item.eq(0).find(".fore1").css({left:"100px"}),this.$item.eq(0).find(".fore2").css({top:"40px"}),this.setWindowResizeListener(),this.sliceItem(),this.setSliderWidth(),this.setControlListener(),this.opts.autoplay&&this.setAutoPlay()},setControlListener:function(){var b=this;this.$obj.find(".cs-control").find("a").bind("click",function(){var c=a(this).parent().find("a").index(this);b.setCurrent(c),this.count=c})},setAutoPlay:function(){function a(){b.timer=setInterval(function(){b.setCurrent(b.count),b.count+=1,b.count===b.itemLength&&(b.count=0)},b.opts.autoplaySpeed)}var b=this;a(),this.$obj.bind("mouseenter",function(){clearInterval(b.timer)}),this.$obj.bind("mouseleave",function(){clearInterval(b.timer),a()})},setCurrent:function(a){var b=this;if(!this.$obj.hasClass("animating")){var c=this.$obj.find(".curr"),d=this.$item.index(c),e=this.$item.eq(a);d!==a&&(b.$obj.find(".cs-control").find("a").eq(a).addClass("curr-dot").siblings().removeClass("curr-dot"),b.$obj.addClass("animating"),a>d?(this.initSliceAnimate(d,a,!1),c.css({"z-index":"5",display:"block"}),e.css({"z-index":"1",display:"block"}),setTimeout(function(){b.nextSliceAnimate(d,a)},20),setTimeout(function(){b.restoreItem(d)},this.opts.speed+20)):(this.initSliceAnimate(a,d,!0),c.css({"z-index":"1",display:"block"}),e.css({"z-index":"5",display:"block"}),setTimeout(function(){b.prevSliceAnimate(a,d)},20),setTimeout(function(){b.restoreItem(a)},this.opts.speed+20)),setTimeout(function(){c.removeClass("curr").css({"z-index":"0",display:"none"}),e.addClass("curr"),b.$obj.removeClass("animating")},this.opts.speed+20))}},nextSliceAnimate:function(a,b){var c=this.$item.eq(a),d=this.$item.eq(b);this.isLowBrowser()?(c.find(".left").animate({left:"-120%"},this.opts.speed),c.find(".right").animate({right:"-120%"},this.opts.speed),d.find(".fore1").animate({left:"100px"},this.opts.speed),d.find(".fore2").animate({top:"40px"},this.opts.speed)):(c.find(".left").css({"-webkit-transform":"rotate(10deg) scale(1.2) translateX(-180%)","-moz-transform":"rotate(10deg) scale(1.2) translateX(-180%)","-ms-transform":"rotate(10deg) scale(1.2) translateX(-180%)","-o-transform":"rotate(10deg) scale(1.2) translateX(-180%)",transform:"rotate(10deg) scale(1.2) translateX(-180%)"}),c.find(".right").css({"-webkit-transform":"rotate(-10deg) scale(1.2) translateX(180%)","-moz-transform":"rotate(-10deg) scale(1.2) translateX(180%)","-ms-transform":"rotate(-10deg) scale(1.2) translateX(180%)","-o-transform":"rotate(-10deg) scale(1.2) translateX(180%)",transform:"rotate(-10deg) scale(1.2) translateX(180%)"}),d.find(".fore1").css({left:"100px"}),d.find(".fore2").css({top:"40px"}))},prevSliceAnimate:function(a){var b=this.$item.eq(a);this.isLowBrowser()?(b.find(".left").animate({left:"0"},this.opts.speed),b.find(".right").animate({right:"0"},this.opts.speed)):(b.find(".left").css({"-webkit-transform":"rotate(0deg) scale(1) translateX(0)","-moz-transform":"rotate(0deg) scale(1) translateX(0)","-ms-transform":"rotate(0deg) scale(1) translateX(0)","-o-transform":"rotate(0deg) scale(1) translateX(0)",transform:"rotate(0deg) scale(1) translateX(0)"}),b.find(".right").css({"-webkit-transform":"rotate(0deg) scale(1) translateX(0)","-moz-transform":"rotate(0deg) scale(1) translateX(0)","-ms-transform":"rotate(0deg) scale(1) translateX(0)","-o-transform":"rotate(0deg) scale(1) translateX(0)",transform:"rotate(0deg) scale(1) translateX(0)"}))},initSliceAnimate:function(a,b,c){var d=this.$item.eq(a),e=this.$item.eq(b),f=d.find(".cs-con:first"),g=d.find(".left"),h=d.find(".right");f.css("display","none"),g.css("display","block"),h.css("display","block"),c?this.isLowBrowser()?(g.css({left:"-2000px"}),h.css({right:"-2000px"})):(g.css({"-webkit-transform":"rotate(10deg) scale(1.2) translateX(-180%)","-moz-transform":"rotate(10deg) scale(1.2) translateX(-180%)","-ms-transform":"rotate(10deg) scale(1.2) translateX(-180%)","-o-transform":"rotate(10deg) scale(1.2) translateX(-180%)",transform:"rotate(10deg) scale(1.2) translateX(-180%)"}),h.css({"-webkit-transform":"rotate(-10deg) scale(1.2) translateX(180%)","-moz-transform":"rotate(-10deg) scale(1.2) translateX(180%)","-ms-transform":"rotate(-10deg) scale(1.2) translateX(180%)","-o-transform":"rotate(-10deg) scale(1.2) translateX(180%)",transform:"rotate(-10deg) scale(1.2) translateX(180%)"})):(this.isLowBrowser()?(g.css({left:"0"}),h.css({right:"0"})):(g.css({"-webkit-transform":"rotate(0deg) scale(1) translateX(0)","-moz-transform":"rotate(0deg) scale(1) translateX(0)","-ms-transform":"rotate(0deg) scale(1) translateX(0)","-o-transform":"rotate(0deg) scale(1) translateX(0)",transform:"rotate(0deg) scale(1) translateX(0)"}),h.css({"-webkit-transform":"rotate(0deg) scale(1) translateX(0)","-moz-transform":"rotate(0deg) scale(1) translateX(0)","-ms-transform":"rotate(0deg) scale(1) translateX(0)","-o-transform":"rotate(0deg) scale(1) translateX(0)",transform:"rotate(0deg) scale(1) translateX(0)"})),e.find(".fore1").css({left:"0px"}),e.find(".fore2").css({top:"90px"}))},sliceItem:function(){var b=this;this.$item.each(function(c){if(c!==b.itemLength-1){var d=a(this).find(".cs-con"),e=a('<div class="cs-slice left" style="display:none"></div>'),f=a('<div class="cs-slice right" style="display:none"></div>');e.append(d.clone()),f.append(d.clone()),a(this).append(e),a(this).append(f)}})},restoreItem:function(a){var b=this.$item.eq(a),c=b.find(".cs-con:first"),d=b.find(".cs-slice");c.css("display","block"),d.css("display","none")},setWindowResizeListener:function(){var b=this;a(window).resize(function(){b.setSliderWidth(b.getWindowWidth())})},setSliderWidth:function(){var b=this,c=b.$obj.find(".cs-con");this.$obj.width(b.getWindowWidth()),c.each(function(){a(this).width(b.getWindowWidth()),a(this).parent().hasClass("right")&&a(this).css("margin-left","-"+b.getWindowWidth()/2+"px")})},getWindowWidth:function(){return a(window).width()},isLowBrowser:function(){var b=a.browser.msie&&parseInt(a.browser.version,10)<=9;return void 0==b?b=!1:b,b}},a.fn.cutSlider=function(c,d){return this.each(function(){var e=new b(this,c,d);a(this).data("cutSlider",e)})}}(jQuery);