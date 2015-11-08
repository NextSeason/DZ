( function() {
    function onorientationchange() {
        var orientation = window.orientation;
        if ( orientation === 180 || orientation === 0) { 
            $( '.portrait' ).show();
            $( '.landscape' ).hide();
        } else if ( orientation === 90 || orientation === -90 ){ 
            $( '.portrait' ).hide();
            $( '.landscape' ).show();
        }  
    }
    $( window ).on( "onorientationchange" in window ? "orientationchange" : "resize", onorientationchange ); 
    $().ready( onorientationchange );

    $( 'a.menubutton' ).on( 'click', function( e ) {
        e.preventDefault();
        $( 'ul.menu' ).css( 'right', 0 );
    } );

    $( 'ul.menu .hide' ).on( 'click', function( e ) {
        e.preventDefault();
        $( 'ul.menu' ).css( 'right', '-100px' );
    } );
} )();
