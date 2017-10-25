---
title: 在百度开放云BAE上部署GHOST博客并配置七牛云
image: 'http://ocxfindy0.bkt.clouddn.com/image/4/ec/9e7a8dbb0e901e080731392aa3fa0.jpg'
permalink: zai-bai-du-kai-fang-yun-baeshang-bu-shu-ghostbo-ke
id: 21
updated: '2016-09-18 19:06:01'
date: 2016-09-08 20:28:19
tags:
---

## 前言
wordpress断断续续用了可能也有七八年了，从最早期的橡树博客（wpoak）到后来找的一些免费的服务器商，再到后来的搬瓦工，东西写了很多，不过几乎已经找不回来了。总而言之这些年用wordpress的经历就是折腾折腾再折腾，步骤都很简单：`找服务器`，`装博客`，`找主题`，`折腾主题`，感觉wordpress已经更趋向与CMS或者其他什么东西，有点本末倒置了。前几天我看到ghost的宣传语——更加纯粹的内容写作与发布平台。是呀，博客难道不是为了写文字而生的吗？其他的功能可有可无，内容和文字才是博客的灵魂。
而后了解了一下搭建GHOST平台的一些知识，也看到有网友在BAE上成功搭建起了GHOST，遂也想在BAE上尝试，不过碰到了各种问题，折腾了有些时间后整合了搜索到的几篇文章终于搭建成功，这里写一篇流程短文介绍一下如何实现的，希望能帮到其他想在BAE上搭建GHOST博客的朋友。
##创建BAE服务、MYSQL服务、七牛服务
![BAE创建](http://ocxfindy0.bkt.clouddn.com/image/2/5f/7e1542cd65c47b98fab44d10f1b13.png)
先在bae上创建一个自定义应用，node.js版本我是使用`4.2.6`。应用`内存选择256M`（之前搜索到有网友说应用内存必须要256m才可以运行，这里也建议使用256M）

在BAE控制面板中的左侧拓展服务中添加一个免费版的mysql服务，`有些资料说bae的免费mysql服务有长链接问题不可以使用`，经我测试没有这个问题。

记录下`mysql数据库名称`和`AC`，`AK`备用。

##下载并上传ghost应用
建议在[ghostchina](http://www.ghostchina.com/download/)上下载最新的中文集成包，里面有编译好的依赖组件。之前按照网上部署失败的原因主要是没有依赖包，虽然BAE官方文档里说了会自动下载依赖项但是然并卵~，所以我们需要把ghost需要用到的组件编译好后手动传到服务器上，你可以在linux上自己编译好文件进行上传，也可以直接上传集成包里内容。

使用svn将bae上应用内的文件检出到你的电脑内，然后把下载好的集成包解压到项目应用文件夹内，提示有重名文件覆盖即可，之后的文件目录大概是这样。
![文件列表](http://ocxfindy0.bkt.clouddn.com/image/a/32/62766039542729e0d7b135588e04c.png)

##配置文件
1. ** 设置package.json**，这个文件是node.js的配置文件，解压处出来的文件并不能直接上传使用，有很多地方需要修改。首先删除：`devDependencies`，`optionalDependencies`，`dependencies`三个字段。删除`script`字段下的`preinstall`字段，将`start`字段下的`"start": "node index"`,修改成`"start": "node index.js"`。最后如下：
    <pre><code class="language-js">
{
  "name": "ghost",
  "version": "0.7.4",
  "description": "Just a blogging platform.",
  "author": "Ghost Foundation",
  "homepage": "http://ghost.org",
  "keywords": [
    "ghost",
    "blog",
    "cms"
  ],
  "repository": {
    "type": "git",
    "url": "git://github.com/TryGhost/Ghost.git"
  },
  "bugs": "https://github.com/TryGhost/Ghost/issues",
  "contributors": "https://github.com/TryGhost/Ghost/graphs/contributors",
  "license": "MIT",
  "main": "./core/index.js",
  "scripts": {
    "start": "node index.js",
    "test": "grunt validate --verbose"
  },
  "engines": {
    "node": "~0.10.0 || ~0.12.0 || ~4.2.0",
    "iojs": "~1.2.0"
  }
}
</code></pre>

2. ** 设置config.js**,这个文件是ghost的配置文件,先复制一份`config.example.js`改名为`config.js`。打开文件，将`production字段`下的内容改为如下
    <pre><code class="language-js">
production: {
        url: '你的域名',
        database: {
            client: 'mysql',
            connection: {
                host: 'sqld.duapp.com',
                port: 4050,
                user: 'mysqlak', //your ak
                password: 'mysqlsk', //your sk
                database: '数据库名称',//your dbname
                charset: 'utf8'
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '18080'
        },
        storage: {
            provider: 'qiniu',
            bucketname: '空间名称',
            ACCESS_KEY: '七牛ak',
            SECRET_KEY: '七牛sk',
            root: '/image/',
            prefix: '七牛域名'//注意，需要带上http://
        }
    }
</code></pre>

3. ** 再将**`core`目录下的`index.js`内的`process.env.NODE_ENV = process.env.NODE_ENV || 'development';`修改为：`process.env.NODE_ENV = 'production';`强制让ghost运行在production环境下。

4. ** 哦对了，还要将index.js**文件内的`require('./core/server/utils/startup-check').check();`注释掉。

上面设置好之后应该就可以正常使用了，希望能帮助到需要的朋友，如果有任何问题请留言和我交流。enjoy this!


