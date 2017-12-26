const express = require( "express" );
const router = express.Router();
const debug = require( "debug" )( "ashipka:mergebase" );

router.route( "/" )
    .get( ( req, res ) => {
        debug( "GET /" );
        const ops = {
            "h1": "Соединяем базы из нескольких в одну",
            "title": "Соединяем базы",
            "description": "Соединяем базы",
            "form": {
                "description": "У нас есть несколько баз. Хотим слить их в одну, при этом избавится от дублей по доменам. Вставляем всё сюда. Каждый сайт из базы начинается или на http, или на https. Если нужно, сперва <a href='/utils/clearbase'>почистите базу от мусора</a>, а потом уже соединяйте. Этот скрипт ничего не фильтрует. Тупо удаляет дубли по доменам и перемешивает сайты. Всё.",
                "itemname": "Ссылочки из баз",
                "action": "/utils/mergebase"
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
            let domainsArray = body.match( pattern );
            let clear = [ ...new Set( domainsArray ) ];
            const shuffleArray = clear.sort( () => Math.random() - 0.5 );

            // debug(clear)
            const ops = {
                "h1": "Обрабатываем данные",
                "title": "Результат обработки",
                "description": "Результат обработки",
                "result": shuffleArray.join( "\n" ),
                "strings": shuffleArray.length
            };

            res.render( "utils/one-res", ops );
        }
    } );

module.exports = router;
