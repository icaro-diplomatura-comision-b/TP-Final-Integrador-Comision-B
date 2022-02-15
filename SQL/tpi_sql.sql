-- creacion de la database

DROP DATABASE IF EXISTS `icaro_tpi`;
CREATE DATABASE `icaro_tpi`;
USE `icaro_tpi`;

-- creacion de tablas
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(45) NOT NULL,
  `country` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_country_idx` (`country`),
  CONSTRAINT `city_country` FOREIGN KEY (`country`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `country` int DEFAULT NULL,
  `city` int DEFAULT NULL,
  `notDeleteable` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `users_city_idx` (`city`),
  KEY `user_country_idx` (`country`),
  CONSTRAINT `user_city` FOREIGN KEY (`city`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_country` FOREIGN KEY (`country`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `senderId` int NOT NULL,
  `receiverId` int NOT NULL,
  `text` varchar(144) NOT NULL,
  `notDeleteable` tinyint NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `messages_sender_idx` (`senderId`),
  KEY `messages_receiver_idx` (`receiverId`),
  CONSTRAINT `message_receiver` FOREIGN KEY (`receiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_sender` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- datos de ejemplo
INSERT INTO `countries` VALUES
	(1,'Tatooine'),
    (2,'Kashyyyk'),
    (3,'Argentina'),
    (4,'Uruguay');

INSERT INTO `cities` VALUES
	(1,'Sand Place',1),
	(2,'Big Forest',2),
	(3,'Córdoba',3),
	(4,'Neuquén',3),
	(5,'Montevideo',4);

INSERT INTO `users` VALUES
	(1,'luke.sky','Luke','Skywalker','lastjedi123',1,NULL,1),
	(2,'chewie','Chew','Bacca','rawwwr',2,NULL,1),
	(3,'icarle','Ignacio','Carle','456789',3,NULL,0),
	(4,'briva','Bruno','Riva','745896',3,NULL,0),
	(5,'yodaiam','Master','Yoda','123123',NULL,NULL,0);

INSERT INTO `messages` VALUES
	(1,1,1,'Mensaje de prueba de Luke Skywalker',1,'2022-02-11 01:23:39'),
    (2,1,2,'Chewie, a dónde nos dirijimos?',1,'2022-02-11 01:23:39'),
    (3,2,1,'Raaaawwwwrr',1,'2022-02-11 01:23:39'),
    (4,1,2,'Muy bien, preparémonos para el salto al hiperespacio!',1,'2022-02-11 01:23:39'),
    (6,1,2,'hola que tal',0,'2022-02-12 01:23:39'),
    (7,3,4,'Hola Bruno',0,'2022-02-12 01:23:39'),
    (8,2,3,'RWRWRRA',0,'2022-02-13 01:23:39');
   
-- procedimientos almacenados del ejercicio "c"
DELIMITER ;;
CREATE PROCEDURE `sp_login`(
	in `p_username` varchar(45),
	in `p_password` varchar(45),
    out `o_success` tinyint)
BEGIN
if exists(select `users`.`username` from `icaro_tpi`.`users` where `username` = `p_username` and `password` = `p_password`)
then select 1 into o_success;
else select 0 into o_success;
end if;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE PROCEDURE `sp_newmsg`(
	in p_sender int,
    in p_receiver int,
    text varchar(144))
BEGIN
insert into messages (senderId, receiverId, text)
values (p_sender, p_receiver, text);
END ;;
DELIMITER ;

-- consulta ejercicio "d" para obtencion de mjes recibidos por usuario
-- // lo hicimos con procedimientos para poder pasar el parámetro de usuario receptor
DELIMITER ;;
CREATE PROCEDURE `sp_messages_by_receiver`(in p_receiver int)
BEGIN
SELECT senderId, receiverId, text FROM icaro_tpi.messages where receiverId = p_receiver;
END ;;
DELIMITER ;

-- consulta ejercicio "e" para obtencion de mjes enviados por usuario
-- // lo hicimos con procedimientos para poder pasar el parámetro de usuario emisor
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_messages_by_sender`(in p_sender int)
BEGIN
SELECT senderId, receiverId, text FROM icaro_tpi.messages where senderId = p_sender;
END ;;
DELIMITER ;

-- consultas ejercicio "f"
-- Cantidad de usuarios por país.
select countries.countryName as "country", count(users.id) as "users_count"
	from countries
    left join users
    on countries.id = users.country
    group by countries.id
    order by users_count desc;
    
-- Cantidad de mensajes por usuario.
select users.username as "user", count(messages.id) as "msgs_sent_count"
	from users
    left join messages
    on users.id = messages.senderId
    group by users.id
	order by msgs_sent_count desc;
        
-- Cantidad de mensajes leídos por usuario
select users.username as "user", count(messages.id) as "msgs_received_count"
	from users
    left join messages
    on users.id = messages.receiverId
    group by users.id
	order by msgs_received_count desc;
        
-- Cantidad de mensajes por fecha.
select date(time) as "date", count(messages.id) as "messages"
	from messages
    group by date;
