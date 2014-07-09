define('Sudoku', ['jquery', 
				  'underscore',
				  'Modernizer', 
				  'Matrix', 
				  'Board', 
				  //Templates
				  'text!assets/templates/board.tp',
				  'text!assets/templates/header.tp',
				  'text!assets/templates/footer.tp',
				  'text!assets/templates/page.tp'
				  ], 
	function($, _, Modernizer, Matrix, Board, BoardTP, HeaderTP, FooterTP, PageTP) {

		return {
			start: function (dom) {
				var that = this;
				this.board = new Board(Matrix);
		        // I always find it useful to hold the namespace of the project at the window level 
		        // in some way
		        window.Sudoku = this;
		        this.$dom = $(dom);
		        this.$dom.html(_.template(PageTP));

		        this.$header = this.$dom.find('#header');
		        this.$header.html(_.template(HeaderTP));

		      	this.$header = this.$dom.find('#header');
		        this.$header.html(_.template(HeaderTP));

		        this.$body = this.$dom.find('#application')

		        this.board.shuffle();
		        this.board.mask_board(this.board.matrix);
		        this.render(this.board.mask);


		        this.$header.find('#hint').click(function (e) {
		        	e.preventDefault();
		        	that.show_hint();
		        });

		      	this.$header.find('#load').click(function (e) {
		        	e.preventDefault();
		        	that.load();
		        });

		        this.$header.find('#start').click(function (e) {
		        	e.preventDefault();
		        	that.restart();
		        });

		        this.$header.find('#show').click(function (e) {
		        	e.preventDefault();
		        	that.show_answer();
		        });
		        	
		        //board.give_hint(board.matrix, board.mask);
			},
			restart: function () {
				this.board = new Board(Matrix);

				this.board.shuffle();
		        this.board.mask_board(this.board.matrix);
		        this.render(this.board.mask);
			},
			load: function () {
				if (Modernizr.localstorage) {

					try {
						var values = localStorage.getItem("Sudoku"),
							storage = JSON.parse(values);
					} catch (e) {
						return false;
					}

					this.board.matrix = new Matrix(storage.matrix);
					this.board.mask = new Matrix(storage.mask);
			        this.render(this.board.mask);

				} else {
				  // no native support for HTML5 storage :(
				  // maybe try dojox.storage or a third-party solution
				}
			},
			save: function () {
				if (Modernizr.localstorage) {
					var json = {'matrix': this.board.matrix.matrix_array, 'mask': this.board.mask.matrix_array};
						json = JSON.stringify(json);

					localStorage.setItem("Sudoku", json);
				} else {

				}
			},
			show_hint: function () {
				this.board.give_hint(this.board.matrix, this.board.mask);
				this.render(this.board.mask);
			},

			show_answer: function () {
				this.board.mask = this.board.matrix;
				this.render(this.board.mask);
			},
			render: function (matrix) {
				var that = this;
				this.$body.html(_.template(BoardTP, {'matrix': matrix}));
				this.$body.change(function (e) {
		        	var $target = $(e.target),
		        		val = parseInt($target.val(), 10),
		        		row = parseInt($target.parent().attr('row'), 10),
		        		col = parseInt($target.parent().attr('column'), 10);

		        	if (that.board.check_val(that.board.matrix, row, col, val)) {
		        		that.board.mask.set(row, col, val);
		        		that.render(that.board.mask);
		        	}
		        });
			}
		};
        

});