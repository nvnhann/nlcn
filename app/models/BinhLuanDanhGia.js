const sql = require('./db');
const BLDG = function (bldg) {
  this.binhluan = bldg.binhluan;
  this.danhgia = bldg.danhgia;
  this.ngay = bldg.ngay;
  this.idsach = bldg.idsach;
};
