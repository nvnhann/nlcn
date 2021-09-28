-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th9 26, 2021 lúc 04:39 PM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ct466`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dia_chi`
--

CREATE TABLE `dia_chi` (
  `iddc` varchar(100) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `mac_dinh` int(11) NOT NULL,
  `idtk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `dia_chi`
--

INSERT INTO `dia_chi` (`iddc`, `diachi`, `mac_dinh`, `idtk`) VALUES
('', 'Ninh kieu, Can tho', 1, 'user20210925181110'),
('', 'Ngã bảy, Hậu Giang', 1, 'user20210925181205');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoa_don`
--

CREATE TABLE `hoa_don` (
  `idhd` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `sdt` varchar(12) NOT NULL,
  `dia_chi` varchar(100) NOT NULL,
  `tong_gia` float NOT NULL,
  `tai_khoan_idtk` varchar(255) NOT NULL,
  `tran_thai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ngon_ngu`
--

CREATE TABLE `ngon_ngu` (
  `idnn` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ngon_ngu` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `ngon_ngu`
--

INSERT INTO `ngon_ngu` (`idnn`, `ngon_ngu`) VALUES
('tg20210921194548', 'Tieng Anh');

--
-- Bẫy `ngon_ngu`
--
DELIMITER $$
CREATE TRIGGER `create_ngonngu` BEFORE INSERT ON `ngon_ngu` FOR EACH ROW SET NEW.idnn = CONCAT('tg',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_cung_cap`
--

CREATE TABLE `nha_cung_cap` (
  `idncc` varchar(100) NOT NULL,
  `tenncc` varchar(255) NOT NULL,
  `dia_chi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bẫy `nha_cung_cap`
--
DELIMITER $$
CREATE TRIGGER `create_ncc` BEFORE INSERT ON `nha_cung_cap` FOR EACH ROW SET NEW.idncc = CONCAT('ncc',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_xuat_ban`
--

CREATE TABLE `nha_xuat_ban` (
  `idnxb` varchar(100) CHARACTER SET utf8 NOT NULL,
  `tennxb` varchar(255) CHARACTER SET utf8 NOT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `nha_xuat_ban`
--

INSERT INTO `nha_xuat_ban` (`idnxb`, `tennxb`, `dia_chi`) VALUES
('nxb20210913191938', 'NXB Hội Nhà Văn', ''),
('nxb20210913201843', 'NXB Hà Nội', ''),
('nxb20210920232119', 'Van Nhan', 'Chau thanh, Hau Giang'),
('nxb20210920233117', 'Long thanh', 'Ninh kieu, Can Tho');

--
-- Bẫy `nha_xuat_ban`
--
DELIMITER $$
CREATE TRIGGER `create_nxb` BEFORE INSERT ON `nha_xuat_ban` FOR EACH ROW SET NEW.idnxb = CONCAT('nxb',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhom_the_loai`
--

CREATE TABLE `nhom_the_loai` (
  `idntl` varchar(100) NOT NULL,
  `tenntl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Đang đổ dữ liệu cho bảng `nhom_the_loai`
--

INSERT INTO `nhom_the_loai` (`idntl`, `tenntl`) VALUES
('ntl20210921215630', 'Văn học');

--
-- Bẫy `nhom_the_loai`
--
DELIMITER $$
CREATE TRIGGER `create_ntl` BEFORE INSERT ON `nhom_the_loai` FOR EACH ROW SET NEW.idntl = CONCAT('ntl',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `otp`
--

CREATE TABLE `otp` (
  `email` varchar(50) NOT NULL,
  `otp` varchar(20) NOT NULL,
  `expiration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `otp`
--

INSERT INTO `otp` (`email`, `otp`, `expiration_time`) VALUES
('emb1809570@student.ctu.edu.vn', '771840', '2021-09-12 17:01:58'),
('linhb1809252@student.ctu.edu.vn', '501577', '2021-09-13 16:41:40'),
('linhb1809253@student.ctu.edu.vn', '881150', '2021-09-12 17:02:36'),
('nhanb1809272@student.ctu.edu.vn', '446738', '2021-09-25 11:15:46'),
('nvnhan.conf@gmail.com', '166116', '2021-09-25 11:16:36'),
('yb1805736@student.ctu.edu.vn', '751046', '2021-09-12 17:00:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sach`
--

CREATE TABLE `sach` (
  `idsach` varbinary(100) NOT NULL,
  `tensach` varbinary(100) DEFAULT NULL,
  `hinhanh` varbinary(255) DEFAULT NULL,
  `mo_ta` varbinary(255) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `hinh_thuc_bia` varchar(255) DEFAULT NULL,
  `trong_luong` float DEFAULT NULL,
  `so_trang` int(11) DEFAULT NULL,
  `idtg` varchar(100) NOT NULL,
  `idnn` varchar(100) NOT NULL,
  `idnxb` varchar(100) NOT NULL,
  `idkt` varchar(100) NOT NULL,
  `idncc` varchar(100) NOT NULL,
  `idtl` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sach_kich_thuoc`
--

CREATE TABLE `sach_kich_thuoc` (
  `idkt` varchar(100) NOT NULL,
  `kt_ngang` float NOT NULL,
  `kt_doc` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `sach_kich_thuoc`
--

INSERT INTO `sach_kich_thuoc` (`idkt`, `kt_ngang`, `kt_doc`) VALUES
('kt20210921204510', 18, 19),
('kt20210921210440', 18, 20);

--
-- Bẫy `sach_kich_thuoc`
--
DELIMITER $$
CREATE TRIGGER `create_ktsach` BEFORE INSERT ON `sach_kich_thuoc` FOR EACH ROW SET NEW.idkt = CONCAT('kt',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tac_gia`
--

CREATE TABLE `tac_gia` (
  `idtg` varchar(100) CHARACTER SET utf8 NOT NULL,
  `hotentg` varchar(50) CHARACTER SET utf8 NOT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tac_gia`
--

INSERT INTO `tac_gia` (`idtg`, `hotentg`, `dia_chi`) VALUES
('tg20210921185001', 'Xuan Dieu', 'Can Tho');

--
-- Bẫy `tac_gia`
--
DELIMITER $$
CREATE TRIGGER `create_tacgia` BEFORE INSERT ON `tac_gia` FOR EACH ROW SET NEW.idtg = CONCAT('tg',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `idtk` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `quyen` varchar(255) DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`idtk`, `email`, `mat_khau`, `quyen`) VALUES
('user20210907192047', 'nvnhan.dev@gmail.com', '$2a$08$9A0Ex1yp6wu1bi3tFjy4kO2w3T/VXCq3RWSM3PHkBGeJNFEy.LJx2', 'ADMIN'),
('user20210925181110', 'nhanb1809272@student.ctu.edu.vn', '$2a$08$vAGYi0vYMDM.CXq1aGCicu2u94hPP7.vVCC.PxopfFxU9gap95ahq', 'USER'),
('user20210925181205', 'nvnhan.conf@gmail.com', '$2a$08$hl6jUk8PP5IHng0iR2HWVuXuQAnjaHoKikdydoyEFOc1G47o4QjlS', 'USER');

--
-- Bẫy `tai_khoan`
--
DELIMITER $$
CREATE TRIGGER `create_user` BEFORE INSERT ON `tai_khoan` FOR EACH ROW SET NEW.idtk = CONCAT('user',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `the_loai`
--

CREATE TABLE `the_loai` (
  `idtl` varchar(100) NOT NULL,
  `tentl` varchar(255) NOT NULL,
  `idntl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Đang đổ dữ liệu cho bảng `the_loai`
--

INSERT INTO `the_loai` (`idtl`, `tentl`, `idntl`) VALUES
('tl20210921224333', 'Tiểu thuyết', 'ntl20210921215630');

--
-- Bẫy `the_loai`
--
DELIMITER $$
CREATE TRIGGER `create_tl` BEFORE INSERT ON `the_loai` FOR EACH ROW SET NEW.idtl = CONCAT('tl',NOW()+1)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_tin_tk`
--

CREATE TABLE `thong_tin_tk` (
  `id` varchar(255) NOT NULL,
  `ho` varchar(20) NOT NULL,
  `ten` varchar(20) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `idtk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `thong_tin_tk`
--

INSERT INTO `thong_tin_tk` (`id`, `ho`, `ten`, `sdt`, `idtk`) VALUES
('pf20210925181323', 'Nguyễn', 'Nam', '0764154478', 'user20210907192047'),
('pf20210925181323', 'Nguyễn', 'Nhẫn', '0794351150', 'user20210925181110'),
('pf20210925181422', 'Nguyễn', 'Linh', '0784156631', 'user20210925181205');

--
-- Bẫy `thong_tin_tk`
--
DELIMITER $$
CREATE TRIGGER `create_profile` BEFORE INSERT ON `thong_tin_tk` FOR EACH ROW SET NEW.id = CONCAT('pf',NOW()+1)
$$
DELIMITER ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD PRIMARY KEY (`idtk`,`iddc`);

--
-- Chỉ mục cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD PRIMARY KEY (`idhd`,`tai_khoan_idtk`),
  ADD KEY `tai_khoan-hoa_don` (`tai_khoan_idtk`);

--
-- Chỉ mục cho bảng `ngon_ngu`
--
ALTER TABLE `ngon_ngu`
  ADD PRIMARY KEY (`idnn`);

--
-- Chỉ mục cho bảng `nha_cung_cap`
--
ALTER TABLE `nha_cung_cap`
  ADD PRIMARY KEY (`idncc`);

--
-- Chỉ mục cho bảng `nha_xuat_ban`
--
ALTER TABLE `nha_xuat_ban`
  ADD PRIMARY KEY (`idnxb`);

--
-- Chỉ mục cho bảng `nhom_the_loai`
--
ALTER TABLE `nhom_the_loai`
  ADD PRIMARY KEY (`idntl`);

--
-- Chỉ mục cho bảng `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `sach`
--
ALTER TABLE `sach`
  ADD PRIMARY KEY (`idsach`,`idtg`,`idnn`,`idnxb`,`idkt`,`idncc`,`idtl`),
  ADD KEY `idtg` (`idtg`),
  ADD KEY `idnn` (`idnn`),
  ADD KEY `idnxb` (`idnxb`),
  ADD KEY `idkt` (`idkt`),
  ADD KEY `idncc` (`idncc`),
  ADD KEY `idtl` (`idtl`);

--
-- Chỉ mục cho bảng `sach_kich_thuoc`
--
ALTER TABLE `sach_kich_thuoc`
  ADD PRIMARY KEY (`idkt`,`kt_ngang`,`kt_doc`);

--
-- Chỉ mục cho bảng `tac_gia`
--
ALTER TABLE `tac_gia`
  ADD PRIMARY KEY (`idtg`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`idtk`);

--
-- Chỉ mục cho bảng `the_loai`
--
ALTER TABLE `the_loai`
  ADD PRIMARY KEY (`idtl`,`idntl`),
  ADD KEY `idntl` (`idntl`);

--
-- Chỉ mục cho bảng `thong_tin_tk`
--
ALTER TABLE `thong_tin_tk`
  ADD PRIMARY KEY (`idtk`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD CONSTRAINT `dia_chi_ibfk_1` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `tai_khoan-hoa_don` FOREIGN KEY (`tai_khoan_idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `sach`
--
ALTER TABLE `sach`
  ADD CONSTRAINT `sach_ibfk_1` FOREIGN KEY (`idtg`) REFERENCES `tac_gia` (`idtg`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sach_ibfk_2` FOREIGN KEY (`idnn`) REFERENCES `ngon_ngu` (`idnn`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sach_ibfk_3` FOREIGN KEY (`idnxb`) REFERENCES `nha_xuat_ban` (`idnxb`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sach_ibfk_4` FOREIGN KEY (`idkt`) REFERENCES `sach_kich_thuoc` (`idkt`),
  ADD CONSTRAINT `sach_ibfk_5` FOREIGN KEY (`idncc`) REFERENCES `nha_cung_cap` (`idncc`),
  ADD CONSTRAINT `sach_ibfk_6` FOREIGN KEY (`idtl`) REFERENCES `the_loai` (`idtl`);

--
-- Các ràng buộc cho bảng `the_loai`
--
ALTER TABLE `the_loai`
  ADD CONSTRAINT `the_loai_ibfk_1` FOREIGN KEY (`idntl`) REFERENCES `nhom_the_loai` (`idntl`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `thong_tin_tk`
--
ALTER TABLE `thong_tin_tk`
  ADD CONSTRAINT `thong_tin_tk_ibfk_1` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
