---
title: CongdeIgniter在windows下开启Apache的Rewrite模块
tags: ' - 分享'
permalink: ci-on-windows-apache-rewrite-model
id: 102
updated: '2017-04-18 19:12:14'
date: 2017-04-18 18:54:25
image:
---

在用CI框架的时候发现访问控制器的默认情况下是需要加index.php，格式如下：
>http://localhost/index.php/yourctrl

查看官方的手册后发现[这一章节](http://codeigniter.org.cn/user_guide/general/urls.html#url-index-php)有说到怎么处理。我们需要开启apache的rewrite模块，并在网站的根目录简历。htaccess文件，并写入相应的重写规则。

## 开始

* 首先在apache的conf目录下httpd.conf中找到`LoadModule rewrite_module modules/mod_rewrite.so`并去掉前面的#号注释。
* 再同一个配置文件中找到如下代码段，目的是允许在网站下的任何目录中使用`.htaccess`文件，将`AllowOverride改成All`（默认为`None`）。注意，这个文件中有两个这种选项，请选择如下这段修改：
```
DocumentRoot  "G:\你的网站路径\WWW"
<Directory />
    Options +Indexes +FollowSymLinks +ExecCGI
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
</Directory>
```
* 在网站根目录建立`.htaccess`文件。因为Windows系统的关系，我们不能建立没有名字的文件，所以我们可以在命令行下使用`echo a> .htaccess`建立后使用记事本编辑，对应的重写规则。 

* 打开浏览器输入不带index.php的地址试试看！如没有问题应该就成功了！有问题我也没办法，自己百度，哈哈！