requirejs.config({
	baseUrl: '/',
	paths: {
		jquery: 'bower_components/jquery/jquery.min',
		underscore: 'bower_components/lodash/dist/lodash.underscore.min',
        'Matrix': 'assets/js/matrix'
    },
    "shim": {
       
    }
});

requirejs(['jquery', 'underscore', 'Matrix'], function($, _, Matrix) {

        $('#sudoku_application').html('hello world!');

});
