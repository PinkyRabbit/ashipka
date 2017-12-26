( function() {
    setTimeout( () => {
        let urls = $( "#result" ).text().split( "\n" );

        $( "#result" ).text( "" );

        function Timer( parts ) {
            this.currentPart = 0;
            this.currentWidth = 0;
            this.maxParts = parts;
            this.onePart = parts / 100;
            this.good = [];
        }

        Timer.prototype.plusOne = function() {
            this.currentPart += 1;
            if( this.currentPart === this.maxParts ) {
                this.done();
                document.getElementById( "result" ).parentElement.style.display = "block";
                $( "#progress" ).hide( 1000 );
                $( "#info" ).html( `<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Г О Т О В О ( ${ this.good.length } строк ) ` );
            }else{
                while( this.currentWidth + 1 < this.currentPart / this.onePart ) {
                    this.currentWidth += 1;
                    document.getElementById( "bar" ).style.width = `${this.currentWidth}%`;
                }
            }
        };

        Timer.prototype.addGood = function( r ) {
            if( r !== "bad" ) {
                this.good.push( r );
            }
        };

        Timer.prototype.done = function() {
            let unique = this.good
                .filter( ( value, index, self ) => {
                    return self.indexOf( value ) === index;
                } );

            this.good.length = 0;
            this.good = unique;
            $( "#result" ).val( unique.join( "\n" ) );
        };

        let result = new Timer( urls.length );
        // - alert(urls.length)

        for( let i = 0;i < urls.length;i++ ) {
            $.ajax( {
                "type": "POST",
                "url": "/utils/makehttp/check",
                "data": { "url": urls[ i ] },
                "success": function( response ) {
                    result.addGood( response );
                    result.plusOne();
                },
                "error": function( err ) {
                    result.plusOne();
                }
            } );
        }
    }, 2000 );
} )();
