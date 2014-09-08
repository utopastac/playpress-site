/*



MAIN APP HERE



*/

function App(args) {

    $.window = $(window);
    $.ww = $.window.width();
    $.wh = $.window.height();
    $.wrapper = $("#wrapper");
    $.mobile = Utils.checkMobile();
	$.tablet = Utils.checkTablet();
	if($.mobile || $.tablet){
		 $("body").removeClass("desktop");
	}
    
    $.useCssAnim = Modernizr.csstransforms3d;

    this.lastScroll = 0;
    this.fixedNav = false;
    this.nav = $('nav');
    
    this.init(args);

}

App.prototype = {

    init:function(args){
    
        this.getStarted();
    
    },

    getStarted: function(event) {

        this.resizeElements();
        $.window.resize(jQuery.proxy(this, "resizeElements"));

        

        $("a.internal").on("tap", jQuery.proxy(this, "scrollToPage"));
        
        if(!$.mobile){
            $("[data-fill]").fill();
            $("[data-vertical-centre]").verticalCentre();
            $("[data-match-height]").matchHeight();
            $("[data-float-width]").floatWidth();
            $("[data-fullscreen]").fullscreen();
            //$.window.scroll(jQuery.proxy(this, "windowScrolling"));
        }
        
        $(".splitText").splitText();
        
    },

    scrollToPage: function(event){
        var element = $(event.currentTarget);
        var targetElement = element.attr("href");
        var target = $(targetElement).offset().top;
        var difference = Math.abs(target - document.body.scrollTop) / 1000;
        var speed = 0.375;//Math.max(0.25, Math.min(difference * 2, 0.55));
        TweenMax.to($.window, speed, {scrollTo:{y:target}, ease:Power2.easeOut});

        var tracking = element.data("tracking");
        if(_gaq) _gaq.push(['_trackEvent', 'Internal', 'Scrolled', tracking]);

        event.preventDefault();
        return false;
    },

    windowScrolling: function(event) {
        var newScroll = $.window.scrollTop();
        this.lastScroll = newScroll;
        var dir = newScroll < this.lastScroll ? -1 : 1;

        if(dir == -1){

        } else {

        }
        /*if(this.animating) return;
        if ((newScroll < this.lastScroll) && (newScroll > 300)) {
            if(!this.fixedNav){
              this.nav.addClass('fixed'); 
              TweenMax.from(this.nav, 0.4, {y:-this.nav.height()});
            } 
            this.fixedNav = true;
            
        } else {
            if(this.fixedNav){
                TweenMax.to(this.nav, 0.4, {y:-this.nav.height()});  
            } else {
                this.nav.removeClass('fixed');
            }
            this.fixedNav = false;
        }

        this.lastScroll = newScroll;*/
    },

    showNav: function(){

    },

    hideNav: function(){

    },
    
    resizeElements: function(event) {
    
        $.ww = $.window.width();
        $.wh = $.window.height();        

        if($.ww < 500 && !$.mobile){
            $.mobile = true;
            this.resetMobile();
        } else if ($.mobile && $.ww > 500){
            $.mobile = false;
            this.resetMobile();
        }

        if($.mobile) return;

    },

    resetMobile: function(){

    }

}

/*



SILLY GLOBAL FUNCTIONS HERE



*/