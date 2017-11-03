function createLokasiModel(conn) {
    return {
        viewAllLokasi: () =>
            new Promise((resolve, reject) => {
                conn.query('SELECT * FROM lokasi', (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            }),
        getLokasi: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `SELECT * FROM lokasi WHERE id = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        createLokasi: lokasi =>
            new Promise((resolve, reject) => {
                conn.query(
                    'INSERT INTO lokasi SET ?',
                    Object.assign({}, { id: null }, lokasi),
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        delLokasi: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `DELETE FROM lokasi WHERE id = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        updateLokasi: (id, lokasi) => {
            const { name, longi, lati } = lokasi;
            return new Promise((resolve, reject) => {
                conn.query(
                    'UPDATE lokasi SET name = ?, longi = ?, lati = ? WHERE id = ?',
                    [name, longi, lati, id],
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            });
        },
    };
}

module.exports = createLokasiModel;
