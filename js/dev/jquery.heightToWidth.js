
/*

HeightToWidth plugin
Forces a matched height of selector elements with it's own width

*/

;(function( $ ) {

	function MatchHeightToWidth(element){
		this.element = $(element);
		this.init();
	}
	
	MatchHeightToWidth.prototype = {
		init:function(args){
			$.window.resize(jQuery.proxy(this, "correctHeight"));
			this.correctHeight();
		},
		
		correctHeight: function(event){
			var newHeight = this.element.width();
			this.element.height(newHeight);
		}
	}
	
	$.fn.heightToWidth = function() {
		return this.each(function() {
      		var matchHeights = new MatchHeightToWidth(this);
    	});
	};
	
})( jQuery );
// JavaScript Document