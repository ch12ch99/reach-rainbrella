-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-06-09 10:21:55
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `rain`
--

-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

CREATE TABLE `account` (
  `account_Id` int(5) NOT NULL,
  `account_Name` varchar(15) NOT NULL,
  `account_Phone` varchar(10) NOT NULL,
  `account_Email` varchar(30) NOT NULL,
  `account_Card` varchar(16) NOT NULL,
  `account_Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`account_Id`, `account_Name`, `account_Phone`, `account_Email`, `account_Card`, `account_Password`) VALUES
(1, 'a', '0911111111', 'a@mail.com', '1234', '1111'),
(2, 'b', '0922222222', 'b@mail.com', '2345', '2222'),
(3, 'c', '0933333333', 'c@mail.com', '3456', '3333'),
(4, 'd', '0944444444', 'd@mail.com', '4567', '4444'),
(5, 'e', '0955555555', 'e@mail.com', '5678', '5555'),
(6, '', '', '', '', ''),
(7, 'mynam', '09', 'IDIOT', '92929', '10945'),
(8, '', '', '', '', ''),
(9, '1', '1', '1', '1', '1');

-- --------------------------------------------------------

--
-- 資料表結構 `blacklist`
--

CREATE TABLE `blacklist` (
  `blacklist_Id` int(5) NOT NULL,
  `account_Id` int(5) NOT NULL,
  `blacklist_Reason` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `blacklist`
--

INSERT INTO `blacklist` (`blacklist_Id`, `account_Id`, `blacklist_Reason`) VALUES
(1, 1, '多次預約借傘未取'),
(2, 2, '多次提醒未還傘'),
(3, 3, '其他');

-- --------------------------------------------------------

--
-- 資料表結構 `machine`
--

CREATE TABLE `machine` (
  `machine_Id` int(5) NOT NULL,
  `machine_Name` varchar(10) NOT NULL,
  `machine_Umbrella` int(11) NOT NULL,
  `machine_Address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `machine`
--

INSERT INTO `machine` (`machine_Id`, `machine_Name`, `machine_Umbrella`, `machine_Address`) VALUES
(3, 'Costco', 80, '輔大醫院'),
(4, 'Dick', 70, '514巷側門口'),
(5, 'Egg', 65, '捷運輔大站'),
(6, 'Frog', 40, '好市多新莊店'),
(7, 'dog', 20, '文開樓'),
(8, 'fg', 20, '博達樓'),
(9, 'FUC', 20, '肌腱樓'),
(10, '5656', 6565, '5656');

-- --------------------------------------------------------

--
-- 資料表結構 `manager`
--

CREATE TABLE `manager` (
  `manager_Id` int(10) NOT NULL,
  `manager_Account` varchar(30) NOT NULL,
  `manager_Name` varchar(15) NOT NULL,
  `manager_Password` varchar(20) NOT NULL,
  `manager_Phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `manager`
--

INSERT INTO `manager` (`manager_Id`, `manager_Account`, `manager_Name`, `manager_Password`, `manager_Phone`) VALUES
(1, 'M0001', 'CaptainNeko61', 'Homies80', '0991111111'),
(2, 'M0002', 'Woody', '77713one', '0992222222'),
(3, 'M0003', 'Maniee', '8787asd', '0993333333'),
(4, 'M0004', 'Sandy', 'zxczxc', '0994444444'),
(5, '5', '5', '5', '5');

-- --------------------------------------------------------

--
-- 資料表結構 `record`
--

CREATE TABLE `record` (
  `record_Id` int(5) NOT NULL,
  `Umbrella_Id` int(5) NOT NULL,
  `account_Id` int(5) NOT NULL,
  `record_Whereout` datetime NOT NULL,
  `record_Wherein` datetime NOT NULL,
  `record_Whenout` datetime NOT NULL,
  `record_Whenin` datetime NOT NULL,
  `record_Deduction` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `umbrella`
--

CREATE TABLE `umbrella` (
  `umbrella_Id` int(5) NOT NULL,
  `Machine_Id` int(5) NOT NULL,
  `umbrella_Type` varchar(10) NOT NULL,
  `umbrella_Status` varchar(10) NOT NULL DEFAULT '位於機台'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `umbrella`
--

INSERT INTO `umbrella` (`umbrella_Id`, `Machine_Id`, `umbrella_Type`, `umbrella_Status`) VALUES
(2, 5, '摺疊傘', '位於機台'),
(4, 4, '一般傘', '位於機台'),
(5, 6, '一般傘', '位於機台');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_Id`);

--
-- 資料表索引 `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`blacklist_Id`),
  ADD KEY `fk` (`account_Id`);

--
-- 資料表索引 `machine`
--
ALTER TABLE `machine`
  ADD PRIMARY KEY (`machine_Id`);

--
-- 資料表索引 `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`manager_Id`);

--
-- 資料表索引 `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`record_Id`),
  ADD KEY `fk1` (`account_Id`),
  ADD KEY `fk2` (`Umbrella_Id`);

--
-- 資料表索引 `umbrella`
--
ALTER TABLE `umbrella`
  ADD PRIMARY KEY (`umbrella_Id`),
  ADD KEY `fk3` (`Machine_Id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `account`
--
ALTER TABLE `account`
  MODIFY `account_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `blacklist_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `machine`
--
ALTER TABLE `machine`
  MODIFY `machine_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `manager`
--
ALTER TABLE `manager`
  MODIFY `manager_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `record`
--
ALTER TABLE `record`
  MODIFY `record_Id` int(5) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `umbrella`
--
ALTER TABLE `umbrella`
  MODIFY `umbrella_Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `blacklist`
--
ALTER TABLE `blacklist`
  ADD CONSTRAINT `fk` FOREIGN KEY (`account_Id`) REFERENCES `account` (`account_Id`) ON UPDATE CASCADE;

--
-- 資料表的限制式 `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`account_Id`) REFERENCES `account` (`account_Id`),
  ADD CONSTRAINT `fk2` FOREIGN KEY (`Umbrella_Id`) REFERENCES `umbrella` (`umbrella_Id`);

--
-- 資料表的限制式 `umbrella`
--
ALTER TABLE `umbrella`
  ADD CONSTRAINT `fk3` FOREIGN KEY (`Machine_Id`) REFERENCES `machine` (`machine_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
