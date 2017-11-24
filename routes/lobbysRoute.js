var express = require('express');
var router = express.Router();

var lobbyCache = require('../models/LobbyCache');

/* GET users listing. */
router.get('/', function (req, res, next)
{
    res.render('lobbys.ejs', {title: 'BattleShip', username: req.session.username, lobbys: lobbyCache.values()});
});

// noinspection JSUnresolvedFunction
router.post('/', function(req, res, next)
{
    // noinspection JSUnresolvedVariable
    var lobbyId = lobbyCache.put(
    {
        name: req.body.lobbyName || req.session.username + "s lobby",
        players: 0,
        maxPlayers: req.body.lobbyMaxPlayers,
        private: req.body.lobbyPrivate === "on",
        board:
        {
            width: req.body.boardWidth,
            height: req.body.boardHeight
        }
    });
    res.redirect('/play/' + lobbyId);
});

module.exports = router;
