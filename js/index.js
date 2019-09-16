$(function(){
    $.ajax({
        url:"js/data.json",
        dataType:"json",
        success:function(data){
            console.log(data);
        }
    })

    
});