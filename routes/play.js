var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next)
{
    var board =
    {
        width: req.query.w,
        height: req.query.h
    };
    res.render('play', { title: 'BattleShip', board: board });
});

module.exports = router;
