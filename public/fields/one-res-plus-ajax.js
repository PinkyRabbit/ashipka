( function() {
    function onresize() {
        if( $( window ).width() > 850 ) {
            let hei = $( window ).height() - $( "nav" ).outerHeight() - $( "#progress" ).outerHeight() - $( "#info" ).outerHeight();

            $( "#result" ).css( "height", `${hei}px` );
        }else{
            $( "#result" ).removeAttr( "style" );
        }
    }

    onresize();
    $( window ).on( "resize", onresize );
} )();
