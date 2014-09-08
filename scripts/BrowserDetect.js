/**
 * @fileoverview BrowserDetect automatically checks what the current browser is
 * 	Usage Examples:
 * 		None, is running automatically
 *
 * @dependencies none, self contained
 * @author Anders
 * @browsers: All (however only tested in: IE7+, FF3.6+, Chrome 11+, Safari 5+)
 **/

var BrowserDetect =
{
};

BrowserDetect.init = function()
{

    BrowserDetect.MOBILE = BrowserDetect.checkMobile();
    BrowserDetect.TABLET = BrowserDetect.checkTablet();

    BrowserDetect.BROWSER_NAME = this.searchString(this.dataBrowser) || "An unknown browser";

    BrowserDetect.BROWSER_VERSION = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    BrowserDetect.OS = this.searchString(this.dataOS) || "an unknown OS";

    if (BrowserDetect.BROWSER_NAME == "Firefox" && BrowserDetect.BROWSER_VERSION >= 10)
    {
        BrowserDetect.TRANSLATE3D_SUPPORT = true;
    }
    else if (BrowserDetect.BROWSER_NAME == "Explorer" && BrowserDetect.BROWSER_VERSION >= 10)
    {
        BrowserDetect.TRANSLATE3D_SUPPORT = true;
    }

};
BrowserDetect.searchString = function(data)
{
    for (var i = 0; i < data.length; i++)
    {
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        BrowserDetect.BROWSER_VERSIONSearchString = data[i].versionSearch || data[i].identity;
        if (dataString)
        {
            if (dataString.indexOf(data[i].subString) != -1)
                return data[i].identity;
        }
        else if (dataProp)
            return data[i].identity;
    }
};
BrowserDetect.searchVersion = function(dataString)
{
    var index = dataString.indexOf(BrowserDetect.BROWSER_VERSIONSearchString);
    if (index == -1)
        return;
    return parseFloat(dataString.substring(index + BrowserDetect.BROWSER_VERSIONSearchString.length + 1));
};

BrowserDetect.getOlderSafariVersion = function(version)
{
    if (version < 100)
    {
        return 1;
    }
    else if (version < 125.2)
    {
        return 1.1;
    }
    else if (version < 312.1)
    {
        return 1.2;
    }
    else if (version < 412)
    {
        return 1.3;
    }
    else if (version < 523.1)
    {
        return 2;
    }
    else if (version <= 523.12)
    {
        return 3;
    }
};

BrowserDetect.dataBrowser = [
{
    string: navigator.userAgent, subString: "Chrome", identity: "Chrome"
},
{
    string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"
},
{
    string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version"
},
{
    prop: window.opera, identity: "Opera"
},
{
    string: navigator.vendor, subString: "iCab", identity: "iCab"
},
{
    string: navigator.vendor, subString: "KDE", identity: "Konqueror"
},
{
    string: navigator.userAgent, subString: "Firefox", identity: "Firefox"
},
{
    string: navigator.vendor, subString: "Camino", identity: "Camino"
},
{
    // for newer Netscapes (6+)
    string: navigator.userAgent, subString: "Netscape", identity: "Netscape"
},
{
    string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE"
},
{
    string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"
},
{
    // for older Netscapes (4-)
    string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"
}];
BrowserDetect.dataOS = [
{
    string: navigator.platform, subString: "Win", identity: "Windows"
},
{
    string: navigator.platform, subString: "Mac", identity: "Mac"
},
{
    string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod"
},
{
    string: navigator.userAgent, subString: "iPad", identity: "iPad"
},
{
    string: navigator.userAgent, subString: "Android", identity: "Android"
},
{
    string: navigator.userAgent, subString: "Windows CE", identity: "Windows CE"
},
{
    string: navigator.userAgent, subString: "Palm", identity: "Palm"
},
{
    string: navigator.userAgent, subString: "Blackberry", identity: "Blackberry"
},
{
    string: navigator.platform, subString: "Linux", identity: "Linux"
}];

BrowserDetect.checkMobile = function()
{
    // kindle added as mobile phone instead
    var ismobile = (/iphone|ipod|kindle|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase()));

    if (ismobile == true)
    {
        BrowserDetect.TABLET = false;
    }

    if (ismobile === true)
    {
        return true;
    }
    else
    {
        return false;
    }
    /*
     var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'mini', 'windows ce'];

     for (i in agents) {
     if (BrowserDetect.OS.toLowerCase().indexOf(agents[i]) > -1) {

     return true;
     }
     }

     return false;*/
};
BrowserDetect.checkTablet = function()
{
    // Samsung Galaxy Tab: gt-p1000
    // http://mojosunite.com/tablet-user-agent-strings
    //alert("navigator.userAgent : " + navigator.userAgent)
    var istablet = (/ipad|sch-i800|playbook|xoom|tablet|gt-p1000|gt-p7510|sgh-t849|nexus 7|nexus 10|shw-m180s|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase()));
    // removed: a510|a511|
    // check android
    var isAndroid = (/android/i.test(navigator.userAgent.toLowerCase()));
    if (isAndroid === true || istablet === true)
    {
        var heightIs = screen.height;
        var widthIs = screen.width;
        if (heightIs > widthIs)
        {
            widthIs = screen.height;
            heightIs = screen.width;
        }

        if (heightIs >= 736 && widthIs >= 1024)
        {
            istablet = true;
        }
        else
        {
            BrowserDetect.MOBILE = true;
            istablet = false;
        }
    }

    if (istablet == true)
    {
        BrowserDetect.MOBILE = false;
    }

    if (istablet === true)
    {
        return true;
    }
    else
    {
        return false;
    }
    /*var agents = ['ipad'];

     for (i in agents) {
     if (BrowserDetect.OS.toLowerCase().indexOf(agents[i]) > -1) {

     return true;
     }
     }

     return false;*/
};

BrowserDetect.BROWSER_NAME = null;
BrowserDetect.BROWSER_VERSION = null;
BrowserDetect.OS = null;

BrowserDetect.MOBILE = false;
BrowserDetect.TABLET = false;

BrowserDetect.TRANSLATE3D_SUPPORT = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

BrowserDetect.init();
