var express = require('express');
var router = express.Router();

var lobbyCache = require('../models/LobbyCache');

/* GET users listing. */
router.get('/', function (req, res, next)
{
    res.render('lobbys', {title: 'BattleShip', username: req.session.username, lobbys: lobbyCache.values()});
});

// noinspection JSUnresolvedFunction
router.post('/', function(req, res, next)
{
    // noinspection JSUnresolvedVariable
    lobbyCache.put(
    {
       name: req.body.lobbyName || req.session.username + "s lobby",
       players: 0,
       maxPlayers: req.body.lobbyMaxPlayers,
       board:
       {
           width: req.body.boardWidth,
           height: req.body.boardHeight
       }
    });
    res.redirect('/lobbys');
});

module.exports = router;
