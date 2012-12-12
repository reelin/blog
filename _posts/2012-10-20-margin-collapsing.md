---
layout: post
title: margin collapsing外边距重叠
describe: 什么情况下会发生外边距重叠，如何解决外边距重叠
---

1.	如果元素没有垂直边框或者内边距，就会与父元素发生外边距叠加。

		<div id="box">
			<p>This is a box.</p>
		</div>

		#box {
			margin: 10px;
			background-color: #d5d5d5;
		}
		#box p {
			margin: 20px;
			background-color: #6699ff;
		}

	![子元素和父元素外边距叠加](/images/marginC/1.png)

	可以看到段落的20像素的margin和div的10像素的margin叠加形成一个20像素的margin。这是由于具有块级子元素的元素计算其高度的方式造成的。以及，两个块级元素的外边距不是两个的margin和。

	解决这种可以添加内边距和垂直边框：

		#box {
			margin: 10px;
			padding: 5px; // 或者 border: 1px solid #fff;
			background-color: #bcc7cf;
		}
		#box p {
			margin: 20px;
			background-color: #93daa6;
		}

	![解决子元素和父元素外边距叠加](/images/marginC/2.png)

	但很多情况下，我们不需要内边距或者边框怎么办？

	>	仅当两个块级元素相邻并且在同一个块级格式化上下文时，它们垂直方向之间的外边距才会叠加。

	也就是说，即便两个块级元素相邻，但当它们不在同一个块级格式化上下文时它们的边距也不会折叠。因此，可以把父元素形成为BFC，从而解决叠加。

		#box {
			margin: 10px;
			overflow: hidden;
			background-color: #bcc7cf;
		}
		#box p {
			margin: 20px;
			background-color: #93daa6;
		}

	![父元素形成新的BFC](/images/marginC/6.png)

2.	两个相邻的块级元素的垂直方向上发生的外边距叠加。

		<div id="pink"></div>
    	<div id="blue"></div>
    	
		#pink {
	      width: 100px;
	      height: 100px;
	      background-color: #bcc7cf;
	      margin: 10px;
	    }

	    #blue {
	      width: 100px;
	      height: 100px;
	      background-color: #eee;
	      margin: 10px;
	    }

	![相邻块级元素外边距叠加](/images/marginC/3.png)

    >	外边距重叠不发生在float上

     	#pink, #blue {
     		float: left;
		}

	![解决相邻块级元素外边距叠加](/images/marginC/4.png)

3.	空元素上的外边距叠加。

		<div class="pink"></div>
		<div class="empty"></div>
    	<div class="blue"></div>

    	.pink {
	      width: 100px;
	      height: 100px;
	      background-color: #bcc7cf;
	      margin: 0;
	    }

	    .blue {
	      width: 100px;
	      height: 100px;
	      background-color: #eee;
	      margin: 0;
	    }

        .empty {
	    	margin: 20px 0 20px 0;
	    }

	![空元素上外边距叠加](/images/marginC/4.png)

 	空元素上下的外边距均为20px,本来应该是在blue和gray之间有40px的外边距，但是空元素本身外边距叠加为20px。

 	解决方法同1，加padding或者border。但实际应用中可能很少用到利用空元素来隔离两个块元素。

 	![解决空元素上外边距叠加](/images/marginC/5.png)

 	< <a href="/code/exercise/margin.html">运行查看示例代码</a> >


---
尊重原创，引用请标注出处，谢谢！







