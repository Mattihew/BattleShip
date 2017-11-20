var express = require('express');
var router = express.Router();

var usernames = {};

/* GET home page. */
router.get('/', function(req, res, next)
{
    if (typeof req.session.username !== 'undefined')
    {
        res.redirect('/lobby');
    }
    res.render('index', { title: 'BattleShip', taken: false});
});

router.post('/', function(req, res, next)
{
    var username = req.body.username;
    if (!usernames.hasOwnProperty(username))
    {
        usernames[username] = true;
        req.session.username = username;
        res.redirect('lobbys');
    }
    else
    {
        res.render('index', {title: 'BattleShip', taken: true});
    }
});
module.exports = router;
