requirejs.config({
	baseUrl: '/',
	paths: {
		jquery: 'bower_components/jquery/jquery.min',
		underscore: 'bower_components/lodash/dist/lodash.underscore.min',
        'Matrix': 'assets/js/matrix',
        'Board': 'assets/js/board'
    },
    "shim": {
       
    }
});

requirejs(['jquery', 'underscore', 'Matrix', 'Board'], function($, _, Matrix, Board) {

        $('#sudoku_application').html('hello world!');

        var board = new Board(Matrix);
        // I always find it useful to hold the namespace of the project at the window level in some way
        window.Sudoku = board;
        board.shuffle();
        board.matrix._log();

});
