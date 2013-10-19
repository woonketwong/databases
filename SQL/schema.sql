DROP DATABASE IF EXISTS `chat`;

CREATE DATABASE chat;

USE chat;

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` TINYINT AUTO_INCREMENT,
  `user_id` TINYINT(50),
  `room_id` TINYINT(100),
  `text` VARCHAR(140),
  `createdAt` TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` TINYINT AUTO_INCREMENT,
  `username` VARCHAR(50),
  `room_id` TINYINT,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` TINYINT AUTO_INCREMENT,
  `roomName` VARCHAR(100),
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users_friends`;

CREATE TABLE `users_friends` (
  `id` TINYINT AUTO_INCREMENT,
  `user_id` TINYINT,
  `friend_id` TINYINT,
  PRIMARY KEY (`id`)
);
