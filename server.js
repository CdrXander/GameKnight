const express 	= require('express');
const session		= require('express-session');
const bodyParser 	= require('body-parser');
const cors 		= require('cors');
const massive		= require('massive');

const config 		= require('./config.js');
const port = 3000;


//Initialize, Export, and Configure the app	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=
const app = module.exports = express();
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


massive({
    host:config.db.host,
    port:5432,
    database:config.db.dbname,
    user:config.db.uname,
    password:config.db.pword
}).then(instance => {
    app.set('db', instance);

    //Node Controllers. Import AFTER initialization
    const gameNode 	= require('./node_controllers/gameNode.js');

    //Custom Middleware

    //ENDPOINTS =   =   =   =   =   =   =   =   =   =
    //Logistics
    app.get('/api/game/list/owned', gameNode.getOwnedGames);
    app.get('/api/game/list/unowned', gameNode.getUnownedGames);


    //Spin up the drives
    app.listen(port, function() {
        console.log("Started server on port", port);
    });

})

