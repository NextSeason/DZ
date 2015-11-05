( function() {
    /*
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
    */

    var PreloadImages = ( function() {
        var _pool = {},
            success = 1,
            fail = 0;
        
        _pool.length = 0;

        var removeFromList = function( needle, list ) {
            var i = 0,
                l = list.length;
            for( ; i < l; i += 1 ) {
                if( list[ i ] == needle ) {
                    list.splice( i, 1 );
                    i--; 
                    l--;
                }
            }
        };

        return {
            load : function( params ) {
                var i = 0,
                    l = params.list.length,
                    src,
                    pool = {
                        loaded : [],
                        loading : [],
                        error : [],
                        list : params.list,
                        time : 0
                    },
                    start = new Date,
                    callback = params.callback || function(){};
                
                for( ; i < l; i += 1 ) {
                    src = params.list[ i ];

                    if( _pool[ src ] === undefined ) {
                        _pool[ src ] = {
                            elem : new Image(),
                            status : 'loading'
                        };

                        $( _pool[ src ].elem ).on( 'load', function() {
                            _pool[ src ].state = 'loaded';
                            removeFromList( src, pool.loading );
                            pool.loaded.push( src );
                            pool.time = new Date - start;
                            callback( success, pool );
                        } );

                        $( _pool[ src ].elem ).on( 'error', function() {
                            _pool[ src ].state = 'error';
                            removeFromList( src, pool.loading );
                            pool.error.push( src );
                            callback( fail, pool );
                        } );

                        _pool[ src ].elem.src = src;
                        _pool[ src ].state = 'loading';
                        pool.loading.push( src )

                    } else if( _pool[ src ].state === 'loaded' ) {
                        pool.loaded.push( src );
                        pool.time = new Date - start;
                        callback( success, pool );
                    } else if( _pool[ src ].state === 'loading' ) {
                        pool.loading.push( src );
                        $( _pool[ src ].elem ).on( 'load', function() {
                            removeFromList( src, pool.loading );
                            pool.loaded.push( src );
                            pool.time = new Date - start;
                            callback( success, pool );
                        } );

                        $( _pool[ src ].elem ).on( 'error', function() {
                            removeFromList( src, pool.loading );
                            pool.error.push( src );
                            callback( fail, pool );
                        } );
                    }
                }
            }
        }
    } )();

    $( 'a.menubutton' ).on( 'click', function( e ) {
        e.preventDefault();
        $( 'ul.menu' ).css( 'right', 0 );
    } );

    $( 'ul.menu .hide' ).on( 'click', function( e ) {
        e.preventDefault();
        $( 'ul.menu' ).css( 'right', '-100px' );
    } );
} )();
