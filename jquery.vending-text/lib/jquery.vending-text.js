;
(function($, window, document, undefined) {
    "use strict";

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

	function vendingText(element, options) {
        this.element = element;
        this.defaults = {};
        this.options = $.extend({}, this.defaults, options);
        this.init();
    }

    vendingText.prototype = {
    	init : function(){
    		var $elem = $(this.element);
    	},
    	slide : function($btn){
    		var $elem = $(this.element);
    		if($elem.data("play") == false) return;
			$elem.data("play", false);
			var $vendingList = $elem.find(".vending-list-item"),
				index = {}, $current, $next, state = {}, dir;
			dir = $elem.data("slide") == "up" ? "-1" : "1";
			
			index.current = $vendingList.index($vendingList.filter(".vending-active"));
			var _val = index.current + (+dir);
			index.next = ((0 <= _val) && (_val < $vendingList.length)) ? _val : ((_val < 0) ? ($vendingList.length - 1) : 0);
			
			state = {
				"-1" : { current : "vending-hide-top", next : "vending-hide-bottom" },
				"1" : { current : "vending-hide-bottom", next : "vending-hide-top" }
			};

			$current = $vendingList.eq(index.current);
			$next = $vendingList.eq(index.next);
			
			$current
				.addClass("vending-animate " + state[dir].current)
				.removeClass("vending-active")
				.run(function(){
					setTimeout(function(){
						$current.addClass("vending-hide");
						$elem.data("play", true);
					}, 400);
				});
			$next
				.removeClass("vending-animate " + state[dir].current)
				.addClass(state[dir].next)
				.reflow()
				.addClass("vending-active vending-animate")
				.removeClass("vending-hide " + state[dir].next);	
    	}
    }
    $.fn.vendingText = function(options) {
        return this.each(function() {
            $.data(this, "vendingText", new vendingText(this, options));
            if (!$.data(this, "vendingText")) {
                // preventing against multiple instantiations
                $.data(this, "vendingText", new vendingText(this, options));
            } else {
                var vendingTextObj = $.data(this, "vendingText");
                // checking if option is a valid function name
                if (typeof options === "string" && vendingTextObj[options]) {
                    vendingTextObj[options].call(vendingTextObj);
                } else if (typeof options === "object") {
                    // if the option is object extending it with initalized object
                    vendingTextObj.options = $.extend({}, vendingTextObj.options, options);
                }
            }
        });
    };
})(jQuery, window, document);