var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require("./dbConn.js");

var hbs = require("hbs");
app.set("view engine", "hbs");

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
    search = {
        thing:req.body.thing,
        search:req.body.search 
    };
    var query = 'SELECT * FROM Ecosystem WHERE ' + search.thing + 's' + ' = (SELECT ' + search.thing + 'ID' + ' FROM ' + search.thing + ' WHERE CommonName = \"' + search.search + '\");';
    console.log(query);
    mysql.pool.query(query, function (err, r, f) {
        if(err) res.sendFile(__dirname + '/error.html');
        results = r;
        console.log(results);
        res.render("results", {results : results});
    });
})
app.get('/view/', function (req, res) {
    res.sendFile(__dirname + '/view.html');
})
app.post('/viewResult/', urlencodedParser, function (req, res) {
    var t = req.body.table;
    mysql.pool.query('SELECT * FROM ' + t + ';', function (err, r, f) {
        if(err) res.sendFile(__dirname + '/error.html');
        results = r;
        console.log(results);
        res.render("results", {results : results});
    });
});

var server = app.listen(process.argv[2], 'localhost', function () { //rm localhost for server version
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at http://%s:%s", host, port)
})