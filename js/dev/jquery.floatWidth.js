
/*

Match Height plugin
Forces a matched height of selector elements within parent

*/

;(function( $ ) {

	function FloatWidths(element, settings){
		this.element = $(element);
		
		this.defaults = {
			masterPanel: ".textPanel",
			subPanel: ".imagePanel",

		};


		
		var meta = this.element.data('match-height-options');
		this.options = $.extend({}, this.defaults, settings, meta);
		
		this.init();
	}
	
	FloatWidths.prototype = {
		init:function(args){
			
			this.master = $(this.options.masterPanel);
			this.sub = $(this.options.subPanel);
			
			$.window.resize(jQuery.proxy(this, "correctWidths"));
			this.correctWidths();
		},
		
		correctWidths: function(event){
			var mainWidth = this.element.outerWidth();
			var masterWidth = this.master.outerWidth();
			var newWidth = mainWidth - masterWidth;
			if(newWidth > 0){
				this.sub.width(newWidth);
			} else {
				this.sub.width(mainWidth);
			}
		}
	}
	
	$.fn.floatWidth = function(settings) {
		return this.each(function() {
      		var floatWidths = new FloatWidths(this, settings);
    	});

	};
	
})( jQuery );// JavaScript Document