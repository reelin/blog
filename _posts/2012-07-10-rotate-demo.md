---
layout: post
title: 翻转器demo
describe： 图片翻转器。列表内容对应不同的图片，图片翻转的同时，文字也focus到的对应的，鼠标放到文字上，停止翻转，显示当前对应图片。
---

根据提示文字的改变，对应的图像翻转.
<a href="/code/demo">查看效果</a>


HTML：文字和图像分成两个块

![](http://miaowuwu.net/code/demo/images/div.jpg)

	<!DOCTYPE html>
	<html>
		<head>
			<meta charset='utf-8' />
			<title>Draw And Guess</title>
			<link rel="stylesheet" type="text/css" href="css/scroll.css" />
			<script type="text/javascript" src="javascript/jquery-1.7.2.min.js"></script>
			<script type="text/javascript" src="javascript/scroll.js"></script>
		</head>
		<body>
			<div id="scroll">
				<div id="information" class="float-left">
					<div id="title"><h2>如何使用</h2></div>
					<ol>
						<li class="active">1. 登陆。输入邮箱，密码进行登陆。</li>
						<li>2. 在线人数不小于两人时，即可点击开始，开始游戏。</li>
						<li>3. 轮到的人画图，其余人猜。画图的人根据给出词语画图。</li>
						<li>4. 点击不同的笔有不同的效果，根据自己需要选择。</li>
						<li>5. 可以选择需要的颜色。</li>
						<li>6.其余人猜画的是什么，猜对加分，猜的越快分数越高。</li>
					</ol>
				</div>
				<div id="figure" class="float-left">
					<img id="scroll-img" alt="information figure" src="/DEMO/images/information1.jpg" />
				</div>
			</div>
		</body>
	</html>

CSS:

	body {
		font-family: "Hiragino Sans GB", "Helvetica Neue", Helvetica, Arial, Sans-serif;
		line-height: 18px;
		color: #333;
	}
	
	.float-left {
		float: left;
	}
	
	/*
	 * 使用方法介绍区域样式
	*/
	#scroll {
		background: #fff;
		border: 1px solid #649cc7;
		width: 950px;
		height: 330px;
		overflow: hidden;
	}
	
	/* 使用方法信息样式 */
	#information #title{
		width: 250px;
		padding: 2px 0;
		background: #649cc7 url(../images/img_ribbon.gif) no-repeat 10px -8px;
	}
	
	#information h2 {
		font-size: 1.3em;
		color: #fff;
		font-weight: bold;
		padding-left: 50px;
	}
	
	#information ol {
		list-style: none;
		margin-top: 10px;
	}
	
	#information ol li {
		padding: 8px;
	}
	
	/* active类样式 */
	#scroll #information .active {
		font-weight: bold;
		color: #07c;
	}
	
	/* 翻转图片区域样式 */
	#scroll #figure {
		padding: 10px;
	}

JS: 

	$(function() {
		changeImg();
		changeInformation(); 
	});
	
	var i = 0;
	var interval;
	
	function changeImg() {
		
		if( i == 6 )  i = 0;
		++i;
	
		var img_src = "images/information" + i + ".jpg";
		
		$("#scroll-img").attr("src", img_src);
		$("#scroll-img").fadeIn(1500);
		$(".active").removeClass("active");
		$("li")[i-1].className = "active";
	
		console.log(i);
		interval = setTimeout(changeImg, 2500);
		$("#scroll-img").fadeOut(800);
	}
	
	function changeInformation() {
		$("li").bind( { 
			mouseover : function() {
				interval = clearInterval(interval);
	
				var interge = parseInt(this.innerHTML);
	
				$("#scroll-img").attr("src", "images/information" + interge + ".jpg");
				$("#scroll-img").stop(true,true);
				$("#scroll-img").show();
				$(this).css("cursor","pointer");
				$(".active").removeClass("active");
				$(this).addClass("active");
			}, 
			mouseout : function() {
				changeImg();
			}
		});
	}
	



