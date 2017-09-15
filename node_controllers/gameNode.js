/**
 * Created by Xander on 7/5/2017.
 */

const app         = require('./../server.js');
const utilityNode = require('./utilityNode.js');

module.exports = {
    createGame:createGame,
    getAllOwnedGames:getAllOwnedGames,
    getOwnedGamesForUser:getOwnedGamesForUser,
    getUnownedGames:getUnownedGames,
    getGameByID:getGameByID,
    addGameToDatabase:addGameToDatabase,
    updateGame:updateGame
};

function createGame(req,res) {
    const db = app.get('db');

    let newGame = {
        bgg_game_id:req.body.bgg_game_id,
        title:req.body.title,
        description:req.body.description,
        time_short:req.body.time_short,
        time_long:req.body.time_long,
        min_players:req.body.min_players,
        max_players:req.body.max_players,
        owned:req.body.owned,
        amazon_link:req.body.amazon_link,
        image_url:req.body.image_url,
        publish_year:req.body.publish_year,
        genre_id:req.body.genre_id
    };

    db.game.save(newGame).then((err,game) => {
        utilityNode.handleReturn('gameNode.createGame',err,game,res);
    })
}

function getAllOwnedGames(req,res) {
    const db = app.get('db');
    db.select_all_owned_games().then((err, response) => {
        utilityNode.handleReturn("gameNode.getAllOwnedGames",err,response,res);
    })
}

function getOwnedGamesForUser(req,res) {
    const db = app.get('db');
    db.select_all_owned_games_for_user(req.params.uid).then((err,response) => {
        utilityNode.handleReturn("gameNode.getOwnedGamesForUser",err,response,res);
    })
}

function getUnownedGames(req, res) {
    const db = app.get('db');
    db.game.find({owned:false}).then((err, response) => {
        utilityNode.handleReturn('gameNode.getUnownedGames',err,response,res);
    })
}

function getGameByID(req, res) {
    const db = app.get('db');
    db.game.find({id:req.params.gameid}).then((err,response) => {
        utilityNode.handleReturn('gameNode.getGameByID',err,response,res);
    })
}

function addGameToDatabase(req,res) {
    const db = app.get('db');
    db.game.save(req.body.game).then((err,response) => {
        utilityNode.handleReturn('gameNode.addGameToDatabase',err,response,res);
    })
}

function updateGame(req, res) {
    const db = app.get('db');
    db.game.update(req.body.game).then((err,response) => {
        utilityNode.handleReturn('gameNode.updateGame',err,response,res);
    })
}
