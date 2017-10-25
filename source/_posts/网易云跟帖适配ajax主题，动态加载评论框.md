---
title: 网易云跟帖适配ajax主题，动态加载评论框
tags: ' - 设计'
image: 'http://cdn.4zen.top/image/7/e1/71ab3d9fe111d1d42dd1c05c11334.png'
permalink: yun-gentie
id: 96
updated: '2017-04-05 19:59:56'
date: 2017-03-26 15:06:30
---

2017年3月29日上午：（经测试发现无法评论）。。
2017年3月29日中午：刷新博客发现早上发的评论居然出来了，网易云跟帖的审核速度未免也太“快”了把？。。
**总结：还是不要使用该款评论组件。。**

~~自从前几天多说宣布停止服务后我一直在寻找另外一个我喜欢的第三方评论组件，最喜欢的应该是disqus了，主要是因为他的游客评论功能，目前国内除多说外的组件似乎都强制用户登录才可以发表评论。我觉得这就像是我去旅游别人强制我买东西一样蛋疼...

但是我还是妥协了，我发现国内似乎没有第二个多说这样的组件了，我很遗憾...，后来在这些流氓组件中选来选去最后还是考虑换上了[网易云跟帖](https://gentie.163.com/index.html)（各种不爽，各种无法自定义...），由于官方没有提供一些文档和接口，导致和我的主题各种水土不服...，当时的心情是崩溃的...，后来没辙，还是得想办法治呀。只得去研究网易的js。

### #分析一下

网易提供的代码如下

```
<div id="cloud-tie-wrapper" class="cloud-tie-wrapper"></div>
<script>
  var cloudTieConfig = {
    url: document.location.href, 
    sourceId: "",
    productKey: "0a1d8640929c49d3aad1489a8d785e28",
    target: "cloud-tie-wrapper"
  };
</script>
<script src="https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js"></script>
```

代码和多说的基本上差不多，

1. 一个div元素用来放加载的元素，
2. 一个存放用户信息的json，
3. 一个引用的加载脚本js文件。


看了下代码，网易的这个loader.js虽然代码做了混淆，但是不难看出里面其实只有一个主函数，作用就是加载评论的数据，

```
!
function(e) {//这是主函数，
    function t(e, t) {
        var n = document.createElement("script");
        return n.src = e,
        n.async = !1,
        n.charset = "utf-8",
        t ? l.appendChild(n) : h.appendChild(n),
        n
    }
//中间代码比较多，就不贴全了
...
    var d = /\.js$/,
    c = /\.css$/,
    h = document.createDocumentFragment(),
    u = !1,
    l = document.head || document.getElementsByTagName("head")[0];
    window.yunManualLoad || window.yunModuleEnv || (o() ? r("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vbW9iaWxlL2xpdmVzY3JpcHQuaHRtbA==", !0) : r("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vcGMvbGl2ZXNjcmlwdC5odG1s", !0)),
    e.Tie = e.Tie || {},
    e.Tie.loader = r
} (window);//这里是调用
```

### #改改试试看

我抱着试一下的心态，删掉感叹号，并且给主函数加个名字，方便之后调用。
```
function yload(e) {//这是主函数，
    function t(e, t) {
        var n = document.createElement("script");
        return n.src = e,
        n.async = !1,
        n.charset = "utf-8",
        t ? l.appendChild(n) : h.appendChild(n),
        n
    }
...
    var d = /\.js$/,
    c = /\.css$/,
    h = document.createDocumentFragment(),
    u = !1,
    l = document.head || document.getElementsByTagName("head")[0];
    window.yunManualLoad || window.yunModuleEnv || (o() ? r("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vbW9iaWxlL2xpdmVzY3JpcHQuaHRtbA==", !0) : r("aHR0cHM6Ly9hcGkuZ2VudGllLjE2My5jb20vcGMvbGl2ZXNjcmlwdC5odG1s", !0)),
    e.Tie = e.Tie || {},
    e.Tie.loader = r
};//这里的加载调用也删掉
```

然后在在网页的主js里面定义一个配置json

```
var cloudTieConfig = {
    url: document.location.href, //网易云的文章不是通过多说那种id形式，而是直接以url的形式来定义。
    sourceId: "",
    productKey: "0a1d8640929c49d3aad1489a8d785e28",
    target: "cloud-tie-wrapper"//用来存放评论元素的容器id
};
```

然后在需要的地方调用之前更改好的yload(windows)就可以动态加载评论框了。

我意外的发现居然能行得通...为了让多朋友知道所以写了这片拙劣的文章，希望能帮到大家

### #要注意的地方
但是要注意哦，你定义函数的js文件要比网易云的哪个加载文件后引入哦，不然会找不到配置json的。而且，因为是动态调用的加载函数，所以每次调用前还需要更新`cloudTieConfig`变量中的url字段；最后调用的情况大概就是下面这个样子了（这里因为发现多次调用的话会重复添加评论框，所以我判断了如果容器里有内容就不会重复加载）

```
if ($("#cloud-tie-wrapper").html() == "") {
    cloudTieConfig.url = document.location.href;//设置当前文章的url
    yload(window)//调用函数
};
```

好了大概就是这样了，以上的内容只能当作参考，我也转业很久没写代码了，有什么解释错误的地方大家可以指出来，我好改正，谢谢。

Enjoy~~~
