var Page = (function() {

    var $container = $( '#container' ),
        $bookBlock = $( '#bb-bookblock' ),
        $items = $bookBlock.children(),
        itemsCount = $items.length,
        current = 0,
        bb = $( '#bb-bookblock' ).bookblock( {
            speed : 800,
            perspective : 2000,
            shadowSides	: 0.8,
            shadowFlip	: 0.4,
            onEndFlip : function(old, page, isLimit) {

                current = page;
                // update TOC current
                updateTOC();
                // updateNavigation
                updateNavigation( isLimit );
                // initialize jScrollPane on the content div for the new item
                setJSP( 'init' );
                // destroy jScrollPane on the content div for the old item
                setJSP( 'destroy', old );
                setHash();

            }
        } ),
        $navNext = $( '#bb-nav-next' ),
        $navPrev = $( '#bb-nav-prev' ).hide(),
        $menuItems = $container.find( 'ul.J_Menu > li' ),
        $tblcontents = $( '#tblcontents' ),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        supportTransitions = Modernizr.csstransitions;

    //控制箭头的显影
    var $contents = $('.J_Content');
    $contents.hover(function(){
        displayArrow(true);
    },function(){
        displayArrow(false);
    });
    $navNext.on('mouseover',function(){
        displayArrow(true);
    });
    $navPrev.on('mouseover',function(){
        displayArrow(true);
    });
    /**
     * 控制箭头的显影
     */
    function displayArrow(isShow){
        var zIndex = isShow && 500 || -1;
        $navNext.css('zIndex',zIndex);
        $navPrev.css('zIndex',zIndex);
    }

    function init() {

        // initialize jScrollPane on the content div of the first item
        setJSP( 'init' );
        initEvents();

        var hash = window.location.hash;
        jump(hash);
    }

    function initEvents() {

        // add navigation events
        $navNext.on( 'click', function() {
            bb.next();
            return false;
        } );

        $navPrev.on( 'click', function() {
            bb.prev();
            return false;
        } );

        // add swipe events
        $items.on( {
            'swipeleft'		: function( event ) {
                if( $container.data( 'opened' ) ) {
                    return false;
                }
                bb.next();
                return false;
            },
            'swiperight'	: function( event ) {
                if( $container.data( 'opened' ) ) {
                    return false;
                }
                bb.prev();
                return false;
            }
        } );

        // show table of contents
        $tblcontents.on( 'click', toggleTOC );
        $('#J_Keyboard').facebox();

        $(document).keydown(function(ev){
             if(ev.keyCode == 77){
                 $tblcontents.trigger('click');
             }
        });
        // click a menu item
        $menuItems.on( 'click', function() {

            var $el = $( this ),
                idx = $el.index();

            jump(idx);

            return false;

        } );

        // reinit jScrollPane on window resize
        $( window ).on( 'debouncedresize', function() {
            // reinitialise jScrollPane on the content div
            setJSP( 'reinit' );
        } );

    }

    function jump(index){
        //如果传入的是锚点
        if($.type(index) == 'string' && $menuItems.length > 0){
            if(index == '') return false;
            $menuItems.each(function(i,li){
                var href = $(li).children('a').attr('href');
                if(href == index){
                    index = i;
                }
            })
        }
        var jump = function() {
            bb.jump( index + 1 );
        };
        current !== index ? closeTOC( jump ) : closeTOC();
    }

    function setHash(){
        $menuItems.each(function(i,li){
            var href = $(li).children('a').attr('href');
            if(i == current){
                  window.location.hash = href;
            }
        })
    }

    function setJSP( action, idx ) {

        var idx = idx === undefined ? current : idx,
            $content = $items.eq( idx ).children( 'div.content' ),
            apiJSP = $content.data( 'jsp' );

        if( action === 'init' && apiJSP === undefined ) {
            $content.jScrollPane({verticalGutter : 0, hideFocus : true });
        }
        else if( action === 'reinit' && apiJSP !== undefined ) {
            apiJSP.reinitialise();
        }
        else if( action === 'destroy' && apiJSP !== undefined ) {
            apiJSP.destroy();
        }

    }

    function updateTOC() {
        $menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
    }

    function updateNavigation( isLastPage ) {

        if( current === 0 ) {
            $navNext.show();
            $navPrev.hide();
        }
        else if( isLastPage ) {
            $navNext.hide();
            $navPrev.show();
        }
        else {
            $navNext.show();
            $navPrev.show();
        }

    }

    function toggleTOC() {
        var opened = $container.data( 'opened' );
        opened ? closeTOC() : openTOC();
    }

    function openTOC() {
        $navNext.hide();
        $navPrev.hide();
        $container.addClass( 'slideRight' ).data( 'opened', true );
    }

    function closeTOC( callback ) {

        updateNavigation( current === itemsCount - 1 );
        $container.removeClass( 'slideRight' ).data( 'opened', false );
        if( callback ) {
            if( supportTransitions ) {
                $container.on( transEndEventName, function() {
                    $( this ).off( transEndEventName );
                    callback.call();
                } );
            }
            else {
                callback.call();
            }
        }

    }

    return { init : init };

})();