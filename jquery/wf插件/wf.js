(function(window,jQuery){
    var $=jQuery;
    return (function(){
        var People=function(){};
        People.all={
            pname:function(a){
                var a=$("<div>",{
                    class:"nj1",
                    text:"你们好",
                    click:function(){$(this).hide()}
                });
                $("body").append(a);
                a.show();
            },
            page:function(a){alert(a)}
        }
        window.PeopleAll=People.all;
    }())
})(window,jQuery);

var nk=function(){alert(123)};