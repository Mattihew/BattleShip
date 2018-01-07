var assert = require('assert');
var lobbyCache = require('../models/LobbyCache');

var createLobby = function()
{
    var id = lobbyCache.put();
    return lobbyCache.get(id);
};
describe('Lobby', function()
{
    describe('#getTeam()', function()
    {
        it('should return a team at the requested index', function()
        {
            var lobby = createLobby();
            assert.strictEqual(typeof lobby.getTeam(0).getShipAt === 'function', true);
        });
    });
    describe('#getTeamCount()', function()
    {
        it('should return the current number of teams', function()
        {
            var lobby = createLobby();
            assert.strictEqual(lobby.getTeamCount(), 0);
            lobby.getTeam(0);
            assert.strictEqual(lobby.getTeamCount(), 1);
            lobby.getTeam(1);
            assert.strictEqual(lobby.getTeamCount(), 2);
        });
    });
    describe('#getPlayerTeam()', function()
    {
        it('should return a team that contains the requested username', function()
        {
            var lobby = createLobby();
            lobby.getTeam(0).players.push('playerName');
            assert.strictEqual(typeof lobby.getPlayerTeam('playerName').getShipAt === 'function', true);
        });
    });
});