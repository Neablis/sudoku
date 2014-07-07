var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/assets',

  // example of using shim, to load non AMD libraries (such as underscore and jquery)
  paths: {
    'jquery': '../bower_components/jquery/jquery.min',
    'underscore': '../bower_components/lodash/lodash',
    'Matrix': 'js/matrix',
    'Board': 'js/board'
  },

  shim: {
    'underscore': {
      exports: '_'
    }
  },

  // dynamically load all test files
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});