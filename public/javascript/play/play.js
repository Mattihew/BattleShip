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
            var count = Number($(children.get(2)).text());
            for (var i = 0; i<count; i++)
            {
                var ship = new Ship($(children.get(0)).text(), Number($(children.get(1)).text()));
                play.ships.push(ship);
            }
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
        if(play.selectedShip)
        {
            var coord = new Coord(x, y);
            var oldPos = play.selectedShip.getPos();
            var oldDir = play.selectedShip.getDir();
            var oldCoords = play.selectedShip.getCoords();
            if (coord.equals(play.selectedShip.getPos()))
            {
                play.selectedShip.offsetDir(1);
            }
            else
            {
                play.selectedShip.setPos(coord);
            }

            if (!play.conflicts(play.selectedShip.getCoords(), play.selectedShip))
            {
                oldCoords.forEach(function(coord)
                {
                    $('table.board tbody tr:nth-child('+ (coord.y+1) + ') td:nth-child(' + (coord.x+1) + ')').removeClass('ship');
                });
                play.selectedShip.getCoords().forEach(function(coord)
                {
                    $('table.board tbody tr:nth-child('+ (coord.y+1) + ') td:nth-child(' + (coord.x+1) + ')').addClass('ship');
                });
            }
            else
            {
                play.selectedShip.setPos(oldPos);
                play.selectedShip.setDir(oldDir);
            }
        }
    },
    conflicts: function(coords, except)
    {
        return play.ships.some(function(ship)
        {
            if (ship !== except)
            {
                return ship.getCoords().some(function (shipCoords)
                {
                    return coords.some(function (coord)
                    {
                        return coord.equals(shipCoords);
                    });
                });
            }
        });
    }
};
$(document).ready(function()
{
    play.init();
});