define("loading",[],function() {
    function Loading(){ }
    Loading.prototype.init = function(){
        this.createLoading();
    }
    Loading.prototype.createLoading = function(){
        var $loading = $('<div>').addClass('loadingbox'),
            $circle = $('<div>').addClass('loadingcicle');

        $loading.append($circle);
        this.$loading = $loading;
        $('body').append($loading);
    }
    Loading.prototype.remove = function(){
        this.$loading.remove();
    }

    var loading = new Loading();
    return loading;
});