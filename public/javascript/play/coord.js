function Coord(x, y)
{
    var posX = typeof x === 'object' ? x.x : x;
    var posY = typeof x === 'object' ? x.y : y;
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
        },
        insideRect: function(width, height, x, y)
        {
            x = x || 0;
            y = y || 0;
            return (posX >= x && posY >= y && posX < width && posY < height)
        }
    }
}