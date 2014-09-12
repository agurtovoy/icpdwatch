
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var exphbs = require('express3-handlebars');
var expressValidator = require('express-validator');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.engine('hjs', exphbs({
    extname: '.hjs',
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    helpers: {
        pageActive: function( x, y ) { return x == y ? 'active' : ''; }
    }
}));
app.set('view engine', 'hjs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.bodyParser());
app.use(expressValidator());
app.use(app.router);

var publicDir = path.join( __dirname, '..', 'public' );
// app.use( require('less-middleware')( publicDir ) );
app.use( express.static( publicDir ) );

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get( '/', routes.page.bind( app, 'index' ) );
app.get( '/ICPD-party-bust-2014-09-06', function( req, res ) { res.redirect( 'https://medium.com/@VoteNoNewJail/icpd-party-bust-7b2516208cde' ); } );
app.get( '/no-justice-no-peace', function( req, res ) { res.redirect( 'https://medium.com/@VoteNoNewJail/re-icpd-party-bust-d55d89530c00' ); } );

exports.app = app;
