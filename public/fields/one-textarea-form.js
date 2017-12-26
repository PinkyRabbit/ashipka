( function() {
    function onresize() {
        if( $( window ).width() > 850 ) {
            let hei = $( window ).height() - $( "nav" ).outerHeight() - $( "#bottom" ).outerHeight() - $( "#info" ).outerHeight() - 60;

            $( "#text" ).css( "height", `${hei}px` );
        }else{
            $( "#text" ).removeAttr( "style" );
        }
    }

    onresize();
    $( window ).on( "resize", onresize );
} )();
