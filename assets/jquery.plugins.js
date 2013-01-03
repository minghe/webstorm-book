/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);


/*
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var az,Q=this,Y,ak,v,am,T,Z,y,q,aA,aF,av,i,I,h,j,aa,U,aq,X,t,A,ar,af,an,G,l,au,ay,x,aw,aI,f,L,aj=true,P=true,aH=false,k=false,ap=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aI=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0);function at(aR){var aM,aO,aN,aK,aJ,aQ,aP=false,aL=false;az=aR;if(Y===c){aJ=D.scrollTop();aQ=D.scrollLeft();D.css({overflow:"hidden",padding:0});ak=D.innerWidth()+f;v=D.innerHeight();D.width(ak);Y=b('<div class="jspPane" />').css("padding",aI).append(D.children());am=b('<div class="jspContainer" />').css({width:ak+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aP=az.stickToBottom&&K();aL=az.stickToRight&&B();aK=D.innerWidth()+f!=ak||D.outerHeight()!=v;if(aK){ak=D.innerWidth()+f;v=D.innerHeight();am.css({width:ak+"px",height:v+"px"})}if(!aK&&L==T&&Y.outerHeight()==Z){D.width(ak);return}L=T;Y.css("width","");D.width(ak);am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aR.contentWidth){T=aR.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/ak;q=Z/v;aA=q>1;aF=y>1;if(!(aF||aA)){D.removeClass("jspScrollable");Y.css({top:0,width:am.width()-f});n();E();R();w();ai()}else{D.addClass("jspScrollable");aM=az.maintainPosition&&(I||aa);if(aM){aO=aD();aN=aB()}aG();z();F();if(aM){N(aL?(T-ak):aO,false);M(aP?(Z-v):aN,false)}J();ag();ao();if(az.enableKeyboardNavigation){S()}if(az.clickOnTrack){p()}C();if(az.hijackInternalLinks){m()}}if(az.autoReinitialise&&!aw){aw=setInterval(function(){at(az)},az.autoReinitialiseDelay)}else{if(!az.autoReinitialise&&aw){clearInterval(aw)}}aJ&&D.scrollTop(0)&&M(aJ,false);aQ&&D.scrollLeft(0)&&N(aQ,false);D.trigger("jsp-initialised",[aF||aA])}function aG(){if(aA){am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=am.find(">.jspVerticalBar");aq=U.find(">.jspTrack");av=aq.find(">.jspDrag");if(az.showArrows){ar=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aE(0,-1)).bind("click.jsp",aC);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aE(0,1)).bind("click.jsp",aC);if(az.arrowScrollOnHover){ar.bind("mouseover.jsp",aE(0,-1,ar));af.bind("mouseover.jsp",aE(0,1,af))}al(aq,az.verticalArrowPositions,ar,af)}t=v;am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});av.hover(function(){av.addClass("jspHover")},function(){av.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);av.addClass("jspActive");var s=aJ.pageY-av.position().top;b("html").bind("mousemove.jsp",function(aK){V(aK.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});o()}}function o(){aq.height(t+"px");I=0;X=az.verticalGutter+aq.outerWidth();Y.width(ak-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aF){am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));an=am.find(">.jspHorizontalBar");G=an.find(">.jspTrack");h=G.find(">.jspDrag");if(az.showArrows){ay=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aE(-1,0)).bind("click.jsp",aC);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aE(1,0)).bind("click.jsp",aC);
    if(az.arrowScrollOnHover){ay.bind("mouseover.jsp",aE(-1,0,ay));x.bind("mouseover.jsp",aE(1,0,x))}al(G,az.horizontalArrowPositions,ay,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);h.addClass("jspActive");var s=aJ.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aK){W(aK.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});l=am.innerWidth();ah()}}function ah(){am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aF&&aA){var aJ=G.outerHeight(),s=aq.outerWidth();t-=aJ;b(an).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;ak-=aJ;G.parent().append(b('<div class="jspCorner" />').css("width",aJ+"px"));o();ah()}if(aF){Y.width((am.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aF){au=Math.ceil(1/y*l);if(au>az.horizontalDragMaxWidth){au=az.horizontalDragMaxWidth}else{if(au<az.horizontalDragMinWidth){au=az.horizontalDragMinWidth}}h.width(au+"px");j=l-au;ae(aa)}if(aA){A=Math.ceil(1/q*t);if(A>az.verticalDragMaxHeight){A=az.verticalDragMaxHeight}else{if(A<az.verticalDragMinHeight){A=az.verticalDragMinHeight}}av.height(A+"px");i=t-A;ad(I)}}function al(aK,aM,aJ,s){var aO="before",aL="after",aN;if(aM=="os"){aM=/Mac/.test(navigator.platform)?"after":"split"}if(aM==aO){aL=aM}else{if(aM==aL){aO=aM;aN=aJ;aJ=s;s=aN}}aK[aO](aJ)[aL](s)}function aE(aJ,s,aK){return function(){H(aJ,s,this,aK);this.blur();return false}}function H(aM,aL,aP,aO){aP=b(aP).addClass("jspActive");var aN,aK,aJ=true,s=function(){if(aM!==0){Q.scrollByX(aM*az.arrowButtonSpeed)}if(aL!==0){Q.scrollByY(aL*az.arrowButtonSpeed)}aK=setTimeout(s,aJ?az.initialDelay:az.arrowRepeatFreq);aJ=false};s();aN=aO?"mouseout.jsp":"mouseup.jsp";aO=aO||b("html");aO.bind(aN,function(){aP.removeClass("jspActive");aK&&clearTimeout(aK);aK=null;aO.unbind(aN)})}function p(){w();if(aA){aq.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageY-aP.top-I,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageY-aS.top-A/2,aQ=v*az.scrollPagePercent,aR=i*aQ/(Z-v);if(aN<0){if(I-aR>aT){Q.scrollByY(-aQ)}else{V(aT)}}else{if(aN>0){if(I+aR<aT){Q.scrollByY(aQ)}else{V(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}if(aF){G.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageX-aP.left-aa,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageX-aS.left-au/2,aQ=ak*az.scrollPagePercent,aR=j*aQ/(T-ak);if(aN<0){if(aa-aR>aT){Q.scrollByX(-aQ)}else{W(aT)}}else{if(aN>0){if(aa+aR<aT){Q.scrollByX(aQ)}else{W(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(aq){aq.unbind("mousedown.jsp")}}function ax(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(av){av.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aJ){if(!aA){return}if(s<0){s=0}else{if(s>i){s=i}}if(aJ===c){aJ=az.animateScroll}if(aJ){Q.animate(av,"top",s,ad)}else{av.css("top",s);ad(s)}}function ad(aJ){if(aJ===c){aJ=av.position().top}am.scrollTop(0);I=aJ;var aM=I===0,aK=I==i,aL=aJ/i,s=-aL*(Z-v);if(aj!=aM||aH!=aK){aj=aM;aH=aK;D.trigger("jsp-arrow-change",[aj,aH,P,k])}u(aM,aK);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aM,aK]).trigger("scroll")}function W(aJ,s){if(!aF){return}if(aJ<0){aJ=0}else{if(aJ>j){aJ=j}}if(s===c){s=az.animateScroll}if(s){Q.animate(h,"left",aJ,ae)
}else{h.css("left",aJ);ae(aJ)}}function ae(aJ){if(aJ===c){aJ=h.position().left}am.scrollTop(0);aa=aJ;var aM=aa===0,aL=aa==j,aK=aJ/j,s=-aK*(T-ak);if(P!=aM||k!=aL){P=aM;k=aL;D.trigger("jsp-arrow-change",[aj,aH,P,k])}r(aM,aL);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aM,aL]).trigger("scroll")}function u(aJ,s){if(az.showArrows){ar[aJ?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aJ,s){if(az.showArrows){ay[aJ?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aJ){var aK=s/(Z-v);V(aK*i,aJ)}function N(aJ,s){var aK=aJ/(T-ak);W(aK*j,s)}function ab(aW,aR,aK){var aO,aL,aM,s=0,aV=0,aJ,aQ,aP,aT,aS,aU;try{aO=b(aW)}catch(aN){return}aL=aO.outerHeight();aM=aO.outerWidth();am.scrollTop(0);am.scrollLeft(0);while(!aO.is(".jspPane")){s+=aO.position().top;aV+=aO.position().left;aO=aO.offsetParent();if(/^body|html$/i.test(aO[0].nodeName)){return}}aJ=aB();aP=aJ+v;if(s<aJ||aR){aS=s-az.verticalGutter}else{if(s+aL>aP){aS=s-v+aL+az.verticalGutter}}if(aS){M(aS,aK)}aQ=aD();aT=aQ+ak;if(aV<aQ||aR){aU=aV-az.horizontalGutter}else{if(aV+aM>aT){aU=aV-ak+aM+az.horizontalGutter}}if(aU){N(aU,aK)}}function aD(){return -Y.position().left}function aB(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aB()<10)}function B(){var s=T-ak;return(s>20)&&(s-aD()<10)}function ag(){am.unbind(ac).bind(ac,function(aM,aN,aL,aJ){var aK=aa,s=I;Q.scrollBy(aL*az.mouseWheelSpeed,-aJ*az.mouseWheelSpeed,false);return aK==aa&&s==I})}function n(){am.unbind(ac)}function aC(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aJ,aL=[];aF&&aL.push(an[0]);aA&&aL.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aO){if(aO.target!==this&&!(aL.length&&b(aO.target).closest(aL).length)){return}var aN=aa,aM=I;switch(aO.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aO.keyCode;aK();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aJ=aO.keyCode==s&&aN!=aa||aM!=I;return !aJ}).bind("keypress.jsp",function(aM){if(aM.keyCode==s){aK()}return !aJ});if(az.hideFocus){D.css("outline","none");if("hideFocus" in am[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in am[0]){D.attr("hideFocus",false)}}function aK(){var aN=aa,aM=I;switch(s){case 40:Q.scrollByY(az.keyboardSpeed,false);break;case 38:Q.scrollByY(-az.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*az.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*az.scrollPagePercent,false);break;case 39:Q.scrollByX(az.keyboardSpeed,false);break;case 37:Q.scrollByX(-az.keyboardSpeed,false);break}aJ=aN!=aa||aM!=I;return aJ}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aL,aJ,aK=escape(location.hash);try{aL=b(aK)}catch(s){return}if(aL.length&&Y.find(aK)){if(am.scrollTop()===0){aJ=setInterval(function(){if(am.scrollTop()>0){ab(aK,true);b(document).scrollTop(am.position().top);clearInterval(aJ)}},50)}else{ab(aK,true);b(document).scrollTop(am.position().top)}}}}function ai(){b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")}function m(){ai();b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),aJ;if(s.length>1){aJ=s[1];if(aJ.length>0&&Y.find("#"+aJ).length>0){ab("#"+aJ,true);return false}}})}function ao(){var aK,aJ,aM,aL,aN,s=false;am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aO){var aP=aO.originalEvent.touches[0];aK=aD();aJ=aB();aM=aP.pageX;aL=aP.pageY;aN=false;s=true}).bind("touchmove.jsp",function(aR){if(!s){return}var aQ=aR.originalEvent.touches[0],aP=aa,aO=I;Q.scrollTo(aK+aM-aQ.pageX,aJ+aL-aQ.pageY);aN=aN||Math.abs(aM-aQ.pageX)>5||Math.abs(aL-aQ.pageY)>5;
    return aP==aa&&aO==I}).bind("touchend.jsp",function(aO){s=false}).bind("click.jsp-touchclick",function(aO){if(aN){aN=false;return false}})}function g(){var s=aB(),aJ=aD();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ap.append(Y.children()));ap.scrollTop(s);ap.scrollLeft(aJ)}b.extend(Q,{reinitialise:function(aJ){aJ=b.extend({},az,aJ);at(aJ)},scrollToElement:function(aK,aJ,s){ab(aK,aJ,s)},scrollTo:function(aK,s,aJ){N(aK,aJ);M(s,aJ)},scrollToX:function(aJ,s){N(aJ,s)},scrollToY:function(s,aJ){M(s,aJ)},scrollToPercentX:function(aJ,s){N(aJ*(T-ak),s)},scrollToPercentY:function(aJ,s){M(aJ*(Z-v),s)},scrollBy:function(aJ,s,aK){Q.scrollByX(aJ,aK);Q.scrollByY(s,aK)},scrollByX:function(s,aK){var aJ=aD()+Math[s<0?"floor":"ceil"](s),aL=aJ/(T-ak);W(aL*j,aK)},scrollByY:function(s,aK){var aJ=aB()+Math[s<0?"floor":"ceil"](s),aL=aJ/(Z-v);V(aL*i,aK)},positionDragX:function(s,aJ){W(s,aJ)},positionDragY:function(aJ,s){V(aJ,s)},animate:function(aJ,aM,s,aL){var aK={};aK[aM]=s;aJ.animate(aK,{duration:az.animateDuration,easing:az.animateEase,queue:false,step:aL})},getContentPositionX:function(){return aD()},getContentPositionY:function(){return aB()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aD()/(T-ak)},getPercentScrolledY:function(){return aB()/(Z-v)},getIsScrollableH:function(){return aF},getIsScrollableV:function(){return aA},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:function(){m()},destroy:function(){g()}});at(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}})(jQuery,this);

(function() {

    var event = jQuery.event,

    //helper that finds handlers by type and calls back a function, this is basically handle
    // events - the events object
    // types - an array of event types to look for
    // callback(type, handlerFunc, selector) - a callback
    // selector - an optional selector to filter with, if there, matches by selector
    //     if null, matches anything, otherwise, matches with no selector
        findHelper = function( events, types, callback, selector ) {
            var t, type, typeHandlers, all, h, handle,
                namespaces, namespace,
                match;
            for ( t = 0; t < types.length; t++ ) {
                type = types[t];
                all = type.indexOf(".") < 0;
                if (!all ) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
                }
                typeHandlers = (events[type] || []).slice(0);

                for ( h = 0; h < typeHandlers.length; h++ ) {
                    handle = typeHandlers[h];

                    match = (all || namespace.test(handle.namespace));

                    if(match){
                        if(selector){
                            if (handle.selector === selector  ) {
                                callback(type, handle.origHandler || handle.handler);
                            }
                        } else if (selector === null){
                            callback(type, handle.origHandler || handle.handler, handle.selector);
                        }
                        else if (!handle.selector ) {
                            callback(type, handle.origHandler || handle.handler);

                        }
                    }


                }
            }
        };

    /**
     * Finds event handlers of a given type on an element.
     * @param {HTMLElement} el
     * @param {Array} types an array of event names
     * @param {String} [selector] optional selector
     * @return {Array} an array of event handlers
     */
    event.find = function( el, types, selector ) {
        var events = ( $._data(el) || {} ).events,
            handlers = [],
            t, liver, live;

        if (!events ) {
            return handlers;
        }
        findHelper(events, types, function( type, handler ) {
            handlers.push(handler);
        }, selector);
        return handlers;
    };
    /**
     * Finds all events.  Group by selector.
     * @param {HTMLElement} el the element
     * @param {Array} types event types
     */
    event.findBySelector = function( el, types ) {
        var events = $._data(el).events,
            selectors = {},
        //adds a handler for a given selector and event
            add = function( selector, event, handler ) {
                var select = selectors[selector] || (selectors[selector] = {}),
                    events = select[event] || (select[event] = []);
                events.push(handler);
            };

        if (!events ) {
            return selectors;
        }
        //first check live:
        /*$.each(events.live || [], function( i, live ) {
         if ( $.inArray(live.origType, types) !== -1 ) {
         add(live.selector, live.origType, live.origHandler || live.handler);
         }
         });*/
        //then check straight binds
        findHelper(events, types, function( type, handler, selector ) {
            add(selector || "", type, handler);
        }, null);

        return selectors;
    };
    event.supportTouch = "ontouchend" in document;

    $.fn.respondsTo = function( events ) {
        if (!this.length ) {
            return false;
        } else {
            //add default ?
            return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
        }
    };
    $.fn.triggerHandled = function( event, data ) {
        event = (typeof event == "string" ? $.Event(event) : event);
        this.trigger(event, data);
        return event.handled;
    };
    /**
     * Only attaches one event handler for all types ...
     * @param {Array} types llist of types that will delegate here
     * @param {Object} startingEvent the first event to start listening to
     * @param {Object} onFirst a function to call
     */
    event.setupHelper = function( types, startingEvent, onFirst ) {
        if (!onFirst ) {
            onFirst = startingEvent;
            startingEvent = null;
        }
        var add = function( handleObj ) {

                var bySelector, selector = handleObj.selector || "";
                if ( selector ) {
                    bySelector = event.find(this, types, selector);
                    if (!bySelector.length ) {
                        $(this).delegate(selector, startingEvent, onFirst);
                    }
                }
                else {
                    //var bySelector = event.find(this, types, selector);
                    if (!event.find(this, types, selector).length ) {
                        event.add(this, startingEvent, onFirst, {
                            selector: selector,
                            delegate: this
                        });
                    }

                }

            },
            remove = function( handleObj ) {
                var bySelector, selector = handleObj.selector || "";
                if ( selector ) {
                    bySelector = event.find(this, types, selector);
                    if (!bySelector.length ) {
                        $(this).undelegate(selector, startingEvent, onFirst);
                    }
                }
                else {
                    if (!event.find(this, types, selector).length ) {
                        event.remove(this, startingEvent, onFirst, {
                            selector: selector,
                            delegate: this
                        });
                    }
                }
            };
        $.each(types, function() {
            event.special[this] = {
                add: add,
                remove: remove,
                setup: function() {},
                teardown: function() {}
            };
        });
    };
})(jQuery);
(function($){
    var isPhantom = /Phantom/.test(navigator.userAgent),
        supportTouch = !isPhantom && "ontouchend" in document,
        scrollEvent = "touchmove scroll",
    // Use touch events or map it to mouse events
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
        data = function(event){
            var d = event.originalEvent.touches ?
                event.originalEvent.touches[ 0 ] :
                event;
            return {
                time: (new Date).getTime(),
                coords: [ d.pageX, d.pageY ],
                origin: $( event.target )
            };
        };

    /**
     * @add jQuery.event.swipe
     */
    var swipe = $.event.swipe = {
        /**
         * @attribute delay
         * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
         *
         * A user must perform the swipe motion in this much time.
         */
        delay : 500,
        /**
         * @attribute max
         * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
         */
        max : 75,
        /**
         * @attribute min
         * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
         */
        min : 30
    };

    $.event.setupHelper( [

    /**
     * @hide
     * @attribute swipe
     */
        "swipe",
    /**
     * @hide
     * @attribute swipeleft
     */
        'swipeleft',
    /**
     * @hide
     * @attribute swiperight
     */
        'swiperight',
    /**
     * @hide
     * @attribute swipeup
     */
        'swipeup',
    /**
     * @hide
     * @attribute swipedown
     */
        'swipedown'], touchStartEvent, function(ev){
        var
        // update with data when the event was started
            start = data(ev),
            stop,
            delegate = ev.delegateTarget || ev.currentTarget,
            selector = ev.handleObj.selector,
            entered = this;

        function moveHandler(event){
            if ( !start ) {
                return;
            }
            // update stop with the data from the current event
            stop = data(event);

            // prevent scrolling
            if ( Math.abs( start.coords[0] - stop.coords[0] ) > 10 ) {
                event.preventDefault();
            }
        };

        // Attach to the touch move events
        $(document.documentElement).bind(touchMoveEvent, moveHandler)
            .one(touchStopEvent, function(event){
                $(this).unbind( touchMoveEvent, moveHandler);
                // if start and stop contain data figure out if we have a swipe event
                if ( start && stop ) {
                    // calculate the distance between start and stop data
                    var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
                        deltaY = Math.abs(start.coords[1] - stop.coords[1]),
                        distance = Math.sqrt(deltaX*deltaX+deltaY*deltaY);

                    // check if the delay and distance are matched
                    if ( stop.time - start.time < swipe.delay && distance >= swipe.min ) {
                        var events = ['swipe'];
                        // check if we moved horizontally
                        if( deltaX >= swipe.min && deltaY < swipe.min) {
                            // based on the x coordinate check if we moved left or right
                            events.push( start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight" );
                        } else
                        // check if we moved vertically
                        if(deltaY >= swipe.min && deltaX < swipe.min){
                            // based on the y coordinate check if we moved up or down
                            events.push( start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup" );
                        }

                        // trigger swipe events on this guy
                        $.each($.event.find(delegate, events, selector), function(){
                            this.call(entered, ev, {start : start, end: stop})
                        })

                    }
                }
                // reset start and stop
                start = stop = undefined;
            })
    });

})(jQuery)

/**
 * jquery.bookblock.js v1.0.2
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
;
(function($, window, undefined) {

    'use strict';

    /*
     * debouncedresize: special jQuery event that happens once after a window resize
     *
     * latest version and complete README available on Github:
     * https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
     *
     * Copyright 2011 @louis_remi
     * Licensed under the MIT license.
     */
    var $event = $.event,
        $special,
        resizeTimeout;

    $special = $event.special.debouncedresize = {
        setup: function() {
            $( this ).on( "resize", $special.handler );
        },
        teardown: function() {
            $( this ).off( "resize", $special.handler );
        },
        handler: function( event, execAsap ) {
            // Save the context
            var context = this,
                args = arguments,
                dispatch = function() {
                    // set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply( context, args );
                };

            if ( resizeTimeout ) {
                clearTimeout( resizeTimeout );
            }

            execAsap ?
                dispatch() :
                resizeTimeout = setTimeout( dispatch, $special.threshold );
        },
        threshold: 150
    };

    // global
    var $window = $(window),
        Modernizr = window.Modernizr;

    $.BookBlock = function(options, element) {

        this.$el = $(element);
        this._init(options);

    };

    // the options
    $.BookBlock.defaults = {
        // speed for the flip transition in ms
        speed : 1000,
        // easing for the flip transition
        easing : 'ease-in-out',
        // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
        shadows : true,
        // opacity value for the "shadow" on both sides (when the flipping page is over it)
        // value : 0.1 - 1
        shadowSides : 0.2,
        // opacity value for the "shadow" on the flipping page (while it is flipping)
        // value : 0.1 - 1
        shadowFlip : 0.1,
        // perspective value
        perspective : 1300,
        // if we should show the first item after reaching the end
        circular : false,
        // if we want to specify a selector that triggers the next() function. example: '#bb-nav-next'
        nextEl : '',
        // if we want to specify a selector that triggers the prev() function
        prevEl : '',
        // autoplay. If true it overwrites the circular option to true
        autoplay : false,
        // time (ms) between page switch, if autoplay is true
        interval : 3000,
        //if we want to navigate the slides with the keyboard arrows
        keyboard : true,
        // callback after the flip transition
        // old is the index of the previous item
        // page is the current item's index
        // isLimit is true if the current page is the last one (or the first one)
        onEndFlip : function(old, page, isLimit) {
            return false;
        },
        // callback before the flip transition
        // page is the current item's index
        onBeforeFlip : function(page) {
            return false;
        }
    };

    $.BookBlock.prototype = {

        _init: function(options) {

            // options
            this.options = $.extend(true, {}, $.BookBlock.defaults, options);
            // set the perspective
            this.$el.css('perspective', this.options.perspective);
            // items
            this.$items = this.$el.children('.bb-item');
            // total items
            this.itemsCount = this.$items.length;
            // current item's index
            this.current = 0;
            // previous item's index
            this.previous = -1;
            // show first item
            this.$current = this.$items.eq(this.current).show();
            // get width of this.$el
            // this will be necessary to create the flipping layout
            this.elWidth = this.$el.width();
            var transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            };
            this.transEndEventName = transEndEventNames[Modernizr.prefixed('transition')] + '.bookblock';
            // support (3dtransforms && transitions)
            this.support = Modernizr.csstransitions && Modernizr.csstransforms3d;
            // initialize/bind some events
            this._initEvents();
            // start slideshow
            if (this.options.autoplay) {

                this.options.circular = true;
                this._startSlideshow();

            }

        },
        _initEvents: function() {

            var self = this;

            if (this.options.nextEl !== '') {

                $(this.options.nextEl).on('click.bookblock', function() {

                    self._action('next');
                    return false;

                });

            }

            if (this.options.prevEl !== '') {

                $(this.options.prevEl).on('click.bookblock', function() {

                    self._action('prev');
                    return false;

                });

            }

            if (this.options.keyboard == true) {
                $(document).keydown(function(e) {
                    var keyCode = e.keyCode || e.which,
                        arrow = {
                            left : 37,
                            up : 38,
                            right : 39,
                            down : 40
                        };

                    switch (keyCode) {
                        case arrow.left:
                            self._action('prev');
                            break;
                        case arrow.right:
                            self._action('next');
                            break;
                    }
                });
            }

            $window.on( 'debouncedresize', function() {

                // update width value
                self.elWidth = self.$el.width();

            } )

        },
        _action : function(dir, page) {

            this._stopSlideshow();
            this._navigate(dir, page);

        },
        _navigate: function(dir, page) {

            if (this.isAnimating) {
                return false;
            }

            // callback trigger
            this.options.onBeforeFlip(this.current);

            this.isAnimating = true;
            this.$current = this.$items.eq(this.current);

            if (page !== undefined) {

                this.current = page;

            } else if (dir === 'next') {

                if (!this.options.circular && this.current === this.itemsCount - 1) {

                    this.end = true;

                } else {

                    this.previous = this.current;
                    this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;

                }

            } else if (dir === 'prev') {

                if (!this.options.circular && this.current === 0) {

                    this.end = true;

                } else {

                    this.previous = this.current;
                    this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;

                }

            }

            this.$nextItem = !this.options.circular && this.end ? this.$current : this.$items.eq(this.current);

            if (!this.support) {

                this._layoutNoSupport(dir);

            } else {

                this._layout(dir);

            }

        },
        // with no support we consider no 3d transforms and transitions
        _layoutNoSupport: function(dir) {

            this.$items.hide();
            this.$nextItem.show();
            this.end = false;
            this.isAnimating = false;
            var isLimit = dir === 'next' && this.current === this.itemsCount - 1 || dir === 'prev' && this.current === 0;
            // callback trigger
            this.options.onEndFlip(this.previous, this.current, isLimit);

        },
        // creates the necessary layout for the 3d animation, and triggers the transitions
        _layout: function(dir) {

            var self = this,

            // basic structure:
            // 1 element for the left side.
                $s_left = this._addSide('left', dir),
            // 1 element for the flipping/middle page
                $s_middle = this._addSide('middle', dir),
            // 1 element for the right side
                $s_right = this._addSide('right', dir),
            // overlays
                $o_left = $s_left.find('div.bb-overlay'),
                $o_middle_f = $s_middle.find('div.bb-flipoverlay:first'),
                $o_middle_b = $s_middle.find('div.bb-flipoverlay:last'),
                $o_right = $s_right.find('div.bb-overlay'),
                speed = this.end ? 400 : this.options.speed;

            this.$items.hide();
            this.$el.prepend($s_left, $s_middle, $s_right);

            $s_middle.css({
                transition: 'all ' + speed + 'ms ' + this.options.easing
            }).on(this.transEndEventName, function(event) {

                    if (event.target.className === 'bb-page') {

                        self.$el.children('div.bb-page').remove();
                        self.$nextItem.show();

                        self.end = false;
                        self.isAnimating = false;

                        var isLimit = dir === 'next' && self.current === self.itemsCount - 1 || dir === 'prev' && self.current === 0;

                        // callback trigger
                        self.options.onEndFlip(self.previous, self.current, isLimit);

                    }

                });

            if (dir === 'prev') {
                $s_middle.css({ transform: 'rotateY(-180deg)' });
            }

            // overlays
            if (this.options.shadows && !this.end) {

                var o_left_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms'
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear',
                        opacity: this.options.shadowSides
                    },
                    o_middle_f_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear'
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms',
                        opacity: this.options.shadowFlip
                    },
                    o_middle_b_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms',
                        opacity: this.options.shadowFlip
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear'
                    },
                    o_right_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear',
                        opacity: this.options.shadowSides
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms'
                    };

                $o_middle_f.css(o_middle_f_style);
                $o_middle_b.css(o_middle_b_style);
                $o_left.css(o_left_style);
                $o_right.css(o_right_style);

            }

            setTimeout(function() {

                var style = dir === 'next' ? 'rotateY(-180deg)' : 'rotateY(0deg)';

                if (self.end) {
                    // first && last pages lift up 15 deg when we can't go further
                    style = dir === 'next' ? 'rotateY(-15deg)' : 'rotateY(-165deg)';
                }

                $s_middle.css({transform: style});

                // overlays
                if (self.options.shadows && !self.end) {

                    $o_middle_f.css({
                        opacity: dir === 'next' ? self.options.shadowFlip : 0
                    });

                    $o_middle_b.css({
                        opacity: dir === 'next' ? 0 : self.options.shadowFlip
                    });

                    $o_left.css({
                        opacity: dir === 'next' ? self.options.shadowSides : 0
                    });

                    $o_right.css({
                        opacity: dir === 'next' ? 0 : self.options.shadowSides
                    });

                }


            }, 30);

        },
        // adds the necessary sides (bb-page) to the layout
        _addSide: function(side, dir) {

            var $side;

            switch (side) {

                case 'left':
                    /*
                     <div class="bb-page" style="z-index:2;">
                     <div class="bb-back">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of current page] : [content of next page]
                     </div>
                     </div>
                     <div class="bb-overlay"></div>
                     </div>
                     </div>
                     </div>
                     */
                    $side = $('<div class="bb-page"><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:' + this.elWidth + 'px"><div class="bb-inner">' + (dir === 'next' ? this.$current.html() : this.$nextItem.html()) + '</div></div><div class="bb-overlay"></div></div></div></div>').css('z-index', 102);
                    break;

                case 'middle':
                    /*
                     <div class="bb-page" style="z-index:3;">
                     <div class="bb-front">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of current page] : [content of next page]
                     </div>
                     </div>
                     <div class="bb-flipoverlay"></div>
                     </div>
                     </div>
                     <div class="bb-back">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of next page] : [content of current page]
                     </div>
                     </div>
                     <div class="bb-flipoverlay"></div>
                     </div>
                     </div>
                     </div>
                     */
                    $side = $('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content" style="left:' + (-this.elWidth / 2) + 'px;width:' + this.elWidth + 'px"><div class="bb-inner">' + (dir === 'next' ? this.$current.html() : this.$nextItem.html()) + '</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:' + this.elWidth + 'px"><div class="bb-inner">' + (dir === 'next' ? this.$nextItem.html() : this.$current.html()) + '</div></div><div class="bb-flipoverlay"></div></div></div></div>').css('z-index', 103);
                    break;

                case 'right':
                    /*
                     <div class="bb-page" style="z-index:1;">
                     <div class="bb-front">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of next page] : [content of current page]
                     </div>
                     </div>
                     <div class="bb-overlay"></div>
                     </div>
                     </div>
                     </div>
                     */
                    $side = $('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content" style="left:' + (-this.elWidth / 2) + 'px;width:' + this.elWidth + 'px"><div class="bb-inner">' + (dir === 'next' ? this.$nextItem.html() : this.$current.html()) + '</div></div><div class="bb-overlay"></div></div></div></div>').css('z-index', 101);
                    break;

            }

            return $side;

        },
        _startSlideshow: function() {

            var self = this;

            this.slideshow = setTimeout(function() {

                self._navigate('next');

                if (self.options.autoplay) {
                    self._startSlideshow();
                }

            }, this.options.interval);

        },
        _stopSlideshow: function() {

            if (this.options.autoplay) {

                clearTimeout(this.slideshow);
                this.options.autoplay = false;

            }

        },
        // public method: flips next
        next: function() {
            this._action('next');
        },
        // public method: flips back
        prev: function() {
            this._action('prev');
        },
        // public method: goes to a specific page
        jump: function(page) {

            page -= 1;

            if (page === this.current || page >= this.itemsCount || page < 0) {
                return false;
            }

            this._action(page > this.current ? 'next' : 'prev', page);

        },
        // public method: check if isAnimating is true
        isActive: function() {
            return this.isAnimating;
        },
        // public method: dynamically adds new elements
        // call this method after inserting new "bb-item" elements inside the BookBlock
        update : function () {

            var $currentItem = this.$items.eq( this.current );
            this.$items = this.$el.children('.bb-item');
            this.itemsCount = this.$items.length;
            this.current = $currentItem.index();

        }

    };

    var logError = function(message) {
        if (window.console) {
            window.console.error(message);
        }
    };

    $.fn.bookblock = function(options) {

        var instance = $.data(this, 'bookblock');

        if (typeof options === 'string') {

            var args = Array.prototype.slice.call(arguments, 1);

            this.each(function() {

                if (!instance) {

                    logError("cannot call methods on bookblock prior to initialization; " + "attempted to call method '" + options + "'");
                    return;

                }

                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {

                    logError("no such method '" + options + "' for bookblock instance");
                    return;

                }

                instance[options].apply(instance, args);

            });

        } else {

            this.each(function() {

                if (instance) {

                    instance._init();

                } else {

                    instance = $.data(this, 'bookblock', new $.BookBlock(options, this));

                }

            });

        }

        return instance;

    };

})(jQuery, window);
