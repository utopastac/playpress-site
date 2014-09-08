/*

Vertical Centre plugin
Centres an element within it's first immediate parent

//reference outside of plugin - $('.classname').data('touchSlide').functionName(arguments);

*/

;(function( $) {
    
    var name = "fullscreen";

	function Fullscreen(element, settings){
		this.element = $(element);
		this.cancelled = false;

		this.defaults = {
			offset: 0
		};

		var meta = this.element.data('fullscreen');
		this.options = $.extend({}, this.defaults, settings, meta);
		this.element.data(name, this);

		this.init();
	}
	
	Fullscreen.prototype = {
		init:function(args){
			this.restart();
		},
		
		setHeight: function(){
			if(this.cancelled) return;
			var ht = $.window.height() - this.options.offset;
			this.element.css({"min-height": ht, height: ht});
		},

		cancel: function(){
			$.window.unbind('resize', jQuery.proxy(this, "setHeight"));
			this.element.css({"min-height": '0', height: 'auto'});
			this.cancelled = true;
		},

		restart: function(){
			this.cancelled = false;
			$.window.resize(jQuery.proxy(this, "setHeight"));
			this.setHeight();
		}
	}
	
	$.fn.fullscreen = function(settings) {
		return this.each(function() {
            if (!$.data(this, 'plugin_' + name)) {
                $.data(this, 'plugin_' + name);
      		    var screenHeight = new Fullscreen(this);
            }
    	});

	};
	
})( jQuery, document, window);// JavaScript Document