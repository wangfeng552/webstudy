define(function(){
    var warning="";
    var add=function(a,b){
        return a*b;
    }
    var checkUserName_phone=function(val){
        if($.trim(val)==""){
            return "手机号格式不为空";
        }else if(!(/^1\d{10}$/.test($.trim(val)))){
            return "手机号格式不正确";
        }
    };
    return {
        add:add,
        checkUserName_phone:checkUserName_phone
    }
})