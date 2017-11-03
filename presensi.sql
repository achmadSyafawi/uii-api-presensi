-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2017 at 02:12 PM
-- Server version: 10.1.8-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `presensi`
--

-- --------------------------------------------------------

--
-- Table structure for table `absensi`
--

CREATE TABLE `absensi` (
  `id` int(10) NOT NULL,
  `tgl` date NOT NULL,
  `masuk` time NOT NULL,
  `keluar` time NOT NULL,
  `ijin` time NOT NULL,
  `foto` varchar(100) NOT NULL,
  `id_lokasi` int(10) NOT NULL,
  `id_pegawai` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `absensi`
--

INSERT INTO `absensi` (`id`, `tgl`, `masuk`, `keluar`, `ijin`, `foto`, `id_lokasi`, `id_pegawai`) VALUES
(1, '2016-12-28', '03:39:00', '17:00:00', '00:00:00', '1.jpg', 1, '1234'),
(3, '2016-12-28', '07:39:00', '17:00:00', '00:00:00', '1.jpg', 1, '1234'),
(4, '2016-12-28', '03:40:00', '17:00:00', '00:00:00', '2.jpg', 1, '2');

-- --------------------------------------------------------

--
-- Table structure for table `face_detections`
--

CREATE TABLE `face_detections` (
  `id` int(10) NOT NULL,
  `id_pegawai` int(10) NOT NULL,
  `foto` varchar(30) NOT NULL,
  `kode` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `face_detections`
--

INSERT INTO `face_detections` (`id`, `id_pegawai`, `foto`, `kode`) VALUES
(1, 1234, '1.jpg', '1234 4567 8989'),
(2, 2, '2.jpg', '2222 3333 4444');

-- --------------------------------------------------------

--
-- Table structure for table `lokasi`
--

CREATE TABLE `lokasi` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `longi` varchar(30) NOT NULL,
  `lati` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lokasi`
--

INSERT INTO `lokasi` (`id`, `name`, `longi`, `lati`) VALUES
(1, 'FTI', '2134567', '2134568'),
(2, 'FPSB', '213111', '213222');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `id` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `nidn` varchar(11) NOT NULL,
  `pangkat` varchar(30) NOT NULL,
  `jabatan` varchar(30) NOT NULL,
  `program_studi` varchar(30) NOT NULL,
  `id_lokasi` int(10) NOT NULL,
  `id_face` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`id`, `name`, `nidn`, `pangkat`, `jabatan`, `program_studi`, `id_lokasi`, `id_face`) VALUES
('1234', 'awi', '1123', 'dosen', 'dosen', 'fti', 1, 1),
('2', 'achmad', '22341', 'dosen', 'rektor', 'FTI', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`) VALUES
(1, 'awi', 'awi', '123456'),
(2, 'achmad', 'achmad', '123456'),
(4, 'awi', 'awi', '123456'),
(5, 'awi', 'awi', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `face_detections`
--
ALTER TABLE `face_detections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lokasi`
--
ALTER TABLE `lokasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `face_detections`
--
ALTER TABLE `face_detections`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `lokasi`
--
ALTER TABLE `lokasi`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
