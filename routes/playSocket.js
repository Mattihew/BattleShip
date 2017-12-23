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
        var teamIndex;
        socket.on('join', function(data)
        {
            lobby = lobbyCache.get(data);
            teamIndex = lobby.getPlayerTeamIndex(socket.request.session.username);
            if (teamIndex >= 0)
            {
                socket.emit('ready', teamIndex === 0);
                socket.join(data);
            }
        });
        socket.on('select', function(data, callback)
        {
            if(typeof lobby.getTeam(teamIndex ^ 1).getShipAt(data.x, data.y) !== 'undefined')
            {
                callback(true);
            }
            else
            {
                callback(false);
            }
            socket.emit('ready', false);
            socket.to(lobby.id).emit('ready', true);
        });
    });
    return io;
};