/**
 * Created by Xander on 7/5/2017.
 */

var app         = require('./../server.js');
var utilityNode = require('./utilityNode.js');

module.exports = {
    createGame:createGame,
    getOwnedGames:getOwnedGames,
    getUnownedGames:getUnownedGames
};

function createGame(req,res) {
    console.log("NOT READY");
}

function getOwnedGames(req,res) {
    var db = app.get('db');

    db.game.find({owned:true}, function(err, response) {
        utilityNode.handleReturn("gameNode.getOwnedGame",err,response,res);
    })
}

function getUnownedGames(req, res) {
    console.log("NOT READY");
}

