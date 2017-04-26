$.fn.extend({
    paging: function(option) {
        var obj = $(this);
        var defaults = {
            pageSize: 10, //可视页码数量
            totalPage:10, //数据总页码
        };
        var settings = $.extend(defaults, option || {});  //初始化
        var totalPage = settings.totalPage;
        var pageSize = settings.pageSize;
        init();
        function light(obj) {    //点击页码高亮样式，当前页码
            obj.addClass("current").siblings().removeClass("current");
        }
        function getCurrentIndex(){
            return obj.find(".current").index();
        }
        function getCurrentPage(){
            return parseInt(obj.find("span").eq(getCurrentIndex()).text());
        }
        function resetPage(start){
            var objPage = obj.find("span");
            for(var i = 2; i < pageSize + 2; i++ ) {
                $(objPage[i]).text(start++);
            }
        }
        function showHome(ishome){
            var homeObj = obj.find(".home");
            if(ishome){
                homeObj.show();
            } else{
                homeObj.hide();
            }

        }
        function showEnd(isend){
            var endObj = obj.find(".end");
            if(isend){
                endObj.show();
            } else{
                endObj.hide();
            }

        }
        function makePage(start,isHome,isEnd) {  //生成页码
            var index = 0;
            var html = '';
            var endPage = start + pageSize-1;
            if(totalPage <= pageSize) {
               endPage = totalPage;
            } 
            html = '<span class="home" id="home">首页</span><span id="pre" class="home"><</span>';
            for (var i = start; i <= endPage; i++) {
                html += '<span class="page" id="uipage-nav'+ i +'">' + i + "</span>";
            }
            html += '<span id="next" class="end">></span><span  class="end" id="end">末页</span>';
            obj.html(html);
            if(!isHome || start == 1){
                showHome(false);
            }
            if(!isEnd){
                showEnd(false);
            }
        }
        function refreshPage(start,nextPage){   //刷新页码
            var end = start + pageSize - 1;
            if(start <= 1) {
                start = 1;
                resetPage(start);
                showHome(false);
                showEnd(true);
                light($("#uipage-nav"+nextPage));
            }else if(start>1 && start+pageSize < totalPage){
                resetPage(start);
                showHome(true);
                showEnd(true);
                light($("#uipage-nav"+pageSize));
            }else if(end > totalPage) {
                start = totalPage - pageSize + 1;
                showEnd(false);
                showHome(true);
                resetPage(start);
                var endPage = parseInt($("#uipage-nav"+pageSize).text()); //末页页数
                var showPageIndex = pageSize - (endPage - nextPage);
                 light($('#uipage-nav'+showPageIndex));
            } else if(end == totalPage){
                resetPage(start);
                showEnd(false);
                showHome(true);
                light($('#uipage-nav1'));
            } else {
                resetPage(start);
                showEnd(true);
                showHome(true);
                light($('#uipage-nav1'));
            }

        }
        function init(){   //初始化页码
           if(totalPage <= 1) { 
                return false
            } else if(totalPage <= pageSize){
                makePage(1,false,false)
            } else {
                makePage(1,false,true);  
            }
            light(obj.find("span").eq(2));
        }
        obj.find(".page").click(function(){
            var _this = $(this);
            var showPage = _this.text();
            light(_this);
            sendAjax(showPage,20);
        });
        obj.find("#next").click(function(){
            var currentIndex = getCurrentIndex();
            var currentPage = getCurrentPage();
            var showPageIndex = currentIndex + 1;
            var nextPage = currentPage + 1;
            if(currentIndex == pageSize + 1) {
                refreshPage(currentPage + 1,nextPage);
            } else {
                light(obj.find("span").eq(showPageIndex));
            }
            sendAjax(nextPage,20);
        });
        obj.find("#pre").click(function(){
            var currentIndex = getCurrentIndex();
            var currentPage = getCurrentPage();
            var showPageIndex = currentIndex - 1;
            var nextPage = currentPage - 1;
            if(currentIndex == 2) {
                refreshPage(currentPage - pageSize,nextPage);
            } else {
                light(obj.find("span").eq(showPageIndex));
            }
            sendAjax(nextPage,20);
        });
        obj.find("#home").click(function(){
            refreshPage(1);
            showEnd(true);
            showHome(false);
            light(obj.find("span").eq(2));
            sendAjax(1,20);
        });
        obj.find("#end").click(function(){
            refreshPage(totalPage-pageSize+1);
            showEnd(false);
            showHome(true);
            light(obj.find("span").eq(pageSize+1));
            sendAjax(totalPage,20);
        });
    }
});