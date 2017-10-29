/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
var repURL = '4zen.top';

(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down,.s-top,.page-title,.home-header").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });
        /*
        if($(".picbox img").length !== 0){
            $(".post-bg").css("background-image","url("+ $(".picbox img")[0].currentSrc +")");
        }
        if($("body").hasClass("page")){
            $(".post-bg").css("background-image", $(".post-head").css("background-image"));
        }
        */
        var itemico = ["home","users","archive","ellipsis-h","book","feed"]
        $(".nav .b_class  ul  li a").each(function(index2){
            $(this).html(function(index,oldcontent){
                return "<i class='fa fa-"+ itemico[index2] +"' aria-hidden='true'></i>" + oldcontent;
            })
        });

        /*
        var disq = new iDisqus('comment', {
            forum: '4zen',
            api: 'http://api.fooleap.org/4zen',
            site: 'http://www.4zen.top',
            mode: 1,
            timeout: 3000,
            init: true
        }); 
        */
		new Valine({
		    el: '#comment' ,
		    notify:false, 
		    verify:false, 
		    app_id: 'PSS2Lh3g7hfReiHb1qsM5Mff-gzGzoHsz',
		    app_key: 'MJlOl9g8qg3MbSo9kQTVsStg',
		    placeholder: '来来来，让我知道你的看法。',
		    path:window.location.pathname, 
		    avatar:'mm' 
		});
        //初始化代码高亮
        hljs.initHighlightingOnLoad();
        //初始化相册插件


        //页面函数调用过滤
        var body = $(".site-wrapper").attr("page-type");
        repImg(".post-toppic img","conetnt");
        repImg(".post-bg","bg");
        repImg(".read-next-story","read-next");
        switch(body){
            case "c-post":
                addPBOX();
                linkEV('.post-content blockquote[id^="fn"]  a[href^="#"]',-55);
                linkEV('.post-content sup a[href^="#"]',-55);
                break;
            case "c-page":
                addPBOX();
                break;
            case "c-page-archive":
                addArchive();

            case "c-index":
                disq.count();

        }
        //回到顶部按钮自动隐藏
        $(window).scroll(function() {
            if ($(this).scrollTop() > $(".home-header").height()*0.8) {
                $(".sidebar").fadeIn(100);
            } else {
                $(".sidebar").fadeOut(100);
            }
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(﻿$(this).attr("to")).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(﻿$(this).attr("to")).offset().top) }, allOptions.speed);
            }
        });

    };


})(jQuery);


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone","iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function addArchive(){
    var currentYear = "";
    var Newy = "";
    $("#hidden-temp-container ul li").each(function (i){
        var year = $(this).find("em").attr("year");
        if (year < currentYear || currentYear == "")
        {
            currentYear = year;
            if (Newy == "")
            {
                Newy = year
            }
            $(this).before("<h3 class='" + currentYear + "'>" + currentYear + "<em>(" + $("[year='" + currentYear + "']").length + "篇)</em></h3>");
        }
        $(this).attr("year", currentYear);
    }
    );

    $("#hidden-temp-container h3").each(function (){
        $("#hidden-temp-container ul li[year='" + $(this).attr("class") + "'").wrapAll("<div year='" + $(this).attr("class") + "'></div>");
        $("h3." + $(this).attr("class")).click(function (){
            $(this).toggleClass("title-bg").next().slideToggle(500);
        });
    });
    $("#hidden-temp-container ul div[year!='" + Newy + "']").hide();
    $("h3."+Newy).addClass("title-bg");

}

function addPBOX(){
    $(".post-content img").each(function (){
        var url = this.src;
        if (this.nodeName == "IMG"){
            var ptype = IsPC() == true ? "!800xa":"!400xa";
            $(this).attr("src",url)
        }
        $(this).wrap("<a href=" + url + " title=" + this.alt + "></a>")
    });

    $(".post-content").addClass("gallery");
    baguetteBox.run('.gallery',{
        animation : 'fadeIn',
        preload : 2,
        captions : true
    });
}

function repImg(selector,type){
    var imgStyle = IsPC() == true ? "!800xa":"!400xa";
    switch(type){
        case "conetnt":
            $(selector).each(function(){
                if(isRpurl(this.src)){
                    $(this).attr("src",this.src + imgStyle)
                }
            });
            break;
        case "read-next":
            $(selector).each(function(){
                if(isRpurl(this.src)){
                    $(this).css("background-image","url("+$(this).css("background-image").split("\"")[1]+imgStyle+")");
                }
            });
            break;
        case "bg":
            if(isRpurl($(selector).css("background-image").split("\"")[1])){
                $(selector).css("background-image","url("+$(selector).css("background-image").split("\"")[1]+imgStyle+")");
            }
            break;
    }
    
    
}

function isRpurl(imgurl){
    return (imgurl+"").indexOf(repURL) == -1 ? false:true;
}

function changeBg(){
    var bgs = $(".post-toppic img");
    if( bgs.length != 0 ){
        $(".post-bg").css("background-image","url("+ bgs[0].src +")");
    }else{
        $(".post-bg").css("background-image","url(/img/default.jpg)");
    }
}

function linkEV(selector,fixSet = 0){
	$(selector).click(function(e){
                    e.preventDefault();
                    $('html, body').animate({scrollTop: $(this.hash).offset().top+fixSet}, 400);
                });
}