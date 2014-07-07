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

        // randomly swap corresponding columns from each column of
        // subsquares
        for (var c = 0; c < 50; c++) {
            var s1 = Math.floor(Math.random() * 3);
            var s2 = Math.floor(Math.random() * 3);

            for(var row = 0; row < 9; row++) {
                var tmp = this.matrix.indexOf(row * 9 + (s1 * 3 + c % 3));
                this.matrix.set(row * 9 + (s1 * 3 + c % 3), this.matrix.indexOf(row * 9 + (s2 * 3 + c % 3)));
                this.matrix.set(row * 9 + (s2 * 3 + c % 3), tmp);
            }
        }

        // randomly swap columns within each column of subsquares
        for (var s = 0; s < 50; s++) {
            var c1 = Math.floor(Math.random() * 3);
            var c2 = Math.floor(Math.random() * 3);

            for(var row = 0; row < 9; row++) {
                var tmp = this.matrix.indexOf(row * 9 + (s % 3 * 3 + c1));
                this.matrix.set((row * 9 + (s % 3 * 3 + c1)), this.matrix.indexOf(row * 9 + (s % 3 * 3 + c2)));
                this.matrix.set(row * 9 + (s % 3 * 3 + c2), tmp);
            }
        }

        // randomly swap rows within each row of subsquares
        for (var s = 0; s < 50; s++) {
            var r1 = Math.floor(Math.random() * 3);
            var r2 = Math.floor(Math.random() * 3);

            for(var col = 0; col < 9; col++)
            {
                var tmp = this.matrix.indexOf((s % 3 * 3 + r1) * 9 + col);
                this.matrix.set(((s % 3 * 3 + r1) * 9 + col), this.matrix.indexOf((s % 3 * 3 + r2) * 9 + col));
                this.matrix.set(((s % 3 * 3 + r2) * 9 + col), tmp);
            }
        }

    };

    Board.prototype.check_val = function(row, col, val) {
        var i, j, r, c;
        // check each cell in the row to see if the value already
        // exists in the row. do not look at the value of the cell in
        // the column we are trying. repeat for each zone.
        for(i = 0; i < 9; i++)
        {
            if((i != col) && (this.matrix.indexOf(row * 9 + i) == val))
                return false;
        }

        // check col
        for(i = 0; i < 9; i++)
        {
            if((i != row) && (this.matrix.indexOf(i * 9 + col) == val)) {
                return false;
            }
        }

        // check square
        r = row - row % 3;
        c = col - col % 3;
        for(i = r; i < r + 3; i++) {
            for(j = c; j < c + 3; j++) {
                if(((i != row) || (j != col)) && (this.matrix.indexOf(i * 9 + j) == val)) {
                    return false; 
                }
            }
        }

        return true;
    };

    Board.prototype.solved = function () {
        for(var i = 0; i < 9; i++)
        {
            for(var j = 0; j < 9; j++)
            {
                var val = this.matrix[i * 9 + j];
                if((val == 0) || (this.check_val(i, j, val) == false)) {
                    return false;
                }
            }
        }
        return true;
    };

    return Board;
}));