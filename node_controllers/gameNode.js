/**
 * Created by Xander on 7/5/2017.
 */

const app         = require('./../server.js');

module.exports = {
    addGameToDatabase:addGameToDatabase,
    getAllOwnedGames:getAllOwnedGames,
    getOwnedGamesForUser:getOwnedGamesForUser,
    getUnownedGames:getUnownedGames,
    getGameByID:getGameByID,
    updateGame:updateGame,
    addGameToUserList:addGameToUserList,
    addGameToWantList:addGameToWantList
};

function addGameToDatabase(req,res) {
    const db = app.get('db');

    let newGame = {
        bgg_game_id:req.body.bgg_game_id,
        name:req.body.name,
        description:req.body.description,
        time_short:req.body.time_short,
        time_long:req.body.time_long,
        min_players:req.body.min_players,
        max_players:req.body.max_players,
        amazon_link:req.body.amazon_link,
        image_url:req.body.image_url,
        thumbnail_url:req.body.thumbnail_url,
        publish_year:req.body.publish_year,
    };

    db.game.insert(newGame).then(response => {
        db.game_catalog_link.insert({game_id:response.id, catalog_id:1}).then(response_two => {
            res.status(200).send(response);
        });
    })
}

function getAllOwnedGames(req,res) {
    const db = app.get('db');
    db.select_all_owned_games().then(response => {
        res.status(200).send(response);
    })
}

function getOwnedGamesForUser(req,res) {
    const db = app.get('db');
    db.select_all_owned_games_for_user(req.params.uid).then(response => {
        res.status(200).send(response);
    })
}

function getUnownedGames(req, res) {
    const db = app.get('db');
    req.params.uid = 7;
    getOwnedGamesForUser(req, res);
}

function getGameByID(req, res) {
    const db = app.get('db');
    db.game.find({id:req.params.gameid}).then(response => {
        res.status(200).send(response);
    })
}

function updateGame(req, res) {
    const db = app.get('db');
    db.game.update(req.body.game).then(response => {
        res.status(200).send(response);
    })
}

function addGameToUserList(req, res) {
    res.status(200).send("TO BE IMPLEMENTED");
}

function addGameToWantList(req, res) {
    res.status(200).send("TO BE IMPLEMENTED");
}
