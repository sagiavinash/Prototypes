$(document).ready(function(){
	$.fn.extend({
	  reflow : function(){
	    var trigger = $("body").offset().top;
	    return this;
	  },
	  run: function(fn){
	  	fn();
	  	return this;
	  }
	});

	$(".btn-slide").on("click", function(){
		if($(".vending-text").data("play") == false) return;
		$(".vending-text").data("play", false);
		var $vendingList = $(".vending-text"),
			index = {}, $current, $next, state = {}, dir;
		dir = $(this).hasClass("slide-up") ? "-1" : "1";
		
		index.current = $vendingList.index($vendingList.filter(".active"));
		var _val = index.current + (+dir);
		index.next = ((0 <= _val) && (_val < $vendingList.length)) ? _val : ((_val < 0) ? ($vendingList.length - 1) : 0);
		
		state = {
			"-1" : { current : "hide-top", next : "hide-bottom" },
			"1" : { current : "hide-bottom", next : "hide-top" }
		};

		$current = $vendingList.eq(index.current);
		$next = $vendingList.eq(index.next);
		
		$current
			.addClass("animate " + state[dir].current)
			.removeClass("active")
			.run(function(){
				setTimeout(function(){
					$current.addClass("hide");
					$(".vending-text").data("play", true);
				}, 400);
			});
		$next
			.removeClass("animate " + state[dir].current)
			.addClass(state[dir].next)
			.reflow()
			.addClass("active animate")
			.removeClass("hide " + state[dir].next);
	});
});