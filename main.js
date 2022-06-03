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
app.get('/edit/add/', function (req, res) {
    res.sendFile(__dirname + '/editPages/addEntry.html');
})
app.post('/edit/addEntry/', urlencodedParser, function (req, res) {
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
app.post('/edit/addEntry/Animal', urlencodedParser, function (req, res) {
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
app.post('/edit/addEntry/Animal/confirm', urlencodedParser, function (req, res) {
    data = {
        commonName: req.body.CommonName == '' ? "NULL" : req.body.CommonName,
        genus: req.body.Genus == '' ? "NULL" : req.body.Genus,
        species: req.body.Species == '' ? "NULL" : req.body.Species,
        subspecies: req.body.Subspecies == '' ? "NULL" : req.body.Subspecies
    };
    mysql.pool.query("INSERT INTO Animal (CommonName, Genus, Species, Subspecies) VALUES (?, ?, ?, ?);", [data.commonName, data.genus, data.species, data.subspecies], function (err, r) {
        if(err) res.sendFile(__dirname + '/error.html');
        console.log(r.insertId);
        res.sendFile(__dirname + '/confirm.html');
    });
    console.log(data)
})
app.post('/edit/addEntry/Plant', urlencodedParser, function (req, res) {
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
app.post('/edit/addEntry/Plant/confirm', urlencodedParser, function (req, res) {
    data = {
        commonName: req.body.CommonName == '' ? "NULL" : req.body.CommonName,
        genus: req.body.Genus == '' ? "NULL" : req.body.Genus,
        species: req.body.Species == '' ? "NULL" : req.body.Species,
        subspecies: req.body.Subspecies == '' ? "NULL" : req.body.Subspecies
    };
    mysql.pool.query("INSERT INTO Plant (CommonName, Genus, Species, Subspecies) VALUES (?, ?, ?, ?);", [data.commonName, data.genus, data.species, data.subspecies], function (err, r) {
        if(err) res.sendFile(__dirname + '/error.html');
        console.log(r.insertId);
        res.sendFile(__dirname + '/confirm.html');
    });
    console.log(data)
})

app.post('/edit/addEntry/Location', urlencodedParser, function (req, res) {
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
app.post('/edit/addEntry/Location/confirm', urlencodedParser, function (req, res){
    data = {
        name: req.body.Name == '' ? "NULL" : req.body.Name,
        latitude: req.body.Latitude == '' ? "NULL" : req.body.Latitude,
        longitude: req.body.Longitude == '' ? "NULL" : req.body.Longitude,
        area: req.body.Area == '' ? "NULL" : req.body.Area,
        avgTemperature: req.body.AvgTemperature == '' ? "NULL" : req.body.AvgTemperature,
        avgRainfall: req.body.AvgRainfall == '' ? "NULL" : req.body.AvgRainfall        
    };
    mysql.pool.query("INSERT INTO Location (Name, Latitude, Longitude, Area, AvgTemperature, AvgRainfall) VALUES (?, ?, ?, ?, ?, ?);", [data.name, data.latitude, data.longitude, data.area, data.avgTemperature, data.avgRainfall], function (err, r){
        if(err) res.sendFile(__dirname + '/error.html');
        console.log(r.insertId);
        res.sendFile(__dirname + '/confirm.html');
    });
    console.log(data)
})


app.get('/edit/remove/', function (req, res) {
    res.sendFile(__dirname + '/editPages/removeEntry.html');
})
app.post('/edit/removeEntry/', urlencodedParser, function (req, res) {
    var t = req.body.table;
    var query = 'SELECT * FROM ' + t + ';';
    console.log(query);
    mysql.pool.query(query, function (err, r, f) {
        if(err) res.sendFile(__dirname + '/error.html');
        results = {
            results: r,
            table: t
        };
        console.log(results);
        res.render("remove", {results : results});
    });
})
app.post('/edit/removeEntry/Animal/confirm', urlencodedParser, function (req, res) {
    var id = req.body.ID;
    console.log(id);
    mysql.pool.query("DELETE FROM Animal WHERE AnimalID = ?;", [id], function (err) {
        if(err) res.sendFile(__dirname + '/error.html');
        res.sendFile(__dirname + '/confirm.html');
    });
})
app.post('/edit/removeEntry/Plant/confirm', urlencodedParser, function (req, res) {
    var id = req.body.ID;
    console.log(id);
    mysql.pool.query("DELETE FROM Plant WHERE PlantID = ?;", [id], function (err) {
        if(err) res.sendFile(__dirname + '/error.html');
        res.sendFile(__dirname + '/confirm.html');
    });
})
app.get('/edit/edit/', function (req, res) {
    res.sendFile(__dirname + '/editPages/editEntry.html');
})
app.post('/edit/editEntry/', urlencodedParser, function (req, res) {
    var t = req.body.table;
    var query = 'SELECT * FROM ' + t + ';';
    console.log(query);
    mysql.pool.query(query, function (err, r, f) {
        if(err) res.sendFile(__dirname + '/error.html');
        results = {
            results: r,
            table: t
        };
        console.log(results);
        res.render("edit" + t, {results : results});
    });
})
app.post('/edit/editEntry/Animal/confirm', urlencodedParser, function (req, res) {
    var data = {
        id: req.body.ID,
        commonName: req.body.CommonName,
        genus: req.body.Genus,
        species: req.body.Species,
        subspecies: req.body.Subspecies
    };
    mysql.pool.query("UPDATE Animal SET CommonName = ?, Genus = ?, Species = ?, Subspecies = ? WHERE AnimalID = ?;", [data.commonName, data.genus, data.species, data.subspecies, data.id], function (err) {
        if(err) res.sendFile(__dirname + '/error.html');
        res.sendFile(__dirname + '/confirm.html');
    });
})
app.post('/edit/editEntry/Plant/confirm', urlencodedParser, function (req, res) {
    var data = {
        id: req.body.ID,
        commonName: req.body.CommonName,
        genus: req.body.Genus,
        species: req.body.Species,
        subspecies: req.body.Subspecies
    };
    mysql.pool.query("UPDATE Plant SET CommonName = ?, Genus = ?, Species = ?, Subspecies = ? WHERE PlantID = ?;", [data.commonName, data.genus, data.species, data.subspecies, data.id], function (err) {
        if(err) res.sendFile(__dirname + '/error.html');
        res.sendFile(__dirname + '/confirm.html');
    });
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