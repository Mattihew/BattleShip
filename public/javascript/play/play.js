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
            socket.emit('join', window.location.pathname.split('/')[2]);
        });
        socket.on('ready', function(data)
        {
            var board = $('table.board');
            board.toggleClass('active', data);
            board.toggleClass('disabled', !data);
        });
        $('table.board td').click(function()
        {
            var cell = $(this);
            var x = cell.data('x');
            var y = cell.data('y');
            if (cell.parents('table').hasClass('enemy-board'))
            {
                socket.emit('select', {x: x, y: y}, function(data)
                {
                    if(data)
                    {
                        cell.addClass('hit');
                    }
                    else
                    {
                        cell.addClass('miss');
                    }
                });
            }
        });
    }
};
$(play.init);