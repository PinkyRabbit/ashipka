const config = require( "../config" );
const https = require( "https" );
const express = require( "express" );
const router = express.Router();
const debug = require( "debug" )( "ashipka:Login" );
let passport = require( "passport" ),
    LocalStrategy = require( "passport-local" ).Strategy;

passport.serializeUser( ( user, callback ) => {
    callback( null, user );
} );

passport.deserializeUser( ( user, callback ) => {
    callback( null, user );
} );

passport.use(
    new LocalStrategy( ( username, password, callback ) => {
        const jsondb = require( "../users" );
        const { users } = jsondb;
        const filtred = users.filter( ( x ) => x.username === username );

        if ( filtred.length === 1 ) {
            const user = filtred[ 0 ];

            debug( user );
            if ( user.password !== password ) {
                debug( "Incorrect password." );
                return callback( null, false );
            }
            debug( "Мы вошли на сайт." );
            return callback( null, user );
        }
        debug( "Incorrect username." );
        return callback( null, false );
    } )
);

router
    .route( "/" )
    .get( ( req, res ) => {
        debug( "Login page" );
        const ops = {
            "h1": "Войти на сайт",
            "title": "Вход на сайт",
            "description":
        "Кому нех тут делать, тому нех тут делать. И не надо сюда тыкать, а то оторвёт пальцы!",
            "recapcha": true
        };

        res.render( "login", ops );
    } )
    .post( ( req, res, next ) => {
        const recaptchaResp = req.body[ "g-recaptcha-response" ];

        if ( recaptchaResp ) {
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${
                config.reCAPTCHA
            }&response=${recaptchaResp}&remoteip=${req.ip}`;

            https
                .get( verifyUrl, ( resp ) => {
                    let data = "";

                    resp.on( "data", ( chunk ) => {
                        data += chunk;
                    } );

                    resp.on( "end", () => {
                        const google = JSON.parse( data );

                        if ( !google.success ) {
                            debug( "Recaptcha разгадана не верно!" );
                            res.redirect( "back" );
                        } else {
                            debug( google );
                            next();
                        }
                    } );
                } )
                .on( "error", ( err ) => {
                    debug( "Recaptcha ошибка соединения с google!" );
                    res.redirect( "back" );
                } );
        } else {
            debug( "Recaptcha не введена!" );
            res.redirect( "back" );
        }
    } )
    .post(
        passport.authenticate( "local", {
            "successRedirect": "/spot",
            "failureRedirect": "/login"
        } )
    );

router.get( "/logout", ( req, res ) => {
    debug( "User Logged Out" );
    req.logout();
    res.redirect( "/" );
} );

module.exports = router;
