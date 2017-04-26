require.config({
    shim:{
        "scrollfix":["jquery"]
    },
    paths:{
        "jquery":"js/jquery-1.11.2",
        "scrollfix":"js/scrollfix"
    }

})
require(["jquery","scrollfix"],function($){
    $(".lk").scrollFix("top","top").show();
})