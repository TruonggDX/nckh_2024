-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: webstudyonline
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,NULL,NULL,0,NULL,NULL,NULL,'admin@gmail.com','trồn','$2a$10$8TyYXJ/fPzv8oxEtGK0oUu/5aYJ.LSX6kMmvw06Kr2Zxn/O9siA/q',NULL,_binary ''),(2,NULL,NULL,0,NULL,NULL,NULL,'user@gmail.com','abc','$2a$10$8TyYXJ/fPzv8oxEtGK0oUu/5aYJ.LSX6kMmvw06Kr2Zxn/O9siA/q',NULL,_binary ''),(3,NULL,'2025-02-03 21:50:44.000000',0,NULL,NULL,NULL,'teacher@gmail.com',NULL,'$2a$10$8TyYXJ/fPzv8oxEtGK0oUu/5aYJ.LSX6kMmvw06Kr2Zxn/O9siA/q',NULL,_binary ''),(9,'admin@gmail.com','2025-02-19 15:24:19.104355',0,'admin@gmail.com','2025-02-19 15:24:19.104355',NULL,'duongsmoke1@gmail.com','Lê Thái Dương','$2a$10$g7qbq2Gjw9zTqqIiYdmnXOecI7Cpg7s9wBFP2NZVFacJS5mW4hLFi','0964036886',_binary '');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_role`
--

DROP TABLE IF EXISTS `account_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_role` (
  `account_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`account_id`,`role_id`),
  KEY `FKrs2s3m3039h0xt8d5yhwbuyam` (`role_id`),
  CONSTRAINT `FK1f8y4iy71kb1arff79s71j0dh` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKrs2s3m3039h0xt8d5yhwbuyam` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_role`
--

LOCK TABLES `account_role` WRITE;
/*!40000 ALTER TABLE `account_role` DISABLE KEYS */;
INSERT INTO `account_role` VALUES (1,1),(2,1),(9,2),(3,3);
/*!40000 ALTER TABLE `account_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `amount` decimal(38,2) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgpfluataee5ad31ijyu9jfvms` (`account_id`),
  CONSTRAINT `FKgpfluataee5ad31ijyu9jfvms` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_details`
--

DROP TABLE IF EXISTS `bill_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `bill_id` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `roadmap_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7coossdaxtwjpy23knsjtua2i` (`bill_id`),
  KEY `FK3221vssjsrsj5tcndiyav577g` (`course_id`),
  KEY `FK6gqs5m5b89sy335ck1cjgg0p3` (`roadmap_id`),
  CONSTRAINT `FK3221vssjsrsj5tcndiyav577g` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FK6gqs5m5b89sy335ck1cjgg0p3` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`),
  CONSTRAINT `FK7coossdaxtwjpy23knsjtua2i` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_details`
--

LOCK TABLES `bill_details` WRITE;
/*!40000 ALTER TABLE `bill_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `roadmap_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4pljlvncf45mr98etwpubxvbt` (`account_id`),
  KEY `FKe8qhvp3rieyui6fxssjs4r34r` (`course_id`),
  KEY `FKibib9v4iaiwx8sjo93p3i1k67` (`roadmap_id`),
  CONSTRAINT `FK4pljlvncf45mr98etwpubxvbt` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKe8qhvp3rieyui6fxssjs4r34r` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKibib9v4iaiwx8sjo93p3i1k67` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (15,'user@gmail.com','2025-02-20 11:04:08.021109',NULL,'user@gmail.com','2025-02-20 11:04:08.021109',1,2,1,NULL),(16,'user@gmail.com','2025-02-20 11:04:08.030221',NULL,'user@gmail.com','2025-02-20 11:04:08.030221',3,2,8,NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,NULL,NULL,0,NULL,NULL,'T001','TOEIC'),(2,NULL,NULL,0,NULL,NULL,'I001','ILETS');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `issue_date` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `teacher_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa98hmqm0ghc2vlsu8v9kaot8e` (`teacher_id`),
  CONSTRAINT `FKa98hmqm0ghc2vlsu8v9kaot8e` FOREIGN KEY (`teacher_id`) REFERENCES `infor_teacher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `aim` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkyes7515s3ypoovxrput029bh` (`category_id`),
  CONSTRAINT `FKkyes7515s3ypoovxrput029bh` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,NULL,NULL,0,NULL,NULL,'C001','Khóa học được thiết kế dành riêng cho người mất gốc tiếng Anh lâu năm, không thể nghe audio các âm cơ bản, các từ vựng đơn lẻ và đọc hiểu từ vựng tiếng Anh ở mức độ tối thiểu.','TOEIC Tập Sự',100.00,'Đã Duyệt',1,10,'0 - 450'),(2,NULL,NULL,0,NULL,NULL,'C002','TOEIC Cơ Bản 450+ dành riêng cho người mất gốc tiếng Anh lâu năm, không thể nghe audio và đọc hiểu từ vựng tiếng Anh ở mức độ tối thiểu','TOEIC A',200.00,'Đã Duyệt',1,10,'450+'),(3,NULL,NULL,0,NULL,NULL,'C003','TOEIC 700+ dành riêng cho người mất gốc tiếng Anh lâu năm, không thể nghe audio và đọc hiểu từ vựng tiếng Anh ở mức độ tối thiểu khóa học được thiết kế đặc biệt cho những học viên đã có nền tảng tiếng Anh cơ bản và mong muốn đạt được mục tiêu 700 điểm TOE','TOEIC B',300.00,'Đã Duyệt',1,10,'700+'),(4,NULL,NULL,0,NULL,NULL,'C004','TOEIC Master (250+ TOEIC Speaking & Writing) là khóa học chuyên sâu dành cho những người đã có nền tảng tiếng Anh và muốn tập trung phát triển kỹ năng Nói và Viết ở mức độ cao','TOEIC SW',400.00,'Đã Duyệt',1,10,'master toeic'),(5,NULL,NULL,0,NULL,NULL,'C005','Tích lũy 400 từ vựng quan trọng, 21 phạm trù ngữ pháp toàn diện, hoàn thiện phát âm, ngữ điệu, nối âm, nuốt âm, trọng âm tròn vẹn.','IELTS Tập Sự',300.00,'Đã Duyệt',2,10,'0 - 5.5'),(6,NULL,NULL,0,NULL,NULL,'C006','Xây dựng tư duy, phương pháp làm các dạng bài Listening + Reading + Speaking + Writing. Viết câu, phát triển ý mạch lạc và rèn luyện cách mở rộng câu trả lời cho nhiều chủ đề.\n','IELTS A',400.00,'Đã Duyệt',2,10,'5.5+'),(7,NULL,NULL,0,NULL,NULL,'C007','Chiến lược xử lý nhanh gọn, chính xác các dạng bài toàn diện cả 4 kỹ năng. Writing nắm chắc 4 dạng biểu đồ, 4 dạng bài luận. Speaking nằm lòng 8 nhóm chủ điểm quan trọng xuất hiện trong 90% kỳ thi IELTS\n','IELTS B',500.00,'Đã Duyệt',2,10,'6.5+'),(8,NULL,NULL,0,NULL,NULL,'C008','Làm chủ mọi kỹ năng Skimming, Scanning và Read in details. Brainstorm và phát triển ý tưởng hiệu quả. Làm chủ ngôn ngữ, tăng tốc độ nói cùng các kỹ năng chuyên sâu','IELTS C',700.00,'Đã Duyệt',2,10,'7.5+');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_details`
--

DROP TABLE IF EXISTS `course_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `period` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `public_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgn7lx849uwed06vuyl04hc156` (`course_id`),
  CONSTRAINT `FKgn7lx849uwed06vuyl04hc156` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_details`
--

LOCK TABLES `course_details` WRITE;
/*!40000 ALTER TABLE `course_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `number_question` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_details`
--

DROP TABLE IF EXISTS `exam_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `number_question` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `exam_id` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK268arefjvq3txdtkqy6mijqub` (`exam_id`),
  CONSTRAINT `FK268arefjvq3txdtkqy6mijqub` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_details`
--

LOCK TABLES `exam_details` WRITE;
/*!40000 ALTER TABLE `exam_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `number_tudent` int NOT NULL,
  `number_student` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7e8ca7hfmrpruicqhocskjlf2` (`course_id`),
  CONSTRAINT `FK7e8ca7hfmrpruicqhocskjlf2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade_account`
--

DROP TABLE IF EXISTS `grade_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade_account` (
  `grade_id` bigint NOT NULL,
  `account_id` bigint NOT NULL,
  PRIMARY KEY (`grade_id`,`account_id`),
  KEY `FKc6y6gr4rhkokwcqq6rjimk73j` (`account_id`),
  CONSTRAINT `FKc6y6gr4rhkokwcqq6rjimk73j` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKfq1cp9y8jvp6fe3npgr4y9xlm` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade_account`
--

LOCK TABLES `grade_account` WRITE;
/*!40000 ALTER TABLE `grade_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `public_id` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6mthrhpjbn4uo67cuqi6tolwp` (`course_id`),
  KEY `FK37umbgqe9rxw10adl0vjah5a7` (`account_id`),
  CONSTRAINT `FK37umbgqe9rxw10adl0vjah5a7` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FK6mthrhpjbn4uo67cuqi6tolwp` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,'video/mp4',NULL,NULL,2);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infor_teacher`
--

DROP TABLE IF EXISTS `infor_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `infor_teacher` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKm4b2p10m7nhr77lrpl41p2qtm` (`account_id`),
  CONSTRAINT `FK92g7knne2u2kl3vt8fuiso45f` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infor_teacher`
--

LOCK TABLES `infor_teacher` WRITE;
/*!40000 ALTER TABLE `infor_teacher` DISABLE KEYS */;
INSERT INTO `infor_teacher` VALUES (2,NULL,NULL,1,NULL,NULL,'36 htq','2013-12-11',3,3),(8,NULL,NULL,0,NULL,NULL,'36 hstq','2024-11-11',23,2);
/*!40000 ALTER TABLE `infor_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point`
--

DROP TABLE IF EXISTS `point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `name_exam` varchar(255) DEFAULT NULL,
  `rank_level` int DEFAULT NULL,
  `score` double DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  `completion_time` bigint DEFAULT NULL,
  `exam_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhi02vy9fch2emcqetloq38jve` (`account_id`),
  KEY `FKjq2xfxdbjm84ba8sujkil1h2e` (`exam_id`),
  CONSTRAINT `FKhi02vy9fch2emcqetloq38jve` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKjq2xfxdbjm84ba8sujkil1h2e` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point`
--

LOCK TABLES `point` WRITE;
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
/*!40000 ALTER TABLE `point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap`
--

DROP TABLE IF EXISTS `roadmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(2000) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap`
--

LOCK TABLES `roadmap` WRITE;
/*!40000 ALTER TABLE `roadmap` DISABLE KEYS */;
INSERT INTO `roadmap` VALUES (1,NULL,NULL,1,NULL,NULL,'900+ toeic',15,'Toiec 4 skill',2000.00);
/*!40000 ALTER TABLE `roadmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,NULL,NULL,0,NULL,NULL,'ADMIN','ADMIN'),(2,NULL,NULL,0,NULL,NULL,'USER','USER'),(3,NULL,NULL,0,NULL,NULL,'TEACHER','TEACHER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `basic_salary` varchar(255) DEFAULT NULL,
  `bouns_salary` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKryvscdqtilwx90os2bms6ul27` (`account_id`),
  CONSTRAINT `FKryvscdqtilwx90os2bms6ul27` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary`
--

LOCK TABLES `salary` WRITE;
/*!40000 ALTER TABLE `salary` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-20 12:18:29
