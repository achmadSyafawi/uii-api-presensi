const jwt = require('jsonwebtoken');
const geolib = require('geolib');
const moment = require('moment');

const cert = 'topsecret';

function createAbsensiModel(conn) {
    return {
        viewAllAbsensi: () =>
            new Promise((resolve, reject) => {
                conn.query('SELECT * FROM absensi', (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            }),
        getAbsensi: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `SELECT * FROM absensi WHERE id_pegawai = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    }
                );
            }),
        createAbsensi: absensi =>
            new Promise((resolve, reject) => {
                conn.query(
                    'INSERT INTO absensi SET ?',
                    Object.assign({}, { id: null }, absensi),
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    }
                );
            }),
        delAbsensi: id =>
            new Promise((resolve, reject) => {
                conn.query(
                    `DELETE FROM absensi WHERE id = ${id}`,
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    }
                );
            }),
        cekToken: token =>
            new Promise((resolve, reject) => {
                jwt.verify(token, cert, (err, decode) => {
                    if (err) reject(err);
                    resolve(decode);
                });
            }),
        cekLokasi: (sourceLat, sourceLng) =>
            new Promise((resolve, reject) => {
                conn.query('SELECT * FROM lokasi', (err, result) => {
                    if (err) reject(err);
                    let nearestLocation;
                    for (let i = 0; i < result.length; i += 1) {
                        const verifyLokasi = geolib.isPointInCircle(
                            {
                                latitude: sourceLat,
                                longitude: sourceLng,
                            },
                            {
                                latitude: result[i].lati,
                                longitude: result[i].longi,
                            },
                            900
                        );
                        if (verifyLokasi) {
                            nearestLocation = {
                                id: result[i].id,
                                name: result[i].name,
                            };
                            break;
                        }
                    }
                    if (nearestLocation) {
                        resolve(nearestLocation);
                    } else {
                        reject(new Error('Cannot find location'));
                    }
                });
            }),
        updateAbsensi: (id, absensi) => {
            const { tgl, masuk, keluar, ijin, foto, id_pegawai } = absensi;
            return new Promise((resolve, reject) => {
                conn.query(
                    'UPDATE absensi SET tgl = ?, masuk = ?, keluar = ?, ijin = ?, id_pegawai = ? WHERE id = ?',
                    [tgl, masuk, keluar, ijin, foto, id_pegawai, id],
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    }
                );
            });
        },
        checkHoliday: timestamp =>
            new Promise((resolve, reject) => {
                const dateTimestamp = moment(timestamp);
                const isSunday = dateTimestamp.isoWeekday() === 7;
                if (isSunday) resolve({ holiday: true });
                const dateCompare = dateTimestamp.format('YYYY-MM-DD');
                conn.query(
                    `SELECT * FROM hari_libur WHERE hari_libur.date = '${dateCompare}'`,
                    (err, result) => {
                        if (err) reject(err);
                        if (result.length === 1) {
                            resolve({ holiday: true });
                        } else {
                            resolve({ holiday: false });
                        }
                    }
                );
            }),
    };
}

module.exports = createAbsensiModel;
