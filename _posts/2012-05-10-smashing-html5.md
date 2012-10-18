---
layout: post
title: Smashing HTML5
describe: Smashing HTML5布局，熟悉HTML5标签以及CSS3的样式处理
---

Smashing HTML5, 一种新布局。如下图，

<img src="http://img.readitlater.com/i/media.smashingmagazine.com/wp-content/uploads/images/smashing-html5/files/design-thumb/RS/w680.png" alt="" data-pinit="registered" />

<img src="http://img.readitlater.com/i/media.smashingmagazine.com/wp-content/uploads/images/smashing-html5/files/design-x-ray/RS/w680.png" alt="" data-pinit="registered" />

按照教程敲了一下。总结了一下HTML5和CSS3的新特性：

`<header>`  `<footer>` ：以前的`<div id=”header”><div id=”footer”>`。添加了有语义的header和footer，也方便了html的编写。

`<nav>` 有语义的导航标签

`<aside>` ：与整体的内容相关性较小，一般都被隔离出内容区域的区域用aside标签。在Smashing面了，#featured就是使用了aside标签。

`<section>` ：也是div，但是更有语义。所包括的区域内容更具有自己的意义。在Smashing里面，#body #extra都是使用了section。

`<article>`：比section更有语义，并且更具体。在Smashing HTML5中，是将其表示post-list里面的content。包含了每条内容的header， footer，以及内容块div。

	<article>
	     <header>
	          <h2><a href="#" rel="bookmark" title="This is title">This be the title</a></h2>
	     </header>
	     <footer>
	           <p>By reelin<p>
	     </footer>
	     <div>
	           <p>Welcome to my blog!<p>
	     </div>
	</article>

`<figure>`： 顾名思义用于图像上。

	<figure>
	    <img src="images/temp/sm-logo.gif" alt="Smashing Magazine" />
	</figure>

`<hgroup>`： 标题块

	<hgroup>
	    <h2>Featured Article</h2>
	    <h3><a href="#">HTML5 in Smashing Magazine!</a></h3>
	</hgroup>

CSS3新特性：

边框圆角：

	border-radius: 10px;
	-moz-border-radius: 10px;  // 声明用于基于Mozilla的浏览器，如Firefox浏览器
	-webkit-border-radius: 10px; // 声明基于WebKit的浏览器，如Safari浏览器

阴影：
	
	box-shadow: 1px 1px 1px #DDD;

选择时：(这个之前写代码都没用过，第一次用还挺兴奋的)

	::selection {background: #F6CF74; color: #fff;}

---

尊重原创，引用请标注出处，谢谢！