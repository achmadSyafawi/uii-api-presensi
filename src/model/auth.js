const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const cert = 'topsecret';

function createAuthModel(conn) {
    return {
        login: (nidn, password) =>
            new Promise((resolve, reject) => {
                conn.query(
                    `SELECT * FROM pegawai WHERE nidn = ${nidn} AND password = ${password}`,
                    (err, result) => {
                        if (err) reject(err);
                        if (result && result.length === 1) {
                            const token = jwt.sign(
                                {
                                    exp:
                                        Math.floor(Date.now() / 1000) + 60 * 60,
                                    nidn: result[0].nidn,
                                },
                                cert,
                            );
                            resolve({ token });
                        }
                    },
                );
            }),
        cekToken: token =>
            new Promise((resolve, reject) => {
                jwt.verify(token, cert, (err) => {
                    if (err) reject(err);
                    resolve(true);
                });
            }),
    };
}

module.exports = createAuthModel;
