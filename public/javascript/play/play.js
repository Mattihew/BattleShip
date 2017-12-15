var play =
{
    init: function()
    {
        const socket = io();
        socket.on('connect', function()
        {
            console.log(socket.id);
        })
    }
};
$(play.init);