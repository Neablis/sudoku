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
    var width = 9, matrix, Matrix, mask;

    /** @constructor */
    Board = function (Matrix, old_matrix) {
        var matrix;

        if (Matrix === undefined && typeof Matrix !== undefined) {
            return undefined;
        }

        this.Matrix = Matrix;

        if (old_matrix !== undefined) {
            matrix = new Matrix(old_matrix);
        } else {
            matrix = new Matrix(width);

            //Sets matrix to a base predictable state
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    matrix.set(i * 9 + j, (i*3 + Math.floor(i/3) + j) % 9 + 1);
                }
            }
        }

        this.matrix = matrix;
        return this;
    };

    Board.prototype.restart = function () {
        var matrix = new this.Matrix(this.width);
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                matrix.set(i * 9 + j, (i*3 + Math.floor(i/3) + j) % 9 + 1);
            }
        }

        this.matrix = matrix;
        return this;
    };

    // Take the base board, and make it randomised but still solvable
    Board.prototype.shuffle = function () {
        var row, col, tmp, s, i, c;

        //Swap values
        for(i = 0; i < 50; i++) {
            var n1 = Math.ceil(Math.random() * 9);
            var n2;
            do {
                n2 = Math.ceil(Math.random() * 9);
            }
            while(n1 == n2);

            for(row = 0; row < 9; row++) {
                for(col = 0; col < col; k++) {
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
        for (c = 0; c < 50; c++) {
            var s1 = Math.floor(Math.random() * 3);
            var s2 = Math.floor(Math.random() * 3);

            for(row = 0; row < 9; row++) {
                tmp = this.matrix.indexOf(row * 9 + (s1 * 3 + c % 3));
                this.matrix.set(row * 9 + (s1 * 3 + c % 3), this.matrix.indexOf(row * 9 + (s2 * 3 + c % 3)));
                this.matrix.set(row * 9 + (s2 * 3 + c % 3), tmp);
            }
        }

        // randomly swap columns within each column of subsquares
        for (s = 0; s < 50; s++) {
            var c1 = Math.floor(Math.random() * 3);
            var c2 = Math.floor(Math.random() * 3);

            for(row = 0; row < 9; row++) {
                tmp = this.matrix.indexOf(row * 9 + (s % 3 * 3 + c1));
                this.matrix.set((row * 9 + (s % 3 * 3 + c1)), this.matrix.indexOf(row * 9 + (s % 3 * 3 + c2)));
                this.matrix.set(row * 9 + (s % 3 * 3 + c2), tmp);
            }
        }

        // randomly swap rows within each row of subsquares
        for (s = 0; s < 50; s++) {
            var r1 = Math.floor(Math.random() * 3);
            var r2 = Math.floor(Math.random() * 3);

            for(col = 0; col < 9; col++)
            {
                tmp = this.matrix.indexOf((s % 3 * 3 + r1) * 9 + col);
                this.matrix.set(((s % 3 * 3 + r1) * 9 + col), this.matrix.indexOf((s % 3 * 3 + r2) * 9 + col));
                this.matrix.set(((s % 3 * 3 + r2) * 9 + col), tmp);
            }
        }

        return this;
    };

    // Check if a value is good
    Board.prototype.check_val = function(matrix, row, col, val) {
        var i, j, r, c;
        // check each cell in the row to see if the value already
        // exists in the row. do not look at the value of the cell in
        // the column we are trying. repeat for each zone.
        for(i = 0; i < 9; i++)
        {
            if((i != col) && (matrix.indexOf(row * 9 + i) == val)) {
                return false;
            }
        }

        // check col
        for(i = 0; i < 9; i++)
        {
            if((i != row) && (matrix.indexOf(i * 9 + col) == val)) {
                return false;
            }
        }

        // check square
        r = row - row % 3;
        c = col - col % 3;
        for(i = r; i < r + 3; i++) {
            for(j = c; j < c + 3; j++) {
                if(((i != row) || (j != col)) && (matrix.indexOf(i * 9 + j) == val)) {
                    return false; 
                }
            }
        }

        return true;
    };

    // Check if board is solved
    Board.prototype.solved = function (matrix) {
        for(var i = 0; i < 9; i++)
        {
            for(var j = 0; j < 9; j++)
            {
                var val = this.matrix[i * 9 + j];
                if((val === 0) || (this.check_val(matrix, i, j, val) === false)) {
                    return false;
                }
            }
        }
        return true;
    };

    // Turn 5 known values in each parent cube into 0's (unkown)
    Board.prototype.mask_board = function(matrix, old_mask) {

        if (old_mask !== undefined) {
            // Wanted the ability to restore a old mask
            this.mask = old_mask;
            return this;
        }

        var i, j, k, mask = new this.Matrix(this.matrix.matrix_array);
        for(i = 0; i < matrix.length; i++) {
            mask.set(i, matrix.indexOf(i));
        }

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                // for each 3x3 subsquare, pick 5 random cells
                // and mask them.
                for (k = 0; k < 5; k++) {
                    var c;
                    do {
                        c = Math.floor(Math.random() * 9);
                    }
                    while(mask.indexOf((i * 3 + Math.floor(c / 3)) * 9 + j * 3 + c % 3) === 0);

                    mask.set((i * 3 + Math.floor(c / 3)) * 9 + j * 3 + c % 3, 0);
                }
            }
        }
        this.mask = mask;
        return this;
    };

    // Pick a random unsolved index and show its value
    Board.prototype.give_hint = function(matrix, mask) {
        var masked_index = [], index, value;
        for (var x = 0; x < mask.length; x++) {
            if (mask.indexOf(x) === 0) {
                masked_index.push(x);
            }
        }

        index = masked_index[Math.floor(Math.random() * masked_index.length)];
        value = matrix.indexOf(index);
        mask.set(index, value);

        return this;
    };

    // Quick way of comparing if two arrays are equal
    Board.prototype.compare = function (matrix1, matrix2) {
        if (matrix1.length !== matrix2.length) {
            return false;
        }

        for( var x = 0; x < matrix1.length; x++) {
            if (matrix1[x] !== matrix2[x]) {
                return false;
            }
        }

        return true;
    };

    return Board;
}));