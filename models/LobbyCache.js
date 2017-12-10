var lobbys = {};

module.exports =
{
    values: function()
    {
        return Object.values(lobbys);
    },
    get: function(id)
    {
        return lobbys[id];
    },
    put: function(options)
    {
        var lobby = new Lobby(options);
        lobbys[lobby.id] = lobby;
        return lobby.id;
    },
    remove: function(id)
    {
        delete lobbys[id];
    }
};

function Lobby(options)
{
    options = options || {board: {}};
    var name = options.name;
    var maxPlayers = Number(options.maxPlayers);
    var players = 0;
    var private = Boolean(options.private);
    var teams = [];
    var board =
    {
        width: options.board.width || 10,
        height: options.board.height || 10,
        availableShips:
        [
            {name: 'Carrier', size: 5, count: 1},
            {name: 'Battleship', size: 4, count: 1},
            {name: 'Cruiser', size: 3, count: 1},
            {name: 'Submarine', size: 3, count: 1},
            {name: 'Destroyer', size: 2, count: 1}
        ]
    };
    var id = options.id;
    if (typeof id === 'undefined')
    {
        id = Math.random().toString(36).substr(2);
    }
    return {
        name: name,
        maxPlayers: maxPlayers,
        private: private,
        board: board,
        id: id,
        getPlayerCount: function()
        {
            return teams.length;
        },
        getTeam: function(teamIndex)
        {
            var index;
            if (typeof teamIndex === 'undefined')
            {
                index = teams.length;
            }
            else if (teamIndex > 2)
            {
                index = 2;
            }
            else
            {
                index = teamIndex;
            }

            if (teams.length > index)
            {
                return teams[index];
            }
            else
            {
                var team = {players: []};
                teams[index] = team;
                return team;
            }
        },
        getPlayerTeam: function(player)
        {
            return teams.find(function(team)
            {
                return team.players.includes(player);
            });
        }
    };
}