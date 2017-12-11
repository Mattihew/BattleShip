var socket = require('socket.io');
var io;

module.exports = function(server)
{
    io = socket.listen(server, {path: '/playSocket'});

    io.on('connection', function(socket)
    {
        console.log('connected');
        socket.on('message', function(data)
        {
            console.log(data);
        })
    });

    return io;
};