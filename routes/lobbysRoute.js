var express = require('express');
var router = express.Router();

var lobbyCache = require('../models/LobbyCache');

/* GET lobbys listing. */
router.get('/', function (req, res)
{
    res.render('lobbys.ejs', {title: 'BattleShip', username: req.session.username, lobbys: lobbyCache.values()});
});

// noinspection JSUnresolvedFunction
router.post('/', function(req, res)
{
    // noinspection JSUnresolvedVariable
    var lobbyId = lobbyCache.put(
    {
        name: req.body.lobbyName || req.session.username + "s lobby",
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

router.delete('/:id', function(req, res)
{
    lobbyCache.remove(req.param('id'));
    res.sendStatus(204);
});

module.exports = router;
