var assert = require('assert');
var lobbyCache = require('../models/LobbyCache');
describe('Lobby', function()
{
    describe('getTeam', function()
    {
        it('should return a team at the requested index', function()
        {
            var id = lobbyCache.put();
            var lobby = lobbyCache.get(id);
            assert.strictEqual(typeof lobby.getTeam(0).getShipAt === "function", true);
        });
    });
});