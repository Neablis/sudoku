(function (name, definition) {
    if (typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
}('Sudoku', function () {

	Board = function (Matrix) {
        if (Matrix === undefined && typeof Matrix !== undefined) {
            return undefined;
        }

        this.Matrix = Matrix;
        var matrix = new Matrix(width);

        //Sets matrix to a base predictable state
        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                matrix.set(i * 9 + j, (i*3 + Math.floor(i/3) + j) % 9 + 1);

        this.matrix = matrix;
    };

    return Board;
}));