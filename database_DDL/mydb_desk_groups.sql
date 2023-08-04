-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.33

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

--
-- Table structure for table `desk_groups`
--

DROP TABLE IF EXISTS `desk_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desk_groups` (
  `desk_group_id` int NOT NULL AUTO_INCREMENT,
  `floor_id` int NOT NULL,
  `position_x` int NOT NULL,
  `desk_size` int NOT NULL,
  `position_y` int NOT NULL,
  `rotation` int NOT NULL,
  `owner` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`desk_group_id`),
  KEY `floor_id` (`floor_id`),
  CONSTRAINT `desk_groups_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `floors` (`floor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desk_groups`
--

LOCK TABLES `desk_groups` WRITE;
/*!40000 ALTER TABLE `desk_groups` DISABLE KEYS */;
INSERT INTO `desk_groups` VALUES (30,4,39,3,114,-28,'test@mail.com','2023-07-24 06:03:12','2023-07-24 06:06:43'),(31,4,263,3,129,-28,'test@mail.com','2023-07-24 06:06:53','2023-07-29 09:02:02'),(32,4,183,3,129,-208,'test@mail.com','2023-07-24 06:07:09','2023-07-24 06:13:37'),(33,4,381,3,142,-208,'test@mail.com','2023-07-24 06:07:29','2023-07-24 06:53:07'),(34,4,154,3,183,-388,'test@mail.com','2023-07-24 06:08:03','2023-07-24 06:13:08'),(35,4,151,3,71,-28,'test@mail.com','2023-07-24 06:08:20','2023-07-24 06:52:16'),(36,4,350,3,82,-28,'test@mail.com','2023-07-24 06:08:59','2023-07-24 06:53:08'),(37,4,290,3,76,152,'test@mail.com','2023-07-24 06:09:23','2023-07-24 06:53:08'),(38,4,558,3,92,-28,'test@mail.com','2023-07-24 06:16:49','2023-07-24 06:54:15'),(39,4,470,3,136,-28,'test@mail.com','2023-07-24 06:17:43','2023-07-24 07:21:17'),(40,4,498,3,86,151,'admin@mail.com','2023-07-24 06:19:58','2023-07-24 06:54:16'),(56,4,591,3,152,152,'test@mail.com','2023-07-24 06:38:32','2023-07-24 06:54:14'),(57,4,679,3,147,-28,'test@mail.com','2023-07-24 06:54:37','2023-07-24 07:13:30'),(58,4,709,3,94,152,'test@mail.com','2023-07-24 06:54:52','2023-07-24 06:55:47'),(59,4,771,3,100,-28,'test@mail.com','2023-07-24 06:55:12','2023-07-24 06:55:46'),(60,4,804,3,162,152,'test@mail.com','2023-07-24 06:55:51','2023-07-24 06:56:00'),(61,4,892,3,165,-28,'test@mail.com','2023-07-24 06:56:53','2023-07-24 06:57:00'),(62,4,923,3,111,152,'test@mail.com','2023-07-24 06:57:02','2023-07-24 06:57:30'),(63,4,984,3,118,-28,'test@mail.com','2023-07-24 06:57:32','2023-07-24 06:57:59'),(64,4,160,3,300,180,'test@mail.com','2023-07-24 07:13:39','2023-07-24 07:14:03'),(65,4,209,3,334,0,'test@mail.com','2023-07-24 07:14:04','2023-07-24 07:14:21'),(66,4,112,3,332,360,'test@mail.com','2023-07-24 07:14:22','2023-07-24 07:14:41'),(67,4,210,3,440,180,'test@mail.com','2023-07-24 07:14:54','2023-07-24 07:15:51'),(68,4,157,3,474,0,'test@mail.com','2023-07-24 07:15:11','2023-07-24 07:15:50'),(69,4,224,3,575,180,'test@mail.com','2023-07-24 07:15:56','2023-07-24 07:18:27'),(70,4,105,3,440,180,'test@mail.com','2023-07-24 07:16:17','2023-07-24 07:17:04'),(71,4,174,3,610,0,'test@mail.com','2023-07-24 07:17:55','2023-07-24 07:20:01'),(72,4,172,3,712,-32,'test@mail.com','2023-07-24 07:19:19','2023-07-24 07:20:54'),(73,4,210,3,771,148,'test@mail.com','2023-07-24 07:20:03','2023-07-24 07:20:53'),(74,4,273,3,773,-32,'test@mail.com','2023-07-24 07:20:20','2023-07-24 07:21:06'),(75,4,308,3,832,148,'test@mail.com','2023-07-24 07:21:26','2023-07-24 07:21:35'),(76,4,385,2,303,90,'owner@mail.com','2023-07-24 07:21:52','2023-07-26 13:57:16'),(77,4,494,2,300,90,'owner@mail.com','2023-07-24 07:22:24','2023-07-24 07:22:49'),(78,4,601,2,301,90,'owner@mail.com','2023-07-24 07:23:01','2023-08-04 06:46:33'),(79,4,723,2,302,90,'owner@mail.com','2023-07-24 07:23:29','2023-08-01 13:48:18'),(80,4,387,2,430,0,'owner@mail.com','2023-07-24 07:23:58','2023-07-28 09:00:12'),(81,4,386,2,562,0,'owner@mail.com','2023-07-24 07:24:32','2023-08-04 06:58:38'),(82,4,401,2,672,76,'owner@mail.com','2023-07-24 07:24:43','2023-07-28 09:00:15'),(83,4,521,2,644,76,'owner@mail.com','2023-07-24 07:25:14','2023-07-28 09:00:16'),(84,4,642,2,609,76,'owner@mail.com','2023-07-24 07:25:27','2023-07-28 09:00:21'),(85,4,770,2,581,76,'owner@mail.com','2023-07-24 07:25:55','2023-07-29 09:03:13'),(86,4,70,3,169,148,'test@mail.com','2023-07-24 09:15:57','2023-07-24 09:16:05');
/*!40000 ALTER TABLE `desk_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-04 16:42:42
