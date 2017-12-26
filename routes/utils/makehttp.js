const express = require( "express" );
const router = express.Router();
const debug = require( "debug" )( "ashipka:makehttp" );
const needle = require( "needle" );
const cheerio = require( "cheerio" );

router.route( "/" )
    .get( ( req, res ) => {
        debug( "GET /" );
        const ops = {
            "h1": "Проставляем http и www по ссылкам",
            "title": "Проставляем http",
            "description": "Здесь делаются ссылки из набора букв",
            "form": {
                "description": "Так получается, что для обычных людей интернет - это просто интернет, а ссылки - просто наборы ничего не значащих букв. Поэтому, не редко, в руках оказывается не база, а мешанина, без проставленных http и www. Этот скрипт формирует правильные ссылки из набора бреда.",
                "itemname": "Ссылочки или что-то на них похожее",
                "action": "/utils/makehttp"
            }
        };

        res.render( "utils/one-textarea-form", ops );
    } )
    .post( ( req, res, next ) => {
        debug( "DATA PICKED" );
        if( req.body.text.length < 10 || /([a-z0-9-]+\.)+[a-z0-9-]+/mg.test( req.body.text ) === false ) {
            res.redirect( "back" );
        } else{
            const body = req.body.text.toLowerCase();
            const pattern = /(https?:\/\/)?(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/mg;
            let homepagesArray = body.match( pattern );
            let domainsArray = homepagesArray.map( ( x ) => x = x.replace( /(https?:\/\/)?(www\.)?/, "" ) );
            let clear = [ ...new Set( domainsArray ) ];
            // debug(clear)
            const ops = {
                "h1": "Обрабатываем данные",
                "title": "Результат обработки",
                "description": "Результат обработки",
                "result": clear.join( "\n" ),
                "scr": "/utils/makehttp.js"
            };

            res.render( "utils/one-res-plus-ajax", ops );
        }
    } );

router.post( "/check", ( req, res ) => {
    // debug(req.body.url)
    needle( "get", req.body.url )
        .then( ( resp ) => {
            if( resp.statusCode >= 400 ) {
                debug( "%s - статус больше 400", req.body.url );
                res.send( "bad" );
            }else{
                let domain = `http://${req.body.url}`;

                if( ( resp.statusCode > 200 ) && ( resp.headers.location.startsWith( "http" ) ) ) {
                    domain = /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/.exec( resp.headers.location )[ 0 ];
                }
                res.send( domain );
                // res.send(req.body.url + ' -> '+ resp.statusCode + ' -> '+resp.headers.location)
            }
            // debug(resp)
        } )
        .catch( ( err ) => {
            debug( "%s - ошибка запроса !", req.body.url );
            debug( err );
            res.send( "bad" );
        } );
} );

module.exports = router;
