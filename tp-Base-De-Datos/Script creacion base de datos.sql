/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `messenger` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `messenger`;

CREATE TABLE IF NOT EXISTS `city` (
  `id` bigint NOT NULL,
  `name` varchar(50) NOT NULL,
  `country_id` bigint NOT NULL,
  KEY `id` (`id`),
  KEY `FK_city_country` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `country` (
  `id` bigint NOT NULL,
  `name` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_country_city` FOREIGN KEY (`id`) REFERENCES `city` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_to` bigint NOT NULL,
  `user_from` bigint NOT NULL,
  `message_text` varchar(144) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reg_date` datetime NOT NULL,
  `message_read` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `FK_message_user_to` (`user_to`),
  KEY `FK_message_user_from` (`user_from`),
  CONSTRAINT `FK_message_user_from` FOREIGN KEY (`user_from`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_message_user_to` FOREIGN KEY (`user_to`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

DELIMITER //
CREATE PROCEDURE `rep_messages_by_date`()
BEGIN

	SELECT DATE_FORMAT(m.reg_date, "%Y.%m.%d") AS DATE, COUNT(*) AS message_number
	FROM message m
	INNER JOIN user f ON f.id = m.user_from	
	GROUP BY DATE_FORMAT(m.reg_date, "%Y.%m.%d")
	ORDER BY 2 DESC;

END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `rep_messages_by_user`()
BEGIN

	SELECT f.username, COUNT(*) AS message_count
	FROM message m
	INNER JOIN user f ON f.id = m.user_from	
	GROUP BY f.username
	ORDER BY 2 DESC;

END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `rep_messages_read_by_user`()
BEGIN

	SELECT f.username, COUNT(*) AS message_count, SUM(message_read) AS message_read
	FROM message m
	INNER JOIN user f ON f.id = m.user_from	
	GROUP BY f.username
	ORDER BY 2 DESC;

END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `rep_user_by_country`()
BEGIN

	SELECT co.id, co.name AS country, COUNT(*) AS user_count
	FROM user u
	INNER JOIN city c ON u.city = c.id
	INNER JOIN country co ON c.country_id = co.id
	GROUP BY co.id, co.name
	ORDER BY 3 DESC;

END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sp_delete_message`(
	IN `MessageId` BIGINT
)
BEGIN

	DELETE FROM message
	WHERE id = MessageId;

END//
DELIMITER ;

DELIMITER //
CREATE FUNCTION `sp_login`(
	`User` VARCHAR(100),
	`Pass` VARCHAR(100)
) RETURNS int
    DETERMINISTIC
BEGIN
	
	DECLARE logged BIGINT;
	SET logged = 0;

	SELECT id INTO logged 
	FROM user
	WHERE username = user AND PASSWORD = Pass;

	RETURN logged;

END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sp_read_conversation`(
	IN `UserFrom` VARCHAR(100),
	IN `UserTo` VARCHAR(100)
)
BEGIN

	SELECT m.id AS messageid, f.username AS user_from, t.username AS user_to, m.message_text, m.reg_date
	FROM message m
	INNER JOIN user t ON t.id = m.user_to	
	INNER JOIN user f ON f.id = m.user_from	
	WHERE (f.username = UserFrom AND t.username = UserTo) OR (f.username = UserTo AND t.username = UserFrom)
	ORDER BY reg_date;

END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sp_read_message`(
	IN `UserFrom` VARCHAR(100),
	IN `UserTo` VARCHAR(100)
)
BEGIN

	SELECT f.username AS user_from, t.username AS user_to, m.message_text, m.reg_date
	FROM message m
	INNER JOIN user t ON t.id = m.user_to	
	INNER JOIN user f ON f.id = m.user_from	
	WHERE f.username = UserFrom AND t.username = UserTo
	ORDER BY reg_date;

END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sp_send_message`(
	IN `UserFrom` VARCHAR(100),
	IN `UserTo` VARCHAR(100),
	IN `Message` VARCHAR(144)
)
BEGIN

	DECLARE id_from BIGINT;
	DECLARE id_to BIGINT;
	
	SELECT id INTO id_from FROM user WHERE username = UserFrom;
	SELECT id INTO id_to FROM user WHERE username = UserTo;
	
	INSERT INTO message (user_from, user_to, MESSAGE_TEXT, reg_date)
	VALUES (id_from, id_to, Message, NOW());


END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sp_update_message`(
	IN `MessageId` BIGINT,
	IN `MessageText` VARCHAR(144)
)
BEGIN

	UPDATE message
	SET MESSAGE_TEXT = MessageText
	WHERE id = MessageId;

END//
DELIMITER ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `city` bigint NOT NULL DEFAULT '0',
  `reg_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_city` (`city`),
  CONSTRAINT `FK_user_city` FOREIGN KEY (`city`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
