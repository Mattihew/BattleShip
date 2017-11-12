var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)
{
    res.render('index', { title: 'BattleShip', username: req.session.username});
});

router.post('/', function(req, res, next)
{
    req.session.username = req.body.username;
    res.redirect('lobbys');
});
module.exports = router;
