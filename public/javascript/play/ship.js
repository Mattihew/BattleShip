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
        if (typeof pos.x !== 'undefined')
        {
            for (var i = 0; i < shipSize; i++)
            {
                switch (dir)
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
        }
        return coords;
    };
    var notify = function(event)
    {
        observers.forEach(function (obs)
        {
            obs(event, this);
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
            var oldPos = pos;
            pos = coord;
            calculateCoords();
            notify({prop: 'pos', old: oldPos, new: coord});
        },
        getPos: function()
        {
            return pos;
        },
        setDir: function(newDir)
        {
            var oldDir = dir;
            dir = newDir;
            calculateCoords();
            notify({prop: 'dir', old: oldDir, new: newDir});
        },
        getDir: function()
        {
            return dir;
        },
        offsetDir: function(offset)
        {
            var oldDir = dir;
            dir += offset;
            dir %= 4;
            calculateCoords();
            notify({prop: 'dir', old: oldDir, new: dir});
            return dir;
        },
        getCoords: function()
        {
            return coords;
        },
        toJSON: function()
        {
            return {
                name: shipName,
                size: shipSize,
                pos: pos.toJSON(),
                dir: dir
            };
        },
        addObserver: function(observer)
        {
            observers.push(observer);
        }
    }
}