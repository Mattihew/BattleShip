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
            if (typeof lobby !== 'undefined')
            {
                teamIndex = lobby.getPlayerTeamIndex(socket.request.session.username);
                lobby.activeTeam = lobby.activeTeam || teamIndex;
                if (teamIndex >= 0)
                {
                    var ready = teamIndex === lobby.activeTeam && lobby.getTeamCount() > 1;
                    socket.emit('ready', ready);
                    socket.join(data);
                    socket.to(data).emit('ready', !ready);
                }
            }
        });
        socket.on('select', function(data, callback)
        {
            if (lobby.activeTeam === teamIndex)
            {
                var otherTeamIndex = teamIndex ^ 1;
                callback(typeof lobby.getTeam(otherTeamIndex).getShipAt(data.x, data.y) !== 'undefined');
                socket.emit('ready', false);
                socket.to(lobby.id).emit('ready', true);
                lobby.activeTeam = lobby.activeTeam ^ 1;
            }
        });
    });
    return io;
};