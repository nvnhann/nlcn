const sql = require("./db");

const Profile = function (profile) {
    this.ho = profile.ho;
    this.ten = profile.ten;
    this.sdt = profile.sdt;
    this.idtk = profile.idtk;
};

Profile.create = (newProfile, rs) => {
    sql.query(
        "INSERT INTO `thong_tin_tk` (`ho`, `ten`, `sdt`, `idtk`) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE `ho` = ?, `ten` = ?, `sdt`= ?",
        [
            newProfile.ho,
            newProfile.ten,
            newProfile.sdt,
            newProfile.idtk,
            newProfile.ho,
            newProfile.ten,
            newProfile.sdt,
        ],
        (err, _) => {
            if (err) {
                console.log(err);
                return rs(err, null);
            }
            rs(null, {...newProfile});
            console.log("Create proflie successfully!");
        }
    );
};

Profile.get = (idtk, rs) => {
    sql.query(
        `SELECT tt.ho, tt.ten, tt.sdt, dc.diachi FROM
thong_tin_tk tt LEFT JOIN dia_chi dc ON tt.idtk=dc.idtk WHERE tt.idtk='${idtk}'
ORDER BY dc.mac_dinh DESC LIMIT 1`,
        (err, res) => {
            if (err) {
                console.log(err);
                return rs(err, null);
            }
            if (res.length) {
                return rs(null, res[0]);
            }
            rs({kind: "not_found"}, null);
        }
    );
};
Profile.updateEmail = (email, idtk, res) => {
    sql.query(
        "UPDATE tai_khoan SET email = ? WHERE idtk = ?",
        [email, idtk],
        (err, _) => {
            if (err) {
                console.log(err);
                return res(err, null);
            }
            res(null, {...email});
        }
    );
};

Profile.update = (idtk, profile, rs) => {
    sql.query("UPDATE `thong_tin_tk` SET `ho` = ?, `ten` = ?, `sdt` = ? WHERE `thong_tin_tk`.`idtk` = ?",
        [profile.ho, profile.ten, profile.sdt, idtk], (err, data) => {
            if (err) return rs(err, null);
            if (data.affectedRows === 0) return rs({kind: "not_found"}, null);
            rs(null, data);
        })
}
module.exports = Profile;
