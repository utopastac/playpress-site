/*

SplitText plugin

*/

//reference outside of plugin - $('.classname').data('touchSlide').functionName(arguments);


(function( $ ) {
	
	var name = "splitText";

	function SplitTheText(element, settings){
		
		this.element = $(element);
		
		this.init();
		
	}
	
	SplitTheText.prototype = {
		
		init:function(args){
			
			var letters = this.element.html().split("");
			var str = "", add = "";
			for(var i = 0; i<letters.length; i++){
				add = "<span class = 'c" + (i+1) + "'>" + letters[i] + "</span>";
				str+=add;
			}
			this.element.html(str);
		}
		
	}
	
	
	/* plugin initialisation */
	$.fn.splitText = function(settings) {
		return this.each(function() {
      		var splitTheText = new SplitTheText(this, settings);
    	});

	};
	
})( jQuery );// JavaScript Document