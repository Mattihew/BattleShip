var lobbys = {};

var generateID = function()
{
    return Math.random().toString(36).substr(2);
};

var init = function(lobby)
{
    if (typeof lobby.id === 'undefined')
    {
        lobby.id = generateID();
    }
    lobby.players = 0;
    lobby.board.avalibleShips =
    [
        {name: 'Carrier', size: 5, count: 1},
        {name: 'Battleship', size: 4, count: 1},
        {name: 'Cruiser', size: 3, count: 1},
        {name: 'Submarine', size: 3, count: 1},
        {name: 'Destroyer', size: 2, count: 1}
    ];
};

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
    put: function(lobby)
    {
        init(lobby);
        lobbys[lobby.id] = lobby;
        return lobby.id;
    },
    remove: function(id)
    {
        delete lobbys[id];
    }
};