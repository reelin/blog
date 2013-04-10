/** 
 * 扩展jQuery插件
 * 制图
 */
 (function ($) {
	$.fn.extend({
	 	chart : function() {
	 		var color1 = ["CE7688", "#75c0eb", "#aecfbd", "#f8b887", "#fce996"],
			color2 = ["rgba(87, 212, 144, 0.8)", "rgba(158, 197, 255, 0.8)", "rgba(255, 243, 112, 0.8)", "rgba(255, 175, 235, 0.8)", "rgba(247, 127, 14, 0.6)"],
			color3 = ["#a0d9ff", "#ffdca0", "#ffa4ad", "#af92ff", "#ff90f5"],
			canvas_nums = 0; 

		return this.each(function () {
			var that = $(this);

			that.on("click", function(e) {
				e.preventDefault();
				var that = $(this),
					no = that.attr('data-value'),

					chartData = {
					    type: [],
					    data: [],
					    value_name: [],
					    data_name: [],
					    group_count : 0,
					    data_count : 0
					},
				

					tr = $(".table-input tbody tr"),
					length = tr.length,
					col_name = tr.children('.name').children("input"),
					hor_name = $(".table-input thead th input"),
					value_len = hor_name.length,
					charts = $("#wrapper .charts"),
					context;  
				
				chartData.group_count = length;
				chartData.data_count = value_len;
				// 读数据
				for (var i = 0 ; i < length; i++) {
					var input = $(tr[i]).children("td").children("input"),
						value_len = input.length,
						items = [],
						radians = [],
						total = 0,
						b = {};
						
					for (var j = 1; j < value_len; j ++) {
						items.push(parseFloat(input[j].value));					
						if (i === 0) {
							chartData.value_name.push(hor_name[j].value);
						}
					}

					b[col_name[i].value] = items;
					console.log(b);
					chartData.data.push(b);
					chartData.data_name.push(col_name[i].value);

				}

				var canvas_height = hasNegative(chartData.data, chartData.group_count, chartData.data_name, chartData.value_name.length) ? 1100 : 600;
				
				if (no == 1 || no == 7) {
					for ( var i = 0; i < length; i++) {
						radians[i] = calculateRadian(chartData.data[i][chartData.data_name[i]]);
						if (!radians[i]) {
							$('header span').css('display', 'inline-block');
						} else {
							$('header span').css('display', 'none');
							charts.append('<canvas id="myCanvas' + i + canvas_nums +'" width="800" height="600"></canvas>');
							context = document.getElementById("myCanvas" + i + canvas_nums).getContext("2d");
							pieChart(context, radians[i], color1, chartData.value_name, 300, 300, 250);
							console.log(chartData.value_name);
							canvas_nums ++;
						}
					} 
					console.log(canvas_nums)
				}
				if (no == 2 || no == 7){
					for ( var i = 0; i < length; i++) {
						charts.append('<canvas id="myCanvas' + (i + canvas_nums)  +'" width="900" height = '+ canvas_height +'></canvas>');
						context = document.getElementById("myCanvas" + (i + canvas_nums) ).getContext("2d");
						barChart(context, [chartData.data[i]], chartData.value_name, [chartData.data_name[i]], 1, color2);

					} 
					canvas_nums += i;
					console.log('canvas_nums = ' +canvas_nums)

				}
				if (no == 3 || no == 7) {
					for ( var i = 0; i < length; i++) {
						charts.append('<canvas id="myCanvas' + (i + canvas_nums)  +'" width="900" height = '+ canvas_height +'></canvas>');
						context = document.getElementById("myCanvas" + (i + canvas_nums) ).getContext("2d");
						lineChart(context, [chartData.data[i]], chartData.value_name, [chartData.data_name[i]], 1, color3);
					} 
					canvas_nums += i;
					console.log('canvas_nums = ' +canvas_nums)
				}
				if(no == 4 || no == 7) {
					charts.append('<canvas id="myCanvas' + canvas_nums +'" width="900" height = '+ canvas_height +'></canvas>');
					context = document.getElementById("myCanvas" + canvas_nums).getContext("2d");
					barChart(context, chartData.data, chartData.value_name, chartData.data_name, chartData.group_count, color2);
					canvas_nums ++;
					console.log('canvas_nums = ' +canvas_nums)
				}
				if (no == 5 || no == 7){
					charts.append('<canvas id="myCanvas' + canvas_nums +'" width="900" height = '+ canvas_height +'></canvas>');
					context = document.getElementById("myCanvas" + canvas_nums).getContext("2d");
					lineChart(context, chartData.data, chartData.value_name, chartData.data_name, chartData.group_count, color3);
					canvas_nums ++;
					console.log('canvas_nums = ' +canvas_nums)
				}
				if (no == 6 || no == 7) {
					charts.append('<canvas id="myCanvas' + canvas_nums +'" width="900" height = '+ canvas_height +'canvas>');
					context = document.getElementById("myCanvas" + canvas_nums).getContext("2d");
					barLineChart(context, chartData.data, chartData.value_name, chartData.data_name, chartData.group_count, color2, color3);
					canvas_nums ++;
					console.log('canvas_nums = ' +canvas_nums)
				}
					
			});
				

			function setFillRect(context, style, x, y, width, height) {
				context.fillStyle = style;
				context.fillRect(x, y, width, height);
			}

			function setStrokeRect(context, style, x, y, width, height) {
				context.strokeStyle = style;
				context.strokeRect(x, y, width, height);
			}

			function setLine(context, color, x_start, y_start, x_end, y_end) {
				context.strokeStyle = color;
				context.beginPath();
				context.moveTo(x_start, y_start);
				context.lineTo(x_end, y_end);
				context.stroke();
			}

			function setFillText(context, font, color, align, text, x, y, maxWidth){
				context.font = font;
				context.fillStyle = color;
				context.textAlign = align;
				context.fillText(text, x, y, 80, maxWidth);
			}

			function setFillArc(context, color, x, y, r, start, end) {
				context.fillStyle = color;
				context.beginPath();
				context.moveTo(x, y);
				context.arc(x, y, r, start, end);
				context.fill();
			}
			function setStrokeArc(context, color, x, y, r, start, end) {
				context.strokeStyle = color;
				context.beginPath();
				context.moveTo(x, y);
				context.arc(x, y, r, start, end);
				context.stroke();
			}

			function pieChart(context, radians, color, value_name, x, y, r) {
				var i = 0,
					len = radians.length,
					start = 0,
					end = radians[i];
				for (; i < len; ) {
					setFillArc(context, color[i], x, y, r, start, end);
					setFillRect(context, color[i], 600, 30*i+50, 50, 20 );
					setFillText(context, "20px Arial,Helvetica,sans-serif", "#555", "left", value_name[i], 660, 30*i+68);
				
					start = end;
					end = start + radians[++i];
					
				}
			}

			function barChart(context, data, value_name, data_name, order, color) {	
				var len = value_name.length,
					interval = (680 - (len * order * 26))/(len+1),
					height = [],
					grid = setGrid(context, data, value_name, data_name, order);

				for (var j = 0; j < order; j++) {	
					for (var i = 0; i < len; i++) {
						// arithmetic progression an = a1 + (n-1) * d
						height[i] = data[j][data_name[j]][i]/ grid.unitLength * grid.lineSpace;
						setBar(context, color[j], 60.5 + j * 28 + interval + i * (28 * order + interval) , 549.5, 26, -height[i]);	
						if (j === 0){
							setFillText(context, "16px Arial,Helvetica,sans-serif", "#555", "center", value_name[i], 60.5  + interval + i * (28 * order + interval) + order * 10 , 570 );
						}			
					}
					setBar(context, color[j], 780, 30*j+30, 26, -20);
					setFillText(context, "20px Arial,Helvetica,sans-serif", "#555", "left", data_name[j], 815, 30*j+25);
				}
			}	

			function barLineChart(context, data, value_name, data_name, order, color1, color2) {	
				var len = value_name.length,
					interval = (680 - (len * order * 26))/(len+1),
					height = [],
					grid = setGrid(context, data, value_name, data_name, order),
					temp ,
					x_start,
					x_end,
					offset = [];

				context.lineWidth = 5;

				for (var j = 0; j < order; j++) {	
					context.strokeStyle = color2[j];
					for (var i = 0; i < len; i++) {
						// arithmetic progression an = a1 + (n-1) * d
						height[i] = data[j][data_name[j]][i]/ grid.unitLength * grid.lineSpace;
						setBar(context, color1[j], 60.5 + j * 28 + interval + i * (28 * order + interval) , 549.5, 26, -height[i]);	
						if (j === 0){
							setFillText(context, "18px Arial,Helvetica,sans-serif", "#555", "center", value_name[i], 60.5  + interval + i * (28 * order + interval) + order * 10 , 570 );
						}	

						// arithmetic progression an = a1 + (n-1) * d
						temp = data[j][data_name[j]][i] / grid.unitLength * grid.lineSpace;

						height[i] = (274.5 - temp) * 2 + temp;
						x_end = 75.5 + j * 28 + interval + i * (28 * order + interval);

						if (i > 0) {
							x_start = 75.5 + j * 28 + interval + (i-1) * (28 * order + interval);
							offset = calculateOffset(x_start , height[i-1], x_end, height[i], 2);
							setLine(context,color2[j], offset[0] , offset[1], x_end, height[i]);
						} 
						setFillArc(context, color2[j], x_end, height[i], 6, 0, 2*Math.PI);
						setFillArc(context, "#fff", x_end, height[i], 3, 0, 2*Math.PI);
				
					}
					setBar(context, color1[j], 780, 30*j+35, 26, -20);
					setFillArc(context, color2[j], 814, 30*j+25, 6, 0, 2*Math.PI);
					setFillArc(context, "#fff", 814, 30*j+25, 3, 0, 2*Math.PI);
					setLine(context,color2[j], 820 , 30*j+25, 846, 30*j+25);
					setFillArc(context, color2[j], 850, 30*j+25, 6, 0, 2*Math.PI);
					setFillArc(context, "#fff", 850, 30*j+25, 3, 0, 2*Math.PI);
					setFillText(context, "20px Arial,Helvetica,sans-serif", "#555", "left", data_name[j], 859, 30*j+30);
		
				}
			}	

			function lineChart(context, data, value_name, data_name, order, color) {
				var len = value_name.length,
					interval = (680 - (len * 26))/(len+1),
					height = [],
					grid = setGrid(context, data, value_name, data_name, order),
					temp ,
					x_start,
					x_end,
					offset = [];
				context.lineWidth = 5;
				for (var j = 0; j < order; j++) {
					context.strokeStyle = color[j];
					for (var i = 0; i < len; i++) {			
						// arithmetic progression an = a1 + (n-1) * d
						temp = data[j][data_name[j]][i] / grid.unitLength * grid.lineSpace;

						height[i] = (274.5 - temp) * 2 + temp;
						x_end = 80.5  + interval + i * (26 + interval);

						if (i > 0) {
							x_start = 80.5  + interval + (i-1) * (26 + interval);
							offset = calculateOffset(x_start , height[i-1], x_end, height[i], 2);
							setLine(context,color[j], offset[0] , offset[1], x_end, height[i]);
						} 
						setFillArc(context, color[j], x_end, height[i], 6, 0, 2*Math.PI);
						setFillArc(context, "#fff", x_end, height[i], 3, 0, 2*Math.PI);
						if (j === 0){
							setFillText(context, "20px Arial,Helvetica,sans-serif", "#555", "center", value_name[i], x_end-20 , 570 );
						}	

					}
					setFillArc(context, color[j], 800, 30*j+25, 6, 0, 2*Math.PI);
					setFillArc(context, "#fff", 800, 30*j+25, 3, 0, 2*Math.PI);
					setLine(context,color[j], 806 , 30*j+25, 830, 30*j+25);
					setFillArc(context, color[j], 836, 30*j+25, 6, 0, 2*Math.PI);
					setFillArc(context, "#fff", 836, 30*j+25, 3, 0, 2*Math.PI);
					setFillText(context, "20px Arial,Helvetica,sans-serif", "#555", "left", data_name[j], 852, 30*j+30);
				}
			}
			
			function setBar(context, color, x, y, width, height) {			
				setFillRect(context, color, x, y, width, height);
				setFillRect(context,"rgba(255, 255, 255, 0.5)", x+1, y-1, 24 , height+2);
			}

			function setGrid(context, data, value_name, data_name, order, unitLength) {
				var maxList = [],
					max = 0,
					lineSpace = 50,
					maxItem,
					temp,
					nagetives = [],
					nagetiveItem,
					nagetive = false,
					heightBoundary = 549.5,
					lenNagetive,
					len = value_name.length,
					i;

				max = findMax(data, order, data_name, len);
				// for (i = 0; i < order; i++) {
				// 	maxItem = findMax(data[i][data_name[i]]);
				// 	maxList.push(maxItem);
				// 	nagetiveItem = hasNegative(data[i][data_name[i]]);
				// 	nagetives[i] = nagetiveItem;
				// }
				// max = findMax(maxList);
				nagetive = hasNegative(data, order, data_name, len);

				temp = max + '';
				// set defult grid
				if (unitLength === undefined) {
					var len = temp.trim().split('.')[0].length;
					unitLength = Math.pow(10, len-1);
				}
				len = Math.ceil(max/unitLength)+1;
				lineSpace = 500 / len;
				lenNagetive = len;
				if (nagetive) {
					heightBoundary = heightBoundary * 2;
					lenNagetive = 2 * len;
				}
				setLine(context, "#e5e5e5", 68.5, heightBoundary, 68.5, 35.5);
				for (i = 0; i < lenNagetive + 1; i++) {
					setLine(context,"#e5e5e5", 60.5, lineSpace * i + 49.5, 750.5, lineSpace * i + 49.5);
					setFillText(context, "18px Arial,Helvetica,sans-serif", "#555", "right", unitLength*(len-i), 50, lineSpace * i + 55, 100);
				}
				
				
				return {
					unitLength: unitLength,
					lineSpace: lineSpace,
					boundary: unitLength*len
				};
			}

			function calculateRadian(data){
				var len = data.length,
					sum = 0,
					radians = [];
				for (var i = 0; i < len; i++) {
					if (data[i] < 0) {
						return false;
					}
					sum += data[i];
				}
				for (i = 0; i < len; i++) {
					radians[i] = data[i] / sum * 2 * Math.PI;
				}
				return radians;
			}

			function findMax(data, order, data_name, len) {
				var max = 0,
					i,
					j;
				console.log(data)
				for (i = 0; i < order; i++) {
					for (j = 0; j < len; j++) {
						console.log(data[i][data_name[i]][j])
						max = Math.max(max, Math.abs(data[i][data_name[i]][j]));
					}
				}
				console.log(max)
				return max;

			}

			function hasNegative(data, order, data_name, len)  {
				for (var i = 0; i < order; i++) {
					for (var j = 0; j < len; j++) {
						console.log('======'+data[i][data_name[i]][j] )
						if (data[i][data_name[i]][j] < 0) {
							console.log("yep")
							return true;
						}
					}
					
				}
				return false;
			}


			function calculateOffset(x1, y1, x2, y2, r) {
				var x0, y0, a, b;
				if (y1 > y2) {
					a = Math.abs(y1-y2) * r / Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
					b = Math.abs(r*r - a*a);
					x0 = x1 + b;
					y0 = y1 - a;
				} else if (y1 < y2){
					a = (x2-x1) * r / Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
					b = Math.abs(r*r - a*a);
					x0 = x1 + a;
					y0 = y1 + b;
				} else {
					x0 = x1 + r;
					y0 = y1;
				}
				
				return [x0, y0];
			}   
		})
	 	}
	 	
	});
 }(jQuery));
/** 
 * 填写数据表格处理函数
 * 可添加、删除整行，整列
 */
(function () {
	var table = $(".table-input"),
		col_num = 0;
		deleteList = $(".table-input .icon-remove-sign");

	// 整列删除
	table.on("click", "th .icon-remove-sign", function() {
		var that = $(this),
			tr = that.parents(".table-input").children("tbody").children("tr"),
			th = that.parents(".table-input").children("thead").children("tr").children("th"),
			len = tr.length,
			index = that.parent().index();
		if ( th.length > 2) {
			--col_num;
			that.parent().remove();
			for(var i = 0; i < len; i++) {
				$($(tr[i]).children("td")[index]).remove();
			} 
			// Can not allowed to delete, at least one
			if (th.length - 1 == 2) {
				th.children(".icon-remove-sign").addClass("icon-hidden");				
			}	
			if (col_num == 3) {
				$(".table input").removeClass("small");		
			} else if (col_num == 7) {
				$(".table input").removeClass("tiny").addClass("small");
			}	
		} 
	// 整列添加
	}).on("click", "th .icon-plus-sign", function() {
		var that = $(this),
			tr = that.parents(".table-input").children("tbody").children("tr"),
			th = that.parents(".table-input").children("thead").children("tr").children("th"),
			td = tr.children("td"),
			len = tr.length,
			className = 'class=';
		
		$("th .icon-hidden").removeClass("icon-hidden");
		if (col_num < 10) {
			if (col_num >= 3 && col_num < 7) {
				className += "small";
				$(".table input").addClass("small");
			} else if (col_num >= 7) {
				className += "tiny";
				$(".table input").removeClass("small").addClass("tiny");
			} else if (col_num < 3) {
				$(".table input").re
			}
			that.parent().after('<th><input type="text" '+ className +'><i class="icon-plus-sign"></i><i class="icon-remove-sign"></i></th>');
			for (var i = 0; i < len; i++) {
				$(tr[i]).append('<td><input type="text" '+ className +'></td>');
			}				
			col_num ++;
		}
		

	// 整行删除
	}).on("click", "td .icon-remove-sign", function() {
		var that = $(this),
			tr = that.parents(".table-input").children("tbody").children("tr"),
			len = tr.length;
		if (len > 1) {
			that.parents("tr").remove();
			// Can not allowed to delete, at least one
			if (len-1 == 1) {
				tr.children(".name").children(".icon-remove-sign").addClass("icon-hidden");
			}
		} 
		
		
	// 整行添加
	}).on("click", "td .icon-plus-sign", function() {
		var that = $(this),
			tbody = that.parents("tbody"),
			th = that.parents(".table-input").children("thead").children("tr").children("th"),
			len = th.length,
			html = '<tr>',
			className = "class=";
		$("td .icon-hidden").removeClass("icon-hidden");
		if (col_num > 3 && col_num <= 7) {
			className += "small";
		} else if (col_num > 7 && col_num <= 10) {
			className += "tiny";
		} 
		for (var i = 0; i < len; i++) {
			
			if (i === 0){
				html += '<td class="name"><input type="text"'+ className + '><i class="icon-plus-sign"></i><i class="icon-remove-sign"></i></td>';
			} else {
				html += '<td><input type="text"'+ className +'></td>';

			}
		}
		
		tbody.append(html);
	})
}());


(function() {
	$('.dropdown-toggle').dropdown();

	var color1 = ["CE7688", "#75c0eb", "#aecfbd", "#f8b887", "#fce996"],
		color2 = ["rgba(87, 212, 144, 0.8)", "rgba(158, 197, 255, 0.8)", "rgba(255, 243, 112, 0.8)", "rgba(255, 175, 235, 0.8)", "rgba(247, 127, 14, 0.6)"],
		color3 = ["#a0d9ff", "#ffdca0", "#ffa4ad", "#af92ff", "#ff90f5"],
		button = $("header .dropdown-menu li a");
		clear = $("header .btn.clear");
	jQuery(document).ready(function () {
		button.chart();
	});
	clear.on('click', function() {
		$('#wrapper canvas').remove();
	});
}());





