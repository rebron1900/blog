---
title: 关于
permalink: 'about'
id: 4
updated: '2016-07-24 11:51:02'
date: 2016-07-24 11:51:02
layout: page
---


关于我：


七个年头了，第一次看见自己搭建的网站上线时的激动心情也不记得了。博客断断续续的辗转记得不多少地方，那些写过的文字也不知丢了多少，前几日尝试着访问过那些博客，另人欣喜的是还有两三个网站还能进的去...，看着以前那些文字却体会不了那种心情了，记忆始终还是记忆总带着些许模糊。

这个博客也许是折腾路上的最后一站了把？如果有缘分我们也许可以交个朋友，具体友链的交换可以去[友链页面](http://www.4zen.top/links)留言。

##信息
1. 采用[Ghost0.74](http://www.ghostchina.com/download/)国内优化版搭建
2. 目前运行在[百度BAE基础版](https://cloud.baidu.com/doc/BAE/ProductDescription.html#.E4.BA.A7.E5.93.81.E7.AE.80.E4.BB.8B)，简单方便，不过偶有502的错误，不知是何原因...
3. 文件存放于[七牛云](https://www.qiniu.com/)，CDN也是用的他们家的。
4. 主题是自己写的[ONE](http://www.4zen.top/one-theme)

##站点成长日记

### #2017年8月
* 2017年8月3日：博客一周年，更换了新主题，用默认主题做的一个MOD主题。
![](http://cdn.4zen.top/image/f/19/4629cbf70f5c9c91b59c5610c8753.png)

### #2017年4月
* 2017年4月9日：换掉网易云跟帖，使用[fooleap](http://blog.fooleap.org/)的[disqus api](https://github.com/fooleap/disqus-php-api)的方案，完美解决评论系统问题。

### #2017年3月
* 2017年3月21日：忽然接到通知说多说将在6月份停止服务[[再见]](http://www.4zen.top/duoshuo-bye/)，无奈下更换了网易云跟贴，并做了主题适配[[网易云跟帖适配ajax主题，动态加载评论框]](http://www.4zen.top/yun-gentie/)。但是网易云跟帖不能匿名登录，目前还是在寻找更好的评论组件。

##现在开始博客新的成长日记写在前面

###2016年9月

* 2016年9月8日：从折腾了六七年的各种博客系统：wpoak，blogbus，板瓦工等等折腾wordpress转入到折腾Ghost。折腾了许久后终于在百度BAE上搭建了本站点，因为bae的无法保存程序上传文件的特殊性引入了七牛的cdn。网站打开速度是玩这么久博客以来最快的一次。
* 2016年9月18日：参考[xknow](http://xknow.net/)的博客主题[Next](https://github.com/microud/ghost-theme-next)增加了[文章归档功能](http://www.4zen.top/archive-post/)

###2016年11月

* 2016年11月17日：陆陆续续更换了几个主题，比较满意的是[bleak](https://github.com/zutrinken/bleak)，后来在[匿名者](http://www.timem.cn/)的网站发现了wordpress主题[Diaspora](https://github.com/LoeiFy/Diaspora)，并且发现有[ghost的版本](https://github.com/PeterCxy/ghost-diaspora)并开始使用这款主题，并在原有主题上做了一些更改，移植了文章内页背景音乐、内页头部大图
* 2016年11月17日：参考b站的[我是设计师系列教程](http://www.bilibili.com/video/av3151708/)设了新的站点毛笔字logo
![](http://cdn.4zen.top/image/c/3f/70b45d0f1638b273f88ccdcaca1c5.png)

###2016年12月
* 2016年12月05日：增加了全站的多说评论数加载，并适配了主题的ajax无刷新更新：[ajax加载后多说评论数的加载](http://www.4zen.top/ajaxed-load-duoshuo-count/)
* 2016年12月05日：增加了文内链接自动添加目标站icon功能，也适配了ajax无刷新更新：[文章内链接自动增加网站icon](http://www.4zen.top/auto-add-link-icon/)
* 2016年12月13日：参考了akina的博客中的相册插件增加了主题内页文章主体中的图片的幻灯片、相册浏览：[之前相册页面的后序](http://www.4zen.top/zeng-jia-liao-xiang-ce-cha-jian/)
* 2016年12月16日：修复了[杨三味](http://www.iqong.com/)反应的评论组件加载后点击div后会重新加载的bug。
* 2016年12月18日：增加了悬浮菜单用于到达评论区、返回顶部、打开菜单等功能
* 2016年12月18日：优化了文章归档页的实现，之前xknow写的js感觉略微繁琐，这次改用之前发现的jquery选择器，用[year="2015"]这种选择器语法直接获得当前年份的所有文章数，7行代码就搞定了，之后完善下细节，增加年份月份折叠等功能把。
```
    var currentYear = "";
    $("#hidden-temp-container ul li").each(function(i){
        var year = $(this).find("em").attr("year");
        if(year < currentYear || currentYear == ""){
            currentYear = year;
            $(this).before("<h3 class='"+currentYear+"'>"+currentYear+"</h3><em>(" + $("[year='"+ currentYear +"']").length +"篇文章)</em>");
        }

    });
```

