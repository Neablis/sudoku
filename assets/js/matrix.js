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
    	if (width === undefined || typeof width !== 'number') {
    		width = 0;
    	}

	    this.length = width * width;
	    this.width = width;

	    this.matrix_array = new Array(this.length);
	    this.clear();
    };

    Matrix.prototype.length = function () {
    	return this.length;
    }

    Matrix.prototype.get = function () {
    	return this.matrix_array;
    }

    Matrix.prototype.resize = function (width) {
    	if (width === undefined || typeof width !== 'number') {
    		width = 0;
    	}

	    this.length = width * width;
	   	this.width = width;

	    this.matrix_array = new Array(this.length);
	   	this.clear();
    }

    Matrix.prototype.clear = function () {
    	var i = this.length;
		while (i--) {
			this.matrix_array[i] = 0;
		}
		return this;
    }

    Matrix.prototype.indexOf = function (row, col) {

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
    }

    Matrix.prototype.set = function (row, col, value) {

    	if (row === undefined || col === undefined || 
    		value === undefined || row*this.width > this.length ||
    		row >= this.width || col >= this.width || 
    		col < 0 || row < 0) {
    		return this;
    	}
    	this.matrix_array[(row) + (col * (this.width))] = value;

    	return this;
    }

    Matrix.prototype.log = function () {

		for (var i = 0; i < this.width; i++) {
			console.log(this.matrix_array.slice(i*this.width, i*this.width + this.width));
		}
    }

    return Matrix;
}));