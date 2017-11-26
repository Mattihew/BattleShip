var assert = require('assert');
var lobbyCache = require('../models/LobbyCache');
describe('LobbyCache', function()
{
    describe('#values()', function()
    {
        it('should return array of all lobbys in cache', function()
        {
            var lobby = {test: 'test'};
            var id = lobbyCache.put(lobby);
            assert.equal(lobby, lobbyCache.values()[0]);
            lobbyCache.remove(id);
        });
    });
});
