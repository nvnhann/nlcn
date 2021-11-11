const sql = require('./db');

const Review = function (review){
    this.binhluan = review.binhluan;
    this.danhgia = review.danhgia;
    this.idsach = review.idsach;
    this.idtk = review.idtk;
}

Review.create = (newReview, rs)=>{
    sql.query("INSERT INTO binh_luan_danh_gia SET ?", newReview, (err, res)=>{
        if(err) return rs(err, null);
        rs(null, res);
    })
}

Review.getById = (idsach, rs)=>{
    sql.query("SELECT rv.*, tk.ho, tk.ten FROM `binh_luan_danh_gia` rv LEFT JOIN thong_tin_tk tk ON rv.idtk = tk.idtk WHERE rv.idsach = ?", idsach, (err, data)=>{
        if(err) return rs(err, null);
        return rs(null,data);
    })
}


module.exports = Review;
