var express = require('express');
var router = express.Router();

var lobbyCache = require('../models/LobbyCache');

/* GET home page. */
router.get('/:lobbyId', function(req, res, next)
{
    var lobbyId = req.param('lobbyId');
    var lobby = lobbyCache.get(lobbyId);
    res.render('play', { title: 'BattleShip', username: req.session.username, board: lobby.board });
});

module.exports = router;
