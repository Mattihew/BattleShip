var assert = require('assert');
var lobbyCache = require('../models/LobbyCache');
describe('LobbyCache', function()
{
    describe('#values()', function()
    {
        it('should return array of all lobbys in cache', function()
        {
            var id = lobbyCache.put();
            assert.equal(lobbyCache.values()[0].id, id);
            lobbyCache.remove(id);
        });
    });
    describe('#get()', function()
    {
        it('should return a lobby with a particular id', function()
        {
            var id = lobbyCache.put();
            assert.equal(lobbyCache.get(id).id, id);
            lobbyCache.remove(id);
        });
    });
    describe('#put()', function()
    {
        it('should put a lobby into the lobbyCache', function()
        {
            var id = lobbyCache.put({board: {}, name: 'testName'});
            assert.equal(lobbyCache.get(id).name, 'testName');
            lobbyCache.remove(id);
        });
    });
    describe('#remove()', function()
    {
        it('should remove lobby from the lobbyCache', function()
        {
            var id = lobbyCache.put();
            assert.equal(lobbyCache.get(id).id, id);
            lobbyCache.remove(id);
            assert.equal(lobbyCache.get(id), undefined);
        });
    });
});
