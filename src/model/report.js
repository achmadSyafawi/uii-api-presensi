function createReportModel(conn) {
    return {
        reportDocuments: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `SELECT * FROM absensi, pegawai WHERE absensi.id_pegawai = ${id} AND absensi.id_pegawai = pegawai.id`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
    };
}

module.exports = createReportModel;
