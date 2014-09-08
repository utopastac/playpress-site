
/*

Match Height plugin
Forces a matched height of selector elements within parent

*/

;(function( $ ) {

	function MatchHeights(element, settings){
		this.element = $(element);
		
		this.defaults = {
			minHeight: 200,
			maxHeight: 10000,
			selector: ".col",
			matchFirstElement: false,
			match: ".matchThisElement",
			parentMatch: false
		};
		
		var meta = this.element.data('match-height');
		alert(meta);
		this.options = $.extend({}, this.defaults, settings, meta);
		
		this.init();
	}
	
	MatchHeights.prototype = {
		init:function(args){
			
			this.elements = $("> " + this.options.selector, this.element);
			this.total = this.elements.length;
			
			$.window.resize(jQuery.proxy(this, "correctHeights"));
			this.element.imagesLoaded(jQuery.proxy(this, "correctHeights"));
			this.correctHeights();
		},
		
		correctHeights: function(event){
			this.elements.css({height: "auto"});
			if($.mobile) return;
			this.newHeight = 0;
			for(var i = 0; i<this.total; i++){

				var _ht = this.elements.eq(i).outerHeight();

				if(this.elements.eq(i).hasClass(this.options.match)){
					this.newHeight = _ht;

					break;
				}
				//trace(_ht + " :: ")
				if(_ht > this.newHeight){
					this.newHeight = Math.max(_ht, this.options.minHeight);
					
				}
				if(this.options.matchFirstElement && i == 0) break;
				
			}
			if(this.options.parentMatch){
				this.element.css({"min-height": this.newHeight});
			} 
			this.elements.height(this.newHeight);
		}
	}
	
	$.fn.matchHeight = function(settings) {
		return this.each(function() {
      		var matchHeights = new MatchHeights(this, settings);
    	});

	};
	
})( jQuery );// JavaScript Document