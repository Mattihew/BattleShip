var play =
{
    ships: [],
    selectedShip: null,
    init: function()
    {
        $('table.ship-list tbody tr').each(function(index, element)
        {
            var element = $(element);
            element.click(function()
            {
                var selected = $(this).hasClass('selected');
                $('table.ship-list tbody tr').removeClass('selected table-active');
                $(this).toggleClass('selected table-active', !selected);
                play.shipSelected(selected ? null : play.ships[index]);
            });
            var children = element.children();
            play.ships.push(
            {
                name: $(children.get(0)).text(),
                size: Number($(children.get(1)).text()),
                count: Number($(children.get(2)).text())
            });
        });
    },
    shipSelected: function(ship)
    {
        play.selectedShip = ship;
        $('table.board').toggleClass('active', Boolean(ship));
    }
};
$(document).ready(function()
{
    play.init();
});