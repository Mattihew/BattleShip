var socket = require('socket.io');
var lobbyCache = require('../models/LobbyCache');
var io;

var allShipsFound = function(team)
{
    return team.ships.every(function(ship)
    {
        return Number(ship.size) === ship.hitLocations.length;
    });
};

module.exports = function(server, middleware)
{
    io = socket.listen(server);
    io.use(middleware);
    io.on('connection', function(socket)
    {
        var lobby;
        var teamIndex;
        socket.on('join', function(data, callback)
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
                    socket.to(data).emit('joined', socket.request.session.username);
                    if (lobby.getTeamCount() > 1)
                    {
                        var otherTeam = lobby.getTeam(teamIndex ^ 1);
                        var hits = otherTeam.ships.map(function (ship) {
                            return ship.hitLocations;
                        });
                        var misses = otherTeam.missLocations;
                        callback({hits: hits, misses: misses});
                    }
                }
            }
        });
        socket.on('select', function(data, callback)
        {
            if (lobby.activeTeam === teamIndex)
            {
                var otherTeamIndex = teamIndex ^ 1;
                var otherTeam = lobby.getTeam(otherTeamIndex);
                var hitShip = otherTeam.getShipAt(data.x, data.y);
                var hit = (typeof hitShip !== 'undefined');
                callback(hit);
                if(hit)
                {
                    if (typeof hitShip.hitLocations === 'undefined')
                    {
                        hitShip.hitLocations = [];
                    }
                    hitShip.hitLocations.push({x: data.x, y: data.y});
                    if (allShipsFound(otherTeam))
                    {
                        socket.emit('end', true);
                        socket.to(lobby.id).emit('end', false);
                        return;
                    }
                }
                else
                {
                    if (typeof otherTeam.missLocations === 'undefined')
                    {
                        otherTeam.missLocations = [];
                    }
                    otherTeam.missLocations.push({x: data.x, y: data.y});
                }
                socket.emit('ready', false);
                socket.to(lobby.id).emit('ready', true);
                lobby.activeTeam = lobby.activeTeam ^ 1;
            }
        });
    });
    return io;
};