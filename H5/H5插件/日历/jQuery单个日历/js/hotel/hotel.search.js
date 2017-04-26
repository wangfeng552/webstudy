(function($){
    hSearch = {
        disappear:$('#disHotel'),
        relevance:$('#hotel-search-div'),
        hotName:$('.sea-div input.hotel-name'),
        ihSearch:false,
        show:function(){
            hSearch.disappear.bind('keyup',hSearch.hSearchFun);

            hSearch.disappear.bind('blur',function(){
                hSearch.seaClilk();
                setTimeout(function(){
                    hSearch.relevance.css({display:'none'});
                },500);//延迟1秒发请求
            });

        },
        hSearchFun:function(){
            hSearch.ihSearch = true;
            hSearch.hotName.css({color:"#555555"});
            setTimeout(hSearch.hSearchVal,1000);//延迟1秒发请求
        },
        hSearchVal:function(){
            if(hSearch.ihSearch){
                if(hSearch.disappear.val() != ''){
                    //写----ajax----
                    hSearch.relevance.css({display:'block'});
                    //ajax
                }else{
                    hSearch.hotName.css({color:"#b8b8b8"});
                    hSearch.relevance.css({display:'none'});
                }
            }
            hSearch.ihSearch = false;
        },
        seaClilk:function(){
            $('#hotel-search-div li').click(function(){
                hSearch.disappear.val($(this).html());
            });
        }
    }
    hSearch.show();
})(jQuery);