---
layout: post
title: Dragable cat 2
describe: 【小猫的加强版】写成一个Element的扩展drag，可以在使用在其他绝对定位的元素上。
---

将之前的代码重构一下，写成一个Element的扩展drag，当给drag传入true时，元素则可拖拽，传入false则取消可拖拽状态。

<a href="\code\exam\ex14.html">拖动更多的小猫，哈哈~~~</a>

	/*
	* 使用方法： 
	* document.getElementById("ID").drag(true);
	*/
	(function (d) {

            Element.prototype.drag = function(flag) {
                var element = this,
                    elementX = 0,
                    elementY = 0,
                    originMouseX = 0,
                    originMouseY = 0,
                    isMoving = false;

                element.onmousedown = function(e) {
                    e.preventDefault();
                    if (flag) {
                        var xy = getXY(e);
                        elementX = _getComputedStyle(element, 'left');
                        elementY = _getComputedStyle(element, 'top');
                        originMouseX = xy.x;
                        originMouseY = xy.y;
                        isMoving = true;
                    }
                }

                document.addEventListener("mousemove", function(e) {
                    e.preventDefault();
                    var xy = getXY(e);
                    if (isMoving) {  
                        element.style.left = elementX + (xy.x - originMouseX) + "px";
                        element.style.top = elementY + (xy.y - originMouseY) + "px";
                    }
                }, false);

                element.onmouseup = function(e) {
                    e.preventDefault();
                    var xy = getXY(e);
                    isMoving = false;
                    originMouseX = xy.x;
                    originMouseY = xy.y;
                    elementX = _getComputedStyle(element, 'left');
                    elementY = _getComputedStyle(element, 'top');
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

                // 获取Element对象的一个样式属性值
                function _getComputedStyle(element, property) {
                    return parseInt(window.getComputedStyle(element, null)[property]);
                }
            }
        }(document));

*	小猫是绝对定位的哦~~而且有top，left的值

*	添加多了一只小猫，让cat1可拖动，然后拖动后，让cat2可拖动，然后再拖动cat1，就不行了。在高手的指点下，得到一颗明星addEventListener()

	*	能通过多次调用addEventListener()为同一个对象注册同一事件类型的多个处理程序函数。(犀牛书)

*	给document添加addEventListener()后，小猫可以轮着拖动咯~~

---
尊重原创，引用请标注出处，谢谢！
