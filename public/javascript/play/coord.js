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
            var coord = new Coord(x, y);
            return new Coord(posX + coord.x, posY + coord.y)
        },
        insideRect: function(width, height, x, y)
        {
            x = x || 0;
            y = y || 0;
            return (posX >= x && posY >= y && posX < x + width && posY < y + height)
        },
        toJSON: function()
        {
            return {
                x: posX,
                y: posY
            };
        }
    }
}