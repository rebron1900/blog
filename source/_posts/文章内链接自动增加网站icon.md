---
title: 文章内链接自动增加网站icon
tags: ' - 设计'
image: 'http://cdn.4zen.top/image/1/a9/4b602043de513241ab9722a614d5d.jpg'
permalink: auto-add-link-icon
id: 72
updated: '2017-04-05 20:04:53'
date: 2016-12-05 18:29:06
---

### 为什么做这个
之前使用[罗磊](https://luolei.org)的一款名为[【Yasuko】](https://luolei.org/a-ghost-theme-yasuko-with-story/)的主题时发现了一个很有意思的功能：文章内的链接能自动增加来源站的icon。效果大概是下面这样，如果你现在来看这篇文章应该已经实现好这个功能了。我感觉这个功能能给单调的文章增添一些活力，也能给那些来源站做做宣传=w=，所以便想着在现在的这个主题上增加这个功能。
![](http://cdn.4zen.top/image/c/ef/c0b1b43e675ba9f4c37486223284e.png)

### 实现过程

我查看了一下罗磊写的相关代码，发现他是单独做了一些判断，并且使用的是预设好的webfont字体做的图标，这样更为稳定，也更快速，但是缺陷就是大部分不在清单内的网站并不会显示网站图标。凑巧我知道一个黑科技，以前在使用wordpress的时候用过[小影](http://c7sky.com/)的[C7V5](http://c7sky.com/wordpress-theme-c7v5.html)的时候发现他做的[友链页面](http://c7sky.com/links)便可以自动获取网站的icon用作展示，发现只是一个第三方的获取网站icon的工具：//api.byi.pw/favicon?url=。你只需要把你想要获取icon的网站的地址放在url后输入浏览器便能轻松获取网站图标了。

有了这个黑科技实现这个功能就更加简单了，用jquery获取文章内容主体内的所有a链接，并用echo函数遍历每一个链接对象后再单独设置每个链接的css即可。

```
$(".content a").each(function(){
        $(this).css({"padding-left":"20px","margin":"0px 5px","background":"url(//api.byi.pw/favicon?url="+this.hostname+")  no-repeat"});
    })
```

敲完代码，打开页面刷新后再看看。是不是既简单、效果又酷炫？哈哈，希望能帮到你。