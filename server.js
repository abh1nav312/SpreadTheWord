'use strict';

const mongodb = require('mongodb');
const http = require('http');
const nconf = require('nconf');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/views');

app.use(express.static('./public'));
app.use(require('./public/js/routes/home'));

app.set("port", 8080);

nconf.argv().env().file('keys.json');

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);
var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});