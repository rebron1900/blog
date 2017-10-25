---
title: js字体子集服务：Fontmin
image: 'http://cdn.4zen.top/wp-content/uploads/2016/08/sp160803_182808.png'
permalink: js-font-subset-service-fontmin
id: 12
updated: '2016-08-04 11:12:06'
date: 2016-08-04 10:38:02
tags:
---


Fontmin是百度EFE推出的一个前端项目，是使用js动态生成精简化的字体子集提高载入速度，让既漂亮又臃肿的中文字库也可以拿到web网页上来使用。

目前准备拿到自己的网站上来试试，看能不能把文章主题标题使用上这个功能。

这是一个简单的DEMO。

See the Pen [Fontmin Example](http://codepen.io/firede/pen/raEXBX/) by Firede ([@firede](http://codepen.io/firede)) on [CodePen](http://codepen.io).

<script async="" src="//assets.codepen.io/assets/embed/ei.js"></script>

如何使用  
 var srcPath = ‘src/font/*.ttf’; // 字体源文件  
 var destPath = ‘asset/font’; // 输出路径  
 var text = ‘我说你是人间的四月天；笑响点亮了四面风；轻灵在春的光艳中交舞着变。’;

// 初始化  
 var fontmin = new Fontmin()  
 .src(srcPath) // 输入配置  
 .use(Fontmin.glyph({ // 字型提取插件  
 text: text // 所需文字  
 }))  
 .use(Fontmin.ttf2eot()) // eot 转换插件  
 .use(Fontmin.ttf2woff()) // woff 转换插件  
 .use(Fontmin.ttf2svg()) // svg 转换插件  
 .use(Fontmin.css()) // css 生成插件  
 .dest(destPath); // 输出配置

// 执行  
 fontmin.run(function (err, files, stream) {

if (err) { // 异常捕捉  
 console.error(err);  
 }

console.log(‘done’); // 成功  
 });  
 Fontmin 提供了 Node.js 模块和客户端 2 种使用方法，具体介绍请移步 [Fontmin 快速指南](http://efe.baidu.com/blog/fontmin-getting-started/)。

Fontmin：[Node.js 模块](https://www.npmjs.com/package/fontmin) | [Windows 客户端](https://github.com/ecomfe/fontmin-app/releases/download/v0.2.0/Fontmin-v0.2.0-win64.zip) | [OS X 客户端](https://github.com/ecomfe/fontmin-app/releases/download/v0.2.0/Fontmin-v0.2.0-osx64.zip) | [GitHub](http://ecomfe.github.io/fontmin/)


