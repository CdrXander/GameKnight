const app = require('./../server.js');

module.exports = {
    createVote:createVote
};


function createVote(req, res) {
    res.status(200).send("TO BE IMPLEMENTED");
}