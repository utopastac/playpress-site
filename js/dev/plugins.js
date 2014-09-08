/* http://debuggable.com/posts/how-to-write-jquery-plugins:4f72ab2e-7310-4a74-817a-0a04cbdd56cb */


/*

SelectNav plugin
Creates a drop down select from a jquery object of 'a' items

*/

;(function( $ ) {

	function SelectNavigation(element, settings){
		this.element = $(element);
		this.current = -1;
		
		this.defaults = {
			selectSelector: '#selectNav'
		};

		
		this.options = $.extend(this.defaults, settings);
		
		this.selectBox = $(this.options.selectSelector);
		
		this.init();
	}
	
	SelectNavigation.prototype = {
		init:function(args){
			
			this.element.each(jQuery.proxy(this, "addItems"));
			this.selectBox.change(jQuery.proxy(this, "selectChanged"));
		},
		
		addItems: function(index){
			var navUrl = this.element.eq(index).attr('href');
			var selectText = this.element.eq(index).html();
			var selectValue = "<option value = '" + navUrl + "'>" + selectText +"</option>"
			this.selectBox.append(selectValue);
		},
		
		selectChanged: function(event){
			var url = $(event.currentTarget).attr("value");
			this.element.trigger("selectClicked", {goToPage:url});
			//USEAGE $( element ).on("selectClicked", funciton);
			event.preventDefault();
			return false;
		}
	}
	
	$.fn.selectNav = function(settings) {
		return this.each(function() {
      		var tabs = new SelectNavigation(this, settings);
    	});

	};
	
})( jQuery );


/*

slideNav plugin

*/

;(function( $ ) {

	function SlideNav(element, options){
		this.element = $(element);
		this.slides = $(".screen", this.element);
		this.total = this.slides.length;
		
		
		
		/*this.defaults = {
			optionA: 'someOption',
			optionB: 'someOtherOption'
		};

		var meta  = this.element.data('widget-plugin-opts');
		this.opts = $.extend(this.defaults, options, meta);*/
		
		this.init();
	}
	
	SlideNav.prototype = {
		init:function(args){
			this.element.append("<div class = 'innerNav'><ul></ul></div>");
			this.slides.each(jQuery.proxy(this, "addLink"));
			this.links = $(".innerNav ul li", this.element);
			this.links.click(jQuery.proxy(this, "listItemClicked"));
			this.element.scroll(jQuery.proxy(this, "setNav"));
			this.setNav();
		},
	
		addLink: function(index){
			var title = this.slides.eq(index).attr("data-title");
			$(".innerNav ul", this.element).append("<li>" + title + "</li>");
		},
		
		listItemClicked: function(event){
			var target = Utils.getElementIndex($(event.currentTarget));
			this.element.trigger("listClicked", {ref:target});
			//USEAGE $( element ).on("listClicked", funciton);
		},
		
		setNav: function(){
			for(var i = 0; i<this.total; i++){
				if(Utils.inView(this.slides.eq(i))){
					this.updateInnerNav(i);
				}
			}
		},
	
		updateInnerNav: function(target){
			this.links.removeClass("current");
			this.links.mouseleave();
			this.links.eq(target).addClass("current");
			this.links.eq(target).mouseenter();
		}
	}
	
	$.fn.slideNav = function(options) {
		return this.each(function() {
      		var slideNav = new SlideNav(this, options);
    	});

	};
	
})( jQuery );


/*

Paralax background plugin

*/

;(function( $ ) {

	function Parallax(element, options){
		this.element = $(element);
		this.wrapper = options.wrapper;
		this.init();
	}
	
	Parallax.prototype = {
		init:function(args){
			this.wrapper.scroll(jQuery.proxy(this, "scrolled"));
			this.scrolled(null);
		},
		
		scrolled: function(event){
			var yoffset = (this.element.offset().top) * 0.1;
			var bpos =  "0px " +  yoffset + "px";
			this.element.css({ 'background-position': bpos });
		}
	}
	
	$.fn.parallax = function(options) {
		
		return this.each(function() {
      		var parallax = new Parallax(this, options);
    	});

	};
	
})( jQuery );

/*

Paralax fixed element plugin

*/

;(function( $ ) {

	function FixedParallax(element, options){
		this.element = $(element);
		this.wrapper = options.wrapper;
		this.container = options.container;
		this.init();
	}
	
	FixedParallax.prototype = {
		init:function(args){
			this.wrapper.scroll(jQuery.proxy(this, "scrolled"));
			this.scrolled(null);
		},
		
		scrolled: function(event){
			var xoffset = (this.container.offset().left) / 10;
			this.element.css({ "left": xoffset });
		}
	}
	
	$.fn.fixedParallax = function(options) {
		
		return this.each(function() {
      		var fixedParallax = new FixedParallax(this, options);
    	});

	};
	
})( jQuery );
