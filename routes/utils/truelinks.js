const express = require( "express" );
const router = express.Router();
const debug = require( "debug" )( "ashipka:truelinks" );

router.route( "/" )
    .get( ( req, res ) => {
        debug( "GET /" );
        const ops = {
            "h1": "Отбираем хорошие сайты из отчёта",
            "title": "Хороший отчёт",
            "description": "Хороший отчёт",
            "form": {
                "description": "Бывает такое что прогон пошёл по плохой базе. Для того, чтобы отобрать хорошие сайты, вставляем базу с хорошими сайтами в первый столбец. Важно чтобы ссылки в нём начинались в http или https. Во второй столбец вставляем отчёт",
                "col1": "База",
                "col2": "Отчёт",
                "action": "/utils/truelinks"
            }
        };

        res.render( "utils/two-textarea-form", ops );
    } )
    .post( ( req, res, next ) => {
        debug( "DATA PICKED" );
        if( req.body.field1.length < 10 || /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/mg.test( req.body.field1 ) === false || /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/mg.test( req.body.field2 ) === false ) {
            res.redirect( "back" );
        } else{
            const field1 = req.body.field1.toLowerCase();
            let pattern = /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/mg;
            let homepagesArray = field1.match( pattern );
            let domainsArray = homepagesArray.map( ( x ) => x = x.replace( /https?:\/\/(www\.)?/, "" ) );
            const base = [ ...new Set( domainsArray ) ];
            const field2 = req.body.field2.toLowerCase();

            pattern = /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+\/[-a-z0-9:%_\+.~#?&//=]+/mg;
            const backlinks = field2.match( pattern );
            const clear = backlinks.filter( ( x ) => {
                let domain = /https?:\/\/(www\.)?(([a-z0-9-]+\.)+[a-z0-9-]+)/.exec( x );

                return base.includes( domain[ 2 ] );
            } );

            const ops = {
                "h1": "Выбираем хорошие сайты",
                "title": "Результат",
                "description": "Результат обработки",
                "result": clear.join( "\n" ),
                "strings": clear.length
            };

            res.render( "utils/one-res", ops );
        }
    } );

module.exports = router;
