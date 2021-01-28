# Uno Zen for Ghost

![Last version](https://img.shields.io/github/v/tag/kagenzhao/uno-zen.svg?sort=semver&style=flat-square)
![Ghost version](https://img.shields.io/badge/Ghost-3.x-brightgreen.svg?style=flat-square)
![Node version](https://img.shields.io/badge/node-10.x%7C12.x%7C14.x-brightgreen)


> 感谢 Kikobeats 的主题 [Uno Zen](https://github.com/Kikobeats/uno-zen)，本主题由此改造而成
<br>
 感谢 bestswifter 进行的加工和优化

> **NOTE**: 商用版本可以在这里购买 [Uno Urban](https://sellfy.com/p/G5kK).

[<img src="http://i.imgur.com/LCSB4Ca.jpg">](http://kikobeats.com)

---

# 介绍

**Uno Zen** 是基于 [Uno](https://github.com/daleanthony/Uno) 开发的一个 Ghost 博客主题。它提供了功能和样式上一些小的改进和优化。
<br>
后续 经过 [bestswifter](https://bestswifter.com) 加工和优化, 提供了不少心的功能

### 我在两人的基础上新增了以下内容:
* 适配 ghost api v3
* 添加本地搜索功能
* 文章页右侧添加了目录
* 添加了归档页
* Disqus加载时间调整到滚动下方时再加载
* 修复一些问题和bug


###你可以访问我的博客查看 [demo](https://www.kagenz.com)

## 安装

本地 clone git
```bash
git clone https://github.com/kagenZhao/uno-zen.git
```
或直接下载zip包

进入*ghost后台* > *Design* > *Upload a theme*
点击 *ACTIVE*

## 准备工作

## 更新

在 `themes/uno-zen` 目录下执行：

```bash
git pull origin
``` 

## 自定义

### 归档页
根据Ghost API, 我默认已经实现了`page-archives.hbs`
<br>
你需要做的就是
- 进入Ghost后台界面
- 点击 `New Page` 
- 设置标题 为Archives 或者你喜欢的名字
- 打开`Code injection`, 再footer中填入
  `<script src="https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment.min.js"></script>`
- 保存发布
- 点击Design, 再顶部添加引导连接如图


<div>
<img src="https://oss.kagenz.com/ghost/20210128175444.png" width="30%">
<img src="https://oss.kagenz.com/ghost/20210128175828.png" width="30%">
<img src="https://oss.kagenz.com/ghost/20210128175936.png" width="30%">
<img src="https://oss.kagenz.com/ghost/20210128180202.png">
</div>


### 本地搜索&目录
这两个功能用到了Ghost api, 按下面步骤开启api
- 进入Ghost后台 点击Integrations
- 点击`Add custom integration` 输入名字, `Create`
- 复制`Content API key`
- 打开`Code injection`, 再header中填入`<script>var ghost_api_key = "YOUR API KEY";</script>`
- 保存即可

<div>
<img src="https://oss.kagenz.com/ghost/20210128180442.png" width="30%">
<img src="https://oss.kagenz.com/ghost/20210128180639.png">
<img src="https://oss.kagenz.com/ghost/20210128180801.png" width="49%">
<img src="https://oss.kagenz.com/ghost/20210128180920.png" width="49%">
<img src="https://oss.kagenz.com/ghost/20210128181106.png">
</div>



### 代码高亮

采用 [prism.js](https://prismjs.com/) 做代码高亮, 默认加载了基础css和js
<br>
为了减少js的加载数量, 使用者需要在每一篇post中单独设置*Code injection* > `Post footer {{ghost_foot}}`

```js
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-bash.min.js"></script>
```

### 社交按钮与图标

采用 [Font Awesome](http://fontawesome.io/) 的图标字体来展示社交按钮，请参考我的 `partials/social.hbs` 文件中的代码：

```html
<a href="https://github.com/bestswifter" title="@KtZhang 的 Github" target="_blank">
  <i class='social fa fa-github'></i>
  <span class="label">Github</span>
</a>

<a href="http://weibo.com/bestswifter" title="@bestswifter" target="_blank">
  <i class='social fa fa-weibo'></i>
  <span class="label">weibo</span>
</a>
```

如果你需要使用别的图片，只要去 [Font Awesome](http://fontawesome.io/) 官网查一查图片名即可。

### 头像与封面

封面图片可以直接在 ghost 后台进行配置。

使用 [Favicon Generator](http://realfavicongenerator.net/) 生成不同平台下的头像图片，并放入 `assets/img` 文件夹下。

### 文章列表的总标题

在[我的博客](https://bestswifter.com)中，你可以看到所有文章的最上方有一个大标题：**作品集**，如果你想换成别的名字，可以在 ghost 后台插入代码，在 `{{ghost_head}}` 中加入以下代码：

```js
<script>
var posts_headline = '作品集 ';
</script>
```

### Disqus 评论管理

只要在 `{{ghost_head}}` 中加入你的站点的 shortname 即可：

```js
<script>
var disqus_shortname = 'bestswifter'; // 改成自己的 shortname
</script>
```

### 时间统计

所有的文章都会显示 “xxx Days Ago”，表示这是你多久以前的文章。原来的代码似乎与中文版ghost不兼容，我做了一些修改，具体效果可以参考[我的博客](https://bestswifter.com)。

### 自定义导航页

你可以为你的博客配置多个导航页，比如 ”关于“ 页面。这个可以在 ghost 的后台进行配置。

### TODO

uno-zen 是一个非常优秀的主题，作者还在不断的对他进行更新，我也会不断探索新的功能并与大家分享。

## License

MIT © [KagenZhao](https://www.kagenz.com)
