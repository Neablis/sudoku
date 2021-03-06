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

		       	this.$footer = this.$dom.find('#footer');
		        this.$footer.html(_.template(FooterTP));

		        this.$body = this.$dom.find('#application');

		        this.board.shuffle();
		        this.board.mask_board(this.board.matrix);
		        this.render(this.board.mask);


		        this.$header.find('#hint').click(function (e) {
		        	e.preventDefault();
		        	that.show_hint();
		        });

		      	this.$header.find('#check').click(function (e) {
		        	e.preventDefault();
		        	that.won_check();
		        });

		        this.$header.find('#start').click(function (e) {
		        	e.preventDefault();
		        	that.restart();
		        });

		        this.$header.find('#show').click(function (e) {
		        	e.preventDefault();
		        	that.show_answer();
		        });
		    },
			restart: function () {
				this.board = new Board(Matrix);

				this.board.shuffle();
		        this.board.mask_board(this.board.matrix);
		        this.render(this.board.mask);
			},
			load: function () {
				if (Modernizr.localstorage) {
					var values, storage;
					try {
						values = localStorage.getItem("Sudoku");
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
			is_solved: function () {
				return this.board.compare(this.board.mask.matrix_array, 
					this.board.matrix.matrix_array);
			},
			won_check: function () {
				if (this.is_solved()) {
					this.show_answer();
        			this.$footer.find('#victory').removeClass('hidden');
        		} else {
        			this.$footer.find('#victory').addClass('hidden');
        		}
			},
			show_hint: function () {
				this.board.give_hint(this.board.matrix, this.board.mask);
				this.save();
				this.render(this.board.mask);
			},
			show_answer: function () {
				this.board.mask = this.board.matrix;
				this.render(this.board.mask);
			},
			render: function (matrix) {
				var that = this;
				this.$body.html(_.template(BoardTP, {'matrix': matrix}));
				this.$body.off("change paste keyup");
				this.$body.on("change paste keyup", function (e) {
					e.preventDefault();
		        	var $target = $(e.target),
		        		val = parseInt($target.val(), 10),
		        		row = parseInt($target.parent().attr('row'), 10),
		        		col = parseInt($target.parent().attr('column'), 10);

		        	that.board.mask.set(row, col, val);
		        });
			}
		};
        

});