requirejs.config({
	baseUrl: '/',
	paths: {
		text: 'bower_components/requirejs-plugins/lib/text',
		jquery: 'bower_components/jquery/jquery.min',
		underscore: 'bower_components/lodash/dist/lodash.underscore.min',
        'Matrix': 'assets/js/matrix',
        'Board': 'assets/js/board'
    },
    "shim": {
       
    }
});

requirejs(['jquery', 'underscore', 'Matrix', 'Board', 'text!assets/templates/board.tp'], 
	function($, _, Matrix, Board, BoardTP) {

        $('#sudoku_application').html('hello world!');

        var board = new Board(Matrix);
        // I always find it useful to hold the namespace of the project at the window level in some way
        window.Sudoku = board;
        board.shuffle();
        board.matrix._log();

        $('#sudoku_application').append(_.template(BoardTP));

});
