---
layout: post
title: Dragable cat 1
---

任意拖动一只绝对定位的小猫~  <a href="\code\exam\ex13.html">快来玩玩小猫吧~~</a>

	<!DOCTYPE HTML>
	<html lang="en-US">
	<head>
	    <meta charset="UTF-8">
	    <title>Dragable cat</title>
	    <style type="text/css">
	        #cat {
	            position: absolute;
	            left: 50px;
	            top: 50px;
	            -webkit-transform: rotate(-80deg); 
	            -o-transform: rotate(-80deg);
	            -moz-transform: rotate(-80deg);
	            transform: rotate(-80deg);
	        }
	        #miao {
	            position: absolute;
	            display: none;
	            font-size: 12px;
	        }
	    </style>
	</head>
	<body>
	    <img src="oct.png" alt="octcat" id="cat">
	    <span id="miao">喵</span>
	    <script type="text/javascript">
	        (function (d) {
	            var cat = d.getElementById('cat'),
	                miao = d.getElementById('miao'),
	                catX = 0,
	                catY = 0,
	                originMouseX = 0,
	                originMouseY = 0,
	                flag = false;
	
	            cat.onmousedown = function(e) {
	                e.preventDefault();
	                var xy = getXY(e);
	                catX = _getComputedStyle(cat, 'left');
	                catY = _getComputedStyle(cat, 'top');
	                originMouseX = xy.x;
	                originMouseY = xy.y;
	                flag = true;
	            }
	
	            document.onmousemove = function(e) {
	                e.preventDefault();
	                var xy = getXY(e);
	                if (flag) {  
	                    cat.style.left = catX + (xy.x - originMouseX) + "px";
	                    cat.style.top = catY + (xy.y - originMouseY) + "px";
	                }
	            }
	
	            cat.onmouseup = function(e) {
	                e.preventDefault();
	                var xy = getXY(e);
	                flag = false;
	                originMouseX = xy.x;
	                originMouseY = xy.y;
	                catX = _getComputedStyle(cat, 'left');
	                catY = _getComputedStyle(cat, 'top');
	            }
	
	            // 获取时间中鼠标的坐标，以{x: ,y: }的形式返回
	            function getXY(e) {
	                var xy = {};
	                if (window.event) {
	                    xy.x = window.event.clientX;
	                    xy.y = window.event.clientY;
	                } else {
	                    xy.x = e.pageX;
	                    xy.y = e.pageY;
	                }
	                return xy;
	            }
	
	            function move() {
	                var a = getXY();
	                if (flag) {
	                    console.log("click");
	                    console.log(catX);
	                    console.log(catY);
	                    catX = a.x;
	                    catY = a.y;   
	                    cat.style.left = catX + "px";
	                    cat.style.top = catY + "px";
	                    console.log(a.x);
	                    console.log(a.y);
	                    moveaTimer = setTimeout(move, 10);
	                } else {
	                    
	                    clearTimeout(moveaTimer);
	                }
	            }
	
	            // 获取Element对象的一个样式属性值
	            function _getComputedStyle(element, property) {
	                return parseInt(window.getComputedStyle(element, null)[property]);
	            }
	        }(document));
	    </script>
	</body>
	</html>

*	开始将mousemove事件添加到小猫的身上，发现动作很不连贯，而且动作发生也是在整个document中，不只是在小猫身上，所以改成的document的事件，拖动动作连贯了很多。

*	开始将鼠标移动的位置直接赋值给小猫的位置，点击小猫的时候，小猫移动了一段距离，然后改成小猫的位置加上鼠标的位移。这样一开始点击的时候，鼠标的位移是0，小猫就不会出现“跳动”的情况。

---
尊重原创，引用请标注出处，谢谢！
