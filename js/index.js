$(function(){
    
banner();
initMobile();
$('[data-toggle="tooltip"]').tooltip();

});

var banner=function(){

    var getData=function(callback){

        if(window.data){
            callback&&callback(window.data);
        }else{
        $.ajax({
            url:"js/data.json",
            dataType:"json",
            data:'',
            success:function(data){
                window.data=data;
                callback&&callback(window.data);
            }
        })
    }
    };

    var render=function(){
        getData(function(data){
            var isMobile=$(window).width()>768?true:false;
            //console.log(isMobile);
            var pointHtml=template("pointtp2",{list:data});
            var imageHtml=template("imagetp1",{list:data,isMobile:isMobile})
            //console.log({list:data,isMobile:isMobile});
            //console.log(pointHtml);
            //console.log(imageHtml);
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imageHtml);
        });
    }

    $(window).on("resize",function(){
        render();
    }).trigger("resize");
    
    var isMove=false;
    var distanceX=0;
    var startX=0;
    $(".banner").on("touchstart",function(e){
        
        startX=e.originalEvent.touches[0].clientX;
        //console.log(startX);
    }).on("touchmove",function(e){
        //console.log(e);
        var moveX=e.originalEvent.touches[0].clientX;
        //console.log(moveX);
        distanceX=moveX-startX;
        
        isMove=true;

    }).on("touchend",function(e){
        //console.log(distanceX);
        if(isMove&&Math.abs(distanceX)>50){
            
            if(distanceX<0){
                $(".carousel").carousel("next");

            }else{
                $(".carousel").carousel("prev");

            }
        }
        isMove=false;
        distanceX=0;
        startX=0;


    });
}

var initMobile=function(){
    var $navTabs=$(".wjs_product .nav-tabs");
    var $width=0;
    $navTabs.find("li").each(function(i,item){
        var $currLi=$(this);
        var LiWidth=$currLi.outerWidth(true);
        $width+=LiWidth;


    });

    $navTabs.width($width);
}

new IScroll($(".nav-tabs-parent")[0],{
    scrollX:true,
    scrollY:false,
    click:true

});