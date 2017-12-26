const express = require( "express" );
const router = express.Router();
const debug = require( "debug" )( "ashipka:doprobiv" );

router.route( "/" )
    .get( ( req, res ) => {
        debug( "GET /" );
        const ops = {
            "h1": "Отбираем хорошие сайты из Базы",
            "title": "Допробив",
            "description": "Допробив",
            "form": {
                "description": "Бывает такое что в прогоне пробило меньше чем должно. Или это почта или прокси или база или программа - не важно. В общем, нужно повторно пробить. Для того, чтобы отобрать не пробитые сайты, вставляем базу в первый столбец. Важно чтобы ссылки начинались в http или https. Во второй столбец вставляем отчёт",
                "col1": "База",
                "col2": "Отчёт",
                "action": "/utils/doprobiv"
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
            let domainsArray = field1.match( pattern );
            const base = [ ...new Set( domainsArray ) ];
            const field2 = req.body.field2.toLowerCase();

            pattern = /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/mg;
            const backlinks = field2.match( pattern ).map( ( x ) => x = x.replace( /https?:\/\/(www\.)?/, "" ) );
            const clear = base.filter( ( x ) => {
              return backlinks.includes( x.replace( /https?:\/\/(www\.)?/, "" ) ) === false;
            } );

            const ops = {
                "h1": "Выбираем сайты на допробив",
                "title": "Результат",
                "description": "Результат обработки",
                "result": clear.join( "\n" ),
                "strings": clear.length
            };

            res.render( "utils/one-res", ops );
        }
    } );

module.exports = router;
