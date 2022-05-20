-- Database manipulation queries for Ecosystem Database, will be used when database is implemented with HTML.
--Add new rows to each table
INSERT INTO Location(Name, Latitude, Longitude, Area, AvgTemperature, AvgRainfall)
VALUES(:Name_input, :Latitude_input, :Longitude_input, :Area_input, :AvgTemperature_input, :AvgRainfall_input);

INSERT INTO Plant(CommonName, Genus, Species, Subspeices)
VALUES (:CommonName_input, :Genus_input, :Species_input, :Subspecies_input);

INSERT INTO Animal(CommonName, Genus, Species, Subspeices)
VALUES (:CommonName_input, :Genus_input, :Species_input, :Subspecies_input);

INSERT INTO Ecosystem(Location, Plants, Animals)
VALUES((SELECT LocationID from Location where Name = :LocationName_input), (SELECT PlantID from Plant where CommonName = :PlantName_input), (SELECT AnimalID from Animal where CommonName = :AnimalName_input));

--Delete Rows
DELETE FROM Location WHERE LocationID = :Location_delete;
DELETE FROM Plant WHERE PlantID = :Plant_delete;
DELETE FROM Animal WHERE AnimalID = :Animal_delete;
DELETE FROM Ecosystem WHERE EcosystemID = :Ecosystem_delete;

--Search and display rows
SELECT * FROM Location WHERE Name = :Location_search;
SELECT * FROM Plant WHERE CommonName = :Plant_search;
SELECT * FROM Animal WHERE CommonName = :Animal_search;
SELECT * FROM Ecosystem WHERE CommonName = :Ecosystem_search;

--Update Rows
UPDATE Location SET Name = :LocationName_input, Latitude = :Latitude_input, Longitude = :Longitude_input, Area = :Area_input, AvgTemperature = AvgTemperature_input, AvgRainfall = AvgRainfall_input WHERE LocationID = :Location_selected;
UPDATE Plant SET CommonName = :CommonName_input, Genus = :Genus_input, Species = :Species_input, Subspecies = :Subspecies_input;
UPDATE Animal SET CommonName = :CommonName_input, Genus = :Genus_input, Species = :Species_input, Subspecies = :Subspecies_input;



