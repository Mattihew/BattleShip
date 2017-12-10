var express = require('express');
var router = express.Router();

var lobbyCache = require('../models/LobbyCache');

/* GET home page. */
router.get('/:lobbyId', function(req, res)
{
    var lobbyId = req.param('lobbyId');
    var lobby = lobbyCache.get(lobbyId);
    res.render('play.ejs', {username: req.session.username, board: lobby.board });
});

router.post('/:lobbyId', function(req, res)
{
    var lobbyId = req.param('lobbyId');
    var lobby = lobbyCache.get(lobbyId);
    lobby.ships = req.body.ships
});

module.exports = router;
