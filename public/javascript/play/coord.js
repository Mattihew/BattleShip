function Coord(x, y)
{
    var posX = x.x ? x.x : x;
    var posY = x.y ? x.y : y;
    return {
        x: posX,
        y: posY,
        equals: function (coord)
        {
            return posX === coord.x && posY === coord.y;
        },
        offset: function (x, y)
        {
            var coord = {};
            if (x.x)
            {
                coord.x = x.x;
                coord.y = x.y;
            }
            else
            {
                coord.x = x;
                coord.y = y;
            }
            return new Coord(posX + coord.x, posY + coord.y)
        }
    }
}