var express = require('express');
var router = express.Router();

var usernames = {};

/* GET home page. */
router.get(['/', '/login'], function(req, res, next)
{
    if (typeof req.session.username !== 'undefined')
    {
        res.redirect('/lobbys');
        return;
    }
    res.render('index.ejs', {taken: false});
});

router.post(['/', '/login'], function(req, res, next)
{
    var username = req.body.username;
    if (!usernames.hasOwnProperty(username) || usernames[username] + 3600000 < Date.now())
    {
        usernames[username] = Date.now();
        req.session.username = username;
        res.redirect(req.session.originalUrl || '/lobbys');
        req.session.originalUrl = undefined;
    }
    else
    {
        res.render('index.ejs', {taken: true});
    }
});
module.exports = router;
