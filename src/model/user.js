function createUserModel(conn) {
    return {
        viewAllUsers: () =>
            new Promise((resolve, reject) => {
                conn.query('SELECT * FROM users', (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            }),
        getUser: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `SELECT * FROM users WHERE id = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        createUser: nidn =>
            new Promise((resolve, reject) => {
                conn.query(
                    'INSERT INTO users SET ?',
                    { nidn, password: null },
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        delUser: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `DELETE FROM users WHERE id = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        updateUser: (id, user) => {
            const { name, username, password } = user;
            return new Promise((resolve, reject) => {
                conn.query(
                    'UPDATE users SET name = ?, username = ?, password = ? WHERE id = ?',
                    [name, username, password, id],
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            });
        },
        makePassword: (nidn, password) =>
            new Promise((resolve, reject) => {
                conn.query(
                    'UPDATE users SET password = ? WHERE nidn = ?',
                    [password, nidn],
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    },
                );
            }),
        // userPresensi: (id) => {
        //     return new Promise((resolve, reject) => {
        //         conn.query('SELECT * FROM user INNER JOIN presensi WHERE xxx');
        //     });
        // },
    };
}

module.exports = createUserModel;
