---
title: 一条URL简单获取每日bing焦点图
image: 'http://ocxfindy0.bkt.clouddn.com/image/3/45/43fc06efcb2f5e7f3e8c3083fd1cf.jpg'
permalink: yi-tiao-dai-ma-jian-dan-huo-qu-mei-ri-bingjiao-dian-tu
id: 22
updated: '2016-09-14 14:47:18'
date: 2016-09-09 02:13:01
tags:
---

## 缘起
看着每天都是一样的顶部图片忽然觉得有点了无生趣，没有惊喜，生活不该这样。

而后又想到windows10登录界面时候的焦点图片可不可以用来做top图片，遂找了一下相关的资料，发现bing有一个接口返回的json里可以获取到焦点图片的url，操作了一下代码如下：

`json地址：http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1`

返回的数据如下：
<pre><code class="language-js">
{
    "images": [
        {
            "startdate": "20160907", 
            "fullstartdate": "201609071600", 
            "enddate": "20160908", 
            "url": "http://s.cn.bing.net/az/hprichbg/rb/Stadsbiblioteket_ZH-CN6055045711_1920x1080.jpg", 
            "urlbase": "/az/hprichbg/rb/Stadsbiblioteket_ZH-CN6055045711", 
            "copyright": "斯德哥尔摩公共图书馆，瑞典斯德哥尔摩 (© Gallery Stock)", 
            "copyrightlink": "http://www.bing.com/search?q=%E6%96%AF%E5%BE%B7%E5%93%A5%E5%B0%94%E6%91%A9%E5%85%AC%E5%85%B1%E5%9B%BE%E4%B9%A6%E9%A6%86&form=hpcapt&mkt=zh-cn", 
            "wp": true, 
            "hsh": "e4dac1ad80973e47b40683281c562497", 
            "drk": 1, 
            "top": 1, 
            "bot": 1, 
            "hs": [ ]
        }
    ], 
    "tooltips": {
        "loading": "正在加载...", 
        "previous": "上一个图像", 
        "next": "下一个图像", 
        "walle": "此图片不能下载用作壁纸。", 
        "walls": "下载今日美图。仅限用作桌面壁纸。"
    }
}
</code>
</pre>
可以发现，images对象下的url属性就是当日bing的图片，我们可以直接获取图片后用jquery改变背景，但是我被残酷百度残酷的告知不能跨域请求，必须要在自己的服务器端做好请求页面，然后js请求本地页面。。
<pre>
<code class="language-js">
$(document).ready(function(){

    $.ajax({
          type:"get",
          url:"http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
          dataType:"json",
          success: function(data){
            $("#header").css("background-image","url("+data['images']['url']+")");
          }
    });
</code>
</pre>
不过我也是百折不挠的人遂又找到了一个跨域请求的中间站[JSONProxy](https://jsonp.afeld.me/)，这个网站提供了跨域的请求函数，传过去一个跨域url，还你一个漂亮感觉的json...可惜事实总是残酷的，貌似对微软爸爸的链接并不起作用，但是还是mark过来一下，没准以后能用上。
<pre><code class="language-js">
$(document).ready(function(){
    $.getJSON('https://jsonp.afeld.me/?callback=?&url=http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', 
        function(data){
        alert('返回数据：' + data);
    });
});
</pre>
</code>

## 缘灭
最后！我发现通过这个地址可以直接获取当日的图片！！！
`http://www.dujin.org/sys/bing/1366.php`
![今日bing图片](http://www.dujin.org/sys/bing/1366.php)