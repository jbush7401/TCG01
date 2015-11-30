var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/assets'));

app.listen(3000);/**
 * Created by jbush_000 on 11/20/2015.
 */


