var socket = require('socket.io');
var lobbyCache = require('../models/LobbyCache');
var io;

var allShipsFound = function(team)
{
    return team.ships.every(function(ship)
    {
        if (!Array.isArray(ship.hitLocations))
        {
            return false;
        }
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
        socket.on('join', function(lobbyId, callback)
        {
            lobby = lobbyCache.get(lobbyId);
            if (typeof lobby !== 'undefined')
            {
                teamIndex = lobby.getPlayerTeamIndex(socket.request.session.username);
                lobby.activeTeam = lobby.activeTeam || teamIndex;
                if (teamIndex >= 0)
                {
                    var ready = teamIndex === lobby.activeTeam && lobby.getTeamCount() > 1;
                    socket.emit('ready', ready);
                    socket.join(lobbyId);
                    socket.to(lobbyId).emit('ready', !ready);
                    socket.to(lobbyId).emit('joined', socket.request.session.username);
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
        socket.on('select', function(point, callback)
        {
            if (lobby.activeTeam === teamIndex)
            {
                var otherTeamIndex = teamIndex ^ 1;
                var otherTeam = lobby.getTeam(otherTeamIndex);
                var hitShip = otherTeam.getShipAt(point.x, point.y);
                var hit = (typeof hitShip !== 'undefined');
                callback(hit);
                if(hit)
                {
                    if (!Array.isArray(hitShip.hitLocations))
                    {
                        hitShip.hitLocations = [];
                    }
                    hitShip.hitLocations.push({x: point.x, y: point.y});
                    if (allShipsFound(otherTeam))
                    {
                        socket.emit('end', true);
                        socket.to(lobby.id).emit('end', false);
                        lobbyCache.remove(lobby.id);
                        return;
                    }
                }
                else
                {
                    if (typeof otherTeam.missLocations === 'undefined')
                    {
                        otherTeam.missLocations = [];
                    }
                    otherTeam.missLocations.push({x: point.x, y: point.y});
                }
                socket.emit('ready', false);
                socket.to(lobby.id).emit('ready', true);
                lobby.activeTeam = lobby.activeTeam ^ 1;
            }
        });
    });
    return io;
};