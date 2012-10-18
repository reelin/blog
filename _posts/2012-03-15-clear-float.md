---
layout: post
title: clear float
describe: 整理float用法，总结归纳，方便以后看
---

<img class="alignnone size-medium wp-image-21" title="1" src="http://reelin-wordpress.stor.sinaapp.com/uploads/2012/06/1-300x157.jpg" alt="" width="300" height="157" data-pinit="registered" />

	<div class="parent">
	    <div class="float-a">
			<p>float-left</p>
	    </div>
	    <div class="float-b">
			<p>float-right</p>
	    </div>
	</div>

	.parent {
		background: #eee;
		border: 1px solid #aaa;
		padding: 10px;
		width: 500px;
	}
	.float-a, .float-b{
		background: #fff;
		color: #000;
		padding: 20px;
		border: 1px solid #ddd;
	}

*	添加浮动后：
	
<img class="alignnone size-full wp-image-22" title="2" src="http://reelin-wordpress.stor.sinaapp.com/uploads/2012/06/2.jpg" alt="" data-pinit="registered" />

	.float-a {
		float: left;
	}
	.float-b {
		float: right;
	}

*	如图,.parent由于.float-a .float-b流出文档流，现在完全没有包括他们，现在用clear来清除浮动

		<div class="parent">
			<div class="float-a">
				<p>float-left</p>
			</div>
			<div class="float-b">
				<p>float-right</p>
			</div>
			<div class="clear"><div>
		</div>
		
		.clear {
			clear: both;
		}

<img class="alignnone size-medium wp-image-24" title="3" src="http://reelin-wordpress.stor.sinaapp.com/uploads/2012/06/31-300x96.jpg" alt="" width="300" height="96" />

*	添加一个没有实际内容的div.clear很浪费，可以选择使用：after伪类

		<div class="parent clear">
			<div class="float-a">
				<p>float-left</p>
			</div>
			<div class="float-b">
				<p>float-right</p>
			</div>
			<div class="clear"><div>
		</div>
		
		.clear:after {
			content: " ";
			height: 0;
			visibility: hidden;
			display: block;
			clear: both;
		}

*	最简单的方法是使用overflow：hidden 或者 auto，不过hidden与auto稍有不同：

	比如：float-b现在内容过长
		
		.float-b {
			float: right;
			background: #C4EFEF;
			width: 50px;
		}
	
	*	用了overflow:hidden;之后，超出的部分被隐藏。

	<img class="alignnone size-medium wp-image-38" title="未命名1" src="http://reelin-wordpress.stor.sinaapp.com/uploads/2012/03/未命名1-300x175.jpg" alt="" width="300" height="175" data-pinit="registered" />

	*	但是用overflow：auto;之后，则自动添加了滑动条。
	<img class="alignnone size-medium wp-image-40" title="未命名" src="http://reelin-wordpress.stor.sinaapp.com/uploads/2012/03/未命名-300x146.jpg" alt="" width="300" height="146" data-pinit="registered" />

---

尊重原创，引用请标注出处，谢谢！