var lobbyCache = require('../models/LobbyCache');
var assert = require('assert');
describe('LobbyCache', function() {
    describe('#values()', function() {
        it('should return array of all lobbys in cache', function() {
            var lobby = {test: 'test'};
            lobbyCache.put(lobby);
            assert.equal(lobby, lobbyCache.values()[0]);
        });
    });
});
