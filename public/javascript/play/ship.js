function Ship(name, size)
{
    var shipName = name;
    var shipSize = size;
    var pos = {};
    var dir = 0;
    var coords = [];
    var observers = [];
    var calculateCoords = function()
    {
        coords = [];
        for (var i = 0; i < shipSize; i++)
        {
            switch(dir)
            {
                case 0:
                    coords.push(pos.offset(0, -i));
                    break;
                case 1:
                    coords.push(pos.offset(i, 0));
                    break;
                case 2:
                    coords.push(pos.offset(0, i));
                    break;
                case 3:
                    coords.push(pos.offset(-i, 0));
            }
        }
        return coords;
    };
    var notify = function()
    {
        observers.forEach(function (obs)
        {
            obs(this);
        });
    };
    return {
        name: function()
        {
            return shipName;
        },
        size: function()
        {
            return shipSize;
        },
        setPos: function(coord)
        {
            pos = coord;
            calculateCoords();
            notify();
        },
        getPos: function()
        {
            return pos;
        },
        setDir: function(newDir)
        {
            dir = newDir;
            calculateCoords();
            notify();
        },
        getDir: function()
        {
            return dir;
        },
        offsetDir: function(offset)
        {
            dir += offset;
            dir %= 4;
            calculateCoords();
            notify();
        },
        getCoords: function()
        {
            return coords;
        },
        addObserver: function(observer)
        {
            observers.push(observer);
        }
    }
}