var play =
{
    init: function()
    {
        $('ul.nav-tabs li a').click(function(e)
        {
            e.preventDefault();
            var target = $(this);
            target.tab('show');
            $('table.board').toggleClass('enemy-board', target.text() === 'Enemy Board');
        });
        const socket = io();
        socket.on('connect', function()
        {
            console.log(socket.id);
        })
    }
};
$(play.init);