//library setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require("./dbConn.js");
var hbs = require("hbs");
app.set("view engine", "hbs");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//home page
app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
})
//edit directory page
app.get('/edit/', function (req, res) {
    res.sendFile(__dirname + '/edit.html');
})
//add directory page
app.get('/edit/add/', function (req, res) {
    res.sendFile(__dirname + '/editPages/addEntry.html');
})
//add entry page
app.post('/edit/addEntry/', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
//add animal form page
app.post('/edit/addEntry/Animal', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
//add animal SQL query
app.post('/edit/addEntry/Animal/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    //if no entry given, then defaul to NULL
    data = {
        commonName: req.body.CommonName == '' ? "NULL" : req.body.CommonName,
        genus: req.body.Genus == '' ? "NULL" : req.body.Genus,
        species: req.body.Species == '' ? "NULL" : req.body.Species,
        subspecies: req.body.Subspecies == '' ? "NULL" : req.body.Subspecies
    };
    //submit SQL query to server
    mysql.pool.query("INSERT INTO Animal (CommonName, Genus, Species, Subspecies) VALUES (?, ?, ?, ?);", [data.commonName, data.genus, data.species, data.subspecies], function (err, r) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//add plant form page
app.post('/edit/addEntry/Plant', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
//add plant SQL query
app.post('/edit/addEntry/Plant/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    //if no entry given, then defaul to NULL
    data = {
        commonName: req.body.CommonName == '' ? "NULL" : req.body.CommonName,
        genus: req.body.Genus == '' ? "NULL" : req.body.Genus,
        species: req.body.Species == '' ? "NULL" : req.body.Species,
        subspecies: req.body.Subspecies == '' ? "NULL" : req.body.Subspecies
    };
    //submit SQL query to server
    mysql.pool.query("INSERT INTO Plant (CommonName, Genus, Species, Subspecies) VALUES (?, ?, ?, ?);", [data.commonName, data.genus, data.species, data.subspecies], function (err, r) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//add biome form page
app.post('/edit/addEntry/Biome', urlencodedParser, function (req, res) {
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
//add biome SQL query
app.post('/edit/addEntry/Biome/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    //if no entry given, then defaul to NULL
    data = {
        name: req.body.Name == '' ? "NULL" : req.body.Name
    };
    //submit SQL query to server
    mysql.pool.query("INSERT INTO Biome (Name) VALUES (?);", [data.name], function (err, r) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})

app.post('/edit/addEntry/Location', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
//add location SQL query
app.post('/edit/addEntry/Location/confirm', urlencodedParser, function (req, res){
    //get user form entries
    //if no entry given, then defaul to NULL
    data = {
        name: req.body.Name == '' ? "NULL" : req.body.Name,
        latitude: req.body.Latitude == '' ? "NULL" : req.body.Latitude,
        longitude: req.body.Longitude == '' ? "NULL" : req.body.Longitude,
        area: req.body.Area == '' ? "NULL" : req.body.Area,
        avgTemperature: req.body.AvgTemperature == '' ? "NULL" : req.body.AvgTemperature,
        avgRainfall: req.body.AvgRainfall == '' ? "NULL" : req.body.AvgRainfall        
    };
    //submit SQL query to server
    mysql.pool.query("INSERT INTO Location (Name, Latitude, Longitude, Area, AvgTemperature, AvgRainfall) VALUES (?, ?, ?, ?, ?, ?);", [data.name, data.latitude, data.longitude, data.area, data.avgTemperature, data.avgRainfall], function (err, r){
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//add ecosystem form page
app.post('/edit/addEntry/Ecosystem', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    res.sendFile(__dirname + '/editPages/add' + t + '.html')
})
//add ecosystem SQL query
app.post('/edit/addEntry/Ecosystem/confirm', urlencodedParser, function (req, res){
    //get user form entries
    //if no entry given, then defaul to NULL
    data = {
        biomeID: req.body.BiomeID == '' ? "NULL" : req.body.BiomeID,
        locationID: req.body.LocationID == '' ? "NULL" : req.body.LocationID,
        plantID: req.body.PlantID == '' ? "NULL" : req.body.PlantID,
        animalID: req.body.AnimalID == '' ? "NULL" : req.body.AnimalID       
    };
    mysql.pool.query("INSERT INTO Ecosystem (Biome, Location, Plant, Animal) VALUES ((SELECT BiomeID from Biome where BiomeID = ?), (SELECT LocationID from Location where LocationID = ?), (SELECT PlantID from Plant where PlantID = ?), (SELECT AnimalID from Animal where AnimalID = ?));", [data.biomeID, data.locationID, data.plantID, data.animalID], function (err, r){
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//remove directory page
app.get('/edit/remove/', function (req, res) {
    res.sendFile(__dirname + '/editPages/removeEntry.html');
})
//remove entry choice page
app.post('/edit/removeEntry/', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    //get table entries from server
    mysql.pool.query('SELECT * FROM ' + t + ';', [t], function (err, r, f) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        results = {
            results: r,
            table: t
        };
        //render removal page template with table entries
        res.render("remove", {results : results});
    });
})
//remove animal SQL query
app.post('/edit/removeEntry/Animal/confirm', urlencodedParser, function (req, res) {
    //get ID choice
    var id = req.body.ID;
    //submit SQL query to server
    mysql.pool.query("DELETE FROM Animal WHERE AnimalID = ?;", [id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//remove plant SQL query
app.post('/edit/removeEntry/Plant/confirm', urlencodedParser, function (req, res) {
    //get ID choice
    var id = req.body.ID;
    //submit SQL query to server
    mysql.pool.query("DELETE FROM Plant WHERE PlantID = ?;", [id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//remove location SQL query
app.post('/edit/removeEntry/Location/confirm', urlencodedParser, function (req, res) {
    //get ID choice
    var id = req.body.ID;
    //submit SQL query to server
    mysql.pool.query("DELETE FROM Location WHERE LocationID = ?;", [id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//remove biome SQL query
app.post('/edit/removeEntry/Biome/confirm', urlencodedParser, function (req, res) {
    //get ID choice
    var id = req.body.ID;
    mysql.pool.query("DELETE FROM Biome WHERE BiomeID = ?;", [id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})

app.post('/edit/removeEntry/Ecosystem/confirm', urlencodedParser, function (req, res) {
    //remove biome SQL query
    var id = req.body.ID;
    mysql.pool.query("DELETE FROM Ecosystem WHERE EcosystemID = ?;", [id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//edit directory page
app.get('/edit/edit/', function (req, res) {
    res.sendFile(__dirname + '/editPages/editEntry.html');
})
//edit entry choice page
app.post('/edit/editEntry/', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    //get table entries from server
    mysql.pool.query('SELECT * FROM ' + t + ';', [t], function (err, r, f) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        results = {
            results: r,
            table: t
        };
        //render edit page template with table entries
        res.render("edit" + t, {results : results});
    });
})
//edit animal SQL query
app.post('/edit/editEntry/Animal/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    var data = {
        id: req.body.ID,
        commonName: req.body.CommonName,
        genus: req.body.Genus,
        species: req.body.Species,
        subspecies: req.body.Subspecies
    };
    //submit SQL query to server
    mysql.pool.query("UPDATE Animal SET CommonName = ?, Genus = ?, Species = ?, Subspecies = ? WHERE AnimalID = ?;", [data.commonName, data.genus, data.species, data.subspecies, data.id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//edit plant SQL query
app.post('/edit/editEntry/Plant/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    var data = {
        id: req.body.ID,
        commonName: req.body.CommonName,
        genus: req.body.Genus,
        species: req.body.Species,
        subspecies: req.body.Subspecies
    };
    //submit SQL query to server
    mysql.pool.query("UPDATE Plant SET CommonName = ?, Genus = ?, Species = ?, Subspecies = ? WHERE PlantID = ?;", [data.commonName, data.genus, data.species, data.subspecies, data.id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//edit biome SQL query
app.post('/edit/editEntry/Biome/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    var data = {
        id: req.body.ID,
        name: req.body.Name
    };
    //submit SQL query to server
    mysql.pool.query("UPDATE Biome SET Name = ? WHERE BiomeID = ?;", [data.name, data.id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//edit location SQL query
app.post('/edit/editEntry/Location/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    var data = {
        id: req.body.ID,
        name: req.body.Name,
        latitude: req.body.Latitude,
        longitude: req.body.Longitude,
        area: req.body.Area,
        avgTemperature: req.body.AvgTemperature,
        avgRainfall: req.body.AvgRainfall
    };
    //submit SQL query to server
    mysql.pool.query("UPDATE Location SET Name = ?, Latitude = ?, Longitude = ?, Area = ?, AvgTemperature = ?, AvgRainfall = ? WHERE LocationID = ?;", [data.name, data.latitude, data.longitude, data.area, data.avgTemperature, data.avgRainfall, data.id], function (err) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        //after success redirect to confimration page
        res.sendFile(__dirname + '/confirm.html');
    });
})
//edit ecosystem SQL query
app.post('/edit/editEntry/Ecosystem/confirm', urlencodedParser, function (req, res) {
    //get user form entries
    var data = {
        id: req.body.ID,
        biomeID: req.body.BiomeID,
        locationID: req.body.LocationID,
        plantID: req.body.PlantID,
        animalID: req.body.AnimalID
    };
    mysql.pool.query("UPDATE Ecosystem SET Biome = (SELECT BiomeID from Biome WHERE BiomeID = ?), Location = (SELECT LocationID from Location WHERE LocationID = ?), Plant = (SELECT PlantID from Plant WHERE PlantID = ?), Animal = (SELECT AnimalID from Animal WHERE AnimalID = ?) WHERE EcosystemID = ?;", [data.biomeID, data.locationID, data.plantID, data.animalID, data.id], function (err) {
         //if there was an error with query redirect to error page
         if(err) res.sendFile(__dirname + '/error.html');
         //after success redirect to confimration page
         res.sendFile(__dirname + '/confirm.html');
    });
})
//search form page
app.get('/search/', function (req, res) {
    res.sendFile(__dirname + '/search.html');
})
//search SQL query
app.post('/searchResult/', urlencodedParser, function (req, res) {
    //get user form entries
    search = {
        thing:req.body.thing,
        search:req.body.search 
    };
    //submit SQL query to server
    var query = 'SELECT * FROM Ecosystem WHERE ' + search.thing + 's' + ' = (SELECT ' + search.thing + 'ID' + ' FROM ' + search.thing + ' WHERE CommonName = \"' + search.search + '\");';
    mysql.pool.query(query, function (err, r, f) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        results = r;
        //render search results
        res.render("results", {results : results});
    });
})
//view tables directory
app.get('/view/', function (req, res) {
    res.sendFile(__dirname + '/view.html');
})
//view table SQL query
app.post('/viewResult/', urlencodedParser, function (req, res) {
    //get table choice
    var t = req.body.table;
    //submit SQL query to server
    mysql.pool.query('SELECT * FROM ' + t + ';', function (err, r, f) {
        //if there was an error with query redirect to error page
        if(err) res.sendFile(__dirname + '/error.html');
        results = r;
        //render view results
        res.render("results", {results : results});
    });
})

//main server start
var server = app.listen(process.argv[2], 'localhost', function () { //rm localhost for server version
   var host = server.address().address
   var port = server.address().port
   console.log("Listening at http://%s:%s", host, port)
})