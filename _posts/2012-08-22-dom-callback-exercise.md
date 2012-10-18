---
layout: post
title: 练习题
describe: 复习DOM的一些操作，以及回调函数的用法
---

*	实现walkTheDom函数，接受两个参数，一个是根节点，另一个是回调函数。结构如下：

		function walkTheDom(root, callback) {
		    // todo
		};
	callback接受一个参数，就是当前遍历到的节点。walkTheDom的功能是，遍历所给根结点及其所有子树节点，对每个遍历到的节点都执行callback回调函数。使用示例：

		walkTheDom(document.getElementById('wrapper'), function (element) {
		    element.style.backgroundColor = 'green';
		});
	该示例使用walkTheDom方法遍历id为wrapper的节点和它的所有子节点，将所有节点的背景色变成绿色。
 
		 // 使用方法：
		 walkTheDom2(document.body, function (element) {
		   	element.style.backgroundColor = 'green';
		 })；

		/*
		 * 方法一: 利用children函数进行遍历
		*/
		function walkTheDom(root, callback) {
			var childrens = root.children,
				count = childrens.length;
			callback(root);
			if (count === 0) {
				return;
			} else {
				for(var i = 0; i < count; i++) {
					walkTheDom(childrens[i], callback);
				}
			}
		};
		
		walkTheDom(document.body, function (element) {
		    element.style.backgroundColor = 'green';
		});
		
		/*
		 * 方法二: 使用firstChild, nextSibling进行遍历
		*/
		function walkTheDom2(root, callback) {
			var childrens = root.children,
				count = childrens.length;
			callback(root);
			if (count == 0) {
				return;
			} else {
				var first = root.firstChild;
				do {
					if (first.nodeType === 1) {
						console.log(first);
						walkTheDom2(first, callback);
					}
					first = first.nextSibling;
				} while (first);
			}
		};
		


知识点总结：

1.	children v.s. childNodes

	*	chilNodes得到的子节点有Text，children没有

2.	firstChild, nextSibling, previousSibling

	*	nextSibling中可能会有TextNode,判断TextNode可以用`nodeType === 1`

3.	函数作为参数

4.	怎么判断

---
尊重原创，引用请标注出处，谢谢！
