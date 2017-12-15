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
            var ship = new Ship($(children.get(0)).text(), Number($(children.get(1)).text()));
            ship.addObserver(function(event)
            {
                if(event.prop === 'pos')
                {
                    if(typeof event.old.x === 'undefined')
                    {
                        element.addClass('table-success');
                    }
                    else if(typeof event.new.x === 'undefined')
                    {
                        element.removeClass('table-success');
                    }
                    $('#btn-submit').prop('disabled', play.ships.some(function(ship)
                    {
                        return typeof ship.getPos().x === 'undefined';
                    }));
                }
            });
            play.ships.push(ship);

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
        $('#btn-submit').click(function(event)
        {
            var data =
            {
                ships: play.ships.map(function(ship)
                {
                    return ship.toJSON();
                })
            };

            $.post('', data, function(data, status)
            {
                location.reload();
            });
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

            if (!coord.equals(play.selectedShip.getPos()))
            {
                play.selectedShip.setPos(coord);
                if(play.conflicts(play.selectedShip.getCoords(), play.selectedShip))
                {
                    do
                    {
                        play.selectedShip.offsetDir(1);
                    } while (
                        play.conflicts(play.selectedShip.getCoords(), play.selectedShip)
                        && play.selectedShip.getDir() !== oldDir);
                }
            }
            else
            {
                do
                {
                    play.selectedShip.offsetDir(1);
                }while(
                    play.conflicts(play.selectedShip.getCoords(), play.selectedShip)
                    && play.selectedShip.getDir() !== oldDir);

            }

            if (!play.conflicts(play.selectedShip.getCoords(), play.selectedShip))
            {
                oldCoords.forEach(function(coord)
                {
                    play.getElement(coord).removeClass('ship shipStart').text('');
                });
                play.selectedShip.getCoords().forEach(function(coord)
                {
                    play.getElement(coord).addClass('ship');
                });
                play.getElement(play.selectedShip.getPos()).addClass('shipStart').text(play.selectedShip.name().substr(0,3));
            }
            else
            {
                play.selectedShip.setPos(oldPos);
                play.selectedShip.setDir(oldDir);
            }
        }
    },
    getElement: function(x, y)
    {
        var coord = new Coord(x, y);
        if (coord.insideRect(play.board.width, play.board.height))
        {
            return $('table.board tbody tr:nth-child('+ (coord.y+1) + ') td:nth-child(' + (coord.x+1) + ')');
        }
        return $(null);
    },
    conflicts: function(coords, except)
    {
        return coords.some(function (coord)
        {
            if (!coord.insideRect(play.board.width, play.board.height))
            {
                return true;
            }
            return play.ships.some(function(ship)
            {
                if (ship !== except)
                {
                    return ship.getCoords().some(function (shipCoords)
                    {
                        return coord.equals(shipCoords);
                    });
                }
            });
        });
    }
};
$(play.init);