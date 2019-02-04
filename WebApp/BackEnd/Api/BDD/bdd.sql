-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 04 Février 2019 à 12:20
-- Version du serveur :  10.2.21-MariaDB-10.2.21+maria~stretch
-- Version de PHP :  7.2.14-1+0~20190113100742.14+stretch~1.gbpd83c69

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `area`
--

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `service`
--

INSERT INTO `service` (`id`, `name`) VALUES
(6, 'fortnite'),
(9, 'http'),
(8, 'radio'),
(10, 'reddit'),
(5, 'rss'),
(1, 'weather');

-- --------------------------------------------------------

--
-- Structure de la table `subscribe`
--

CREATE TABLE `subscribe` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `updated` tinyint(1) NOT NULL DEFAULT 0,
  `action_service_id` int(11) NOT NULL,
  `reaction_service_id` int(11) NOT NULL,
  `config_action_data` text DEFAULT NULL,
  `action_data` text DEFAULT NULL,
  `config_reaction_data` text DEFAULT NULL,
  `reaction_data` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `subscribe`
--

INSERT INTO `subscribe` (`id`, `user_id`, `updated`, `action_service_id`, `reaction_service_id`, `config_action_data`, `action_data`, `config_reaction_data`, `reaction_data`) VALUES
(1, 1, 0, 9, 9, '{\"token\": \"azerty12345\"}', NULL, '{\"method\": \"post\", \"body\": \"{\\\"name\\\": \\\"bob\\\", \\\"phone\\\": \\\"0011002233\\\"}\", \"headers\": null, \"url\": \"https://hookb.in/xYQ6MoQmN1UdOdY1j2WB\", \"bucket\": \"[\\\"school\\\"]\"}', 'null'),
(2, 1, 0, 1, 5, '', NULL, '', NULL),
(3, 33, 0, 1, 6, NULL, NULL, NULL, NULL),
(5, 1, 0, 10, 9, NULL, NULL, '{\"method\": \"post\", \"body\": \"{\\\"name\\\": \\\"bob\\\", \\\"phone\\\": \\\"0011002233\\\"}\", \"headers\": null, \"url\": \"https://hookb.in/xYQ6MoQmN1UdOdY1j2WB\", \"bucket\": \"[\\\"school\\\"]\"}', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(1, 'admin', 'poubelleapipoubelle@gmail.com', '1288426f72c0e95d1c03023ec8853ca200724c86'),
(33, 'bob', 'poubelleapipoubelle@gmail.com', '1288426f72c0e95d1c03023ec8853ca200724c86'),
(35, 'jack', 'poubelleapipoubelle@gmail.com', '1288426f72c0e95d1c03023ec8853ca200724c86'),
(36, 'Enzo', 'poubelleapipoubelle@gmail.com', '9712514327aa8a076ee7c2db398085610dfbdec0'),
(37, 'Robin', 'poubelleapipoubelle@gmail.com', '9712514327aa8a076ee7c2db398085610dfbdec0'),
(38, 'Salut', 'poubelleapipoubelle@gmail.com', 'd1980e7b5ffd959bb5697591a53450c57d91e7b5'),
(39, 'JeanPaul2', 'poubelleapipoubelle@gmail.com', '64a50932049ddff830412e0fd9edb30198bf17f3');

-- --------------------------------------------------------

--
-- Structure de la table `user_tmp`
--

CREATE TABLE `user_tmp` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `date` timestamp NULL DEFAULT current_timestamp(),
  `token` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `user_tmp`
--

INSERT INTO `user_tmp` (`id`, `username`, `email`, `password`, `date`, `token`) VALUES
(14, 'PetitPierre', 'sddsfff', '9712514327aa8a076ee7c2db398085610dfbdec0', '2019-01-29 14:46:33', '17t1t21svcn6qmnzsteq9a'),
(16, 'PetitPierresdfdf', 'sddsfff', '9712514327aa8a076ee7c2db398085610dfbdec0', '2019-01-29 14:47:23', 'nwt17dpdxeo3reu785xv6w'),
(17, 'dffsf', 'sddsfff', '9712514327aa8a076ee7c2db398085610dfbdec0', '2019-01-29 14:47:52', 'zb85mwtmxah861qlxcgdws'),
(19, 'JeanJack', 'poubelleapipoubelle@gmail.com', '64a50932049ddff830412e0fd9edb30198bf17f3', '2019-01-30 14:23:40', 't0h7y3m4oo84tejt34r6pm'),
(20, 'JeanPaul', 'poubelleapipoubelle@gmail.com', '64a50932049ddff830412e0fd9edb30198bf17f3', '2019-01-30 14:26:31', 'iamig78qr62vvl97oqrsf');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `subscribe`
--
ALTER TABLE `subscribe`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `user_tmp`
--
ALTER TABLE `user_tmp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT pour la table `subscribe`
--
ALTER TABLE `subscribe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT pour la table `user_tmp`
--
ALTER TABLE `user_tmp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
