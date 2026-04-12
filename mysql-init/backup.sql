-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: dog_service
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'bd95d460-16ef-11f1-9701-345a606d126d:1-179';

--
-- Table structure for table `dog_images`
--

DROP TABLE IF EXISTS `dog_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dog_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `dog_id` bigint NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dog_id` (`dog_id`),
  CONSTRAINT `dog_images_ibfk_1` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog_images`
--

LOCK TABLES `dog_images` WRITE;
/*!40000 ALTER TABLE `dog_images` DISABLE KEYS */;
INSERT INTO `dog_images` VALUES (35,40,'https://res.cloudinary.com/dgpiqnweu/image/upload/v1774246341/k5ft7vlidryri0mwbslj.jpg'),(36,41,'https://res.cloudinary.com/dgpiqnweu/image/upload/v1774246453/nv4kguv4q9b4ablqnp3s.jpg'),(37,42,'https://res.cloudinary.com/dgpiqnweu/image/upload/v1774246640/orhvwemgg0luwwkzp7ss.jpg'),(38,43,'https://res.cloudinary.com/dgpiqnweu/image/upload/v1774247024/gg1lin3uonq3zjgax3h6.png'),(39,44,'https://res.cloudinary.com/dgpiqnweu/image/upload/v1774247081/coyf8fuyemkvz8qvx06a.jpg'),(40,45,'https://res.cloudinary.com/dgpiqnweu/image/upload/v1774247162/dlfkbtqhtgza5pgvhsxb.jpg'),(41,46,'https://res.cloudinary.com/dgpiqnweu/image/upload/v1774252449/iq9wqzhnhcqka69sfafu.jpg');
/*!40000 ALTER TABLE `dog_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dog_pickup`
--

DROP TABLE IF EXISTS `dog_pickup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dog_pickup` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `picked_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `dog_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt8hudrpium1gcbn0yftu9lcwj` (`dog_id`),
  CONSTRAINT `FKt8hudrpium1gcbn0yftu9lcwj` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog_pickup`
--

LOCK TABLES `dog_pickup` WRITE;
/*!40000 ALTER TABLE `dog_pickup` DISABLE KEYS */;
INSERT INTO `dog_pickup` VALUES (7,'2026-03-23 07:54:55.132216',16,'dharakauser2',46),(8,'2026-03-24 04:45:12.473156',16,'dharakauser2',45);
/*!40000 ALTER TABLE `dog_pickup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dog_reports`
--

DROP TABLE IF EXISTS `dog_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dog_reports` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `dog_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `reported_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reporter_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dog_id` (`dog_id`),
  CONSTRAINT `dog_reports_ibfk_1` FOREIGN KEY (`dog_id`) REFERENCES `dogs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog_reports`
--

LOCK TABLES `dog_reports` WRITE;
/*!40000 ALTER TABLE `dog_reports` DISABLE KEYS */;
INSERT INTO `dog_reports` VALUES (38,40,16,'2026-03-23 06:12:22','dharakauser2'),(39,41,16,'2026-03-23 06:14:14','dharakauser2'),(40,42,16,'2026-03-23 06:17:22','dharakauser2'),(41,43,16,'2026-03-23 06:23:45','dharakauser2'),(42,44,16,'2026-03-23 06:24:43','dharakauser2'),(43,45,16,'2026-03-23 06:26:03','dharakauser2'),(44,46,16,'2026-03-23 07:54:11','dharakauser2');
/*!40000 ALTER TABLE `dog_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogs`
--

DROP TABLE IF EXISTS `dogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dogs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `place` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogs`
--

LOCK TABLES `dogs` WRITE;
/*!40000 ALTER TABLE `dogs` DISABLE KEYS */;
INSERT INTO `dogs` VALUES (40,'Mixed Street Dog','Brown street dog roaming near beach, looks hungry but friendly.',6.9394,79.8476,'REPORTED','2026-03-23 00:42:20','6.9394, 79.8476','Adult (3–7yr)','Male'),(41,'Local Mixed Breed','Small female dog with slight limp, stays near shops.',6.9394,79.8476,'REPORTED','2026-03-23 00:44:13','Negombo Bus Stand','Adult (1–3yr)','Female'),(42,'Street Puppy','Group of puppies seen near garbage area, need rescue.',6.9394,79.8476,'REPORTED','2026-03-23 00:47:20','Near Negombo Fish Market','Puppy (<1yr)','Unknown'),(43,'Mixed Street Dog','Old weak dog lying near temple, not moving much.',6.9394,79.8476,'REPORTED','2026-03-23 00:53:41','6.9394, 79.8476','Senior (7yr+)','Male'),(44,'Local Brown Dog','Protective dog, barking at vehicles, may have puppies nearby.',6.9394,79.8476,'REPORTED','2026-03-23 00:54:41','6.9394, 79.8476','Adult (3–7yr)','Unknown'),(45,'Black Street Dog','Thin black dog searching for food near railway area.',6.9394,79.8476,'PICKED_UP','2026-03-23 00:56:02','6.9394, 79.8476','Adult (3–7yr)','Unknown'),(46,'Mixed Street Dog','Friendly dog playing with kids, no visible injuries.',6.9394,79.8476,'PICKED_UP','2026-03-23 02:24:08','Kottawa Bus Stand','Adult (3–7yr)','Male');
/*!40000 ALTER TABLE `dogs` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-12 12:27:04
