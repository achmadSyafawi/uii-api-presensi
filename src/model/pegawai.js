function createPegawaiModel(conn) {
    return {
        viewAllPegawai: () =>
            new Promise((resolve, reject) => {
                conn.query('SELECT * FROM pegawai', (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            }),
        getPegawai: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `SELECT * FROM pegawai WHERE id = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        createPegawai: pegawai =>
            new Promise((resolve, reject) => {
                conn.query(
                    'INSERT INTO pegawai SET ?',
                    Object.assign({}, pegawai),
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        delPegawai: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `DELETE FROM pegawai WHERE id = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        updatePegawai: (id, pegawai) => {
            const {
                name,
                nidn,
                pangkat,
                jabatan,
                programStudi,
                id_lokasi,
                id_face,
            } = pegawai;
            return new Promise((resolve, reject) => {
                conn.query(
                    'UPDATE pegawai SET name = ?, id_lokasi = ?, id_face = ? WHERE id = ?',
                    [
                        name,
                        nidn,
                        pangkat,
                        jabatan,
                        programStudi,
                        id_lokasi,
                        id_face,
                        id,
                    ],
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            });
        },
    };
}

module.exports = createPegawaiModel;
