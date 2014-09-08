
/*

Fill Image To Container

*/

;(function( $ ) {

	function ViewThisOnScroll(element, settings){
		this.element = $(element);

		this.defaults = {
			threshold: 500
		};
		
		this.options = $.extend(this.defaults, settings);

		this.inView = false;
		this.lastScroll = $.window.scrollTop();
		this.active = true;
		this.timeout = 0;
		this.init();
	}
	
	ViewThisOnScroll.prototype = {
		init:function(args){
			$.window.scroll(jQuery.proxy(this, "checkIfAddToScroll"));
		},

		checkIfAddToScroll: function(event){
			var currentScroll = $.window.scrollTop();
			if(currentScroll < this.options.threshold){
				this.active = true;
				this.removeFromView();
				return;
			}
			if(currentScroll < this.lastScroll){
				// scrolling up
				this.addToScroll();
			} else {
				// scrolling down
				this.removeFromView();
			}
			this.lastScroll = currentScroll;
		},
		
		addToScroll: function(event){
			if(this.inView || !this.active) return;
			this.inView = true;
			this.element.addClass("inView");
			this.deactivate();
		},

		removeFromView: function(){
			if(!this.inView || !this.active) return;
			this.inView = false;
			this.element.removeClass("inView");
			this.deactivate();
		},

		deactivate: function(){
			if(!this.active) return;
			this.active = false;
			clearTimeout(this.timeout);
			this.timeout = 0;
			this.timeout = setTimeout(jQuery.proxy(this, "activate"), 1200);
		},

		activate: function(){
			if(this.active) return;
			this.active = true;
		}
	}
	
	$.fn.viewOnScroll = function(settings) {
		return this.each(function() {
      		var viewThisOnScroll = new ViewThisOnScroll(this, settings);
    	});

	};
	
})( jQuery );// JavaScript Document