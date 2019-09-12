$(function(){
    var nowtime;//歌曲定时器
    $(".content_list").mCustomScrollbar();//滚动条
    getMusic();//添加音乐至html
   //1.遍历加载音乐信息方法getMusic
   function getMusic(){
    $.ajax({url:"../source/musiclist.json",dataType:"json",success:function(data){
      $.each(data,function(index,value){
          var $song=createMusic(index,value);
          $song.appendTo(".content_list ul");
      })
   },error:function(e){
   (e);
   }});
   };
   //2读取一条歌曲信息并插入页面
   function createMusic(index,value){
    //获取音乐编号
    var num1=parseInt($(".title_number").text())+1;
    var num2=parseInt($(".list_number").last().text())+1;
    var num=num1<num2?num2:num1;
    //创建音乐节点
    var $song_list=$(
    "<li class=\"list\">"+
    "<div>"+
          "<div class=\"list_check\">"+
              "<i></i>"+
          "</div>"+
          "<div class=\"list_number\">"+num+"</div>"+
          "<div class=\"list_song\">"+value.name+
              "<div class=\"list_menu\">"+
                  "<a href=\"javascript:;\" title=\"播放\" class=\"play\"></a>"+
                  "<a href=\"javascript:;\" title=\"添加\"></a>"+
                  "<a href=\"javascript:;\" title=\"下载\"></a>"+
                  "<a href=\"javascript:;\" title=\"分享\"></a>"+
              "</div>"+
          "</div>"+ 
          "<div class=\"list_singer\">"+value.singer+"</div>"+
          "<div class=\"list_time\">"+"<span>"+value.time+"</span>"+
                "<a href=\"javascript:;\" title=\"删除\"></a>"+
          "</div>"+
    "</div>"+
    "</li>"
    ) 
    $song_list.get(0).number=num;
    $song_list.get(0).msg=value;
    $song_list.get(0).aplay=0;
     //返回一段带有歌曲信息的html文本
     return $song_list;
   }
   //3.鼠标事件
   mouseEvent();
   function mouseEvent(){
    //1.点击按钮之音乐标题复选款
    $(".content>.content_in>.content_left>.content_list ul>.list_title>div>.title_check>i").click(function(){
        $(this).toggleClass("checked");
        console.log($(this).attr("class").indexOf("checked"));
         if($(this).attr("class").indexOf("checked")==-1)
        $(this).css("opacity","0.5")
        else
        $(this).css("opacity","1");
   });
    //2.点击按钮之音乐纯净模式
   $(".footer_in>a:nth-of-type(8)").click(function(){
       $(this).toggleClass("only");
  });
    //4.音乐条目移出移入事件
    $("body").delegate(".list","mouseenter",function(){
        $(this).find(".list_time>span").stop().fadeOut(10);
        $(this).find(".list_menu").stop().fadeIn(200);
        $(this).find(".list_time>a").stop().fadeIn(200);
    });
    $("body").delegate(".list","mouseleave",function(){
       $(this).find(".list_menu").stop().fadeOut(10);
       $(this).find(".list_time>a").stop().fadeOut(10);
       $(this).find(".list_time>span").stop().fadeIn(200);
    });
      //5.点击按钮之音乐复选款
    $("body").delegate(".content>.content_in>.content_left>.content_list ul>.list>div>.list_check>i","click",function(){
        $(this).toggleClass("checked");
        if($(this).attr("class").indexOf("checked")==-1)
        $(this).css("opacity","0.5")
        else
        $(this).css("opacity","1");
    })
    //6.点击播放暂停按钮
    $("body").delegate(".content>.content_in>.content_left>.content_list ul>.list .list_song>div>a:nth-child(1)","click",function(){
        $list=$(this).parents(".list"); 
        $playSiblings=$list.siblings().find(".modBgMsg1");//寻找非本歌曲的播放暂停键为暂停键的   
        if($(this).attr("class").indexOf("modBgMsg1")!=-1)//点击的是暂停按钮
        {
        $(this).attr("title","开始");
        $(this).removeClass("modBgMsg1");//本首歌更改播放为暂停键
        $(".footer_in>a:nth-of-type(2)").removeClass("modBgMsg2");
        $list.css("color","rgba(255,255,255,0.5)");
        $list.find(".list_number").removeClass("list_number2");
        }
        else//点击的是开始按钮
        {    
            $(this).attr("title","暂停");
            $(this).addClass("modBgMsg1");//本首歌更改播放为暂停键
            $playSiblings.removeClass("modBgMsg1");
            $playSiblings.attr("title","开始");
            $(".footer_in>a:nth-of-type(2)").addClass("modBgMsg2");//更改尾部播放为暂停键
            $list.css("color","rgba(255,255,255,1)");
            $list.siblings().css("color","rgba(255,255,255,0.5)");
            $list.find(".list_number").addClass("list_number2");
            $playSiblings.parents(".list").find(".list_number").removeClass("list_number2");

        }
    })
   }    
});