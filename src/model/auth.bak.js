const Promise = require('bluebird');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

function createAuthModel(conn) {
    return {
        login: (nidn, password) => new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM pegawai WHERE nidn = ${nidn} AND password = ${password}`, (err, result) => {
                if (err) reject(err);
                if (result.length === 1) {
                    conn.query(`SELECT * FROM session WHERE nidn = ${nidn}`, (errSession, resultSession) => {
                        if (errSession) reject(errSession);
                        if (!resultSession.length) {
                            const token = uuid.v4();
                            conn.query('INSERT INTO session SET ?', {
                                nidn,
                                token,
                            }, (errSessionInsert) => {
                                if (errSessionInsert) reject(errSessionInsert);
                                resolve({ nidn, token });
                            });
                        } else {
                            resolve({ nidn, token: resultSession[0].token });
                        }
                    });
                } else {
                    reject('Username dan password tidak valid (Dobel)');
                }
            });
        }),
        createAuth: nidn => new Promise((resolve, reject) => {
            conn.query('INSERT INTO pegawai_key SET ?', {
                nidn,
                uuid: uuid.v4(),
                status: '0',
            }, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        }),
        verified: nidn => new Promise((resolve, reject) => {
            conn.query('UPDATE pegawai_key SET status = ? WHERE nidn = ?', ['1', nidn], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        }),
    };
}

module.exports = createAuthModel;
