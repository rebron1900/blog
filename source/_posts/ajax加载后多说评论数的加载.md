---
title: ajax加载后多说评论数的加载
tags: ' - 设计'
image: 'http://cdn.4zen.top/image/b/3e/aed1edab0e38c3ae2a00a76ef3a0c.jpg'
permalink: ajaxed-load-duoshuo-count
id: 70
updated: '2017-04-05 20:05:06'
date: 2016-12-05 11:30:18
---

![](http://cdn.4zen.top/image/e/3e/feb12900610f9c2a057e3cb31eaa0.png)

###前言

ghost的系统并没有自带评论系统，所以基本大家使用的都是第三方的评论组件。目前提供这种服务的有：

1. [Disqus](http://www.disqus.com)：目前在墙外，基本上不会科学上网的话是加载不出来的。
2. [多说](http://www.duoshuo.com)：就我感觉应该是国内目前最好用的了把？没有过多的硬性要求，还过的去的api系统，也是我目前在使用的服务。
3. [畅言](http://changyan.kuaizhan.com)：我使用过一段时间，感觉功能花哨，而且不能游客评论，不是很喜欢。
4. [友言](http://uyan.cc)：我感觉是最差的一个评论组件了，可自定义程度低，基本没有api文档，想自定义实现的功能我基本上不知道该怎么下手...

目前来说就是上面这几个，除了disqus我都有用过，目前来说多说更复合我的需求，不过多说的服务器之前有些小抽风，时常加在不出评论框，希望官方能做下一改进。


###问题

多说支持动态加载评论框，也有单独的评论数展示。但是有一个问题，单独的评论数展示在ajax页面加载之后并不会加载出来。这个数据应该是多说的js只在页面onload的时候才会加载，由于ajax加载出来的数据并不会去执行里面的js函数，所以我们需要再单独调用多说的相关加载函数。

###解决

我翻看了多说的官方api文档，只发现了动态加载评论框的相关介绍，并没有提到关于评论数的加载。无果，我只得看了下多说的js文件，发现页面加载的时候会执行一系列的初始化函数，其中就有评论数的相关初始化。

经过一些测试，我发现DUOSHUO.initView()函数似乎就是初始化页面的主函数，这个函数中创建了一个json数组，是页面当中的各种元素的选择器，其中就有评论数的页面元素的class。
```
        O = S.selectors = {
            ".ds-thread": {
                type: "EmbedThread"
            },
            ".ds-recent-comments": {
                type: "RecentComments"
            },
            ".ds-recent-visitors": {
                type: "RecentVisitors"
            },
            ".ds-top-users": {
                type: "TopUsers"
            },
            ".ds-top-threads": {
                type: "TopThreads"
            },
            ".ds-login": {
                type: "LoginWidget"
            },
            ".ds-thread-count": {
                type: "ThreadCount"
            },
            ".ds-share": {
                type: "ShareWidget"
            }
        },
```
之后我尝试在页面加载后的处理函数中手动调用该函数后发现评论数可以正常加载了。不知道可不可以获取喜欢该文章的统计？下次再做个尝试。

希望能帮到需要实现此功能的朋友。

###多说炸了
多说这小霸王服务器真心无语，今天打开博客发现这个方法似乎已经失效了，已经去官网反应了这个问题，不过凭之前的经验，得到答复或者解决方案应该是遥遥无期了。

###2016年12月9日
得到反馈说是服务器的问题，方法并没有什么问题。

###2016年12月9日
该方法已经恢复正常，可以正常加载评论数据。多说这个服务真的需要加强了，很担心到时候直接停止服务或者丢失数据。。。

另外无意间在[吉思达](http://www.jisida1994.com)的博客中看到另外一篇文章：[如何动态获取多说插件的评论数](http://www.jisida1994.com/Pages/Index/Index.php#index%3D3%23articlePageIndex%3D1%23selectType%3DselectAll%23articleID%3D67)，也能实现该功能。


上面清单中的排除，国内还有其他能用的第三方评论服务吗？