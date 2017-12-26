const express = require( "express" );
const router = express.Router();
const debug = require( "debug" )( "ashipka:clearbase" );
const needle = require( "needle" );
const cheerio = require( "cheerio" );

router.route( "/" )
    .get( ( req, res ) => {
        debug( "GET /" );
        const ops = {
            "h1": "Фильтруем базу на доступность, дубли и языки",
            "title": "Фильтр по доступности",
            "description": "Фильтр по доступности",
            "form": {
                "description": "Три фазы. 1. Чистит дубли 2. Проверяет доступность 3. Проверяет язык 4. Повторная чистка дублей. Формат абсолютно любой, лишь бы ссылки были.",
                "itemname": "Ссылочки",
                "action": "/utils/clearbase"
            }
        };

        res.render( "utils/one-textarea-form", ops );
    } )
    .post( ( req, res, next ) => {
        debug( "DATA PICKED" );
        if( req.body.text.length < 10 || /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/mg.test( req.body.text ) === false ) {
            res.redirect( "back" );
        } else{
            const body = req.body.text.toLowerCase();
            const pattern = /https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z0-9-]+/mg;
            let homepagesArray = body.match( pattern );
            let domainsArray = homepagesArray.map( ( x ) => x = x.replace( /https?:\/\/(www\.)?/, "" ) );
            let clear = [ ...new Set( domainsArray ) ];
            // debug(clear)
            const ops = {
                "h1": "Обрабатываем данные",
                "title": "Результат обработки",
                "description": "Результат обработки",
                "result": clear.join( "\n" ),
                "scr": "/utils/clearbase.js"
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
                if( /\.(ru|su|by|ua|xn--p1ai)\.?/.test( domain ) ) {
                    res.send( domain );
                }else if( /\.(cn|tw|jp)\.?/.test( domain ) ) {
                    debug( "%s - китайский сайт", domain );
                    res.send( "bad" );
                }else{
                    let $ = cheerio.load( resp.body, { "normalizeWhitespace": true } );

                    $( "style" ).remove();
                    $( "script" ).remove();
                    let text = $( "body" ).text()
                        .replace( /(\n|\t)/g, " " )
                        .replace( /<\!--.*?-->/g, " " )
                        .replace( /\s{2,}/g, " " );

                    if( !text.length || text.length < 200 ) {
                        debug( "%s - пустой стайт / нет контента", domain );
                        res.send( "bad" );
                    }else{
                        const onePercent = text.length / 100;
                        const cleaLength = text.split( /[a-zA-Zа-яА-Я0-9-\s,\.\!\?\"\']/gim ).length;
                        const percent = Math.ceil( cleaLength / onePercent );

                        if( percent < 60 ) {
                            // debug('host = '+host+' | percent ('+text.length+'/'+cleaLength+')= '+percent)
                            debug( "%s - WARNING китайский сайт по словам", domain );
                            res.send( "bad" );
                        }else {
                            res.send( domain );
                        }
                    }
                }
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
