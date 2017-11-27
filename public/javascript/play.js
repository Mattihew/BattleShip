var play =
{
    board: {},
    ships: [],
    selectedShip: null,
    init: function()
    {
        $('table.ship-list tbody tr').each(function(index, element)
        {
            var element = $(element);
            element.click(function()
            {
                var selected = !$(this).hasClass('selected');
                $('table.ship-list tbody tr').removeClass('selected table-active');
                $(this).toggleClass('selected table-active', selected);
                play.shipSelected(selected ? play.ships[index] : null);
            });
            var children = element.children();
            play.ships.push(
            {
                name: $(children.get(0)).text(),
                size: Number($(children.get(1)).text()),
                count: Number($(children.get(2)).text()),
                position:
                {
                    start: {},
                    dir: 0,
                    coords: []
                }
            });
        });
        play.board.height = $('table.board tbody tr').length;
        play.board.width = $('table.board tbody tr:first td').length;
        $('table.board tbody td').click(function()
        {
            var element = $(this);
            var x = element.data('x');
            var y = element.data('y');
            play.cellSelected(x, y, element);
        });
    },
    shipSelected: function(ship)
    {
        play.selectedShip = ship;
        $('table.board').toggleClass('active', Boolean(ship));
    },
    cellSelected: function(x, y, cell)
    {
        if(play.selectedShip) {
            var coords = [];
            var dir = play.selectedShip.position.dir;
            if (play.selectedShip.position.start.x === x && play.selectedShip.position.start.y === y)
            {
                dir = ++play.selectedShip.position.dir;
                if (play.selectedShip.position.dir > 3)
                {
                    dir = play.selectedShip.position.dir = 0;
                }
            }
            for (var i = 0; i < play.selectedShip.size; i++)
            {
                switch(dir)
                {
                    case 0:
                        coords.push({x: x, y: y - i});
                        break;
                    case 1:
                        coords.push({x: x + i, y: y});
                        break;
                    case 2:
                        coords.push({x: x, y: y + i});
                        break;
                    case 3:
                        coords.push({x: x - i, y: y});
                }
            }
            if (!play.conflicts(coords, play.selectedShip))
            {
                play.selectedShip.position.coords.forEach(function(coord)
                {
                    $('table.board tbody tr:nth-child('+ (coord.y+1) + ') td:nth-child(' + (coord.x+1) + ')').removeClass('ship');
                });
                play.selectedShip.position.coords = coords;
                play.selectedShip.position.start = {x:x, y:y};
                coords.forEach(function(coord)
                {
                    $('table.board tbody tr:nth-child('+ (coord.y+1) + ') td:nth-child(' + (coord.x+1) + ')').addClass('ship');
                });
            }
        }
    },
    conflicts: function(coords, except)
    {
        for (var i = 0; i < play.ships.length; i++)
        {
            for (var j = 0; j < play.ships[i].position.coords.length; j++)
            {
                if (play.ships[i] !== except)
                {
                    for (var k = 0; k < coords.length; k++)
                    {
                        if (coords[k].x === play.ships[i].position.coords[j].x &&
                            coords[k].y === play.ships[i].position.coords[j].y)
                        {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
};
$(document).ready(function()
{
    play.init();
});