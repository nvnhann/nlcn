-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 05, 2021 lúc 05:01 PM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 7.4.25

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

DELIMITER $$
--
-- Các hàm
--
CREATE DEFINER=`root`@`localhost` FUNCTION `avg_rate` (`id` VARCHAR(100)) RETURNS FLOAT BEGIN
  DECLARE rs FLOAT;
SELECT AVG(danhgia) into rs from binh_luan_danh_gia WHERE idsach = id;
  RETURN rs;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binh_luan_danh_gia`
--

CREATE TABLE `binh_luan_danh_gia` (
  `idbldg` varchar(100) NOT NULL,
  `binhluan` text DEFAULT NULL,
  `danhgia` float DEFAULT NULL,
  `thoi_gian` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idsach` varchar(100) DEFAULT NULL,
  `idtk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `binh_luan_danh_gia`
--

INSERT INTO `binh_luan_danh_gia` (`idbldg`, `binhluan`, `danhgia`, `thoi_gian`, `idsach`, `idtk`) VALUES
('BLDG01', 'Cuối cùng thì tớ đã đọc được cuốn xếp vào hàng kinh điển này sau bao ngày lần lữa. Phải nói rằng, tớ đã đọc qua nhiều quan điểm trái chiều về cuốn này trước khi đọc nó (và tớ hơi hối hận vì đã làm thế). Hầu hết thì cho rằng cuốn này xứng tầm với danh tiếng của mình, số khác cho rằng Nhà giả kim bị đánh giá quá cao, nhiều người bảo &quot;bình thường&quot;. Nhưng đọc rồi thì tớ lại có cảm nhận của riêng mình. Nhà giả kim mang hình mẫu của một câu chuyện ngụ ngôn, nhưng lại thể hiện cái tôi nhân vật nhiều. Đó là cách mà Paulo Coelho tạo dựng truyện ngụ ngôn theo kiểu của riêng ông. Bằng cách sử dụng câu chuyện của cậu chăn cừu - một câu chuyện hiện hữu và dễ hình dung, Paulo đã truyền tải những triết lý về cuộc đời, về ước mơ và cả số phận con người. Câu chuyện có lẽ hơi bình dị với một số người, nhưng chính sự giản đơn đó đã dẫn dắt thành công câu chuyện. Hành trình của cậu chăn cừu là một hành trình vừa thực vừa ảo, chân thực mà cũng có những khoảnh khắc xa lạ tưởng như mơ. Đó không chỉ là một chuyến đi thực thụ, đó còn là bước trở mình từ cậu bé chăn cừu chỉ suốt ngày quẩn quanh bên đàn cừu, đến người đàn ông trưởng thành dám ra đi để tìm kho báu đích thực. Một câu chuyện kỳ diệu và nhân văn. Với tớ, đọc sách là một dạng trải nghiệm, và nhận thức về trải nghiệm này thường dựa trên trải nghiệm trong cuộc sống. Nhiều người không đánh giá cao Nhà giả kim bởi vì với trải nghiệm đời thực của họ, câu chuyện về cậu bé chăn cừu không có gì mới lạ. Còn về phần tớ, đó lại là một câu chuyện mang tính truyền cảm cao và không quá triết lý để có thể cảm nhận được. Tóm lại, tớ hoàn toàn hài lòng về cuốn sách này. (Tuy nhiên thì với mấy cái ý kiến thần thánh hoá cuốn này thì tớ không đồng tình rồi).', 5, '2021-11-11 17:51:48', 'BOOK01', 'USER02'),
('BLDG02', ' Cuốn sách Nhà giả kim của tác giả Paulo Coelho là một trong những tác phẩm kinh điển, bestseller nên đọc. Sách kể về câu chuyện của một cậu bé chăn cừu trên con đường đi tìm kiếm kho báu khổng lồ. Câu chuyện đem đến cho bản thân em nhiều suy nghĩ và liên tưởng về cuộc sống này. Con đường cậu đi, những ngôi làng, những sa mạc, những con người cùng những cuộc gặp gỡ. Cuộc sống chính được tạo nên từ những điều như thế. Trong hành trình tiến về phía trước luôn có những khó khăn, vất vả, những mất mát hay cả những thất bại. Nhưng chúng ta nhất định phải bản lĩnh và kiên cường. Tuyệt đối không bị gục ngã trước nghịch cảnh. Và định nghĩa về những điều quý giá, chúng vẫn luôn hiện hữu xung quanh chúng ta, là tình thân, tình bạn, tình yêu,... Vậy nên đừng tìm kiếm xa xôi, hãy luôn quý trọng tất cả những gì mà mình đang có. Hẳn cuốn sách còn đem lại nhiều hơn những suy nghĩ sâu sắc, đây chỉ là những cảm nhận chung nhất của em. Cuốn sách rất hay, rất đáng mua đọc ạ.', 4, '2021-12-05 15:07:09', 'BOOK01', 'USER03');

--
-- Bẫy `binh_luan_danh_gia`
--
DELIMITER $$
CREATE TRIGGER `them_binh_luan_danh_gia` BEFORE INSERT ON `binh_luan_danh_gia` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("BLDG0",SUBSTRING(idbldg,6)+1) FROM binh_luan_danh_gia ORDER BY idbldg DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idbldg = 'BLDG01';
ELSE SET NEW.idbldg = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_hd`
--

CREATE TABLE `chi_tiet_hd` (
  `id_cthd` varchar(100) NOT NULL,
  `idhd` varchar(100) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `gia` float DEFAULT NULL,
  `idsach` varchar(100) DEFAULT NULL,
  `phan_tram` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_hd`
--

INSERT INTO `chi_tiet_hd` (`id_cthd`, `idhd`, `so_luong`, `gia`, `idsach`, `phan_tram`) VALUES
('CTHD01', 'HD01', 1, 12, 'BOOK01', 0),
('CTHD02', 'HD02', 2, 12, 'BOOK01', 0),
('CTHD03', 'HD03', 1, 14, 'BOOK05', 0),
('CTHD04', 'HD03', 1, 12, 'BOOK02', 0),
('CTHD05', 'HD03', 1, 9, 'BOOK03', 0);

--
-- Bẫy `chi_tiet_hd`
--
DELIMITER $$
CREATE TRIGGER `them_cthd` BEFORE INSERT ON `chi_tiet_hd` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("CTHD0",SUBSTRING(id_cthd,6)+1) FROM chi_tiet_hd ORDER BY id_cthd DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.id_cthd = 'CTHD01';
ELSE SET NEW.id_cthd = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dia_chi`
--

CREATE TABLE `dia_chi` (
  `iddc` varchar(100) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `hoten` varchar(50) NOT NULL,
  `mac_dinh` int(11) NOT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `idtk` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `dia_chi`
--

INSERT INTO `dia_chi` (`iddc`, `diachi`, `hoten`, `mac_dinh`, `sdt`, `idtk`) VALUES
('DC01', 'Cần Thơ', 'Nguyễn Văn Nhẫn', 0, '0794351150', 'USER01'),
('DC02', 'Hậu Giang', 'Trần Hoàng Nam', 0, '0794351142', 'USER01'),
('DC03', 'Vi Thanh', 'Huỳnh Như', 0, '0794351150', 'USER02'),
('DC04', 'Vi Thanh', 'Hồng Nguyên', 0, '0794351150', 'USER02'),
('DC06', 'Nam Dinh', 'Nguyễn Hà', 0, '0794351120', 'USER02'),
('DC07', 'Vị Thanh - Hậu Giang', 'Nguyễn Văn Nhẫn', 1, '0369452145', 'USER02');

--
-- Bẫy `dia_chi`
--
DELIMITER $$
CREATE TRIGGER `them_dia_chi` BEFORE INSERT ON `dia_chi` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("DC0",SUBSTRING(iddc,4)+1) FROM dia_chi ORDER BY iddc DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.iddc = 'DC01';
ELSE SET NEW.iddc = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoa_don`
--

CREATE TABLE `hoa_don` (
  `idhd` varchar(100) NOT NULL,
  `iddc` varchar(100) NOT NULL,
  `email_paypal` varchar(50) NOT NULL,
  `tong_gia` float NOT NULL,
  `Idtk` varchar(255) NOT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `thoi_gian` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `hoa_don`
--

INSERT INTO `hoa_don` (`idhd`, `iddc`, `email_paypal`, `tong_gia`, `Idtk`, `trang_thai`, `thoi_gian`) VALUES
('HD01', 'DC06', 'nvnhan.conf@personal.com', 12, 'USER02', 2, '2021-12-04 13:03:06'),
('HD02', 'DC06', 'nvnhan.conf@personal.com', 24, 'USER02', 4, '2021-12-04 13:03:13'),
('HD03', 'DC06', 'nvnhan.conf@personal.com', 35, 'USER02', 0, '2021-12-04 12:55:08');

--
-- Bẫy `hoa_don`
--
DELIMITER $$
CREATE TRIGGER `them_hoa_don` BEFORE INSERT ON `hoa_don` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("HD0",SUBSTRING(idhd,4)+1) FROM hoa_don ORDER BY SUBSTRING(idhd,4)*1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idhd = 'HD01';
ELSE SET NEW.idhd = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khuyen_mai`
--

CREATE TABLE `khuyen_mai` (
  `idkm` varchar(100) NOT NULL,
  `phan_tram` int(11) DEFAULT NULL,
  `ngay_bd_km` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ngay_het_km` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `idsach` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `khuyen_mai`
--

INSERT INTO `khuyen_mai` (`idkm`, `phan_tram`, `ngay_bd_km`, `ngay_het_km`, `idsach`) VALUES
('KM01', 10, '2021-11-11 16:08:00', '2021-11-22 15:08:00', 'BOOK01'),
('KM02', 15, '2021-12-05 05:00:00', '2021-12-21 14:09:00', 'BOOK02');

--
-- Bẫy `khuyen_mai`
--
DELIMITER $$
CREATE TRIGGER `them_khuyen_mai` BEFORE INSERT ON `khuyen_mai` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("KM0",SUBSTRING(idkm,4)+1) FROM khuyen_mai ORDER BY idkm DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idkm = 'KM01';
ELSE SET NEW.idkm = id;
END IF;
END
$$
DELIMITER ;

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
('NN01', 'Tiếng việt'),
('NN02', 'Tiếng Anh');

--
-- Bẫy `ngon_ngu`
--
DELIMITER $$
CREATE TRIGGER `them_ngon_ngu` BEFORE INSERT ON `ngon_ngu` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("NN0",SUBSTRING(idnn,3)+1) FROM ngon_ngu ORDER BY idnn DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idnn = 'NN01';
ELSE SET NEW.idnn = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_cung_cap`
--

CREATE TABLE `nha_cung_cap` (
  `idncc` varchar(100) NOT NULL,
  `tenncc` varchar(255) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `dia_chi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `nha_cung_cap`
--

INSERT INTO `nha_cung_cap` (`idncc`, `tenncc`, `sdt`, `dia_chi`) VALUES
('NCC01', 'Nhã Nam', '0462391859', '59 Đỗ Quang, phường Trung Hoà, quận Cầu Giấy, Hà Nội '),
('NCC02', 'Bách Việt', '0931012021', '42A Nguyễn Bá Huân, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam'),
('NCC03', 'NXB Trẻ', '0920022200', '161B Lý Chính Thắng, Phường 7, Quận 3 , TP. Hồ Chí Minh'),
('NCC04', 'AZ Việt Nam', '0702022021', ' Số 50 - Đường 5 - Khu tập thể F361 - phố An Dương - P. Yên Phụ - Q.Tây Hồ - HN'),
('NCC05', 'Định Ti', '0761122021', 'Nhà NV22 - Khu 12 - Ngõ 13 Lĩnh Nam - P. Mai Động - Q. Hoàng Mai - TP. Hà Nội'),
('NCC06', 'Skybooks', '0831122021', 'Số 83 Lý Nam Đế, Phường Cửa Đông'),
('NCC07', 'ZGROUP', '0764212021', '7/14 Trần Mai Ninh, Phường 12, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam');

--
-- Bẫy `nha_cung_cap`
--
DELIMITER $$
CREATE TRIGGER `them_nha_cung_cap` BEFORE INSERT ON `nha_cung_cap` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("NCC0",SUBSTRING(idncc,5)+1) FROM nha_cung_cap ORDER BY SUBSTRING(idncc,5) *1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idncc = 'NCC01';
ELSE SET NEW.idncc = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_xuat_ban`
--

CREATE TABLE `nha_xuat_ban` (
  `idnxb` varchar(100) CHARACTER SET utf8 NOT NULL,
  `tennxb` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `nha_xuat_ban`
--

INSERT INTO `nha_xuat_ban` (`idnxb`, `tennxb`, `sdt`, `dia_chi`) VALUES
('NXB01', 'NXB Hội Nhà Văn', '0901012000', '65, Nguyễn Du, quận Hai Bà Trưng, Hà Nội'),
('NXB02', 'NXB Lao Động', '0931012021', 'Nhà xuất bản Lao Động Địa chỉ: 175 Giảng Võ, Q. Đống Đa, Hà Nội'),
('NXB03', 'NXB Trẻ', '0931121992', '161B Lý Chính Thắng, Phường 7, Quận 3 , TP. Hồ Chí Minh'),
('NXB04', 'NXB Thanh Niên', '0701012000', '64 Bà Triệu, Hoàn Kiếm, Hà Nội'),
('NXB05', 'NXB Phụ Nữ Việt Nam', '0361122020', '39 Hàng Chuối, Q. Hai Bà Trưng, Hà Nội'),
('NXB06', 'NXB Hà Nội', '0834012000', 'Số 4, phố Tống Duy Tân, quận Hoàn Kiếm, Hà Nội');

--
-- Bẫy `nha_xuat_ban`
--
DELIMITER $$
CREATE TRIGGER `them_nha_xuat_ban` BEFORE INSERT ON `nha_xuat_ban` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("NXB0",SUBSTRING(idnxb,5)+1) FROM nha_xuat_ban ORDER BY SUBSTRING(idnxb,5)*1 DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idnxb = 'NXB01';
ELSE SET NEW.idnxb = id;
END IF;
END
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
('NTL01', 'Văn học'),
('NTL02', 'Tiểu sử  - hồi ký'),
('NTL03', 'Kinh tế');

--
-- Bẫy `nhom_the_loai`
--
DELIMITER $$
CREATE TRIGGER `them_nhom_the_loai` BEFORE INSERT ON `nhom_the_loai` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("NTL0",SUBSTRING(idntl,5)+1) FROM nhom_the_loai ORDER BY idntl DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idntl= 'NTL01';
ELSE SET NEW.idntl= id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sach`
--

CREATE TABLE `sach` (
  `idsach` varchar(100) NOT NULL,
  `tensach` varchar(100) DEFAULT NULL,
  `gia_sach` float NOT NULL,
  `hinhanh` varchar(255) DEFAULT NULL,
  `mo_ta` text DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL,
  `hinh_thuc_bia` varchar(255) DEFAULT NULL,
  `trong_luong` float DEFAULT NULL,
  `so_trang` int(11) DEFAULT NULL,
  `idnn` varchar(100) NOT NULL,
  `idnxb` varchar(100) NOT NULL,
  `idkt` varchar(100) NOT NULL,
  `idncc` varchar(100) NOT NULL,
  `idtl` varchar(100) NOT NULL,
  `idtg` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Đang đổ dữ liệu cho bảng `sach`
--

INSERT INTO `sach` (`idsach`, `tensach`, `gia_sach`, `hinhanh`, `mo_ta`, `so_luong`, `hinh_thuc_bia`, `trong_luong`, `so_trang`, `idnn`, `idnxb`, `idkt`, `idncc`, `idtl`, `idtg`) VALUES
('BOOK01', 'Đứa Con Gái Hoang Đàng - The Prodigal', 13, '/img/product/1636354553741-image_234117.jpg', '\r\n\"Tiếp nối cuốn tiểu thuyết nổi tiếng HAI SỐ PHẬN về William Kane và Abel Rosnovski, Đứa con gái hoang đàng là một câu chuyện được chắp bút của thế hệ tiếp theo. Câu chuyện đầy trớ trêu, trắc trở nhưng đầy nhân văn.\r\n\r\nTƯƠNG LAI CỦA CÔ LÀ THAM VỌNG\r\n\r\nFlorentyna Rosnovski – con gái Abel – với một ý chí sắt đá di truyền từ người cha, cô quyết tâm theo đuổi mục tiêu và lý tưởng của mình, đó là trở thành nữ Tổng thống Mỹ đầu tiên. Tuy thế, cuộc đời của cô, cũng giống như người cha của mình, cũng gặp vô cùng nhiều trắc trở mà người phụ nữ tham vọng này nhất định phải vượt qua.\r\n\r\nVới hình tượng được lấy cảm hứng từ những nhân cách lớn như “bà đầm thép” Margaret Thatcher, Golda Meer, hay Indira Gandhi, Jeffrey Archer đã trả lời cho độc giả những câu hỏi về cuộc đời và số phận, về ý nghĩa của cuộc sống này. Vượt qua cơn giông tố, vươn đến những vì sao chính là thông điệp mà cây bút tài ba muốn truyền tải.\"\r\n\r\nÝ NGHĨA NHAN ĐỀ\r\n\r\nTiểu thuyết Đứa con gái hoang đàng được dịch từ tên gốc The Prodigal Daughter. Cái tên này được Jeffrey Archer đặt theo một Dụ ngôn trong Kinh Thánh – The Prodigal Son. Ở Việt Nam, tích này được biết đến với cái tên Người con hoang đàng, hay Đứa con hoang đàng trở về. Cách đặt tên này tạo ra một sự kết nối chặt chẽ vói phần 1 – Hai số phận. Tiểu thuyết Hai số phận với tên gốc là Kane and Abel – vốn dĩ cũng là một biến thể của Cain and Abel – một Dụ ngôn khác trong Kinh Thánh.\r\n\r\nSỨC HẤP DẪN CỦA CUỐN SÁCH ĐỐI VỚI ĐỘC GIẢ\r\n\r\n“Một trong mười nhà văn có tài kể chuyện hay nhất thế giới.” – Los Angeles Times\r\n\r\n“Mạch truyện nhanh và lôi cuốn.” – Library Journal\r\n\r\n“Một bậc thầy trong việc pha trộn các yếu tố quyền lực, chính trị và danh vọng vào trong một cuốn tiểu thuyết.” – Entertainment Weekly\r\n\r\n“Một người kể chuyện ở đẳng cấp của Alexander Dumas, với kỹ năng vượt trội, Archer khiến độc giả không ngừng tự hỏi điều gì đang đón đợi phía trước.” – Washington Post\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.\r\n\r\nVà cuối cùng là phần 3 – Shall we tell the President, tiếp nối câu chuyện dang dở của Đứa con gái hoàng đàng.\r\nMã hàng 	9786043209679\r\nTên Nhà Cung Cấp 	Bách Việt	\r\nTác giả 	Jeffrey Archer\r\nNXB 	NXB Lao Động\r\nNăm XB 	2021\r\nTrọng lượng (gr) 	900\r\nKích Thước Bao Bì 	20.5 x 13.5 cm\r\nSố trang 	836\r\nHình thức 	Bìa Mềm\r\nSản phẩm hiển thị trong 	\r\n\r\n    Bách Việt\r\n    Ví VNPAY hoàn 50K\r\n    ZaloPay\r\n\r\nSản phẩm bán chạy nhất 	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\n\r\n\"Tiếp nối cuốn tiểu thuyết nổi tiếng HAI SỐ PHẬN về William Kane và Abel Rosnovski, Đứa con gái hoang đàng là một câu chuyện được chắp bút của thế hệ tiếp theo. Câu chuyện đầy trớ trêu, trắc trở nhưng đầy nhân văn.\r\n\r\nTƯƠNG LAI CỦA CÔ LÀ THAM VỌNG\r\n\r\nFlorentyna Rosnovski – con gái Abel – với một ý chí sắt đá di truyền từ người cha, cô quyết tâm theo đuổi mục tiêu và lý tưởng của mình, đó là trở thành nữ Tổng thống Mỹ đầu tiên. Tuy thế, cuộc đời của cô, cũng giống như người cha của mình, cũng gặp vô cùng nhiều trắc trở mà người phụ nữ tham vọng này nhất định phải vượt qua.\r\n\r\nVới hình tượng được lấy cảm hứng từ những nhân cách lớn như “bà đầm thép” Margaret Thatcher, Golda Meer, hay Indira Gandhi, Jeffrey Archer đã trả lời cho độc giả những câu hỏi về cuộc đời và số phận, về ý nghĩa của cuộc sống này. Vượt qua cơn giông tố, vươn đến những vì sao chính là thông điệp mà cây bút tài ba muốn truyền tải.\"\r\n\r\nÝ NGHĨA NHAN ĐỀ\r\n\r\nTiểu thuyết Đứa con gái hoang đàng được dịch từ tên gốc The Prodigal Daughter. Cái tên này được Jeffrey Archer đặt theo một Dụ ngôn trong Kinh Thánh – The Prodigal Son. Ở Việt Nam, tích này được biết đến với cái tên Người con hoang đàng, hay Đứa con hoang đàng trở về. Cách đặt tên này tạo ra một sự kết nối chặt chẽ vói phần 1 – Hai số phận. Tiểu thuyết Hai số phận với tên gốc là Kane and Abel – vốn dĩ cũng là một biến thể của Cain and Abel – một Dụ ngôn khác trong Kinh Thánh.\r\n\r\nSỨC HẤP DẪN CỦA CUỐN SÁCH ĐỐI VỚI ĐỘC GIẢ\r\n\r\n“Một trong mười nhà văn có tài kể chuyện hay nhất thế giới.” – Los Angeles Times\r\n\r\n“Mạch truyện nhanh và lôi cuốn.” – Library Journal\r\n\r\n“Một bậc thầy trong việc pha trộn các yếu tố quyền lực, chính trị và danh vọng vào trong một cuốn tiểu thuyết.” – Entertainment Weekly\r\n\r\n“Một người kể chuyện ở đẳng cấp của Alexander Dumas, với kỹ năng vượt trội, Archer khiến độc giả không ngừng tự hỏi điều gì đang đón đợi phía trước.” – Washington Post\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.\r\n\r\nVà cuối cùng là phần 3 – Shall we tell the President, tiếp nối câu chuyện dang dở của Đứa con gái hoàng đàng.\r\n', 47, 'Bìa mềm', 870, 836, 'NN01', 'NXB02', 'KT02', 'NCC02', 'TL01', 'TG01'),
('BOOK02', 'Con Chim Xanh Biếc Bay Về', 12, '/img/product/1638424901825-biamem.jpg', 'Con Chim Xanh Biếc Bay Về\n\nKhông giống như những tác phẩm trước đây lấy bối cảnh vùng quê miền Trung đầy ắp những hoài niệm tuổi thơ dung dị, trong trẻo với các nhân vật ở độ tuổi dậy thì, trong quyển sách mới lần này nhà văn Nguyễn Nhật Ánh lấy bối cảnh chính là Sài Gòn – Thành phố Hồ Chí Minh nơi tác giả sinh sống (như là một sự đền đáp ân tình với mảnh đất miền Nam). Các nhân vật chính trong truyện cũng “lớn” hơn, với những câu chuyện mưu sinh lập nghiệp lắm gian nan thử thách của các sinh viên trẻ đầy hoài bão. Tất nhiên không thể thiếu những câu chuyện tình cảm động, kịch tính và bất ngờ khiến bạn đọc ngẩn ngơ, cười ra nước mắt. Và như trong mọi tác phẩm Nguyễn Nhật Ánh, sự tử tế và tinh thần hướng thượng vẫn là điểm nhấn quan trọng trong quyển sách mới này.\n\nNhư một cuốn phim “trinh thám tình yêu”, Con chim xanh biếc bay về dẫn bạn đi hết từ bất ngờ này đến tò mò suy đoán khác, để kết thúc bằng một nỗi hân hoan vô bờ sau bao phen hồi hộp nghi kỵ đến khó thở.\n\nBạn sẽ theo phe sinh viên-nhân viên với những câu thơ dịu dàng và đáo để, hay phe ông chủ với những kỹ năng kinh doanh khởi nghiệp? Và hãy đoán thử, điều gì khiến bạn có thể cảm động đến rưng rưng trong cuộc sống giữa Sài Gòn bộn bề?\n\nLâu lắm mới có hình ảnh thành phố rộn ràng trong tác phẩm của Nguyễn Nhật Ánh - điều hấp dẫn khác thường của Con chim xanh biếc bay về.\n\nChính vì thế mà cuốn sách chỉ có một cách đọc thôi: một mạch từ đầu đến cuối!', 119, 'Bìa mềm', 400, 396, 'NN01', 'NXB03', 'KT03', 'NCC03', 'TL01', 'TG02'),
('BOOK03', 'Bước Chậm Lại Giữa Thế Gian Vội Vã (Tái Bản 2018)', 9, '/img/product/1638425105691-buoc_cham_lai_giua_the_gian_voi_va.u335.d20160817.t102115.612356.jpg', 'Bước Chậm Lại Giữa Thế Gian Vội Vã (Tái Bản 2018)\n\nChen vai thích cánh để có một chỗ bám trên xe buýt giờ đi làm, nhích từng xentimét bánh xe trên đường lúc tan sở, quay cuồng với thi cử và tiến độ công việc, lu bù vướng mắc trong những mối quan hệ cả thân lẫn sơ… bạn có luôn cảm thấy thế gian xung quanh mình đang xoay chuyển quá vội vàng?\n\nNếu có thể, hãy tạm dừng một bước.\n\nĐể tự hỏi, là do thế gian này vội vàng hay do chính tâm trí bạn đang quá bận rộn? Để cầm cuốn sách nhỏ dung dị mà lắng đọng này lên, chậm rãi lật giở từng trang, thong thả khám phá những điều mà chỉ khi bước chậm lại mới có thể thấu rõ: về các mối quan hệ, về chính bản thân mình, về những trăn trở trước cuộc đời và nhân thế, về bao điều lý trí rất hiểu nhưng trái tim chưa cách nào nghe theo…\n\nRa mắt lần đầu năm 2012, Bước chậm lại giữa thế gian vội vã của Đại đức Hae Min đã liên tục đứng đầu danh sách best-seller của nhiều trang sách trực tuyến uy tín của Hàn Quốc, trở thành cuốn sách chữa lành cho hàng triệu người trẻ luôn tất bật với nhịp sống hiện đại hối hả.', 89, 'Bìa mềm', 280, 254, 'NN01', 'NXB01', 'KT01', 'NCC01', 'TL01', 'TG03'),
('BOOK04', 'Tìm Em Nơi Anh - Find Me', 15, '/img/product/1638425311271-image_225272.jpg', 'Đây là cuốn tiếp theo sau \"Gọi em bằng tên anh\" (Call me by your name). Những nhân vật gặp lại, và câu chuyện nhiều năm sau, khi họ đều đã lớn tuổi hơn và có những ngã rẽ riêng trong cuộc đời mình.\nTác giả chia sẻ thêm về quyết định viết tiếp câu chuyện: \"Tôi vẫn luôn đau đáu về câu chuyện dang dở trong Gọi em bằng tên anh. Dù là người tạo nên các nhân vật và cuộc đời họ, tôi không thể ngờ rằng chính các nhân vật lại khiến tôi trăn trở về những xao động của tình yêu - điều mà tôi không hay biết cho đến khi hoàn thiện cuốn sách. Bộ phim điện ảnh chuyển thể từ cuốn tiểu thuyết đã giúp tôi nhận ra rằng mình muốn được trở lại với Elio và Oliver và tiếp tục đồng hành với 2 con người ấy\".\n\nFind Me được chia làm bốn phần: Tempo, Cadenza, Capriccio và Da Capo, như một bản nhạc lôi cuốn có nhịp điệu và hơi thở riêng, cùng những đoạn phóng túng ngẫu hứng nói lên tiếng lòng người chơi.\n\nTempo\n\nPhần đầu tiên được thuật lại bởi lời của Samuel \"Sami\" Perlman, cha của Elio Perlman. Mười năm sau các sự kiện của Call Me By Your Name, Sami Perlman gặp một người phụ nữ trẻ tuổi tên là Miranda khi đi tàu đến Rome. Hai người nhanh chóng trở nên thân thiết và bắt đầu một mối quan hệ lãng mạn. Trong khi ở Rome, cặp đôi đến thăm người cha ốm yếu của Miranda, tham dự một buổi thuyết trình công khai do Sami tổ chức và gặp được Elio.\n\nCadenza\nPhần thứ hai được thuật lại bởi lời của Elio. Năm năm sau, Elio làm giáo viên dạy piano ở Paris. Tại một buổi hòa nhạc, anh gặp một người đàn ông lớn tuổi tên là Michel, và họ bắt đầu một mối quan hệ lãng mạn. Họ đến thăm ngôi nhà thời thơ ấu của Michel ở vùng nông thôn nước Pháp, và kết thúc mối quan hệ vài tuần sau đó bởi cuối cùng, người cũ trong trái tim anh không thể thay thế.\nCapriccio\nPhần thứ ba được thuật lại bởi lời của Oliver. Vài năm sau, Oliver làm giáo sư tại một trường cao đẳng ở New Hampshire. Anh ấy đã lập gia đình và có con, nhưng trong thâm tâm lại nuôi dưỡng nỗi nhớ về khoảng thời gian anh ấy ở bên Elio khi còn là sinh viên đại học. Anh ấy đoàn tụ với Elio ở Ý, và họ kết nối lại một cách lãng mạn. Mặc dù cha của Elio đã chết, ông vẫn có một đứa con với Miranda, đặt tên theo Oliver - Ollie Nhỏ.\nDa Capo\nPhần cuối cùng được thuật lại bởi lời của Elio. Elio và Oliver lại ở cùng nhau, cùng nuôi dưỡng Ollie Nhỏ, em trai cùng cha khác mẹ của Elio. Phần kết này diễn ra không lâu sau các sự kiện trong Capriccio.', 50, 'Bìa mềm', 350, 332, 'NN01', 'NXB03', 'KT03', 'NCC03', 'TL01', 'TG04'),
('BOOK05', '999 Lá Thư Gửi Cho Chính Mình - Mong Bạn Trở Thành Phiên Bản Hoàn Hảo Nhất (Tập 1) - Tái Bản 2021', 14, '/img/product/1638425596187-999lathu-taibbb1_2.jpg', '“999 lá thư gửi cho chính mình” là một tác phẩm đặc biệt đầy cảm hứng đến từ tác giả văn học mạng nổi tiếng Miêu Công Tử, mang một màu sắc riêng biệt qua những lời thư nhỏ nhắn nhủ đến người đọc về giá trị cuộc sống, tình yêu, tuổi trẻ, tương lai… v.v.. đã làm lay động trái tim của hàng vạn độc giả trẻ. Cầm trên tay cuốn sách “999 lá thư gửi cho chính mình” – bạn sẽ hiểu rằng: tuổi trẻ của chúng ta dù có mong manh đến đâu thì cũng sẽ thành công vượt qua mọi khó khăn một cách mạnh mẽ ngoài sức tưởng tượng. Một ngày nào đó, bạn sẽ cảm nhận được hạnh phúc, tự tin của chính bản thân và học được cách mỉm cười trước những nỗi đau của quá khứ. Bạn sẽ biết cách nói lời cảm ơn với những ai đã rời bỏ bạn, hiểu ra rằng họ không phải người thích hợp để cùng đồng hành với bạn trên đoạn đường chông gai đi tới tương lai. Đôi lúc bạn có thể yếu đuối mỏi mệt rơi nước mắt, thế nhưng khi bất chợt nhìn lại, bạn sẽ thấy thì ra mình đã rất mạnh mẽ, dũng cảm đi hết cả một quãng đường dài.\n\n“999 lá thư gửi cho chính mình” – Mong bạn trở thành phiên bản hoàn hảo nhất. Cái gọi là vẻ đẹp nội tâm luôn luôn tốt hơn vẻ bề ngoài hào nhoáng, hy vọng bạn sẽ mãi luôn kiên cường, dũng cảm đứng ở nơi ánh sáng chiếu rọi, sống tốt một cuộc sống mà mình hằng mong ước.', 79, 'Bìa mềm', 250, 232, 'NN01', 'NXB04', 'KT04', 'NCC04', 'TL01', 'TG05'),
('BOOK06', 'Ngàn Năm Chờ Đợi (Tái Bản)', 7, '/img/product/1638426004482-ngan_nam_cho_doi_5a499550e6b74f79bc3a79e9790b46ec_master.jpg', 'Ngàn Năm Chờ Đợi\n\nChàng là Tuế Tinh chân quân – Thanh Ngưng, chính là ngôi sao sáng ở phương đông. Chàng có thể tạo ra vạn vật thế gian, biến khổ thành phúc, được người đời kính ngưỡng, cúng bái thờ phụng.\n\nChàng sống cô đơn cả ngàn năm trên trời, công việc chủ yếu của chàng là giúp đỡ mọi người, có một người bạn cờ là Thái Bạch Kim Tinh.\n\nMột hôm chàng thấy các tiên nữ đang dùng bùn đất để nặn hình người. Chàng đã chọn đống bùn đất có màu sáng nhất để cẩn thận nặn nặn tạc tạc. Chàng nặn rất lâu, rất nhiều lần cuối cùng nặn ra hình dáng một cô gái xinh đẹp hoàn mỹ nhất trong lòng chàng.\n\nChàng để bức tượng cô gái trong cung điện của mình, ngày ngày trò chuyện với nàng, vuốt ve mái tóc nàng, còn mặc áo quàng khăn cho nàng, tiếc rằng nàng không thể trả lời chàng. (Thực ra nàng có thể nghe được chàng nói, nhưng nàng không có linh hồn, không nói được, không có cảm giác.)\n\nÔng bạn cờ của chàng thấy chàng si mê một bức tượng đất như vậy, không đành lòng, ông ném bức tượng xuống thế gian…\n\nChàng bay theo nàng xuống thế gian nhưng không kịp cứu nàng, nàng chỉ là tượng đất, vỡ ra thành muôn mảnh, cầm một mảnh vỡ lên, chàng rơi lệ.\n\nMột giọt lệ của chàng đã giúp nàng bảo vệ nguyên thần, trải qua nhiều năm, linh hồn nàng hợp lại, bảo vệ được hình tượng hoàn mỹ trong lòng chàng… Nàng trở thành tiên nữ tên Y Vân, mới thăng thiên.\n\nTrong một yến hội trên thiên giới, chàng gặp lại nàng… Nàng lại giả như không quen biết chàng, vì sợ tình yêu sẽ ảnh hưởng đến chàng (thần tiên trên thiên giới không được yêu). Chàng đã bao che cho nàng rất nhiều lần xuống hạ giới. Nàng đã cùng Tôn Giả Kim Thiền Tử bày cách giả có tình ý để Thanh Ngưng có thể quên được nàng. Nàng và Kim Thiền Tử bị Vương mẫu nương nương trừng trị, Thanh Ngưng đã đứng ra nhận tội thay nàng.\n\nSau đó hai người chỉ có thể đầu thai luân hồi dưới trần thế mới có thể yêu nhau, ở bên nhau và đương nhiên họ nguyện lòng.\n\n', 50, 'Bìa mềm', 200, 176, 'NN01', 'NXB04', 'KT01', 'NCC05', 'TL02', 'TG06'),
('BOOK07', 'Đáp Án Của Thời Gian', 16, '/img/product/1638426481843-bia_dapanthoigian.jpg', 'ĐÁP ÁN CỦA THỜI GIAN – Thời gian chưa một lần lên tiếng, nhưng lại là đáp án cho tất cả!\n\nCuốn tiểu thuyết đầu tay của Lư Tư Hạo – Tác giả của hàng loạt những tựa sách triệu bản!\n\nCâu chuyện bắt đầu từ thời thơ ấu chẳng mấy vui vẻ của chàng trai tên Trần Dịch Dương, từ khi sinh ra cậu đã không được khỏe mạnh, phải lớn lên trong sự thờ ơ của cha mẹ, sự cô lập của bạn bè, chỉ biết bám víu vào tình yêu thương của bà nội. Trong những năm tháng niên thiếu đáng ra phải rực rỡ tươi đẹp ấy, Trần Dịch Dương mặc kẹt trong một chiếc lồng kiên cố được tạo ra bởi thành kiến và hiểu lầm, không một lối thoát.\n\nBước vào cánh cửa đại học – một xã hội thu nhỏ, cậu cố gắng cười cười nói nói, cố gắng gia nhập vào những bữa tiệc không hồi kết, cố gắng đi tìm nơi mà bản thân thực sự thuộc về, nhưng cuối cùng vẫn cứ loay hoay lạc bước trong những tháng ngày đằng đẵng.\n\nThế nhưng trên con đường tưởng như kéo dài vô tận đó, cậu chưa từng một lần dừng lại. Và rồi thời gian cũng cho cậu một đáp án.\n\nĐó chính là Đổng Tiểu Mãn – cô gái duy nhất vẫn luôn ngồi trên chuyến xe cuộc đời của Trần Dịch Dương, trải qua nhiều trạm dừng song chưa từng một lần bước xuống, một mực chờ đợi cậu nhìn về phía mình. Thời gian đã lấy mất thời niên thiếu rực rỡ của Trần Dịch Dương, để rồi trả lại cho cậu ‘một người có cùng nhịp bước’ mà cậu vẫn luôn kiếm tìm.\n\nChúng ta ai cũng từng phải hứng chịu những trận mưa yên ắng trên biển rộng, phải lớn lên theo cách khắc nghiệt và đau lòng. Nhưng sau cùng, mọi điều xảy ra trong quá khứ sẽ tạo thành chúng ta của hiện tại. Chẳng một ai có quyền năng quay ngược thời gian, việc mà chúng ta làm chỉ có thể là cố gắng sống tốt và chờ đợi đáp án của nó. Bởi thời gian tuy chưa từng một lần lên tiếng, nhưng sẽ là đáp án cho tất cả.\n\nVới cách kể chuyện chậm rãi mà dịu dàng bằng những con chữ như chạm đến ngóc ngách trái tim độc giả, Lư Tư Hạo đã viết nên một cuốn tiểu thuyết đầy rung cảm về tuổi trẻ - “Đáp án của thời gian”.\n\nĐây không phải một cuốn sách bạn có thể đọc trong một buổi tối, cũng không phải loại tiểu thuyết bạn có thể đọc lướt cho xong. Hãy nhâm nhi cuốn sách này tựa một tách trà chiều, bởi sau chút đắng chát chính là vị ngọt nơi đầu lưỡi. Giống như sau khi kiên nhẫn chờ đợi, thời gian sẽ tìm mọi cách mang đến cho bạn một đáp án mà thôi.', 70, 'Bìa mềm', 350, 312, 'NN01', 'NXB05', 'KT02', 'NCC06', 'TL02', 'TG05'),
('BOOK08', 'Gần Mặt Cách Lòng', 8, '/img/product/1638426760618-gan-mat-cach-long.jpg', 'Để báo ơn, Thẩm Mặc đồng ý thực hiện một giao dịch kỳ lạ với quý ngài doanh nhân thành đạt– Quý Minh Hiên, để bảo toàn hạnh phúc vẹn tròn cho em gái của ngài Quý. Cậu vô tình vướng vào một mối quan hệ phức tạp, hoàn toàn không biết phải làm sao, chỉ ngày ngày ngẩn ngơ nhung nhớ mối tình cũ của thời thanh xuân tươi đẹp.\n\nĐến khi Thẩm Mặc nhận ra đâu mới là tình yêu đích thực của mình, thì cái người vẫn luôn sớm tối bên cậu đã không còn ở bên cậu nữa rồi.\n\nĐôi nét tác giả\n\nKHỐN Ỷ NGUY LÂU\n\nBút danh Khốn Ỷ Nguy Lâu bắt nguồn từ một câu trong bài thơ \"Giảm tự mộc lan hoa\" của nhà thơ Tần Quán thời Bắc Tống, có nghĩa là \"đau khổ tựa lầu\".\n\nSinh ra tại thành phố Hàng Châu, tỉnh Chiết Giang, Khốn Ỷ Nguy Lâu là nữ tác giả nổi tiếng trong cộng đồng văn học mạng Trung Quốc với lối hành văn tinh tế, xây dựng tình huống sinh động cùng ngòi bút đầy cảm xúc chân thành.\n\nCác tác phẩm tiêu biểu: “Bình hoa”, “Mộng xưa”, “Chiết chi”, “Đối diện tương tư” (tạm dịch), “Người bên gối” (tạm dịch), “Một thoáng phong lưu” (tạm dịch),…\n\n', 45, 'Bìa mềm', 450, 424, 'NN01', 'NXB06', 'KT02', 'NCC07', 'TL02', 'TG08'),
('BOOK09', 'Nhiệt Độ Xã Giao', 12, '/img/product/1638426897891-nhietdoxagiao.jpg', 'Nhiệt Độ Xã Giao\n\n“Này, ông có biết người ta bảo ‘kỳ thị đồng tính tức  gay ngầm’ không?”\n\n“Tôi thấy cũng có lý phết đấy, ông nghĩ sao?”\n\nTống Viễn Tuần – một gã trai thẳng vừa lạnh lùng vừa đẹp trai nhưng lại kỳ thị đồng tình. Qua lời kể của một người bạn mà trở nên không có thiện cảm với du học sinh trao đổi Phương Chiêu Mộ. Cảm xúc không thích hình thành ngay từ khi chưa gặp mặt và càng rõ ràng hơn đến khi gặp bởi mùi hương quá ngọt trên cơ thể cậu.\n\nPhương Chiêu Mộ - một cậu trai vốn dĩ rất hoạt bát, vui vẻ trong cuộc sống nhưng vì sự ghét bỏ ngầm của Tống Viễn Tuần mà quãng đời sinh viên trao đổi tưởng chừng như đẹp đẽ của cậu hoàn toàn chấm dứt. Trở thành một người khép kín hơn, luôn thui thủi một mình và bị cô lập.\n\nHai con người tưởng chừng như chẳng có nổi một điểm nào có thể chạm nhau trên cuộc đời của họ thì ông mối – Triệu Hàm vừa trực tiếp lại gián tiếp se duyên cho cả hai qua phần mềm kết bạn. Từ đó Mu – Phương Chiêu Mộ và Andrew – Tống Viễn Tuần với vai diễn là chàng kỹ sư 29 tuổi quen nhau. Chính nhờ có Andrew mà cuộc sống của Phương Chiêu Mộ trở nên tươi sáng, vui vẻ và có mục đích hơn.\n\nNhưng nếu Mu và Andrew càng ngày càng gần nhau hơn, thân cận nhau hơn bao nhiều thì khoảng cách giữa Phương Chiêu Mộ và Tống Viễn Tuần lại cách xa nhau bấy nhiêu… Sự xa lánh của Phương Chiêu Mộ dành cho Tống Viễn Tuần chính là điều khiến anh không biết phải làm sao để cho Andrew đối mặt với cậu ngoài đời.\n\n“Mộ Mộ,” Tống Viễn Tuần cất tiếng, “em cứ xem tôi là Andrew đi. Nếu có chỗ nào khác thì tôi sẽ thay đổi cho giống.”\n“Những gì hồi trước làm sai, tôi sẽ sửa lại từng chút một. Em thấy không vui thì mắng tôi thế nào cũng được.”\n“Tình cảm của tôi không đáng giá, em cứ mang ra mà dùng, tình cảm của em rất đáng giá, nên em đừng đòi lấy lại.”\n\nNhiệt độ xã giao – Cuốn sách nhẹ nhàng, dịu dàng nhưng không kém phần thực tế mà ngoài xã hội chúng ta ai cũng từng thấy, trải nghiệm về một cuộc sống nịnh nọt, vụ lợi, cô lập,.. diễn ra hằng ngày. Chỉ là chẳng phải ai cũng đủ may mắn như Phương Chiêu Mộ may mắn có một Tống Viễn Tuần yêu thương mình!', 140, 'Bìa mềm', 300, 382, 'NN01', 'NXB03', 'KT02', 'NCC03', 'TL02', 'TG09');

--
-- Bẫy `sach`
--
DELIMITER $$
CREATE TRIGGER `them_sach` BEFORE INSERT ON `sach` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("BOOK0",SUBSTRING(idsach,6)+1) FROM sach ORDER BY idsach DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idsach= 'BOOK01';
ELSE SET NEW.idsach= id;
END IF;
END
$$
DELIMITER ;

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
('KT01', 13, 20.5),
('KT02', 13.5, 20.5),
('KT03', 13, 20),
('KT04', 12.5, 18);

--
-- Bẫy `sach_kich_thuoc`
--
DELIMITER $$
CREATE TRIGGER `them_kich_thuoc` BEFORE INSERT ON `sach_kich_thuoc` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("KT0",SUBSTRING(idkt,4)+1) FROM sach_kich_thuoc ORDER BY idkt DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idkt = 'KT01';
ELSE SET NEW.idkt = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tac_gia`
--

CREATE TABLE `tac_gia` (
  `idtg` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT 'TG1',
  `hotentg` varchar(50) CHARACTER SET utf8 NOT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `tac_gia`
--

INSERT INTO `tac_gia` (`idtg`, `hotentg`, `dia_chi`) VALUES
('TG01', 'Jeffrey Archer', ''),
('TG010', 'Cố mạn', ''),
('TG02', 'Nguyễn Nhật Ánh', ''),
('TG03', 'Hae Min', ''),
('TG04', 'André Aciman', ''),
('TG05', 'Miêu Công Tử', ''),
('TG06', 'Diệp Lạc Vô Tâm', ''),
('TG07', 'Lư Tư Hạo', ''),
('TG08', 'Khốn Ỷ Nguy Lâu', ''),
('TG09', 'Carbeeq', '');

--
-- Bẫy `tac_gia`
--
DELIMITER $$
CREATE TRIGGER `them_tac_gia` BEFORE INSERT ON `tac_gia` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("TG0",SUBSTRING(idtg,4)+1) FROM tac_gia ORDER BY SUBSTRING(idtg,4) * 1 DESC LIMIT 1
);

IF id IS NULL 
THEN SET NEW.idtg = 'TG0001';
ELSE SET NEW.idtg = id;
END IF;
END
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
('USER01', 'nvnhan.dev@gmail.com', '$2a$08$dvwlEEDTFfwzOvU26mB.ZeOPjUEWY9rlvXaNV.nJsEhYLZXNp2UXK', 'ADMIN'),
('USER02', 'nhanb1809272@student.ctu.edu.vn', '$2a$10$WzhIgn70rvKvKBwJcW8EUuxCaBIC2hX4vqOmKYOgjIPLulFvHBiBm', 'USER'),
('USER03', 'nvnhan.d@gmail.com', '$2a$08$kCfu6eDjZhEQ8of1dJIn9.H5yRk.JjnnqEpFK1DVrTvZkW.4wHOYm', 'USER');

--
-- Bẫy `tai_khoan`
--
DELIMITER $$
CREATE TRIGGER `them_tai_khoan` BEFORE INSERT ON `tai_khoan` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("USER0",SUBSTRING(idtk,6)+1) FROM tai_khoan ORDER BY idtk DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idtk = 'USER01';
ELSE SET NEW.idtk = id;
END IF;
END
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
('TL01', 'Tiểu thuyết', 'NTL01'),
('TL02', 'Ngôn tình', 'NTL01'),
('TL03', 'Kinh tế', 'NTL02'),
('TL04', 'Cấu chuyện cuộc đời', 'NTL02'),
('TL05', 'Quản trị - lãnh đạo', 'NTL03'),
('TL06', 'Phân tích kinh tế', 'NTL03');

--
-- Bẫy `the_loai`
--
DELIMITER $$
CREATE TRIGGER `them_the_loai` BEFORE INSERT ON `the_loai` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("TL0",SUBSTRING(idtl,4)+1) FROM the_loai ORDER BY idtl DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idtl = 'TL01';
ELSE SET NEW.idtl = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_tin_tk`
--

CREATE TABLE `thong_tin_tk` (
  `sdt` varchar(20) NOT NULL,
  `idtk` varchar(255) NOT NULL,
  `hoten` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `thong_tin_tk`
--

INSERT INTO `thong_tin_tk` (`sdt`, `idtk`, `hoten`) VALUES
('0794351152', 'USER02', 'Nguyễn Văn Nhẫn'),
('0794351150', 'USER03', 'Nguyễn Văn Nam');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `binh_luan_danh_gia`
--
ALTER TABLE `binh_luan_danh_gia`
  ADD PRIMARY KEY (`idbldg`),
  ADD KEY `idsach` (`idsach`),
  ADD KEY `idtk` (`idtk`);

--
-- Chỉ mục cho bảng `chi_tiet_hd`
--
ALTER TABLE `chi_tiet_hd`
  ADD PRIMARY KEY (`id_cthd`),
  ADD KEY `idsach` (`idsach`),
  ADD KEY `idhd` (`idhd`);

--
-- Chỉ mục cho bảng `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD PRIMARY KEY (`iddc`),
  ADD KEY `idtk` (`idtk`);

--
-- Chỉ mục cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD PRIMARY KEY (`idhd`),
  ADD KEY `tai_khoan-hoa_don` (`Idtk`);

--
-- Chỉ mục cho bảng `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  ADD PRIMARY KEY (`idkm`),
  ADD KEY `idsach` (`idsach`);

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
-- Chỉ mục cho bảng `sach`
--
ALTER TABLE `sach`
  ADD PRIMARY KEY (`idsach`),
  ADD KEY `idnn` (`idnn`),
  ADD KEY `idnxb` (`idnxb`),
  ADD KEY `idkt` (`idkt`),
  ADD KEY `idncc` (`idncc`),
  ADD KEY `idtl` (`idtl`),
  ADD KEY `idtg` (`idtg`);

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
  ADD PRIMARY KEY (`idtl`),
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
-- Các ràng buộc cho bảng `binh_luan_danh_gia`
--
ALTER TABLE `binh_luan_danh_gia`
  ADD CONSTRAINT `binh_luan_danh_gia_ibfk_1` FOREIGN KEY (`idsach`) REFERENCES `sach` (`idsach`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `binh_luan_danh_gia_ibfk_2` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `chi_tiet_hd`
--
ALTER TABLE `chi_tiet_hd`
  ADD CONSTRAINT `chi_tiet_hd_ibfk_1` FOREIGN KEY (`idsach`) REFERENCES `sach` (`idsach`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chi_tiet_hd_ibfk_2` FOREIGN KEY (`idhd`) REFERENCES `hoa_don` (`idhd`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD CONSTRAINT `dia_chi_ibfk_1` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `tai_khoan-hoa_don` FOREIGN KEY (`Idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  ADD CONSTRAINT `khuyen_mai_ibfk_1` FOREIGN KEY (`idsach`) REFERENCES `sach` (`idsach`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `sach`
--
ALTER TABLE `sach`
  ADD CONSTRAINT `sach_ibfk_2` FOREIGN KEY (`idnn`) REFERENCES `ngon_ngu` (`idnn`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sach_ibfk_3` FOREIGN KEY (`idnxb`) REFERENCES `nha_xuat_ban` (`idnxb`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sach_ibfk_4` FOREIGN KEY (`idkt`) REFERENCES `sach_kich_thuoc` (`idkt`),
  ADD CONSTRAINT `sach_ibfk_5` FOREIGN KEY (`idncc`) REFERENCES `nha_cung_cap` (`idncc`),
  ADD CONSTRAINT `sach_ibfk_6` FOREIGN KEY (`idtl`) REFERENCES `the_loai` (`idtl`),
  ADD CONSTRAINT `sach_ibfk_7` FOREIGN KEY (`idtg`) REFERENCES `tac_gia` (`idtg`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `the_loai`
--
ALTER TABLE `the_loai`
  ADD CONSTRAINT `the_loai_ibfk_1` FOREIGN KEY (`idntl`) REFERENCES `nhom_the_loai` (`idntl`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `thong_tin_tk`
--
ALTER TABLE `thong_tin_tk`
  ADD CONSTRAINT `thong_tin_tk_ibfk_1` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `thong_tin_tk_ibfk_2` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
