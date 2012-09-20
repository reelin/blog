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
