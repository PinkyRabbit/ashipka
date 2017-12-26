const config = require( "./config" );
const express = require( "express" );
const path = require( "path" );
const favicon = require( "serve-favicon" );
const logger = require( "morgan" );
const debug = require( "debug" )( "ashipka:ERROR" );
const session = require( "express-session" );
const cookieParser = require( "cookie-parser" );
const bodyParser = require( "body-parser" );
const passport = require( "passport" );

const index = require( "./routes/index" );
const login = require( "./routes/login" );
const spot = require( "./routes/spot" );
const utils_clearbase = require( "./routes/utils/clearbase" );
const utils_makehttp = require( "./routes/utils/makehttp" );
const utils_truelinks = require( "./routes/utils/truelinks" );
const utils_mergebase = require( "./routes/utils/mergebase" );
const utils_doprobiv = require( "./routes/utils/doprobiv" );

const app = express();

// view engine setup
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "pug" );

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger( "dev" ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    "limit": "50mb",
    "extended": true
} ) );
app.use( cookieParser() );
/*
app.use(bodyParser.json());
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
*/

app.use( express.static( path.join( __dirname, "public" ) ) );

app.use( require( "express-session" )( { "secret": config.secret, "resave": false, "saveUninitialized": false } ) );
app.use( passport.initialize() );
app.use( passport.session() );

app.get( "*", ( req, res, next ) => {
  if( req.isAuthenticated() ) {
      res.locals.imauth = true;
  } else {
      res.locals.imauth = false;
  }
  next();
} );

app.use( ["/spot", "/utils"], ( req, res, next ) => {
  if( req.isAuthenticated() ) {
    next();
  } else {
    const error = new Error('Вы не вошли на сайт!')
    error.status = 403
    return next(error)
  }
})

app.use( "/", index );
app.use( "/login", login );
app.use( "/spot", spot );
app.use( "/utils/clearbase", utils_clearbase );
app.use( "/utils/makehttp", utils_makehttp );
app.use( "/utils/truelinks", utils_truelinks );
app.use( "/utils/mergebase", utils_mergebase );
app.use( "/utils/doprobiv", utils_doprobiv );

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {

    let err = new Error( "Not Found" );

    err.status = 404;
    next( err );
} );

// error handler
app.use( ( err, req, res, next ) => {

    const ops = {
        "h1": "Какая-то ошибка!",
        "title": "Страница не доступна (ошибка)",
        "description": "По каким-то причинам данная страница не доступна. Если вы считаете что это нужно исправить - уточните почему"
    };

    res.status( err.status || 500 );

    if( req.app.get( "env" ) === "development" ) {
        debug( err.message );
        ops.message = err.message;
        ops.stack = err.stack;
        ops.status = err.status || 500;
        res.render( "error-adm", ops );
    }else{
        res.render( "error", ops );
    }
} );

module.exports = app;
