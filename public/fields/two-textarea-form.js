( function() {
    function onresize() {
        if( $( window ).width() > 850 ) {
            let hei = $( window ).height() - $( "nav" ).outerHeight() - $( "#bottom" ).outerHeight() - $( "#info" ).outerHeight() - 80;

            $( "#field1" ).css( "height", `${hei}px` );
            $( "#field2" ).css( "height", `${hei}px` );
        }else{
            $( "#field1" ).removeAttr( "style" );
            $( "#field2" ).removeAttr( "style" );
        }
    }

    onresize();
    $( window ).on( "resize", onresize );
} )();
