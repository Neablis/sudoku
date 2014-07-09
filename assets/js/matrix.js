(function (name, definition) {
    if (typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
}('Matrix', function () {
    /** Properties of the module. */
    var matrix_array = null,
    	width = null,
    	length = null;
    
    /** @constructor */
    Matrix = function (width) {
    	if (width !== undefined && typeof width === 'object') {
    		// A way of making copies of existing matrix throw constructor.
    		// This is horrible and doesnt do much checking
    		this.length = width.length;
    		this.width = Math.sqrt(width.length);
    		this.matrix_array = width.slice(0);
    		return this;
    	} else if (width === undefined || typeof width !== 'number') {
    		width = 0;
    	}

    	// Since matrix is perfect square, width ^2 is the total length of the underlying array
	    this.length = width * width;
		this.width = width;
		this.matrix_array = new Array(this.length);

	    //Clear will initialize the array to 0s in all places
	    this.clear();
    };

    //Simple wrapped around the length parameter
    Matrix.prototype.length = function () {
    	return this.length;
    };

    //Return the underlying array struct
    Matrix.prototype.get = function () {
    	return this.matrix_array;
    };

    //Reset the array to a new size
    Matrix.prototype.resize = function (width) {
    	if (width === undefined || typeof width !== 'number') {
    		width = 0;
    	}

	    this.length = width * width;
	   	this.width = width;

	    this.matrix_array = new Array(this.length);
	   	this.clear();
    };

    //Sets all values to 0
    Matrix.prototype.clear = function () {
    	var i = this.length;
		while (i--) {
			this.matrix_array[i] = 0;
		}
		return this;
    };

    // Operater overloading for two ways to recover values from array
    Matrix.prototype.indexOf = function () {
    	if (arguments && arguments.length == 2) {
    		return this.indexOf_grid.apply(this, arguments);
    	} else {
    		return this.indexOf_array.apply(this, arguments);
    	}
    };
    
    // return value using row/col
    Matrix.prototype.indexOf_grid = function (row, col) {

    	if (row === undefined || col === undefined || 
    		row*this.width > this.length ||
    		row >= this.width || col >= this.width ||
    		col < 0 || row < 0) {
    		return undefined;
    	}
    	/*    [1,2,3]
    	 *    [4,5,6]  = [1,2,3,4,5,6,7,8,9]
    	 *    [7 8 9]
    	 */

    	return this.matrix_array[(row) + (col * (this.width))];
    };

    //return value using its index in array
    Matrix.prototype.indexOf_array = function (index) {

    	if (index === undefined) {
    		return undefined;
    	} 
    		
    	/*    [1,2,3]
    	 *    [4,5,6]  = [1,2,3,4,5,6,7,8,9]
    	 *    [7 8 9]
    	 */

    	return this.matrix_array[index];
    };

    //operater overloading for two ways to set value in array
    Matrix.prototype.set = function () {
    	if (arguments && arguments.length == 2) {
    		return this.set_index_val.apply(this, arguments);
    	} else {
    		return this.set_row_column.apply(this, arguments);
    	}
    };

    // return value using its index
    Matrix.prototype.set_index_val = function (index, value) {
    	if(index === undefined || value === undefined ||
    		index > this.length) {
    		return undefined;
    	}

    	this.matrix_array[index] = value;

    	return this;
    };

    // return value using its row/col
    Matrix.prototype.set_row_column = function (row, col, value) {

    	if (row === undefined || col === undefined || 
    		value === undefined || row*this.width > this.length ||
    		row >= this.width || col >= this.width || 
    		col < 0 || row < 0) {
    		return this;
    	}
    	this.matrix_array[(row) + (col * (this.width))] = value;

    	return this;
    };

    // used for testing, console.log a reprosentation of the current matrix
    Matrix.prototype._log = function () {

		for (var i = 0; i < this.width; i++) {
			console.log(this.matrix_array.slice(i*this.width, i*this.width + this.width));
		}
    };

    Matrix.prototype.swap_row = function () {

    };

    Matrix.prototype.swap_column = function () {

    };

    return Matrix;
}));