/**
 * Created by Xander on 7/5/2017.
 */

const app         = require('./../server.js');
const utilityNode = require('./utilityNode.js');

module.exports = {
    createGame:createGame,
    getOwnedGames:getOwnedGames,
    getUnownedGames:getUnownedGames
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

function getOwnedGames(req,res) {
    const db = app.get('db');
    db.game.find({owned:true}).then((err, response) => {
        utilityNode.handleReturn("gameNode.getOwnedGame",err,response,res);
    })
}

function getUnownedGames(req, res) {
    const db = app.get('db');
    db.game.find({owned:false}).then((err, response) => {
        utilityNode.handleReturn('gameNode.getUnownedGames',err,response,res);
    })
}

