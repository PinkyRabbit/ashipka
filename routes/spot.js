const express = require( "express" );
const router = express.Router();
const debug = require( "debug" )( "ashipka:spot" );

router.get( "/", ( req, res ) => {
    debug( "GET /" );
    const ops = {
        "h1": "Вы вошли на сайт!",
        "title": "Внутри сайта",
        "description": "Внутри сайта"
    };

    res.render( "spot", ops );
} );

module.exports = router;
