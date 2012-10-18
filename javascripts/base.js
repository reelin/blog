(function($) {
	var title = $(".post-title");
	title.bind("mouseover" , function() {
		var blog = $(this).parent();
		blog.addClass("focus");
	});
	title.bind("mouseout", function() {
		var blog = $(this).parent();
		blog.removeClass("focus");
	});
}(jQuery));