-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 12, 2021 at 03:29 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ct466`
--

-- --------------------------------------------------------

--
-- Table structure for table `binh_luan_danh_gia`
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
-- Dumping data for table `binh_luan_danh_gia`
--

INSERT INTO `binh_luan_danh_gia` (`idbldg`, `binhluan`, `danhgia`, `thoi_gian`, `idsach`, `idtk`) VALUES
('BLDG01', 'Cuối cùng thì tớ đã đọc được cuốn xếp vào hàng kinh điển này sau bao ngày lần lữa. Phải nói rằng, tớ đã đọc qua nhiều quan điểm trái chiều về cuốn này trước khi đọc nó (và tớ hơi hối hận vì đã làm thế). Hầu hết thì cho rằng cuốn này xứng tầm với danh tiếng của mình, số khác cho rằng Nhà giả kim bị đánh giá quá cao, nhiều người bảo &quot;bình thường&quot;. Nhưng đọc rồi thì tớ lại có cảm nhận của riêng mình. Nhà giả kim mang hình mẫu của một câu chuyện ngụ ngôn, nhưng lại thể hiện cái tôi nhân vật nhiều. Đó là cách mà Paulo Coelho tạo dựng truyện ngụ ngôn theo kiểu của riêng ông. Bằng cách sử dụng câu chuyện của cậu chăn cừu - một câu chuyện hiện hữu và dễ hình dung, Paulo đã truyền tải những triết lý về cuộc đời, về ước mơ và cả số phận con người. Câu chuyện có lẽ hơi bình dị với một số người, nhưng chính sự giản đơn đó đã dẫn dắt thành công câu chuyện. Hành trình của cậu chăn cừu là một hành trình vừa thực vừa ảo, chân thực mà cũng có những khoảnh khắc xa lạ tưởng như mơ. Đó không chỉ là một chuyến đi thực thụ, đó còn là bước trở mình từ cậu bé chăn cừu chỉ suốt ngày quẩn quanh bên đàn cừu, đến người đàn ông trưởng thành dám ra đi để tìm kho báu đích thực. Một câu chuyện kỳ diệu và nhân văn. Với tớ, đọc sách là một dạng trải nghiệm, và nhận thức về trải nghiệm này thường dựa trên trải nghiệm trong cuộc sống. Nhiều người không đánh giá cao Nhà giả kim bởi vì với trải nghiệm đời thực của họ, câu chuyện về cậu bé chăn cừu không có gì mới lạ. Còn về phần tớ, đó lại là một câu chuyện mang tính truyền cảm cao và không quá triết lý để có thể cảm nhận được. Tóm lại, tớ hoàn toàn hài lòng về cuốn sách này. (Tuy nhiên thì với mấy cái ý kiến thần thánh hoá cuốn này thì tớ không đồng tình rồi).', 5, '2021-11-11 17:51:48', 'BOOK01', 'USER02'),
('BLDG02', ' Cuốn sách Nhà giả kim của tác giả Paulo Coelho là một trong những tác phẩm kinh điển, bestseller nên đọc. Sách kể về câu chuyện của một cậu bé chăn cừu trên con đường đi tìm kiếm kho báu khổng lồ. Câu chuyện đem đến cho bản thân em nhiều suy nghĩ và liên tưởng về cuộc sống này. Con đường cậu đi, những ngôi làng, những sa mạc, những con người cùng những cuộc gặp gỡ. Cuộc sống chính được tạo nên từ những điều như thế. Trong hành trình tiến về phía trước luôn có những khó khăn, vất vả, những mất mát hay cả những thất bại. Nhưng chúng ta nhất định phải bản lĩnh và kiên cường. Tuyệt đối không bị gục ngã trước nghịch cảnh. Và định nghĩa về những điều quý giá, chúng vẫn luôn hiện hữu xung quanh chúng ta, là tình thân, tình bạn, tình yêu,... Vậy nên đừng tìm kiếm xa xôi, hãy luôn quý trọng tất cả những gì mà mình đang có. Hẳn cuốn sách còn đem lại nhiều hơn những suy nghĩ sâu sắc, đây chỉ là những cảm nhận chung nhất của em. Cuốn sách rất hay, rất đáng mua đọc ạ.', 5, '2021-11-11 17:58:29', 'BOOK01', 'USER03');

--
-- Triggers `binh_luan_danh_gia`
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
-- Table structure for table `chi_tiet_hd`
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
-- Dumping data for table `chi_tiet_hd`
--

INSERT INTO `chi_tiet_hd` (`id_cthd`, `idhd`, `so_luong`, `gia`, `idsach`, `phan_tram`) VALUES
('CTHD01', 'HD01', 1, 12, 'BOOK01', 0),
('CTHD02', 'HD02', 2, 12, 'BOOK01', 0);

--
-- Triggers `chi_tiet_hd`
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
-- Table structure for table `dia_chi`
--

CREATE TABLE `dia_chi` (
  `iddc` varchar(100) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `mac_dinh` int(11) NOT NULL,
  `ho` varchar(20) DEFAULT NULL,
  `ten` varchar(20) DEFAULT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `idtk` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dia_chi`
--

INSERT INTO `dia_chi` (`iddc`, `diachi`, `mac_dinh`, `ho`, `ten`, `sdt`, `idtk`) VALUES
('DC01', 'Cần Thơ', 0, 'Nguyễn ', 'Nhẫn', '0794351150', 'USER01'),
('DC02', 'Hậu Giang', 0, 'Trần', 'Nam', '0794351142', 'USER01'),
('DC03', 'Vi Thanh', 0, 'Nguyen ', 'Nhan', '0794351150', 'USER02'),
('DC04', 'Vi Thanh', 0, 'Nguyen ', 'Nhan', '0794351150', 'USER02'),
('DC06', 'Nam Dinh', 1, 'Nguyen', 'Nguyuen', '0794351120', 'USER02');

--
-- Triggers `dia_chi`
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
-- Table structure for table `hoa_don`
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
-- Dumping data for table `hoa_don`
--

INSERT INTO `hoa_don` (`idhd`, `iddc`, `email_paypal`, `tong_gia`, `Idtk`, `trang_thai`, `thoi_gian`) VALUES
('HD01', 'DC06', 'nvnhan.conf@personal.com', 12, 'USER02', 0, '2021-11-11 07:30:56'),
('HD02', 'DC06', 'nvnhan.conf@personal.com', 24, 'USER02', 0, '2021-11-11 07:38:21');

--
-- Triggers `hoa_don`
--
DELIMITER $$
CREATE TRIGGER `them_hoa_don` BEFORE INSERT ON `hoa_don` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("HD0",SUBSTRING(idhd,4)+1) FROM hoa_don ORDER BY idhd DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idhd = 'HD01';
ELSE SET NEW.idhd = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `khuyen_mai`
--

CREATE TABLE `khuyen_mai` (
  `idkm` varchar(100) NOT NULL,
  `phan_tram` int(11) DEFAULT NULL,
  `ngay_bd_km` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ngay_het_km` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `idsach` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `khuyen_mai`
--

INSERT INTO `khuyen_mai` (`idkm`, `phan_tram`, `ngay_bd_km`, `ngay_het_km`, `idsach`) VALUES
('KM01', 10, '2021-11-11 16:08:00', '2021-11-22 15:08:00', 'BOOK01');

--
-- Triggers `khuyen_mai`
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
-- Table structure for table `ngon_ngu`
--

CREATE TABLE `ngon_ngu` (
  `idnn` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ngon_ngu` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ngon_ngu`
--

INSERT INTO `ngon_ngu` (`idnn`, `ngon_ngu`) VALUES
('NN01', 'Tiếng việt'),
('NN02', 'Tiếng Anh');

--
-- Triggers `ngon_ngu`
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
-- Table structure for table `nha_cung_cap`
--

CREATE TABLE `nha_cung_cap` (
  `idncc` varchar(100) NOT NULL,
  `tenncc` varchar(255) NOT NULL,
  `dia_chi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nha_cung_cap`
--

INSERT INTO `nha_cung_cap` (`idncc`, `tenncc`, `dia_chi`) VALUES
('NCC01', 'Nhã Nam', '59 Đỗ Quang, phường Trung Hoà, quận Cầu Giấy, Hà Nội '),
('NCC02', 'Bách Việt', '42A Nguyễn Bá Huân, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam');

--
-- Triggers `nha_cung_cap`
--
DELIMITER $$
CREATE TRIGGER `them_nha_cung_cap` BEFORE INSERT ON `nha_cung_cap` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("NCC0",SUBSTRING(idncc,5)+1) FROM nha_cung_cap ORDER BY idncc DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idncc = 'NCC01';
ELSE SET NEW.idncc = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `nha_xuat_ban`
--

CREATE TABLE `nha_xuat_ban` (
  `idnxb` varchar(100) CHARACTER SET utf8 NOT NULL,
  `tennxb` varchar(255) CHARACTER SET utf8 NOT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nha_xuat_ban`
--

INSERT INTO `nha_xuat_ban` (`idnxb`, `tennxb`, `dia_chi`) VALUES
('NXB01', 'NXB Hội Nhà Văn', '65, Nguyễn Du, quận Hai Bà Trưng, Hà Nội'),
('NXB02', 'NXB Lao Động', 'Nhà xuất bản Lao Động Địa chỉ: 175 Giảng Võ, Q. Đống Đa, Hà Nội');

--
-- Triggers `nha_xuat_ban`
--
DELIMITER $$
CREATE TRIGGER `them_nha_xuat_ban` BEFORE INSERT ON `nha_xuat_ban` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("NXB0",SUBSTRING(idnxb,5)+1) FROM nha_xuat_ban ORDER BY idnxb DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idnxb = 'NXB01';
ELSE SET NEW.idnxb = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `nhom_the_loai`
--

CREATE TABLE `nhom_the_loai` (
  `idntl` varchar(100) NOT NULL,
  `tenntl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `nhom_the_loai`
--

INSERT INTO `nhom_the_loai` (`idntl`, `tenntl`) VALUES
('NTL01', 'Văn học');

--
-- Triggers `nhom_the_loai`
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
-- Table structure for table `sach`
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
-- Dumping data for table `sach`
--

INSERT INTO `sach` (`idsach`, `tensach`, `gia_sach`, `hinhanh`, `mo_ta`, `so_luong`, `hinh_thuc_bia`, `trong_luong`, `so_trang`, `idnn`, `idnxb`, `idkt`, `idncc`, `idtl`, `idtg`) VALUES
('BOOK01', 'Đứa Con Gái Hoang Đàng - The Prodigal Daughter ', 12, '/img/product/1636354553741-image_234117.jpg', '\r\n\"Tiếp nối cuốn tiểu thuyết nổi tiếng HAI SỐ PHẬN về William Kane và Abel Rosnovski, Đứa con gái hoang đàng là một câu chuyện được chắp bút của thế hệ tiếp theo. Câu chuyện đầy trớ trêu, trắc trở nhưng đầy nhân văn.\r\n\r\nTƯƠNG LAI CỦA CÔ LÀ THAM VỌNG\r\n\r\nFlorentyna Rosnovski – con gái Abel – với một ý chí sắt đá di truyền từ người cha, cô quyết tâm theo đuổi mục tiêu và lý tưởng của mình, đó là trở thành nữ Tổng thống Mỹ đầu tiên. Tuy thế, cuộc đời của cô, cũng giống như người cha của mình, cũng gặp vô cùng nhiều trắc trở mà người phụ nữ tham vọng này nhất định phải vượt qua.\r\n\r\nVới hình tượng được lấy cảm hứng từ những nhân cách lớn như “bà đầm thép” Margaret Thatcher, Golda Meer, hay Indira Gandhi, Jeffrey Archer đã trả lời cho độc giả những câu hỏi về cuộc đời và số phận, về ý nghĩa của cuộc sống này. Vượt qua cơn giông tố, vươn đến những vì sao chính là thông điệp mà cây bút tài ba muốn truyền tải.\"\r\n\r\nÝ NGHĨA NHAN ĐỀ\r\n\r\nTiểu thuyết Đứa con gái hoang đàng được dịch từ tên gốc The Prodigal Daughter. Cái tên này được Jeffrey Archer đặt theo một Dụ ngôn trong Kinh Thánh – The Prodigal Son. Ở Việt Nam, tích này được biết đến với cái tên Người con hoang đàng, hay Đứa con hoang đàng trở về. Cách đặt tên này tạo ra một sự kết nối chặt chẽ vói phần 1 – Hai số phận. Tiểu thuyết Hai số phận với tên gốc là Kane and Abel – vốn dĩ cũng là một biến thể của Cain and Abel – một Dụ ngôn khác trong Kinh Thánh.\r\n\r\nSỨC HẤP DẪN CỦA CUỐN SÁCH ĐỐI VỚI ĐỘC GIẢ\r\n\r\n“Một trong mười nhà văn có tài kể chuyện hay nhất thế giới.” – Los Angeles Times\r\n\r\n“Mạch truyện nhanh và lôi cuốn.” – Library Journal\r\n\r\n“Một bậc thầy trong việc pha trộn các yếu tố quyền lực, chính trị và danh vọng vào trong một cuốn tiểu thuyết.” – Entertainment Weekly\r\n\r\n“Một người kể chuyện ở đẳng cấp của Alexander Dumas, với kỹ năng vượt trội, Archer khiến độc giả không ngừng tự hỏi điều gì đang đón đợi phía trước.” – Washington Post\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.\r\n\r\nVà cuối cùng là phần 3 – Shall we tell the President, tiếp nối câu chuyện dang dở của Đứa con gái hoàng đàng.\r\nMã hàng 	9786043209679\r\nTên Nhà Cung Cấp 	Bách Việt	\r\nTác giả 	Jeffrey Archer\r\nNXB 	NXB Lao Động\r\nNăm XB 	2021\r\nTrọng lượng (gr) 	900\r\nKích Thước Bao Bì 	20.5 x 13.5 cm\r\nSố trang 	836\r\nHình thức 	Bìa Mềm\r\nSản phẩm hiển thị trong 	\r\n\r\n    Bách Việt\r\n    Ví VNPAY hoàn 50K\r\n    ZaloPay\r\n\r\nSản phẩm bán chạy nhất 	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\n\r\n\"Tiếp nối cuốn tiểu thuyết nổi tiếng HAI SỐ PHẬN về William Kane và Abel Rosnovski, Đứa con gái hoang đàng là một câu chuyện được chắp bút của thế hệ tiếp theo. Câu chuyện đầy trớ trêu, trắc trở nhưng đầy nhân văn.\r\n\r\nTƯƠNG LAI CỦA CÔ LÀ THAM VỌNG\r\n\r\nFlorentyna Rosnovski – con gái Abel – với một ý chí sắt đá di truyền từ người cha, cô quyết tâm theo đuổi mục tiêu và lý tưởng của mình, đó là trở thành nữ Tổng thống Mỹ đầu tiên. Tuy thế, cuộc đời của cô, cũng giống như người cha của mình, cũng gặp vô cùng nhiều trắc trở mà người phụ nữ tham vọng này nhất định phải vượt qua.\r\n\r\nVới hình tượng được lấy cảm hứng từ những nhân cách lớn như “bà đầm thép” Margaret Thatcher, Golda Meer, hay Indira Gandhi, Jeffrey Archer đã trả lời cho độc giả những câu hỏi về cuộc đời và số phận, về ý nghĩa của cuộc sống này. Vượt qua cơn giông tố, vươn đến những vì sao chính là thông điệp mà cây bút tài ba muốn truyền tải.\"\r\n\r\nÝ NGHĨA NHAN ĐỀ\r\n\r\nTiểu thuyết Đứa con gái hoang đàng được dịch từ tên gốc The Prodigal Daughter. Cái tên này được Jeffrey Archer đặt theo một Dụ ngôn trong Kinh Thánh – The Prodigal Son. Ở Việt Nam, tích này được biết đến với cái tên Người con hoang đàng, hay Đứa con hoang đàng trở về. Cách đặt tên này tạo ra một sự kết nối chặt chẽ vói phần 1 – Hai số phận. Tiểu thuyết Hai số phận với tên gốc là Kane and Abel – vốn dĩ cũng là một biến thể của Cain and Abel – một Dụ ngôn khác trong Kinh Thánh.\r\n\r\nSỨC HẤP DẪN CỦA CUỐN SÁCH ĐỐI VỚI ĐỘC GIẢ\r\n\r\n“Một trong mười nhà văn có tài kể chuyện hay nhất thế giới.” – Los Angeles Times\r\n\r\n“Mạch truyện nhanh và lôi cuốn.” – Library Journal\r\n\r\n“Một bậc thầy trong việc pha trộn các yếu tố quyền lực, chính trị và danh vọng vào trong một cuốn tiểu thuyết.” – Entertainment Weekly\r\n\r\n“Một người kể chuyện ở đẳng cấp của Alexander Dumas, với kỹ năng vượt trội, Archer khiến độc giả không ngừng tự hỏi điều gì đang đón đợi phía trước.” – Washington Post\r\n\r\nTHÔNG TIN TÁC GIẢ\r\n\r\nJeffrey Archer (sinh ngày 15/4/1940) là một tiểu thuyết gia người Anh, cựu chính trị gia và là người tiên phong trong làng tiểu thuyết Anh Quốc.\r\n\r\nTrong suốt sự nghiệp sáng tác của mình, ông ghi dấu ấn với rất nhiều tiểu thuyết nổi tiếng, có thể kể đến : Hai số phận, Đứa con gái hoang đàng và các cuốn cùng series Biên niên Clifton: Chỉ thời gian có thể cất lời, Tội lỗi của người cha, Bí mật sâu kín nhất…\r\n\r\nÔng được mệnh danh là một trong những nhà văn có tài kể chuyện hay nhất.\r\n\r\nTHÔNG TIN VỀ SERIES “KANE VÀ ABEL”\r\n\r\nSeries về Kane và Abel của Jeffrey Archer xoay quanh những nhân vật của gia đình Rosnovski và Kane. Phần một với nhan đề Kane and Abel được xuất bản với tên tiếng Việt Hai số phận đã và đang là một cuốn sách bán chạy bậc nhất tại Việt Nam. Cuốn sách nói về William Kane và Abel Rosnovski – hai người anh em nhưng lại sinh ra ở hai hoàn cảnh trái ngược; cuốn sách là một câu chuyện cảm động về hành trình đi lên và vượt qua những thử thách. Đứa con gái hoang đàng (The Prodigal Daughter) tiếp nối câu chuyện giữa hai gia đình, có thể nói đây là phần hậu truyện của Hai số phận, cuốn sách nói về cuộc đời và số phận của thế hệ thứ hai, cụ thể hơn là Florentyna Rosnovski – con gái của Abel, khi gia đình Rosnovski đã định cư tại Mỹ.\r\n\r\nVà cuối cùng là phần 3 – Shall we tell the President, tiếp nối câu chuyện dang dở của Đứa con gái hoàng đàng.\r\n', 47, 'Bìa mềm', 900, 836, 'NN01', 'NXB02', 'KT02', 'NCC02', 'TL01', 'TG01');

--
-- Triggers `sach`
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
-- Table structure for table `sach_kich_thuoc`
--

CREATE TABLE `sach_kich_thuoc` (
  `idkt` varchar(100) NOT NULL,
  `kt_ngang` float NOT NULL,
  `kt_doc` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sach_kich_thuoc`
--

INSERT INTO `sach_kich_thuoc` (`idkt`, `kt_ngang`, `kt_doc`) VALUES
('KT01', 13, 20.5),
('KT02', 13.5, 20.5);

--
-- Triggers `sach_kich_thuoc`
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
-- Table structure for table `tac_gia`
--

CREATE TABLE `tac_gia` (
  `idtg` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT 'TG1',
  `hotentg` varchar(50) CHARACTER SET utf8 NOT NULL,
  `dia_chi` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tac_gia`
--

INSERT INTO `tac_gia` (`idtg`, `hotentg`, `dia_chi`) VALUES
('TG01', 'Jeffrey Archer', '');

--
-- Triggers `tac_gia`
--
DELIMITER $$
CREATE TRIGGER `them_tac_gia` BEFORE INSERT ON `tac_gia` FOR EACH ROW BEGIN
DECLARE id varchar(100);

SET id = (SELECT CONCAT("TG0",SUBSTRING(idtg,4)+1) FROM tac_gia ORDER BY idtg DESC LIMIT 1);

IF id IS NULL 
THEN SET NEW.idtg = 'TG01';
ELSE SET NEW.idtg = id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `idtk` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `quyen` varchar(255) DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tai_khoan`
--

INSERT INTO `tai_khoan` (`idtk`, `email`, `mat_khau`, `quyen`) VALUES
('USER01', 'nvnhan.dev@gmail.com', '$2a$08$dvwlEEDTFfwzOvU26mB.ZeOPjUEWY9rlvXaNV.nJsEhYLZXNp2UXK', 'ADMIN'),
('USER02', 'nhanb1809272@student.ctu.edu.vn', '$2a$08$ue4y75BlbPyzRGYG33tLvOu9Xth76XWJ1b9mgdXVw4cFGOCfNtxx.', 'USER'),
('USER03', 'nvnhan.d@gmail.com', '$2a$08$kCfu6eDjZhEQ8of1dJIn9.H5yRk.JjnnqEpFK1DVrTvZkW.4wHOYm', 'USER');

--
-- Triggers `tai_khoan`
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
-- Table structure for table `the_loai`
--

CREATE TABLE `the_loai` (
  `idtl` varchar(100) NOT NULL,
  `tentl` varchar(255) NOT NULL,
  `idntl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `the_loai`
--

INSERT INTO `the_loai` (`idtl`, `tentl`, `idntl`) VALUES
('TL01', 'Tiểu thuyết', 'NTL01');

--
-- Triggers `the_loai`
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
-- Table structure for table `thong_tin_tk`
--

CREATE TABLE `thong_tin_tk` (
  `ho` varchar(20) NOT NULL,
  `ten` varchar(20) NOT NULL,
  `sdt` varchar(20) NOT NULL,
  `idtk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `thong_tin_tk`
--

INSERT INTO `thong_tin_tk` (`ho`, `ten`, `sdt`, `idtk`) VALUES
('Nguyễn', 'Nhẫn', '0794351150', 'USER02'),
('Nguyễn', 'Nam', '0794351150', 'USER03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `binh_luan_danh_gia`
--
ALTER TABLE `binh_luan_danh_gia`
  ADD PRIMARY KEY (`idbldg`),
  ADD KEY `idsach` (`idsach`),
  ADD KEY `idtk` (`idtk`);

--
-- Indexes for table `chi_tiet_hd`
--
ALTER TABLE `chi_tiet_hd`
  ADD PRIMARY KEY (`id_cthd`),
  ADD KEY `idsach` (`idsach`),
  ADD KEY `idhd` (`idhd`);

--
-- Indexes for table `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD PRIMARY KEY (`iddc`),
  ADD KEY `idtk` (`idtk`);

--
-- Indexes for table `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD PRIMARY KEY (`idhd`),
  ADD KEY `tai_khoan-hoa_don` (`Idtk`);

--
-- Indexes for table `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  ADD PRIMARY KEY (`idkm`),
  ADD KEY `idsach` (`idsach`);

--
-- Indexes for table `ngon_ngu`
--
ALTER TABLE `ngon_ngu`
  ADD PRIMARY KEY (`idnn`);

--
-- Indexes for table `nha_cung_cap`
--
ALTER TABLE `nha_cung_cap`
  ADD PRIMARY KEY (`idncc`);

--
-- Indexes for table `nha_xuat_ban`
--
ALTER TABLE `nha_xuat_ban`
  ADD PRIMARY KEY (`idnxb`);

--
-- Indexes for table `nhom_the_loai`
--
ALTER TABLE `nhom_the_loai`
  ADD PRIMARY KEY (`idntl`);

--
-- Indexes for table `sach`
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
-- Indexes for table `sach_kich_thuoc`
--
ALTER TABLE `sach_kich_thuoc`
  ADD PRIMARY KEY (`idkt`,`kt_ngang`,`kt_doc`);

--
-- Indexes for table `tac_gia`
--
ALTER TABLE `tac_gia`
  ADD PRIMARY KEY (`idtg`);

--
-- Indexes for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`idtk`);

--
-- Indexes for table `the_loai`
--
ALTER TABLE `the_loai`
  ADD PRIMARY KEY (`idtl`),
  ADD KEY `idntl` (`idntl`);

--
-- Indexes for table `thong_tin_tk`
--
ALTER TABLE `thong_tin_tk`
  ADD PRIMARY KEY (`idtk`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `binh_luan_danh_gia`
--
ALTER TABLE `binh_luan_danh_gia`
  ADD CONSTRAINT `binh_luan_danh_gia_ibfk_1` FOREIGN KEY (`idsach`) REFERENCES `sach` (`idsach`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `binh_luan_danh_gia_ibfk_2` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chi_tiet_hd`
--
ALTER TABLE `chi_tiet_hd`
  ADD CONSTRAINT `chi_tiet_hd_ibfk_1` FOREIGN KEY (`idsach`) REFERENCES `sach` (`idsach`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chi_tiet_hd_ibfk_2` FOREIGN KEY (`idhd`) REFERENCES `hoa_don` (`idhd`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dia_chi`
--
ALTER TABLE `dia_chi`
  ADD CONSTRAINT `dia_chi_ibfk_1` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hoa_don`
--
ALTER TABLE `hoa_don`
  ADD CONSTRAINT `tai_khoan-hoa_don` FOREIGN KEY (`Idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `khuyen_mai`
--
ALTER TABLE `khuyen_mai`
  ADD CONSTRAINT `khuyen_mai_ibfk_1` FOREIGN KEY (`idsach`) REFERENCES `sach` (`idsach`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sach`
--
ALTER TABLE `sach`
  ADD CONSTRAINT `sach_ibfk_2` FOREIGN KEY (`idnn`) REFERENCES `ngon_ngu` (`idnn`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sach_ibfk_3` FOREIGN KEY (`idnxb`) REFERENCES `nha_xuat_ban` (`idnxb`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sach_ibfk_4` FOREIGN KEY (`idkt`) REFERENCES `sach_kich_thuoc` (`idkt`),
  ADD CONSTRAINT `sach_ibfk_5` FOREIGN KEY (`idncc`) REFERENCES `nha_cung_cap` (`idncc`),
  ADD CONSTRAINT `sach_ibfk_6` FOREIGN KEY (`idtl`) REFERENCES `the_loai` (`idtl`),
  ADD CONSTRAINT `sach_ibfk_7` FOREIGN KEY (`idtg`) REFERENCES `tac_gia` (`idtg`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `the_loai`
--
ALTER TABLE `the_loai`
  ADD CONSTRAINT `the_loai_ibfk_1` FOREIGN KEY (`idntl`) REFERENCES `nhom_the_loai` (`idntl`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thong_tin_tk`
--
ALTER TABLE `thong_tin_tk`
  ADD CONSTRAINT `thong_tin_tk_ibfk_1` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `thong_tin_tk_ibfk_2` FOREIGN KEY (`idtk`) REFERENCES `tai_khoan` (`idtk`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
