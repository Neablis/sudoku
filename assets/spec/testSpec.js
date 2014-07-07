define(['require', 'Matrix', 'Board'], function (require, Matrix, Board) {
	describe("Matrix", function() {
		it('should init a new matrix', function () {
			var matrix = new Matrix();
			expect(matrix.matrix_array).to.be.an('array');
			expect(matrix.length).to.eql(0);
		});

		it('should init a new matrix to a specific size', function () {
			var matrix = new Matrix(5);
			expect(matrix.length).to.eql(25);
		});

		it('should resize a existing matrix', function () {
			var matrix = new Matrix(5);
			expect(matrix.length).to.eql(25);
			matrix.resize(6);
			expect(matrix.length).to.eql(36);
		});

		it('should set a specific value in matrix', function () {
			var matrix = new Matrix(5);
			matrix.set(4,4,5);
			expect(matrix.indexOf(4, 4)).to.eql(5);
		});

		it('should return undefined if indexOf is out of matrix', function () {
			var matrix = new Matrix(5);
			expect(matrix.indexOf(-1, -1)).to.be.undefined;
			expect(matrix.indexOf(5, 5)).to.be.undefined;
		});

		it('should chain setters', function () {
			var matrix = new Matrix(5);
			matrix.set(0,0,5).set(0,1,5).set(0,2,5);
			expect(matrix.indexOf(0,0)).to.eql(5);
			expect(matrix.indexOf(0,1)).to.eql(5);
			expect(matrix.indexOf(0,2)).to.eql(5);
		});

		it('should clear all set values', function () {
			var matrix = new Matrix(5);
			matrix.set(0,0,5).clear();
			expect(matrix.indexOf(0,0)).to.eql(0);
		});
	});

	describe("Board", function() {
		it('should init a new Board', function () {
			var board = new Board(Matrix);
			expect(board.matrix.length).to.eql(81);
		});

		it('should init to a base board', function () {
			var starting_point = [1, 2, 3, 4, 5, 6, 7, 8, 9,
								  4, 5, 6, 7, 8, 9, 1, 2, 3,
								  7, 8, 9, 1, 2, 3, 4, 5, 6,
								  2, 3, 4, 5, 6, 7, 8, 9, 1,
								  5, 6, 7, 8, 9, 1, 2, 3, 4,
								  8, 9, 1, 2, 3, 4, 5, 6, 7,
								  3, 4, 5, 6, 7, 8, 9, 1, 2,
								  6, 7, 8, 9, 1, 2, 3, 4, 5,
								  9, 1, 2, 3, 4, 5, 6, 7, 8];

			var board = new Board(Matrix);
			expect(board.matrix.matrix_array).to.eql(starting_point);
		});

		it('should be solvable after shuffling the board for play', function () {
			var board = new Board(Matrix);
			board.shuffle();

			expect(board.solved()).to.eql(true);
		});

		it('should check a value in a row/col and return if its good', function () {
			var board = new Board(Matrix);
			board.shuffle();
			var correct_val = board.matrix.indexOf(0);
			if (correct_val !== 5) {
				expect(board.check_val(0,0,5)).to.eql(false);
			} else {
				expect(board.check_val(0,0,6)).to.eql(false);
			}
		});
	});
});