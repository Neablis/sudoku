var express = require('express'),
    path = require('path');

var app = express();
console.log(path.join(__dirname, '../'));
app.use(express.compress());
app.use(express.static(path.join(__dirname, '../')));

app.listen(process.env.PORT || 3006);
