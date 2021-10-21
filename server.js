const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const CookieParser = require('cookie-parser');

const app = express();
app.use(morgan("dev"));
app.use(CookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ct466 application." });
});

require("./app/routers/user.router")(app);
require("./app/routers/profile.router")(app);
require("./app/routers/OTP.router")(app);
require("./app/routers/NhaXuatBan.router")(app);
require("./app/routers/NhaCungCap.router")(app);
require("./app/routers/TacGia.router")(app);
require("./app/routers/NgonNgu.router")(app);
require("./app/routers/KichThuot.router")(app);
require("./app/routers/NhomTheLoai.router")(app);
require("./app/routers/TheLoai.router")(app);
require("./app/routers/DiaChi.router")(app);
require("./app/routers/Sach.router")(app);
require("./app/routers/KhuyenMai.router")(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
