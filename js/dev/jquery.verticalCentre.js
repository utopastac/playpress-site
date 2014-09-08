/*

Vertical Centre plugin
Centres an element within it's first immediate parent

*/

;(function( $) {
    
    var name = "data-vertical-centre";

	function VC(element, settings){
		this.element = $(element);

		this.defaults = {
			horizontal: false
		};

		var meta = this.element.data('vertical-centre');
		this.options = $.extend({}, this.defaults, settings, meta);

		this.init();
	}
	
	VC.prototype = {
		init:function(args){
			$.window.resize(jQuery.proxy(this, "centre"));
			this.element.imagesLoaded(jQuery.proxy(this, "centre"));
			this.centre();
		},
		
		centre: function(){
			Utils.verticalCentre(this.element, this.options.horizontal);
		}
	}
	
	$.fn.verticalCentre = function(settings) {
		return this.each(function() {
            if (!$.data(this, 'plugin_' + name)) {
                $.data(this, 'plugin_' + name);
      		    var vc = new VC(this);
            }
    	});

	};
	
})( jQuery, document, window);// JavaScript Document