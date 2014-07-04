define(['require', 'Matrix'], function (require, Matrix) {
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


		it('should set a specific value in matrix', function () {
			var matrix = new Matrix(5);
			matrix.set(5,5,5);
			expect(matrix.indexOf(5, 5)).to.eql(5);
		});

		it('should not set a value if outside range', function () {
			var matrix = new Matrix(5);
			matrix.clear();
			matrix.set(6,6,5);
			expect(matrix.indexOf(6, 6)).to.eql(0);
		});
		it('should return undefined if indexOf is out of matrix', function () {
			var matrix = new Matrix(5);
			expect(matrix.indexOf(-1, -1)).to.be(undefined);
			expect(matrix.indexOf(6, 6)).to.be(undefined);

		});
		it('should not set a value if outside range', function () {
			var matrix = new Matrix(5);
			matrix.clear();
			matrix.set(6, 6, 5);
			expect(matrix.indexOf(6, 6)).to.eql(0);
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
});