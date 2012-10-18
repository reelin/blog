---
layout: post
title: 三道搜狐面试题（答案）
describe: 搜狐面试题目答案
---

*	题目一：实现一个遍历数组或对象里所有成员的迭代器

	1.	调用each函数的参数内部使用了this，将obj的属性值当做了此时的this.Function.call() 可以将函数作为对象的方法调用，可单独指定传递的参数；Function.apply() 的参数要传入数组元素。在此更适合使用call()将value当做此时的this，并且调用fn函数。

	2.	由于数组和对象传递的参数不同，要判断数组和对象，使用typeof得到的返回值都是object。ECMAscript 5中可以使用Array.isArray()函数来判断。ECMAscript 3中可以这样判断：对象的类属性是一个字符串，表示对象的类型信息。可以用默认的toString()方法 (继承自Object.prototype) 返回[object class]。但很多对象继承的toString方法可能被重写过，为了能够调用到正确的toString()版本，必须间接的调用Function.call()。

			var isAarry = (Array.isArray) ? Array.isArray(obj) : typeof obj === "object" && Object.prototype.toString.call(obj) === "[object Array]";

	<a href="/code/exam/">查看第一题答案</a>

*	题目二，实现一个叫Man的类，包含attr, words, say三个方法

	1.	Me的创建，有两种方法，用new来创建的时候会调用构造函数。调用构造函数的一个重要特征是，构造函数的prototype属性被用作新对象的原型。而该属性包含constructor属性。因此，me.constructor === Man。根据，这个不同，在Man中判断对象me是否属于Man这个类

			if (this.constructor !== Man) {
			    return new Man(obj);
			}

	`fullName`和`gender`私有化，这样在外部赋值就不会影响到值的改变，用`setter`和`getter`来取值和赋值

		var fullname = obj.fullname || "<用户未输入>",
		    gender = obj.gender || "<用户未输入>";
	
		// setter赋值
		this.set_fullname = function(value) {
		    fullname = value;
		}
	
		this.set_gender = function(value) {
		    gender = value;
		}
	
		// getter取值
		this.get_fullname = function() {
		    return fullname;
		}
	
		this.get_gender = function() {
		    return gender;
		}

	1.	attr方法。用可变的参数数组argument的长度的不同，进行不同的操作。在长度为一的时候判断类型，是对象的话就批量setter。

	2.	words方法。我设了一个属性sayWords来存放words。

	3.	says方法。根据word-limit的长度来决定输出的sayWords的长度。

	<a href="/code/exam/Man.html">查看第二题答案</a>

*	题目三，实现一个URI解析方法，把url里#之后的参数解析成指定的数据结构

	match()返回一个数组a，a[0]存放的是完整匹配，之后的依次是圆括号中匹配的子串。根据子串的位子将得到的子串存放到result数组中。

	题目的要求只要#号之后的解析就可，每个部分分解成子串分别调用。

		parseUrl = /#((\S+)\?)*(\w+=\S+&*)*/

	<a href="/code/exam/urlParse.html">查看第三题答案</A>

---

尊重原创，引用请标注出处，谢谢！
