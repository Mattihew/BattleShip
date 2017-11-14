var lobbys = {};

var generateID = function()
{
    return Math.random().toString(36).substr(2);
}

module.exports =
{
    get: function(id)
    {
        return lobbys[id];
    },
    put: function(lobby)
    {
        if (typeof lobby.id === 'undefined')
        {
            lobby.id = generateID();
        }
        lobbys[lobby.id] = lobby;
    }
};