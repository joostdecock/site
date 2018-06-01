-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 17, 2018 at 07:31 PM
-- Server version: 10.0.34-MariaDB-0ubuntu0.16.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freesewing_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` smallint(6) NOT NULL,
  `user` int(5) NOT NULL,
  `comment` text NOT NULL,
  `page` tinytext NOT NULL,
  `time` datetime NOT NULL,
  `status` enum('active','removed','restricted') NOT NULL DEFAULT 'active',
  `parent` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `confirmations`
--

CREATE TABLE `confirmations` (
  `id` int(6) NOT NULL,
  `data` text NOT NULL,
  `time` datetime NOT NULL,
  `expires` datetime NOT NULL,
  `nonce` varchar(64) NOT NULL,
  `hash` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `drafts`
--

CREATE TABLE `drafts` (
  `id` int(5) NOT NULL,
  `user` int(5) NOT NULL,
  `pattern` varchar(64) NOT NULL,
  `model` int(5) NOT NULL,
  `name` varchar(64) NOT NULL,
  `handle` varchar(5) NOT NULL,
  `data` text NOT NULL,
  `svg` mediumtext,
  `compared` mediumtext NOT NULL,
  `created` datetime NOT NULL,
  `shared` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE `errors` (
  `id` int(5) NOT NULL,
  `type` enum('php-error','php-exception','js-error') NOT NULL,
  `level` int(4) NOT NULL,
  `message` varchar(510) NOT NULL,
  `file` varchar(255) NOT NULL,
  `line` int(4) NOT NULL,
  `origin` varchar(128) NOT NULL,
  `user` varchar(5) DEFAULT NULL,
  `ip` varchar(16) DEFAULT NULL,
  `time` datetime NOT NULL,
  `status` enum('new','open','muted','closed') NOT NULL DEFAULT 'new',
  `hash` varchar(40) NOT NULL,
  `raw` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int(5) NOT NULL,
  `user` int(5) NOT NULL,
  `name` varchar(64) NOT NULL,
  `handle` varchar(5) NOT NULL,
  `breasts` tinyint(1) NOT NULL,
  `body` enum('female','male','other') DEFAULT NULL COMMENT 'true is female, false is male',
  `picture` tinytext NOT NULL,
  `data` text NOT NULL,
  `units` enum('metric','imperial') NOT NULL DEFAULT 'metric',
  `created` datetime NOT NULL,
  `migrated` tinyint(1) NOT NULL DEFAULT '0',
  `shared` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
  `id` int(6) NOT NULL,
  `host` tinytext NOT NULL,
  `path` tinytext NOT NULL,
  `url` text NOT NULL,
  `site` tinytext,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(6) NOT NULL,
  `type` varchar(32) NOT NULL,
  `data` text NOT NULL,
  `notBefore` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL COMMENT 'user id',
  `email` varchar(255) NOT NULL COMMENT 'email address',
  `username` varchar(32) NOT NULL,
  `handle` varchar(5) NOT NULL COMMENT 'a random string that uniquely identifies the user. Used in URLs instead of user id to prevent scraping',
  `status` enum('inactive','active','blocked') NOT NULL DEFAULT 'inactive' COMMENT 'user status',
  `profileConsent` tinyint(1) NOT NULL DEFAULT '0',
  `modelConsent` tinyint(1) NOT NULL DEFAULT '0',
  `objectsToOpenData` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL COMMENT 'user activation date/time',
  `migrated` datetime DEFAULT NULL,
  `login` datetime DEFAULT NULL COMMENT 'date/time of the user''s last login',
  `role` enum('user','moderator','admin') NOT NULL,
  `patron` int(1) NOT NULL DEFAULT '0',
  `patronSince` datetime DEFAULT NULL,
  `picture` varchar(12) NOT NULL,
  `locale` char(2) NOT NULL DEFAULT 'en',
  `units` enum('metric','imperial') NOT NULL DEFAULT 'metric',
  `theme` varchar(32) NOT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `data` text COMMENT 'user data for API in JSON',
  `ehash` char(64) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `initial` varchar(255) NOT NULL COMMENT 'Email address the user signed up with',
  `pepper` char(64) NOT NULL COMMENT 'Random string used for reset tokens and such'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Holds user data';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confirmations`
--
ALTER TABLE `confirmations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hash` (`hash`);

--
-- Indexes for table `drafts`
--
ALTER TABLE `drafts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `model` (`model`),
  ADD KEY `handle` (`handle`);

--
-- Indexes for table `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hash` (`hash`),
  ADD KEY `status` (`status`),
  ADD KEY `origin` (`origin`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `handle` (`handle`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `ehash` (`ehash`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=305;
--
-- AUTO_INCREMENT for table `confirmations`
--
ALTER TABLE `confirmations`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `drafts`
--
ALTER TABLE `drafts`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4562;
--
-- AUTO_INCREMENT for table `errors`
--
ALTER TABLE `errors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1466;
--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5158;
--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52321;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'user id', AUTO_INCREMENT=5740;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
