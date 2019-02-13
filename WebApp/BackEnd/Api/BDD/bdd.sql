-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mer 13 Février 2019 à 09:42
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
-- Structure de la table `link`
--

CREATE TABLE `link` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `updated` tinyint(1) NOT NULL DEFAULT 0,
  `subscribe_id` int(11) NOT NULL,
  `config_action` text DEFAULT NULL,
  `config_reaction` text DEFAULT NULL,
  `datas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `link`
--

INSERT INTO `link` (`id`, `user_id`, `updated`, `subscribe_id`, `config_action`, `config_reaction`, `datas`) VALUES
(1, 1, 0, 1, '{\"skinName\": \"Moonrise\"}', '{\"to\": \"poubelleapipoubelle@gmail.com\"}', '{\"skinName\": \"Moonrise\", \"vBucks\": \"1200\" , \"url\": \"https://cdn.thetrackernetwork.com/cdn/fortnite/797C6306_large.png\"}'),
(2, 1, 0, 2, '{\"skinName\": \"Sanctum\"}', '{\"method\": \"POST\", \"url\": \"https://hookb.in/QJL2wRV962t9r92dlVEY\", \"headers\" : null}', '{\"skinName\": \"Sanctum\", \"vBucks\": \"1500\" , \"url\": \"https://cdn.thetrackernetwork.com/cdn/fortnite/13926359_large.png\"}'),
(3, 1, 0, 3, '{\"name\": \"funny\", \"created\": \"1549993465\"}', '{\"to\": \"poubelleapipoubelle@gmail.com\"}', '{\"title\":\"*cries in native american*\",\"author\":\"Sean_Lock\",\"url\":\"https://i.redd.it/06uiu8n4z3g21.png\",\"created\":1549993465}'),
(4, 1, 0, 4, '{\"name\": \"funny\", \"created\": \"1549993465\"}', '{\"method\": \"POST\", \"url\": \"https://hookb.in/QJL2wRV962t9r92dlVEY\", \"headers\" : null}', '{\"title\":\"*cries in native american*\",\"author\":\"Sean_Lock\",\"url\":\"https://i.redd.it/06uiu8n4z3g21.png\",\"created\":1549993465}'),
(5, 1, 0, 5, '{\"token\": \"azerty12345\"}', '{\"to\": \"poubelleapipoubelle@gmail.com\"}', NULL),
(6, 1, 1, 6, '{\"platform\": \"pc\", \"pseudo\": \"RelaxasFr\"}', '{\"to\": \"poubelleapipoubelle@gmail.com\"}', '{\"accountId\":\"83aa13a9-5980-4e2a-b4bb-1c4247e6dcc0\",\"ratio\":\"1.59\",\"matches\":\"617\",\"kills\":\"958\",\"top1\":\"14\",\"winPourcentage\":\"2%\"}'),
(7, 1, 1, 7, '{\"platform\": \"pc\", \"pseudo\": \"RelaxasFr\"}', '{\"method\": \"GET\", \"url\": \"https://hookb.in/QJL2wRV962t9r92dlVEY\", \"headers\" : null}', '{\"accountId\":\"83aa13a9-5980-4e2a-b4bb-1c4247e6dcc0\",\"ratio\":\"1.59\",\"matches\":\"617\",\"kills\":\"958\",\"top1\":\"14\",\"winPourcentage\":\"2%\"}');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `filename` varchar(40) NOT NULL,
  `datas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `service`
--

INSERT INTO `service` (`id`, `filename`, `datas`) VALUES
(1, 'fortnite', '{\"lastUpdate\": \"2019-02-13 09:27:12\"}'),
(2, 'mail', NULL),
(3, 'reddit', NULL),
(15, 'http', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `subscribe`
--

CREATE TABLE `subscribe` (
  `id` int(11) NOT NULL,
  `filename` varchar(40) NOT NULL,
  `datas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `subscribe`
--

INSERT INTO `subscribe` (`id`, `filename`, `datas`) VALUES
(1, 'fortnite-shop-mail', NULL),
(2, 'fortnite-shop-http', NULL),
(3, 'reddit-mail', NULL),
(4, 'reddit-http', NULL),
(5, 'http-mail', NULL),
(6, 'fortnite-stats-mail', NULL),
(7, 'fortnite-stats-http', NULL);

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
(39, 'JeanPaul2', 'poubelleapipoubelle@gmail.com', '64a50932049ddff830412e0fd9edb30198bf17f3'),
(40, 'Marco22LaFrappe22', 'poubelleapipoubelle@gmail.com', '9cf95dacd226dcf43da376cdb6cbba7035218921'),
(41, 'MarcoPaulo', 'poubelleapipoubelle@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8'),
(42, 'MarcoPaulo4', 'poubelleapipoubelle@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8');

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
(23, 'Marco', 'poubelleapipoubelle@gmail.com', '9cf95dacd226dcf43da376cdb6cbba7035218921', '2019-02-05 09:34:59', '4857kf8pfvm48uzyn1w95g'),
(25, 'Marco2', 'poubelleapipoubelle@gmail.com', '9cf95dacd226dcf43da376cdb6cbba7035218921', '2019-02-05 09:35:54', 'vyy9e7bcp3r2bgea7v09d'),
(26, 'Marco22', 'poubelleapipoubelle@gmail.com', '9cf95dacd226dcf43da376cdb6cbba7035218921', '2019-02-05 09:36:17', 't5rbxsks39l069q8x36ji'),
(27, 'Marco22LaFrappe', 'poubelleapipoubelle@gmail.com', '9cf95dacd226dcf43da376cdb6cbba7035218921', '2019-02-05 09:37:18', 'f4wqdk9n2j1kf3cprngbi'),
(29, 'Marco22LaFrappe2', 'poubelleapipoubelle@gmail.com', '9cf95dacd226dcf43da376cdb6cbba7035218921', '2019-02-05 09:40:00', 'x3jjr2hpgmn3yr8kmyorf7');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`filename`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `subscribe`
--
ALTER TABLE `subscribe`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`filename`),
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
-- AUTO_INCREMENT pour la table `link`
--
ALTER TABLE `link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pour la table `subscribe`
--
ALTER TABLE `subscribe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT pour la table `user_tmp`
--
ALTER TABLE `user_tmp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
