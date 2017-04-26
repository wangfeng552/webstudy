require.config({
    paths:{
        "jquery":"js/jquery-1.11.2",
        // "kl":"others/kl",
        "math":"others/math",
        "c":"others/c",
        "loading":"others/loading"
    }
})

require(["jquery",{"kl":"others/kl"},"math","loading"],function($,kl,math,loading){
    // kl.a2();
    // console.log(kl.a1())
    // console.log(loading)
    loading.createLoading()
    $("button").on("click",function () {
        loading.remove();
    })

    $(".js-tel").blur(function () {
        var jsTelVal=$(this).val();
        var mathJsTekVal=math.checkUserName_phone(jsTelVal)
        if(mathJsTekVal){
            console.log(mathJsTekVal)
        }else{
            alert(1)
        }
    })
})