---
title: rep-hexo-marked
date: 2017-10-26 12:20:48
tags: 流水账
image: http://cdn.4zen.top/imgs/171026/ega7GBJLhl.jpg
---

### hexo的markdown有毒

今天在移植主题和以前的一些页面数据的时候发现hexo生成的页面文件会出现很多奇怪的`<br>`符号。搞的我之前在ghost上写的很多内嵌有html的代码都出现了这个问题

![排版混乱](http://cdn.4zen.top/imgs/171026/g8D46FFI1I.png?imageslim)

我自己估摸着是markdown的解析出了问题，之后在知呼的[markdown回车换行？](https://www.zhihu.com/question/22524345)中发现有网友解答过这个问题。

![mark](http://cdn.4zen.top/imgs/171026/FKC22eA8LG.png?imageslim)

hexo支持的md语法规格为Github Flavored Markdown的方案，好像不是标准的md解析方案，所以在其他编辑器上写的文章会出现奇怪的问题。
后来我尝试按照第二楼朋友的回答解决这个问题，发现我完全不知道代码该怎么放到hexo的markdown里，后来想到一个解决办法就是干掉hexo默认的md解析器，使用一个支持双空格换行的编辑器..

在github上找到了[**hexo-renderer-kramed**](https://github.com/sun11/hexo-renderer-kramed)这个解析器，先写在原来的解析器，再安装新的(如果命令行删不掉就直接去`node_modules`里删掉名称为`hexo-renderer-marked`的文件夹就可以了)

```
$ npm uninstall hexo-renderer-marked --save
$ npm install hexo-renderer-kramed --save
```

安装好后在hexo根目录下的`_config.yml`里增加如下配置段后即可解决这个问题。

```
kramed:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true
```

有一件挺崩溃的事情——在我做完这一切后hexo群里的一个朋友跟我原生的编辑器也可以解决这个换行问题，只需要在`_config.yml`里增加如下配置即可

```
marked: 
  breaks: false
```

![是真的难受呀....](http://cdn.4zen.top/imgs/171026/AKjE57hGf4.png?imageslim)