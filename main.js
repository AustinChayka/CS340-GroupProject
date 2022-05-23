var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require("./dbConn.js");

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
})
app.get('/edit/', function (req, res) {
    res.sendFile(__dirname + '/edit.html');
})
app.post('/editAction/', urlencodedParser, function (req, res) {
    result = {
        choice:req.body.choice
    };
    console.log(result);
    //query results and return
})
app.get('/search/', function (req, res) {
    res.sendFile(__dirname + '/search.html');
})
app.post('/searchResult/', urlencodedParser, function (req, res) {
    result = {
        table:req.body.table,
        search:req.body.search 
    };
    console.log(result);
    //query results and return
})
app.get('/view/', function (req, res) {
    res.sendFile(__dirname + '/view.html');
})
app.post('/viewResult/', urlencodedParser, function (req, res) {
    result = {
        table:req.body.table
    };
    console.log(result);
    //query results and return
})

var server = app.listen(process.argv[2], 'localhost', function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at http://%s:%s", host, port)
})

server.on("connection", function(client) {
    console.log("New connection from: " + client.address().address);
})