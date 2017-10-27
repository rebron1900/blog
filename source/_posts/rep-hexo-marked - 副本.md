---
title: 主题ONE的移植
permalink: prot-one-4hexo
date: 2017-10-27 12:03:06
tags: 流水账
image: http://cdn.4zen.top/image/b/70/b696419d965267259b4974ce9c07f.jpg!800xa
---

### 又想喷hexo的文档了

归功于现在主题的高度模块化，模版引擎简单易用，所以移植的过程其实来说还是比较简单了。不过实在是还想再喷一下hexo的文档，写的是真的烂，不不，应该说那是一坨`shi`，整个文档写的不明不白。

比如说`site.posts`这个变量获取到的文章列表并不会按时间排序，恰好我有一个归档功能需要所有按时间从新到旧的文章列表，翻遍官方的手册没发现有相关排序函数的叙述，之后在github的issue上看到有网友提到想关的用发，最后以如下形式实现这个功能

```
<% var posts = site.posts.sort('-date');
posts.each(function(post){ %>
<li class="" itemscope="" itemtype="http://schema.org/Article">
  <a class="" href="<%- post.permalink %>" itemprop="url">
    <em year="<%- date(post.date, 'YYYY') %>">
      <%- date(post.date, 'MM-DD') %>
    </em>
    <span itemprop="name"><%- post.title %></span>
  </a>
</li>
<% }); %>
```

你在把官方的手册翻烂都找不出这个函数的用法。不过不排除这个函数其实是ejs里的，但是点开官方提供的ejs链接后去了官网也没看到有相关的使用文档。希望不是我的姿势不对所引起的

所以我基本上是属于大部分看其他作者主题的实现，小部分看官方文档解决的。（刚刚在看issue的时候发现`page.posts.data[0]`这样即可访问第一篇文章。写文档的你多写几个demo会死吗。。。）

### 移植时发现的一些要注意的地方

#### 配置文件

因为没有数据，所以一些博客的设置、主题的设置都需要放进`_config.yml`里面，在ghost上时我基本上都把配置文件写死在主题里。正好这次移植主题所以我增加了很多定制都写进了配置文件里，这里也首次接触了yaml语言。

```
# Menu
menu:
    index: /
    links: /links.html
    archive: /archive.html
    about: /about.html
    rss: /rss.xml

# SNS Menu
sns:
    email: trax.long@gmail.com

# site info
info:
    location: 自贡
    website: http://www.4zen.top
    description: 我叫1900，普通男青年，学过三年编程。湖南人，现在在四川工作。2015年花了26天骑过一次318。有点伪文艺，喜欢比较玄学的东西。性格多变，疑似有人格分裂。

# Images Settings
img:
    logo: "/img/logo.png"
    mini_logo: "/img/logo-mini.png"
    default_thum: "http://cdn.4zen.top/default.jpg"
    avatar: "/img/avatar.png"
    daily_pic: "/img/daily_pic.png"
    sidebar_header: "/img/sidebar_header.png"
    random_thumbnail: "/img/random/material-"
    footer_image: 
```

#### 多语言

在做菜单功能的时候发现写好的菜单配置项输出到页面上时是英文。才想起因为使用了yaml，所以我写配置文件的时候都是英文的字段名。后来查了下手册上的[国际化](https://hexo.io/zh-cn/docs/internationalization.html)这一项里有说到怎么操作。首先在主题目录下增加一个如下结构的目录

```yaml
/根目录
	/languages/
	/languages/zh-cn.yml
```

然后修改`zh-cn.yml`文件，里面增加你主题配置文件的对应字段的中文即可，如下：

```
categories: 分类
search: 搜索
tags: 标签
tagcloud: 标签云
tweets: 推文
prev: 上一页
next: 下一页
comment: 留言
archive_a: 归档
archive_b: 归档：%s
page: 第 %d 页
recent_posts: 最新文章
newer: Newer
older: Older
share: Share
powered_by: Powered by
rss_feed: RSS Feed
category: Category
tag: Tag

index: 首页
links: 左邻
books: 书单
archive: 归档
about: 关于
rss: 订阅
```

然后模版上使用`<%= __('index.index') %>`函数即可在用户设置系统语言为`zh-cn`的时候自动使用中文显示相关字段。

### 移植情况

1. ~~首页：基本已经完成，只差tag、评论数
2. 文章内页：基本已经完成，只差tag、评论数
3. tag页面
4. ~~page页面：基本已经完成~~
5. 分类页面
6. ~~顶部菜单：基本已经完成~~
7. ~~文章归档：基本已经完成~~
8. 订阅：基本已完成
9. ~~评论系统：还是使用fooleap的方案，前端由于是js的所以可以很方便的直接粘贴代码过来即可，但是目前因为域名还没更改所以使用www.1900.live访问本站时可能无法正常评论，请使用以前的老域名www.4zen.top访问本站即可正常评论。~~
10. 订阅：基本已完成