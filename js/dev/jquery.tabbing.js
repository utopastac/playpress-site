
/*

Tabs plugin
Creates tabbed content

*/

;(function( $ ) {

	function Tabs(element, settings){
		this.element = $(element);
		this.current = -1;
		
		this.defaults = {
			contentClass: '.tabItem',
			navigationSelector: "ul li"
		};

		var meta = this.element.data('tabbing');
		this.options = $.extend({}, this.defaults, settings, meta);
		
		this.contents = $(this.options.contentClass, this.element);
		this.nav = $(this.options.navigationSelector, this.element);
		
		this.init();
	}
	
	Tabs.prototype = {
		init:function(args){
			this.nav.on("tap", jQuery.proxy(this, "navClicked"));
			this.current = 0;
			this.updateNav();
		},
		
		navClicked: function(event){
			var target = Utils.getElementIndex($(event.currentTarget));
			this.change(target);
		},
		
		change: function(target){
			if(target == this.current) return;
			var item = this.contents.eq(this.current);
			this.current = target;
			TweenMax.to(item, 0.08, {autoAlpha:0, onComplete: jQuery.proxy(this, "updateNav")});
			
			//this.updateNav();
			
			//TweenMax.to(item, 0.3, {autoAlpha: 0, onComplete:jQuery.proxy(this, "updateNav")});
		},
		
		updateNav: function(target){
			var item = this.contents.eq(this.current);
			TweenMax.to(item, 0.3, {autoAlpha:1});
			//TweenMax.to(item, 0.3, {autoAlpha: 1});
			this.nav.removeClass("current");
			this.nav.eq(this.current).addClass("current");
			$.window.resize();
		}
	}
	
	$.fn.tabbing = function(settings) {
		return this.each(function() {
      		var tabs = new Tabs(this, settings);
    	});

	};
	
})( jQuery );