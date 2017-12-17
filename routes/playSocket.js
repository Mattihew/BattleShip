var socket = require('socket.io');
var lobbyCache = require('../models/LobbyCache');
var io;

module.exports = function(server, middleware)
{
    io = socket.listen(server);
    io.use(middleware);
    io.on('connection', function(socket)
    {
        var lobby;
        socket.on('join', function(data)
        {
            socket.join(data);
            lobby = lobbyCache.get(data);
        })
    });
    return io;
};