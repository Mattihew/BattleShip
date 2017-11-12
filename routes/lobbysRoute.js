var express = require('express');
var router = express.Router();

var lobbys = [];

/* GET users listing. */
router.get('/', function (req, res, next)
{
    var username = req.session.username;
    if (typeof username === 'undefined')
    {
        res.redirect('/');
    }
    else
    {
        res.render('lobbys', {title: 'BattleShip', username: req.session.username, lobbys: lobbys});
    }
});

router.post('/', function(req, res, next)
{
    lobbys.push(
    {
       id: Math.random().toString(36).substr(2),
       name: "example Lobby",
       players: 1,
       maxPlayers: 2
    });
    res.sendStatus(201);
});

module.exports = router;
