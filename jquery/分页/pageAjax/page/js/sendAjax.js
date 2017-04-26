  /* 动态写入数据 */
 function view(data){
    var html = [];
    for(var i = 0; i < data.length;i++) {
        html += '<div class="list">';
        html += '<div class="title">'+ data[i].title +'</div>';
        html += '<div class="content">'+ data[i].content +'</div>';
        html += '</div>';
    }
    $('#list-wrap').html(html);
 }
  /* ajax 请求更新数据 */
 function sendAjax(page,size){
    var url = '';
    view(data.data[page-1].con);
    /*$.ajax({  
        url:'data/'+ page +'.txt',  
        type:'GET',  
        cache:false,   
        dataType: 'json',
        success: function(data) {
            if(data){
                view(data.data.list)
            }
        }
    });*/
 }