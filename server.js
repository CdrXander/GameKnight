var express 	= require('express');
var session		= require('express-session');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var massive		= require('massive');

var config 		= require('./config.js');
var port = 3000;


//Initialize, Export, and Configure the app	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=
var app = module.exports = express();
app.use(bodyParser.json());
app.use(session(
    {
        saveUninitialized: true,
        resave: false, secret:
    config.session_secret,
        cookie: {secure: false, httpOnly: false}
    }));
app.use(express.static(__dirname +'/public'));

//Connect to Database
var conn = massive.connectSync({
    connectionString:config.db_connect_string
});

app.set('db',conn);
var db = app.get('db');

//Node Controllers. Import AFTER initialization
var gameNode 	= require('./node_controllers/gameNode.js');

//Custom Middleware

var authCheck = function(req,res,next) {
    if(!!req.session && !!req.session.currentUser) {
        next();
    } else {
        res.status(401).send("You must be logged in to use this resource");
    }
};

//END POINTS	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=
//Authentication

//Logistics

app.get('/api/game/list/owned', gameNode.getOwnedGames);


//Spin up the drives
app.listen(port, function() {
    console.log("Started server on port", port);
});