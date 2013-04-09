/** 
 * 填写数据表格处理函数
 * 可添加、删除整行，整列
 */
(function () {
	var table = $(".table-input"),
		deleteList = $(".table-input .icon-remove-sign");

	// 整列删除
	table.on("click", "th .icon-remove-sign", function() {
		var that = $(this),
			tr = that.parents(".table-input").children("tbody").children("tr"),
			th = that.parents(".table-input").children("thead").children("tr").children("th"),
			len = tr.length,
			index = that.parent().index();
		if ( th.length > 2) {
			that.parent().remove();
			for(var i = 0; i < len; i++) {
				$($(tr[i]).children("td")[index]).remove();
			} 
			// Can not allowed to delete, at least one
			if (th.length - 1 == 2) {
				th.children(".icon-remove-sign").addClass("icon-hidden");				
			}		
		} 
	// 整列添加
	}).on("click", "th .icon-plus-sign", function() {
		var that = $(this),
			tr = that.parents(".table-input").children("tbody").children("tr"),
			th = that.parents(".table-input").children("thead").children("tr").children("th"),
			td = tr.children("td"),
			len = tr.length;
		$("th .icon-hidden").removeClass("icon-hidden");
		that.parent().after('<th><input type="text"><i class="icon-plus-sign"></i><i class="icon-remove-sign"></i></th>');
		for (var i = 0; i < len; i++) {
			$(tr[i]).append('<td><input type="text"></td>');
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
			html = '<tr>';
		$("td .icon-hidden").removeClass("icon-hidden");
		for (var i = 0; i < len; i++) {
			if (i === 0){
				html += '<td class="name"><input type="text"><i class="icon-plus-sign"></i><i class="icon-remove-sign"></i></td>';
			} else {
				html += '<td><input type="text"></td>';

			}
		}
		tbody.append(html);
	})
}());

/** 
 * 制图函数
 */

(function() {
	var color1 = ["CE7688", "#75c0eb", "#aecfbd", "#f8b887", "#fce996"],
		color2 = ["rgba(87, 212, 144, 0.8)", "rgba(158, 197, 255, 0.8)", "rgba(255, 175, 235, 0.8)", "rgba(203, 77, 36, 0.8)"],
		color3 = ["#a0d9ff", "#ffdca0", "#ffa4ad", "#af92ff", "#ff90f5"],

	submit = $("#submit");
	submit.on("click", function(e) {
		e.preventDefault();
		var chartData = {
			    type: [],
			    data: [],
			    value_name: [],
			    data_name: [],
			    group_count : 0,
			    data_count : 0
			},
			a = {};
		 	a["no"] = 0;
			a["color_schema"] = 1;
		chartData.type.push(a);
		a["no"] = 1;
		a["color_schema"] = 2;
		chartData.type.push(a);
		a["no"] = 2;
		a["color_schema"] = 3;
		chartData.type.push(a);
  

		var tr = $(".table-input tbody tr"),
			length = tr.length,
			col_name = tr.children('.name').children("input"),
			hor_name = $(".table-input thead th input"),
			value_len = hor_name.length,
			context;
		console.log(hor_name);
		console.log(value_len);

		chartData.group_count = length;
		chartData.data_count = value_len;

		for (var i = 0 ; i < length; i++) {
			var input = $(tr[i]).children("td").children("input"),
				value_len = input.length,
				items = [],
				radians = [],
				total = 0,
				b = {};
				
			for (var j = 1; j < value_len; j ++) {
				// Process the data
				items.push(parseFloat(input[j].value));
				total += items[j-1];
			
				if (i === 0) {
					chartData.value_name.push(hor_name[j].value);
				}
			}

			b[col_name[i].value] = items;
			chartData.data.push(b);
			chartData.data_name.push(col_name[i].value);

			for (var j = 0; j < value_len-1; j++) {
				radians[j] = calculateRadian(items[j], total);
			}

			$("#wrapper").append('<canvas id="myCanvas' + [i] +'" width="800" height="600"></canvas>');
			context = document.getElementById("myCanvas" + [i]).getContext("2d");
			pieChart(context, radians, color1, 400, 300, 250);

		} 
		
		$("#wrapper").append('<canvas id="myCanvas' + [i+1] +'" width="800" height="1100"></canvas>');
		context1 = document.getElementById("myCanvas" + [i+1]).getContext("2d");
		barChart(context1, chartData.data, chartData.value_name, chartData.data_name, chartData.group_count, color2);

		$("#wrapper").append('<canvas id="myCanvas' + [i+2] +'" width="800" height="1100"></canvas>');
		context2 = document.getElementById("myCanvas" + [i+2]).getContext("2d");
		lineChart(context2, chartData.data, chartData.value_name, chartData.data_name, chartData.group_count, color3);

		$("#wrapper").append('<canvas id="myCanvas' + [i+3] +'" width="800" height="1100"></canvas>');
		context3 = document.getElementById("myCanvas" + [i+3]).getContext("2d");
		barLineChart(context3, chartData.data, chartData.value_name, chartData.data_name, chartData.group_count, color2, color3);
	});
		
	function calculateRadian(value, total){
		return value / total * 2 * Math.PI;
	}

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

	function pieChart(context, radians, color, x, y, r) {
		var i = 0,
			len = radians.length,
			start = 0,
			end = radians[i];
		for (; i < len; ) {
			setFillArc(context, color[i], x, y, r, start, end);
			start = end ;
			end = start + radians[++i] ;
		}
	}

	function barChart(context, data, value_name, data_name, order, color) {	
		var len = value_name.length,
			interval = (680 - (len * order * 26))/(len+1),
			height = [],
			grid = setGrid(context, data, value_name, data_name, order);

		console.log(order+'++'+len+'++'+interval);

		for (var j = 0; j < order; j++) {	
			for (var i = 0; i < len; i++) {
				// arithmetic progression an = a1 + (n-1) * d
				height[i] = data[j][data_name[j]][i]/ grid.unitLength * grid.lineSpace;
				setBar(context, color[j], 60.5 + j * 28 + interval + i * (28 * order + interval) , 549.5, 26, -height[i]);	
				if (j === 0){
					setFillText(context, "16px Arial,Helvetica,sans-serif", "#555", "center", value_name[i], 60.5  + interval + i * (28 * order + interval) + order * 10 , 570 );
				}			
			}
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
					setFillText(context, "16px Arial,Helvetica,sans-serif", "#555", "center", value_name[i], 60.5  + interval + i * (28 * order + interval) + order * 10 , 570 );
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

			}
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
			i;

		for (i = 0; i < order; i++) {
			maxItem = findMax(data[i][data_name[i]]);
			maxList.push(maxItem);
			nagetiveItem = hasNegative(data[i][data_name[i]]);
			nagetives[i] = nagetiveItem;
		}
		console.log(nagetives)
		max = findMax(maxList);
		nagetive = hasNegative(nagetives);
		temp = max + '';
		// set defult grid
		if (unitLength === undefined) {
			var len = temp.trim().split('.')[0].length;
			unitLength = Math.pow(10, len-1);
		}
		len = Math.ceil(max/unitLength)+1;
		lineSpace = 500 / len;
		console.log(nagetive)
		lenNagetive = len;
		if (nagetive) {
			heightBoundary = heightBoundary * 2;
			lenNagetive = 2 * len + 1;
		} 
			setLine(context, "#e5e5e5", 68.5, heightBoundary, 68.5, 35.5);
			for (i = 0; i < lenNagetive; i++) {
				console.log(unitLength*(len-i));
				setLine(context,"#e5e5e5", 60.5, lineSpace * i + 49.5, 750.5, lineSpace * i + 49.5);
				setFillText(context, "16px Arial,Helvetica,sans-serif", "#555", "right", unitLength*(len-i), 50, lineSpace * i + 55, 100);
			}
		
		
		return {
			unitLength: unitLength,
			lineSpace: lineSpace,
			boundary: unitLength*len
		};
	}

	function findMax(nums) {
		var max = 0,
			len = nums.length;
		for (var i = 0; i < len; i++) {
			max = Math.max(max, Math.abs(nums[i]));
		}
		return max;
	}

	function hasNegative(nums) {
		var len = nums.length,
			i;
		for (i = 0; i < len; i++) {
			if (nums[i] < 0 || nums[i]) {
				return true;
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
}());





