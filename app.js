var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/indexRoute');
var lobbys = require('./routes/lobbysRoute');
var play = require('./routes/playRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessionMiddleware = session(
{
    secret: 'Matts Battleship',
    cookie:
        {
            httpOnly: false,
            maxAge: 3600000
        }
});
app.use(sessionMiddleware);
app.set('sessionMiddleware', sessionMiddleware);

app.use(function(req, res, next)
{
    if (typeof req.session.username === 'undefined' && typeof req.session.originalUrl === 'undefined')
    {
        req.session.originalUrl = req.url;
        res.redirect('/login');
        return;
    }
    res.locals.username = req.session.username;
    next();
});

app.use('/', index);
app.use('/lobbys', lobbys);
app.use('/play', play);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.username = req.session.username;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
