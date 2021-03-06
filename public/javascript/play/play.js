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
            socket.emit('join', window.location.pathname.split('/')[2], function(existingHits)
            {
                existingHits.hits.forEach(function(ship)
                {
                    if (Array.isArray(ship))
                    {
                        ship.forEach(function(hit)
                        {
                            var element = $($('table.board tr').get(hit.y)).children('td').get(hit.x);
                            $(element).addClass('hit');
                        });
                    }
                });
                if (Array.isArray(existingHits.misses))
                {
                    existingHits.misses.forEach(function(miss)
                    {
                        var element = $($('table.board tr').get(miss.y)).children('td').get(miss.x);
                        $(element).addClass('miss');
                    });
                }
            });
        });
        socket.on('joined', function(playerName)
        {
            console.log('player "' + playerName + '" has joined');
            alert('player "' + playerName + '" has joined');
        });
        socket.on('ready', function(isReady)
        {
            var board = $('table.board');
            board.toggleClass('active', isReady);
            board.toggleClass('disabled', !isReady);
        });
        socket.on('end', function(won)
        {
            if(won)
            {
                console.log('you won');
                alert('you won');
            }
            else
            {
                console.log('you lost');
                alert('you lost');
            }
        });
        $('table.board td').click(function()
        {
            var cell = $(this);
            var x = cell.data('x');
            var y = cell.data('y');
            if (cell.parents('table').hasClass('enemy-board'))
            {
                socket.emit('select', {x: x, y: y}, function(hit)
                {
                    if(hit)
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