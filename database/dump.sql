-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_dirkj
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Animal`
--

DROP TABLE IF EXISTS `Animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Animal` (
  `AnimalID` int(11) NOT NULL AUTO_INCREMENT,
  `CommonName` varchar(50) DEFAULT NULL,
  `Genus` varchar(50) DEFAULT NULL,
  `Species` varchar(50) DEFAULT NULL,
  `Subspecies` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AnimalID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Animal`
--

LOCK TABLES `Animal` WRITE;
/*!40000 ALTER TABLE `Animal` DISABLE KEYS */;
INSERT INTO `Animal` VALUES (1,'Western Gray Squirrel','Sciurus','S. Griseus',NULL);
/*!40000 ALTER TABLE `Animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Biome`
--

DROP TABLE IF EXISTS `Biome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Biome` (
  `BiomeID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`BiomeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Biome`
--

LOCK TABLES `Biome` WRITE;
/*!40000 ALTER TABLE `Biome` DISABLE KEYS */;
/*!40000 ALTER TABLE `Biome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ecosystem`
--

DROP TABLE IF EXISTS `Ecosystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ecosystem` (
  `EcosytemID` int(11) NOT NULL AUTO_INCREMENT,
  `Biome` int(11) DEFAULT NULL,
  `Location` int(11) DEFAULT NULL,
  `Plants` int(11) DEFAULT NULL,
  `Animals` int(11) DEFAULT NULL,
  PRIMARY KEY (`EcosytemID`),
  KEY `Biome` (`Biome`),
  KEY `Location` (`Location`),
  KEY `Plants` (`Plants`),
  KEY `Animals` (`Animals`),
  CONSTRAINT `Ecosystem_ibfk_1` FOREIGN KEY (`Biome`) REFERENCES `Biome` (`BiomeID`),
  CONSTRAINT `Ecosystem_ibfk_2` FOREIGN KEY (`Location`) REFERENCES `Location` (`LocationID`),
  CONSTRAINT `Ecosystem_ibfk_3` FOREIGN KEY (`Plants`) REFERENCES `Plant` (`PlantID`),
  CONSTRAINT `Ecosystem_ibfk_4` FOREIGN KEY (`Animals`) REFERENCES `Animal` (`AnimalID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ecosystem`
--

LOCK TABLES `Ecosystem` WRITE;
/*!40000 ALTER TABLE `Ecosystem` DISABLE KEYS */;
INSERT INTO `Ecosystem` VALUES (1,NULL,1,1,1);
/*!40000 ALTER TABLE `Ecosystem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Location` (
  `LocationID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Latitude` float(11,8) DEFAULT NULL,
  `Longitude` float(11,8) DEFAULT NULL,
  `Area` float DEFAULT NULL,
  `AvgTemperature` float DEFAULT NULL,
  `AvgRainfall` float DEFAULT NULL,
  PRIMARY KEY (`LocationID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES (1,'Arnold Park',44.57229996,123.29650116,3.7,68,51);
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Plant`
--

DROP TABLE IF EXISTS `Plant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Plant` (
  `PlantID` int(11) NOT NULL AUTO_INCREMENT,
  `CommonName` varchar(50) DEFAULT NULL,
  `Genus` varchar(50) DEFAULT NULL,
  `Species` varchar(50) DEFAULT NULL,
  `Subspecies` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PlantID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Plant`
--

LOCK TABLES `Plant` WRITE;
/*!40000 ALTER TABLE `Plant` DISABLE KEYS */;
INSERT INTO `Plant` VALUES (1,'Maple','Acer','Triflorum',NULL),(2,'Douglas Fir','Pseudotsuga','P. menziesii',NULL);
/*!40000 ALTER TABLE `Plant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-13 17:57:10
