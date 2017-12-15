var express = require('express');
var router = express.Router();

var lobbyCache = require('../models/LobbyCache');

router.get('/:lobbyId', function(req, res)
{
    var lobbyId = req.param('lobbyId');
    var lobby = lobbyCache.get(lobbyId);
    var team = lobby.getPlayerTeam(req.session.username);
    res.render('play.ejs',
    {
        username: req.session.username,
        board: lobby.board,
        team: team,
        getClassAt: function(x, y)
        {
            if (typeof team !== 'undefined')
            {
                var ship = team.getShipAt(x, y);
                if (typeof ship !== 'undefined')
                {
                    return 'ship';
                }
            }
        }
    });
});

router.post('/:lobbyId', function(req, res)
{
    var lobbyId = req.param('lobbyId');
    var lobby = lobbyCache.get(lobbyId);
    var team = lobby.getPlayerTeam(req.session.username);
    if (typeof team === 'undefined')
    {
        team = lobby.getTeam();
        team.players.push(req.session.username);
    }
    team.ships = req.body.ships;
    res.sendStatus(204)
});

module.exports = router;
