
/*

Fill Image To Container

*/

;(function( $ ) {

	var name = "fill";

	function FillImage(element, options){
		this.element = $(element);

		this.cancelled = false;

		this.element.data(name, this);

		this.container = this.element.parent();
		this.init();
	}
	
	FillImage.prototype = {
		init:function(args){
			this.element.imagesLoaded(jQuery.proxy(this, "fill"));
			this.restart();
		},
		
		fill: function(event){
			if(this.cancelled) return;
			Utils.maxscreenContainer(this.element, this.container, true);
		},

		cancel: function(){
			$.window.unbind('resize', jQuery.proxy(this, "fill"));
			this.element.css({width: '100%', height:'auto', "margin-left":0, "margin-top":0});
			this.cancelled = true;
		},

		restart: function(){
			this.cancelled = false;
			$.window.resize(jQuery.proxy(this, "fill"));
			this.fill();
		}
	}
	
	$.fn.fill = function(options) {
		
		return this.each(function() {
      		var fillImage = new FillImage(this, options);
    	});

	};
	
})( jQuery );// JavaScript Document