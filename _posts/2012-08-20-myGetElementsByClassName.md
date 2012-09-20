---
layout: post
title: myGetElementsByClassName
---

*	部分浏览器是不支持getElementsByClassName方法的，扩展Element，新增一个myGetElementsByClassName方法，以供跨浏览器使用

		(function () {
			Element.prototype.myGetElementsByClassName = function (name) {
				var result = [],
				    element = this,
				    childrens = element.children,
				    lenth = element.childElementCount;
				for (var i = 0; i < lenth; i++) {
				    console.log(childrens[i].className);
					// 递归查找子节点中是否有该类
				    if (childrens[i].className.indexOf(name) !== -1) {
				    	result.push(childrens[i]);
				    }
				    result = result.concat(childrens[i].myGetElementsByClassName(name));
				}
				return result;
			}
		})(document);

---
尊重原创，引用请标注出处，谢谢！
