let express = require( "express" );
let router = express.Router();

/* GET home page. */
router.get( "/", ( req, res, next ) => {
    const ops = {
        "h1": "Главная страница сайта",
        "title": "Сайт, для настоящих джедаев!",
        "description":
      "Нам нужно много инструментов, нам нужно много возможностей. Завтра мы будем ещё лучше!"
    };

    res.render( "index", ops );
} );

module.exports = router;
