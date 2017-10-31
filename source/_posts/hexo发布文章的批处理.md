---
title: hexo发布文章的批处理
permalink: auto-push-hexo
date: 2017-10-28 12:01:49
tags: 流水账
image: 
---

感觉hexo发布文章的流程略微繁琐，而且我这边在github pages上和qiniu均做了部署，尤其是qiniu那边我使用的是图形界面的同步工具。每次发布的时候要先打开git bash执行生成命令后在发布到github上，然后又要打开qiniu sync工具上传文件，太为繁琐。

#### 部署到github pages

hexo默认安装的时候会自动给你装上github的部署插件hexo-deployer-git[^1]，你可以在`_config.yml`里的`deploy`字段设置，我的设置如下。这里有个小技巧，我设置了`extend_dirs: source`这个配置想，在每次部署的时候插件会额外把source目录下的md文件全部备份一份进github里，避免以后出现电脑损坏文件丢失的情况。

```yaml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy: 
  type: git
  repo: https://github.com/QingShui23/blog.git
  extend_dirs: source
```

这里设置好后打开git bash进入hexo的根目录。使用git需要先设置你的全球配置信息，执行如下操作即可完成

```html
git config --global user.name "你的用户名"
git config --global user.email 你的邮箱
```

设置好之后输入`hexo d`即可进行发布。

#### 七牛sync

七牛这边为了省事我安装了hexo-qiniu-sync[^2]插件，然后和github的发布插件一样设置需要同步的文件目录即可，我的设置如下。其中local_dir为你要同步的文件路径。

```yaml
qiniu:
  offline: false
  sync: true
  bucket: 空间
  access_key: 填入你七牛的ak
  secret_key: 填入你七牛的sk
  dirPrefix: 
  urlPrefix: http://h.4zen.top/
  up_host: http://upload.qiniu.com
  local_dir: public
  update_exist: true
  image: 
    folder: images
    extend: 
  js:
    folder: js
  css:
    folder: css
```

然后在git bash里面之行hexo qiniu s即可同步文件至七牛的云控件中，这个插件貌似还可使用本地图片，然后上传后自动给你把本地路径替换成上传后的url地址。不过看这挺复杂的，没有使用这个功能。

#### 批处理

如果以上的命令每次全部都要手动打开git bash执行也是比较繁琐的，所以我写了个批处理来批量执行这些命令。第一行的盘符和第二行的路径请自行根据你的hexo所在位置进行设置。

```html
D:
cd hexo
call hexo clean
call hexo g
call hexo d
call hexo qiniu s
```

[^1]: 七牛同步插件：https://github.com/gyk001/hexo-qiniu-sync
[^2]: github同步插件：https://github.com/hexojs/hexo-deployer-git

