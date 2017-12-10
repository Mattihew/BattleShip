var assert = require('assert');
var lobbyCache = require('../models/LobbyCache');
describe('LobbyCache', function()
{
    describe('#values()', function()
    {
        it('should return array of all lobbys in cache', function()
        {
            var id = lobbyCache.put();
            assert.equal(id, lobbyCache.values()[0].id);
            lobbyCache.remove(id);
        });
    });
});
