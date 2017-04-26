// JavaScript Document
$(document).ready(function(){
	//控制每个li的位置
	$('.menu').each(function(i){
		$(this).children('ul').children('li').each(function(j){

			if(j==0){
				$(this).css({'top':'35px','left':'-22px'});
			}else{
				$(this).css({'top':35+27*j+'px','left':'-'+(22+22*j)+'px'});
			}
			
		});
	})
	//触发事件
	$('.menu').hover(function(){
		$(this).addClass('m_hover');
		$(this).children('ul').show();
	},function(){
		$(this).removeClass('m_hover');
		$(this).children('ul').hide();
	})
	//更改hover状态样式
	$('.menu ul li').hover(function(){
		$(this).addClass('li_hover');
	},function(){
		$(this).removeClass('li_hover');	
	})
	
})