requirejs.config({
	baseUrl: '/',
	paths: {
		text: 'bower_components/requirejs-plugins/lib/text',
		jquery: 'bower_components/jquery/jquery.min',
		underscore: 'bower_components/lodash/dist/lodash.underscore.min',
		Modernizer: 'bower_components/modernizer/modernizr',
        'Matrix': 'assets/js/matrix',
        'Board': 'assets/js/board',
        'Sudoku': 'assets/js/sudoku'

    },
    "shim": {
       
    }
});

requirejs(['Sudoku'], function(Sudoku) {
        var div = document.getElementById('sudoku_application');
        Sudoku.start(div);
});
