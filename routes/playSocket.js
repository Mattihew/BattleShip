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
            lobby = lobbyCache.get(data);
            var index = lobby.getPlayerTeamIndex(socket.request.session.username);
            if (index >= 0)
            {
                socket.emit('ready', index === 0);
                socket.join(data);
            }
        })
    });
    return io;
};