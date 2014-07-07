(function (name, definition) {
    if (typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
}('Board', function () {
    /** Properties of the module. */
    var width = 9, matrix, Matrix;

    /** @constructor */
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

    Board.prototype.restart = function () {
        var matrix = new this.Matrix(this.width);
        for (var i = 0; i < 9; i++)
            for (var j = 0; j < 9; j++)
                matrix.set(i * 9 + j, (i*3 + Math.floor(i/3) + j) % 9 + 1);

        this.matrix = matrix;
    };

    Board.prototype.shuffle = function () {

        //Swap values
        for(var i = 0; i < 50; i++) {
            var n1 = Math.ceil(Math.random() * 9);
            var n2;
            do {
                n2 = Math.ceil(Math.random() * 9);
            }
            while(n1 == n2);

            for(var row = 0; row < 9; row++) {
                for(var col = 0; col < col; k++) {
                    if(this.matrix.indexOf[row * 9 + col] == n1) {
                        this.matrix.set((row * 9 + col), n2);
                    } else if(this.matrix.indexOf(row * 9 + col) == n2) {
                        this.matrix.set((row * 9 + col), n1);
                    }
                }
            }
        }

        //swap values in columns
        for (var c = 0; c < 50; c++) {
            var s1 = Math.floor(Math.random() * 3);
            var s2 = Math.floor(Math.random() * 3);

            for(var row = 0; row < 9; row++) {
                var tmp = this.matrix.indexOf(row * 9 + (s1 * 3 + c % 3));
                this.matrix.set(row * 9 + (s1 * 3 + c % 3), this.matrix.indexOf(row * 9 + (s2 * 3 + c % 3)));
                this.matrix.set(row * 9 + (s2 * 3 + c % 3), tmp);
            }
        }

    };

    Board.prototype.solved = function () {

    };

    return Board;
}));